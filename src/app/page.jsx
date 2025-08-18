'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import CodeEditor from '@/components/CodeEditor';
import MusicControls from '@/components/MusicControls';
import GeminiPanel from '@/components/GeminiPanel';
import AudioEngine from '@/components/AudioEngine';
import { Play, Pause, Square, Volume2 } from 'lucide-react';
import MacHeader from '@/components/MacHeader'; // Import the MacHeader component

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
    if (audioEngineRef.current && isPlaying) {
      audioEngineRef.current.updateCode(newCode);
    }
  }, [isPlaying]);

  const handleSettingsChange = useCallback((newSettings) => {
    setMusicSettings(prev => ({ ...prev, ...newSettings }));
    if (audioEngineRef.current) {
      audioEngineRef.current.updateSettings({ ...musicSettings, ...newSettings });
    }
  }, [musicSettings]);

  return (
    <div className="min-h-screen text-white">
      <header className="border-b border-purple-500/20 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                <img src="/src/components/icon.jpg" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                Code Synth by Apurva
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
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-120px)]">
          <div className="lg:col-span-2 bg-black/40 backdrop-blur-sm rounded-xl border border-purple-500/20 overflow-hidden">
            <div className="p-4 border-b border-purple-500/20 flex items-center space-x-4"> {/* Added flex container */}
              <MacHeader />
              <div>
                <h2 className="text-lg font-semibold text-purple-300">Code Editor</h2>
                <p className="text-sm text-gray-400">by Apurva</p>
              </div>
            </div>
            <CodeEditor
              code={code}
              onChange={handleCodeChange}
              className="h-full"
            />
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Music Controls */}
            <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
              <div className="flex items-center space-x-4"> {/* Added flex container */}
                <MacHeader />
                <h2 className="text-lg font-semibold text-purple-300">Music Controls</h2>
              </div>
              <MusicControls
                settings={musicSettings}
                onChange={handleSettingsChange}
              />
            </div>

            {/* Gemini AI Panel */}
            <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6 flex-1">
              <div className="flex items-center space-x-4"> {/* Added flex container */}
                <MacHeader />
                <h2 className="text-lg font-semibold text-purple-300">AI Code Generator</h2>
              </div>
              <GeminiPanel onCodeGenerated={setCode} />
            </div>
          </div>
        </div>
      </div>

      {/* Audio Engine */}
      <AudioEngine
        ref={audioEngineRef}
        code={code}
        settings={musicSettings}
        isPlaying={isPlaying}
      />

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
}