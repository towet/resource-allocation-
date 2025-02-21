import React, { useState } from 'react';
import { Activity, PieChart, Calendar, Bell, Building2, BoxesIcon, BarChart3, ArrowRightCircle, LogOut, Menu, X } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ResourceManagement } from './ResourceManagement';
import { DepartmentManagement } from './DepartmentManagement';
import { AllocationRequests } from './AllocationRequests';
import { TransferRequests } from './TransferRequests';
import { Analytics } from './Analytics';
import { motion, AnimatePresence } from 'framer-motion';

const queryClient = new QueryClient();

interface DashboardProps {
  userRole: string | null;
  onSignOut: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userRole, onSignOut }) => {
  const [activeTab, setActiveTab] = useState('resources');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Define available tabs based on user role
  const getTabs = () => {
    const tabs = [
      { id: 'resources', text: 'Resources', icon: BoxesIcon, roles: ['admin', 'department_head', 'staff'] },
      { id: 'requests', text: 'Requests', icon: Calendar, roles: ['admin', 'department_head', 'staff'] },
    ];

    if (userRole === 'admin' || userRole === 'department_head') {
      tabs.push(
        { id: 'departments', text: 'Departments', icon: Building2, roles: ['admin', 'department_head'] },
        { id: 'transfers', text: 'Transfers', icon: ArrowRightCircle, roles: ['admin', 'department_head'] },
        { id: 'analytics', text: 'Analytics', icon: BarChart3, roles: ['admin', 'department_head'] }
      );
    }

    return tabs;
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'resources':
        return <ResourceManagement userRole={userRole} />;
      case 'departments':
        return <DepartmentManagement userRole={userRole} />;
      case 'requests':
        return <AllocationRequests userRole={userRole} />;
      case 'transfers':
        return <TransferRequests userRole={userRole} />;
      case 'analytics':
        return <Analytics userRole={userRole} />;
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

        {/* Sidebar - Desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-64 lg:flex-col">
          <div className="flex flex-col flex-grow bg-white shadow-lg">
            {/* Logo */}
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-900">ResourceFlow</h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
              {getTabs().map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl ${
                    activeTab === tab.id ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="w-5 h-5 mr-3" />
                  {tab.text}
                </button>
              ))}
              <button
                onClick={onSignOut}
                className="flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl text-gray-600 hover:bg-gray-100"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Sign Out
              </button>
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {userRole?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{userRole?.replace('_', ' ')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Slide Over */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
                onClick={toggleMobileMenu}
              />

              {/* Slide-over menu */}
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 lg:hidden"
              >
                <div className="flex flex-col h-full">
                  {/* Logo */}
                  <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-900">ResourceFlow</h1>
                  </div>

                  {/* Navigation */}
                  <nav className="flex-1 p-4 space-y-1">
                    {getTabs().map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl ${
                          activeTab === tab.id ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <tab.icon className="w-5 h-5 mr-3" />
                        {tab.text}
                      </button>
                    ))}
                    <button
                      onClick={() => {
                        onSignOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl text-gray-600 hover:bg-gray-100"
                    >
                      <LogOut className="w-5 h-5 mr-3" />
                      Sign Out
                    </button>
                  </nav>

                  {/* User Profile */}
                  <div className="p-4 border-t">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {userRole?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{userRole?.replace('_', ' ')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="lg:pl-64">
          <header className="bg-white shadow-sm">
            <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {getTabs().find(tab => tab.id === activeTab)?.text || 'Resources'}
              </h2>
              <div className="flex items-center space-x-4">
                <button className="text-gray-400 hover:text-gray-500">
                  <Bell className="w-5 h-5" />
                </button>
              </div>
            </div>
          </header>

          <main className="p-4 sm:p-6 lg:p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </main>
        </div>
      </div>
    </QueryClientProvider>
  );
};

const SidebarItem = ({ icon, text, active, onClick }: { icon: React.ReactNode; text: string; active: boolean; onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 w-full px-3 py-2 rounded-lg transition-colors ${
        active ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
};

const StatCard = ({ title, value, change, icon }: { title: string; value: string; change: string; icon: React.ReactNode }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        {icon}
      </div>
      <div className="mt-2">
        <p className="text-3xl font-semibold text-gray-900">{value}</p>
        <p className="text-sm text-green-600">{change}</p>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Dashboard userRole="admin" onSignOut={() => console.log('Sign out')} />
  );
};

export default App;