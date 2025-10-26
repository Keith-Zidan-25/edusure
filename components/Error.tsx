import React from 'react';
import { 
  AlertTriangle, 
  Home, 
  ArrowLeft, 
  RefreshCw,
  Lock,
  FileQuestion,
  Server,
  Wifi,
  ShieldAlert,
  Clock,
  HelpCircle
} from 'lucide-react';

interface ErrorConfig {
  code: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  suggestions: string[];
  primaryAction: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

interface ErrorPageProps {
  errorType: '400' | '401' | '403' | '404' | '408' | '429' | '500' | '502' | '503' | 'network';
  onGoHome?: () => void;
  onGoBack?: () => void;
  onRetry?: () => void;
  onGoLogin?: () => void;
  onContactSupport?: () => void;
  customMessage?: string;
}

// Error configurations
const getErrorConfig = (
  errorType: ErrorPageProps['errorType'],
  onGoHome: () => void,
  onGoBack: () => void,
  onRetry: () => void,
  onGoLogin: () => void,
  onContactSupport: () => void
): ErrorConfig => {
  const configs: Record<string, ErrorConfig> = {
    '400': {
      code: '400',
      title: 'Bad Request',
      description: 'The request could not be understood by the server. Please check your input and try again.',
      icon: <AlertTriangle className="w-20 h-20 text-orange-500" />,
      suggestions: [
        'Check if all required fields are filled correctly',
        'Verify that your input follows the expected format',
        'Clear your browser cache and cookies',
        'Try refreshing the page'
      ],
      primaryAction: {
        label: 'Go Back',
        onClick: onGoBack
      },
      secondaryAction: {
        label: 'Go Home',
        onClick: onGoHome
      }
    },
    '401': {
      code: '401',
      title: 'Authentication Required',
      description: 'You need to be logged in to access this resource. Please sign in to continue.',
      icon: <Lock className="w-20 h-20 text-yellow-500" />,
      suggestions: [
        'Sign in with your credentials',
        'Check if your session has expired',
        'Verify your account is active',
        'Reset your password if needed'
      ],
      primaryAction: {
        label: 'Sign In',
        onClick: onGoLogin
      },
      secondaryAction: {
        label: 'Go Home',
        onClick: onGoHome
      }
    },
    '403': {
      code: '403',
      title: 'Access Forbidden',
      description: 'You don\'t have permission to access this resource. Contact your administrator if you believe this is an error.',
      icon: <ShieldAlert className="w-20 h-20 text-red-500" />,
      suggestions: [
        'Verify you have the necessary permissions',
        'Contact your system administrator',
        'Check if your account has the required role',
        'Return to a page you have access to'
      ],
      primaryAction: {
        label: 'Go Home',
        onClick: onGoHome
      },
      secondaryAction: {
        label: 'Contact Support',
        onClick: onContactSupport
      }
    },
    '404': {
      code: '404',
      title: 'Page Not Found',
      description: 'The page you\'re looking for doesn\'t exist or has been moved. Let\'s get you back on track.',
      icon: <FileQuestion className="w-20 h-20 text-blue-500" />,
      suggestions: [
        'Check the URL for typos',
        'Use the navigation menu to find what you need',
        'Search for the content you\'re looking for',
        'Go back to the previous page'
      ],
      primaryAction: {
        label: 'Go Home',
        onClick: onGoHome
      },
      secondaryAction: {
        label: 'Go Back',
        onClick: onGoBack
      }
    },
    '408': {
      code: '408',
      title: 'Request Timeout',
      description: 'The server timed out waiting for your request. This might be due to a slow connection or high server load.',
      icon: <Clock className="w-20 h-20 text-purple-500" />,
      suggestions: [
        'Check your internet connection',
        'Try again in a few moments',
        'Reduce the size of your request if possible',
        'Contact support if the problem persists'
      ],
      primaryAction: {
        label: 'Try Again',
        onClick: onRetry
      },
      secondaryAction: {
        label: 'Go Home',
        onClick: onGoHome
      }
    },
    '429': {
      code: '429',
      title: 'Too Many Requests',
      description: 'You\'ve made too many requests in a short period. Please wait a moment before trying again.',
      icon: <AlertTriangle className="w-20 h-20 text-amber-500" />,
      suggestions: [
        'Wait a few minutes before trying again',
        'Avoid rapid successive requests',
        'Check if you have multiple tabs open',
        'Contact support if you need higher rate limits'
      ],
      primaryAction: {
        label: 'Go Home',
        onClick: onGoHome
      },
      secondaryAction: {
        label: 'Contact Support',
        onClick: onContactSupport
      }
    },
    '500': {
      code: '500',
      title: 'Internal Server Error',
      description: 'Something went wrong on our end. Our team has been notified and is working to fix the issue.',
      icon: <Server className="w-20 h-20 text-red-600" />,
      suggestions: [
        'Try refreshing the page',
        'Wait a few minutes and try again',
        'Check our status page for updates',
        'Contact support if the issue persists'
      ],
      primaryAction: {
        label: 'Refresh Page',
        onClick: onRetry
      },
      secondaryAction: {
        label: 'Go Home',
        onClick: onGoHome
      }
    },
    '502': {
      code: '502',
      title: 'Bad Gateway',
      description: 'The server received an invalid response. This is usually temporary and should resolve shortly.',
      icon: <Server className="w-20 h-20 text-orange-600" />,
      suggestions: [
        'Refresh the page after a moment',
        'Check our status page for updates',
        'Clear your browser cache',
        'Try again in a few minutes'
      ],
      primaryAction: {
        label: 'Try Again',
        onClick: onRetry
      },
      secondaryAction: {
        label: 'Go Home',
        onClick: onGoHome
      }
    },
    '503': {
      code: '503',
      title: 'Service Unavailable',
      description: 'The service is temporarily unavailable. This could be due to maintenance or high traffic.',
      icon: <Server className="w-20 h-20 text-gray-600" />,
      suggestions: [
        'The service should be back soon',
        'Check our status page for updates',
        'Try again in a few minutes',
        'Follow us on social media for updates'
      ],
      primaryAction: {
        label: 'Try Again',
        onClick: onRetry
      },
      secondaryAction: {
        label: 'Check Status',
        onClick: () => console.log('Navigate to status page')
      }
    },
    'network': {
      code: 'Network Error',
      title: 'Connection Problem',
      description: 'We couldn\'t connect to the server. Please check your internet connection and try again.',
      icon: <Wifi className="w-20 h-20 text-gray-500" />,
      suggestions: [
        'Check your internet connection',
        'Try switching networks (WiFi/Mobile data)',
        'Disable VPN if you\'re using one',
        'Contact your network administrator'
      ],
      primaryAction: {
        label: 'Try Again',
        onClick: onRetry
      },
      secondaryAction: {
        label: 'Go Home',
        onClick: onGoHome
      }
    }
  };

  return configs[errorType];
};

const ErrorPage: React.FC<ErrorPageProps> = ({
  errorType,
  onGoHome = () => window.location.href = '/',
  onGoBack = () => window.history.back(),
  onRetry = () => window.location.reload(),
  onContactSupport = () => console.log('Contact support'),
  onGoLogin = () => window.location.href = '/auth',
  customMessage
}) => {
  const config = getErrorConfig(errorType, onGoHome, onGoBack, onRetry, onContactSupport, onGoLogin);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            {config.icon}
          </div>
          <div className="inline-block px-4 py-2 bg-white rounded-full shadow-sm mb-4">
            <span className="text-sm font-mono font-semibold text-gray-600">
              Error {config.code}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-4">
            {config.title}
          </h1>
          <p className="text-gray-600 text-center mb-8">
            {customMessage || config.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={config.primaryAction.onClick}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-md hover:shadow-lg"
            >
              <RefreshCw className="w-5 h-5" />
              <span>{config.primaryAction.label}</span>
            </button>
            {config.secondaryAction && (
              <button
                onClick={config.secondaryAction.onClick}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                <Home className="w-5 h-5" />
                <span>{config.secondaryAction.label}</span>
              </button>
            )}
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center space-x-2 mb-4">
              <HelpCircle className="w-5 h-5 text-gray-500" />
              <h2 className="text-lg font-semibold text-gray-900">What you can try:</h2>
            </div>
            <ul className="space-y-3">
              {config.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-blue-600 text-xs font-semibold">{index + 1}</span>
                  </div>
                  <span className="text-gray-700">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-4">Still need help?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onContactSupport}
              className="flex items-center justify-center space-x-2 px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <span>Contact Support</span>
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </button>
            <button
              onClick={() => console.log('View documentation')}
              className="flex items-center justify-center space-x-2 px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <span>View Documentation</span>
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;