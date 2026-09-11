const listaPostres = document.getElementById("listaPostres");

const formulario = document.getElementById("formPostre");

const mensaje = document.getElementById("mensaje");


// Obtener los postres de la API.
const cargarPostres = async () => {

    try {

        const respuesta = await fetch("/postres");

        if (!respuesta.ok) {
            throw new Error("No se pudieron cargar los postres");
        }

        const postres = await respuesta.json();

        mostrarPostres(postres);

    } catch (error) {

        mostrarMensaje(error.message, false);

    }
};


// Mostrar los postres en tarjetas.
const mostrarPostres = (postres) => {

    listaPostres.innerHTML = "";

    postres.forEach((postre) => {

        const tarjeta = document.createElement("article");


        tarjeta.className =
            "rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl transition hover:-translate-y-1 hover:border-amber-400/50";


        tarjeta.innerHTML = `

            <div class="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-amber-400 text-2xl">
                🍰
            </div>

            <p class="text-sm text-amber-400">
                ${postre.categoria}
            </p>

            <h3 class="mt-2 text-2xl font-bold">
                ${postre.nombre}
            </h3>

            <p class="mt-5 text-2xl font-bold text-white">
                $${Number(postre.precio).toLocaleString("es-CO")}
            </p>

            <button
                class="mt-5 w-full rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-red-400 transition hover:bg-red-500/20"
                onclick="eliminarPostre(${postre.id})"
            >
                Eliminar
            </button>

        `;


        listaPostres.appendChild(tarjeta);

    });
};


// Crear un nuevo postre.
formulario.addEventListener("submit", async (evento) => {

    evento.preventDefault();


    const nombre = document.getElementById("nombre").value.trim();

    const categoria = document.getElementById("categoria").value;

    const precio = Number(document.getElementById("precio").value);


    // Validación antes de enviar a la API.
    if (!nombre) {

        mostrarMensaje(
            "El nombre del postre es obligatorio",
            false
        );

        return;
    }


    if (!categoria) {

        mostrarMensaje(
            "El tipo de postre es obligatorio",
            false
        );

        return;
    }


    if (precio <= 0) {

        mostrarMensaje(
            "El precio debe ser mayor que cero",
            false
        );

        return;
    }


    try {

        const respuesta = await fetch("/postres", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                nombre,
                categoria,
                precio
            })

        });


        const datos = await respuesta.json();


        if (!respuesta.ok) {

            throw new Error(
                datos.mensaje || "Error al crear el postre"
            );

        }


        mostrarMensaje(
            "Postre creado correctamente",
            true
        );


        formulario.reset();


        cargarPostres();


    } catch (error) {

        mostrarMensaje(
            error.message,
            false
        );

    }

});


// Elimina un postre de la API.
const eliminarPostre = async (id) => {

    const confirmar = confirm(
        "¿Seguro que quieres eliminar este postre?"
    );


    if (!confirmar) {
        return;
    }


    try {

        const respuesta = await fetch(`/postres/${id}`, {

            method: "DELETE"

        });


        const datos = await respuesta.json();


        if (!respuesta.ok) {

            throw new Error(
                datos.mensaje || "No se pudo eliminar el postre"
            );

        }


        mostrarMensaje(
            "Postre eliminado correctamente",
            true
        );


        cargarPostres();


    } catch (error) {

        mostrarMensaje(
            error.message,
            false
        );

    }

};


// Mostrar mensajes al usuario.
const mostrarMensaje = (texto, correcto) => {

    mensaje.textContent = texto;


    mensaje.classList.remove(

        "hidden",

        "bg-green-500/10",

        "text-green-400",

        "bg-red-500/10",

        "text-red-400"

    );


    if (correcto) {

        mensaje.classList.add(

            "bg-green-500/10",

            "text-green-400"

        );

    } else {

        mensaje.classList.add(

            "bg-red-500/10",

            "text-red-400"

        );

    }

};


// Cargar los postres cuando inicia la página.
cargarPostres();