import React from 'react';
import { Heart, Mail, Twitter, Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-dark-800 border-t border-dark-600">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-accent-purple-light">ADHD Hub</h3>
            <p className="text-sm text-gray-400">
              Empowering individuals with ADHD through knowledge, understanding, and practical strategies.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-accent-purple-light">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-accent-purple">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent-purple">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent-purple">Tests</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent-purple">Resources</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-accent-purple-light">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-accent-purple">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent-purple">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent-purple">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent-purple">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-accent-purple-light">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-accent-purple">
                <Mail size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-accent-purple">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-accent-purple">
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-dark-600 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} ADHD Hub. All rights reserved.
          </p>
          <div className="flex items-center text-sm text-gray-400">
            <span>Made with</span>
            <Heart size={16} className="mx-1 text-accent-purple" />
            <span>for the ADHD community</span>
          </div>
        </div>
      </div>
    </footer>
  );
}