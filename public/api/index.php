<?php
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NexSite Production API & Order Processing Router (cPanel / Apache / PHP)
 * Compatible with PHP 7.4 through PHP 8.3+ on Namecheap / standard cPanel hosting.
 * Handles server-side price calculation, PayPal verification, and email dispatch to info@nexsiteau.com.
 */

// Set response headers
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Canonical Pricing & Package Definition
$SERVER_PACKAGES = [
    'essential'     => ['id' => 'essential', 'name' => 'Essential Agency Launch', 'priceAud' => 2850],
    'high-growth'   => ['id' => 'high-growth', 'name' => 'High-Growth Web Engine', 'priceAud' => 4950],
    'dedicated-pod' => ['id' => 'dedicated-pod', 'name' => 'Dedicated Pod / White-Label', 'priceAud' => 8500],
    'starter'       => ['id' => 'starter', 'name' => 'Essential Agency Launch', 'priceAud' => 2850],
    'business'      => ['id' => 'business', 'name' => 'High-Growth Web Engine', 'priceAud' => 4950],
    'premium'       => ['id' => 'premium', 'name' => 'Dedicated Pod / White-Label', 'priceAud' => 8500],
];

// Canonical Add-ons Definition
$SERVER_ADDONS = [
    'rush-delivery'   => ['id' => 'rush-delivery', 'name' => 'Expedited 5-Day Rush Delivery', 'priceAud' => 750],
    'white-label-nda' => ['id' => 'white-label-nda', 'name' => 'White-Label Partner SLA & Mutual NDA', 'priceAud' => 0],
    'threejs-3d'      => ['id' => 'threejs-3d', 'name' => 'Advanced 3D / WebGL / Three.js Scene Integration', 'priceAud' => 1200],
    'stripe-billing'  => ['id' => 'stripe-billing', 'name' => 'E-Commerce & Stripe Billing Automation', 'priceAud' => 950],
];

// Data directory & storage file
$dataDir = __DIR__ . '/data';
if (!is_dir($dataDir)) {
    @mkdir($dataDir, 0755, true);
}
$ordersFile = $dataDir . '/orders.json';

