class ListaEstudiantes {
    #estudiantes;

    constructor() {
        this.#estudiantes = [];
    }

    get estudiantes() {
        return this.#estudiantes;
    }

    agregarEstudiante(estudiante) {
        if (this.#estudiantes.find(est => est.id === estudiante.id)) {
            throw new Error(`El estudiante con ID ${estudiante.id} ya existe.`);
        }
        this.#estudiantes.push(estudiante);
    }

    eliminarEstudiante(idEstudiante) {
        const estudiante = this.#estudiantes.find(est => est.id === idEstudiante);
        if (!estudiante) {
            throw new Error(`El estudiante con ID ${idEstudiante} no se encuentra en la lista.`);
        }
        this.#estudiantes = this.#estudiantes.filter(e => e.id !== idEstudiante);
    }

    buscarEstudiante(patron) {
        const regex = new RegExp(patron, "i");
        return this.#estudiantes.filter(e => regex.test(e.nombre));
    }

    buscarEstudiantePorID(id) {
        return this.#estudiantes.find(estudiante => estudiante.id === id);
    }


    calcularPromedioGeneral() {
        if (this.#estudiantes.length === 0) {
            throw new Error("No hay estudiantes en la lista para calcular el promedio general.");
        }

        let sumaPromedios = 0;

        for (let i = 0; i < this.#estudiantes.length; i++) {
            const promedioEstudiante = this.#estudiantes[i].calcularPromedio();
            sumaPromedios += promedioEstudiante;
        }

        return sumaPromedios / this.#estudiantes.length;
    }

    generarReporte() {
        let reporte = "";

        this.#estudiantes.forEach(estudiante => {
            const promedioGeneral = estudiante.calcularPromedio();

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
                    Promedio General: ${promedioGeneral.toFixed(2)}
                    Asignaturas: 
                    ${asignaturasReporte}\n\n`;
            } else {
                // Reporte estándar para estudiantes regulares
                reporte += `Estudiante: ${estudiante.nombre} (ID: ${estudiante.id})
                    Edad: ${estudiante.edad}
                    Dirección: ${estudiante.direccion.toString()}
                    Promedio General: ${promedioGeneral.toFixed(2)}
                    Asignaturas: 
                    ${asignaturasReporte}\n\n`;
            }
        });

        return reporte;
    }

}