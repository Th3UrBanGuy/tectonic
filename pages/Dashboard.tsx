import React, { useState } from 'react';
import AdminLogin from '../components/dashboard/AdminLogin';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import Overview from '../components/dashboard/Overview';
import LinkCenter from '../components/dashboard/LinkCenter';
import ChatSystem from '../components/dashboard/ChatSystem';
import MemberList from '../components/dashboard/MemberList';
import Inquiries from '../components/dashboard/Inquiries';
import ContentManagement from '../components/dashboard/ContentManagement';
import Settings from '../components/dashboard/Settings';

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('overview');
  };

  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />;
  }

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
      {activeTab === 'settings' && <Settings />}
    </DashboardLayout>
  );
};

export default Dashboard;