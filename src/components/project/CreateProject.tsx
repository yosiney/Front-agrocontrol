import React, { useState } from "react";

interface CreateProjectProps {
  onClose: () => void;   // función para cerrar el modal
}

const CreateProject: React.FC<CreateProjectProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    status: "activo",
    planting_date: "",
    harvest_date: "",
    area: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:6868/projects/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("✅ Proyecto creado exitosamente");
        setFormData({
          name: "",
          location: "",
          status: "activo",
          planting_date: "",
          harvest_date: "",
          area: "",
        });
        setTimeout(() => onClose(), 1500); // cerrar después de 1.5s
      } else {
        const errorData = await response.json();
        setMessage(`❌ Error: ${errorData.detail || "No se pudo crear el proyecto"}`);
      }
    } catch {
      setMessage("⚠️ Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Crear Nuevo Proyecto</h2>

        {message && (
          <div className={`mb-4 p-2 rounded ${message.startsWith("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
          <input type="text" name="location" placeholder="Ubicación" value={formData.location} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />

          <select name="status" value={formData.status} onChange={handleChange} className="w-full border px-3 py-2 rounded">
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>

          <input type="date" name="planting_date" value={formData.planting_date} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          <input type="date" name="harvest_date" value={formData.harvest_date} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          <input type="text" name="area" placeholder="Área (hectáreas)" value={formData.area} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />

          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancelar</button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              {loading ? "Creando..." : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
