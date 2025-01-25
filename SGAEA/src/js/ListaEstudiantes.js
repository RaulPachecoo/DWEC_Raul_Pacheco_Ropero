import Estudiante from './Estudiante.js';
import EstudianteGraduado from './EstudianteGraduado.js';

/**
 * Clase ListaEstudiantes
 * 
 * Representa una lista de estudiantes, ofreciendo funcionalidades para 
 * gestionar su información, como agregar, eliminar, buscar y generar reportes.
 * 
 * Atributos:
 *  - estudiantes: Una lista que contiene los estudiantes registrados.
 */
class ListaEstudiantes {
    #estudiantes;

    constructor() {
        this.#estudiantes = [];
    }

    get estudiantes() {
        return this.#estudiantes;
    }

    /**
     * Agrega un estudiante a la lista si no existe otro con el mismo ID.
     * 
     * @param {Estudiante} estudiante - El estudiante a agregar.
     * @throws {Error} Si ya existe un estudiante con el mismo ID.
     */
    agregarEstudiante(estudiante) {
        // Comprueba si existe el estudiante recibido por parámetro
        if (this.#estudiantes.find(est => est.id === estudiante.id)) {
            throw new Error(`El estudiante con ID ${estudiante.id} ya existe.`);
        }
        this.#estudiantes.push(estudiante);
    }

    /**
     * Elimina un estudiante de la lista por su ID.
     * 
     * @param {number} idEstudiante - El ID del estudiante a eliminar.
     * @throws {Error} Si no se encuentra un estudiante con el ID especificado.
     */
    eliminarEstudiante(idEstudiante) {
        // Si existe el estudiante cuyo id coincide con el id recibido por parámetro lo asigna a la constante estudiante
        const estudiante = this.#estudiantes.find(est => est.id === idEstudiante);
        if (!estudiante) {
            throw new Error(`El estudiante con ID ${idEstudiante} no se encuentra en la lista.`);
        }
        // Se elimina el estudiante cuyo id coincide con el id recibido por parámetro
        this.#estudiantes = this.#estudiantes.filter(e => e.id !== idEstudiante);
    }

    /**
     * Busca estudiantes cuyo nombre coincida con un patrón.
     * 
     * @param {string} patron - El patrón a buscar (expresión regular).
     * @returns {Estudiante[]} Una lista de estudiantes que coinciden con el patrón.
     */
    buscarEstudiante(patron) {
        // Crea una expresión regular insensible a mayúsculas/minúsculas.
        const regex = new RegExp(patron, "i");
        return this.#estudiantes.filter(e => regex.test(e.nombre));
    }

    /**
     * Busca estudiantes graduados cuyos nombres coincidan con un patrón dado.
     * 
     * @param {string} patron - El patrón a buscar en los nombres de los estudiantes graduados.
     * @returns {EstudianteGraduado[]} Una lista de estudiantes graduados que coinciden con el patrón.
     */
    buscarEstudiantesGraduados(patron) {
        // Crea una expresión regular insensible a mayúsculas/minúsculas.
        const regex = new RegExp(patron, "i");

        // Filtra los estudiantes graduados cuyos nombres coincidan con el patrón.
        return this.#estudiantes.filter(est => est instanceof EstudianteGraduado && regex.test(est.nombre));
    }


    /**
     * Busca un estudiante en la lista por su ID.
     * 
     * @param {number} id - El ID del estudiante a buscar.
     * @returns {Estudiante | undefined} El estudiante encontrado o undefined si no existe.
     */
    buscarEstudiantePorID(id) {
        return this.#estudiantes.find(estudiante => estudiante.id === id);
    }

    /**
     * Busca una asignatura por su nombre y devuelve el promedio de todas las calificaciones
     * de esa asignatura en todos los estudiantes.
     * 
     * @param {string} nombreAsignatura - El nombre de la asignatura a buscar.
     * @returns {number | null} El promedio de la asignatura o `null` si no se encuentra.
     */
    obtenerPromedioAsignatura(nombreAsignatura) {
        // Obtener todas las asignaturas de todos los estudiantes
        const asignaturasPromedio = this.#estudiantes.flatMap(e => e.asignaturas);

        // Filtrar las asignaturas que coinciden con el nombre
        const asignaturasFiltradas = asignaturasPromedio.filter(asig => asig.nombre === nombreAsignatura);

        // Si no se encuentra ninguna asignatura con ese nombre
        if (asignaturasFiltradas.length === 0) {
            return null;
        }

        // Calcular el promedio de las calificaciones para esta asignatura
        const sumaCalificaciones = asignaturasFiltradas.reduce((acc, asig) => acc + asig.calcularPromedio(), 0);
        const promedio = sumaCalificaciones / asignaturasFiltradas.length;

        return promedio;
    }




    /**
     * Calcula el promedio general de todos los estudiantes en la lista.
     * 
     * @returns {number} El promedio general de la lista de estudiantes.
     * @throws {Error} Si no hay estudiantes en la lista.
     */
    calcularPromedioGeneral() {
        // Comprueba si hay estudiantes en la lista
        if (this.#estudiantes.length === 0) {
            return null; // Devuelve null si no hay estudiantes
        }

        let sumaPromedios = 0;
        // Recorre la lista de estudiantes
        for (let i = 0; i < this.#estudiantes.length; i++) {
            // Calcula el promedio de cada estudiante, utilizando el método de la clase Estudiante
            const promedioEstudiante = this.#estudiantes[i].calcularPromedio();
            // Suma el promedio del estudiante a la variable "sumaPromedios"
            sumaPromedios += promedioEstudiante;
        }
        // Devuelve la división de la suma de todos los promedios entre la longitud de la lista de estudiantes
        return sumaPromedios / this.#estudiantes.length;
    }


    /**
     * Genera un reporte detallado de todos los estudiantes en la lista.
     * Incluye información adicional para estudiantes graduados.
     * 
     * @returns {string} Un reporte en formato de texto con la información de los estudiantes.
     */
    generarReporte() {
        let reporte = "";

        this.#estudiantes.forEach(estudiante => {
            const promedioGeneralEstudiante = estudiante.calcularPromedio();

            // Reporte de asignaturas
            let asignaturasReporte = "";
            estudiante.asignaturas.forEach(asignatura => {
                const promedioAsignatura = asignatura.calcularPromedio();
                asignaturasReporte += `  - ${asignatura.nombre}: Promedio ${promedioAsignatura.toFixed(2)}\n`;
            });

            // Si el estudiante es graduado, incluir detalles adicionales
            if (estudiante instanceof EstudianteGraduado) {
                reporte += `Estudiante Graduado: ${estudiante.nombre} (ID: ${estudiante.id})
                    Edad: ${estudiante.edad}
                    Dirección: ${estudiante.direccion.toString()}
                    Título: ${estudiante.titulo}
                    Fecha de Graduación: ${estudiante.fechaGraduacion.toLocaleDateString("es-ES")}
                    Promedio General del Estudiante: ${promedioGeneralEstudiante.toFixed(2)}
                    Asignaturas: 
                    ${asignaturasReporte}\n\n`;
            } else {
                // Reporte estándar para estudiantes regulares
                reporte += `Estudiante: ${estudiante.nombre} (ID: ${estudiante.id})
                    Edad: ${estudiante.edad}
                    Dirección: ${estudiante.direccion.toString()}
                    Promedio General del Estudiante: ${promedioGeneralEstudiante.toFixed(2)}
                    Asignaturas: 
                    ${asignaturasReporte}\n\n`;
            }
        });

        return reporte;
    }

}

export default ListaEstudiantes;
