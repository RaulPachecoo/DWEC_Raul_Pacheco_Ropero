import Estudiante from './Estudiante.js';
import EstudianteGraduado from './EstudianteGraduado.js';
import Direccion from './Direccion.js';
import ListaEstudiantes from './ListaEstudiantes.js';

class GestorPruebas {
    constructor() {
        this.listaEstudiantes = new ListaEstudiantes();
    }

    añadirDatos() {
        // Crear estudiantes con una dirección completa
        const estudiante1 = new Estudiante("Fran Aguilera", 20, new Direccion("Calle Falsa 1", 123, 1, "28001", "Madrid", "Madrid"));
        const estudiante2 = new Estudiante("Raúl Pacheco", 22, new Direccion("Calle Falsa 2", 456, 2, "08002", "Córdoba", "Córdoba"));
        const estudiante3 = new Estudiante("Álvaro Rodríguez", 21, new Direccion("Calle Falsa 3", 789, 3, "50003", "Granada", "Granada"));
        const estudianteGraduado1 = new EstudianteGraduado("Alberto Pacheco", 25, new Direccion("Calle Falsa 4", 839, 5, "14970", "Córdoba", "Iznajar"), "2025-02-21", "DAW");

        // Matricular a los estudiantes en las asignaturas correspondientes
        try {
            estudiante1.matricularAsignatura("Matemáticas");
            estudiante1.matricularAsignatura("Historia");
            estudiante1.matricularAsignatura("Física");
            estudiante1.matricularAsignatura("Inglés");

            estudiante2.matricularAsignatura("Matemáticas");
            estudiante2.matricularAsignatura("Historia");
            estudiante2.matricularAsignatura("Física");
            estudiante2.matricularAsignatura("Inglés");

            estudiante3.matricularAsignatura("Matemáticas");
            estudiante3.matricularAsignatura("Historia");
            estudiante3.matricularAsignatura("Física");
            estudiante3.matricularAsignatura("Inglés");
        } catch (error) {
            console.error("Error al matricular a los estudiantes: ", error);
        }

        // Asignar calificaciones a los estudiantes
        try {
            estudiante1.asignaturas.find(asignatura => asignatura.nombre === "Matemáticas").agregarCalificacion(estudiante1.id, 8.5);
            estudiante1.asignaturas.find(asignatura => asignatura.nombre === "Historia").agregarCalificacion(estudiante1.id, 7.2);
            estudiante1.asignaturas.find(asignatura => asignatura.nombre === "Física").agregarCalificacion(estudiante1.id, 9.0);
            estudiante1.asignaturas.find(asignatura => asignatura.nombre === "Inglés").agregarCalificacion(estudiante1.id, 6.8);

            estudiante2.asignaturas.find(asignatura => asignatura.nombre === "Matemáticas").agregarCalificacion(estudiante2.id, 9.3);
            estudiante2.asignaturas.find(asignatura => asignatura.nombre === "Historia").agregarCalificacion(estudiante2.id, 8.1);
            estudiante2.asignaturas.find(asignatura => asignatura.nombre === "Física").agregarCalificacion(estudiante2.id, 7.8);
            estudiante2.asignaturas.find(asignatura => asignatura.nombre === "Inglés").agregarCalificacion(estudiante2.id, 8.5);

            estudiante3.asignaturas.find(asignatura => asignatura.nombre === "Matemáticas").agregarCalificacion(estudiante3.id, 7.0);
            estudiante3.asignaturas.find(asignatura => asignatura.nombre === "Historia").agregarCalificacion(estudiante3.id, 6.5);
            estudiante3.asignaturas.find(asignatura => asignatura.nombre === "Física").agregarCalificacion(estudiante3.id, 8.3);
            estudiante3.asignaturas.find(asignatura => asignatura.nombre === "Inglés").agregarCalificacion(estudiante3.id, 7.8);
        } catch (error) {
            console.error("Error al asignar calificaciones: ", error);
        }

        // Agregar los estudiantes a la lista
        try {
            this.listaEstudiantes.agregarEstudiante(estudiante1);
            this.listaEstudiantes.agregarEstudiante(estudiante2);
            this.listaEstudiantes.agregarEstudiante(estudiante3);
            this.listaEstudiantes.agregarEstudiante(estudianteGraduado1);
        } catch (error) {
            console.error("Error al agregar estudiantes a la lista: ", error);
        }

        // Caso 1: Añadir Estudiante
        const nombre = "Laura García";
        const edad = 23;
        const direccion = new Direccion("Calle Falsa 5", 123, "1", "30001", "Murcia", "Murcia");
        const nuevoEstudiante = new Estudiante(nombre, edad, direccion);
        this.listaEstudiantes.agregarEstudiante(nuevoEstudiante);
        console.log("Estudiante añadido correctamente.");

        // Caso 2: Añadir Estudiante Graduado
        const nombreGraduado = "Carlos Sánchez";
        const edadGraduado = 26;
        const direccionGraduado = new Direccion("Calle Real 3", 555, "2", "08003", "Barcelona", "Barcelona");
        const fechaGraduacion = new Date("2024-06-15");
        const titulo = "Grado en Ingeniería";
        const nuevoEstudianteGraduado = new EstudianteGraduado(nombreGraduado, edadGraduado, direccionGraduado, fechaGraduacion, titulo);
        this.listaEstudiantes.agregarEstudiante(nuevoEstudianteGraduado);
        console.log("Estudiante graduado añadido correctamente.");

        // Caso 3: Matricular Asignatura
        const idEstudianteMatricular = nuevoEstudiante.id; // Usamos el ID del nuevo estudiante
        const estudianteMatricular = this.listaEstudiantes.buscarEstudiantePorID(idEstudianteMatricular);
        if (estudianteMatricular) {
            const nombreAsignaturaMatricular = "Matemáticas Avanzadas";
            estudianteMatricular.matricularAsignatura(nombreAsignaturaMatricular);
            console.log("Asignatura matriculada correctamente.");
        }

        // Caso 4: Añadir Calificación
        const idEstudianteCalificar = nuevoEstudiante.id; // Usamos el ID del nuevo estudiante
        const estudianteCalificar = this.listaEstudiantes.buscarEstudiantePorID(idEstudianteCalificar);
        if (estudianteCalificar) {
            const nombreAsignaturaCalificar = "Matemáticas Avanzadas"; // La asignatura recién matriculada
            const asignaturaCalificar = estudianteCalificar.buscarAsignatura(nombreAsignaturaCalificar, true);
            if (asignaturaCalificar) {
                const calificacion = 9.5;
                asignaturaCalificar.agregarCalificacion(estudianteCalificar.id, calificacion);
                console.log("Calificación añadida correctamente.");
            }
        }

    }

