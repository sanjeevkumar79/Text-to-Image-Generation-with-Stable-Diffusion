// AI Music Generation Service using Gemini API with Comprehensive Datasets

// Musical Genre Datasets
export const MUSIC_GENRE_DATASETS = {
    classical: {
        scales: [
            "C major", "G major", "D major", "A major", "E major", "B major", "F# major",
            "C# major", "F major", "Bb major", "Eb major", "Ab major", "Db major", "Gb major",
            "A minor", "E minor", "B minor", "F# minor", "C# minor", "G# minor", "D# minor",
            "A# minor", "D minor", "G minor", "C minor", "F minor", "Bb minor", "Eb minor"
        ],
        instruments: [
            "piano", "violin", "viola", "cello", "double bass", "flute", "oboe", "clarinet",
            "bassoon", "french horn", "trumpet", "trombone", "tuba", "harp", "timpani"
        ],
        techniques: [
            "legato", "staccato", "pizzicato", "arco", "tremolo", "vibrato", "glissando",
            "trill", "mordent", "turn", "appoggiatura", "acciaccatura"
        ],
        forms: [
            "sonata", "symphony", "concerto", "fugue", "prelude", "etude", "nocturne",
            "waltz", "minuet", "scherzo", "rondo", "theme and variations"
        ]
    },
    jazz: {
        scales: [
            "blues scale", "pentatonic", "dorian", "mixolydian", "lydian", "altered scale",
            "whole tone", "diminished", "bebop scale", "chromatic"
        ],
        instruments: [
            "saxophone", "trumpet", "trombone", "piano", "double bass", "drums",
            "guitar", "vibraphone", "clarinet", "flute", "harmonica"
        ],
        techniques: [
            "swing", "syncopation", "improvisation", "blue notes", "call and response",
            "walking bass", "comping", "scat singing", "bent notes", "slides"
        ],
        styles: [
            "bebop", "swing", "cool jazz", "hard bop", "free jazz", "fusion",
            "smooth jazz", "latin jazz", "acid jazz", "contemporary jazz"
        ]
    },
    electronic: {
        genres: [
            "house", "techno", "trance", "dubstep", "drum and bass", "ambient",
            "downtempo", "breakbeat", "garage", "synthwave", "chillwave"
        ],
        synthesis: [
            "subtractive", "additive", "FM", "wavetable", "granular", "physical modeling",
            "sample-based", "analog modeling", "digital", "hybrid"
        ],
        effects: [
            "reverb", "delay", "chorus", "flanger", "phaser", "distortion", "compression",
            "EQ", "filter", "bitcrusher", "vocoder", "auto-tune", "sidechaining"
        ],
        elements: [
            "kick drum", "snare", "hi-hat", "bass line", "lead synth", "pad", "arp",
            "vocal chops", "white noise", "risers", "drops", "builds"
        ]
    },
    rock: {
        subgenres: [
            "classic rock", "hard rock", "metal", "punk", "alternative", "grunge",
            "progressive", "indie rock", "post-rock", "garage rock"
        ],
        instruments: [
            "electric guitar", "bass guitar", "drums", "vocals", "keyboard", "harmonica",
            "saxophone", "violin", "mandolin", "banjo"
        ],
        techniques: [
            "power chords", "palm muting", "bending", "vibrato", "hammer-on", "pull-off",
            "tapping", "sweep picking", "alternate picking", "tremolo picking"
        ],
        rhythms: [
            "4/4 time", "shuffle", "swing", "straight", "syncopated", "polyrhythm",
            "odd time signatures", "blast beats", "double bass", "fills"
        ]
    },
    ambient: {
        textures: [
            "ethereal", "atmospheric", "spacious", "floating", "dreamy", "meditative",
            "cinematic", "organic", "synthetic", "evolving", "static", "morphing"
        ],
        instruments: [
            "synthesizer", "piano", "strings", "field recordings", "voice", "guitar",
            "flute", "bells", "bowls", "nature sounds", "drones", "pads"
        ],
        techniques: [
            "reverb", "delay", "granular synthesis", "time stretching", "pitch shifting",
            "filtering", "layering", "crossfading", "looping", "modulation"
        ],
        moods: [
            "peaceful", "mysterious", "contemplative", "uplifting", "dark", "bright",
            "nostalgic", "futuristic", "natural", "artificial", "warm", "cold"
        ]
    },
    folk: {
        traditions: [
            "american folk", "irish folk", "scottish folk", "english folk", "nordic folk",
            "eastern european", "latin american", "african", "asian folk", "contemporary folk"
        ],
        instruments: [
            "acoustic guitar", "banjo", "mandolin", "fiddle", "harmonica", "accordion",
            "dulcimer", "tin whistle", "bodhrán", "concertina", "autoharp"
        ],
        scales: [
            "major", "minor", "dorian", "mixolydian", "pentatonic", "blues",
            "modal scales", "ethnic scales", "church modes"
        ],
        techniques: [
            "fingerpicking", "strumming", "flatpicking", "clawhammer", "bowing",
            "ornamentation", "slides", "hammer-ons", "pull-offs", "harmonics"
        ]
    }
};