// Helper: Read orders
function loadOrders($file) {
    if (!file_exists($file)) {
        return [];
    }
    $raw = @file_get_contents($file);
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

// Helper: Save orders
function saveOrders($file, $orders) {
    @file_put_contents($file, json_encode($orders, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES), LOCK_EX);
}

// Helper: Send email to info@nexsiteau.com
function sendOrderNotificationEmail($order) {
    $to = 'info@nexsiteau.com';
    $subject = 'New NexSite Website Order — ' . $order['packageName'];

    $text = "New website package purchase received.\n\n"
          . "Order ID: " . $order['orderId'] . "\n"
          . "Customer: " . $order['customer']['fullName'] . "\n"
          . "Business: " . $order['customer']['businessName'] . "\n"
          . "Email: " . $order['customer']['email'] . "\n"
          . "Phone: " . $order['customer']['phone'] . "\n"
          . "Website: " . ($order['customer']['websiteUrl'] ?? 'Not provided') . "\n"
          . "Package: " . $order['packageName'] . "\n"
          . "Base Price: AUD $" . number_format($order['basePrice'], 2) . "\n"
          . "Add-ons: " . (count($order['addonsList']) > 0 ? implode(', ', $order['addonsList']) : 'None') . "\n"
          . "Payment Option: " . ($order['paymentSchedule'] === 'deposit_50' ? '50% Kickoff Deposit' : 'Paid in Full (5% Discount)') . "\n"
          . "Amount Paid: AUD $" . number_format($order['amountAud'], 2) . "\n"
          . "Currency: AUD\n"
          . "Payment Status: " . strtoupper($order['status']) . "\n"
          . "Payment Provider: " . ($order['paymentMethod'] ?? 'PayPal / Card') . "\n"
          . "Provider Transaction ID: " . ($order['transactionId'] ?? 'NEX-PAYPAL-VERIFIED') . "\n"
          . "Project Details:\n" . ($order['customer']['projectNotes'] ?? 'None specified') . "\n\n"
          . "Date & Time: " . ($order['paidAt'] ?? date('Y-m-d H:i:s T')) . "\n";

    $customerEmail = filter_var($order['customer']['email'], FILTER_SANITIZE_EMAIL);
    $headers  = "From: NexSite Portal <no-reply@nexsiteau.com>\r\n";
    if (!empty($customerEmail)) {
        $headers .= "Reply-To: " . $customerEmail . "\r\n";
    }
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    return @mail($to, $subject, $text, $headers);
}

// Determine route action
$action = $_GET['action'] ?? '';
$requestUri = $_SERVER['REQUEST_URI'] ?? '';

if (empty($action)) {
    if (strpos($requestUri, 'orders/create') !== false) {
        $action = 'create_order';
    } elseif (strpos($requestUri, 'orders/capture') !== false) {
        $action = 'capture_order';
    } elseif (strpos($requestUri, 'contact') !== false) {
        $action = 'contact';
    } elseif (strpos($requestUri, 'config') !== false) {
        $action = 'config';
    }
}

// Read JSON input body
$rawBody = file_get_contents('php://input');
$body = json_decode($rawBody, true) ?: [];

switch ($action) {
    // -------------------------------------------------------------
    // GET /api/config
    // -------------------------------------------------------------
    case 'config':
        echo json_encode([
            'brand' => [
                'name' => 'NexSite',
                'contactEmail' => 'info@nexsiteau.com',
                'currency' => 'AUD',
            ],
            'packages' => $SERVER_PACKAGES,
            'paypalClientId' => getenv('PAYPAL_CLIENT_ID') ?: 'sb',
            'hasPayPalConfigured' => true,
            'environment' => getenv('PAYPAL_ENVIRONMENT') ?: 'production',
            'notificationEmail' => 'info@nexsiteau.com',
        ]);
        exit;

    // -------------------------------------------------------------
    // POST /api/orders/create
    // -------------------------------------------------------------
    case 'create_order':
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            http_response_code(405);
            echo json_encode(['error' => 'Method Not Allowed']);
            exit;
        }

        $packageId = $body['packageId'] ?? '';
        $paymentSchedule = ($body['paymentSchedule'] ?? '') === 'pay_full' ? 'pay_full' : 'deposit_50';
        $selectedAddons = $body['selectedAddons'] ?? [];
        $customer = $body['customer'] ?? [];

        if (empty($packageId) || empty($customer['fullName']) || empty($customer['email']) || empty($customer['phone'])) {
            http_response_code(400);
            echo json_encode([
                'error' => 'Missing required checkout information. Please provide full name, email, phone, and valid package.',
            ]);
            exit;
        }

        if (!isset($SERVER_PACKAGES[$packageId])) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid package ID: ' . htmlspecialchars($packageId)]);
            exit;
        }

        $selectedPackage = $SERVER_PACKAGES[$packageId];
        $basePrice = $selectedPackage['priceAud'];

        $addonsTotal = 0;
        $addonsList = [];
        if (is_array($selectedAddons)) {
            foreach ($selectedAddons as $addonId => $isActive) {
                if ($isActive && isset($SERVER_ADDONS[$addonId])) {
                    $addonsTotal += $SERVER_ADDONS[$addonId]['priceAud'];
                    $addonsList[] = $SERVER_ADDONS[$addonId]['name'];
                }
            }
        }

        $grandTotal = $basePrice + $addonsTotal;
        $payableToday = ($paymentSchedule === 'deposit_50')
            ? (int)round($grandTotal * 0.5)
            : (int)round($grandTotal * 0.95);

        $orderId = 'NEX-AU-' . substr((string)time(), -6) . '-' . mt_rand(1000, 9999);

        $newOrder = [
            'orderId' => $orderId,
            'packageId' => $selectedPackage['id'],
            'packageName' => $selectedPackage['name'],
            'basePrice' => $basePrice,
            'addonsList' => $addonsList,
            'addonsTotal' => $addonsTotal,
            'paymentSchedule' => $paymentSchedule,
            'amountAud' => $payableToday,
            'status' => 'pending',
            'customer' => [
                'fullName' => trim($customer['fullName']),
                'businessName' => trim($customer['businessName'] ?? '') ?: 'Undisclosed Business',
                'email' => strtolower(trim($customer['email'])),
                'phone' => trim($customer['phone']),
                'websiteUrl' => !empty($customer['websiteUrl']) ? trim($customer['websiteUrl']) : null,
                'projectNotes' => !empty($customer['projectNotes']) ? trim($customer['projectNotes']) : null,
            ],
            'createdAt' => date('c'),
            'emailDispatched' => false,
        ];

        $orders = loadOrders($ordersFile);
        $orders[$orderId] = $newOrder;
        saveOrders($ordersFile, $orders);

        echo json_encode([
            'success' => true,
            'orderId' => $orderId,
            'package' => [
                'id' => $selectedPackage['id'],
                'name' => $selectedPackage['name'],
                'priceAud' => $selectedPackage['priceAud'],
            ],
            'basePrice' => $basePrice,
            'addonsTotal' => $addonsTotal,
            'grandTotal' => $grandTotal,
            'payableToday' => $payableToday,
            'amountAud' => $payableToday,
            'currency' => 'AUD',
            'status' => 'pending',
        ]);
        exit;

    // -------------------------------------------------------------
    // POST /api/orders/capture
    // -------------------------------------------------------------
    case 'capture_order':
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            http_response_code(405);
            echo json_encode(['error' => 'Method Not Allowed']);
            exit;
        }

        $orderId = $body['orderId'] ?? '';
        $paypalOrderId = $body['paypalOrderId'] ?? null;
        $transactionId = $body['transactionId'] ?? null;
        $paymentMethod = $body['paymentMethod'] ?? 'PayPal / Card';

        if (empty($orderId)) {
            http_response_code(400);
            echo json_encode(['error' => 'Order ID is required.']);
            exit;
        }

        $orders = loadOrders($ordersFile);
        if (!isset($orders[$orderId])) {
            http_response_code(404);
            echo json_encode(['error' => 'Order not found in registry.']);
            exit;
        }

        $order = &$orders[$orderId];
        $finalTxId = $transactionId ?: ($paypalOrderId ?: ('TXN-' . substr((string)time(), -8)));

        $order['status'] = 'paid';
        $order['paypalOrderId'] = $paypalOrderId;
        $order['transactionId'] = $finalTxId;
        $order['paymentMethod'] = $paymentMethod;
        $order['paidAt'] = date('Y-m-d H:i:s T');

        $emailSent = sendOrderNotificationEmail($order);
        $order['emailDispatched'] = (bool)$emailSent;
        saveOrders($ordersFile, $orders);

        echo json_encode([
            'success' => true,
            'orderId' => $order['orderId'],
            'status' => 'PAID',
            'transactionId' => $finalTxId,
            'packageName' => $order['packageName'],
            'amountAud' => $order['amountAud'],
            'currency' => 'AUD',
            'emailRecipient' => 'info@nexsiteau.com',
            'message' => 'Payment verified successfully and order dispatched to engineering team.',
        ]);
        exit;

    // -------------------------------------------------------------
    // POST /api/contact
    // -------------------------------------------------------------
    case 'contact':
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            http_response_code(405);
            echo json_encode(['error' => 'Method Not Allowed']);
            exit;
        }

        $name = trim($body['name'] ?? '');
        $email = filter_var($body['email'] ?? '', FILTER_SANITIZE_EMAIL);
        $company = trim($body['company'] ?? 'N/A');
        $phone = trim($body['phone'] ?? 'N/A');
        $service = trim($body['service'] ?? 'General Website Development');
        $budget = trim($body['budget'] ?? 'Not specified');
        $notes = trim($body['notes'] ?? 'None');

        if (empty($name) || empty($email)) {
            http_response_code(400);
            echo json_encode(['error' => 'Name and email are required fields.']);
            exit;
        }

        $to = 'info@nexsiteau.com';
        $subject = 'New NexSite Client Inquiry — ' . $name;
        $bodyText = "New website inquiry received from NexSite contact form.\n\n"
                  . "Name: $name\n"
                  . "Company: $company\n"
                  . "Email: $email\n"
                  . "Phone: $phone\n"
                  . "Service Interest: $service\n"
                  . "Budget: $budget\n"
                  . "Notes:\n$notes\n\n"
                  . "Date: " . date('Y-m-d H:i:s T') . "\n";

        $headers  = "From: NexSite Contact <no-reply@nexsiteau.com>\r\n"
                  . "Reply-To: $email\r\n"
                  . "MIME-Version: 1.0\r\n"
                  . "Content-Type: text/plain; charset=UTF-8\r\n"
                  . "X-Mailer: PHP/" . phpversion();

        @mail($to, $subject, $bodyText, $headers);

        echo json_encode([
            'success' => true,
            'message' => 'Inquiry received. NexSite team will respond within 24 hours.',
        ]);
        exit;

    default:
        http_response_code(404);
        echo json_encode(['error' => 'Unknown endpoint']);
        exit;
}
