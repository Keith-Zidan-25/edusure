export interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword?: string;
  enable2FA?: boolean;
  isSignIn: boolean;
}

export interface SignUpFormProps {
  onSubmit?: (data: SignUpFormData) => void;
  onGoogleSignUp?: () => void;
  onLinkedInSignUp?: () => void;
}

export interface TAuthContext {
  isAuthenticated: boolean,
  user: TUser | null,
  login: (credentials: SignUpFormData) => Promise<void>,
  register: (userData: SignUpFormData) => Promise<void>,
  logout: () => Promise<void>
}