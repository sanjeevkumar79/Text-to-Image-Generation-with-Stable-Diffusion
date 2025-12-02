import React, { useState } from 'react';
import { generateMusicWithGemini } from '../services/musicGenerationService';

const MusicIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M9 18V5l12-2v13"></path>
        <circle cx="6" cy="18" r="3"></circle>
        <circle cx="18" cy="16" r="3"></circle>
    </svg>
);

const PlayIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="6 3 20 12 6 21 6 3"></polygon>
    </svg>
);

const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" x2="12" y1="15" y2="3"></line>
    </svg>
);

const SparkleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0L9.937 15.5Z"></path>
    </svg>
);

const VolumeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
    </svg>
);

interface MusicOptions {
    genre: string;
    tempo: number;
    duration: number;
    mood: string;
    instruments: string[];
}

const FloatingElement: React.FC<{
    children: React.ReactNode;
    className?: string;
    delay?: string;
}> = ({ children, className = "", delay = "0s" }) => (
    <div 
        className={`absolute animate-bounce ${className}`}
        style={{ animationDelay: delay, animationDuration: '4s' }}
    >
        {children}
    </div>
);

export const TextToMusicPage: React.FC<{
    onBack: () => void;
    onSignOut?: () => void;
    onNavigateToThankYou?: () => void;
}> = ({ onBack, onSignOut, onNavigateToThankYou }) => {
    const [text, setText] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedMusic, setGeneratedMusic] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [options, setOptions] = useState<MusicOptions>({
        genre: 'ambient',
        tempo: 120,
        duration: 30,
        mood: 'calm',
        instruments: ['piano']
    });

    const generateMusic = async () => {
        if (!text.trim()) return;
        
        setIsGenerating(true);
        setGeneratedMusic(null);
        setError(null);
        
        try {
            // Use Gemini AI to generate intelligent music based on text
            const melody = await generateMusicWithGemini(text, options);
            
            setGeneratedMusic(melody);
            setIsGenerating(false);
        } catch (error) {
            console.error('Music generation failed:', error);
            setError('Music generation failed. Please try again.');
            setIsGenerating(false);
        }
    };


    const downloadMusic = () => {
        if (!generatedMusic) return;
        
            const link = document.createElement('a');
        link.href = generatedMusic;
            link.download = `generated-music-${Date.now()}.wav`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
    };

    const playMusic = () => {
        if (!generatedMusic) return;
        
        const audio = new Audio(generatedMusic);
        audio.play().catch(error => {
            console.error('Audio playback failed:', error);
            setError('Audio playback failed. Please try downloading the file.');
        });
    };

    const genreOptions = [
        { value: 'ambient', label: 'Ambient', color: 'from-purple-500 to-blue-500' },
        { value: 'classical', label: 'Classical', color: 'from-yellow-500 to-orange-500' },
        { value: 'electronic', label: 'Electronic', color: 'from-cyan-500 to-teal-500' },
        { value: 'jazz', label: 'Jazz', color: 'from-red-500 to-pink-500' },
        { value: 'rock', label: 'Rock', color: 'from-gray-500 to-slate-500' },
        { value: 'folk', label: 'Folk', color: 'from-green-500 to-emerald-500' }
    ];

    const moodOptions = [
        { value: 'calm', label: 'Calm & Peaceful' },
        { value: 'energetic', label: 'Energetic & Upbeat' },
        { value: 'melancholic', label: 'Melancholic & Sad' },
        { value: 'mysterious', label: 'Mysterious & Dark' },
        { value: 'joyful', label: 'Joyful & Happy' },
        { value: 'dramatic', label: 'Dramatic & Epic' }
    ];

    const instrumentOptions = [
        { value: 'piano', label: 'Piano' },
        { value: 'guitar', label: 'Guitar' },
        { value: 'violin', label: 'Violin' },
        { value: 'drums', label: 'Drums' },
        { value: 'flute', label: 'Flute' },
        { value: 'synthesizer', label: 'Synthesizer' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900/20 to-purple-900 text-white font-sans overflow-hidden relative">
            {/* Decorative floating elements removed as requested */}

            <div className="relative z-10">
                {/* Header */}
                <header className="p-6 md:p-8 border-b border-purple-700/50">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={onBack}
                                className="p-2 bg-purple-800/50 hover:bg-purple-700/50 rounded-lg transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                                    AI Music Generator
                                </h1>
                                <p className="text-purple-300 text-sm">Transform your text into beautiful melodies</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            {/* Music Button */}
                            <button 
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 18V5l12-2v13"></path>
                                    <circle cx="6" cy="18" r="3"></circle>
                                    <circle cx="18" cy="16" r="3"></circle>
                                </svg>
                                <span>Music</span>
                            </button>

                            {/* Sign Out Button */}
                            {onSignOut && (
                                <button 
                                    onClick={onSignOut}
                                    className="bg-slate-700/80 hover:bg-slate-700 text-slate-300 font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
                                >
                                    Sign Out
                                </button>
                            )}
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="p-6 md:p-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Input Section */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Text Input */}
                                <div className="bg-purple-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-700/50">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600">
                                            <MusicIcon className="w-5 h-5" />
                                        </div>
                                        <h2 className="text-xl font-bold">
                                            Text to Music
                                        </h2>
                                    </div>
                                    
                                    <textarea
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        placeholder="Describe the music you want to create (e.g., 'happy summer melody', 'peaceful rain sounds', 'energetic dance beat') or enter lyrics..."
                                        className="w-full h-32 bg-purple-700/50 border border-purple-600/50 rounded-xl p-4 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 resize-none"
                                    />
                                    
                                    {error && (
                                        <div className="mt-3 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                                            <p className="text-red-300 text-sm">{error}</p>
                                        </div>
                                    )}
                                    
                                    <button
                                        onClick={generateMusic}
                                        disabled={!text.trim() || isGenerating}
                                        className="w-full mt-4 py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                                    >
                                        {isGenerating ? (
                                            <div className="flex items-center justify-center gap-3">
                                                <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                                                <span>Generating music...</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center gap-2">
                                                <MusicIcon className="w-5 h-5" />
                                                <span>Generate Music</span>
                                            </div>
                                        )}
                                    </button>
                                </div>

                                {/* Generated Music Display */}
                                {(generatedMusic || isGenerating) && (
                                    <div className="bg-purple-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-700/50">
                                        <h3 className="text-lg font-semibold mb-4">Generated Music</h3>
                                        
                                        {isGenerating ? (
                                            <div className="aspect-video bg-purple-700/50 rounded-xl flex items-center justify-center">
                                                <div className="text-center">
                                                    <div className="w-16 h-16 border-4 border-t-transparent border-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
                                                    <p className="text-purple-300">Creating your music...</p>
                                                    <div className="flex justify-center mt-4 space-x-1">
                                                        <div className="w-2 h-8 bg-purple-400 rounded animate-pulse" style={{ animationDelay: '0s' }}></div>
                                                        <div className="w-2 h-12 bg-indigo-400 rounded animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                                                        <div className="w-2 h-6 bg-purple-400 rounded animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                                        <div className="w-2 h-10 bg-indigo-400 rounded animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                                                        <div className="w-2 h-4 bg-purple-400 rounded animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : generatedMusic && (
                                            <div className="space-y-4">
                                                <div className="bg-purple-700/30 rounded-xl p-6 flex items-center justify-center">
                                                    <div className="text-center">
                                                        <MusicIcon className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                                                        <p className="text-purple-300 mb-4">Music generated successfully!</p>
                                                        <div className="flex justify-center mb-4">
                                                            <div className="flex space-x-1">
                                                                {[...Array(20)].map((_, i) => (
                                                                    <div 
                                                                        key={i}
                                                                        className="w-1 bg-gradient-to-t from-purple-600 to-indigo-400 rounded-t"
                                                                        style={{ 
                                                                            height: `${Math.random() * 40 + 10}px`,
                                                                            animationDelay: `${i * 0.1}s`
                                                                        }}
                                                                    ></div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                <audio
                                                            controls 
                                                            className="w-full max-w-md mx-auto"
                                                    src={generatedMusic}
                                                        >
                                                            Your browser does not support the audio element.
                                                        </audio>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex gap-3">
                                                    <button 
                                                        onClick={playMusic}
                                                        className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                                                    >
                                                        <PlayIcon className="w-4 h-4" />
                                                        <span>Play</span>
                                                    </button>
                                                    <button 
                                                        onClick={downloadMusic}
                                                        className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                                                    >
                                                        <DownloadIcon className="w-4 h-4" />
                                                        <span>Download</span>
                                                    </button>
                                                </div>
                                                
                                                {onNavigateToThankYou && (
                                                    <div className="mt-4 pt-4 border-t border-purple-600/50">
                                                        <button 
                                                            onClick={onNavigateToThankYou}
                                                            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-pink-500 via-purple-500 via-blue-500 to-green-500 hover:from-pink-600 hover:via-purple-600 hover:via-blue-600 hover:to-green-600 rounded-lg transition-all duration-300 transform hover:scale-105"
                                                        >
                                                            <SparkleIcon className="w-5 h-5" />
                                                            <span>Complete Journey</span>
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Options Panel */}
                            <div className="space-y-6">
                                {/* Genre Selection */}
                                <div className="bg-purple-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-700/50">
                                    <h3 className="text-lg font-semibold mb-4">Music Style</h3>
                                    
                                    <div className="grid grid-cols-2 gap-3 mb-4">
                                        {genreOptions.map((genre) => (
                                            <button
                                                key={genre.value}
                                                onClick={() => setOptions({...options, genre: genre.value})}
                                                className={`p-3 rounded-xl border transition-all ${
                                                    options.genre === genre.value
                                                        ? `bg-gradient-to-r ${genre.color} border-transparent text-white`
                                                        : 'bg-purple-700/50 border-purple-600/50 text-purple-300 hover:border-purple-500/50'
                                                }`}
                                            >
                                                {genre.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Music Settings */}
                                <div className="bg-purple-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-700/50">
                                    <h3 className="text-lg font-semibold mb-4">Settings</h3>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-purple-300 mb-2">Mood</label>
                                            <select
                                                value={options.mood}
                                                onChange={(e) => setOptions({...options, mood: e.target.value})}
                                                className="w-full bg-purple-700/50 border border-purple-600/50 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                            >
                                                {moodOptions.map((mood) => (
                                                    <option key={mood.value} value={mood.value}>
                                                        {mood.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-purple-300 mb-2">Tempo: {options.tempo} BPM</label>
                                            <input
                                                type="range"
                                                min="60"
                                                max="180"
                                                step="10"
                                                value={options.tempo}
                                                onChange={(e) => setOptions({...options, tempo: parseInt(e.target.value)})}
                                                className="w-full accent-purple-500"
                                            />
                                            <div className="flex justify-between text-xs text-purple-400 mt-1">
                                                <span>60 BPM</span>
                                                <span>180 BPM</span>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-purple-300 mb-2">Duration: {options.duration}s</label>
                                            <input
                                                type="range"
                                                min="10"
                                                max="120"
                                                step="10"
                                                value={options.duration}
                                                onChange={(e) => setOptions({...options, duration: parseInt(e.target.value)})}
                                                className="w-full accent-purple-500"
                                            />
                                            <div className="flex justify-between text-xs text-purple-400 mt-1">
                                                <span>10s</span>
                                                <span>2min</span>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-purple-300 mb-2">Primary Instrument</label>
                                            <select
                                                value={options.instruments[0] || 'piano'}
                                                onChange={(e) => setOptions({...options, instruments: [e.target.value]})}
                                                className="w-full bg-purple-700/50 border border-purple-600/50 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                            >
                                                {instrumentOptions.map((instrument) => (
                                                    <option key={instrument.value} value={instrument.value}>
                                                        {instrument.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
        );
};

const TextToMusicPageWithThanks: React.FC<any> = (props) => (
    <>
        <TextToMusicPage {...props} />
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '32px 0' }}>
            <button
                onClick={props.onNavigateToThankYou}
                style={{ padding: '12px 32px', fontSize: 18, background: 'linear-gradient(90deg, #a78bfa, #06b6d4)', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}
            >
                Thanks
            </button>
        </div>
    </>
);

export default TextToMusicPageWithThanks;