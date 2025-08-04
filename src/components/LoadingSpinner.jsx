import { FaSpinner } from 'react-icons/fa';

export default function LoadingSpinner({ fullScreen = false, size = 'md' }) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className={`flex items-center justify-center ${fullScreen ? 'h-screen' : ''}`}>
      <FaSpinner 
        className={`animate-spin ${sizeClasses[size]}`} 
        style={{ 
          animationDuration: '1s',
          animationTimingFunction: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)'
        }}
      />
    </div>
  );
}