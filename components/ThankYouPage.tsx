import React, { useState, useEffect } from 'react';

const SparkleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0L9.937 15.5Z"></path>
    </svg>
);

const HeartIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
);

const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
);

const RocketIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
    </svg>
);

const FloatingElement: React.FC<{
    children: React.ReactNode;
    className?: string;
    delay?: string;
    duration?: string;
}> = ({ children, className = "", delay = "0s", duration = "4s" }) => (
    <div 
        className={`absolute animate-bounce ${className}`}
        style={{ animationDelay: delay, animationDuration: duration }}
    >
        {children}
    </div>
);

const ColorfulOrb: React.FC<{
    className?: string;
    color: string;
    size: string;
    delay?: string;
}> = ({ className = "", color, size, delay = "0s" }) => (
    <div 
        className={`absolute ${size} ${color} rounded-full blur-3xl animate-pulse ${className}`}
        style={{ animationDelay: delay }}
    ></div>
);

export const ThankYouPage: React.FC<{
    onBack: () => void;
    onSignOut?: () => void;
}> = ({ onBack, onSignOut }) => {
    const [showConfetti, setShowConfetti] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);

    useEffect(() => {
        // Show confetti animation on page load
        setShowConfetti(true);
        const timer = setTimeout(() => setShowConfetti(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    const handleThankYouClick = () => {
        setButtonClicked(true);
        setShowConfetti(true);
        
        // Reset after animation
        setTimeout(() => {
            setButtonClicked(false);
            setShowConfetti(false);
        }, 2000);
    };

    const colors = [
        'text-red-400', 'text-orange-400', 'text-yellow-400', 'text-green-400',
        'text-blue-400', 'text-indigo-400', 'text-purple-400', 'text-pink-400',
        'text-cyan-400', 'text-emerald-400', 'text-rose-400', 'text-violet-400'
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 via-blue-500 via-green-500 via-yellow-500 to-red-500 text-white font-sans overflow-hidden relative">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Floating Icons */}
                <FloatingElement className="top-10 left-10" delay="0s">
                    <SparkleIcon className="w-8 h-8 text-yellow-300 opacity-80" />
                </FloatingElement>
                <FloatingElement className="top-20 right-20" delay="0.5s">
                    <StarIcon className="w-6 h-6 text-pink-300 opacity-70" />
                </FloatingElement>
                <FloatingElement className="top-40 left-1/4" delay="1s">
                    <HeartIcon className="w-7 h-7 text-red-300 opacity-75" />
                </FloatingElement>
                <FloatingElement className="top-60 right-1/3" delay="1.5s">
                    <RocketIcon className="w-6 h-6 text-blue-300 opacity-80" />
                </FloatingElement>
                <FloatingElement className="bottom-40 left-20" delay="2s">
                    <SparkleIcon className="w-5 h-5 text-green-300 opacity-70" />
                </FloatingElement>
                <FloatingElement className="bottom-20 right-10" delay="2.5s">
                    <StarIcon className="w-8 h-8 text-purple-300 opacity-75" />
                </FloatingElement>
                <FloatingElement className="bottom-60 left-1/3" delay="3s">
                    <HeartIcon className="w-6 h-6 text-orange-300 opacity-80" />
                </FloatingElement>
                <FloatingElement className="top-1/3 right-10" delay="3.5s">
                    <RocketIcon className="w-7 h-7 text-cyan-300 opacity-70" />
                </FloatingElement>

                {/* Colorful Orbs */}
                <ColorfulOrb className="top-1/4 left-1/4" color="bg-red-500/20" size="w-64 h-64" delay="0s" />
                <ColorfulOrb className="top-1/3 right-1/4" color="bg-blue-500/20" size="w-80 h-80" delay="1s" />
                <ColorfulOrb className="bottom-1/4 left-1/3" color="bg-green-500/20" size="w-72 h-72" delay="2s" />
                <ColorfulOrb className="bottom-1/3 right-1/3" color="bg-purple-500/20" size="w-96 h-96" delay="3s" />
                <ColorfulOrb className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" color="bg-yellow-500/15" size="w-[32rem] h-[32rem]" delay="1.5s" />

                {/* Confetti Effect */}
                {showConfetti && (
                    <div className="absolute inset-0 pointer-events-none">
                        {[...Array(50)].map((_, i) => (
                            <div
                                key={i}
                                className={`absolute w-2 h-2 ${colors[i % colors.length]} animate-ping`}
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 2}s`,
                                    animationDuration: `${1 + Math.random() * 2}s`
                                }}
                            >
                                ✨
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="relative z-10">
                {/* Header */}
                <header className="p-6 md:p-8 border-b border-white/20">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={onBack}
                                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors backdrop-blur-sm"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                                    Completion Page
                                </h1>
                                <p className="text-white/80 text-sm">Your AI journey is complete!</p>
                            </div>
                        </div>
                        
                        {/* Sign Out Button */}
                        {onSignOut && (
                            <button 
                                onClick={onSignOut}
                                className="bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm backdrop-blur-sm"
                            >
                                Sign Out
                            </button>
                        )}
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex items-center justify-center min-h-[calc(100vh-200px)] p-6 md:p-8">
                    <div className="text-center max-w-4xl mx-auto">
                        {/* Main Title */}
                        <div className="mb-12">
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                                <span className="bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent drop-shadow-2xl">
                                    🎨 Text to Image 🎨
                                </span>
                                <br />
                                <span className="text-xl md:text-2xl lg:text-3xl bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent mt-2 block">
                                    by using the power of
                                </span>
                                <br />
                                <span className="bg-gradient-to-r from-green-300 via-blue-300 to-purple-300 bg-clip-text text-transparent drop-shadow-2xl animate-pulse">
                                    ✨ Stable Diffusion ✨
                                </span>
                            </h1>
                            
                            <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-lg">
                                🎉 Congratulations! You've experienced the full power of AI creativity! 🎉
                            </p>
                            
                            <div className="flex flex-wrap justify-center gap-4 mb-8 text-lg">
                                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">✨ Prompt Optimization</span>
                                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">🖼️ Image Generation</span>
                                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">🎤 Voice Synthesis</span>
                                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">🎵 Music Creation</span>
                            </div>
                        </div>

                        {/* Thank You Button */}
                        <div className="mb-12">
                            <button
                                onClick={handleThankYouClick}
                                className={`
                                    relative px-12 py-6 text-2xl md:text-3xl font-bold rounded-2xl
                                    bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500
                                    hover:from-pink-600 hover:via-purple-600 hover:to-blue-600
                                    text-white shadow-2xl transform transition-all duration-300
                                    hover:scale-110 hover:shadow-3xl
                                    ${buttonClicked ? 'animate-pulse scale-125' : ''}
                                    border-4 border-white/30 backdrop-blur-sm
                                `}
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    <HeartIcon className="w-8 h-8" />
                                    Thank You!
                                    <SparkleIcon className="w-8 h-8" />
                                </span>
                                
                                {/* Button glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 rounded-2xl blur-xl opacity-50 -z-10"></div>
                            </button>
                            
                            {buttonClicked && (
                                <p className="mt-4 text-xl text-white/90 animate-bounce">
                                    🌟 Thank you for using our AI platform! 🌟
                                </p>
                            )}
                        </div>

                        {/* Feature Summary */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                <div className="text-4xl mb-3">🧠</div>
                                <h3 className="text-lg font-semibold mb-2">Smart Prompts</h3>
                                <p className="text-sm text-white/80">AI-optimized text prompts</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                <div className="text-4xl mb-3">🎨</div>
                                <h3 className="text-lg font-semibold mb-2">Beautiful Images</h3>
                                <p className="text-sm text-white/80">Stable Diffusion powered</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                <div className="text-4xl mb-3">🗣️</div>
                                <h3 className="text-lg font-semibold mb-2">Natural Voice</h3>
                                <p className="text-sm text-white/80">Text-to-speech synthesis</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                <div className="text-4xl mb-3">🎼</div>
                                <h3 className="text-lg font-semibold mb-2">AI Music</h3>
                                <p className="text-sm text-white/80">Melody generation</p>
                            </div>
                        </div>

                        {/* Final Message */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                                🚀 Your Creative Journey is Complete! 🚀
                            </h2>
                            <p className="text-lg text-white/90 mb-4">
                                You've successfully completed the full AI creativity journey! 
                                From intelligent prompt optimization to stunning image generation using Stable Diffusion, 
                                natural voice synthesis, and beautiful AI music creation.
                            </p>
                            <p className="text-base text-white/80">
                                🌟 Thank you for experiencing our complete AI-powered creative suite! 
                                We hope you enjoyed every step of this amazing journey through the world of artificial intelligence. ✨
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ThankYouPage;