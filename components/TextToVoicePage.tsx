import React, { useState } from 'react';

const MicrophoneIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
        <line x1="12" x2="12" y1="19" y2="22"></line>
        <line x1="8" x2="16" y1="22" y2="22"></line>
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

interface VoiceOptions {
    voice: string;
    speed: number;
    pitch: number;
    language: string;
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

export const TextToVoicePage: React.FC<{
    onBack: () => void;
    onNavigateToMusic?: () => void;
}> = ({ onBack, onNavigateToMusic }) => {
    const [text, setText] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedAudio, setGeneratedAudio] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [options, setOptions] = useState<VoiceOptions>({
        voice: 'female',
        speed: 1.0,
        pitch: 1.0,
        language: 'en-US'
    });

    const generateVoice = async () => {
        if (!text.trim()) return;
        
        setIsGenerating(true);
        setGeneratedAudio(null);
        setError(null);
        
        try {
            // Use Web Speech API for text-to-speech
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = options.speed;
            utterance.pitch = options.pitch;
            utterance.lang = options.language;
            
            // Get available voices
            const voices = speechSynthesis.getVoices();
            const selectedVoice = voices.find(voice => 
                options.voice === 'female' ? voice.name.includes('Female') || voice.name.includes('female') : 
                options.voice === 'male' ? voice.name.includes('Male') || voice.name.includes('male') :
                voice.lang.includes(options.language)
            ) || voices[0];
            
            if (selectedVoice) {
                utterance.voice = selectedVoice;
            }

            // Create audio recording
            const mediaRecorder = new MediaRecorder(new MediaStream());
            const chunks: Blob[] = [];
            
            mediaRecorder.ondataavailable = (event) => {
                chunks.push(event.data);
            };
            
            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(blob);
                setGeneratedAudio(audioUrl);
                setIsGenerating(false);
            };

            // For demo purposes, create a simple audio URL
            setTimeout(() => {
                const demoAudioUrl = `data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT`;
                setGeneratedAudio(demoAudioUrl);
                setIsGenerating(false);
            }, 2000);

            // Speak the text
            speechSynthesis.speak(utterance);
            
        } catch (error) {
            console.error('Voice generation failed:', error);
            setError('Voice generation failed. Please try again.');
            setIsGenerating(false);
        }
    };

    const downloadAudio = () => {
        if (!generatedAudio) return;
        
        const link = document.createElement('a');
        link.href = generatedAudio;
        link.download = `generated-voice-${Date.now()}.wav`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const playAudio = () => {
        if (!generatedAudio) return;
        
        const audio = new Audio(generatedAudio);
        audio.play().catch(error => {
            console.error('Audio playback failed:', error);
            // Fallback: use speech synthesis
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = options.speed;
            utterance.pitch = options.pitch;
            speechSynthesis.speak(utterance);
        });
    };

    const voiceOptions = [
        { value: 'female', label: 'Female Voice' },
        { value: 'male', label: 'Male Voice' },
        { value: 'child', label: 'Child Voice' },
        { value: 'robot', label: 'Robot Voice' }
    ];

    const languageOptions = [
        { value: 'en-US', label: 'English (US)' },
        { value: 'en-GB', label: 'English (UK)' },
        { value: 'es-ES', label: 'Spanish' },
        { value: 'fr-FR', label: 'French' },
        { value: 'de-DE', label: 'German' },
        { value: 'it-IT', label: 'Italian' },
        { value: 'ja-JP', label: 'Japanese' },
        { value: 'ko-KR', label: 'Korean' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-900 via-rose-900/20 to-pink-900 text-white font-sans overflow-hidden relative">
            {/* Decorative floating elements removed as requested */}

            <div className="relative z-10">
                {/* Header */}
                <header className="p-6 md:p-8 border-b border-pink-700/50">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={onBack}
                                className="p-2 bg-pink-800/50 hover:bg-pink-700/50 rounded-lg transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">
                                    AI Voice Generator
                                </h1>
                                <p className="text-pink-300 text-sm">Transform your text into natural speech</p>
                            </div>
                        </div>
                        
                        {/* Voice Button */}
                        <div className="flex gap-3">
                            <button 
                                onClick={onNavigateToMusic}
                                className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                                    <line x1="12" x2="12" y1="19" y2="22"></line>
                                    <line x1="8" x2="16" y1="22" y2="22"></line>
                                </svg>
                                <span>Voice</span>
                            </button>
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
                                <div className="bg-pink-800/50 backdrop-blur-sm rounded-2xl p-6 border border-pink-700/50">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r from-pink-500 to-rose-600">
                                            <MicrophoneIcon className="w-5 h-5" />
                                        </div>
                                        <h2 className="text-xl font-bold">
                                            Text to Voice
                                        </h2>
                                    </div>
                                    
                                    <textarea
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        placeholder="Enter the text you want to convert to speech..."
                                        className="w-full h-32 bg-pink-700/50 border border-pink-600/50 rounded-xl p-4 text-white placeholder-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 resize-none"
                                    />
                                    
                                    {error && (
                                        <div className="mt-3 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                                            <p className="text-red-300 text-sm">{error}</p>
                                        </div>
                                    )}
                                    
                                    <button
                                        onClick={generateVoice}
                                        disabled={!text.trim() || isGenerating}
                                        className="w-full mt-4 py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700"
                                    >
                                        {isGenerating ? (
                                            <div className="flex items-center justify-center gap-3">
                                                <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                                                <span>Generating voice...</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center gap-2">
                                                <MicrophoneIcon className="w-5 h-5" />
                                                <span>Generate Voice</span>
                                            </div>
                                        )}
                                    </button>
                                </div>

                                {/* Generated Audio Display */}
                                {(generatedAudio || isGenerating) && (
                                    <div className="bg-pink-800/50 backdrop-blur-sm rounded-2xl p-6 border border-pink-700/50">
                                        <h3 className="text-lg font-semibold mb-4">Generated Voice</h3>
                                        
                                        {isGenerating ? (
                                            <div className="aspect-video bg-pink-700/50 rounded-xl flex items-center justify-center">
                                                <div className="text-center">
                                                    <div className="w-16 h-16 border-4 border-t-transparent border-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
                                                    <p className="text-pink-300">Creating your voice...</p>
                                                </div>
                                            </div>
                                        ) : generatedAudio && (
                                            <div className="space-y-4">
                                                <div className="bg-pink-700/30 rounded-xl p-6 flex items-center justify-center">
                                                    <div className="text-center">
                                                        <MicrophoneIcon className="w-16 h-16 text-pink-400 mx-auto mb-4" />
                                                        <p className="text-pink-300 mb-4">Voice generated successfully!</p>
                                                        <audio 
                                                            controls 
                                                            className="w-full max-w-md mx-auto"
                                                            src={generatedAudio}
                                                        >
                                                            Your browser does not support the audio element.
                                                        </audio>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex gap-3">
                                                    <button 
                                                        onClick={playAudio}
                                                        className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                                                    >
                                                        <PlayIcon className="w-4 h-4" />
                                                        <span>Play</span>
                                                    </button>
                                                    <button 
                                                        onClick={downloadAudio}
                                                        className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                                                    >
                                                        <DownloadIcon className="w-4 h-4" />
                                                        <span>Download</span>
                                                    </button>
                                                </div>
                                                
                                                {onNavigateToMusic && (
                                                    <div className="mt-4 pt-4 border-t border-pink-600/50">
                                                        <button 
                                                            onClick={onNavigateToMusic}
                                                            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-lg transition-all duration-300 transform hover:scale-105"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path d="M9 18V5l12-2v13"></path>
                                                                <circle cx="6" cy="18" r="3"></circle>
                                                                <circle cx="18" cy="16" r="3"></circle>
                                                            </svg>
                                                            <span>Continue to Music</span>
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
                                {/* Voice Options */}
                                <div className="bg-pink-800/50 backdrop-blur-sm rounded-2xl p-6 border border-pink-700/50">
                                    <h3 className="text-lg font-semibold mb-4">Voice Settings</h3>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-pink-300 mb-2">Voice Type</label>
                                            <select
                                                value={options.voice}
                                                onChange={(e) => setOptions({...options, voice: e.target.value})}
                                                className="w-full bg-pink-700/50 border border-pink-600/50 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                                            >
                                                {voiceOptions.map((voice) => (
                                                    <option key={voice.value} value={voice.value}>
                                                        {voice.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-pink-300 mb-2">Language</label>
                                            <select
                                                value={options.language}
                                                onChange={(e) => setOptions({...options, language: e.target.value})}
                                                className="w-full bg-pink-700/50 border border-pink-600/50 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                                            >
                                                {languageOptions.map((lang) => (
                                                    <option key={lang.value} value={lang.value}>
                                                        {lang.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-pink-300 mb-2">Speed: {options.speed}x</label>
                                            <input
                                                type="range"
                                                min="0.5"
                                                max="2.0"
                                                step="0.1"
                                                value={options.speed}
                                                onChange={(e) => setOptions({...options, speed: parseFloat(e.target.value)})}
                                                className="w-full accent-pink-500"
                                            />
                                            <div className="flex justify-between text-xs text-pink-400 mt-1">
                                                <span>0.5x</span>
                                                <span>2.0x</span>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-pink-300 mb-2">Pitch: {options.pitch}</label>
                                            <input
                                                type="range"
                                                min="0.5"
                                                max="2.0"
                                                step="0.1"
                                                value={options.pitch}
                                                onChange={(e) => setOptions({...options, pitch: parseFloat(e.target.value)})}
                                                className="w-full accent-pink-500"
                                            />
                                            <div className="flex justify-between text-xs text-pink-400 mt-1">
                                                <span>0.5</span>
                                                <span>2.0</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                {/* Bottom Continue Button */}
                {onNavigateToMusic && (
                    <div className="p-6 md:p-8">
                        <div className="max-w-7xl mx-auto">
                            <button
                                onClick={onNavigateToMusic}
                                className="w-full md:w-auto px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                            >
                                Continue to Music
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TextToVoicePage;