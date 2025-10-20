"use client";

import React from 'react';
import { Shield, User, Globe, GraduationCap, Lock, Wallet } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';

interface ValueCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeatureSectionProps {
  icon: LucideIcon;
  title: string;
  description: string;
  image: React.ReactNode;
  imageRight?: boolean;
}

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  avatar: string;
}

const ValueCard = ({ icon: Icon, title, description }: ValueCardProps) => {
  return (
    <div className="flex flex-col items-center text-center p-6">
      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-blue-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

const FeatureSection = ({ icon: Icon, title, description, image, imageRight = false }: FeatureSectionProps) => {
  return (
    <div className={`flex flex-col ${imageRight ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 mb-20`}>
      <div className="flex-1">
        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="flex-1">
        <div className="bg-gray-200 rounded-lg overflow-hidden h-64">
          {image}
        </div>
      </div>
    </div>
  );
};

const TestimonialCard = ({ quote, name, title, avatar }: TestimonialCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <p className="text-gray-600 italic mb-4">&quot;{quote}&quot;</p>
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gray-300 rounded-full mr-3">{avatar}</div>
        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-gray-500">{title}</p>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onSignIn={() => router.push('/auth')}
        onGetStarted={() => router.push('/auth')}
      />
      
      <section className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Secure, Verifiable Credentials<br />for a Decentralized Future
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Empower your educational journey with blockchain-backed certificates, unified profiles, and global portability. Take control of your achievements.
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-lg">
            Get Started Now
          </button>
        </div>
      </section>
      
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Our Core Value Propositions
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Experience a new era of trust and control over your educational and professional achievements.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          <ValueCard
            icon={Shield}
            title="Secure Credentials"
            description="Your achievements are immutably stored on the blockchain, protected from fraud and certifiable instantly."
          />
          <ValueCard
            icon={User}
            title="Unified Profiles"
            description="Consolidate all of your educational and professional achievements into a single, comprehensive digital profile."
          />
          <ValueCard
            icon={Globe}
            title="Global Portability"
            description="Share your verified credentials seamlessly across borders with institutions and employers worldwide."
          />
        </div>
      </section>
      
      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Unlock the Future of Education
        </h2>
        <p className="text-center text-gray-600 mb-16">
          Discover how CredChain&apos;s innovative features empower your journey.
        </p>
        
        <FeatureSection
          icon={GraduationCap}
          title="Decentralized Learning Paths"
          description="Explore courses and certifications from various providers, all authenticated and tracked on our blockchain platform. Your learning journey, secured and transparent."
          image={<div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400"></div>}
        />
        
        <FeatureSection
          icon={Lock}
          title="Advanced 2FA Security"
          description="Protect your profile and digital wallet with robust two-factor authentication, ensuring only you have access to your valuable credentials."
          image={<div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400"></div>}
          imageRight={true}
        />
        
        <FeatureSection
          icon={Wallet}
          title="Integrated Digital Wallet"
          description="Manage your blockchain credentials, platform tokens, and digital assets securely within your personal CredChain wallet."
          image={<div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400"></div>}
        />
      </section>
      
      {/* Testimonials */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          What Our Users Say
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Hear from individuals transforming their educational and professional lives with CredChain.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          <TestimonialCard
            quote="CredChain transformed how I share my professional certificates. It's secure, fast, and globally recognized."
            name="Dr. Anya Sharma"
            title="University Professor"
            avatar="AS"
          />
          <TestimonialCard
            quote="Finally, a platform that gives me full ownership and control over my academic records. Highly recommended!"
            name="David Lee"
            title="Software Engineer"
            avatar="DL"
          />
          <TestimonialCard
            quote="The global portability feature is a game-changer for international students and professionals like me."
            name="Maria Garcia"
            title="International Student"
            avatar="MG"
          />
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default App;