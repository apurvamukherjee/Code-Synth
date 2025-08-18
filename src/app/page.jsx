'use client';

import { useState, useCallback, useRef } from 'react';
import { Play, Pause, Square, Volume2 } from 'lucide-react';
import CodeEditor from '@/components/CodeEditor';
import MusicControls from '@/components/MusicControls';
import GeminiPanel from '@/components/GeminiPanel';
import AudioEngine from '@/components/AudioEngine';

export default function CodeSynth() {
  const [code, setCode] = useState(`// Supp? this is Code Synth by Apurva
// some basic trial code , have funn!!

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

for (let i = 0; i < 10; i++) {
  console.log(fibonacci(i));
}`);

  const [isPlaying, setIsPlaying] = useState(false);
  const [musicSettings, setMusicSettings] = useState({
    scale: 'major',
    key: 'C',
    tempo: 120,
    instrument: 'piano',
    volume: 0.7
  });

  const audioEngineRef = useRef(null);

  const handlePlay = useCallback(() => {
    if (audioEngineRef.current) {
      audioEngineRef.current.play();
      setIsPlaying(true);
    }
  }, []);

  const handlePause = useCallback(() => {
    if (audioEngineRef.current) {
      audioEngineRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const handleStop = useCallback(() => {
    if (audioEngineRef.current) {
      audioEngineRef.current.stop();
      setIsPlaying(false);
    }
  }, []);

  const handleCodeChange = useCallback((newCode) => {
    setCode(newCode);
    if (isPlaying) {
      handleStop();
    }
  }, [isPlaying, handleStop]);

  const handleSettingsChange = useCallback((newSettings) => {
    setMusicSettings(newSettings);
  }, [musicSettings]);

  return (
    <div className="min-h-screen text-white">
      <header className="border-b border-purple-500/20 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Volume2 size={20} />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Code Synth
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePlay}
                disabled={isPlaying}
                className="p-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-lg transition-colors"
              >
                <Play size={20} />
              </button>
              <button
                onClick={handlePause}
                disabled={!isPlaying}
                className="p-2 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 rounded-lg transition-colors"
              >
                <Pause size={20} />
              </button>
              <button
                onClick={handleStop}
                className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                <Square size={20} />
              </button>
              <button
                onClick={() => {
                  document.documentElement.classList.toggle('dark');
                }}
                className="p-2 rounded bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
              >
                Toggle Dark Mode
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-120px)]">
          <div className="lg:col-span-2 bg-black/40 backdrop-blur-sm rounded-xl border border-purple-500/20 overflow-hidden">
            <div className="p-4 border-b border-purple-500/20">
              <h2 className="text-lg font-semibold text-purple-300">Code Editor</h2>
              <p className="text-sm text-gray-400">by Apurva</p>
            </div>
            <CodeEditor
              code={code}
              onChange={handleCodeChange}
              className="h-full"
            />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
              <h2 className="text-lg font-semibold text-purple-300 mb-4">Music Controls</h2>
              <MusicControls
                settings={musicSettings}
                onChange={handleSettingsChange}
              />
            </div>

            <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6 flex-1">
              <h2 className="text-lg font-semibold text-purple-300 mb-4">AI Code Generator</h2>
              <GeminiPanel onCodeGenerated={setCode} />
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-purple-500/20 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 text-center text-gray-400">
          &copy; 2025 Code Synth by Apurva
        </div>
      </footer>

      <AudioEngine
        ref={audioEngineRef}
        code={code}
        settings={musicSettings}
        isPlaying={isPlaying}
      />
    </div>
  );
}