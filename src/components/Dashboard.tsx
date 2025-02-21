import React, { useState } from 'react';
import { Activity, PieChart, Calendar, Bell, Building2, Users2, BoxesIcon, BarChart3, ArrowRightCircle, LogOut } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ResourceManagement } from './ResourceManagement';
import { DepartmentManagement } from './DepartmentManagement';
import { AllocationRequests } from './AllocationRequests';
import { TransferRequests } from './TransferRequests';
import { Analytics } from './Analytics';

const queryClient = new QueryClient();

interface DashboardProps {
  userRole: string | null;
  onSignOut: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userRole, onSignOut }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Define available tabs based on user role
  const getTabs = () => {
    const tabs = [
      { id: 'overview', text: 'Overview', icon: Activity, roles: ['admin', 'department_head', 'staff'] },
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

    if (userRole === 'admin') {
      tabs.push({ id: 'users', text: 'Users', icon: Users2, roles: ['admin'] });
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
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm">
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-8">
              <Building2 className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">ResourceFlow</span>
            </div>
            <nav className="space-y-2">
              {getTabs().map((tab) => (
                <SidebarItem
                  key={tab.id}
                  icon={<tab.icon className="h-5 w-5" />}
                  text={tab.text}
                  active={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                />
              ))}
              <button
                onClick={onSignOut}
                className="flex items-center space-x-2 w-full px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-900">
                  {getTabs().find(tab => tab.id === activeTab)?.text || 'Overview'}
                </h1>
                <div className="flex items-center space-x-4">
                  <button className="text-gray-600 hover:text-gray-900">
                    <Bell className="h-6 w-6" />
                  </button>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                      {userRole?.[0].toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {userRole?.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {renderContent()}
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