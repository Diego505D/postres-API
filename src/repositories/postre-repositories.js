// Lista donde vamos a guardar nuestros postres.
const postres = [
    {
        id: 1,
        nombre: "Tres Leches",
        precio: 8000,
        categoria: "Pastel"
    },
    {
        id: 2,
        nombre: "Tres leches de Fresa",
        precio: 10000,
        categoria: "Cheesecake"
    }
];

// Obtiene todos los postres.
export const obtenerTodos = () => {
    return postres;
};

// Guarda un nuevo postre.
export const guardar = (postre) => {
    postres.push(postre);
    return postre;
};