// Mood and Emotion Datasets
export const MUSIC_MOOD_DATASETS = {
    happy: {
        keys: ["C major", "G major", "D major", "F major", "Bb major"],
        tempos: [120, 130, 140, 150, 160],
        rhythms: ["upbeat", "bouncy", "energetic", "lively", "cheerful"],
        dynamics: [0.7, 0.8, 0.9, 0.85, 0.75],
        instruments: ["piano", "guitar", "violin", "flute", "trumpet"]
    },
    sad: {
        keys: ["A minor", "E minor", "D minor", "F# minor", "C minor"],
        tempos: [60, 70, 80, 90, 65],
        rhythms: ["slow", "melancholic", "dragging", "heavy", "mournful"],
        dynamics: [0.3, 0.4, 0.5, 0.45, 0.35],
        instruments: ["cello", "piano", "violin", "flute", "voice"]
    },
    energetic: {
        keys: ["E major", "A major", "D major", "B major", "F# major"],
        tempos: [140, 150, 160, 170, 180],
        rhythms: ["driving", "pulsing", "aggressive", "intense", "powerful"],
        dynamics: [0.8, 0.9, 1.0, 0.95, 0.85],
        instruments: ["drums", "electric guitar", "bass", "synthesizer", "brass"]
    },
    calm: {
        keys: ["F major", "Bb major", "Eb major", "Ab major", "Db major"],
        tempos: [70, 80, 90, 85, 75],
        rhythms: ["flowing", "gentle", "peaceful", "serene", "relaxed"],
        dynamics: [0.4, 0.5, 0.6, 0.55, 0.45],
        instruments: ["piano", "strings", "flute", "harp", "soft pads"]
    },
    mysterious: {
        keys: ["F# minor", "C# minor", "G# minor", "D# minor", "Bb minor"],
        tempos: [90, 100, 110, 95, 105],
        rhythms: ["suspenseful", "eerie", "haunting", "enigmatic", "dark"],
        dynamics: [0.5, 0.6, 0.7, 0.4, 0.8],
        instruments: ["strings", "synthesizer", "piano", "woodwinds", "percussion"]
    },
    dramatic: {
        keys: ["C minor", "G minor", "F minor", "Bb minor", "Eb minor"],
        tempos: [100, 110, 120, 130, 115],
        rhythms: ["building", "crescendo", "intense", "climactic", "powerful"],
        dynamics: [0.6, 0.7, 0.8, 0.9, 1.0],
        instruments: ["orchestra", "brass", "timpani", "strings", "choir"]
    }
};

// Musical Scale Datasets (MIDI note numbers)
export const MUSIC_SCALE_DATASETS = {
    major: [0, 2, 4, 5, 7, 9, 11],
    minor: [0, 2, 3, 5, 7, 8, 10],
    dorian: [0, 2, 3, 5, 7, 9, 10],
    phrygian: [0, 1, 3, 5, 7, 8, 10],
    lydian: [0, 2, 4, 6, 7, 9, 11],
    mixolydian: [0, 2, 4, 5, 7, 9, 10],
    locrian: [0, 1, 3, 5, 6, 8, 10],
    blues: [0, 3, 5, 6, 7, 10],
    pentatonic_major: [0, 2, 4, 7, 9],
    pentatonic_minor: [0, 3, 5, 7, 10],
    chromatic: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    whole_tone: [0, 2, 4, 6, 8, 10],
    diminished: [0, 2, 3, 5, 6, 8, 9, 11],
    harmonic_minor: [0, 2, 3, 5, 7, 8, 11],
    melodic_minor: [0, 2, 3, 5, 7, 9, 11]
};

