import React from 'react';
import { Home, Sprout, FileText, DollarSign, BarChart3, Settings } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeItem: string;
  onItemClick: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, activeItem, onItemClick }) => {
  const menuItems = [
    { icon: Home, label: 'Inicio', id: 'home' },
    { icon: Sprout, label: 'Administrar Proyectos', id: 'manage-projects' },
    { icon: DollarSign, label: 'Gastos', id: 'expenses' },
    { icon: BarChart3, label: 'Reportes', id: 'reports' },
    { icon: FileText, label: 'Inventario', id: 'inventory' },
    { icon: Settings, label: 'Configuración', id: 'settings' },
  ];

  const handleItemClick = (itemId: string) => {
    onItemClick(itemId);
    // Cerrar sidebar en móvil después de seleccionar
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-full bg-white shadow-lg transform transition-transform duration-300 z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:block
        w-64 pt-20 lg:pt-0
      `}>
        <div className="p-4 border-b border-gray-200 hidden lg:block">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🌽</span>
            <h2 className="text-lg font-bold text-green-800">Menú</h2>
          </div>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button 
                  onClick={() => handleItemClick(item.id)}
                  className={`
                    w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors
                    ${activeItem === item.id
                      ? 'bg-green-100 text-green-800 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;