import React, { useEffect, useState } from "react";
import {
  getMedias,
  createMedia,
  updateMedia,
  deleteMedia,
} from "../services/mediaService";
import { getGeneros } from "../services/generoService";
import { getDirectores } from "../services/directorService";
import { getProductoras } from "../services/productoraService";
import { getTipos } from "../services/tipoService";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function Medias() {
  const [medias, setMedias] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    serial: "",
    titulo: "",
    sinopsis: "",
    url: "",
    imagen_portada: "",
    anio_estreno: "",
    genero_id: "",
    director_id: "",
    productora_id: "",
    tipo_id: "",
  });

  useEffect(() => {
    cargarTodo();
  }, []);

  const cargarTodo = async () => {
    const [m, g, d, p, t] = await Promise.all([
      getMedias(),
      getGeneros(),
      getDirectores(),
      getProductoras(),
      getTipos(),
    ]);
    setMedias(m.data);
    setGeneros(g.data.filter((x) => x.estado === "activo"));
    setDirectores(d.data.filter((x) => x.estado === "activo"));
    setProductoras(p.data.filter((x) => x.estado === "activo"));
    setTipos(t.data);
  };

  const resetForm = () => {
    setForm({
      serial: "",
      titulo: "",
      sinopsis: "",
      url: "",
      imagen_portada: "",
      anio_estreno: "",
      genero_id: "",
      director_id: "",
      productora_id: "",
      tipo_id: "",
    });
    setEditId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...form,
      genero_id: parseInt(form.genero_id),
      director_id: parseInt(form.director_id),
      productora_id: parseInt(form.productora_id),
      tipo_id: parseInt(form.tipo_id),
      anio_estreno: parseInt(form.anio_estreno),
    };
    if (editId) {
      await updateMedia(editId, data);
    } else {
      await createMedia(data);
    }
    resetForm();
    cargarTodo();
  };

  const handleEdit = (media) => {
    setForm({
      serial: media.serial,
      titulo: media.titulo,
      sinopsis: media.sinopsis,
      url: media.url,
      imagen_portada: media.imagen_portada,
      anio_estreno: media.anio_estreno,
      genero_id: media.genero_id,
      director_id: media.director_id,
      productora_id: media.productora_id,
      tipo_id: media.tipo_id,
    });
    setEditId(media.id);
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
            await deleteMedia(id);
            cargarTodo();
          },
        },
        {
          label: "Cancelar",
        },
      ],
    });
  };

  const campo = (label, name, type = "text", required = false) => (
    <div>
      <label className="block font-semibold mb-1">{label}</label>
      <input
        type={type}
        value={form[name]}
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
        className="w-full border px-3 py-2 rounded"
        required={required}
      />
    </div>
  );

  const select = (label, name, opciones, labelKey, required = false) => (
    <div>
      <label className="block font-semibold mb-1">{label}</label>
      <select
        value={form[name]}
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
        className="w-full border px-3 py-2 rounded"
        required={required}
      >
        <option value="">Seleccione...</option>
        {opciones.map((o) => (
          <option key={o.id} value={o.id}>
            {o[labelKey]}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Peliculas y Series</h1>
        <button
          onClick={() => {
            if (showForm) {
              resetForm();
            } else {
              setShowForm(true);
            }
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {showForm ? "Cancelar" : "Nueva Produccion"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 p-4 rounded mb-6 grid grid-cols-2 gap-4"
        >
          {campo("Serial", "serial", "text", true)}
          {campo("Titulo", "titulo", "text", true)}
          <div className="col-span-2">
            <label className="block font-semibold mb-1">Sinopsis</label>
            <textarea
              value={form.sinopsis}
              onChange={(e) => setForm({ ...form, sinopsis: e.target.value })}
              className="w-full border px-3 py-2 rounded"
              rows={3}
            />
          </div>
          {campo("URL", "url", "text", true)}
          {campo("Imagen Portada", "imagen_portada")}
          {campo("Año Estreno", "anio_estreno", "number")}
          {select("Genero", "genero_id", generos, "nombre", true)}
          {select("Director", "director_id", directores, "nombres", true)}
          {select("Productora", "productora_id", productoras, "nombre", true)}
          {select("Tipo", "tipo_id", tipos, "nombre", true)}
          <div className="col-span-2">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {editId ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </form>
      )}

      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-900 text-white">
          <tr>
            <th className="border p-2">Serial</th>
            <th className="border p-2">Titulo</th>
            <th className="border p-2">Año</th>
            <th className="border p-2">Genero</th>
            <th className="border p-2">Director</th>
            <th className="border p-2">Productora</th>
            <th className="border p-2">Tipo</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {medias.map((m) => (
            <tr key={m.id} className="hover:bg-gray-50">
              <td className="border p-2">{m.serial}</td>
              <td className="border p-2">{m.titulo}</td>
              <td className="border p-2 text-center">{m.anio_estreno}</td>
              <td className="border p-2">{m.genero}</td>
              <td className="border p-2">{m.director}</td>
              <td className="border p-2">{m.productora}</td>
              <td className="border p-2">{m.tipo}</td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => handleEdit(m)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(m.id)}
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

export default Medias;
