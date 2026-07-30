import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import LoginScreen from './components/LoginScreen';
import OnboardingWizard from './components/OnboardingWizard';
import Dashboard from './components/Dashboard';
import { UserProfile } from './types';
import { playSuccessChime } from './utils/audio';
import { triggerConfetti } from './utils/confetti';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'landing' | 'login' | 'wizard' | 'dashboard'>('landing');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleLoginSuccess = (isDemo: boolean) => {
    if (isDemo) {
      // Setup a pre-configured demo account immediately (dopamine low friction)
      const demoProfile: UserProfile = {
        id: 'buyer-demo-99',
        email: 'demo@profitmint.ai',
        businessName: 'BrightSmile Dentistry',
        niche: 'Cosmetic Dentistry',
        city: 'London',
        businessType: 'service',
        oto2Active: true,
        oto4Active: false,
        whatsappNumber: '+44 7911 123456',
        voiceProfileId: 'gentle-male',
        heartbeatFrequencyHours: 4,
        learningAggressiveness: 'balanced',
        setupComplete: true,
        monthlyRevenueTarget: 50000,
        icpObject: {
          companySize: '1-10 (B2C Consumers)',
          industry: 'Dental/Cosmetics',
          budgetRange: '£1,000 - £10,000',
          geography: 'Greater London Area',
          keyPainPoints: [
            'Afraid of clinical procedures',
            'Cannot find pricing transparency online',
            'Weekend slot shortages'
          ]
        },
        createdAt: new Date().toISOString()
      };
      
      setUserProfile(demoProfile);
      setCurrentScreen('dashboard');
      setTimeout(() => {
        triggerConfetti();
        playSuccessChime();
      }, 300);
    } else {
      // Launch wizard from scratch
      setCurrentScreen('wizard');
    }
  };

  const handleWizardComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setUserProfile(null);
    setCurrentScreen('landing');
  };

  const handleGoToLogin = () => {
    setCurrentScreen('login');
  };

  const handleGoToWizard = () => {
    setCurrentScreen('wizard');
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-blue-500/30 selection:text-white">
      {currentScreen === 'landing' && (
        <LandingPage 
          onStartDemo={() => handleLoginSuccess(true)}
          onGoToLogin={handleGoToLogin}
          onGoToWizard={handleGoToWizard}
        />
      )}

      {currentScreen === 'login' && (
        <LoginScreen 
          onLoginSuccess={handleLoginSuccess} 
          onBackToHome={() => setCurrentScreen('landing')}
        />
      )}
      
      {currentScreen === 'wizard' && (
        <OnboardingWizard 
          onComplete={handleWizardComplete} 
          onBackToLogin={handleLogout}
        />
      )}
      
      {currentScreen === 'dashboard' && userProfile && (
        <Dashboard 
          profile={userProfile} 
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}
