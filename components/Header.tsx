import { GraduationCap } from "lucide-react";

interface NavLink {
  href: string;
  label: string;
}

interface HeaderProps {
  logo?: string;
  navLinks?: NavLink[];
  languages?: string[];
  onSignIn?: () => void;
  onGetStarted?: () => void;
}

export default function Header({
  navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#features', label: 'Features' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#about', label: 'About Us' }
  ],
  languages = ['English', 'Spanish', 'French'],
  onSignIn,
  onGetStarted
}: HeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">EduSure</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 transition"
              >
                {link.label}
              </a>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <select className="text-gray-700 border-none bg-transparent cursor-pointer">
              {languages.map((lang) => (
                <option key={lang}>{lang}</option>
              ))}
            </select>
            <button
              onClick={onSignIn}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Sign In
            </button>
            <button
              onClick={onGetStarted}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};