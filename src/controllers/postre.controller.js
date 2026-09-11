import {
    listarPostres,
    crearPostre,
    eliminarPostre
} from "../services/postre.service.js";

// Controlador para obtener todos los postres.
export const getPostres = (req, res) => {

    const postres = listarPostres();

    res.json(postres);
};


// Controlador para crear un postre.
export const postPostre = (req, res) => {

    try {

        const postre = crearPostre(req.body);

        res.status(201).json(postre);

    } catch (error) {

        res.status(400).json({
            mensaje: error.message
        });
    }
};


// Controlador para eliminar un postre.
export const deletePostre = (req, res) => {

    try {

        const id = Number(req.params.id);

        eliminarPostre(id);

        res.json({
            mensaje: "Postre eliminado correctamente"
        });

    } catch (error) {

        res.status(404).json({
            mensaje: error.message
        });
    }
};