// Rhythm Pattern Datasets
export const MUSIC_RHYTHM_DATASETS = {
    common_time: {
        patterns: [
            [1, 0, 0.5, 0], // Strong-weak-medium-weak
            [1, 0.3, 0.7, 0.3], // Rock pattern
            [1, 0, 0.8, 0], // Pop pattern
            [1, 0.5, 0.5, 0.5] // Even pattern
        ],
        subdivisions: [0.25, 0.5, 1.0, 2.0] // Quarter, half, whole, double
    },
    waltz: {
        patterns: [
            [1, 0.3, 0.3], // Strong-weak-weak
            [1, 0.5, 0.5], // Even waltz
            [1, 0, 0.4] // Classical waltz
        ],
        subdivisions: [0.33, 0.67, 1.0] // Triplet feel
    },
    swing: {
        patterns: [
            [1, 0, 0.7, 0], // Swing feel
            [1, 0.3, 0.8, 0.3], // Jazz swing
            [1, 0.5, 0.9, 0.2] // Shuffle
        ],
        subdivisions: [0.67, 0.33, 1.0] // Swing eighth notes
    }
};

// Instrument Timbral Datasets
export const MUSIC_INSTRUMENT_DATASETS = {
    piano: {
        harmonics: [1, 0.5, 0.25, 0.125, 0.0625],
        attack: 0.01,
        decay: 0.3,
        sustain: 0.7,
        release: 1.0,
        brightness: 0.8
    },
    guitar: {
        harmonics: [1, 0.7, 0.3, 0.5, 0.2],
        attack: 0.02,
        decay: 0.1,
        sustain: 0.6,
        release: 0.8,
        brightness: 0.9
    },
    violin: {
        harmonics: [1, 0.8, 0.6, 0.4, 0.3],
        attack: 0.05,
        decay: 0.2,
        sustain: 0.9,
        release: 0.5,
        brightness: 1.0
    },
    flute: {
        harmonics: [1, 0.3, 0.1, 0.05, 0.02],
        attack: 0.03,
        decay: 0.1,
        sustain: 0.8,
        release: 0.3,
        brightness: 0.7
    },
    trumpet: {
        harmonics: [1, 0.6, 0.4, 0.3, 0.2],
        attack: 0.01,
        decay: 0.2,
        sustain: 0.8,
        release: 0.4,
        brightness: 1.0
    },
    cello: {
        harmonics: [1, 0.7, 0.5, 0.3, 0.2],
        attack: 0.08,
        decay: 0.3,
        sustain: 0.9,
        release: 0.8,
        brightness: 0.6
    },
    synthesizer: {
        harmonics: [1, 0.8, 0.6, 0.4, 0.2],
        attack: 0.01,
        decay: 0.2,
        sustain: 0.7,
        release: 0.5,
        brightness: 0.9
    }
};

// Musical Form and Structure Datasets
export const MUSIC_STRUCTURE_DATASETS = {
    song_forms: {
        verse_chorus: ["verse", "chorus", "verse", "chorus", "bridge", "chorus", "outro"],
        aaba: ["A", "A", "B", "A"],
        twelve_bar_blues: ["I", "I", "I", "I", "IV", "IV", "I", "I", "V", "IV", "I", "I"],
        classical_sonata: ["exposition", "development", "recapitulation"]
    },
    phrase_lengths: [2, 4, 8, 16, 32], // In measures
    cadences: ["authentic", "plagal", "deceptive", "half", "phrygian"]
};

export interface MusicGenerationOptions {
    genre: string;
    tempo: number;
    duration: number;
    mood: string;
    instruments: string[];
}

