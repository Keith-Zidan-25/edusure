"use client";

import React from 'react';
import { 
  User, 
  Award, 
  ShoppingBag, 
  Settings, 
  Wallet, 
  UserPlus,
  CheckCircle,
  Diamond,
  DollarSign,
  BookOpen,
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/SignedInHeader';
import Footer from '@/components/Footer';
import Image from 'next/image';

// TypeScript Interfaces
interface RewardStats {
  badgesEarned: number;
  tokensAccumulated: number;
  scholarshipsAwarded: number;
}

interface RedemptionItem {
  id: string;
  title: string;
  cost: number;
  description?: string;
  imageUrl?: string;
  imageGradient?: string;
}

interface Course {
  id: string;
  title: string;
  provider: string;
  cost: number;
  verified: boolean;
  imageUrl?: string;
}

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
}

interface RewardCardProps {
  icon: React.ReactNode;
  title: string;
  value: number | string;
  description: string;
  onViewAll?: () => void;
}

interface RedemptionCardProps {
  item: RedemptionItem;
  onRedeem?: (id: string) => void;
}

interface CourseCardProps {
  course: Course;
  onEnroll?: (id: string) => void;
}

// Reward Card Component
const RewardCard: React.FC<RewardCardProps> = ({ icon, title, value, description, onViewAll }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex justify-center mb-3">
        <div className="text-blue-600">{icon}</div>
      </div>
      <h3 className="text-sm font-semibold text-gray-700 text-center mb-2">{title}</h3>
      <p className="text-4xl font-bold text-blue-600 text-center mb-2">{value}</p>
      <p className="text-xs text-gray-600 text-center mb-4">{description}</p>
      <button
        onClick={onViewAll}
        className="w-full py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-lg transition"
      >
        View All
      </button>
    </div>
  );
};

