import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-6xl font-bold text-teal-500 mb-4">404</h1>
      <p className="text-xl text-gray-300 mb-8">Page not found</p>
      <button 
        onClick={() => navigate('/')} 
        className="px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-lg shadow-md transition-colors"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default NotFound;
