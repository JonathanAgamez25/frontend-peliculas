import React, { useEffect, useState } from "react";
import {
  getDirectores,
  createDirector,
  updateDirector,
  deleteDirector,
} from "../services/directorService";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function Directores() {
  const [directores, setDirectores] = useState([]);
  const [form, setForm] = useState({ nombres: "", estado: "activo" });
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    cargarDirectores();
  }, []);

  const cargarDirectores = async () => {
    const res = await getDirectores();
    setDirectores(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateDirector(editId, form);
    } else {
      await createDirector(form);
    }
    setForm({ nombres: "", estado: "activo" });
    setEditId(null);
    setShowForm(false);
    cargarDirectores();
  };

  const handleEdit = (director) => {
    setForm({ nombres: director.nombres, estado: director.estado });
    setEditId(director.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    confirmAlert({
      title: "¿Estás seguro?",
      message: "Esta acción no se puede deshacer",
      buttons: [
        {
          label: "Sí, eliminar",
          onClick: async () => {
            await deleteDirector(id);
            cargarDirectores();
          },
        },
        {
          label: "Cancelar",
        },
      ],
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Directores</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditId(null);
            setForm({ nombres: "", estado: "activo" });
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {showForm ? "Cancelar" : "Nuevo Director"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded mb-6">
          <div className="mb-4">
            <label className="block font-semibold mb-1">Nombres</label>
            <input
              type="text"
              value={form.nombres}
              onChange={(e) => setForm({ ...form, nombres: e.target.value })}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Estado</label>
            <select
              value={form.estado}
              onChange={(e) => setForm({ ...form, estado: e.target.value })}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {editId ? "Actualizar" : "Guardar"}
          </button>
        </form>
      )}

      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-900 text-white">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Nombres</th>
            <th className="border p-2">Estado</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {directores.map((d) => (
            <tr key={d.id} className="hover:bg-gray-50">
              <td className="border p-2 text-center">{d.id}</td>
              <td className="border p-2">{d.nombres}</td>
              <td className="border p-2 text-center">
                <span
                  className={`px-2 py-1 rounded text-white text-sm ${d.estado === "activo" ? "bg-green-500" : "bg-red-500"}`}
                >
                  {d.estado}
                </span>
              </td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => handleEdit(d)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(d.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Directores;
