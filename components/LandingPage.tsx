import React from 'react';

const SparkleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0L9.937 15.5Z"></path>
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

const BrainIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"></path>
        <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"></path>
        <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"></path>
        <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"></path>
        <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"></path>
        <path d="M3.477 10.896a4 4 0 0 1 .585-.396"></path>
        <path d="M19.938 10.5a4 4 0 0 1 .585.396"></path>
        <path d="M6 18a4 4 0 0 1-1.967-.516"></path>
        <path d="M19.967 17.484A4 4 0 0 1 18 18"></path>
    </svg>
);

const FeatureCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    description: string;
    gradient: string;
}> = ({ icon, title, description, gradient }) => (
    <div className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:transform hover:scale-105">
        <div className={`absolute inset-0 ${gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
        <div className={`w-12 h-12 ${gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-400 leading-relaxed">{description}</p>
    </div>
);

const FloatingElement: React.FC<{
    children: React.ReactNode;
    className?: string;
    delay?: string;
}> = ({ children, className = "", delay = "0s" }) => (
    <div 
        className={`absolute animate-bounce ${className}`}
        style={{ animationDelay: delay, animationDuration: '3s' }}
    >
        {children}
    </div>
);

export const LandingPage: React.FC<{
    onGetStarted: () => void;
}> = ({ onGetStarted }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 text-white font-sans overflow-hidden relative">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <FloatingElement className="top-20 left-10" delay="0s">
                    <SparkleIcon className="w-6 h-6 text-purple-400 opacity-60" />
                </FloatingElement>
                <FloatingElement className="top-40 right-20" delay="1s">
                    <SparkleIcon className="w-4 h-4 text-cyan-400 opacity-40" />
                </FloatingElement>
                <FloatingElement className="bottom-40 left-20" delay="2s">
                    <SparkleIcon className="w-5 h-5 text-pink-400 opacity-50" />
                </FloatingElement>
                <FloatingElement className="bottom-20 right-10" delay="0.5s">
                    <SparkleIcon className="w-7 h-7 text-blue-400 opacity-30" />
                </FloatingElement>
                
                {/* Gradient Orbs */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">
                {/* Header */}
                <header className="p-6 md:p-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
                                <BrainIcon className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                                Intelligent Prompt
                            </span>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 flex items-center justify-center px-6 md:px-8">
                    <div className="max-w-6xl mx-auto text-center">
                        {/* Hero Section */}
                        <div className="mb-16">
                            <div className="mb-8">
                                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full px-4 py-2 mb-6">
                                    <SparkleIcon className="w-4 h-4 text-purple-400" />
                                    <span className="text-sm font-medium text-purple-300">AI-Powered Optimization</span>
                                </div>
                                
                                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 animate-pulse">
                                        Intelligent
                                    </span>
                                    <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                                        Prompt
                                    </span>
                                </h1>
                                
                                <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
                                    Transform your ideas into powerful, optimized prompts that deliver 
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-semibold"> exceptional results</span>
                                </p>
                            </div>

                            {/* CTA Button */}
                            <div className="mb-16">
                                <button
                                    onClick={onGetStarted}
                                    className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-700 hover:via-pink-700 hover:to-cyan-700 text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
                                >
                                    <span>Get Started</span>
                                    <RocketIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                    
                                    {/* Button Glow Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
                                </button>
                            </div>
                        </div>

                        {/* Features Grid */}
                        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            <FeatureCard
                                icon={<BrainIcon className="w-6 h-6 text-white" />}
                                title="Smart Optimization"
                                description="Advanced AI algorithms analyze and enhance your prompts for maximum effectiveness and clarity."
                                gradient="bg-gradient-to-r from-purple-500 to-purple-600"
                            />
                            
                            <FeatureCard
                                icon={<SparkleIcon className="w-6 h-6 text-white" />}
                                title="Creative Enhancement"
                                description="Boost creativity and originality while maintaining precision and professional quality."
                                gradient="bg-gradient-to-r from-pink-500 to-rose-600"
                            />
                            
                            <FeatureCard
                                icon={<RocketIcon className="w-6 h-6 text-white" />}
                                title="Instant Results"
                                description="Get optimized prompts in seconds with real-time processing and intelligent suggestions."
                                gradient="bg-gradient-to-r from-cyan-500 to-blue-600"
                            />
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="p-6 md:p-8 text-center">
                    <p className="text-slate-500 text-sm">
                        © 2024 Intelligent Prompt. Crafted with ❤️ for better AI interactions.
                    </p>
                </footer>
            </div>
        </div>
    );
};
