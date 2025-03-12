'use client';

import React from 'react';
import { IconSearch, IconUser } from '@tabler/icons-react';

interface NavbarProps {
  isCollapsed: boolean;
}

export default function Navbar({ isCollapsed }: NavbarProps) {
  return (
    <header className={`h-16 fixed top-0 right-0 bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-white/10 transition-all duration-300 z-50 ${
      isCollapsed ? 'left-16' : 'left-64'
    }`}>
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center flex-1 max-w-xl">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search roadmaps, skills, courses..."
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-gray-300 placeholder-gray-500"
            />
            <IconSearch className="absolute left-3 top-2.5 text-gray-500" size={20} />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white">
              <IconUser size={20} />
            </button>
            <div className="absolute right-0 top-full mt-2 w-48 py-2 bg-[#0A0A0F]/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <a href="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5">
                Profile
              </a>
              <a href="/dashboard/settings" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5">
                Settings
              </a>
              <div className="border-t border-white/10 my-1"></div>
              <button className="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-white/5">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
