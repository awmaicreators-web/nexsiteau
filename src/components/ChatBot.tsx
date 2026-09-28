/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NexSite — Multi-Turn Gemini AI Advisor Chatbot
 * Answers questions about NexSite website development, pricing packages,
 * white-label agency partnerships, tech stacks, delivery times, and booking.
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Minimize2,
  Maximize2,
  RotateCcw,
  Sparkles,
  ArrowUpRight,
  Copy,
  Check,
  Zap,
} from 'lucide-react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  modelUsed?: string;
}

interface ChatBotProps {
  onNavigate?: (path: string, sectionId?: string) => void;
  onOpenContact?: () => void;
}

const STARTER_PROMPTS = [
  'What are your website packages & pricing?',
  'How does your 100% white-label agency model work?',
  'What tech stack do you develop with?',
  'How fast can you build and launch a website?',
];

export const ChatBot: React.FC<ChatBotProps> = ({ onNavigate, onOpenContact }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [selectedModel, setSelectedModel] = useState<'gemini-3.5-flash' | 'gemini-3.1-flash-lite'>('gemini-3.5-flash');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'model',
      content: `G'day! I'm the **NexSite AI Advisor**.\n\nI can help you explore our website development services, fixed-scope pricing packages, white-label agency workflows, tech stack, and project timelines.\n\nFeel free to ask a question or tap a quick prompt below:`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      modelUsed: 'gemini-3.5-flash',
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom whenever messages update
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen, isMinimized]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Send conversation history to server-side Gemini endpoint
      const payloadMessages = newHistory.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: payloadMessages,
          model: selectedModel,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        content: data.reply || "I'm ready to answer any questions about NexSite's website development and packages.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.model || selectedModel,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      // Resilient inline fallback message
      const fallbackMsg: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        role: 'model',
        content: `**NexSite AI Advisor Update:**\n\nNexSite offers tailored web development starting from **AUD $2,850** (Essential Launch) and **AUD $4,950** (High-Growth Engine) with guaranteed 98+ Lighthouse performance and 100% white-label agency execution under NDA.\n\nWould you like to review our packages or speak with our engineering pod directly?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: 'nexsite-knowledge-engine',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'model',
        content: `Conversation reset. How can I assist you with your next web development project or agency partnership?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: selectedModel,
      },
    ]);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Simple, clean markdown-like renderer for bullet lists, bold text, and code
  const renderFormattedText = (content: string) => {
    const lines = content.split('\n');
    return (
      <div className="space-y-2 text-sm leading-relaxed text-neutral-800">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) return <div key={idx} className="h-1" />;

          // Heading 3
          if (trimmed.startsWith('### ')) {
            return (
              <h4 key={idx} className="font-['Space_Grotesk',sans-serif] font-bold text-neutral-900 text-base mt-2 mb-1">
                {trimmed.replace('### ', '')}
              </h4>
            );
          }

          // Bullet item
          if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            const itemText = trimmed.replace(/^[-*]\s+/, '');
            return (
              <div key={idx} className="flex items-start gap-2 pl-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1A5CFF] shrink-0 mt-2" />
                <span dangerouslySetInnerHTML={{ __html: parseInlineStyles(itemText) }} />
              </div>
            );
          }

          // Numbered list item
          if (/^\d+\.\s+/.test(trimmed)) {
            const num = trimmed.match(/^(\d+)\.\s+/)?.[1] || '1';
            const itemText = trimmed.replace(/^\d+\.\s+/, '');
            return (
              <div key={idx} className="flex items-start gap-2 pl-1">
                <span className="font-mono text-xs text-[#1A5CFF] font-bold shrink-0 mt-0.5">{num}.</span>
                <span dangerouslySetInnerHTML={{ __html: parseInlineStyles(itemText) }} />
              </div>
            );
          }

          return (
            <p key={idx} dangerouslySetInnerHTML={{ __html: parseInlineStyles(trimmed) }} />
          );
        })}
      </div>
    );
  };

  const parseInlineStyles = (text: string): string => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-neutral-900 font-semibold">$1</strong>')
      .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-neutral-100 text-blue-700 font-mono text-xs border border-neutral-200">$1</code>');
  };

  return (
    <>
      {/* Floating Widget Trigger Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
          <button
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
            }}
            className="w-14 h-14 rounded-full bg-white hover:bg-neutral-50 text-[#1A5CFF] shadow-2xl shadow-black/25 flex items-center justify-center transition-all duration-200 active:scale-95 group cursor-pointer border border-neutral-200/90"
            aria-label="Open NexSite AI Assistant"
          >
            <Sparkles size={24} className="group-hover:rotate-12 transition-transform duration-300" />
          </button>
        </div>
      )}

      {/* Floating Chat Panel (White Theme) */}
      {isOpen && (
        <div
          className={`fixed right-4 sm:right-6 z-50 transition-all duration-300 flex flex-col bg-white border border-neutral-200/90 shadow-2xl rounded-2xl overflow-hidden ${
            isMinimized
              ? 'bottom-6 w-[320px] h-14'
              : 'bottom-4 sm:bottom-6 w-[calc(100vw-32px)] sm:w-[440px] max-w-[460px] h-[600px] max-h-[85vh]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-neutral-100 select-none">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1A5CFF]">
                <Sparkles size={16} />
              </div>
              <div>
                <h3 className="text-neutral-900 font-['Space_Grotesk',sans-serif] font-bold text-sm tracking-tight">
                  NexSite AI Advisor
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Reset chat */}
              {!isMinimized && (
                <button
                  onClick={handleResetChat}
                  title="Reset conversation"
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                  <RotateCcw size={14} />
                </button>
              )}

              {/* Minimize / Maximize */}
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? 'Expand chat' : 'Minimize chat'}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
              </button>

              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Sub-bar / Navigation actions */}
              <div className="px-4 py-2 bg-neutral-50/80 border-b border-neutral-100 flex items-center justify-between text-xs">
                <span className="text-neutral-500 font-medium text-[11px]">Instant Assistance</span>
                <div className="flex items-center gap-2">
                  {onNavigate && (
                    <button
                      onClick={() => onNavigate('/packages', 'packages')}
                      className="text-[#1A5CFF] hover:underline text-[11px] font-medium flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>Packages</span>
                      <ArrowUpRight size={11} />
                    </button>
                  )}
                  {onOpenContact && (
                    <button
                      onClick={onOpenContact}
                      className="text-neutral-600 hover:text-neutral-900 text-[11px] font-medium cursor-pointer"
                    >
                      Book Call
                    </button>
                  )}
                </div>
              </div>

              {/* Scrollable Message Thread */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 select-text bg-[#FAFAFA]">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-2 mb-1 px-1">
                      <span className="text-[11px] text-neutral-400 font-medium">
                        {msg.role === 'user' ? 'You' : 'NexSite AI'}
                      </span>
                      <span className="text-[10px] text-neutral-400">{msg.timestamp}</span>
                    </div>

                    <div
                      className={`relative group max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-[#1A5CFF] text-white rounded-tr-sm shadow-sm'
                          : 'bg-white border border-neutral-200/90 text-neutral-800 rounded-tl-sm shadow-sm'
                      }`}
                    >
                      {msg.role === 'user' ? (
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      ) : (
                        renderFormattedText(msg.content)
                      )}

                      {/* Copy button for model responses */}
                      {msg.role === 'model' && (
                        <button
                          onClick={() => handleCopy(msg.id, msg.content)}
                          title="Copy response"
                          className="absolute top-2 right-2 p-1 rounded bg-neutral-100 opacity-0 group-hover:opacity-100 hover:bg-neutral-200 text-neutral-500 hover:text-neutral-800 transition-all cursor-pointer shadow-xs border border-neutral-200"
                        >
                          {copiedId === msg.id ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isLoading && (
                  <div className="flex flex-col items-start">
                    <div className="flex items-center gap-2 mb-1 px-1">
                      <span className="text-[11px] text-neutral-400 font-medium">NexSite AI</span>
                      <span className="text-[10px] text-neutral-400">typing...</span>
                    </div>
                    <div className="bg-white border border-neutral-200 text-neutral-600 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-[#1A5CFF] animate-bounce" />
                      <span className="w-2 h-2 rounded-full bg-[#1A5CFF] animate-bounce [animation-delay:0.2s]" />
                      <span className="w-2 h-2 rounded-full bg-[#1A5CFF] animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Starter Chips (shown when conversation is fresh) */}
              {messages.length <= 2 && !isLoading && (
                <div className="px-4 py-2 border-t border-neutral-200/60 bg-neutral-50/70 flex flex-wrap gap-1.5">
                  {STARTER_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(prompt)}
                      className="text-[11px] text-neutral-700 bg-white hover:bg-neutral-100 border border-neutral-200/90 px-2.5 py-1 rounded-full transition-colors cursor-pointer text-left shadow-xs"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              {/* Input Form */}
              <div className="p-3 bg-white border-t border-neutral-200">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask about packages, timelines, tech stack..."
                    disabled={isLoading}
                    className="flex-1 bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#1A5CFF] focus:bg-white transition-colors disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !inputMessage.trim()}
                    className="w-10 h-10 rounded-xl bg-[#1A5CFF] hover:bg-[#2563EB] disabled:bg-neutral-100 disabled:text-neutral-400 text-white flex items-center justify-center transition-all duration-150 active:scale-95 cursor-pointer shrink-0 shadow-sm"
                    aria-label="Send message"
                  >
                    <Send size={16} />
                  </button>
                </form>
                <div className="mt-1.5 flex items-center justify-between px-1 text-[10px] text-neutral-400">
                  <span>Press Enter to send</span>
                  <span>NexSite AI Advisor</span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
