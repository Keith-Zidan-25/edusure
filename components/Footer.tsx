interface NavLink {
  href: string;
  label: string;
}

interface FooterProps {
  links?: {
    company?: NavLink[];
    legal?: NavLink[];
    support?: NavLink[];
  };
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
  brandText?: string;
}

export default function Footer({
  links = {
    company: [{ href: '#company', label: 'Company' }],
    legal: [{ href: '#legal', label: 'Legal' }],
    support: [{ href: '#support', label: 'Support' }]
  },
  socialLinks = {},
}: FooterProps) {
  const allLinks = [...(links.company || []), ...(links.legal || []), ...(links.support || [])];
  
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-8 mb-4 md:mb-0">
            {allLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-gray-900 transition"
              >
                {link.label}
              </a>
            ))}
          </div>
          
          <div className="flex space-x-4">
            {socialLinks.facebook && (
              <a href={socialLinks.facebook} className="text-gray-400 hover:text-gray-600 transition">
                <div className="w-6 h-6 flex items-center justify-center">f</div>
              </a>
            )}
            {socialLinks.twitter && (
              <a href={socialLinks.twitter} className="text-gray-400 hover:text-gray-600 transition">
                <div className="w-6 h-6 flex items-center justify-center">𝕏</div>
              </a>
            )}
            {socialLinks.linkedin && (
              <a href={socialLinks.linkedin} className="text-gray-400 hover:text-gray-600 transition">
                <div className="w-6 h-6 flex items-center justify-center">in</div>
              </a>
            )}
          </div>
        </div>
        
        {/* <div className="mt-8 text-center text-gray-500 text-sm">
          Made with <span className="text-purple-600 font-semibold">{brandText}</span>
        </div> */}
      </div>
    </footer>
  );
};