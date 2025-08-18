'use client';

import { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';

//note mapping and musicalscale
const SCALES = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
  pentatonic: [0, 2, 4, 7, 9],
  blues: [0, 3, 5, 6, 7, 10],
  dorian: [0, 2, 3, 5, 7, 9, 10],
  mixolydian: [0, 2, 4, 5, 7, 9, 10]
};

const NOTE_FREQUENCIES = {
  'C': 261.63, 'C#': 277.18, 'D': 293.66, 'D#': 311.13,
  'E': 329.63, 'F': 349.23, 'F#': 369.99, 'G': 392.00,
  'G#': 415.30, 'A': 440.00, 'A#': 466.16, 'B': 493.88
};

const AudioEngine = forwardRef(({ code, settings, isPlaying }, ref) => {
  const audioContextRef = useRef(null);
  const oscillatorsRef = useRef([]);
  const gainNodeRef = useRef(null);
  const intervalRef = useRef(null);
  const currentCodeRef = useRef('');
  const currentSettingsRef = useRef(settings);

  // Initialize audio context
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.connect(audioContextRef.current.destination);
      gainNodeRef.current.gain.value = settings.volume;
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = settings.volume;
    }
    currentSettingsRef.current = settings;
  }, [settings]);

  const parseCodeStructure = (codeText) => {
    const lines = codeText.split('\n').filter(line => line.trim());
    const structure = {
      keywords: [],
      functions: [],
      variables: [],
      loops: [],
      conditionals: [],
      indentationLevels: [],
      lineLengths: []
    };

    const keywords = ['function', 'const', 'let', 'var', 'if', 'else', 'for', 'while', 'return', 'class', 'import', 'export'];
    
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      const indentLevel = line.length - line.trimStart().length;
      
      structure.indentationLevels.push(indentLevel);
      structure.lineLengths.push(trimmedLine.length);

      keywords.forEach(keyword => {
        if (trimmedLine.includes(keyword)) {
          structure.keywords.push({ keyword, line: index, indent: indentLevel });
        }
      });

      if (trimmedLine.includes('function') || trimmedLine.match(/\w+\s*\(/)) {
        structure.functions.push({ line: index, indent: indentLevel });
      }

      if (trimmedLine.match(/^(const|let|var)\s+\w+/)) {
        structure.variables.push({ line: index, indent: indentLevel });
      }
      if (trimmedLine.match(/^(for|while)\s*\(/)) {
        structure.loops.push({ line: index, indent: indentLevel });
      }

      if (trimmedLine.match(/^if\s*\(/)) {
        structure.conditionals.push({ line: index, indent: indentLevel });
      }
    });

    return structure;
  };

  const getFrequencyFromScale = (noteIndex, key, scale) => {
    const scalePattern = SCALES[scale] || SCALES.major;
    const baseFreq = NOTE_FREQUENCIES[key] || NOTE_FREQUENCIES['C'];
    const octaveMultiplier = Math.floor(noteIndex / scalePattern.length);
    const scaleIndex = noteIndex % scalePattern.length;
    const semitoneOffset = scalePattern[scaleIndex];
    
    return baseFreq * Math.pow(2, octaveMultiplier) * Math.pow(2, semitoneOffset / 12);
  };

  const createOscillator = (frequency, type = 'sine', duration = 0.5) => {
    if (!audioContextRef.current) return null;

    const oscillator = audioContextRef.current.createOscillator();
    const envelope = audioContextRef.current.createGain();
    
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);
    
    envelope.gain.setValueAtTime(0, audioContextRef.current.currentTime);
    envelope.gain.linearRampToValueAtTime(0.3, audioContextRef.current.currentTime + 0.01);
    envelope.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration);
    
    oscillator.connect(envelope);
    envelope.connect(gainNodeRef.current);
    
    return { oscillator, envelope, duration };
  };

  const playMelodyFromCode = (codeStructure, settings) => {
    if (!audioContextRef.current) return;

    const { scale, key, tempo, instrument } = settings;
    const beatDuration = 60 / tempo; // Duration of one beat in seconds
    let currentTime = audioContextRef.current.currentTime;

    oscillatorsRef.current.forEach(({ oscillator }) => {
      try {
        oscillator.stop();
      } catch (e) {
      }
    });
    oscillatorsRef.current = [];

    const melodyElements = [
      ...codeStructure.keywords.map(k => ({ type: 'keyword', ...k })),
      ...codeStructure.functions.map(f => ({ type: 'function', ...f })),
      ...codeStructure.variables.map(v => ({ type: 'variable', ...v }))
    ].sort((a, b) => a.line - b.line);
    melodyElements.forEach((element, index) => {
      const noteIndex = (element.line + element.indent) % 14;
      const frequency = getFrequencyFromScale(noteIndex, key, scale);
      
      // Determine note duration based on line length
      const lineLength = codeStructure.lineLengths[element.line] || 10;
      const noteDuration = Math.max(0.1, Math.min(1.0, lineLength / 50)) * beatDuration;
      
      let oscillatorType = 'sine';
      switch (instrument) {
        case 'synth': oscillatorType = 'sawtooth'; break;
        case 'bass': oscillatorType = 'square'; break;
        case 'strings': oscillatorType = 'sine'; break;
        case 'pad': oscillatorType = 'triangle'; break;
        case 'bell': oscillatorType = 'sine'; break;
        default: oscillatorType = 'sine';
      }

      const noteData = createOscillator(frequency, oscillatorType, noteDuration);
      if (noteData) {
        const { oscillator, envelope } = noteData;
        
        oscillator.start(currentTime);
        oscillator.stop(currentTime + noteDuration);
        
        oscillatorsRef.current.push(noteData);
        currentTime += beatDuration * 0.5;
      }
    });

    const uniqueIndentLevels = [...new Set(codeStructure.indentationLevels)];
    uniqueIndentLevels.forEach((indentLevel, index) => {
      if (indentLevel > 0) {
        const chordRoot = (indentLevel * 2) % 7;
        const chordFreq = getFrequencyFromScale(chordRoot, key, scale);
        const chordThird = getFrequencyFromScale(chordRoot + 2, key, scale);
        
        [chordFreq, chordThird].forEach(freq => {
          const chordNote = createOscillator(freq * 0.5, 'triangle', 2.0);
          if (chordNote) {
            const { oscillator } = chordNote;
            oscillator.start(audioContextRef.current.currentTime + index * 0.5);
            oscillator.stop(audioContextRef.current.currentTime + index * 0.5 + 2.0);
            oscillatorsRef.current.push(chordNote);
          }
        });
      }
    });
  };

  const startPlayback = () => {
    if (!audioContextRef.current || !currentCodeRef.current) return;

    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }

    const codeStructure = parseCodeStructure(currentCodeRef.current);
    playMelodyFromCode(codeStructure, currentSettingsRef.current);

    // Set up continuous playback
    const playbackDuration = Math.max(5000, currentCodeRef.current.split('\n').length * 200);
    intervalRef.current = setInterval(() => {
      if (currentCodeRef.current) {
        const structure = parseCodeStructure(currentCodeRef.current);
        playMelodyFromCode(structure, currentSettingsRef.current);
      }
    }, playbackDuration);
  };

  const stopPlayback = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    oscillatorsRef.current.forEach(({ oscillator }) => {
      try {
        oscillator.stop();
      } catch (e) {
      }
    });
    oscillatorsRef.current = [];
  };

  const pausePlayback = () => {
    if (audioContextRef.current) {
      audioContextRef.current.suspend();
    }
  };

  useImperativeHandle(ref, () => ({
    play: startPlayback,
    pause: pausePlayback,
    stop: stopPlayback,
    updateCode: (newCode) => {
      currentCodeRef.current = newCode;
    },
    updateSettings: (newSettings) => {
      currentSettingsRef.current = newSettings;
      if (gainNodeRef.current) {
        gainNodeRef.current.gain.value = newSettings.volume;
      }
    }
  }));

  useEffect(() => {
    currentCodeRef.current = code;
  }, [code]);

  return null; 
});

AudioEngine.displayName = 'AudioEngine';

export default AudioEngine;