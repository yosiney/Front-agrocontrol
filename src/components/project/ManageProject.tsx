import React, { useState } from "react";
import { Sprout, Plus, Edit2, Eye } from "lucide-react";
import CreateProject from "./CreateProject"; // importa tu formulario

const ManageProject: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <Sprout className="text-green-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">Administrar Proyectos</h1>
        </div>
        <p className="text-gray-600">Aquí puedes crear, editar y eliminar tus proyectos agrícolas</p>
      </div>

      {/* Acciones principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
        >
          <Plus size={20} />
          <span>Crear Nuevo Proyecto</span>
        </button>

        <button className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
          <Eye size={20} />
          <span>Ver Todos los Proyectos</span>
        </button>

        <button className="bg-gray-600 text-white p-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2">
          <Edit2 size={20} />
          <span>Editar Proyectos</span>
        </button>
      </div>

      {/* Modal de Crear Proyecto */}
      {showModal && <CreateProject onClose={() => setShowModal(false)} />}

      {/* Mensaje temporal */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-2xl">🚧</span>
          <h3 className="text-lg font-semibold text-yellow-800">En Desarrollo</h3>
        </div>
        <p className="text-yellow-700">Esta sección está en construcción. Pronto podrás administrar todos tus proyectos desde aquí.</p>
      </div>
    </div>
  );
};

export default ManageProject;
