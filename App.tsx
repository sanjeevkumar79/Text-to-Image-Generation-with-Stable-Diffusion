import React, { useState, useCallback, useEffect } from 'react';
import { PromptInput } from './components/PromptInput';
import { OptimizedOutput } from './components/OptimizedOutput';
import { AuthPage } from './components/AuthPage';
import { LandingPage } from './components/LandingPage';
import { MediaGenerationPage } from './components/MediaGenerationPage';
import { TextToVoicePage } from './components/TextToVoicePage';
import { TextToMusicPage } from './components/TextToMusicPage';
import { ThankYouPage } from './components/ThankYouPage';
import { optimizePrompt } from './services/geminiService';
import { getBiometricCapabilities, authenticateBiometric } from './services/biometricService';
import { TargetAudience, OptimizationGoal } from './types';
import type { OptimizationOptions } from './types';

const Header: React.FC<{ onSignOut: () => void; onNavigateToMedia: () => void; onNavigateToPrompt: () => void; showPromptButton: boolean }> = ({ onSignOut, onNavigateToMedia, onNavigateToPrompt, showPromptButton }) => (
  <header className="p-4 md:p-6 border-b border-slate-700">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className="text-center flex-1">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
          Intelligent Prompt Optimizer
        </h1>
        <p className="text-slate-400 mt-2 text-sm md:text-base">
          Transform your ideas into powerful, optimized prompts.
        </p>
      </div>
      {showPromptButton && (
        <div className="ml-4">
          <button
            type="button"
            onClick={onNavigateToPrompt}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onNavigateToPrompt(); } }}
            aria-label="Go to Prompt page"
            accessKey="p"
            className="fixed right-4 top-4 z-50 pointer-events-auto bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm shadow-lg"
          >
            Prompt
          </button>
        </div>
      )}
    </div>
  </header>
);

