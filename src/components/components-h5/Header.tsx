import React from 'react';

interface HeaderProps {
  userName: string;
}

const Header: React.FC<HeaderProps> = ({ userName }) => {
  return (
    <div className="w-full p-6 bg-blue-100 rounded-xl shadow-md flex items-center space-x-6">
      <div className="w-16 h-16 bg-blue-300 rounded-full flex items-center justify-center text-white font-bold text-2xl">
        F
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">{userName}</h2>
      </div>
    </div>
  );
};

export default Header;