export interface MusicPattern {
    notes: number[];
    durations: number[];
    dynamics: number[];
    scale: string;
    key: string;
    rhythm: string[];
}

// Use the provided Gemini API key
const GEMINI_API_KEY = 'AIzaSyATePM6jEkbgLA6QskEWHjsZ1-NjsBrKOo';

// Helper functions to handle different genre data structures
const getGenreScales = (genreData: any): string => {
    if (genreData.scales) return genreData.scales.join(', ');
    if (genreData.genres) return 'pentatonic, blues, chromatic';
    return 'major, minor';
};

const getGenreInstruments = (genreData: any): string => {
    if (genreData.instruments) return genreData.instruments.join(', ');
    if (genreData.genres) return 'synthesizer, drum machine, sampler';
    return 'piano, strings';
};

const getGenreTechniques = (genreData: any): string => {
    if (genreData.techniques) return genreData.techniques.join(', ');
    if (genreData.effects) return genreData.effects.join(', ');
    if (genreData.synthesis) return genreData.synthesis.join(', ');
    return 'legato, staccato';
};

export const generateMusicWithGemini = async (
    text: string,
    options: MusicGenerationOptions
): Promise<string> => {
    try {
        // First, use Gemini to analyze the text and create musical parameters
        const musicPattern = await analyzeMusicWithGemini(text, options);
        
        // Then generate the actual audio using Web Audio API with enhanced parameters
        const audioUrl = await createEnhancedMusic(musicPattern, options);
        
        return audioUrl;
    } catch (error) {
        console.error('Gemini music generation failed:', error);
        // Fallback to basic music generation
        return await createBasicMusic(text, options);
    }
};

// Analyze text with Gemini to create musical patterns
const analyzeMusicWithGemini = async (
    text: string,
    options: MusicGenerationOptions
): Promise<MusicPattern> => {
    try {
        const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
        
        // Get genre-specific data
        const genreData = MUSIC_GENRE_DATASETS[options.genre as keyof typeof MUSIC_GENRE_DATASETS] || MUSIC_GENRE_DATASETS.ambient;
        const moodData = MUSIC_MOOD_DATASETS[options.mood as keyof typeof MUSIC_MOOD_DATASETS] || MUSIC_MOOD_DATASETS.calm;
        const instrumentData = MUSIC_INSTRUMENT_DATASETS[options.instruments[0] as keyof typeof MUSIC_INSTRUMENT_DATASETS] || MUSIC_INSTRUMENT_DATASETS.piano;
        
        const musicPrompt = `
            You are an expert AI music composer. Analyze this text and create sophisticated musical parameters:
            
            Text: "${text}"
            Genre: "${options.genre}" 
            Mood: "${options.mood}"
            Primary Instrument: "${options.instruments[0]}"
            Tempo: ${options.tempo} BPM
            Duration: ${options.duration} seconds
            
            GENRE CONTEXT:
            Available scales: ${getGenreScales(genreData)}
            Typical instruments: ${getGenreInstruments(genreData)}
            Musical techniques: ${getGenreTechniques(genreData)}
            
            MOOD CONTEXT:
            Suitable keys: ${moodData.keys.join(', ')}
            Typical tempos: ${moodData.tempos.join(', ')} BPM
            Rhythm characteristics: ${moodData.rhythms.join(', ')}
            Dynamic range: ${moodData.dynamics.join(', ')}
            Recommended instruments: ${moodData.instruments.join(', ')}
            
            INSTRUMENT CHARACTERISTICS:
            Harmonics: ${instrumentData.harmonics.join(', ')}
            ADSR: Attack ${instrumentData.attack}, Decay ${instrumentData.decay}, Sustain ${instrumentData.sustain}, Release ${instrumentData.release}
            Brightness: ${instrumentData.brightness}
            
            ANALYSIS REQUIREMENTS:
            1. Analyze text emotion, rhythm, syllable patterns, and semantic meaning
            2. Map text characteristics to musical elements using the provided datasets
            3. Create a 16-note melody using MIDI numbers 48-84 (C3-C6)
            4. Generate note durations based on text phrasing and genre conventions
            5. Set dynamics based on text emotion and mood requirements
            6. Choose appropriate scale and key from the genre/mood datasets
            7. Apply rhythmic patterns that match the text's natural flow
            
            TEXT ANALYSIS MAPPING:
            - Emotional words → Dynamic levels and note selection
            - Syllable count → Note durations and phrasing
            - Punctuation → Musical phrases and rests
            - Word stress → Rhythmic emphasis
            - Text length → Musical structure and development
            - Semantic meaning → Harmonic progression and scale choice
            
            Respond in this exact JSON format:
            {
                "notes": [60, 62, 64, 65, 67, 69, 71, 72, 74, 76, 77, 79, 81, 83, 84, 72],
                "durations": [0.5, 0.5, 1.0, 0.5, 0.5, 1.0, 0.5, 0.5, 1.0, 0.5, 0.5, 1.0, 0.5, 0.5, 1.0, 2.0],
                "dynamics": [0.7, 0.8, 0.9, 0.6, 0.7, 0.8, 0.9, 0.8, 0.7, 0.6, 0.7, 0.8, 0.9, 0.8, 0.7, 0.5],
                "scale": "major",
                "key": "C",
                "rhythm": ["strong", "weak", "medium", "weak", "strong", "weak", "medium", "weak", "strong", "weak", "medium", "weak", "strong", "weak", "medium", "weak"]
            }
        `;

        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: musicPrompt
                    }]
                }]
            }),
        });

        if (!response.ok) {
            throw new Error(`Gemini API error: ${response.statusText}`);
        }

        const data = await response.json();
        const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        
        // Extract JSON from response
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const musicPattern = JSON.parse(jsonMatch[0]);
            return musicPattern;
        }
        
        throw new Error('Invalid response format');
    } catch (error) {
        console.error('Gemini music analysis failed:', error);
        // Return default pattern based on text characteristics
        return createDefaultMusicPattern(text, options);
    }
};

