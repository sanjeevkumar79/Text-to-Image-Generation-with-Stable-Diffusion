export enum TargetAudience {
  GENERAL = 'General Audience',
  TECHNICAL = 'Technical Expert',
  CREATIVE = 'Creative Professional',
  ACADEMIC = 'Academic Researcher',
  BUSINESS = 'Business Professional',
}

export enum OptimizationGoal {
  CLARITY = 'Improve Clarity and Simplicity',
  DETAIL = 'Add Specificity and Detail',
  CREATIVITY = 'Enhance Creativity and Originality',
  STRUCTURE = 'Provide Better Structure',
  CONCISENESS = 'Make it more Concise',
}

export interface OptimizationOptions {
  audience: TargetAudience;
  goal: OptimizationGoal;
}

// Biometric Authentication Types
export interface BiometricCredential {
  id: string;
  rawId: string;
  type: string;
  response: {
    attestationObject: string;
    clientDataJSON: string;
  };
  userId: string;
  userName: string;
  userDisplayName: string;
  createdAt: string;
  lastUsed?: string;
}

export interface BiometricAuthData {
  authenticatorData: string;
  clientDataJSON: string;
  signature: string;
  userHandle: string | null;
}

export interface BiometricAuthResult {
  success: boolean;
  credential?: BiometricCredential;
  authData?: BiometricAuthData;
  error?: string;
}

export interface BiometricRegistrationResult {
  success: boolean;
  credential?: BiometricCredential;
  error?: string;
}

export interface BiometricCapabilities {
  isSupported: boolean;
  isPlatformAvailable: boolean;
  hasCredentials: boolean;
  capabilities: {
    fingerprint: boolean;
    faceId: boolean;
    touchId: boolean;
    windowsHello: boolean;
  };
}
