import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Home from './pages/Home';
import ManageProject from './components/project/ManageProject';

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState('home');

  // Función para renderizar el componente basado en la vista activa
  const renderContent = () => {
    switch (activeView) {
      case 'home':
        return <Home />;
      case 'manage-projects':
        return <ManageProject />;
      case 'expenses':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800">Gastos</h1>
            <p className="text-gray-600 mt-2">Sección de gastos en desarrollo...</p>
          </div>
        );
      case 'reports':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800">Reportes</h1>
            <p className="text-gray-600 mt-2">Sección de reportes en desarrollo...</p>
          </div>
        );
      case 'inventory':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800">Inventario</h1>
            <p className="text-gray-600 mt-2">Sección de inventario en desarrollo...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800">Configuración</h1>
            <p className="text-gray-600 mt-2">Sección de configuración en desarrollo...</p>
          </div>
        );
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)}
          activeItem={activeView}
          onItemClick={setActiveView}
        />
        <main className="flex-1 lg:ml-0">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;