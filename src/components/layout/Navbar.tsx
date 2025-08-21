import React from 'react';
import { Menu } from 'lucide-react';

interface NavbarProps {
  onToggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  return (
    <nav className="w-full bg-green-800 text-white px-6 py-4 flex justify-between items-center shadow-md z-50 relative">
      {/* Logo + Title */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={onToggleSidebar}
          className="lg:hidden hover:bg-green-700 p-1 rounded transition-colors"
        >
          <Menu size={24} />
        </button>
        <div className="flex items-center space-x-3">
          <span className="text-2xl">🌽</span>
          <h1 className="text-xl font-bold tracking-wide">Agrocontrol</h1>
        </div>
      </div>

      {/* User */}
      <div className="flex items-center space-x-4">
        <span className="hidden md:block text-sm">Bienvenido</span>
        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
          <span className="text-sm font-medium">U</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;