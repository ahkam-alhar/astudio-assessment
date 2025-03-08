import React from 'react';

interface LoadingSpinnerProps {
  isLoading?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  isLoading = true,
}) => {
  if (!isLoading) return null; // If isLoading is false, don't render the loading spinner

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-t-4 border-yellow border-solid rounded-full animate-spin"></div>
        <p className="mt-4 text-blue text-xl font-semibold">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