// Create enhanced music using AI-generated patterns and comprehensive datasets
const createEnhancedMusic = async (
    pattern: MusicPattern,
    options: MusicGenerationOptions
): Promise<string> => {
    return new Promise((resolve) => {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const sampleRate = audioContext.sampleRate;
        const totalDuration = options.duration;
        const buffer = audioContext.createBuffer(1, sampleRate * totalDuration, sampleRate);
        const data = buffer.getChannelData(0);
        
        // Get instrument characteristics from datasets
        const instrumentData = MUSIC_INSTRUMENT_DATASETS[options.instruments[0] as keyof typeof MUSIC_INSTRUMENT_DATASETS] || MUSIC_INSTRUMENT_DATASETS.piano;
        const moodData = MUSIC_MOOD_DATASETS[options.mood as keyof typeof MUSIC_MOOD_DATASETS] || MUSIC_MOOD_DATASETS.calm;
        
        let currentTime = 0;
        const beatDuration = 60 / options.tempo; // Duration of one beat in seconds
        
        // Generate music based on the AI pattern with enhanced synthesis
        for (let i = 0; i < pattern.notes.length && currentTime < totalDuration; i++) {
            const midiNote = pattern.notes[i];
            const noteDuration = pattern.durations[i] * beatDuration;
            const dynamic = pattern.dynamics[i];
            const rhythmStrength = pattern.rhythm && pattern.rhythm[i] ? getRhythmStrength(pattern.rhythm[i]) : 1.0;
            
            // Convert MIDI note to frequency
            const frequency = 440 * Math.pow(2, (midiNote - 69) / 12);
            
            // Generate the note with sophisticated synthesis
            const startSample = Math.floor(currentTime * sampleRate);
            const endSample = Math.min(
                Math.floor((currentTime + noteDuration) * sampleRate),
                data.length
            );
            
            for (let s = startSample; s < endSample; s++) {
                const t = s / sampleRate;
                const noteTime = t - currentTime;
                const normalizedTime = noteTime / noteDuration;
                
                // Create ADSR envelope based on instrument characteristics
                let envelope = 1.0;
                if (normalizedTime < instrumentData.attack) {
                    // Attack phase
                    envelope = normalizedTime / instrumentData.attack;
                } else if (normalizedTime < instrumentData.attack + instrumentData.decay) {
                    // Decay phase
                    const decayTime = (normalizedTime - instrumentData.attack) / instrumentData.decay;
                    envelope = 1.0 - (1.0 - instrumentData.sustain) * decayTime;
                } else if (normalizedTime < 0.8) {
                    // Sustain phase
                    envelope = instrumentData.sustain;
                } else {
                    // Release phase
                    const releaseTime = (normalizedTime - 0.8) / 0.2;
                    envelope = instrumentData.sustain * (1.0 - releaseTime);
                }
                
                envelope *= dynamic * rhythmStrength;
                
                // Generate complex waveform using instrument harmonics
                let sample = 0;
                for (let h = 0; h < instrumentData.harmonics.length; h++) {
                    const harmonicFreq = frequency * (h + 1);
                    const harmonicAmp = instrumentData.harmonics[h] * envelope;
                    sample += Math.sin(2 * Math.PI * harmonicFreq * t) * harmonicAmp;
                }
                
                // Apply instrument-specific modifications
                if (options.instruments.includes('guitar')) {
                    // Add slight detuning for guitar-like sound
                    const detune = 1 + (Math.random() - 0.5) * 0.01;
                    sample *= detune;
                } else if (options.instruments.includes('violin')) {
                    // Add vibrato for violin
                    const vibrato = 1 + 0.02 * Math.sin(2 * Math.PI * 5 * t);
                    sample *= vibrato;
                } else if (options.instruments.includes('flute')) {
                    // Add breath noise for flute
                    const breathNoise = (Math.random() - 0.5) * 0.05 * envelope;
                    sample += breathNoise;
                }
                
                // Apply mood-specific effects
                if (options.mood === 'mysterious') {
                    // Add tremolo effect
                    const tremolo = 1 + 0.1 * Math.sin(2 * Math.PI * 3 * t);
                    sample *= tremolo;
                } else if (options.mood === 'energetic') {
                    // Add slight distortion
                    sample = Math.tanh(sample * 1.5) * 0.8;
                } else if (options.mood === 'dramatic') {
                    // Add crescendo effect
                    const crescendo = Math.min(currentTime / (totalDuration * 0.7), 1.0);
                    sample *= (0.5 + 0.5 * crescendo);
                }
                
                // Apply brightness filter based on instrument
                if (instrumentData.brightness < 0.8) {
                    // Low-pass filter for warmer instruments
                    const cutoff = instrumentData.brightness * 0.5;
                    sample *= cutoff;
                }
                
                data[s] += sample * 0.3; // Master volume
            }
            
            currentTime += noteDuration;
        }
        
        // Apply final processing
        applyFinalProcessing(data, options, moodData);
        
        // Convert to WAV and create blob URL
        const offlineContext = new OfflineAudioContext(1, buffer.length, sampleRate);
        const source = offlineContext.createBufferSource();
        source.buffer = buffer;
        source.connect(offlineContext.destination);
        source.start();
        
        offlineContext.startRendering().then((renderedBuffer) => {
            const wav = audioBufferToWav(renderedBuffer);
            const blob = new Blob([wav], { type: 'audio/wav' });
            const url = URL.createObjectURL(blob);
            resolve(url);
        });
    });
};

