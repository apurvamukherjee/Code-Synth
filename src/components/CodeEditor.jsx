'use client';

import { useEffect, useRef } from 'react';

export default function CodeEditor({ code, onChange, className = '' }) {
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const editorInstanceRef = useRef(null);

  useEffect(() => {
    const loadMonaco = async () => {
      if (typeof window === 'undefined') return;

      if (!window.monaco) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/monaco-editor@0.44.0/min/vs/editor/editor.main.css';
        document.head.appendChild(link);

        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/monaco-editor@0.44.0/min/vs/loader.js';
        
        script.onload = () => {
          window.require.config({ 
            paths: { 
              vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.44.0/min/vs' 
            } 
          });
          
          window.require(['vs/editor/editor.main'], () => {
            initializeEditor();
          });
        };
        
        document.head.appendChild(script);
      } else {
        initializeEditor();
      }
    };

    const initializeEditor = () => {
      if (!editorRef.current || editorInstanceRef.current) return;

      editorInstanceRef.current = window.monaco.editor.create(editorRef.current, {
        value: code,
        language: 'javascript',
        theme: 'vs-dark',
        fontSize: 14,
        lineNumbers: 'on',
        roundedSelection: false,
        scrollBeyondLastLine: false,
        automaticLayout: true,
        minimap: { enabled: false },
        wordWrap: 'on',
        folding: true,
        lineDecorationsWidth: 10,
        lineNumbersMinChars: 3,
        glyphMargin: false,
        contextmenu: true,
        mouseWheelZoom: true,
        smoothScrolling: true,
        cursorBlinking: 'blink',
        cursorSmoothCaretAnimation: true,
        renderWhitespace: 'selection',
        renderControlCharacters: false,
        fontLigatures: true,
        suggest: {
          showKeywords: true,
          showSnippets: true,
        },
      });

      editorInstanceRef.current.onDidChangeModelContent(() => {
        const value = editorInstanceRef.current.getValue();
        onChange(value);
      });

      monacoRef.current = window.monaco;
    };

    loadMonaco();

    return () => {
      if (editorInstanceRef.current) {
        editorInstanceRef.current.dispose();
        editorInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (editorInstanceRef.current && code !== editorInstanceRef.current.getValue()) {
      editorInstanceRef.current.setValue(code);
    }
  }, [code]);

  return (
    <div className={`w-full h-full ${className}`}>
      <div 
        ref={editorRef} 
        className="w-full h-full min-h-[400px]"
        style={{ 
          backgroundColor: '#1e1e1e',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          borderRadius: '0 0 12px 12px'
        }}
      />
    </div>
  );
}