const PromptOptimizerPage: React.FC<{ onSignOut: () => void; onNavigateToMedia: () => void; onNavigateToPrompt: () => void; onNavigateToVoice: () => void; onNavigateToMusic: () => void }> = ({ onSignOut, onNavigateToMedia, onNavigateToPrompt, onNavigateToVoice, onNavigateToMusic }) => {
  const [originalPrompt, setOriginalPrompt] = useState<string>('');
  const [optimizedPrompt, setOptimizedPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<OptimizationOptions>({
    audience: TargetAudience.GENERAL,
    goal: OptimizationGoal.CLARITY,
  });
  const [hasAttemptedOptimization, setHasAttemptedOptimization] = useState<boolean>(false);

  const handleOptimize = useCallback(async () => {
    if (!originalPrompt.trim()) {
      setError('Please enter a prompt to optimize.');
      return;
    }
    setHasAttemptedOptimization(true);
    setIsLoading(true);
    setError(null);
    setOptimizedPrompt('');

    try {
      const result = await optimizePrompt(originalPrompt, options);
      setOptimizedPrompt(result);
    } catch (e) {
      console.error(e);
      setError('Failed to optimize prompt. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [originalPrompt, options]);

  return (
    <>
      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          <PromptInput
            originalPrompt={originalPrompt}
            setOriginalPrompt={setOriginalPrompt}
            options={options}
            setOptions={setOptions}
            onOptimize={handleOptimize}
            isLoading={isLoading}
          />
          {hasAttemptedOptimization && (
            <OptimizedOutput
              optimizedPrompt={optimizedPrompt}
              isLoading={isLoading}
              error={error}
            />
          )}
          {/* Navigation buttons removed from Prompt page as requested */}
        </div>
      </main>
      <footer className="text-center p-4 text-slate-500 text-xs">
        <p>© 2024 Intelligent Prompt Optimizer</p>
      </footer>
    </>
  )
}


const App: React.FC = () => {
  const [showLanding, setShowLanding] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [justSignedOut, setJustSignedOut] = useState<boolean>(false);
  const [isCheckingBiometric, setIsCheckingBiometric] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<'prompt' | 'media' | 'voice' | 'music' | 'thankyou'>('prompt');

  useEffect(() => {
    // Check for existing session and biometric capabilities
    const initializeAuth = async () => {
      try {
        // Check for existing session
        const existingSession = localStorage.getItem('auth_session');
        const sessionExpiry = localStorage.getItem('auth_session_expiry');
        
        if (existingSession && sessionExpiry) {
          const expiryTime = parseInt(sessionExpiry);
          if (Date.now() < expiryTime) {
            // Session is still valid
            setIsAuthenticated(true);
            setShowLanding(false);
            setIsCheckingBiometric(false);
            return;
          } else {
            // Session expired, clean up
            localStorage.removeItem('auth_session');
            localStorage.removeItem('auth_session_expiry');
          }
        }

        // Check biometric capabilities
        const capabilities = await getBiometricCapabilities();
        if (capabilities.hasCredentials && capabilities.isPlatformAvailable) {
          // Don't auto-authenticate, just stop the loading state
          // User can choose to use biometric auth from the login screen
        }
      } catch (error) {
        console.error('Error initializing authentication:', error);
      } finally {
        setIsCheckingBiometric(false);
      }
    };

    initializeAuth();
  }, []);

  const handleGetStarted = () => {
    setShowLanding(false);
  };

  const handleSignOut = () => {
    // Clear session storage
    localStorage.removeItem('auth_session');
    localStorage.removeItem('auth_session_expiry');
    
    setIsAuthenticated(false);
    setShowLanding(true);
    setJustSignedOut(true);
    setCurrentPage('prompt');
  };

  const handleAuthSuccess = () => {
    // Create session (expires in 24 hours)
    const sessionExpiry = Date.now() + (24 * 60 * 60 * 1000);
    localStorage.setItem('auth_session', 'active');
    localStorage.setItem('auth_session_expiry', sessionExpiry.toString());
    
    setJustSignedOut(false);
    setIsAuthenticated(true);
  };

  const handleNavigateToMedia = () => {
    setCurrentPage('media');
  };

  const handleNavigateToVoice = () => {
    setCurrentPage('voice');
  };

  const handleNavigateToMusic = () => {
    setCurrentPage('music');
  };

  const handleNavigateToThankYou = () => {
    setCurrentPage('thankyou');
  };

  const handleBackToPrompt = () => {
    setCurrentPage('prompt');
  };

  const handleBackToMedia = () => {
    setCurrentPage('media');
  };

  const handleBackToVoice = () => {
    setCurrentPage('voice');
  };

  const handleBackToMusic = () => {
    setCurrentPage('music');
  };


  // Always show header except for loading/landing/auth pages
  const showHeader = !isCheckingBiometric && !showLanding && isAuthenticated;


  if (isCheckingBiometric) {
    return (
      <div className="min-h-screen bg-slate-900 text-white font-sans flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-t-transparent border-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            Intelligent Prompt Optimizer
          </h2>
          <p className="text-slate-400 mt-2">Initializing...</p>
        </div>
      </div>
    );
  }

  if (showLanding) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  if (!isAuthenticated) {
    return (
      <AuthPage 
        onAuthSuccess={handleAuthSuccess}
        showThankYouMessage={justSignedOut}
        onThankYouMessageDismiss={() => setJustSignedOut(false)}
      />
    );
  }


  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      <Header
        onSignOut={handleSignOut}
        onNavigateToMedia={handleNavigateToMedia}
        onNavigateToPrompt={() => setCurrentPage('media')}
        showPromptButton={currentPage === 'prompt'}
      />
      {currentPage === 'media' && (
        <MediaGenerationPage
          onBack={handleBackToPrompt}
          onNavigateToVoice={handleNavigateToVoice}
          onNavigateToMusic={handleNavigateToMusic}
          onNavigateToImage={handleNavigateToVoice}
        />
      )}
      {currentPage === 'voice' && (
        <TextToVoicePage onBack={handleBackToMedia} onNavigateToMusic={handleNavigateToMusic} />
      )}
      {currentPage === 'music' && (
        <TextToMusicPage onBack={handleBackToVoice} onSignOut={handleSignOut} onNavigateToThankYou={handleNavigateToThankYou} />
      )}
      {currentPage === 'thankyou' && (
        <ThankYouPage onBack={handleBackToMusic} onSignOut={handleSignOut} />
      )}
      {currentPage === 'prompt' && (
        <PromptOptimizerPage 
          onSignOut={handleSignOut} 
          onNavigateToMedia={handleNavigateToMedia} 
          onNavigateToPrompt={() => setCurrentPage('prompt')} 
          onNavigateToVoice={handleNavigateToVoice}
          onNavigateToMusic={handleNavigateToMusic}
        />
      )}
    </div>
  );
};

export default App;