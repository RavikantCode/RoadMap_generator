'use client';

import React, { useState } from 'react';
import { 
  IconHome, 
  IconMap2, 
  IconBulb, 
  IconSettings, 
  IconHelp,
  IconMenu2,
  IconChevronLeft,
  IconUser,
  IconTrendingUp,
  IconBook,
  IconFolder,
  IconRobot
} from '@tabler/icons-react';
import Link from 'next/link';
import Navbar from '../components/Navbar';

interface SidebarItemProps {
  icon: any;
  text: string;
  href: string;
  isCollapsed: boolean;
  isActive?: boolean;
}

const SidebarItem = ({ icon: Icon, text, href, isCollapsed, isActive }: SidebarItemProps) => (
  <Link 
    href={href} 
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
      isActive 
        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400' 
        : 'text-gray-400 hover:bg-white/5 hover:text-white'
    }`}
  >
    <div className="min-w-[20px]">
      <Icon size={20} />
    </div>
    {!isCollapsed && <span>{text}</span>}
  </Link>
);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex min-h-screen bg-[#0A0A0F]">
      {/* Background gradients */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5" />
      <div className="fixed right-0 top-1/4 w-1/2 h-1/2 bg-gradient-to-br from-purple-500/10 to-transparent blur-3xl" />
      
      {/* Sidebar */}
      <aside 
        className={`bg-black/20 backdrop-blur-xl border-r border-white/10 p-4 fixed h-full transition-all duration-300 z-20 ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Roadmap
            </h1>
          )}
          <button 
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
          >
            {isCollapsed ? <IconMenu2 size={20} /> : <IconChevronLeft size={20} />}
          </button>
        </div>

        <nav className="space-y-1">
          {/* Main Navigation */}
          <div className="pb-4">
            {!isCollapsed && (
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                Main
              </div>
            )}
            <SidebarItem icon={IconHome} text="Dashboard" href="/dashboard" isCollapsed={isCollapsed} />
            <SidebarItem icon={IconUser} text="Profile" href="/dashboard/profile" isCollapsed={isCollapsed} />
          </div>

          {/* Roadmaps Section */}
          <div className="py-4 border-t border-white/10">
            {!isCollapsed && (
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                Roadmaps
              </div>
            )}
            <SidebarItem icon={IconFolder} text="My Roadmaps" href="/dashboard/roadmaps" isCollapsed={isCollapsed} />
            <SidebarItem icon={IconRobot} text="AI Recommendations" href="/dashboard/recommendations" isCollapsed={isCollapsed} />
          </div>

          {/* Resources Section */}
          <div className="py-4 border-t border-white/10">
            {!isCollapsed && (
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                Resources
              </div>
            )}
            <SidebarItem icon={IconTrendingUp} text="Trends" href="/dashboard/trends" isCollapsed={isCollapsed} />
            <SidebarItem icon={IconBook} text="Courses" href="/dashboard/courses" isCollapsed={isCollapsed} />
          </div>

          {/* Settings Section */}
          <div className="py-4 border-t border-white/10 mt-auto">
            <SidebarItem icon={IconSettings} text="Settings" href="/dashboard/settings" isCollapsed={isCollapsed} />
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
        {/* Navbar */}
        <Navbar isCollapsed={isCollapsed} />

        {/* Main Content Area */}
        <main className="pt-16 p-6 relative z-10">
          {children}
        </main>
      </div>
    </div>
  );
}
