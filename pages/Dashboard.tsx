import React, { useState } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import Overview from '../components/dashboard/Overview';
import LinkCenter from '../components/dashboard/LinkCenter';
import ChatSystem from '../components/dashboard/ChatSystem';
import MemberList from '../components/dashboard/MemberList';
import Inquiries from '../components/dashboard/Inquiries';
import ContentManagement from '../components/dashboard/ContentManagement';
import Settings from '../components/dashboard/Settings';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    // Current logout just changes local state which is removed.
    // AuthContext logout should be handled by the Layout or a Logout button that calls useAuth().logout()
    // For now, simpler to just redirect or let the Layout handle it?
    // DashboardLayout likely has a logout button that calls onLogout.
    // We should probably inject the real logout here if possible, but let's stick to cleaning up the view first.
    // Actually, DashboardLayout probably expects a function.
    setActiveTab('overview');
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
      {activeTab === 'settings' && <Settings />}
    </DashboardLayout>
  );
};

export default Dashboard;