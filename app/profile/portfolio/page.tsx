"use client";

import React, { useContext, useEffect } from 'react';
import { 
  User, 
  Award, 
  ShoppingBag, 
  Settings, 
  Wallet, 
  UserPlus,
  CheckCircle,
  Info,
  Share2,
  Clock,
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import Header from '@/components/SignedInHeader';
import { AuthContext } from '@/context/AuthContext';
import { SidebarItem } from '@/utils/types/components';
import { useRouter } from 'next/navigation';

interface ProfileOverview {
  name: string;
  title: string;
  university: string;
  totalCredentials: number;
  skillsEndorsed: number;
  walletAddress: string;
  verificationStatus: 'verified' | 'pending';
}

interface MicroCredential {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  verified: boolean;
}

interface Badge {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  icon: string;
}

interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  endorsedBy: number;
}

interface Course {
  id: string;
  title: string;
  provider: string;
  date: string;
  description: string;
  duration: string;
}

interface ProfileHeaderProps {
  profile: ProfileOverview;
  onSharePortfolio?: () => void;
}

interface MicroCredentialCardProps {
  credential: MicroCredential;
  onViewDetails?: (id: string) => void;
}

interface BadgeCardProps {
  badge: Badge;
  onViewBadge?: (id: string) => void;
}

interface SkillCardProps {
  skill: Skill;
  onEndorse?: (id: string) => void;
}

