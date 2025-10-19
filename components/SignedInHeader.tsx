import { useState } from "react";
import { GraduationCap, Search, User } from "lucide-react";
import Image from "next/image";

interface NavLink {
  href: string;
  label: string;
}

interface HeaderProps {
  user?: {
    name: string;
    avatar?: string;
  };
  navLinks?: NavLink[];
  onSearch?: (query: string) => void;
}

export default function Header({ 
  user = { name: 'Student', avatar: '' },
  navLinks = [
    { href: '/profile/dashboard', label: 'Home' },
    { href: '/profile/credentials', label: 'Credentials' },
    { href: '/profile/portfolio', label: 'Portfolio' },
    { href: '/profile/marketplace', label: 'Marketplace' }
  ],
  onSearch
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSearch?.(searchQuery);
//   };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">EduSure</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 transition font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for credentials or courses"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"
            />
          </div>
          
          <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
            {user.avatar ? (
              <Image src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <User className="w-6 h-6 text-gray-600" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};