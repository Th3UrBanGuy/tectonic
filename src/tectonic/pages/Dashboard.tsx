"use client";

import React, { useState } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import Overview from '../components/dashboard/Overview';
import LinkCenter from '../components/dashboard/LinkCenter';
import ChatSystem from '../components/dashboard/ChatSystem';
import MemberList from '../components/dashboard/MemberList';
import Inquiries from '../components/dashboard/Inquiries';
import ContentManagement from '../components/dashboard/ContentManagement';
import Settings from '../components/dashboard/Settings';
import SEOManager from '../components/dashboard/SEOManager';
import DocsPanel from '../components/dashboard/DocsPanel';
import SectionVisibilityManager from '../components/dashboard/SectionVisibilityManager';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from '../lib/router';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <DashboardLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onLogout={handleLogout}
    >
      {activeTab === 'overview' && <Overview />}
      {activeTab === 'links' && <LinkCenter />}
      {activeTab === 'chat' && <ChatSystem />}
      {activeTab === 'members' && <MemberList />}
      {activeTab === 'contact' && <Inquiries />}
      {activeTab === 'content' && <ContentManagement />}
      {activeTab === 'visibility' && <SectionVisibilityManager />}
      {activeTab === 'seo' && <SEOManager />}
      {activeTab === 'docs' && <DocsPanel />}
      {activeTab === 'settings' && <Settings />}
    </DashboardLayout>
  );
};

export default Dashboard;
