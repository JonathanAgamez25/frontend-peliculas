import React, { useEffect, useState } from "react";
import {
  getGeneros,
  createGenero,
  updateGenero,
  deleteGenero,
} from "../services/generoService";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function Generos() {
  const [generos, setGeneros] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    estado: "activo",
    descripcion: "",
  });
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    cargarGeneros();
  }, []);

  const cargarGeneros = async () => {
    const res = await getGeneros();
    setGeneros(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateGenero(editId, form);
    } else {
      await createGenero(form);
    }
    setForm({ nombre: "", estado: "activo", descripcion: "" });
    setEditId(null);
    setShowForm(false);
    cargarGeneros();
  };

  const handleEdit = (genero) => {
    setForm({
      nombre: genero.nombre,
      estado: genero.estado,
      descripcion: genero.descripcion,
    });
    setEditId(genero.id);
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
            await deleteGenero(id);
            cargarGeneros();
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
        <h1 className="text-2xl font-bold">Géneros</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditId(null);
            setForm({ nombre: "", estado: "activo", descripcion: "" });
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {showForm ? "Cancelar" : "Nuevo Género"}
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
            <th className="border p-2">Estado</th>
            <th className="border p-2">Descripción</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {generos.map((g) => (
            <tr key={g.id} className="hover:bg-gray-50">
              <td className="border p-2 text-center">{g.id}</td>
              <td className="border p-2">{g.nombre}</td>
              <td className="border p-2 text-center">
                <span
                  className={`px-2 py-1 rounded text-white text-sm ${g.estado === "activo" ? "bg-green-500" : "bg-red-500"}`}
                >
                  {g.estado}
                </span>
              </td>
              <td className="border p-2">{g.descripcion}</td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => handleEdit(g)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(g.id)}
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

export default Generos;
