import {
    obtenerTodos,
    guardar,
    eliminar
} from "../repositories/postre.repository.js";

// Obtiene la lista de postres.
export const listarPostres = () => {

    return obtenerTodos();
};


// Registra un nuevo postre.
export const crearPostre = (datos) => {

    // Validamos que el nombre sea obligatorio.
    if (!datos.nombre) {
        throw new Error("El nombre del postre es obligatorio");
    }

    // Validamos que el tipo sea obligatorio.
    if (!datos.categoria) {
        throw new Error("El tipo de postre es obligatorio");
    }

    // Validamos que el precio sea mayor que cero.
    if (datos.precio <= 0) {
        throw new Error("El precio debe ser mayor que cero");
    }

    const nuevoPostre = {

        id: Date.now(),

        nombre: datos.nombre,

        precio: datos.precio,

        categoria: datos.categoria
    };

    return guardar(nuevoPostre);
};


// Elimina un postre.
export const eliminarPostre = (id) => {

    const eliminado = eliminar(id);

    if (!eliminado) {
        throw new Error("El postre no existe");
    }

    return true;
};