// Helper function to get rhythm strength
const getRhythmStrength = (rhythmType: string): number => {
    switch (rhythmType) {
        case 'strong': return 1.0;
        case 'medium': return 0.7;
        case 'weak': return 0.4;
        default: return 0.8;
    }
};

// Apply final processing based on mood and genre
const applyFinalProcessing = (
    data: Float32Array, 
    options: MusicGenerationOptions, 
    moodData: any
): void => {
    // Apply reverb simulation for ambient music
    if (options.genre === 'ambient') {
        for (let i = 0; i < data.length; i++) {
            const delay1 = i - Math.floor(0.1 * 44100); // 100ms delay
            const delay2 = i - Math.floor(0.2 * 44100); // 200ms delay
            if (delay1 >= 0) data[i] += data[delay1] * 0.3;
            if (delay2 >= 0) data[i] += data[delay2] * 0.15;
        }
    }
    
    // Apply compression for rock/electronic
    if (options.genre === 'rock' || options.genre === 'electronic') {
        for (let i = 0; i < data.length; i++) {
            const threshold = 0.7;
            const ratio = 4.0;
            if (Math.abs(data[i]) > threshold) {
                const excess = Math.abs(data[i]) - threshold;
                const compressedExcess = excess / ratio;
                data[i] = Math.sign(data[i]) * (threshold + compressedExcess);
            }
        }
    }
    
    // Apply gentle limiting to prevent clipping
    for (let i = 0; i < data.length; i++) {
        data[i] = Math.tanh(data[i] * 0.8) * 0.9;
    }
};

