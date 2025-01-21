import Asignatura from './Asignatura.js';

/**
 * Clase Estudiante
 * Atributos:
 *  - id: Identificador único del estudiante (autogenerado).
 *  - nombre: Nombre del estudiante. Se valida que solo contenga letras y espacios.
 *  - edad: Edad del estudiante. Debe ser un número entero positivo.
 *  - direccion: Dirección del estudiante (puede ser cualquier tipo de dato).
 *  - asignaturas: Lista de asignaturas en las que está inscrito el estudiante.
 *  - matriculas: Registro de matriculación de asignaturas. Formato: {nombreAsignatura: {estado, fecha}}.
 */

class Estudiante {
    static contadorID = 1; // Contador estático para generar IDs únicos.

    #id;
    #nombre;
    #edad;
    #direccion;
    #asignaturas;
    #matriculas;

    constructor(nombre, edad, direccion) {
        this.#id = Estudiante.contadorID++;
        this.#nombre = (nombre != null) ? ((nombre.match(/^[a-zA-ZáéíóúüÁÉÍÓÚÜ\s]+$/)) ? nombre : "Alumno") : "Alumno";
        this.#edad = (!Number.isNaN(edad) && Number.isInteger(edad) && edad > 0) ? edad : 0; // Se comprueba que que sea entero 
        this.#direccion = direccion;
        this.#asignaturas = [];
        this.#matriculas = {}; // Objeto {nombreAsignatura: {estado: "matriculado/desmatriculado", fecha: Date}}.
    }

    get id() {
        return this.#id;
    }

    get nombre() {
        return this.#nombre;
    }

    get edad() {
        return this.#edad;
    }

    get asignaturas() {
        return this.#asignaturas;
    }

    get matriculas() {
        return this.#matriculas;
    }

    get direccion() {
        return this.#direccion;
    }

    /**
     * Matricula al estudiante en una asignatura.
     * Si el estudiante ya está matriculado, lanza un error.
     * Si la asignatura existe como desmatriculada, la reactiva.
     * 
     * @param {string} nombreAsignatura - El nombre de la asignatura a matricular.
     * @throws {Error} Si el estudiante ya está matriculado en la asignatura.
     */
    matricularAsignatura(nombreAsignatura) {
        const fechaActual = new Date().toLocaleDateString('es-ES');
        // Comprueba si la asignatura esta matriculada
        if (!this.#matriculas[nombreAsignatura]) {
            // Si no esta matriculada la añade a la lista de matrículas
            this.#matriculas[nombreAsignatura] = {
                estado: "matriculado",
                fecha: fechaActual,
            };

            // Crear y agregar una instancia de la asignatura al estudiante
            const nuevaAsignatura = new Asignatura(nombreAsignatura);
            this.#asignaturas.push(nuevaAsignatura);

            // Inicializar calificaciones del estudiante en la nueva asignatura
            nuevaAsignatura.calificaciones[this.id] = [];
        } else if (this.#matriculas[nombreAsignatura].estado === "matriculado") {
            throw new Error(`El estudiante ya está matriculado en la asignatura ${nombreAsignatura}.`);
        } else {
            // Si la asignatura esta en la lista, pero está en estado "desmatriculado" la cambia a "matriculado"
            this.#matriculas[nombreAsignatura] = {
                estado: "matriculado",
                fecha: fechaActual,
            };

            // Asegurar que la asignatura está en la lista de asignaturas, si no está la añade
            if (!this.#asignaturas.some(asig => asig.nombre === nombreAsignatura)) {
                const nuevaAsignatura = new Asignatura(nombreAsignatura);
                this.#asignaturas.push(nuevaAsignatura);
            }
        }
    }

    /**
     * Desmatricula al estudiante de una asignatura.
     * Lanza un error si la asignatura no existe o ya está desmatriculada.
     * 
     * @param {string} nombreAsignatura - El nombre de la asignatura a desmatricular.
     * @throws {Error} Si el estudiante no está matriculado o ya está desmatriculado.
     */
    desmatricularAsignatura(nombreAsignatura) {
        const fechaActual = new Date().toLocaleDateString('es-ES');
        // Comprueba si la asignatura esta en la lista
        if (!this.#matriculas[nombreAsignatura]) {
            throw new Error(`El estudiante no está matriculado en la asignatura ${nombreAsignatura}.`);
        }
        // Comprueba si la asignatura ya esta desmatriculada
        if (this.#matriculas[nombreAsignatura].estado === "desmatriculado") {
            throw new Error(`El estudiante ya está desmatriculado de la asignatura ${nombreAsignatura}.`);
        }
        // Cambia el estado de la asignatura a desmatriculado
        this.#matriculas[nombreAsignatura] = {
            estado: "desmatriculado",
            fecha: fechaActual,
        };
    }

    /**
     * Calcula el promedio general de todas las asignaturas del estudiante.
     * Lanza un error si alguna asignatura no tiene calificaciones.
     * 
     * @returns {number} El promedio general del estudiante.
     * @throws {Error} Si alguna asignatura no tiene calificaciones.
     */
    calcularPromedio() {
        let sumaPromedios = 0;
        let contadorAsignaturas = 0;

        // Recorre la lista de asignaturas
        for (let i = 0; i < this.#asignaturas.length; i++) {
            const asignatura = this.#asignaturas[i];
            const calificaciones = asignatura.calificaciones[this.id];

            // Verificar si calificaciones está definido y es un array con elementos
            if (Array.isArray(calificaciones) && calificaciones.length > 0) {
                let sumaCalificaciones = 0;

                // Sumar las calificaciones de la asignatura
                for (let j = 0; j < calificaciones.length; j++) {
                    sumaCalificaciones += calificaciones[j];
                }

                // Calcular el promedio de la asignatura
                const promedioAsignatura = sumaCalificaciones / calificaciones.length;
                sumaPromedios += promedioAsignatura;
                contadorAsignaturas++;
            }
        }

        // Si no se encontraron asignaturas con calificaciones, se retorna 0
        if (contadorAsignaturas === 0) {
            return 0;
        }

        // Retornar el promedio general
        return sumaPromedios / contadorAsignaturas;
    }




    /**
     * Busca asignaturas que coincidan con un patrón dado.
     * 
     * @param {string} patron - El patrón de búsqueda (expresión regular).
     * @returns {Asignatura[]} Una lista con las asignaturas que coincidan.
     */
    buscarAsignatura(patron) {
        // Crea una expresión regular insensible a mayúsculas/minúsculas.
        const regex = new RegExp(patron, "i");
        // Devuelve la asignatura que coincida con el patron recibido por parámetro
        return this.#asignaturas.filter(asignatura => regex.test(asignatura.nombre));
    }
}


export default Estudiante;
