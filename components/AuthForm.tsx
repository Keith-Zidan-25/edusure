import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface SocialButtonProps {
  provider: 'google' | 'linkedin';
  onClick?: () => void;
}

interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
  enable2FA: boolean;
}

interface SignUpFormProps {
  onSubmit?: (data: SignUpFormData) => void;
  onGoogleSignUp?: () => void;
  onLinkedInSignUp?: () => void;
  onSignIn?: () => void;
}

const SocialButton: React.FC<SocialButtonProps> = ({ provider, onClick }) => {
    const config = {
        google: {
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
                </svg>
            ),
            text: 'Sign up with Google'
        },
        linkedin: {
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
            ),
            text: 'Sign up with LinkedIn'
        }
    };

    const { icon, text } = config[provider];

    return (
        <button
            onClick={onClick}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        >
            {icon}
            <span className="text-gray-700 font-medium">{text}</span>
        </button>
    );
};

export default function SignUpForm ({
    onSubmit,
    onGoogleSignUp,
    onLinkedInSignUp,
    onSignIn
}: SignUpFormProps ) {
    const [formData, setFormData] = useState<SignUpFormData>({
        email: '',
        password: '',
        confirmPassword: '',
        enable2FA: false
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = () => {
        onSubmit?.(formData);
    };

    const handleChange = (field: keyof SignUpFormData, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="p-8 flex flex-col justify-center max-w-md mx-auto">
        <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Join EduSure Today!</h2>
            <p className="text-gray-600">
            Your secure gateway to verifiable credentials and a decentralized learning future.
            </p>
        </div>

        {/* Social Sign Up Buttons */}
        <div className="space-y-3 mb-6">
            <SocialButton provider="google" onClick={onGoogleSignUp} />
            <SocialButton provider="linkedin" onClick={onLinkedInSignUp} />
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">OR CONTINUE WITH</span>
            <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
            <div>
            <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>

            <div className="relative">
            <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            </div>

            <div className="relative">
            <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            </div>

            <div className="flex items-center">
            <input
                type="checkbox"
                id="enable2FA"
                checked={formData.enable2FA}
                onChange={(e) => handleChange('enable2FA', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="enable2FA" className="ml-2 text-sm text-gray-700 cursor-pointer">
                Enable Two-Factor Authentication
            </label>
            </div>

            <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
            Register Now
            </button>
        </div>

        <p className="mt-6 text-center text-gray-600">
            Already have an account?{' '}
            <button onClick={onSignIn} className="text-blue-600 hover:text-blue-700 font-semibold">
            Sign In
            </button>
        </p>
        </div>
    );
};
