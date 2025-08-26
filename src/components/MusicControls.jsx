'use client';

import { useState, useEffect } from 'react';

const scales = ['major', 'minor', 'pentatonic'];
const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const instruments = ['sine', 'triangle', 'square', 'sawtooth'];

export default function MusicControls({ settings, onChange }) {
  const [localSettings, setLocalSettings] = useState(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalSettings(prevSettings => ({
      ...prevSettings,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onChange(localSettings);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Scale and Key */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="flex items-center text-sm font-medium text-red-300 mb-2">
            Scale
          </label>
          <select
            name="scale"
            value={localSettings.scale}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-red-500/30 rounded-lg px-3 py-2 text-white focus:border-red-400 focus:outline-none"
          >
            {scales.map(scale => (
              <option key={scale} value={scale}>
                {scale}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-red-300 mb-2">
            Key
          </label>
          <select
            name="key"
            value={localSettings.key}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-red-500/30 rounded-lg px-3 py-2 text-white focus:border-red-400 focus:outline-none"
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
        <label className="flex items-center text-sm font-medium text-red-300 mb-2">
          Tempo: {localSettings.tempo} BPM
        </label>
        <input
          type="range"
          min="60"
          max="200"
          value={localSettings.tempo}
          onChange={(e) => setLocalSettings({ ...localSettings, tempo: parseInt(e.target.value, 10) })}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>60</span>
          <span>200</span>
        </div>
      </div>

      <div>
        <label className="flex items-center text-sm font-medium text-red-300 mb-2">
          Instrument
        </label>
        <select
          name="instrument"
          value={localSettings.instrument}
          onChange={handleChange}
          className="w-full bg-gray-800 border border-red-500/30 rounded-lg px-3 py-2 text-white focus:border-red-400 focus:outline-none"
        >
          {instruments.map(instrument => (
            <option key={instrument} value={instrument}>
              {instrument}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="flex items-center text-sm font-medium text-red-300 mb-2">
          Volume: {Math.round(localSettings.volume * 100)}%
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={localSettings.volume}
          onChange={(e) => setLocalSettings({ ...localSettings, volume: parseFloat(e.target.value) })}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>

      {/* The new button replaces the old one */}
      <a onClick={handleSubmit} className="codepen-button block w-full"><span>Apply Settings</span></a>

      <style jsx>{`
        .codepen-button {
          display: block;
          cursor: pointer;
          color: white;
          margin: 0 auto;
          position: relative;
          text-decoration: none;
          font-weight: 600;
          border-radius: 6px;
          overflow: hidden;
          padding: 3px;
          isolation: isolate;
        }

        .codepen-button::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 400%;
          height: 100%;
          background: linear-gradient(115deg,#4fcf70,#fad648,#a767e5,#12bcfe,#44ce7b);
          background-size: 25% 100%;
          animation: an-at-keyframe-css-at-rule-that-translates-via-the-transform-property-the-background-by-negative-25-percent-of-its-width-so-that-it-gives-a-nice-border-animation_-We-use-the-translate-property-to-have-a-nice-transition-so-it_s-not-a-jerk-of-a-start-or-stop .75s linear infinite;
          animation-play-state: paused;
          translate: -5% 0%;
          transition: translate 0.25s ease-out;
        }

        .codepen-button:hover::before {
          animation-play-state: running;
          transition-duration: 0.75s;
          translate: 0% 0%;
        }

        @keyframes an-at-keyframe-css-at-rule-that-translates-via-the-transform-property-the-background-by-negative-25-percent-of-its-width-so-that-it-gives-a-nice-border-animation_-We-use-the-translate-property-to-have-a-nice-transition-so-it_s-not-a-jerk-of-a-start-or-stop {
          to {
            transform: translateX(-25%);
          }
        }

        .codepen-button span {
          position: relative;
          display: block;
          padding: 1rem 1.5rem;
          font-size: 1.1rem;
          background: #000;
          border-radius: 3px;
          height: 100%;
        }

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
    </form>
  );
}
