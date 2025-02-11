/**
 * Clase Asignatura
 * 
 *
 * Atributos:
 *  - nombre: El nombre de la asignatura.
 *  - calificaciones: Un objeto que almacena las calificaciones de los estudiantes, donde la clave es el ID del estudiante
 *                    y el valor es una lista con las calificaciones del estudiante.
 */
class Asignatura {
    #nombre;
    #calificaciones;

    constructor(nombre) {
        this.#nombre = (nombre.match(/^[a-zA-ZáéíóúüÁÉÍÓÚÜ IVXLCDMivxlcdm]+$/)) ? nombre : "Asignatura";
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

    /**
     * Calcula el promedio de todas las calificaciones de la asignatura.
     * 
     * @returns {number} El promedio de las calificaciones, o 0 si no hay calificaciones.
     */
    calcularPromedio() {
        // Obtiene todas las calificaciones de los estudiantes
        const todasLasCalificaciones = Object.values(this.#calificaciones).flat();

        // Si no hay calificaciones, retorna 0
        if (todasLasCalificaciones.length === 0) {
            return 0;
        }

        // Suma todas las calificaciones y calcula el promedio
        const suma = todasLasCalificaciones.reduce((total, calificacion) => total + calificacion, 0);
        return suma / todasLasCalificaciones.length;
    }

    /**
     * Agrega una calificación para un estudiante en la asignatura.
     * 
     * @param {number} idEstudiante - El ID del estudiante al que se le asignará la calificación.
     * @param {number} calificacion - La calificación a agregar (debe estar entre 0 y 10).
     * @throws {Error} Si la calificación no está en el rango de 0 a 10.
     */
    agregarCalificacion(idEstudiante, calificacion) {
        if (calificacion < 0 || calificacion > 10) {
            throw new Error("La calificación debe estar entre 0 y 10.");
        }
        if (!this.#calificaciones[idEstudiante]) {
            this.#calificaciones[idEstudiante] = []; // Inicializa el array de calificaciones si no existe
        }
        this.#calificaciones[idEstudiante].push(calificacion);
    }

    /**
     * Elimina todas las calificaciones asociadas a un estudiante en la asignatura.
     * 
     * @param {number} idEstudiante - El ID del estudiante cuyas calificaciones se eliminarán.
     * @throws {Error} Si no existen calificaciones registradas para el estudiante especificado.
     */
    eliminarCalificacion(idEstudiante) {
        if (!this.#calificaciones[idEstudiante]) {
            throw new Error(`No hay calificaciones registradas para el estudiante con ID ${idEstudiante}.`);
        }
        delete this.#calificaciones[idEstudiante];
    }
}

export default Asignatura;
