interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
}

interface SidebarProps {
  items: SidebarItem[];
  settingsItems: SidebarItem[];
}

export default function Sidebar({ items, settingsItems }: SidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-6">
      <nav className="space-y-2">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
              item.isActive
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="mt-8">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-4">
          Settings
        </p>
        <nav className="space-y-2">
          {settingsItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
};