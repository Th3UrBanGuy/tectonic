import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Linkedin, Facebook, Instagram, Twitter, Github, Globe } from 'lucide-react';
import TectonicLogo from './TectonicLogo';
import { useContent } from '../ContentContext';

const Footer = () => {
  const { contactConfig, wings } = useContent();

  const socialIcons: { [key: string]: React.ElementType } = {
    linkedin: Linkedin,
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    github: Github
  };

  const address = contactConfig.address || { street: '', sector: '' };
  const contact = contactConfig.contact || { email: '', phone: '' };
  const socials = contactConfig.socials || {};

  return (
    <footer className="bg-slate-50 dark:bg-black border-t border-slate-200 dark:border-gray-800 py-12 px-6 relative overflow-hidden transition-colors duration-500">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-orange-500 opacity-50" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="block mb-6">
            <TectonicLogo />
          </Link>
          <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">
            Architecting the substrate of the future through integrated software, security, and robotic solutions.
          </p>
        </div>
        <div>
          <h3 className="font-bold mb-4 text-slate-900 dark:text-white">Ecosystem</h3>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-gray-400">
            {wings.map((wing) => (
              <li key={wing.id}>
                <Link
                  to={`/wings?id=${wing.id}`}
                  className={`hover:${wing.color.replace('text-', 'text-').replace('-500', '-600')} dark:hover:${wing.color} transition-colors`}
                >
                  {wing.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4 text-slate-900 dark:text-white">Company</h3>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-gray-400">
            <li><Link to="/company" className="hover:text-slate-900 dark:hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/portfolio" className="hover:text-slate-900 dark:hover:text-white transition-colors">Case Studies</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4 text-slate-900 dark:text-white">Connect</h3>
          <p className="text-sm text-slate-600 dark:text-gray-400 mb-4">
            HQ: {address.street}, {address.sector}
          </p>
          <div className="flex flex-col space-y-2 mb-6">
            <a href={`mailto:${contact.email}`} className="text-sm text-slate-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-500 transition-colors flex items-center gap-2">
              <span className="font-semibold text-slate-900 dark:text-white">Email:</span> {contact.email}
            </a>
            <a href={`tel:${contact.phone}`} className="text-sm text-slate-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-500 transition-colors flex items-center gap-2">
              <span className="font-semibold text-slate-900 dark:text-white">Phone:</span> {contact.phone}
            </a>
          </div>

          <div className="flex gap-3">
            {Object.entries(socials).map(([platform, link]) => {
              const Icon = socialIcons[platform] || Globe;
              return (
                <a
                  key={platform}
                  href={link as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-200 dark:bg-gray-800 text-slate-600 dark:text-gray-400 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-600 transition-all"
                  aria-label={platform}
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-200 dark:border-gray-800 text-center text-xs text-slate-500 dark:text-gray-600">
        &copy; {new Date().getFullYear()} Techtonic Industries. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;