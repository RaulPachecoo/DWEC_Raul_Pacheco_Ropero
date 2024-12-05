class Asignatura {
    #nombre;
    #calificaciones;

    constructor(nombre) {
        this.#nombre = (nombre.match(/^[a-zA-ZáéíóúüÁÉÍÓÚÜ ]+$/)) ? nombre : "Asignatura";
        this.#calificaciones = {}; // Objeto {idEstudiante: [calificaciones]}.
    }

    get nombre() {
        return this.#nombre;
    }
    get calificaciones() {
        return this.#calificaciones;
    }

    set nombre(nuevoNombre) {
        let expNombre = new RegExp(/^[A-Za-z0-9IVXLCDM\s]+$/);
        if (!expNombre.test(nuevoNombre)) {
            throw new Error("El nombre de la asignatura solo puede contener letras, números romanos y espacios.");
        }
        this.#nombre = nuevoNombre.trim();
    }

    calcularPromedio() {
        const todasLasCalificaciones = Object.values(this.#calificaciones).flat();
        if (todasLasCalificaciones.length === 0) {
            return 0;
        }
        const suma = todasLasCalificaciones.reduce((total, calificacion) => total + calificacion, 0);
        return suma / todasLasCalificaciones.length;
    }

    agregarCalificacion(idEstudiante, calificacion) {
        if (calificacion < 0 || calificacion > 10) {
            throw new Error("La calificación debe estar entre 0 y 10.");
        }
        if (!this.#calificaciones[idEstudiante]) {
            this.#calificaciones[idEstudiante] = []; // Inicializa el array si no existe
        }
        this.#calificaciones[idEstudiante].push(calificacion);
    }


    eliminarCalificacion(idEstudiante) {
        if (!this.#calificaciones[idEstudiante]) {
            throw new Error(`No hay calificaciones registradas para el estudiante con ID ${idEstudiante}.`);
        }
        delete this.#calificaciones[idEstudiante];
    }
}