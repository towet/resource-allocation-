import React, { useState } from 'react';
import { BarChart3, Building2, Users2, BoxesIcon, ArrowRight, Activity, PieChart, Calendar, Bell } from 'lucide-react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import { AuthModal } from './components/AuthModal';
import { useAuth } from './hooks/useAuth';

const App = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, userRole, loading, signOut } = useAuth();

  // Show loading spinner only for a brief period
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If we're not loading, show either Dashboard or LandingPage
  return (
    <>
      {user ? (
        <Dashboard userRole={userRole || 'staff'} onSignOut={signOut} />
      ) : (
        <LandingPage onAuthClick={() => setIsAuthModalOpen(true)} />
      )}
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
};

export default App;