// Fallback: Create default music pattern based on text analysis using comprehensive datasets
const createDefaultMusicPattern = (
    text: string,
    options: MusicGenerationOptions
): MusicPattern => {
    const textLength = text.length;
    const words = text.split(' ').length;
    const sentences = text.split(/[.!?]/).length;
    
    // Get data from comprehensive datasets
    const moodData = MUSIC_MOOD_DATASETS[options.mood as keyof typeof MUSIC_MOOD_DATASETS] || MUSIC_MOOD_DATASETS.calm;
    const genreData = MUSIC_GENRE_DATASETS[options.genre as keyof typeof MUSIC_GENRE_DATASETS] || MUSIC_GENRE_DATASETS.ambient;
    
    // Select appropriate scale based on genre and mood
    let scaleType = 'major';
    if (options.mood === 'sad' || options.mood === 'mysterious' || options.mood === 'dramatic') {
        scaleType = 'minor';
    } else if (options.genre === 'jazz') {
        scaleType = 'blues';
    } else if (options.genre === 'folk') {
        scaleType = 'pentatonic_major';
    }
    
    const scaleIntervals = MUSIC_SCALE_DATASETS[scaleType as keyof typeof MUSIC_SCALE_DATASETS] || MUSIC_SCALE_DATASETS.major;
    
    // Choose base note from mood-appropriate keys
    const baseNote = 60; // C4
    const scale = scaleIntervals.map(interval => baseNote + interval);
    
    // Generate sophisticated pattern based on text analysis
    const notes = [];
    const durations = [];
    const dynamics = [];
    const rhythm = [];
    
    // Analyze text for emotional content
    const emotionalWords = {
        happy: ['joy', 'bright', 'smile', 'laugh', 'love', 'beautiful', 'wonderful', 'amazing'],
        sad: ['sad', 'cry', 'tears', 'sorrow', 'lonely', 'dark', 'pain', 'hurt'],
        energetic: ['fast', 'run', 'jump', 'energy', 'power', 'strong', 'loud', 'intense'],
        calm: ['peace', 'quiet', 'gentle', 'soft', 'calm', 'serene', 'tranquil', 'still']
    };
    
    let emotionalScore = 0;
    const lowerText = text.toLowerCase();
    Object.keys(emotionalWords).forEach(emotion => {
        emotionalWords[emotion as keyof typeof emotionalWords].forEach(word => {
            if (lowerText.includes(word)) {
                emotionalScore += emotion === options.mood ? 2 : 1;
            }
        });
    });
    
    for (let i = 0; i < 16; i++) {
        // Select note based on sophisticated text analysis
        const charIndex = i % text.length;
        const char = text[charIndex] || 'a';
        const wordIndex = Math.floor(i / 16 * words);
        const sentenceIndex = Math.floor(i / 16 * sentences);
        
        // Map character to scale degree with musical intelligence
        const charCode = char.charCodeAt(0);
        let noteIndex = charCode % scale.length;
        
        // Add musical logic for better melodies
        if (i > 0) {
            const prevNote = notes[i - 1];
            const prevIndex = scale.indexOf(prevNote);
            
            // Prefer stepwise motion or consonant intervals
            if (Math.random() < 0.6) {
                const direction = Math.random() < 0.5 ? -1 : 1;
                noteIndex = Math.max(0, Math.min(scale.length - 1, prevIndex + direction));
            }
        }
        
        notes.push(scale[noteIndex]);
        
        // Sophisticated duration based on text structure
        let duration = 0.5; // Default eighth note
        
        if (char === ' ') {
            duration = 0.25; // Shorter for word boundaries
        } else if (char === '.' || char === '!' || char === '?') {
            duration = 2.0; // Longer for sentence endings
        } else if (char === ',' || char === ';') {
            duration = 1.0; // Medium for phrase boundaries
        } else if (/[aeiouAEIOU]/.test(char)) {
            duration = 0.75; // Slightly longer for vowels
        }
        
        durations.push(duration);
        
        // Sophisticated dynamics based on multiple factors
        let baseDynamic = moodData.dynamics[Math.floor(Math.random() * moodData.dynamics.length)];
        
        // Adjust for text position (phrases)
        const phrasePosition = (i % 4) / 4;
        if (phrasePosition === 0) baseDynamic *= 1.1; // Stronger on downbeats
        
        // Adjust for emotional content
        if (emotionalScore > 0) {
            baseDynamic *= 1 + (emotionalScore * 0.1);
        }
        
        // Add character-based variation
        const charVariation = (charCode % 20 - 10) / 100;
        baseDynamic = Math.max(0.1, Math.min(1.0, baseDynamic + charVariation));
        
        dynamics.push(baseDynamic);
        
        // Rhythm pattern based on text stress
        const isStressed = i % 4 === 0 || /[.!?]/.test(char);
        rhythm.push(isStressed ? 'strong' : i % 2 === 0 ? 'medium' : 'weak');
    }
    
    return { 
        notes, 
        durations, 
        dynamics, 
        scale: scaleType, 
        key: 'C', 
        rhythm 
    };
};