    eliminarDatos() {
        const idEstudianteEliminar = 1;  // Usamos el ID del estudiante que queremos eliminar
        const estudianteEliminar = this.listaEstudiantes.buscarEstudiantePorID(idEstudianteEliminar);
        if (estudianteEliminar) {
            this.listaEstudiantes.eliminarEstudiante(idEstudianteEliminar);
            console.log("Estudiante eliminado correctamente.");
        } else {
            console.log("No existe ningún estudiante con el ID introducido.");
        }

        // Caso 2: Desmatricular Asignatura
        const idEstudianteDesmatricular = 2; // Usamos el ID del estudiante
        const estudianteDesmatricular = this.listaEstudiantes.buscarEstudiantePorID(idEstudianteDesmatricular);
        if (estudianteDesmatricular) {
            const nombreAsignaturaDesmatricular = "Historia"; // Asignatura que queremos desmatricular
            estudianteDesmatricular.desmatricularAsignatura(nombreAsignaturaDesmatricular);
            console.log("Asignatura desmatriculada correctamente.");
        } else {
            console.log("Estudiante no encontrado.");
        }

        // Caso 3: Eliminar Calificación
        const idEstudianteEliminarCalif = 3; // Usamos el ID del estudiante
        const estudianteEliminarCalif = this.listaEstudiantes.buscarEstudiantePorID(idEstudianteEliminarCalif);
        if (estudianteEliminarCalif) {
            const nombreAsignaturaEliminarCalif = "Física"; // Asignatura para eliminar la calificación
            const asignaturaEliminarCalif = estudianteEliminarCalif.buscarAsignatura(nombreAsignaturaEliminarCalif, true);
            if (asignaturaEliminarCalif) {
                asignaturaEliminarCalif.eliminarCalificacion(estudianteEliminarCalif.id);
                console.log("Calificaciones eliminadas correctamente.");
            } else {
                console.log("Asignatura no encontrada.");
            }
        } else {
            console.log("Estudiante no encontrado.");
        }
    }


