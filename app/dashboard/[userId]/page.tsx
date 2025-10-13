"use client";

import React, { useState } from "react";
import { Award, BookOpen, Shield, FileCheck, Lock, GraduationCap, User, Settings, LogOut, Bell, Search, Plus, ExternalLink, Download, Share2, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Badge = ({ children, variant = "default", className = "" }: {
    children: React.ReactNode;
    variant?: "default" | "success" | "warning" | "purple";
    className?: string;
}) => {
  const variants = {
    default: "bg-blue-100 text-blue-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    purple: "bg-purple-100 text-purple-800",
  };
  
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

const StatCard = ({ icon: Icon, title, value, change, color = "blue" }: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    value: string;
    change?: string;
    color?: string;
}) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {change && (
            <p className="text-xs text-green-600 mt-1">↑ {change}</p>
          )}
        </div>
        <div className={`p-3 rounded-full bg-${color}-100`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const credentials = [
    { id: 1, title: "Advanced Web Development", issuer: "MIT OpenCourseWare", date: "2024-09", verified: true, type: "Certificate", hash: "0x7a3f...92bd", url: "https://res.cloudinary.com/dx7f4f6b1/image/upload/v1697046348/edusure/cert1_ozh0rj.png" },
    { id: 2, title: "Blockchain Fundamentals", issuer: "Stanford Online", date: "2024-08", verified: true, type: "Micro-degree", hash: "0x9c2e...45af", url: "https://res.cloudinary.com/dx7f4f6b1/image/upload/v1697046348/edusure/cert2_ubv4m3.png" },
    { id: 3, title: "Data Science Specialization", issuer: "Johns Hopkins University", date: "2024-07", verified: true, type: "Certificate", hash: "0x4d8b...18ce", url: "https://res.cloudinary.com/dx7f4f6b1/image/upload/v1697046348/edusure/cert3_hyqz4m.png" },
    { id: 4, title: "UX Design Badge", issuer: "Google Career Certificates", date: "2024-06", verified: true, type: "Skill Badge", hash: "0x1f5a...73bd", url: "https://res.cloudinary.com/dx7f4f6b1/image/upload/v1697046348/edusure/cert4_wxqz7u.png" },
  ];

  const achievements = [
    { title: "Full Stack Developer", progress: 75, total: 8, completed: 6, color: "blue" },
    { title: "AI/ML Specialist", progress: 50, total: 6, completed: 3, color: "purple" },
    { title: "Cybersecurity Expert", progress: 30, total: 10, completed: 3, color: "green" },
  ];

  const recentActivity = [
    { action: "Credential Issued", item: "Advanced Web Development", time: "2 hours ago", icon: Award },
    { action: "Paper Registered", item: "Blockchain in Education Research", time: "1 day ago", icon: FileCheck },
    { action: "Portfolio Shared", item: "Shared with TechCorp Inc.", time: "3 days ago", icon: Share2 },
    { action: "Achievement Unlocked", item: "5 Verified Credentials", time: "1 week ago", icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 ${sidebarOpen ? "w-64" : "w-20"} z-50`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            {sidebarOpen && <span className="font-bold text-lg">EduSure</span>}
          </div>
        </div>
        
        <nav className="p-4 space-y-2">
          {[
            { id: "overview", label: "Overview", icon: BookOpen },
            { id: "credentials", label: "Credentials", icon: Award },
            { id: "portfolio", label: "Portfolio", icon: FileCheck },
            { id: "identity", label: "Identity", icon: User },
            { id: "security", label: "Security", icon: Shield },
            { id: "research", label: "Research", icon: Lock },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50">
            <Settings className="w-5 h-5" />
            {sidebarOpen && <span className="text-sm font-medium">Settings</span>}
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 mt-2">
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"}`}>
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg">
                <div className="w-5 h-0.5 bg-gray-600 mb-1"></div>
                <div className="w-5 h-0.5 bg-gray-600 mb-1"></div>
                <div className="w-5 h-0.5 bg-gray-600"></div>
              </button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search credentials, courses..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-96 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-sm font-medium">Alex Johnson</p>
                  <p className="text-xs text-gray-500">Student ID: #EDU2024</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  AJ
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard icon={Award} title="Total Credentials" value={`${credentials.length}`} change="+3 this month" color="blue" />
            <StatCard icon={BookOpen} title="Active Courses" value="5" color="purple" />
            <StatCard icon={Shield} title="Security Score" value="98%" change="+2%" color="orange" />
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Credentials */}
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Credentials</CardTitle>
                  <CardDescription>Your blockchain-verified achievements</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="w-4 h-4" />
                  Add New
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {credentials.map((cred) => (
                    <div key={cred.id} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Award className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <Image src={cred.url} alt={cred.title} />
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{cred.title}</h4>
                            {cred.verified && <CheckCircle className="w-4 h-4 text-green-600" />}
                          </div>
                          <p className="text-sm text-gray-500">{cred.issuer}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="default">{cred.type}</Badge>
                            <span className="text-xs text-gray-400">Issued: {cred.date}</span>
                          </div>
                          <p className="text-xs text-gray-400 mt-1 font-mono">{cred.hash}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Activity Feed */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <activity.icon className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.item}</p>
                        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievement Pathways */}
          <Card>
            <CardHeader>
              <CardTitle>Achievement Pathways</CardTitle>
              <CardDescription>Track your progress towards professional certifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {achievements.map((achievement, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 bg-${achievement.color}-100 rounded-lg flex items-center justify-center`}>
                          <GraduationCap className={`w-5 h-5 text-${achievement.color}-600`} />
                        </div>
                        <div>
                          <h4 className="font-semibold">{achievement.title}</h4>
                          <p className="text-sm text-gray-500">{achievement.completed} of {achievement.total} credentials completed</p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{achievement.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`bg-gradient-to-r from-${achievement.color}-500 to-${achievement.color}-600 h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${achievement.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Features Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <Shield className="w-8 h-8 text-blue-600 mb-3" />
                <h4 className="font-semibold mb-2">Data Ownership</h4>
                <p className="text-sm text-gray-600">Full control over your academic records and personal data on the blockchain</p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-purple-500">
              <CardContent className="p-6">
                <FileCheck className="w-8 h-8 text-purple-600 mb-3" />
                <h4 className="font-semibold mb-2">Instant Verification</h4>
                <p className="text-sm text-gray-600">Employers can verify your credentials instantly without intermediaries</p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <Lock className="w-8 h-8 text-green-600 mb-3" />
                <h4 className="font-semibold mb-2">Copyright Protection</h4>
                <p className="text-sm text-gray-600">Register research papers and protect your intellectual property rights</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}