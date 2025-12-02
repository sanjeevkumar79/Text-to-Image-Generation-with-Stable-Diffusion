import React, { useState, useEffect } from 'react';

interface OptimizedOutputProps {
  optimizedPrompt: string;
  isLoading: boolean;
  error: string | null;
}

const CopyIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
    </svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);


const Loader: React.FC = () => (
    <div className="flex flex-col items-center justify-center text-center text-slate-400 gap-4">
        <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-purple-500 rounded-full animate-spin"></div>
        </div>
        <p className="font-semibold">Gemini is thinking...</p>
        <p className="text-sm">Crafting the perfect prompt for you.</p>
    </div>
);

const Placeholder: React.FC = () => (
    <div className="text-center text-slate-500">
        <p>Your optimized prompt will appear here.</p>
    </div>
);

const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
    <div className="text-center text-red-400 bg-red-900/20 p-4 rounded-md border border-red-500/30">
        <h3 className="font-bold mb-1">An Error Occurred</h3>
        <p>{message}</p>
    </div>
);

export const OptimizedOutput: React.FC<OptimizedOutputProps> = ({
  optimizedPrompt,
  isLoading,
  error,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const handleCopy = () => {
    if (optimizedPrompt) {
      navigator.clipboard.writeText(optimizedPrompt);
      setIsCopied(true);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }
    if (error) {
      return <ErrorDisplay message={error} />;
    }
    if (optimizedPrompt) {
      return (
        <div className="relative group">
            <button
                onClick={handleCopy}
                className="absolute top-3 right-3 p-2 bg-slate-700/50 rounded-md text-slate-400 hover:text-white hover:bg-slate-600 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="Copy to clipboard"
            >
                {isCopied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <CopyIcon className="w-5 h-5" />}
            </button>
            <p className="text-slate-200 whitespace-pre-wrap font-mono text-sm leading-relaxed p-4 bg-slate-900 rounded-md">
                {optimizedPrompt}
            </p>
        </div>
      );
    }
    return <Placeholder />;
  };

  return (
    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 flex flex-col h-full animate-fade-in">
      <h2 className="text-xl font-semibold text-slate-100 mb-6">Optimized Result</h2>
      <div className="flex-grow flex items-center justify-center p-4 bg-slate-800 rounded-md min-h-[200px]">
        {renderContent()}
      </div>
    </div>
  );
};