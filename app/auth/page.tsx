"use client";

import React, { useContext } from 'react';
import { Shield, Users, Globe } from 'lucide-react';
import SignUpForm from '@/components/AuthForm';
import { toast, ToastContainer } from 'react-toastify';
import Image from 'next/image';
import { AuthContext } from '@/context/AuthContext';
import { SignUpFormData } from "@/utils/types/auth";
import { useRouter } from 'next/navigation';

interface FeatureItemProps {
    icon: React.ReactNode;
    text: string;
}

interface LeftPanelProps {
    title: string;
    features: Array<{
        icon: React.ReactNode;
        text: string;
    }>;
    imageUrl?: string;
}

interface LanguageSelectorProps {
    languages?: string[];
    defaultLanguage?: string;
    onChange?: (language: string) => void;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, text }) => {
    return (
        <div className="flex items-center space-x-3 mb-4">
            <div className="text-green-600">{icon}</div>
            <span className="text-gray-800 text-lg">{text}</span>
        </div>
    );
};

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
    languages = ['English', 'Spanish', 'French', 'German'],
    defaultLanguage = 'English',
    onChange
}) => {
    return (
        <select
            defaultValue={defaultLanguage}
            onChange={(e) => onChange?.(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            {languages.map((lang) => (
            <option key={lang} value={lang}>
                {lang}
            </option>
        ))}
        </select>
    );
};

const LeftPanel: React.FC<LeftPanelProps> = ({ title, features, imageUrl }) => {
    return (
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 flex flex-col justify-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                {title}
            </h1>
            
            <div className="mb-5">
                {features.map((feature, index) => (
                <FeatureItem key={index} icon={feature.icon} text={feature.text} />
                ))}
            </div>
            
            <div className="mt-5">
                {imageUrl ? (
                    <Image src={imageUrl} alt="Blockchain illustration" className="w-full rounded-lg" />
                ) : (
                    <div className="w-full h-60 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-30">
                            <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-lg transform rotate-12"></div>
                            <div className="absolute top-20 right-20 w-16 h-16 bg-pink-400 rounded-lg transform -rotate-6"></div>
                            <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-orange-400 rounded-lg transform rotate-45"></div>
                            <div className="absolute bottom-10 right-10 w-20 h-20 bg-blue-400 rounded-lg transform -rotate-12"></div>
                        </div>
                        <div className="relative z-10 text-white text-6xl font-bold">₿</div>
                    </div>
                )}
            </div>
        </div>
    );
};

const AuthPage: React.FC = () => {
    const { isAuthenticated, login, register } = useContext(AuthContext);
    const router = useRouter();
    
    const handleFormSubmit = (data: SignUpFormData) => {
        console.log('Form submitted:', data);
        try {
            if (data.isSignIn) {
                login(data);
            } else {
                register(data);
            }

            router.push("/profile/dashboard");
        } catch (err) {
            console.log(err);
        }
    };

    const handleGoogleSignUp = () => {
        toast('Google signin coming soon!!', {
            autoClose: 2000,
            type: "info"
        });
    };

    const handleLinkedInSignUp = () => {
        toast('LinkedIn signin coming soon!!', {
            autoClose: 2000,
            type: "info"
        });
    };

    const handleLanguageChange = (language: string) => {
        console.log('Language changed to:', language);
    };

    const features = [
        {
            icon: <Shield className="w-6 h-6" />,
            text: 'Secure Credentials'
        },
        {
            icon: <Users className="w-6 h-6" />,
            text: 'Unified Profiles'
        },
        {
            icon: <Globe className="w-6 h-6" />,
            text: 'Global Portability'
        }
    ];

    if (isAuthenticated) {
        router.push("/profile/dashboard");
    }

    return (
        <div className="min-h-screen bg-white flex flex-col p-8">
            <div className="absolute top-6 right-6 z-10">
                <LanguageSelector onChange={handleLanguageChange} />
            </div>

            <div className="flex-1 grid md:grid-cols-2 mb-0">
                <LeftPanel
                    title="Transforming Education with Blockchain"
                    features={features}
                />
                <SignUpForm
                    onSubmit={handleFormSubmit}
                    onGoogleSignUp={handleGoogleSignUp}
                    onLinkedInSignUp={handleLinkedInSignUp}
                />
            </div>
            <ToastContainer position="bottom-right" />
            {/* <Footer /> */}
        </div>
    );
};

export default AuthPage;