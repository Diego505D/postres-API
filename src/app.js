import express from "express";
import postreRoutes from "./routes/postre.routes.js";

const app = express();

// Permite recibir información en formato JSON.
app.use(express.json());

// Permite mostrar los archivos de la carpeta public.
app.use(express.static("public"));

// Registramos las rutas de postres.
app.use("/postres", postreRoutes);

// Iniciamos el servidor.
app.listen(3000, () => {
    console.log("Servidor ejecutándose en http://localhost:3000");
});