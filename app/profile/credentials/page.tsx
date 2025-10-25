"use client";

import React, { useContext, useEffect, useState } from 'react';
import { 
  User, 
  Award, 
  ShoppingBag, 
  Settings, 
  Wallet, 
  UserPlus,
  Eye,
  Share2,
  Download,
  CheckCircle,
  Clock,
} from 'lucide-react';
import Header from '@/components/SignedInHeader';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { 
	Credential, CredentialCardProps, ValidatorProps 
} from '@/utils/types/credentials';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';


interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
}

const CredentialCard: React.FC<CredentialCardProps> = ({
	credential,
	onView,
	onShare,
	onDownload
}) => {
	return (
		<div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
			<div 
				className={`h-40 ${credential.imageGradient || 'bg-gradient-to-r from-yellow-600 to-orange-600'} flex items-center justify-center p-6`}
			>
				{credential.imageUrl ? (
					<Image src={credential.imageUrl} alt={credential.title} className="w-full h-full object-cover" />
				) : (
					<div className="text-white text-center">
						<Award className="w-16 h-16 mx-auto mb-2" />
						<p className="text-sm font-medium opacity-90">{credential.title}</p>
					</div>
				)}
			</div>
		
			<div className="p-5">
				<h3 className="text-lg font-bold text-gray-900 mb-2">{credential.title}</h3>
				<p className="text-sm text-gray-600 mb-1">Issuer: {credential.issuer}</p>
				<p className="text-sm text-gray-600 mb-1">Date: {credential.date}</p>
				
				<div className="flex items-center mb-3">
					<span className="text-sm text-gray-600 mr-2">Status:</span>
					<span className={`flex items-center space-x-1 text-sm font-medium ${
						credential.status === 'Verified' ? 'text-green-600' : 'text-yellow-600'
					}`}>
						{credential.status === 'Verified' ? (
							<CheckCircle className="w-4 h-4" />
						) : (
							<Clock className="w-4 h-4" />
						)}
						<span>{credential.status}</span>
					</span>
				</div>
				
				<p className="text-xs text-gray-500 mb-4 font-mono break-all">
					ID: {credential.credentialId}
				</p>
				
				<div className="flex space-x-2">
					<button
						onClick={() => onView?.(credential.id)}
						className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition text-sm font-medium"
					>
						<Eye className="w-4 h-4" />
						<span>View</span>
					</button>
					<button
						onClick={() => onShare?.(credential.id)}
						className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition text-sm font-medium"
					>
						<Share2 className="w-4 h-4" />
						<span>Share</span>
					</button>
					<button
						onClick={() => onDownload?.(credential.id)}
						className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition text-sm font-medium"
					>
						<Download className="w-4 h-4" />
						<span>Download</span>
					</button>
				</div>
			</div>
		</div>
	);
};


const CredentialValidator: React.FC<ValidatorProps> = ({ onValidate, validationResult }) => {
  	const [hash, setHash] = useState('');

  	const handleValidate = () => {
    	onValidate?.(hash);
  	};

  	return (
    	<div className="bg-white border border-gray-200 rounded-lg p-6">
      		<h2 className="text-2xl font-bold text-gray-900 mb-2">Credential Validator</h2>
      
      		<div className="mb-6">
				<h3 className="text-lg font-semibold text-gray-900 mb-2">Verify Authenticity on Blockchain</h3>
				<p className="text-sm text-gray-600">
					Enter a credential ID or blockchain transaction hash to instantly verify its authenticity and status.
				</p>
			</div>

			<div className="flex space-x-2 mb-6">
				<input
					type="text"
					placeholder="Enter Credential ID or Transaction Hash"
					value={hash}
					onChange={(e) => setHash(e.target.value)}
					className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
				<button
					onClick={handleValidate}
					className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center space-x-2"
				>
					<CheckCircle className="w-5 h-5" />
					<span>Validate</span>
				</button>
			</div>

			<div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
				<h4 className="font-semibold text-gray-900 mb-2">Validation Result</h4>
				{validationResult ? (
					<div className={`p-4 rounded-lg ${
						validationResult.isValid ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
					}`}>
						<p className="font-medium">{validationResult.message}</p>
					</div>
				) : (
					<p className="text-gray-500">Enter a Credential ID to validate.</p>
				)}
			</div>
		</div>
	);
};

