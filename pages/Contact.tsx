import React, { useState } from 'react';
import { MapPin, Mail, Calendar, CheckCircle, User, Phone, Building, Briefcase, DollarSign, MessageSquare, Linkedin, Facebook, Instagram, Twitter, Github, Globe } from 'lucide-react';
import Stepper, { Step } from '../components/ui/Stepper';
import { useContent } from '../components/ContentContext';
import Loader from '../components/Loader';

const Contact = () => {
  const { contactConfig, isLoading } = useContent();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    department: 'General Inquiry',
    projectType: '',
    budget: '',
    message: ''
  });

  if (isLoading) return <Loader />;

  const { address, contact, socials } = contactConfig;

  const handleFinalSubmit = () => {
    console.log('Form Submitted:', formData);
    setIsSubmitted(true);
  };

  const socialIcons: { [key: string]: React.ElementType } = {
    linkedin: Linkedin,
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    github: Github
  };

  return (
    <div className="min-h-screen pt-24 pb-24 px-4 sm:px-6 relative overflow-hidden bg-slate-50 dark:bg-[#050505] transition-colors duration-500">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-100 to-transparent dark:from-brand-900/10 dark:to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 relative z-10">
        {/* Left: Info */}
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6 text-slate-900 dark:text-white">Contact Portal</h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-gray-400 mb-8 sm:mb-12">
            Ready to shift? Complete our guided form to initialize protocol.
          </p>

          <div className="space-y-6 sm:space-y-8">
            <div className="flex items-start gap-4">
              <div className="p-3 sm:p-4 bg-slate-100 dark:bg-gray-900 rounded-lg text-brand-600 dark:text-brand-500 flex-shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Global Headquarters</h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-gray-400">{address.street}, {address.sector}</p>
                <p className="text-xs sm:text-sm text-slate-400 dark:text-gray-500 mt-1">{address.coordinates}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 sm:p-4 bg-slate-100 dark:bg-gray-900 rounded-lg text-brand-600 dark:text-brand-500 flex-shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Communication Channels</h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-gray-400">{contact.email}</p>
                <p className="text-sm sm:text-base text-slate-600 dark:text-gray-400">{contact.phone}</p>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-start gap-4">
              <div className="p-3 sm:p-4 bg-slate-100 dark:bg-gray-900 rounded-lg text-brand-600 dark:text-brand-500 flex-shrink-0">
                <Globe size={24} />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Connect with Us</h3>
                <div className="flex flex-wrap gap-3 mt-2">
                  {Object.entries(socials).map(([platform, link]) => {
                    const Icon = socialIcons[platform] || Globe;
                    if (!link) return null; // Skip empty links
                    return (
                      <a
                        key={platform}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-1.5 bg-slate-200 dark:bg-gray-800 rounded-full text-xs font-semibold text-slate-700 dark:text-gray-300 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-600 transition-all capitalize"
                      >
                        <Icon size={14} />
                        {platform}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 border border-slate-200 dark:border-gray-800 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-black">
              <h3 className="flex items-center gap-2 font-bold mb-3 sm:mb-4 text-slate-900 dark:text-white text-sm sm:text-base">
                <Calendar size={18} className="text-purple-600 dark:text-purple-500" /> Book a Consultation
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-400 mb-3 sm:mb-4">Direct access to our senior architects via encrypted video link.</p>
              <button className="w-full py-2.5 sm:py-3 bg-slate-200 hover:bg-slate-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-slate-900 dark:text-white rounded-lg transition-colors text-xs sm:text-sm font-mono uppercase font-bold">
                Launch Scheduler
              </button>
            </div>
          </div>
        </div>

        {/* Right: Stepper Form */}
        <div>
          {isSubmitted ? (
            <div className="bg-white dark:bg-gray-900 p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-gray-800 shadow-2xl">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-green-100 dark:bg-green-500/20 rounded-full mb-6">
                  <CheckCircle size={40} className="sm:w-12 sm:h-12 text-green-600 dark:text-green-500" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-slate-900 dark:text-white">Transmission Received</h3>
                <p className="text-base sm:text-lg text-slate-600 dark:text-gray-400 mb-8">
                  Our team will decrypt your message and respond within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      company: '',
                      phone: '',
                      department: 'General Inquiry',
                      projectType: '',
                      budget: '',
                      message: ''
                    });
                  }}
                  className="text-brand-600 dark:text-brand-500 underline font-medium text-sm sm:text-base"
                >
                  Send another message
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-gray-800 shadow-2xl">
              <Stepper
                initialStep={1}
                onFinalStepCompleted={handleFinalSubmit}
                nextButtonText="Next Step"
                backButtonText="Back"
              >
                {/* Step 1: Personal Info */}
                <Step>
                  <div className="space-y-5">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-gray-800">
                      <div className="p-2.5 bg-purple-100 dark:bg-purple-500/20 rounded-xl">
                        <User size={22} className="text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Personal Information</h3>
                        <p className="text-sm text-slate-600 dark:text-gray-400">Let's start with the basics</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-black/50 border-2 border-slate-200 dark:border-gray-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:border-purple-500 dark:focus:border-purple-500 focus:outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-black/50 border-2 border-slate-200 dark:border-gray-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:border-purple-500 dark:focus:border-purple-500 focus:outline-none transition-colors"
                        placeholder="john@company.com"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Phone Number</label>
                      <div className="relative">
                        <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-slate-50 dark:bg-black/50 border-2 border-slate-200 dark:border-gray-700 rounded-xl pl-12 pr-4 py-3 text-slate-900 dark:text-white focus:border-purple-500 dark:focus:border-purple-500 focus:outline-none transition-colors"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>
                  </div>
                </Step>

                {/* Step 2: Company & Project */}
                <Step>
                  <div className="space-y-5">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-gray-800">
                      <div className="p-2.5 bg-cyan-100 dark:bg-cyan-500/20 rounded-xl">
                        <Building size={22} className="text-cyan-600 dark:text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Company & Project</h3>
                        <p className="text-sm text-slate-600 dark:text-gray-400">Tell us about your organization</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Company Name</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-black/50 border-2 border-slate-200 dark:border-gray-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:border-cyan-500 dark:focus:border-cyan-500 focus:outline-none transition-colors"
                        placeholder="Acme Corporation"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Department *</label>
                      <div className="relative">
                        <Briefcase size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        <select
                          value={formData.department}
                          onChange={e => setFormData({ ...formData, department: e.target.value })}
                          className="w-full bg-slate-50 dark:bg-black/50 border-2 border-slate-200 dark:border-gray-700 rounded-xl pl-12 pr-4 py-3 text-slate-900 dark:text-white focus:border-cyan-500 dark:focus:border-cyan-500 focus:outline-none transition-colors appearance-none cursor-pointer"
                        >
                          <option>General Inquiry</option>
                          <option>Software Development</option>
                          <option>Security Audit</option>
                          <option>Robotics R&D</option>
                          <option>Investor Relations</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Project Type</label>
                      <select
                        value={formData.projectType}
                        onChange={e => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-black/50 border-2 border-slate-200 dark:border-gray-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:border-cyan-500 dark:focus:border-cyan-500 focus:outline-none transition-colors appearance-none cursor-pointer"
                      >
                        <option value="">Select project type</option>
                        <option>New Development</option>
                        <option>System Integration</option>
                        <option>Consulting</option>
                        <option>Maintenance & Support</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Estimated Budget</label>
                      <div className="relative">
                        <DollarSign size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        <select
                          value={formData.budget}
                          onChange={e => setFormData({ ...formData, budget: e.target.value })}
                          className="w-full bg-slate-50 dark:bg-black/50 border-2 border-slate-200 dark:border-gray-700 rounded-xl pl-12 pr-4 py-3 text-slate-900 dark:text-white focus:border-cyan-500 dark:focus:border-cyan-500 focus:outline-none transition-colors appearance-none cursor-pointer"
                        >
                          <option value="">Select budget range</option>
                          <option>Under $10,000</option>
                          <option>$10,000 - $50,000</option>
                          <option>$50,000 - $100,000</option>
                          <option>$100,000 - $500,000</option>
                          <option>$500,000+</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </Step>

                {/* Step 3: Message */}
                <Step>
                  <div className="space-y-5">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-gray-800">
                      <div className="p-2.5 bg-orange-100 dark:bg-orange-500/20 rounded-xl">
                        <MessageSquare size={22} className="text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Project Description</h3>
                        <p className="text-sm text-slate-600 dark:text-gray-400">Share your vision with us</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Message *</label>
                      <textarea
                        rows={6}
                        required
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-black/50 border-2 border-slate-200 dark:border-gray-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none transition-colors resize-none"
                        placeholder="Describe your project requirements, goals, timeline, and any specific challenges you're facing..."
                      />
                    </div>

                    <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-500/10 dark:to-cyan-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl">
                      <p className="text-sm text-blue-900 dark:text-blue-300">
                        <strong>💡 Tip:</strong> Include details about your timeline, technical requirements, and expected outcomes for a more accurate response.
                      </p>
                    </div>
                  </div>
                </Step>
              </Stepper>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;