// Fallback: Create basic music without AI enhancement
const createBasicMusic = async (
    text: string,
    options: MusicGenerationOptions
): Promise<string> => {
    return new Promise((resolve) => {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const duration = options.duration;
        const sampleRate = audioContext.sampleRate;
        const length = sampleRate * duration;
        const buffer = audioContext.createBuffer(1, length, sampleRate);
        const data = buffer.getChannelData(0);

        // Generate simple melody based on text
        const textHash = text.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const baseFreq = 220 + (textHash % 220);
        
        for (let i = 0; i < length; i++) {
            const t = i / sampleRate;
            const charIndex = Math.floor((i / length) * text.length);
            const char = text[charIndex] || 'a';
            const freq = baseFreq * (1 + (char.charCodeAt(0) % 12) / 12);
            
            const envelope = Math.exp(-t * 0.5) * (1 - t / duration);
            data[i] = Math.sin(2 * Math.PI * freq * t) * envelope * 0.3;
        }

        const offlineContext = new OfflineAudioContext(1, length, sampleRate);
        const source = offlineContext.createBufferSource();
        source.buffer = buffer;
        source.connect(offlineContext.destination);
        source.start();

        offlineContext.startRendering().then((renderedBuffer) => {
            const wav = audioBufferToWav(renderedBuffer);
            const blob = new Blob([wav], { type: 'audio/wav' });
            const url = URL.createObjectURL(blob);
            resolve(url);
        });
    });
};

// Convert AudioBuffer to WAV format
const audioBufferToWav = (buffer: AudioBuffer): ArrayBuffer => {
    const length = buffer.length;
    const arrayBuffer = new ArrayBuffer(44 + length * 2);
    const view = new DataView(arrayBuffer);
    const data = buffer.getChannelData(0);

    // WAV header
    const writeString = (offset: number, string: string) => {
        for (let i = 0; i < string.length; i++) {
            view.setUint8(offset + i, string.charCodeAt(i));
        }
    };

    writeString(0, 'RIFF');
    view.setUint32(4, 36 + length * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, buffer.sampleRate, true);
    view.setUint32(28, buffer.sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, length * 2, true);

    // Convert float samples to 16-bit PCM
    let offset = 44;
    for (let i = 0; i < length; i++) {
        const sample = Math.max(-1, Math.min(1, data[i]));
        view.setInt16(offset, sample * 0x7FFF, true);
        offset += 2;
    }

    return arrayBuffer;
};
