import React from 'react';
import { Sprout, MapPin, Calendar, TrendingUp } from 'lucide-react';

// Interface para el proyecto (luego vendrá de la DB)
interface Project {
  id: number;
  name: string;
  location: string;
  status: 'activo' | 'cosecha' | 'finalizado' | 'planificado';
  plantingDate: string;
  harvestDate?: string;
  area: string;
  investment: string;
  progress?: number;
}

// Componente para cada tarjeta de proyecto
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'activo': return 'bg-green-100 text-green-800 border-green-200';
      case 'cosecha': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'finalizado': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border hover:shadow-lg transition-shadow cursor-pointer">
      <div className="p-6">
        {/* Header del proyecto */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Sprout className="text-green-600" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{project.name}</h3>
              <p className="text-sm text-gray-500 flex items-center space-x-1">
                <MapPin size={14} />
                <span>{project.location}</span>
              </p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
        </div>

        {/* Información del proyecto */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Fecha de siembra:</span>
            <span className="font-medium">{project.plantingDate}</span>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Área:</span>
            <span className="font-medium">{project.area}</span>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Inversión total:</span>
            <span className="font-medium text-green-600">${project.investment}</span>
          </div>

          {project.status === 'activo' && project.harvestDate && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Próxima cosecha:</span>
              <span className="font-medium text-blue-600 flex items-center space-x-1">
                <Calendar size={14} />
                <span>{project.harvestDate}</span>
              </span>
            </div>
          )}
        </div>

        {/* Progress bar para proyectos activos */}
        {project.status === 'activo' && project.progress && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Progreso del ciclo</span>
              <span>{project.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Acciones rápidas */}
        <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-100">
          <button className="flex-1 bg-green-600 text-white py-2 px-3 rounded text-sm font-medium hover:bg-green-700 transition-colors">
            Ver Detalles
          </button>
          <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded text-sm font-medium hover:bg-gray-200 transition-colors">
            Agregar Gasto
          </button>
        </div>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  // Datos quemados por ahora (luego vendrán de la DB)
  const projects: Project[] = [
    {
      id: 1,
      name: "Yuca Cayetano",
      location: "Lote A - Sector Norte",
      status: "activo",
      plantingDate: "15 Mar 2025",
      harvestDate: "15 Nov 2025",
      area: "2.5 hectáreas",
      investment: "8,500",
      progress: 65
    },
    {
      id: 2,
      name: "Yuca Balastre",
      location: "Lote B - Sector Sur",
      status: "activo",
      plantingDate: "22 Mar 2025",
      harvestDate: "22 Nov 2025",
      area: "1.8 hectáreas",
      investment: "6,200",
      progress: 60
    }
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Mis Proyectos</h1>
        <p className="text-gray-600">Gestiona y monitorea todos tus cultivos desde aquí</p>
      </div>

      {/* Resumen rápido */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center space-x-2">
            <Sprout className="text-green-600" size={20} />
            <span className="text-green-800 font-medium">Proyectos Activos</span>
          </div>
          <p className="text-2xl font-bold text-green-700 mt-1">
            {projects.filter(p => p.status === 'activo').length}
          </p>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <div className="flex items-center space-x-2">
            <Calendar className="text-yellow-600" size={20} />
            <span className="text-yellow-800 font-medium">Próximas Cosechas</span>
          </div>
          <p className="text-2xl font-bold text-yellow-700 mt-1">
            {projects.filter(p => p.status === 'cosecha').length}
          </p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-2">
            <TrendingUp className="text-blue-600" size={20} />
            <span className="text-blue-800 font-medium">Inversión Total</span>
          </div>
          <p className="text-2xl font-bold text-blue-700 mt-1">
            ${projects.reduce((total, p) => total + parseFloat(p.investment.replace(',', '')), 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Grid de proyectos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
        
        {/* Card para agregar nuevo proyecto */}
        <div className="bg-white rounded-lg shadow-md border-2 border-dashed border-gray-300 hover:border-green-400 transition-colors cursor-pointer">
          <div className="p-6 h-full flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl text-gray-400">+</span>
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Nuevo Proyecto</h3>
            <p className="text-sm text-gray-500 mb-4">Agrega un nuevo cultivo para comenzar a trackear</p>
            <button className="bg-green-600 text-white py-2 px-4 rounded text-sm font-medium hover:bg-green-700 transition-colors">
              Crear Proyecto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;