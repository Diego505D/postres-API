import { Router } from "express";

import {
    getPostres,
    postPostre,
    deletePostre
} from "../controllers/postre.controller.js";

const router = Router();

// Ruta para listar postres.
router.get("/", getPostres);

// Ruta para crear un postre.
router.post("/", postPostre);

// Ruta para eliminar un postre.
router.delete("/:id", deletePostre);

export default router;