import ReactGA from 'react-ga4';
import crypto from 'crypto';

// Initialize Google Analytics
const initializeGA = () => {
  const Tag = process.env.NODE_ENV === 'production' ? 'G-HVLY6L1CT8' : 'G-DEVY6L1CT8';
  ReactGA.initialize(Tag);
};

export const hashUserId = (userId: string) => {
  const hash = crypto.createHash('sha256');
  hash.update(userId);
  return hash.digest('hex');
};

// Function to track page views
export const trackPageView = (path: string) => {
  ReactGA.send({ hitType: 'pageview', page: path });
};

// Function to track events
export const trackEvent = (category: string, action: string, label?: string, value?: number) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
    value: value,
  });
};

// Custom events for login and registration
export const trackLoginAttempt = () => trackEvent('User', 'Login Attempt');
export const trackLoginSuccess = () => trackEvent('User', 'Login Success');
export const trackLoginFailure = (error: string) => trackEvent('User', 'Login Failure', error);

export const trackRegistrationAttempt = () => trackEvent('User', 'Registration Attempt');
export const trackRegistrationSuccess = () => trackEvent('User', 'Registration Success');
export const trackRegistrationFailure = (error: string) => trackEvent('User', 'Registration Failure', error);

export const trackGuestLogin = () => trackEvent('User', 'Guest Login');

// Custom events for quests
export const trackQuestCompletion = (questId: number) => trackEvent('Quest', 'Complete Quest', questId.toString());
export const trackQuestSkip = (questId: number) => trackEvent('Quest', 'Skip Quest', questId.toString());

export const trackSuggestionCreation = () => trackEvent('Suggestion', 'Create Suggestion');

// Export the initialization function
export default initializeGA;
