import React, { useEffect, useState } from 'react';
import './i18n'; // Add this line
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { ClonesPage } from './components/pages/ClonesPage';
import { ActionScreen } from './components/ActionScreen';
import { ProtectedDomains } from './components/ProtectedDomains';
import { Settings } from './components/Settings';
import { AddDomainPage } from './components/pages/AddDomainPage';
import { LoginPage } from './components/pages/auth/LoginPage';
import { RegisterPage } from './components/pages/auth/RegisterPage';
import { ForgotPasswordPage } from './components/pages/auth/ForgotPasswordPage';
import { SubscriptionPage } from './components/pages/SubscriptionPage';
import { PricingPage } from './components/pages/PricingPage';
import { CancelSubscriptionPage } from './components/pages/CancelSubscriptionPage';
import { ManageSubscriptionPage } from './components/pages/ManageSubscriptionPage';
import { RealTimePage } from './components/pages/RealTimePage';
import { TermsPage } from './components/pages/TermsPage';
import { PrivacyPage } from './components/pages/PrivacyPage';
import { TutorialsPage } from './components/pages/TutorialsPage';

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authScreen, setAuthScreen] = useState('login');
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [selectedDomain, setSelectedDomain] = useState(null);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleViewActions = domain => {
    setSelectedDomain(domain);
    setActiveScreen('actions');
  };

  // If not authenticated, show auth screens
  if (!isAuthenticated) {
    switch (authScreen) {
      case 'register':
        return <RegisterPage onLogin={() => setAuthScreen('login')} setActiveScreen={setActiveScreen} // Pass setActiveScreen
        />;
      case 'forgot-password':
        return <ForgotPasswordPage onBack={() => setAuthScreen('login')} />;
      default:
        return <LoginPage onRegister={() => setAuthScreen('register')} onForgotPassword={() => setAuthScreen('forgot-password')} onLogin={handleLogin} />;
    }
  }

  // If authenticated, show main app
  return <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
      <main className="flex-1 overflow-auto">{renderScreen()}</main>
    </div>;

  function renderScreen() {
    switch (activeScreen) {
      case 'dashboard':
        return <Dashboard onViewActions={handleViewActions} onAddDomain={() => setActiveScreen('add-domain')} />;
      case 'clones':
        return <ClonesPage />;
      case 'actions':
        return <ActionScreen domain={selectedDomain} onBack={() => setActiveScreen('clones')} />;
      case 'domains':
        return <ProtectedDomains />;
      case 'settings':
        return <Settings />;
      case 'subscription':
        return <PricingPage setActiveScreen={setActiveScreen} />;
      case 'manage-subscription':
        return <ManageSubscriptionPage setActiveScreen={setActiveScreen} />;
      case 'add-domain':
        return <AddDomainPage onBack={() => setActiveScreen('dashboard')} />;
      case 'cancel-subscription':
        return <CancelSubscriptionPage onBack={() => setActiveScreen('manage-subscription')} />;
      case 'realtime':
        return <RealTimePage />;
      case 'terms':
        return <TermsPage onBack={() => setActiveScreen('dashboard')} />;
      case 'privacy':
        return <PrivacyPage onBack={() => setActiveScreen('dashboard')} />;
      case 'tutorials':
        return <TutorialsPage />;
      default:
        return <Dashboard onViewActions={handleViewActions} />;
    }
  }
}