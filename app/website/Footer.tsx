'use client'
import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube, FaHeart } from "react-icons/fa";
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
     
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-900/10 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
      
      <div className="relative z-10 px-6 pt-20 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
           
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  AI Mentor
                </h2>
              </div>
              <p className="text-gray-400">
                Empowering your career journey with AI-driven guidance and personalized roadmaps.
              </p>
              <div className="flex space-x-4 text-gray-400">
                <a href="#" className="hover:text-blue-400 transition-colors">
                  <FaFacebookF className="text-xl" />
                </a>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  <FaTwitter className="text-xl" />
                </a>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  <FaLinkedinIn className="text-xl" />
                </a>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  <FaYoutube className="text-xl" />
                </a>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Quick Links
              </h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white transition-colors">Careers</Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-white transition-colors">Support</Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Resources
              </h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                </li>
                <li>
                  <Link href="/guides" className="hover:text-white transition-colors">User Guides</Link>
                </li>
                <li>
                  <Link href="/webinars" className="hover:text-white transition-colors">Webinars</Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-white transition-colors">Community</Link>
                </li>
                <li>
                  <Link href="/api" className="hover:text-white transition-colors">API Documentation</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
              <div className="flex flex-wrap justify-center gap-6">
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
              </div>
              <div>© 2024 AI Mentor. All rights reserved.</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

