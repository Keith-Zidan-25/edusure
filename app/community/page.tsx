"use client";

import React, { useContext, useEffect, useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  DollarSign, 
  Filter,
  PlusCircle,
  User,
  Settings,
  LogOut,
  Send,
  CheckCircle,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import Image from 'next/image';
import { AuthContext } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import DonationModal from '../../components/DonationModal';
import { ToastContainer } from 'react-toastify';
import { Project } from '../../utils/types/community';
import { fetchProjects, donateToProject } from '../../services/project.services';

interface Message {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  preview: string;
  unread: boolean;
}

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  badge?: number;
  isActive?: boolean;
}

interface TrendingPost {
  id: string;
  title: string;
  author: string;
}

interface GetStartedTask {
  id: string;
  label: string;
  completed: boolean;
}

interface SidebarProps {
  navItems: NavItem[];
  currentUser: {
    name: string;
    avatar?: string;
  };
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLogout?: () => void;
}

interface ProjectCardProps {
  project: Project;
  onFundNow?: (id: string) => void;
}

interface MessageItemProps {
  message: Message;
  onClick?: (id: string) => void;
}

interface HeaderProps {
  onFilter?: () => void;
  onCreatePost?: () => void;
}

interface MessagesWidgetProps {
  messages: Message[];
  trendingPosts: TrendingPost[];
  getStartedTasks: GetStartedTask[];
  onMessageClick?: (id: string) => void;
  onSendMessage?: (text: string) => void;
  onTaskToggle?: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  navItems, 
  currentUser, 
  onProfileClick, 
  onSettingsClick, 
  onLogout 
}) => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-blue-600">CommunityNet</span>
        </div>
        
        <nav className="space-y-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-4 py-3 rounded-lg transition ${
                item.isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </a>
          ))}
        </nav>
      </div>

      <div className="mt-auto border-t border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
            {currentUser.avatar ? (
              <Image src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-600">
                <User className="w-6 h-6" />
              </div>
            )}
          </div>
          <span className="font-medium text-gray-900">{currentUser.name}</span>
        </div>
        
        <div className="space-y-2">
          <button
            onClick={onProfileClick}
            className="w-full flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition text-sm"
          >
            <User className="w-4 h-4" />
            <span>Profile</span>
          </button>
          <button
            onClick={onSettingsClick}
            className="w-full flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition text-sm"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition text-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

const Header: React.FC<HeaderProps> = ({ onFilter, onCreatePost }) => {
  return (
    <div className="bg-white border-b border-gray-200 p-6 flex items-center justify-between sticky top-0 z-10">
      <h1 className="text-2xl font-bold text-gray-900">Community Hub Overview</h1>
      <div className="flex items-center space-x-3">
        <button
          onClick={onFilter}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        >
          <Filter className="w-4 h-4" />
          <span className="text-sm font-medium">Filter</span>
        </button>
        <button
          onClick={onCreatePost}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <PlusCircle className="w-4 h-4" />
          <span className="text-sm font-medium">Create New Post</span>
        </button>
      </div>
    </div>
  );
};