// Redemption Card Component
const RedemptionCard: React.FC<RedemptionCardProps> = ({ item, onRedeem }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
      <div className={`h-48 ${item.imageGradient || 'bg-gray-200'} flex items-center justify-center`}>
        {item.imageUrl ? (
          <Image src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
        ) : (
          <div className="text-white text-center p-6">
            <BookOpen className="w-16 h-16 mx-auto mb-2" />
            <p className="text-sm font-medium">{item.title}</p>
          </div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
        <p className="text-sm text-blue-600 font-semibold mb-4">{item.cost} Tokens</p>
        <button
          onClick={() => onRedeem?.(item.id)}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Redeem Now
        </button>
      </div>
    </div>
  );
};

// Course Card Component
const CourseCard: React.FC<CourseCardProps> = ({ course, onEnroll }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
      <div className="h-48 bg-gray-200 overflow-hidden">
        {course.imageUrl ? (
          <Image src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{course.title}</h3>
        <p className="text-sm text-gray-600 mb-3">{course.provider}</p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-blue-600 font-semibold">{course.cost} Tokens</span>
          {course.verified && (
            <span className="flex items-center space-x-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
              <CheckCircle className="w-3 h-3" />
              <span>Verified</span>
            </span>
          )}
        </div>
        <button
          onClick={() => onEnroll?.(course.id)}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
};

// Main MarketPlace Component
const MarketPlace: React.FC = () => {
  const sidebarItems: SidebarItem[] = [
    { icon: <UserPlus className="w-5 h-5" />, label: 'Onboarding', href: '/profile/dashboard' },
    { icon: <Award className="w-5 h-5" />, label: 'Credentials', href: '/profile/credentials' },
    { icon: <User className="w-5 h-5" />, label: 'Portfolio', href: '/profile/portfolio' },
    { icon: <ShoppingBag className="w-5 h-5" />, label: 'Marketplace', href: '/profile/marketplace', isActive: true }
  ];

  const settingsItems: SidebarItem[] = [
    { icon: <Settings className="w-5 h-5" />, label: 'Account Settings', href: '#settings' },
    { icon: <Wallet className="w-5 h-5" />, label: 'Wallet Management', href: '#wallet' }
  ];

  const rewardStats: RewardStats = {
    badgesEarned: 25,
    tokensAccumulated: 1240,
    scholarshipsAwarded: 3
  };

  const redemptionItems: RedemptionItem[] = [
    {
      id: '1',
      title: 'Blockchain E-book',
      cost: 500,
      imageGradient: 'bg-gradient-to-br from-gray-700 to-gray-900'
    },
    {
      id: '2',
      title: 'Premium Course Access',
      cost: 1000,
      imageGradient: 'bg-gradient-to-br from-yellow-400 to-orange-400'
    },
    {
      id: '3',
      title: '1-on-1 Mentorship',
      cost: 2000,
      imageGradient: 'bg-gradient-to-br from-gray-800 to-black'
    },
    {
      id: '4',
      title: 'Exclusive Event Pass',
      cost: 750,
      imageGradient: 'bg-gradient-to-br from-gray-800 to-black'
    }
  ];

  const courses: Course[] = [
    {
      id: '1',
      title: 'Introduction to Blockchain',
      provider: 'CryptoEdu Academy',
      cost: 100,
      verified: true,
      imageUrl: ''
    },
    {
      id: '2',
      title: 'Smart Contract Development',
      provider: 'Decentralized Devs',
      cost: 250,
      verified: true,
      imageUrl: ''
    },
    {
      id: '3',
      title: 'Decentralized Finance (DeFi)',
      provider: 'FinTech Innovations',
      cost: 300,
      verified: false,
      imageUrl: ''
    },
    {
      id: '4',
      title: 'Web3 Ecosystem Fundamentals',
      provider: 'Future Builders',
      cost: 150,
      verified: true,
      imageUrl: ''
    },
    {
      id: '5',
      title: 'Blockchain Security & Auditing',
      provider: 'SecureChain Institute',
      cost: 400,
      verified: true,
      imageUrl: ''
    },
    {
      id: '6',
      title: 'NFTs and Digital Collectibles',
      provider: 'MetaVerse Creatives',
      cost: 200,
      verified: false,
      imageUrl: ''
    }
  ];

  const handleViewAll = () => {
    console.log('View all clicked');
  };

  const handleRedeem = (id: string) => {
    console.log('Redeem item:', id);
  };

  const handleEnroll = (id: string) => {
    console.log('Enroll in course:', id);
  };

  const footerLinks = {
    company: [
      { href: '#about', label: 'About' },
      { href: '#contact', label: 'Contact' }
    ],
    resources: [
      { href: '#docs', label: 'Documentation' },
      { href: '#help', label: 'Help' }
    ],
    legal: [
      { href: '#privacy', label: 'Privacy' },
      { href: '#terms', label: 'Terms' }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex">
        <Sidebar items={sidebarItems} settingsItems={settingsItems} />
        
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">Learning and Incentives</h1>
              <p className="text-gray-600">
                Explore opportunities, track your progress, and redeem rewards in our decentralized learning ecosystem.
              </p>
            </div>

            {/* My Rewards Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">My Rewards</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <RewardCard
                  icon={<Award className="w-8 h-8" />}
                  title="Badges Earned"
                  value={rewardStats.badgesEarned}
                  description="Total badges acquired for course completion and challenges."
                  onViewAll={handleViewAll}
                />
                <RewardCard
                  icon={<Diamond className="w-8 h-8" />}
                  title="Tokens Accumulated"
                  value={rewardStats.tokensAccumulated.toLocaleString()}
                  description="EduBlock tokens available for redemption."
                  onViewAll={handleViewAll}
                />
                <RewardCard
                  icon={<DollarSign className="w-8 h-8" />}
                  title="Scholarships Awarded"
                  value={rewardStats.scholarshipsAwarded}
                  description="Scholarships received for academic excellence."
                  onViewAll={handleViewAll}
                />
              </div>
            </section>

            {/* Redemption Center */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Redemption Center</h2>
              <div className="grid md:grid-cols-4 gap-6">
                {redemptionItems.map((item) => (
                  <RedemptionCard
                    key={item.id}
                    item={item}
                    onRedeem={handleRedeem}
                  />
                ))}
              </div>
            </section>

            {/* Decentralized Course Marketplace */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Decentralized Course Marketplace</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onEnroll={handleEnroll}
                  />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
      
      <Footer links={footerLinks} socialLinks={{ facebook: '#', twitter: '#', linkedin: '#' }} />
    </div>
  );
};

export default MarketPlace;