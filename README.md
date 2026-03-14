# 🎬 Frontend - Plataforma de Películas y Series

**IU Digital de Antioquia | Proyecto Integrado 2**  
**Docente:** Federico Henao  
**Estudiante:** Jonatan D. Ávila Agamez  
**Período:** 2026-1

---

## 📋 Descripción del proyecto

Aplicación web desarrollada con ReactJS que permite gestionar una plataforma de películas y series. Se comunica con una API REST desarrollada en NodeJS para realizar operaciones CRUD sobre los módulos de Géneros, Directores, Productoras, Tipos y Media (Películas y Series).

---

## 🛠️ Tecnologías usadas

- **ReactJS** - Librería principal para la interfaz de usuario
- **Tailwind CSS** - Estilos y diseño responsive
- **Axios** - Comunicación con la API REST
- **React Router DOM** - Navegación entre páginas
- **React Confirm Alert** - Alertas de confirmación

---

## ✅ Requisitos previos

- Node.js v18 o superior
- npm v9 o superior
- API REST de películas corriendo en `http://localhost:3000`

---

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/JonathanAgamez25/frontend-peliculas.git
```

2. Entra a la carpeta del proyecto:
```bash
cd frontend-peliculas
```

3. Instala las dependencias:
```bash
npm install
```

---

## ▶️ Cómo ejecutar el frontend

1. Asegúrate de que la API REST esté corriendo en `http://localhost:3000`

2. Ejecuta el frontend en el puerto 3001:
```bash
# En PowerShell
$env:PORT=3001
npm start
```

3. Abre el navegador en `http://localhost:3001`

---

## 📱 Módulos de la aplicación

### 🎭 Géneros
Permite crear, editar, eliminar y listar los géneros cinematográficos. Cada género tiene nombre, descripción y estado (activo/inactivo).

### 🎥 Directores
Gestión completa de directores de cine. Incluye nombre y estado (activo/inactivo).

### 🏢 Productoras
Administración de productoras cinematográficas. Incluye nombre, slogan, descripción y estado (activo/inactivo).

### 📂 Tipos
Gestión de tipos de producción (Película, Serie). Incluye nombre y descripción.

### 🎬 Películas y Series (Media)
Módulo principal que permite registrar producciones cinematográficas con los siguientes campos:
- Serial único
- Título
- Sinopsis
- URL
- Imagen de portada
- Año de estreno
- Género, Director, Productora y Tipo asociados

---

## 🔗 Repositorio del Backend

La API REST que consume este frontend se encuentra en:  
👉 https://github.com/JonathanAgamez25/api-peliculas
