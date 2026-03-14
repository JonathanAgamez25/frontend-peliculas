import React, { useEffect, useState } from "react";
import {
  getTipos,
  createTipo,
  updateTipo,
  deleteTipo,
} from "../services/tipoService";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function Tipos() {
  const [tipos, setTipos] = useState([]);
  const [form, setForm] = useState({ nombre: "", descripcion: "" });
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    cargarTipos();
  }, []);

  const cargarTipos = async () => {
    const res = await getTipos();
    setTipos(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateTipo(editId, form);
    } else {
      await createTipo(form);
    }
    setForm({ nombre: "", descripcion: "" });
    setEditId(null);
    setShowForm(false);
    cargarTipos();
  };

  const handleEdit = (tipo) => {
    setForm({ nombre: tipo.nombre, descripcion: tipo.descripcion });
    setEditId(tipo.id);
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
            await deleteTipo(id);
            cargarTipos();
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
        <h1 className="text-2xl font-bold">Tipos</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditId(null);
            setForm({ nombre: "", descripcion: "" });
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {showForm ? "Cancelar" : "Nuevo Tipo"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded mb-6">
          <div className="mb-4">
            <label className="block font-semibold mb-1">Nombre</label>
            <input
              type="text"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Descripción</label>
            <textarea
              value={form.descripcion}
              onChange={(e) =>
                setForm({ ...form, descripcion: e.target.value })
              }
              className="w-full border px-3 py-2 rounded"
              rows={3}
            />
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
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Descripción</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tipos.map((t) => (
            <tr key={t.id} className="hover:bg-gray-50">
              <td className="border p-2 text-center">{t.id}</td>
              <td className="border p-2">{t.nombre}</td>
              <td className="border p-2">{t.descripcion}</td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => handleEdit(t)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
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

export default Tipos;
