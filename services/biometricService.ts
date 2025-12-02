import { BiometricCredential, BiometricAuthResult, BiometricRegistrationResult } from '../types';

// Check if WebAuthn is supported
export const isBiometricSupported = (): boolean => {
  return !!(navigator.credentials && window.PublicKeyCredential);
};

// Check if platform authenticator (built-in biometrics) is available
export const isPlatformAuthenticatorAvailable = async (): Promise<boolean> => {
  if (!isBiometricSupported()) return false;
  
  try {
    return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
  } catch {
    return false;
  }
};

// Generate a random challenge
const generateChallenge = (): Uint8Array => {
  const challenge = new Uint8Array(32);
  crypto.getRandomValues(challenge);
  return challenge;
};

// Convert ArrayBuffer to base64url
const arrayBufferToBase64url = (buffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
};

// Convert base64url to ArrayBuffer
const base64urlToArrayBuffer = (base64url: string): ArrayBuffer => {
  const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
};

// Register biometric credential
export const registerBiometric = async (
  userId: string,
  userName: string,
  userDisplayName: string
): Promise<BiometricRegistrationResult> => {
  if (!isBiometricSupported()) {
    throw new Error('Biometric authentication is not supported on this device');
  }

  const challenge = generateChallenge();
  
  const publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions = {
    challenge,
    rp: {
      name: 'Intelligent Prompt Optimizer',
      id: window.location.hostname,
    },
    user: {
      id: new TextEncoder().encode(userId),
      name: userName,
      displayName: userDisplayName,
    },
    pubKeyCredParams: [
      { alg: -7, type: 'public-key' }, // ES256
      { alg: -257, type: 'public-key' }, // RS256
    ],
    authenticatorSelection: {
      authenticatorAttachment: 'platform',
      userVerification: 'required',
      requireResidentKey: true,
    },
    timeout: 60000,
    attestation: 'direct',
  };

  try {
    const credential = await navigator.credentials.create({
      publicKey: publicKeyCredentialCreationOptions,
    }) as PublicKeyCredential;

    if (!credential) {
      throw new Error('Failed to create credential');
    }

    const response = credential.response as AuthenticatorAttestationResponse;
    
    const credentialData: BiometricCredential = {
      id: credential.id,
      rawId: arrayBufferToBase64url(credential.rawId),
      type: credential.type,
      response: {
        attestationObject: arrayBufferToBase64url(response.attestationObject),
        clientDataJSON: arrayBufferToBase64url(response.clientDataJSON),
      },
      userId,
      userName,
      userDisplayName,
      createdAt: new Date().toISOString(),
    };

    // Store credential in localStorage (in production, this should be stored securely on server)
    const existingCredentials = getBiometricCredentials();
    const updatedCredentials = [...existingCredentials, credentialData];
    localStorage.setItem('biometric_credentials', JSON.stringify(updatedCredentials));

    return {
      success: true,
      credential: credentialData,
    };
  } catch (error) {
    console.error('Biometric registration failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Registration failed',
    };
  }
};

// Authenticate using biometric
export const authenticateBiometric = async (): Promise<BiometricAuthResult> => {
  if (!isBiometricSupported()) {
    throw new Error('Biometric authentication is not supported on this device');
  }

  const credentials = getBiometricCredentials();
  if (credentials.length === 0) {
    return {
      success: false,
      error: 'No biometric credentials found. Please register first.',
    };
  }

  const challenge = generateChallenge();
  const allowCredentials = credentials.map(cred => ({
    id: base64urlToArrayBuffer(cred.rawId),
    type: 'public-key' as const,
  }));

  const publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions = {
    challenge,
    allowCredentials,
    timeout: 60000,
    userVerification: 'required',
  };

  try {
    const assertion = await navigator.credentials.get({
      publicKey: publicKeyCredentialRequestOptions,
    }) as PublicKeyCredential;

    if (!assertion) {
      throw new Error('Authentication failed');
    }

    const response = assertion.response as AuthenticatorAssertionResponse;
    const credentialId = arrayBufferToBase64url(assertion.rawId);
    
    // Find the matching credential
    const matchingCredential = credentials.find(cred => cred.rawId === credentialId);
    
    if (!matchingCredential) {
      throw new Error('Credential not found');
    }

    // Update last used timestamp
    matchingCredential.lastUsed = new Date().toISOString();
    const updatedCredentials = credentials.map(cred => 
      cred.rawId === credentialId ? matchingCredential : cred
    );
    localStorage.setItem('biometric_credentials', JSON.stringify(updatedCredentials));

    return {
      success: true,
      credential: matchingCredential,
      authData: {
        authenticatorData: arrayBufferToBase64url(response.authenticatorData),
        clientDataJSON: arrayBufferToBase64url(response.clientDataJSON),
        signature: arrayBufferToBase64url(response.signature),
        userHandle: response.userHandle ? arrayBufferToBase64url(response.userHandle) : null,
      },
    };
  } catch (error) {
    console.error('Biometric authentication failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Authentication failed',
    };
  }
};

// Get stored biometric credentials
export const getBiometricCredentials = (): BiometricCredential[] => {
  try {
    const stored = localStorage.getItem('biometric_credentials');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Remove a biometric credential
export const removeBiometricCredential = (credentialId: string): boolean => {
  try {
    const credentials = getBiometricCredentials();
    const filtered = credentials.filter(cred => cred.id !== credentialId);
    localStorage.setItem('biometric_credentials', JSON.stringify(filtered));
    return true;
  } catch {
    return false;
  }
};

// Clear all biometric credentials
export const clearBiometricCredentials = (): void => {
  localStorage.removeItem('biometric_credentials');
};

// Get biometric capability info
export const getBiometricCapabilities = async () => {
  const isSupported = isBiometricSupported();
  const isPlatformAvailable = isSupported ? await isPlatformAuthenticatorAvailable() : false;
  const hasCredentials = getBiometricCredentials().length > 0;

  return {
    isSupported,
    isPlatformAvailable,
    hasCredentials,
    capabilities: {
      fingerprint: isPlatformAvailable,
      faceId: isPlatformAvailable,
      touchId: isPlatformAvailable,
      windowsHello: isPlatformAvailable && navigator.userAgent.includes('Windows'),
    },
  };
};


