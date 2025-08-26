import React, { useState, useEffect } from 'react';
import { Sprout, MapPin, Calendar, TrendingUp } from 'lucide-react';

// Interface actualizada para el proyecto (desde la DB)
interface Project {
  id: string; // Ahora string porque viene de MongoDB
  name: string;
  location: string;
  status: 'activo' | 'terminado'; // Solo estos 2 estados
  planting_date: string; // snake_case desde la API
  harvest_date?: string; // snake_case desde la API
  area: string;
  // Removimos investment y progress por ahora
}

// Componente para cada tarjeta de proyecto
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'activo': return 'bg-green-100 text-green-800 border-green-200';
      case 'terminado': return 'bg-gray-100 text-gray-800 border-gray-200';
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
            <span className="font-medium">{project.planting_date}</span>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Área:</span>
            <span className="font-medium">{project.area}</span>
          </div>

          {project.status === 'activo' && project.harvest_date && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Próxima cosecha:</span>
              <span className="font-medium text-blue-600 flex items-center space-x-1">
                <Calendar size={14} />
                <span>{project.harvest_date}</span>
              </span>
            </div>
          )}
        </div>

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
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener proyectos desde la API
  const fetchProjects = async () => {
    try {
      setLoading(true);
      // Cambia esta URL por la correcta de tu backend
      const response = await fetch('http://localhost:8000/projects'); 
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      // Verificar que la respuesta sea JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('La respuesta no es JSON válido');
      }
      
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar proyectos');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  // useEffect para cargar los proyectos al montar el componente
  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Cargando proyectos...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-red-800">Error: {error}</div>
          <button 
            onClick={fetchProjects}
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Mis Proyectos</h1>
        <p className="text-gray-600">Gestiona y monitorea todos tus cultivos desde aquí</p>
      </div>

      {/* Resumen rápido */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center space-x-2">
            <Sprout className="text-green-600" size={20} />
            <span className="text-green-800 font-medium">Proyectos Activos</span>
          </div>
          <p className="text-2xl font-bold text-green-700 mt-1">
            {projects.filter(p => p.status === 'activo').length}
          </p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-2">
            <Calendar className="text-gray-600" size={20} />
            <span className="text-gray-800 font-medium">Proyectos Terminados</span>
          </div>
          <p className="text-2xl font-bold text-gray-700 mt-1">
            {projects.filter(p => p.status === 'terminado').length}
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

        {/* Mensaje si no hay proyectos */}
        {projects.length === 0 && (
          <div className="col-span-full text-center py-12">
            <Sprout className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-lg font-medium text-gray-700 mb-2">No hay proyectos aún</h3>
            <p className="text-gray-500 mb-4">Comienza creando tu primer proyecto agrícola</p>
            <button className="bg-green-600 text-white py-2 px-4 rounded text-sm font-medium hover:bg-green-700 transition-colors">
              Crear Primer Proyecto
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;