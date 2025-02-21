import React, { useState } from 'react';
import { Activity, PieChart, Calendar, Bell, Building2, BoxesIcon, BarChart3, ArrowRightCircle, LogOut, Menu, X, Box, CheckCircle, Package, AlertCircle } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ResourceManagement } from './ResourceManagement';
import { DepartmentManagement } from './DepartmentManagement';
import { AllocationRequests } from './AllocationRequests';
import { TransferRequests } from './TransferRequests';
import { Analytics } from './Analytics';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';

const queryClient = new QueryClient();

export const Dashboard = () => {
  const { signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('resources');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  // Define available tabs
  const tabs = [
    { id: 'resources', text: 'Resources', icon: BoxesIcon },
    { id: 'requests', text: 'Requests', icon: Calendar },
    { id: 'departments', text: 'Departments', icon: Building2 },
    { id: 'transfers', text: 'Transfers', icon: ArrowRightCircle },
    { id: 'analytics', text: 'Analytics', icon: BarChart3 }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'resources':
        return <ResourceManagement />;
      case 'departments':
        return <DepartmentManagement />;
      case 'requests':
        return <AllocationRequests />;
      case 'transfers':
        return <TransferRequests />;
      case 'analytics':
        return <Analytics />;
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <StatCard
              title="Total Resources"
              value="1,234"
              change="+12%"
              icon={<BoxesIcon className="h-6 w-6" />}
            />
            <StatCard
              title="Active Requests"
              value="56"
              change="+3%"
              icon={<Calendar className="h-6 w-6" />}
            />
            <StatCard
              title="Departments"
              value="8"
              change="0%"
              icon={<Building2 className="h-6 w-6" />}
            />
          </div>
        );
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        {/* Mobile Menu Button */}
        <div className="lg:hidden fixed top-0 left-0 m-4 z-50">
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-lg bg-white shadow-lg text-gray-600 hover:text-gray-900"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Header */}
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <h1 className="text-xl font-bold text-gray-900">ResourceFlow</h1>
                </div>
              </div>
              <div className="flex items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="ml-4 inline-flex items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-64 lg:flex-col">
          <div className="flex flex-col flex-grow bg-white shadow-lg">
            {/* Logo */}
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-900">ResourceFlow</h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 px-4">
              {tabs.map((tab) => (
                <SidebarItem
                  key={tab.id}
                  icon={<tab.icon className="h-5 w-5" />}
                  text={tab.text}
                  active={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                />
              ))}
            </nav>

            {/* Sign Out Button */}
            <div className="p-4">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween' }}
              className="fixed inset-0 z-40 lg:hidden"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={toggleMobileMenu} />
              <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                  <div className="px-4">
                    <h1 className="text-2xl font-bold text-gray-900">ResourceFlow</h1>
                  </div>
                  <nav className="mt-5 px-2 space-y-1">
                    {tabs.map((tab) => (
                      <SidebarItem
                        key={tab.id}
                        icon={<tab.icon className="h-5 w-5" />}
                        text={tab.text}
                        active={activeTab === tab.id}
                        onClick={() => {
                          setActiveTab(tab.id);
                          toggleMobileMenu();
                        }}
                      />
                    ))}
                  </nav>
                </div>
                <div className="p-4">
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    Sign Out
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="lg:pl-64">
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {renderContent()}
          </main>
        </div>
      </div>
    </QueryClientProvider>
  );
};

const SidebarItem = ({ icon, text, active, onClick }: { icon: React.ReactNode; text: string; active: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
      active ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
    }`}
  >
    {icon}
    <span className="ml-3">{text}</span>
  </button>
);

const StatCard = ({ title, value, change, icon }: { title: string; value: string; change: string; icon: React.ReactNode }) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
      </div>
      <div className="bg-indigo-50 rounded-lg p-3">{icon}</div>
    </div>
    <div className="mt-4">
      <span className="text-sm font-medium text-green-600">{change}</span>
      <span className="text-sm font-medium text-gray-500"> vs last month</span>
    </div>
  </div>
);