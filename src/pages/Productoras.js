import React, { useEffect, useState } from "react";
import {
  getProductoras,
  createProductora,
  updateProductora,
  deleteProductora,
} from "../services/productoraService";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function Productoras() {
  const [productoras, setProductoras] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    estado: "activo",
    slogan: "",
    descripcion: "",
  });
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    cargarProductoras();
  }, []);

  const cargarProductoras = async () => {
    const res = await getProductoras();
    setProductoras(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateProductora(editId, form);
    } else {
      await createProductora(form);
    }
    setForm({ nombre: "", estado: "activo", slogan: "", descripcion: "" });
    setEditId(null);
    setShowForm(false);
    cargarProductoras();
  };

  const handleEdit = (productora) => {
    setForm({
      nombre: productora.nombre,
      estado: productora.estado,
      slogan: productora.slogan,
      descripcion: productora.descripcion,
    });
    setEditId(productora.id);
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
            await deleteProductora(id);
            cargarProductoras();
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
        <h1 className="text-2xl font-bold">Productoras</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditId(null);
            setForm({
              nombre: "",
              estado: "activo",
              slogan: "",
              descripcion: "",
            });
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {showForm ? "Cancelar" : "Nueva Productora"}
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
            <label className="block font-semibold mb-1">Slogan</label>
            <input
              type="text"
              value={form.slogan}
              onChange={(e) => setForm({ ...form, slogan: e.target.value })}
              className="w-full border px-3 py-2 rounded"
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
            <th className="border p-2">Estado</th>
            <th className="border p-2">Slogan</th>
            <th className="border p-2">Descripción</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productoras.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="border p-2 text-center">{p.id}</td>
              <td className="border p-2">{p.nombre}</td>
              <td className="border p-2 text-center">
                <span
                  className={`px-2 py-1 rounded text-white text-sm ${p.estado === "activo" ? "bg-green-500" : "bg-red-500"}`}
                >
                  {p.estado}
                </span>
              </td>
              <td className="border p-2">{p.slogan}</td>
              <td className="border p-2">{p.descripcion}</td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => handleEdit(p)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
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

export default Productoras;