const CredentialsPage: React.FC = () => {
	const { isAuthenticated, loading, user } = useContext(AuthContext);
    const [validationResult, setValidationResult] = useState<{ isValid: boolean; message: string } | null>(null);
	const router = useRouter();

    const sidebarItems: SidebarItem[] = [
        { icon: <UserPlus className="w-5 h-5" />, label: 'Onboarding', href: '/profile/dashboard' },
        { icon: <Award className="w-5 h-5" />, label: 'Credentials', href: '/profile/credentials', isActive: true },
        { icon: <User className="w-5 h-5" />, label: 'Portfolio', href: '/profile/portfolio' },
        { icon: <ShoppingBag className="w-5 h-5" />, label: 'Marketplace', href: '/profile/marketplace' }
    ];

    const settingsItems: SidebarItem[] = [
        { icon: <Settings className="w-5 h-5" />, label: 'Account Settings', href: '#settings' },
        { icon: <Wallet className="w-5 h-5" />, label: 'Wallet Management', href: '#wallet' }
    ];

    const credentials: Credential[] = [
        {
        id: '1',
        title: 'Blockchain Development Certification',
        issuer: 'BlockAcademy Inc.',
        date: '2023-10-26',
        status: 'Verified',
        credentialId: '0x9e2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9t0t',
        imageGradient: 'bg-gradient-to-r from-yellow-600 to-orange-600'
        },
        {
        id: '2',
        title: 'Master of Science in Computer Science',
        issuer: 'University of Tech',
        date: '2022-06-15',
        status: 'Verified',
        credentialId: '0xabcdef1234567890abcdef1234567890abcdef2',
        imageUrl: ''
        },
        {
        id: '3',
        title: 'Data Science Fundamentals',
        issuer: 'Global Data Institute',
        date: '2023-01-20',
        status: 'Verified',
        credentialId: '0x0ab70e4a210eceaa80904332f0fca832f0ecd8765432',
        imageGradient: 'bg-gradient-to-r from-yellow-400 to-yellow-600'
        },
        {
        id: '4',
        title: 'Project Management Professional (PMP)',
        issuer: 'PMI Global',
        date: '2024-03-01',
        status: 'Pending',
        credentialId: '0x012345f67890abcdef1234567890abcef1234678',
        imageGradient: 'bg-gradient-to-r from-yellow-500 to-orange-400'
        },
        {
        id: '5',
        title: 'Introduction to Cybersecurity',
        issuer: 'CyberSec Academy',
        date: '2023-11-05',
        status: 'Verified',
        credentialId: '0x0efeda087085422fbebd6e9f8524ff7bfe4c2ffbecba009',
        imageUrl: ''
        },
        {
        id: '6',
        title: 'Financial Technology Innovation',
        issuer: 'FinTech Hub',
        date: '2024-01-10',
        status: 'Verified',
        credentialId: '0x0eba8796542f0feca8f76543210ebcda8765',
        imageUrl: ''
        }
    ];

    const handleView = (id: string) => {
        console.log('View credential:', id);
    };

    const handleShare = (id: string) => {
        console.log('Share credential:', id);
    };

    const handleDownload = (id: string) => {
        console.log('Download credential:', id);
    };

    // const handleIssueCredential = (data: IssueCredentialFormData) => {
    //     console.log('Issue credential:', data);
    // };

    const handleValidate = (hash: string) => {
        console.log('Validate credential:', hash);
        setValidationResult({
        	isValid: true,
        	message: 'Credential verified successfully on the blockchain!'
        });
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
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-3">My Credentials</h1>
                        <p className="text-gray-600">
                            View, share, and download your verifiable blockchain certificates, diplomas, and transcripts. 
                            Each credential is tamper-proof and secured on the EduBlock network.
                        </p>
                    </div>

                    {/* Credentials Grid */}
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        {credentials.map((credential) => (
                            <CredentialCard
                              key={credential.id}
                              credential={credential}
                              onView={handleView}
                              onShare={handleShare}
                              onDownload={handleDownload}
                            />
                        ))}
                    </div>

                    {/* <div className="mb-12">
                        <IssueCredentialForm onSubmit={handleIssueCredential} />
                    </div> */}

                    <CredentialValidator 
                        onValidate={handleValidate}
                        validationResult={validationResult}
                    />
                </div>
            </main>
        </div>
        
            <Footer links={footerLinks} socialLinks={{ facebook: '#', twitter: '#', linkedin: '#' }} />
        </div>
    );
};

export default CredentialsPage;