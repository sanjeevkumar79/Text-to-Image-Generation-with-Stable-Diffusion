import React, { useState } from 'react';
import { generateImage } from '../services/imageGenerationService';
import type { ImageGenerationOptions } from '../services/imageGenerationService';

const ImageIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
        <circle cx="9" cy="9" r="2"></circle>
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
    </svg>
);

const SparkleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0L9.937 15.5Z"></path>
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

const SettingsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
        <circle cx="12" cy="12" r="3"></circle>
    </svg>
);

// Remove local interface since we're importing from service

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

export const MediaGenerationPage: React.FC<{
    onBack: () => void;
    onNavigateToVoice?: () => void;
    onNavigateToMusic?: () => void;
    onNavigateToImage?: () => void;
}> = ({ onBack, onNavigateToVoice, onNavigateToMusic, onNavigateToImage }) => {
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedMedia, setGeneratedMedia] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [options, setOptions] = useState<ImageGenerationOptions>({
        style: 'realistic',
        quality: 'high',
        aspectRatio: '16:9',
        model: 'advanced'
    });

    const downloadMedia = async (mediaUrl: string) => {
        try {
            const response = await fetch(mediaUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `generated-image-${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download failed:', error);
            alert('Download failed. Please try again.');
        }
    };

    const enhanceMedia = async () => {
        if (!generatedMedia || !prompt.trim()) return;
        
        try {
            setIsGenerating(true);
            setError(null);
            
            // Create enhanced prompt
            const enhancedPrompt = `${prompt}, ultra high quality, masterpiece, professional, detailed, enhanced, premium quality`;
            
            const imageOptions: ImageGenerationOptions = { ...options, quality: 'ultra' };
            const result = await generateImage(enhancedPrompt, imageOptions);
            
            setGeneratedMedia(result);
        } catch (error) {
            console.error('Enhancement failed:', error);
            setError('Enhancement failed. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleGenerate = async () => {
        if (!prompt.trim()) return;
        
        setIsGenerating(true);
        setGeneratedMedia(null);
        setError(null);
        
        try {
            // Generate image
            const imageOptions: ImageGenerationOptions = {
                style: options.style,
                quality: options.quality,
                aspectRatio: options.aspectRatio,
                model: options.model
            };
            const result = await generateImage(prompt, imageOptions);
            
            setGeneratedMedia(result);
        } catch (error) {
            console.error('Generation failed:', error);
            const errorMessage = error instanceof Error ? error.message : 'Failed to generate image';
            setError(errorMessage);
        } finally {
            setIsGenerating(false);
        }
    };

    const styleOptions = [
        { value: 'realistic', label: 'Realistic', gradient: 'from-green-500 to-emerald-600' },
        { value: 'artistic', label: 'Artistic', gradient: 'from-purple-500 to-pink-600' },
        { value: 'anime', label: 'Anime', gradient: 'from-blue-500 to-cyan-600' },
        { value: 'cinematic', label: 'Cinematic', gradient: 'from-orange-500 to-red-600' }
    ];

    const qualityOptions = [
        { value: 'standard', label: 'Standard' },
        { value: 'high', label: 'High Quality' },
        { value: 'ultra', label: 'Ultra HD' }
    ];

    const aspectRatios = [
        { value: '16:9', label: '16:9 (Widescreen)' },
        { value: '9:16', label: '9:16 (Portrait)' },
        { value: '1:1', label: '1:1 (Square)' },
        { value: '4:3', label: '4:3 (Classic)' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 text-white font-sans overflow-hidden relative">
            {/* Decorative floating elements removed as requested */}

            <div className="relative z-10">
                {/* Header */}
                <header className="p-6 md:p-8 border-b border-slate-700/50">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={onBack}
                                className="p-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                                    Media Generation
                                </h1>
                                <p className="text-slate-400 text-sm">Choose a media type to generate from text</p>
                            </div>
                        </div>
                        <div className="flex gap-3 flex-wrap">
                            <button 
                                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm flex items-center gap-2"
                                onClick={onNavigateToImage}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                                    <circle cx="9" cy="9" r="2"></circle>
                                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                                </svg>
                                <span>Text to Image</span>
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
                                {/* Prompt Input */}
                                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-600">
                                            <ImageIcon className="w-5 h-5" />
                                        </div>
                                        <h2 className="text-xl font-bold">
                                            Text to Image
                                        </h2>
                                    </div>
                                    
                                    <textarea
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                        placeholder="Describe the image you want to create..."
                                        className="w-full h-32 bg-slate-700/50 border border-slate-600/50 rounded-xl p-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 resize-none"
                                    />
                                    
                                    {error && (
                                        <div className="mt-3 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                                            <p className="text-red-300 text-sm">{error}</p>
                                        </div>
                                    )}
                                    
                                    <button
                                        onClick={handleGenerate}
                                        disabled={!prompt.trim() || isGenerating}
                                        className="w-full mt-4 py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
                                    >
                                        {isGenerating ? (
                                            <div className="flex items-center justify-center gap-3">
                                                <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                                                <span>Generating image...</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center gap-2">
                                                <SparkleIcon className="w-5 h-5" />
                                                <span>Generate Image</span>
                                            </div>
                                        )}
                                    </button>
                                </div>

                                {/* Generated Image Display */}
                                {(generatedMedia || isGenerating) && (
                                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                                        <h3 className="text-lg font-semibold mb-4">Generated Image</h3>
                                        
                                        {isGenerating ? (
                                            <div className="aspect-video bg-slate-700/50 rounded-xl flex items-center justify-center">
                                                <div className="text-center">
                                                    <div className="w-16 h-16 border-4 border-t-transparent border-cyan-500 rounded-full animate-spin mx-auto mb-4"></div>
                                                    <p className="text-slate-400">Creating your image...</p>
                                                </div>
                                            </div>
                                        ) : generatedMedia && (
                                            <div className="space-y-4">
                                                <img
                                                    src={generatedMedia}
                                                    alt="Generated image"
                                                    className="w-full aspect-video object-cover rounded-xl"
                                                    onError={(e) => {
                                                        console.error('Image load error:', e);
                                                        setError('Failed to load generated image.');
                                                    }}
                                                />
                                                
                                                <div className="flex gap-3">
                                                    <button 
                                                        onClick={() => downloadMedia(generatedMedia)}
                                                        className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                                                    >
                                                        <DownloadIcon className="w-4 h-4" />
                                                        <span>Download</span>
                                                    </button>
                                                    <button 
                                                        onClick={() => enhanceMedia()}
                                                        className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                                                    >
                                                        <SparkleIcon className="w-4 h-4" />
                                                        <span>Enhance</span>
                                                    </button>
                                                </div>
                                                
                                                {onNavigateToVoice && (
                                                    <div className="mt-4 pt-4 border-t border-slate-600/50">
                                                        <button 
                                                            onClick={onNavigateToVoice}
                                                            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 rounded-lg transition-all duration-300 transform hover:scale-105"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                                                                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                                                                <line x1="12" x2="12" y1="19" y2="22"></line>
                                                                <line x1="8" x2="16" y1="22" y2="22"></line>
                                                            </svg>
                                                            <span>Continue to Voice</span>
                                                        </button>
                                                    </div>
                                                )}
                                                {/* Removed Continue to Music button on Media page as requested */}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Options Panel */}
                            <div className="space-y-6">
                                {/* Style Options */}
                                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                                    <div className="flex items-center gap-2 mb-4">
                                        <SettingsIcon className="w-5 h-5 text-purple-400" />
                                        <h3 className="text-lg font-semibold">Style</h3>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-3">
                                        {styleOptions.map((style) => (
                                            <button
                                                key={style.value}
                                                onClick={() => setOptions({...options, style: style.value})}
                                                className={`p-3 rounded-xl border transition-all ${
                                                    options.style === style.value
                                                        ? `bg-gradient-to-r ${style.gradient} border-transparent text-white`
                                                        : 'bg-slate-700/50 border-slate-600/50 text-slate-300 hover:border-slate-500/50'
                                                }`}
                                            >
                                                {style.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Quality & Settings */}
                                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                                    <h3 className="text-lg font-semibold mb-4">Settings</h3>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">Quality</label>
                                            <select
                                                value={options.quality}
                                                onChange={(e) => setOptions({...options, quality: e.target.value})}
                                                className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                            >
                                                {qualityOptions.map((quality) => (
                                                    <option key={quality.value} value={quality.value}>
                                                        {quality.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">Aspect Ratio</label>
                                            <select
                                                value={options.aspectRatio}
                                                onChange={(e) => setOptions({...options, aspectRatio: e.target.value})}
                                                className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                            >
                                                {aspectRatios.map((ratio) => (
                                                    <option key={ratio.value} value={ratio.value}>
                                                        {ratio.label}
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
                {/* Bottom Continue Button */}
                {onNavigateToVoice && (
                    <div className="p-6 md:p-8">
                        <div className="max-w-7xl mx-auto">
                            <button
                                onClick={onNavigateToVoice}
                                className="w-full md:w-auto px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white"
                            >
                                Continue to Voice
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
