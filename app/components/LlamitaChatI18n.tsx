'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function LlamitaChatI18n() {
  const t = useTranslations('chat');
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message in current language
  useEffect(() => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: t('welcome'),
        timestamp: new Date(),
      },
    ]);
  }, [locale, t]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const SUGGESTED_QUESTIONS = [
    t('questions.technologies'),
    t('questions.ai'),
    t('questions.services'),
    t('questions.projects'),
    t('questions.contact'),
    t('questions.pricing'),
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input.trim(),
          history: messages,
          locale, // Send current locale to API
        }),
      });

      const data = await response.json();

      if (data.success) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error(data.message || 'Failed to get response');
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: t('error'),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-terracotta to-weaving-pink rounded-full shadow-2xl flex items-center justify-center text-3xl hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
      >
        {isOpen ? '✕' : '🦙'}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-96 h-[600px] bg-white dark:bg-gray-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden border-2 border-terracotta/20"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-terracotta via-weaving-pink to-sky-blue p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="text-4xl">🦙</div>
                <div>
                  <h3 className="font-bold text-lg">{t('title')}</h3>
                  <p className="text-xs text-white/90">{t('subtitle')}</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-light/30 dark:bg-gray-900/30">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.role === 'user'
                        ? 'bg-terracotta text-white'
                        : 'bg-white dark:bg-gray-700 text-foreground dark:text-white shadow-md border border-stone/10 dark:border-gray-600'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">🦙</span>
                        <span className="text-xs font-semibold text-terracotta">Llamita</span>
                      </div>
                    )}
                    {message.role === 'assistant' ? (
                      <div className="text-sm prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                            ul: ({ children }) => <ul className="list-disc ml-4 mb-2 space-y-1">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal ml-4 mb-2 space-y-1">{children}</ol>,
                            li: ({ children }) => <li className="text-sm">{children}</li>,
                            strong: ({ children }) => <strong className="font-semibold text-terracotta dark:text-weaving-pink">{children}</strong>,
                            em: ({ children }) => <em className="italic">{children}</em>,
                            code: ({ className, children }) => {
                              const isInline = !className;
                              return isInline ? (
                                <code className="bg-stone-light/50 dark:bg-gray-600 px-1.5 py-0.5 rounded text-xs font-mono text-terracotta dark:text-sky-blue">
                                  {children}
                                </code>
                              ) : (
                                <code className={`${className} block bg-stone-light/70 dark:bg-gray-900 p-2 rounded text-xs font-mono overflow-x-auto`}>
                                  {children}
                                </code>
                              );
                            },
                            a: ({ href, children }) => (
                              <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-terracotta dark:text-sky-blue underline hover:no-underline"
                              >
                                {children}
                              </a>
                            ),
                            h1: ({ children }) => <h1 className="text-base font-bold mb-2 text-terracotta dark:text-weaving-pink">{children}</h1>,
                            h2: ({ children }) => <h2 className="text-sm font-bold mb-1 text-terracotta dark:text-weaving-pink">{children}</h2>,
                            h3: ({ children }) => <h3 className="text-sm font-semibold mb-1 text-terracotta dark:text-weaving-pink">{children}</h3>,
                            blockquote: ({ children }) => (
                              <blockquote className="border-l-2 border-terracotta dark:border-weaving-pink pl-3 italic text-muted-foreground dark:text-gray-400">
                                {children}
                              </blockquote>
                            ),
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    )}
                    <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-white/70' : 'text-muted-foreground dark:text-gray-400'}`}>
                      {message.timestamp.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Loading Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white dark:bg-gray-700 rounded-2xl px-4 py-2 shadow-md border border-stone/10 dark:border-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🦙</span>
                      <div className="flex gap-1">
                        <motion.div
                          className="w-2 h-2 bg-terracotta rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-weaving-pink rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-sky-blue rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length === 1 && !isLoading && (
              <div className="px-4 py-2 bg-white dark:bg-gray-800 border-t border-stone/10 dark:border-gray-700">
                <p className="text-xs text-muted-foreground dark:text-gray-400 mb-2">{t('suggestedQuestions')}</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_QUESTIONS.slice(0, 3).map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="text-xs px-3 py-1.5 bg-terracotta/10 text-terracotta rounded-full hover:bg-terracotta/20 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-gray-800 border-t border-stone/10 dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t('placeholder')}
                  className="flex-1 px-4 py-2 border border-stone/20 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-terracotta/50 text-sm bg-white dark:bg-gray-700 text-foreground dark:text-white"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="px-6 py-2 bg-terracotta text-white rounded-full font-medium hover:bg-terracotta-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {t('send')}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