const PostInput: React.FC<{ onPost?: () => void }> = ({ onPost }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 flex items-center space-x-3">
      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
        <User className="w-5 h-5 text-gray-600" />
      </div>
      <input
        type="text"
        placeholder="Start a post..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="text-gray-400 hover:text-gray-600">
        <HelpCircle className="w-5 h-5" />
      </button>
    </div>
  );
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onFundNow }) => {
  const percentage = (project.raised / project.goal) * 100;

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
      <div className={`h-48 ${project.imageGradient || 'bg-gray-200'} overflow-hidden`}>
        {project.imageUrl ? (
          <Image src={project.imageUrl} alt={project.projectTitle} width={300} height={300} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{project.projectTitle}</h3>
        <p className="text-sm text-gray-600 mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-semibold text-gray-900">Raised: ${project.raised.toLocaleString()}</span>
            <span className="text-gray-600">Goal: ${project.goal.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${Math.min(percentage, 100)}%` }}
            ></div>
          </div>
        </div>

        {project.goal === project.raised ? (
          <div className="flex items-center justify-center space-x-2 py-2 text-green-600">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Fully Funded!</span>
          </div>
        ) : (
          <button
            onClick={() => onFundNow?.(project._id)}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center space-x-2"
          >
            <DollarSign className="w-4 h-4" />
            <span>Fund Now</span>
          </button>
        )}
      </div>
    </div>
  );
};

const MessageItem: React.FC<MessageItemProps> = ({ message, onClick }) => {
  return (
    <button
      onClick={() => onClick?.(message.id)}
      className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition text-left"
    >
      <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden flex-shrink-0 relative">
        {message.user.avatar ? (
          <Image src={message.user.avatar} alt={message.user.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600">
            <User className="w-5 h-5" />
          </div>
        )}
        {message.unread && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full border-2 border-white"></div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 truncate">{message.user.name}</p>
        <p className="text-sm text-gray-600 truncate">{message.preview}</p>
      </div>
      {message.unread && (
        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
      )}
    </button>
  );
};

const MessagesWidget: React.FC<MessagesWidgetProps> = ({ 
  messages, 
  trendingPosts,
  getStartedTasks,
  onMessageClick, 
  onSendMessage,
  onTaskToggle
}) => {
  const [messageText, setMessageText] = useState('');

  const handleSend = () => {
    if (messageText.trim()) {
      onSendMessage?.(messageText);
      setMessageText('');
    }
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-screen overflow-y-auto">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Messages</h2>
          <button className="text-blue-600 hover:text-blue-700">
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-2">
          {messages.map((message) => (
            <MessageItem
              key={message.id}
              message={message}
              onClick={onMessageClick}
            />
          ))}
        </div>
      </div>

      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Get Started</h2>
        <div className="space-y-3">
          {getStartedTasks.map((task) => (
            <button
              key={task.id}
              onClick={() => onTaskToggle?.(task.id)}
              className="w-full flex items-center space-x-3 text-left hover:bg-gray-50 p-2 rounded-lg transition"
            >
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                task.completed ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
              }`}>
                {task.completed && <CheckCircle className="w-4 h-4 text-white" />}
              </div>
              <span className="text-sm text-gray-700">{task.label}</span>
            </button>
          ))}
          <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1 mt-2">
            <span>View all tasks</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Trending Posts</h2>
        <div className="space-y-3">
          {trendingPosts.map((post) => (
            <div key={post.id} className="flex items-start space-x-2">
              <div className="w-1 h-1 bg-gray-900 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-900">{post.title}</p>
                <p className="text-xs text-gray-500">{post.author}</p>
              </div>
            </div>
          ))}
          <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1 mt-2">
            <span>View all trending</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mt-auto p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const CommunityPage : React.FC = () => {
  const {isAuthenticated, user, loading, logout} = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState<{name: string; avatar: string}>({
    name: "",
    avatar: ""
  });
  const [projects, setProjects] = useState<{openSourceProjects: Project[]; researchStudies: Project[]} | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project>();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const router = useRouter();

  const navItems: NavItem[] = [
    { icon: <Users className="w-5 h-5" />, label: 'Community Posts', href: '#posts', isActive: true },
    { icon: <MessageSquare className="w-5 h-5" />, label: 'Direct Messages', href: '#messages', badge: 3 },
    { icon: <DollarSign className="w-5 h-5" />, label: 'Academic Funding', href: '#funding' }
  ];
  
  const messages: Message[] = [
    {
      id: '1',
      user: { name: 'Alice Johnson', avatar: '' },
      preview: 'Sounds great! I\'ll check...',
      unread: true
    },
    {
      id: '2',
      user: { name: 'Charlie Davis', avatar: '' },
      preview: 'Let\'s schedule a call',
      unread: false
    },
    {
      id: '3',
      user: { name: 'Diana Miller', avatar: '' },
      preview: 'Thanks for the update',
      unread: true
    },
    {
      id: '4',
      user: { name: 'Bob Williams', avatar: '' },
      preview: 'I\'m happy to help with the de...',
      unread: false
    }
  ];

  const getStartedTasks: GetStartedTask[] = [
    { id: '1', label: 'Complete your profile', completed: false },
    { id: '2', label: 'Explore academic funding', completed: false },
    { id: '3', label: 'Create your first post', completed: false },
    { id: '4', label: 'Connect with a research group', completed: false }
  ];

  const trendingPosts: TrendingPost[] = [
    { id: '1', title: 'Just launched our new c...', author: 'Alice Johnson' },
    { id: '2', title: 'Looking for contributors...', author: 'Bob Williams' },
    { id: '3', title: 'Excited to share the prel...', author: 'Charlie Davis' }
  ];

  const handleFundNow = (id: string) => {
    let project = projects?.openSourceProjects.find((project) => project._id === id);
    
    if (!project) {
      project = projects?.researchStudies.find((project) => project._id === id);
    }
    
    if (typeof project != undefined) {
      setSelectedProject(project);
      setModalOpen(true);
    } else {
      alert("Project cannot be accessed");
    }
  };

  const handleFilter = () => {
    console.log('Filter clicked');
  };

  const handleCreatePost = () => {
    console.log('Create post clicked');
  };

  const handleMessageClick = (id: string) => {
    console.log('Message clicked:', id);
  };

  const handleSendMessage = (text: string) => {
    console.log('Send message:', text);
  };

  const handleTaskToggle = (id: string) => {
    console.log('Toggle task:', id);
  };

  const handleProfileClick = () => {
    console.log('Profile clicked');
  };

  const handleSettingsClick = () => {
    console.log('Settings clicked');
  };

  const handleLogout = () => {
    logout()
  };

  const handleDonate = async (amount: number, id: string) => {
    await donateToProject(amount, id, user?.hederaAccountId);
  } 

  useEffect(() => {
    const getProjects = async () => {
      const data = await fetchProjects();
      setProjects(data);
      console.log(data);
    }

    getProjects();
  },[])

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      router.replace("/auth");
    }
    if (user) {
      setCurrentUser({
        name: user?.name,
        avatar: ""
      });
    }
  }, [isAuthenticated, user, loading, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        navItems={navItems}
        currentUser={currentUser}
        onProfileClick={handleProfileClick}
        onSettingsClick={handleSettingsClick}
        onLogout={handleLogout}
      />
      
      <main className="flex-1 overflow-y-auto">
        <Header onFilter={handleFilter} onCreatePost={handleCreatePost} />
        
        <div className="p-6 max-w-4xl mx-auto">
          <PostInput />
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Academic Funding Hub</h2>
            
            {projects && (
              <>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Popular Open Source Projects</h3>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {projects.openSourceProjects.map((project) => (
                    <ProjectCard
                      key={project._id}
                      project={project}
                      onFundNow={handleFundNow}
                    />
                  ))}
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">Latest Research Studies</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {projects.researchStudies.map((project) => (
                    <ProjectCard
                      key={project._id}
                      project={project}
                      onFundNow={handleFundNow}
                    />
                  ))}
                </div>
              </>
            )}
          </section>
        </div>
      </main>

      <MessagesWidget
        messages={messages}
        trendingPosts={trendingPosts}
        getStartedTasks={getStartedTasks}
        onMessageClick={handleMessageClick}
        onSendMessage={handleSendMessage}
        onTaskToggle={handleTaskToggle}
      />
      <DonationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onDonate={handleDonate}
        project={selectedProject} 
      />
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default CommunityPage;