    buscarDatos() {
        // Caso 1: Buscar Estudiante
        const patronEstudiante = "Raúl"; // Por ejemplo, buscar por nombre parcial
        const resultadosEstudiantes = this.listaEstudiantes.buscarEstudiante(patronEstudiante);

        if (resultadosEstudiantes.length === 0) {
            console.log("Estudiante no encontrado");
        } else {
            console.log(resultadosEstudiantes.map(est => `ID: ${est.id}, Nombre: ${est.nombre}`).join("\n"));
        }

        // Caso 2: Buscar Estudiante Graduado
        const patronGraduado = "Carlos"; // Buscar por nombre
        const resultadosGraduados = this.listaEstudiantes.buscarEstudiantesGraduados(patronGraduado);

        if (resultadosGraduados.length === 0) {
            console.log("No se encontraron estudiantes graduados que coincidan con el patrón.");
        } else {
            console.log("Estudiantes Graduados Encontrados:\n" +
                resultadosGraduados.map(est => est.toString()).join("\n\n"));
        }

        // Caso 3: Buscar Asignatura
        const idEstudianteBuscarAsig = 2; // Usamos el ID del estudiante
        const estudianteBuscarAsig = this.listaEstudiantes.buscarEstudiantePorID(idEstudianteBuscarAsig);
        if (!estudianteBuscarAsig) {
            console.log("Estudiante no encontrado.");
            return;
        }

        const patronAsignatura = "Física"; // Buscar asignaturas por nombre
        const resultadosAsignaturas = estudianteBuscarAsig.buscarAsignatura(patronAsignatura);
        if (resultadosAsignaturas.length === 0) {
            console.log("No se encontraron asignaturas que coincidan con el patrón.");
        } else {
            console.log("Asignaturas encontradas:\n" + resultadosAsignaturas.map(asig => asig.nombre).join("\n"));
        }
    }
   

    calcularPromedios() {

        // Caso 1: Promedio por Estudiante
        const idEstudiantePromedio = 2; // Usamos el ID del estudiante
        const estudiantePromedio = this.listaEstudiantes.buscarEstudiantePorID(idEstudiantePromedio);

        if (!estudiantePromedio) {
            console.log("Estudiante no encontrado.");
        } else {
            try {
                const promedio = estudiantePromedio.calcularPromedio();
                console.log(`Promedio del estudiante ${estudiantePromedio.nombre}: ${promedio.toFixed(2)}`);
            } catch (error) {
                console.error(`Error al calcular el promedio: ${error.message}`);
            }
        }

        // Caso 2: Promedio por Asignatura
        const nombreAsignaturaPromedio = "Matemáticas"; // Ejemplo de asignatura
        const promedioAsignatura = this.listaEstudiantes.obtenerPromedioAsignatura(nombreAsignaturaPromedio);

        if (promedioAsignatura === null) {
            console.log("Asignatura no encontrada.");
        } else {
            console.log(`Promedio de la asignatura ${nombreAsignaturaPromedio}: ${promedioAsignatura.toFixed(2)}`);
        }

        // Caso 3: Promedio General
        const promedioGeneral = this.listaEstudiantes.calcularPromedioGeneral();
        if (promedioGeneral === null) {
            console.log("No hay estudiantes en la lista para calcular el promedio general.");
        } else {
            console.log(`Promedio general: ${promedioGeneral.toFixed(2)}`);
        }

    }

    realizarPruebas(){
        this.añadirDatos(); 
        this.eliminarDatos();
        this.buscarDatos(); 
        this.calcularPromedios();  
    }

}


export default GestorPruebas;