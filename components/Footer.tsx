import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-charcoal text-white py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-display font-bold text-xl mb-4">GRANDVIEW</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Curating the finest properties for the most discerning clients. 
              Grandview Realty is your partner in finding the extraordinary.
            </p>
          </div>
          <div>
            <h4 className="font-display font-bold text-lg mb-4 text-gray-200">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-brand" />
                <span>100 Luxury Lane, Beverly Hills, CA 90210</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="w-4 h-4 text-brand" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-brand" />
                <span>inquiry@grandviewrealty.com</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-display font-bold text-lg mb-4 text-gray-200">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer">Terms of Service</li>
              <li className="hover:text-white cursor-pointer">Accessibility</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Grandview Realty. All rights reserved.
        </div>
      </div>
    </footer>
  );
};