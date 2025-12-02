import React, { useState, useEffect } from 'react';
import { 
  getBiometricCapabilities, 
  registerBiometric, 
  authenticateBiometric
} from '../services/biometricService';
import { BiometricCapabilities } from '../types';

const EmailIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </svg>
);

const LockIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
);

const FingerprintIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"></path>
        <path d="M14 13.12c0 2.38 0 6.38-1 8.88"></path>
        <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02"></path>
        <path d="M6.08 21.02c.12-.6.43-2.3.5-3.02"></path>
        <path d="M7.13 12.93c.22-.99.29-2.08.3-3.04.01-.96.04-1.89.04-1.89C7.47 5.6 9.24 4 12 4s4.53 1.6 4.53 4c0 0 .03.93.04 1.89.01.96.08 2.05.3 3.04"></path>
        <path d="M10.13 17.99c.67-.08.94-.44 1.05-.82.11-.38.21-.83.21-1.17 0-.34-.1-.79-.21-1.17-.11-.38-.38-.74-1.05-.82"></path>
    </svg>
);

const FaceIdIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        <path d="M7 8h.01"></path>
        <path d="M17 8h.01"></path>
        <path d="M7 16s.5 1 5 1 5-1 5-1"></path>
    </svg>
);

const InputGroup: React.FC<{
    id: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon: React.ReactNode;
}> = ({ id, type, placeholder, value, onChange, icon }) => (
    <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
        </div>
        <input
            id={id}
            name={id}
            type={type}
            required
            className="w-full pl-10 pr-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    </div>
);


