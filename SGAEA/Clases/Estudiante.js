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
        this.#nombre = (nombre != null) ? ((nombre.match(/^[a-zA-ZáéíóúüÁÉÍÓÚÜ ]+$/)) ? nombre : "Alumno") : "Alumno";
        this.#edad = (!Number.isNaN(edad) && Number.isInteger(edad) && edad > 0) ? edad : 0;
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

    matricularAsignatura(nombreAsignatura) {
        if (!this.#matriculas[nombreAsignatura]) {
            this.#matriculas[nombreAsignatura] = {
                estado: "matriculado",
                fecha: new Date(),
            };

            // Crear y agregar una instancia de la asignatura al estudiante
            const nuevaAsignatura = new Asignatura(nombreAsignatura);
            this.#asignaturas.push(nuevaAsignatura);
        } else if (this.#matriculas[nombreAsignatura].estado === "matriculado") {
            throw new Error(`El estudiante ya está matriculado en la asignatura ${nombreAsignatura}.`);
        } else {
            this.#matriculas[nombreAsignatura] = {
                estado: "matriculado",
                fecha: new Date(),
            };

            // Asegurar que la asignatura está en la lista de asignaturas
            if (!this.#asignaturas.some(asig => asig.nombre === nombreAsignatura)) {
                const nuevaAsignatura = new Asignatura(nombreAsignatura);
                this.#asignaturas.push(nuevaAsignatura);
            }
        }
    }


    desmatricularAsignatura(nombreAsignatura) {
        if (!this.#matriculas[nombreAsignatura]) {
            throw new Error(`El estudiante no está matriculado en la asignatura ${nombreAsignatura}.`);
        }
        if (this.#matriculas[nombreAsignatura].estado === "desmatriculado") {
            throw new Error(`El estudiante ya está desmatriculado de la asignatura ${nombreAsignatura}.`);
        }
        this.#matriculas[nombreAsignatura] = {
            estado: "desmatriculado",
            fecha: new Date(),
        };
    }

    calcularPromedio() {

        let sumaPromedios = 0;
        let contadorAsignaturas = 0;

        for (let i = 0; i < this.#asignaturas.length; i++) {
            const asignatura = this.#asignaturas[i];
            const calificaciones = asignatura.calificaciones[this.id];


            if (calificaciones.length === 0) {
                throw new Error(`No hay calificaciones para el estudiante ID ${this.id} en la asignatura ${asignatura.nombre}`);
            } else {
                let sumaCalificaciones = 0;
                for (let j = 0; j < calificaciones.length; j++) {
                    sumaCalificaciones += calificaciones[j];
                }
                const promedioAsignatura = sumaCalificaciones / calificaciones.length;
                sumaPromedios += promedioAsignatura;
                contadorAsignaturas++;
            }
        }

        if (contadorAsignaturas === 0) {
            console.log("No se encontraron asignaturas con calificaciones.");
            return 0;
        }

        const promedioGeneral = sumaPromedios / contadorAsignaturas;
        return promedioGeneral;
    }


    buscarAsignatura(patron) {
        const regex = new RegExp(patron, "i");
        return this.#asignaturas.filter(asignatura => regex.test(asignatura.nombre));
    }
}