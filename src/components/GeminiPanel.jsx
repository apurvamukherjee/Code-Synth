'use client';

import { useState, useCallback } from 'react';
import { Send, Sparkles, Code, Loader2 } from 'lucide-react';
import useHandleStreamResponse from '@/utils/useHandleStreamResponse';

export default function GeminiPanel({ onCodeGenerated }) {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState('');
  const [lastResponse, setLastResponse] = useState('');

  const handleFinish = useCallback((message) => {
    setLastResponse(message);
    setStreamingMessage('');
    setIsLoading(false);
    onCodeGenerated(message);
  }, [onCodeGenerated]);

  const handleStreamResponse = useHandleStreamResponse({ 
    onChunk: setStreamingMessage, 
    onFinish: handleFinish 
  });

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setStreamingMessage('');
    setLastResponse('');

    try {
      const response = await fetch('/integrations/google-gemini-2-5-pro/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: 'You are a code generator. Generate clean, well-commented code based on the user request. Return only the code without explanations or markdown formatting.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          stream: true,
        }),
      });

      handleStreamResponse(response);
    } catch (error) {
      console.error('Error generating code:', error);
      setIsLoading(false);
      setStreamingMessage('Error generating code. Please try again.');
    }
  }, [prompt, isLoading, handleStreamResponse]);

  const quickPrompts = [
    'Write a function that generates a sine wave in JavaScript',
    'Create a simple web server in Node.js',
    'Build a recursive fibonacci function',
    'Write a sorting algorithm in Python',
    'Create a React component for a todo list',
    'Generate a binary search tree implementation'
  ];

  const handleQuickPrompt = useCallback((quickPrompt) => {
    setPrompt(quickPrompt);
  }, []);

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-purple-300 flex items-center">
          <Sparkles size={14} className="mr-2" />
          Quick Prompts
        </h3>
        <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
          {quickPrompts.map((quickPrompt, index) => (
            <button
              key={index}
              onClick={() => handleQuickPrompt(quickPrompt)}
              className="text-left text-xs bg-gray-800/50 hover:bg-gray-700/50 border border-purple-500/20 rounded-lg px-3 py-2 text-gray-300 hover:text-white transition-colors"
            >
              {quickPrompt}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">handlethe < q className="devicons devicons-laravel"></ q>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the code you want to generate..."
            className="w-full bg-gray-800 border border-purple-500/30 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none resize-none"
            rows={3}
            disabled={isLoading}
          />
          <Code size={16} className="absolute top-3 right-3 text-gray-400" />
        </div>
        
        <button
          type="submit"
          disabled={!prompt.trim() || isLoading}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Send size={16} />
              <span>Generate Code</span>
            </>
          )}
        </button>
      </form>
      <div>
        
      </div>

      {(streamingMessage || lastResponse) && (
        <div className="flex-1 bg-gray-800/30 border border-purple-500/20 rounded-lg p-3 overflow-y-auto">
          <h3 className="text-sm font-medium text-purple-300 mb-2 flex items-center">
            <Sparkles size={14} className="mr-2" />
            Generated Code
          </h3>
          <div className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
            {streamingMessage || lastResponse}
            {isLoading && <span className="animate-pulse">▊</span>}
          </div>
        </div>
      )}
    </div>
  );
}