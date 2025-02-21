import React from 'react';
import { BarChart3, Building2, Users2, BoxesIcon, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onAuthClick: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onAuthClick }) => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">ResourceFlow</span>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={onAuthClick}
              className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg transition-colors"
            >
              Login
            </button>
            <button
              onClick={onAuthClick}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Get Started
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Streamline Your Resource</span>
            <span className="block text-indigo-600">Management Process</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Efficiently manage and allocate resources across departments. Track requests, monitor usage, and make data-driven decisions.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <button
                onClick={onAuthClick}
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<BoxesIcon className="h-8 w-8 text-indigo-600" />}
            title="Resource Management"
            description="Track and manage resources efficiently across departments"
          />
          <FeatureCard
            icon={<Users2 className="h-8 w-8 text-indigo-600" />}
            title="Role-Based Access"
            description="Secure access control with different permission levels"
          />
          <FeatureCard
            icon={<BarChart3 className="h-8 w-8 text-indigo-600" />}
            title="Analytics & Insights"
            description="Make data-driven decisions with detailed analytics"
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  );
};

export default LandingPage;