export const AuthPage: React.FC<{
    onAuthSuccess: () => void;
    showThankYouMessage: boolean;
    onThankYouMessageDismiss: () => void;
}> = ({ onAuthSuccess, showThankYouMessage, onThankYouMessageDismiss }) => {
    const [isSignUp, setIsSignUp] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [biometricCapabilities, setBiometricCapabilities] = useState<BiometricCapabilities | null>(null);
    const [showBiometricSetup, setShowBiometricSetup] = useState(false);
    const [isBiometricLoading, setIsBiometricLoading] = useState(false);

    useEffect(() => {
        if (showThankYouMessage) {
            const timer = setTimeout(() => {
                onThankYouMessageDismiss();
            }, 3000); // Message disappears after 3 seconds
            return () => clearTimeout(timer);
        }
    }, [showThankYouMessage, onThankYouMessageDismiss]);

    useEffect(() => {
        // Check biometric capabilities on component mount
        const checkBiometricCapabilities = async () => {
            try {
                const capabilities = await getBiometricCapabilities();
                setBiometricCapabilities(capabilities);
            } catch (error) {
                console.error('Failed to check biometric capabilities:', error);
            }
        };
        checkBiometricCapabilities();
    }, []);

    const handleBiometricAuth = async () => {
        if (!biometricCapabilities?.hasCredentials) {
            setError('No biometric credentials found. Please sign up first to enable biometric authentication.');
            return;
        }

        if (!biometricCapabilities?.isPlatformAvailable) {
            setError('Biometric authentication is not available on this device.');
            return;
        }

        setIsBiometricLoading(true);
        setError(null);

        try {
            const result = await authenticateBiometric();
            if (result.success) {
                onAuthSuccess();
            } else {
                let errorMessage = 'Biometric authentication failed.';
                if (result.error?.includes('NotAllowedError')) {
                    errorMessage = 'Biometric authentication was cancelled or not allowed.';
                } else if (result.error?.includes('NotSupportedError')) {
                    errorMessage = 'Biometric authentication is not supported on this device.';
                } else if (result.error?.includes('SecurityError')) {
                    errorMessage = 'Security error during biometric authentication.';
                } else if (result.error) {
                    errorMessage = result.error;
                }
                setError(errorMessage);
            }
        } catch (error) {
            console.error('Biometric authentication error:', error);
            setError('Biometric authentication failed. Please use email and password instead.');
        } finally {
            setIsBiometricLoading(false);
        }
    };

    const handleBiometricSetup = async () => {
        if (!email.trim()) {
            setError('Please enter your email first.');
            return;
        }

        setIsBiometricLoading(true);
        setError(null);

        try {
            const userId = btoa(email); // Simple user ID generation
            const result = await registerBiometric(userId, email, email);
            
            if (result.success) {
                setShowBiometricSetup(false);
                // Update capabilities to reflect new credential
                const updatedCapabilities = await getBiometricCapabilities();
                setBiometricCapabilities(updatedCapabilities);
                // Show success message briefly before redirecting
                setError('Biometric authentication successfully set up!');
                setTimeout(() => {
                    onAuthSuccess();
                }, 1500);
            } else {
                let errorMessage = 'Failed to set up biometric authentication.';
                if (result.error?.includes('NotAllowedError')) {
                    errorMessage = 'Biometric setup was cancelled. You can set it up later from settings.';
                } else if (result.error?.includes('NotSupportedError')) {
                    errorMessage = 'Biometric authentication is not supported on this device.';
                } else if (result.error) {
                    errorMessage = result.error;
                }
                setError(errorMessage);
                // Allow user to proceed without biometric setup
                setTimeout(() => {
                    setShowBiometricSetup(false);
                    onAuthSuccess();
                }, 3000);
            }
        } catch (error) {
            console.error('Biometric setup error:', error);
            setError('Biometric setup failed. You can continue without it and set it up later.');
            // Allow user to proceed without biometric setup
            setTimeout(() => {
                setShowBiometricSetup(false);
                onAuthSuccess();
            }, 3000);
        } finally {
            setIsBiometricLoading(false);
        }
    };

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string): string | null => {
        if (password.length < 8) {
            return 'Password must be at least 8 characters long.';
        }
        if (!/(?=.*[a-z])/.test(password)) {
            return 'Password must contain at least one lowercase letter.';
        }
        if (!/(?=.*[A-Z])/.test(password)) {
            return 'Password must contain at least one uppercase letter.';
        }
        if (!/(?=.*\d)/.test(password)) {
            return 'Password must contain at least one number.';
        }
        return null;
    };

    const getPasswordStrength = (password: string): number => {
        let strength = 0;
        
        // Length check
        if (password.length >= 8) strength++;
        
        // Character variety checks
        if (/(?=.*[a-z])/.test(password)) strength++;
        if (/(?=.*[A-Z])/.test(password)) strength++;
        if (/(?=.*\d)/.test(password)) strength++;
        if (/(?=.*[!@#$%^&*(),.?":{}|<>])/.test(password)) strength++;
        
        // Bonus for longer passwords
        if (password.length >= 12) strength++;
        
        return Math.min(strength, 4);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validate email
        if (!email.trim()) {
            setError('Please enter your email address.');
            return;
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        // Validate password
        if (!password.trim()) {
            setError('Please enter your password.');
            return;
        }

        if (isSignUp) {
            const passwordError = validatePassword(password);
            if (passwordError) {
                setError(passwordError);
                return;
            }

            if (!confirmPassword.trim()) {
                setError('Please confirm your password.');
                return;
            }

            if (password !== confirmPassword) {
                setError("Passwords don't match.");
                return;
            }
        }

        setIsLoading(true);
        // Simulate API call for auth
        setTimeout(() => {
            setIsLoading(false);
            if (isSignUp && biometricCapabilities?.isPlatformAvailable) {
                // After successful sign up, offer biometric setup
                setShowBiometricSetup(true);
            } else {
                onAuthSuccess();
            }
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans flex items-center justify-center p-4 relative">
             {showThankYouMessage && (
                <div 
                    className="absolute top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 px-5 rounded-lg shadow-xl animate-fade-in z-10"
                    role="alert"
                >
                    <p>Thanks for using Intelligent Prompt Optimizer!</p>
                </div>
            )}
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                     <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                        Intelligent Prompt Optimizer
                    </h1>
                    <p className="text-slate-400 mt-2">
                        {isSignUp ? 'Create an account to get started.' : 'Sign in to continue optimizing.'}
                    </p>
                </div>

                <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 shadow-2xl shadow-slate-950/50">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <InputGroup
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            icon={<EmailIcon className="w-5 h-5 text-slate-400" />}
                        />

                        <InputGroup
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            icon={<LockIcon className="w-5 h-5 text-slate-400" />}
                        />
                        
                        {isSignUp && (
                            <>
                                {/* Password Strength Indicator */}
                                {password && (
                                    <div className="space-y-2">
                                        <div className="text-xs text-slate-400">Password Strength:</div>
                                        <div className="flex space-x-1">
                                            {[1, 2, 3, 4].map((level) => (
                                                <div
                                                    key={level}
                                                    className={`h-1 flex-1 rounded ${
                                                        getPasswordStrength(password) >= level
                                                            ? getPasswordStrength(password) === 1 ? 'bg-red-500'
                                                            : getPasswordStrength(password) === 2 ? 'bg-yellow-500'
                                                            : getPasswordStrength(password) === 3 ? 'bg-blue-500'
                                                            : 'bg-green-500'
                                                            : 'bg-slate-600'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                        <div className="text-xs text-slate-400">
                                            {getPasswordStrength(password) === 1 && 'Weak'}
                                            {getPasswordStrength(password) === 2 && 'Fair'}
                                            {getPasswordStrength(password) === 3 && 'Good'}
                                            {getPasswordStrength(password) === 4 && 'Strong'}
                                        </div>
                                    </div>
                                )}

                                <InputGroup
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    icon={<LockIcon className="w-5 h-5 text-slate-400" />}
                                />
                            </>
                        )}

                        {error && (
                            <p className={`text-sm text-center ${error.includes('successfully') ? 'text-green-400' : 'text-red-400'}`}>{error}</p>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold py-3 px-4 rounded-md hover:from-purple-700 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                                        <span>{isSignUp ? 'Creating Account...' : 'Signing In...'}</span>
                                    </>
                                ) : (
                                    <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                                )}
                            </button>
                        </div>

                        {/* Biometric Authentication Options */}
                        {biometricCapabilities?.isPlatformAvailable && (
                            <>
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-slate-600"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-slate-800/50 text-slate-400">or</span>
                                    </div>
                                </div>

                                {!isSignUp && biometricCapabilities.hasCredentials && (
                                    <button
                                        type="button"
                                        onClick={handleBiometricAuth}
                                        disabled={isBiometricLoading}
                                        className="w-full flex items-center justify-center gap-3 bg-slate-700/80 hover:bg-slate-700 text-white font-semibold py-3 px-4 rounded-md border border-slate-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isBiometricLoading ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                                                <span>Authenticating...</span>
                                            </>
                                        ) : (
                                            <>
                                                <FingerprintIcon className="w-5 h-5" />
                                                <span>Use Biometric Authentication</span>
                                            </>
                                        )}
                                    </button>
                                )}
                            </>
                        )}
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => {
                                setIsSignUp(!isSignUp);
                                setError(null);
                                // Reset form fields when switching between sign up and sign in
                                setEmail('');
                                setPassword('');
                                setConfirmPassword('');
                            }}
                            className="text-sm text-cyan-400 hover:text-cyan-300 hover:underline"
                        >
                            {isSignUp
                                ? 'Already have an account? Sign In'
                                : "Don't have an account? Sign Up"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Biometric Setup Modal */}
            {showBiometricSetup && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
                    <div className="bg-slate-900 rounded-lg p-8 max-w-md w-full border border-slate-600 shadow-2xl">
                        <div className="text-center mb-8">
                            <div className="mx-auto w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-6">
                                <FingerprintIcon className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Making sure it's you</h3>
                            <p className="text-slate-300 text-base mb-6">
                                Intelligent Prompt Optimizer is trying to set up biometric authentication.
                            </p>
                            <div className="mb-6">
                                <div className="mx-auto w-16 h-16 flex items-center justify-center mb-4">
                                    <div className="relative">
                                        <FingerprintIcon className="w-12 h-12 text-blue-400 animate-pulse" />
                                        <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping"></div>
                                    </div>
                                </div>
                                <p className="text-white text-lg font-medium">
                                    {isBiometricLoading ? 'Setting up biometric authentication...' : 'Scan your finger on the fingerprint reader.'}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="text-center">
                                <button
                                    onClick={handleBiometricSetup}
                                    disabled={isBiometricLoading}
                                    className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
                                >
                                    {isBiometricLoading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                                            <span>Setting Up...</span>
                                        </>
                                    ) : (
                                        <span>Set Up Biometric Authentication</span>
                                    )}
                                </button>
                            </div>

                            <div className="text-center">
                                <button
                                    onClick={() => {
                                        setShowBiometricSetup(false);
                                        onAuthSuccess(); // Redirect to main app when canceling
                                    }}
                                    className="w-full py-3 px-6 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-md transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>

                            <div className="text-center">
                                <p className="text-slate-400 text-sm">
                                    Sign-in options
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};