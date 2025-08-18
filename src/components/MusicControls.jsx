'use client';

import { Volume2, Music, Clock, Settings } from 'lucide-react';

export default function MusicControls({ settings, onChange }) {
  const scales = [
    { value: 'major', label: 'Major' },
    { value: 'minor', label: 'Minor' },
    { value: 'pentatonic', label: 'Pentatonic' },
    { value: 'blues', label: 'Blues' },
    { value: 'dorian', label: 'Dorian' },
    { value: 'mixolydian', label: 'Mixolydian' }
  ];

  const keys = [
    'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
  ];

  const instruments = [
    { value: 'piano', label: 'Piano' },
    { value: 'synth', label: 'Synth Lead' },
    { value: 'bass', label: 'Bass' },
    { value: 'strings', label: 'Strings' },
    { value: 'pad', label: 'Pad' },
    { value: 'bell', label: 'Bell' }
  ];

  const handleChange = (key, value) => {
    onChange({ [key]: value });
  };

  return (
    <div className="space-y-6">
      {/* Scale and Key */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="flex items-center text-sm font-medium text-purple-300 mb-2">
            <Music size={16} className="mr-2" />
            Scale
          </label>
          <select
            value={settings.scale}
            onChange={(e) => handleChange('scale', e.target.value)}
            className="w-full bg-gray-800 border border-purple-500/30 rounded-lg px-3 py-2 text-white focus:border-purple-400 focus:outline-none"
          >
            {scales.map(scale => (
              <option key={scale.value} value={scale.value}>
                {scale.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-purple-300 mb-2">
            <Settings size={16} className="mr-2" />
            Key
          </label>
          <select
            value={settings.key}
            onChange={(e) => handleChange('key', e.target.value)}
            className="w-full bg-gray-800 border border-purple-500/30 rounded-lg px-3 py-2 text-white focus:border-purple-400 focus:outline-none"
          >
            {keys.map(key => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="flex items-center text-sm font-medium text-purple-300 mb-2">
          <Clock size={16} className="mr-2" />
          Tempo: {settings.tempo} BPM
        </label>
        <input
          type="range"
          min="60"
          max="200"
          value={settings.tempo}
          onChange={(e) => handleChange('tempo', parseInt(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>60</span>
          <span>200</span>
        </div>
      </div>

      <div>
        <label className="flex items-center text-sm font-medium text-purple-300 mb-2">
          <Music size={16} className="mr-2" />
          Instrument
        </label>
        <select
          value={settings.instrument}
          onChange={(e) => handleChange('instrument', e.target.value)}
          className="w-full bg-gray-800 border border-purple-500/30 rounded-lg px-3 py-2 text-white focus:border-purple-400 focus:outline-none"
        >
          {instruments.map(instrument => (
            <option key={instrument.value} value={instrument.value}>
              {instrument.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="flex items-center text-sm font-medium text-purple-300 mb-2">
          <Volume2 size={16} className="mr-2" />
          Volume: {Math.round(settings.volume * 100)}%
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={settings.volume}
          onChange={(e) => handleChange('volume', parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: linear-gradient(45deg, #8b5cf6, #ec4899);
          cursor: pointer;
          border: 2px solid #1f2937;
        }

        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: linear-gradient(45deg, #8b5cf6, #ec4899);
          cursor: pointer;
          border: 2px solid #1f2937;
        }

        .slider::-webkit-slider-track {
          background: #374151;
          border-radius: 4px;
        }

        .slider::-moz-range-track {
          background: #374151;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}