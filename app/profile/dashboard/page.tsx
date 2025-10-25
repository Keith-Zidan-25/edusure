"use client";

import React, { useContext, useEffect, useState } from 'react';
import { 
  User, 
  Award, 
  ShoppingBag, 
  Settings, 
  Wallet, 
  UserPlus,
  Shield,
  CreditCard,
  BookOpen,
} from 'lucide-react';
import Header from '@/components/SignedInHeader';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { SidebarItem } from '@/utils/types/components';

interface OnboardingStep {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  onClick?: () => void;
  completed?: boolean;
}

interface NextStepCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

interface ProgressBarProps {
  progress: number;
  steps: Array<{ label: string; completed: boolean }>;
}

interface OnboardingSectionProps {
  steps: OnboardingStep[];
}

interface NextStepsProps {
  cards: NextStepCard[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, steps }) => {
  return (
    <div className="mb-8">
      <div className="relative">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between mt-4">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step.completed ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {step.completed ? '✓' : index + 1}
              </div>
              <span className="text-xs text-gray-600 mt-2 text-center">{step.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const OnboardingSection: React.FC<OnboardingSectionProps> = ({ steps }) => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {steps.map((step) => (
        <div key={step.id} className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
            {step.icon}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
          <p className="text-gray-600 text-sm mb-6">{step.description}</p>
          <button
            onClick={step.onClick}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            {step.buttonText}
          </button>
        </div>
      ))}
    </div>
  );
};

const NextSteps: React.FC<NextStepsProps> = ({ cards }) => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">What&apos;s Next?</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <a
            key={index}
            href={card.href}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition group"
          >
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
                {card.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{card.title}</h3>
                <p className="text-sm text-gray-600">{card.description}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const { isAuthenticated, user, loading } = useContext(AuthContext);
  const [progress] = useState(33);
  const router = useRouter();

  const sidebarItems: SidebarItem[] = [
    { icon: <UserPlus className="w-5 h-5" />, label: 'Onboarding', href: '/profile/dashboard', isActive: true },
    { icon: <Award className="w-5 h-5" />, label: 'Credentials', href: '/profile/credentials' },
    { icon: <User className="w-5 h-5" />, label: 'Portfolio', href: '/profile/portfolio' },
    { icon: <ShoppingBag className="w-5 h-5" />, label: 'Marketplace', href: '/profile/marketplace' }
  ];

  const settingsItems: SidebarItem[] = [
    { icon: <Settings className="w-5 h-5" />, label: 'Account Settings', href: '#settings' },
    { icon: <Wallet className="w-5 h-5" />, label: 'Wallet Management', href: '#wallet' }
  ];

  const progressSteps = [
    { label: 'Profile Setup', completed: true },
    { label: 'Identity Verification', completed: false },
    { label: 'Wallet Connection', completed: false }
  ];

  const onboardingSteps: OnboardingStep[] = [
    {
      id: 'profile',
      icon: <UserPlus className="w-6 h-6 text-blue-600" />,
      title: 'Complete Your Profile',
      description: 'Personalize your EduBlock experience by adding your academic history and professional details.',
      buttonText: 'Start Setup',
      onClick: () => console.log('Start profile setup')
    },
    {
      id: 'verify',
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      title: 'Verify Your Identity',
      description: 'Secure your account and unlock advanced features by completing our identity verification process.',
      buttonText: 'Verify Now',
      onClick: () => console.log('Start verification')
    },
    {
      id: 'wallet',
      icon: <CreditCard className="w-6 h-6 text-blue-600" />,
      title: 'Connect Your Wallet',
      description: 'Link your blockchain wallet to manage credentials and participate in the tokenized ecosystem.',
      buttonText: 'Connect Wallet',
      onClick: () => console.log('Connect wallet')
    }
  ];

  const nextStepsCards: NextStepCard[] = [
    {
      icon: <Award className="w-6 h-6" />,
      title: 'View Credentials',
      description: 'Explore your verified academic achievements.',
      href: '#credentials'
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Build Portfolio',
      description: 'Showcase your skills, badges, and MOOC history.',
      href: '#portfolio'
    },
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      title: 'Discover Marketplace',
      description: 'Find new courses and learning opportunities.',
      href: '#marketplace'
    }
  ];

  const footerLinks = {
    company: [
      { href: '#about', label: 'About Us' },
      { href: '#careers', label: 'Careers' },
      { href: '#blog', label: 'Blog' }
    ],
    resources: [
      { href: '#docs', label: 'Documentation' },
      { href: '#help', label: 'Help Center' },
      { href: '#api', label: 'API' }
    ],
    legal: [
      { href: '#privacy', label: 'Privacy Policy' },
      { href: '#terms', label: 'Terms of Service' },
      { href: '#cookies', label: 'Cookie Policy' }
    ]
  };

  
    useEffect(() => {
          if (loading) return;
  
          if (!isAuthenticated) {
            return router.replace(`${process.env.NEXT_PUBLIC_BASE_URL}/auth`)
          }
      }, [isAuthenticated, loading, router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={{ name: user?.name, avatar: "" }}/>
      
      <div className="flex">
        <Sidebar items={sidebarItems} settingsItems={settingsItems} />
        
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 mb-8 flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome, {user?.name}</h1>
                <p className="text-gray-600 text-lg">Your personalized onboarding journey begins here.</p>
              </div>
              <button className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition">
                Change Role
              </button>
            </div>

            {/* Onboarding Progress */}
            <div className="bg-white rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Onboarding Progress</h2>
              <p className="text-gray-600 mb-6">Complete the steps below to unlock full EduBlock features.</p>
              
              <ProgressBar progress={progress} steps={progressSteps} />
            </div>

            {/* Onboarding Steps */}
            <OnboardingSection steps={onboardingSteps} />

            {/* Next Steps */}
            <NextSteps cards={nextStepsCards} />
          </div>
        </main>
      </div>
      
      <Footer links={footerLinks} socialLinks={{ facebook: '#', twitter: '#', linkedin: '#' }} />
    </div>
  );
};

export default Dashboard;