interface CourseCardProps {
  course: Course;
  onViewCertificate?: (id: string) => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile, onSharePortfolio }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Student Portfolio</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-1">{profile.name}</h2>
          <p className="text-gray-600">{profile.title} at {profile.university}</p>
        </div>
        <button
          onClick={onSharePortfolio}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center space-x-2"
        >
          <Share2 className="w-5 h-5" />
          <span>Share Portfolio</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Overview</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">Total Credentials: <strong>{profile.totalCredentials}</strong></span>
            </div>
            <div className="flex items-center space-x-2">
              <Info className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">Skills Endorsed: <strong>{profile.skillsEndorsed}</strong></span>
            </div>
            <div className="flex items-start space-x-2">
              <Wallet className="w-5 h-5 text-gray-500 mt-0.5" />
              <div>
                <span className="text-gray-700">Wallet Address:</span>
                <p className="text-sm font-mono text-gray-600 break-all">{profile.walletAddress}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification Status</h3>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-green-800">Verified</span>
            </div>
            <p className="text-sm text-green-700">Profile verified on blockchain.</p>
            <p className="text-xs text-green-600 mt-2">All achievements are immutable and tamper-proof.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const MicroCredentialCard: React.FC<MicroCredentialCardProps> = ({ credential, onViewDetails }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
      <h3 className="text-lg font-bold text-gray-900 mb-2">{credential.title}</h3>
      <p className="text-sm text-gray-600 mb-1">{credential.issuer} • {credential.date}</p>
      <p className="text-sm text-gray-700 mb-4">{credential.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-green-600 flex items-center space-x-1">
          <CheckCircle className="w-4 h-4" />
          <span>Verified on Blockchain</span>
        </span>
        <button
          onClick={() => onViewDetails?.(credential.id)}
          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

const BadgeCard: React.FC<BadgeCardProps> = ({ badge, onViewBadge }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
          {badge.icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{badge.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{badge.issuer} • {badge.date}</p>
          <p className="text-sm text-gray-700 mb-3">{badge.description}</p>
          <button
            onClick={() => onViewBadge?.(badge.id)}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            View Badge
          </button>
        </div>
      </div>
    </div>
  );
};

const SkillCard: React.FC<SkillCardProps> = ({ skill, onEndorse }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">{skill.name}</h3>
          <span className="text-sm text-gray-600">Level: {skill.level}</span>
        </div>
        <span className="text-xs text-gray-500">Endorsed by {skill.endorsedBy} Peers</span>
      </div>
      <p className="text-sm text-gray-700 mb-4">{skill.description}</p>
      <button
        onClick={() => onEndorse?.(skill.id)}
        className="text-blue-600 hover:text-blue-700 font-medium text-sm"
      >
        Endorse
      </button>
    </div>
  );
};

const CourseCard: React.FC<CourseCardProps> = ({ course, onViewCertificate }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
      <h3 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h3>
      <p className="text-sm text-gray-600 mb-3">{course.provider} • {course.date}</p>
      <p className="text-sm text-gray-700 mb-4">{course.description}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">{course.duration}</span>
        </div>
        <button
          onClick={() => onViewCertificate?.(course.id)}
          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
        >
          Certificate
        </button>
      </div>
    </div>
  );
};

const Portfolio: React.FC = () => {
  const {isAuthenticated, user, loading} = useContext(AuthContext);
  const router = useRouter();

  const sidebarItems: SidebarItem[] = [
    { icon: <UserPlus className="w-5 h-5" />, label: 'Onboarding', href: '/profile/dashboard' },
    { icon: <Award className="w-5 h-5" />, label: 'Credentials', href: '/profile/credentials' },
    { icon: <User className="w-5 h-5" />, label: 'Portfolio', href: '/profile/portfolio', isActive: true },
    { icon: <ShoppingBag className="w-5 h-5" />, label: 'Marketplace', href: '/profile/marketplace' }
  ];

  const settingsItems: SidebarItem[] = [
    { icon: <Settings className="w-5 h-5" />, label: 'Account Settings', href: '#settings' },
    { icon: <Wallet className="w-5 h-5" />, label: 'Wallet Management', href: '#wallet' }
  ];

  const profileData: ProfileOverview = {
    name: user?.name,
    title: 'Student',
    university: 'EduBlock University',
    totalCredentials: 6,
    skillsEndorsed: 4,
    walletAddress: user?.hederaAccountId,
    verificationStatus: 'verified'
  };

  const microCredentials: MicroCredential[] = [
    {
      id: '1',
      title: 'Blockchain Development',
      issuer: 'TechEdu Institute',
      date: '2023-08-15',
      description: 'Completed an intensive course covering smart contracts, DPortfolios, and blockchain architecture.',
      verified: true
    },
    {
      id: '2',
      title: 'Decentralized Finance (DeFi)',
      issuer: 'CryptoLearn Academy',
      date: '2023-09-20',
      description: 'Explored core DeFi concepts including liquidity pools, yield farming, and decentralized exchanges.',
      verified: true
    },
    {
      id: '3',
      title: 'Data Privacy & Security on Blockchain',
      issuer: 'SecureChain University',
      date: '2023-11-01',
      description: 'Focused on cryptographic techniques, data anonymization, and regulatory compliance in blockchain.',
      verified: true
    },
    {
      id: '4',
      title: 'Introduction to Web3 Gaming',
      issuer: 'GameChain Hub',
      date: '2024-01-10',
      description: 'Learned about NFT integration, play-to-earn models, and tokenomics in blockchain gaming.',
      verified: true
    },
    {
      id: '5',
      title: 'Certified Digital Identity Specialist',
      issuer: 'IDVerify Solutions',
      date: '2024-03-05',
      description: 'Trained in self-sovereign identity principles and decentralized identity management.',
      verified: true
    },
    {
      id: '6',
      title: 'Advanced Smart Contract Auditing',
      issuer: 'AuditChain Labs',
      date: '2024-04-22',
      description: 'Developed expertise in identifying vulnerabilities and performing security audits on smart contracts.',
      verified: true
    }
  ];

  const badges: Badge[] = [
    {
      id: '1',
      title: 'DeFi Pioneer',
      issuer: 'EduBlock',
      date: '2023-10-01',
      description: 'Awarded for early adoption and active participation in decentralized finance learning.',
      icon: 'Ð'
    },
    {
      id: '2',
      title: 'Security Sentinel',
      issuer: 'EduBlock',
      date: '2023-12-05',
      description: 'Earned for demonstrating exceptional understanding of blockchain security.',
      icon: '🛡️'
    },
    {
      id: '3',
      title: 'Web3 Innovator',
      issuer: 'EduBlock',
      date: '2024-02-15',
      description: 'Recognizes innovative contributions to Web3 projects and community engagement.',
      icon: '⚡'
    }
  ];

  const skills: Skill[] = [
    {
      id: '1',
      name: 'Solidity Programming',
      level: 'Advanced',
      description: 'Proficient in writing, testing, and deploying secure smart contracts on the Ethereum blockchain.',
      endorsedBy: 12
    },
    {
      id: '2',
      name: 'Decentralized Portfoliolication (DPortfolio) Development',
      level: 'Intermediate',
      description: 'Experience building user interfaces that interact with blockchain backends using Web3.js and ethers.js.',
      endorsedBy: 8
    },
    {
      id: '3',
      name: 'Tokenomics Design',
      level: 'Intermediate',
      description: 'Ability to design and implement economic models for blockchain-based tokens and NFTs.',
      endorsedBy: 7
    },
    {
      id: '4',
      name: 'Blockchain Security Auditing',
      level: 'Beginner',
      description: 'Basic understanding of common smart contract vulnerabilities and auditing tools.',
      endorsedBy: 5
    }
  ];

  const courses: Course[] = [
    {
      id: '1',
      title: 'Introduction to Blockchain (Coursera)',
      provider: 'Coursera (Princeton University)',
      date: '2023-07-01',
      description: 'Comprehensive online course covering the foundational concepts and Portfoliolications of blockchain technology.',
      duration: '8 Weeks'
    },
    {
      id: '2',
      title: 'DeFi Bootcamp (Udemy)',
      provider: 'Udemy (Expert Instructor)',
      date: '2023-09-10',
      description: 'Intensive 1-week bootcamp on practical DeFi strategies, including liquidity mining and yield optimization.',
      duration: '1 Week'
    },
    {
      id: '3',
      title: 'NFTs and the Metaverse Workshop',
      provider: 'Global Blockchain Summit',
      date: '2023-11-15',
      description: 'Half-day workshop exploring the creation, trading, and future of Non-Fungible Tokens (NFTs).',
      duration: '4 Hours'
    },
    {
      id: '4',
      title: 'Ethical Hacking for Web3 (Online)',
      provider: 'CyberChain Security',
      date: '2024-02-28',
      description: 'An online seminar focusing on ethical hacking techniques relevant to securing Web3 Portfoliolications.',
      duration: '2 Hours'
    }
  ];

  const handleSharePortfolio = () => {
    console.log('Share portfolio clicked');
  };

  const handleViewDetails = (id: string) => {
    console.log('View details:', id);
  };

  const handleViewBadge = (id: string) => {
    console.log('View badge:', id);
  };

  const handleEndorse = (id: string) => {
    console.log('Endorse skill:', id);
  };

  const handleViewCertificate = (id: string) => {
    console.log('View certificate:', id);
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

  useEffect(() => {
    if (loading) return;
    
    if (!isAuthenticated) {
      return router.replace(`${process.env.NEXT_PUBLIC_BASE_URL}/auth`)
    }
  }, [isAuthenticated, loading, router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex">
        <Sidebar items={sidebarItems} settingsItems={settingsItems} />
        
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <ProfileHeader profile={profileData} onSharePortfolio={handleSharePortfolio} />
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Micro-Credentials</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {microCredentials.map((credential) => (
                  <MicroCredentialCard
                    key={credential.id}
                    credential={credential}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Badges</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {badges.map((badge) => (
                  <BadgeCard
                    key={badge.id}
                    badge={badge}
                    onViewBadge={handleViewBadge}
                  />
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Skills</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {skills.map((skill) => (
                  <SkillCard
                    key={skill.id}
                    skill={skill}
                    onEndorse={handleEndorse}
                  />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">MOOCs & Workshops</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {courses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onViewCertificate={handleViewCertificate}
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

export default Portfolio;