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

    obtenerRegistroMatriculas() {
        let resultado = "";

        for (const asignatura in this.#matriculas) {
            if (this.#matriculas.hasOwnProperty(asignatura)) {
                const { estado, fecha } = this.#matriculas[asignatura];

                const fechaFormateada = fecha.toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                });

                resultado += `Asignatura: ${asignatura}, Estado: ${estado}, Fecha: ${fechaFormateada}\n`;
            }
        }

        return resultado;
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

class EstudianteGraduado extends Estudiante {
    #fechaGraduacion;
    #titulo;

    constructor(nombre, edad, direccion, fechaGraduacion, titulo) {
        super(nombre, edad, direccion); // Llama al constructor de la clase base
        this.#fechaGraduacion = fechaGraduacion instanceof Date ? fechaGraduacion : new Date();
        this.#titulo = titulo ? titulo : "Sin título";
    }

    get fechaGraduacion() {
        return this.#fechaGraduacion;
    }

    get titulo() {
        return this.#titulo;
    }

    set fechaGraduacion(fecha) {
        if (!(fecha instanceof Date)) {
            throw new Error("La fecha de graduación debe ser una instancia de Date.");
        }
        this.#fechaGraduacion = fecha;
    }

    set titulo(nuevoTitulo) {
        if (typeof nuevoTitulo !== "string" || nuevoTitulo.trim() === "") {
            throw new Error("El título debe ser una cadena de texto no vacía.");
        }
        this.#titulo = nuevoTitulo.trim();
    }

    toString() {
        return `Estudiante Graduado: ${this.nombre} (ID: ${this.id})
            Edad: ${this.edad}
            Dirección: ${this.direccion.toString()}
            Título: ${this.#titulo}
            Fecha de Graduación: ${this.#fechaGraduacion.toLocaleDateString("es-ES")}`;
    }
}


class Direccion {
    #calle;
    #numero;
    #piso;
    #codigoPostal;
    #provincia;
    #localidad;

    constructor(calle, numero, piso, codigoPostal, provincia, localidad) {
        this.#calle = calle;
        this.#numero = numero;
        this.#piso = piso;
        this.#codigoPostal = (new String(codigoPostal).match(/^[0-9]{5}$/)) ? codigoPostal : "00000";
        this.#provincia = provincia;
        this.#localidad = localidad;
    }

    get calle() {
        return this.#calle;
    }

    get numero() {
        return this.#numero;
    }

    get piso() {
        return this.#piso;
    }

    get codigoPostal() {
        return this.#codigoPostal;
    }

    get provincia() {
        return this.#provincia;
    }

    get localidad() {
        return this.#localidad;
    }

    toString() {
        return `Calle ${this.#calle} ${this.#numero}, Piso ${this.#piso}, ${this.#codigoPostal} - ${this.#provincia}, ${this.#localidad}`;
    }
}

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


function mostrarMenuPrincipal() {
    let regex = /^\d+$/;
    let opcion = prompt(`Elije sobre que objeto quieres operar:
            1- Añadir
            2- Eliminar
            3- Buscar
            4- Calcular Promedio
            5- Generar Reporte
            6- Salir
    `);

    return parseInt(opcion);
}


function mostrarMenuAñadir() {
    let regex = /^\d+$/;
    let opcion = prompt(`Elije que operación quieres realizar:
        1- Añadir Estudiante
        2- Añadir Estudiante Graduado
        3- Matricular Asignatura
        4- Agregar Calificación
        5- Atrás
    `);
    if (regex.test(opcion)) {
        return parseInt(opcion);
    } else {
        return false;
    }
}

function mostrarMenuEliminar() {
    let regex = /^\d+$/;
    let opcion = prompt(`Elije que operación quieres realizar:
        1- Eliminar Estudiante
        2- Desmatricular Asignatura
        3- Eliminar Calificación
        4- Atrás
    `);
    if (regex.test(opcion)) {
        return parseInt(opcion);
    } else {
        return false;
    }
}

function mostrarMenuBuscar() {
    let regex = /^\d+$/;
    let opcion = prompt(`Elije que operación quieres realizar:
        1- Buscar Estudiante
        2- Buscar Estudiante Graduado
        3- Buscar Asignatura
        4- Atrás
    `);
    if (regex.test(opcion)) {
        return parseInt(opcion);
    } else {
        return false;
    }
}

function mostrarMenuCalcular() {
    let regex = /^\d+$/;
    let opcion = prompt(`Elije que operación quieres realizar:
        1- Calcular Promedio x Estudiante
        2- Calcular Promedio x Asignatura
        3- Calcular Promedio General
        4- Atrás
    `);
    if (regex.test(opcion)) {
        return parseInt(opcion);
    } else {
        return false;
    }
}


function main() {
    const listaEstudiantes = new ListaEstudiantes(); // Lista principal de estudiantes.
    const regexNumero = /^\d+$/; // Validar entrada numérica.

    let salir = false;

    while (!salir) {
        const opcionPrincipal = mostrarMenuPrincipal();

        if (!regexNumero.test(opcionPrincipal)) {
            console.log("Por favor, introduce una opción válida.");
            continue;
        }

        switch (opcionPrincipal) {
            case 1: // Añadir
                let opcionAñadir = mostrarMenuAñadir();
                while (opcionAñadir !== 5) {
                    switch (opcionAñadir) {
                        case 1: // Añadir Estudiante
                            const nombre = prompt("Introduce el nombre del estudiante:");
                            const edad = parseInt(prompt("Introduce la edad del estudiante:"));
                            const direccion = new Direccion(
                                prompt("Introduce la calle:"),
                                parseInt(prompt("Introduce el número:")),
                                prompt("Introduce el piso:"),
                                prompt("Introduce el código postal:"),
                                prompt("Introduce la provincia:"),
                                prompt("Introduce la localidad:")
                            );

                            const nuevoEstudiante = new Estudiante(nombre, edad, direccion);
                            listaEstudiantes.agregarEstudiante(nuevoEstudiante);
                            console.log("Estudiante añadido correctamente.");
                            break;

                        case 2: // Añadir Estudiante Graduado
                            const nombreGraduado = prompt("Introduce el nombre del estudiante graduado:");
                            const edadGraduado = parseInt(prompt("Introduce la edad del estudiante graduado:"));
                            const direccionGraduado = new Direccion(
                                prompt("Introduce la calle:"),
                                parseInt(prompt("Introduce el número:")),
                                prompt("Introduce el piso:"),
                                prompt("Introduce el código postal:"),
                                prompt("Introduce la provincia:"),
                                prompt("Introduce la localidad:")
                            );

                            const fechaGraduacion = new Date(prompt("Introduce la fecha de graduación (yyyy-mm-dd):"));
                            const titulo = prompt("Introduce el título obtenido:");

                            const nuevoEstudianteGraduado = new EstudianteGraduado(
                                nombreGraduado,
                                edadGraduado,
                                direccionGraduado,
                                fechaGraduacion,
                                titulo
                            );
                            listaEstudiantes.agregarEstudiante(nuevoEstudianteGraduado);
                            console.log("Estudiante graduado añadido correctamente.");
                            break;

                        case 3: // Matricular Asignatura
                            const idEstudianteMatricular = parseInt(prompt("Introduce el ID del estudiante:"));
                            const estudianteMatricular = listaEstudiantes.buscarEstudiantePorID(idEstudianteMatricular);
                            if (!estudianteMatricular) {
                                console.log("Estudiante no encontrado.");
                                break;
                            }

                            const nombreAsignaturaMatricular = prompt("Introduce el nombre de la asignatura:");
                            estudianteMatricular.matricularAsignatura(nombreAsignaturaMatricular);
                            console.log("Asignatura matriculada correctamente.");
                            break;

                        case 4: // Añadir Calificación
                            const idEstudianteCalificar = parseInt(prompt("Introduce el ID del estudiante:"));
                            const estudianteCalificar = listaEstudiantes.buscarEstudiantePorID(idEstudianteCalificar);
                            if (!estudianteCalificar) {
                                console.log("Estudiante no encontrado.");
                                break;
                            }

                            const nombreAsignaturaCalificar = prompt("Introduce el nombre de la asignatura:");
                            const asignaturaCalificar = estudianteCalificar.asignaturas.find(asig => asig.nombre === nombreAsignaturaCalificar);
                            if (!asignaturaCalificar) {
                                console.log("Asignatura no encontrada.");
                                break;
                            }

                            const calificacion = parseFloat(prompt("Introduce la calificación (0 a 10):"));
                            asignaturaCalificar.agregarCalificacion(estudianteCalificar.id, calificacion);
                            console.log("Calificación añadida correctamente.");
                            break;

                        default:
                            console.log("Opción no válida.");
                    }
                    opcionAñadir = mostrarMenuAñadir();
                }
                break;

            case 2: // Eliminar
                let opcionEliminar = mostrarMenuEliminar();
                while (opcionEliminar !== 4) {
                    switch (opcionEliminar) {
                        case 1: // Eliminar Estudiante
                            const idEstudianteEliminar = parseInt(prompt("Introduce el ID del estudiante a eliminar:"));
                            listaEstudiantes.eliminarEstudiante(idEstudianteEliminar);
                            console.log("Estudiante eliminado correctamente.");
                            break;

                        case 2: // Desmatricular Asignatura
                            const idEstudianteDesmatricular = parseInt(prompt("Introduce el ID del estudiante:"));
                            const estudianteDesmatricular = listaEstudiantes.buscarEstudiantePorID(idEstudianteDesmatricular);
                            if (!estudianteDesmatricular) {
                                console.log("Estudiante no encontrado.");
                                break;
                            }

                            const nombreAsignaturaDesmatricular = prompt("Introduce el nombre de la asignatura:");
                            estudianteDesmatricular.desmatricularAsignatura(nombreAsignaturaDesmatricular);
                            console.log("Asignatura desmatriculada correctamente.");
                            break;

                        case 3: // Eliminar Calificación
                            const idEstudianteEliminarCalif = parseInt(prompt("Introduce el ID del estudiante:"));
                            const estudianteEliminarCalif = listaEstudiantes.buscarEstudiantePorID(idEstudianteEliminarCalif);
                            if (!estudianteEliminarCalif) {
                                console.log("Estudiante no encontrado.");
                                break;
                            }

                            const nombreAsignaturaEliminarCalif = prompt("Introduce el nombre de la asignatura:");
                            const asignaturaEliminarCalif = estudianteEliminarCalif.asignaturas.find(asig => asig.nombre === nombreAsignaturaEliminarCalif);
                            if (!asignaturaEliminarCalif) {
                                console.log("Asignatura no encontrada.");
                                break;
                            }

                            asignaturaEliminarCalif.eliminarCalificacion(estudianteEliminarCalif.id);
                            console.log("Calificaciones eliminadas correctamente.");
                            break;

                        default:
                            console.log("Opción no válida.");
                    }
                    opcionEliminar = mostrarMenuEliminar();
                }
                break;

            case 3: // Buscar
                let opcionBuscar = mostrarMenuBuscar();
                while (opcionBuscar !== 4) {
                    switch (opcionBuscar) {
                        case 1: // Buscar Estudiante
                            const patronEstudiante = prompt("Introduce el patrón de búsqueda para el estudiante:");
                            const resultadosEstudiantes = listaEstudiantes.buscarEstudiante(patronEstudiante);
                            console.log(resultadosEstudiantes.map(est => `ID: ${est.id}, Nombre: ${est.nombre}`).join("\n"));
                            break;

                        case 2: // Buscar Estudiante Graduado
                            const patronGraduado = prompt("Introduce el patrón de búsqueda para el estudiante graduado:");
                            const resultadosGraduados = listaEstudiantes.estudiantes
                                .filter(est => est instanceof EstudianteGraduado && est.nombre.includes(patronGraduado));
                            if (resultadosGraduados.length === 0) {
                                console.log("No se encontraron estudiantes graduados que coincidan con el patrón.");
                            } else {
                                console.log("Estudiantes Graduados Encontrados:\n" +
                                    resultadosGraduados.map(est => est.toString()).join("\n\n"));
                            }
                            break;

                        case 3: // Buscar Asignatura
                            const idEstudianteBuscarAsig = parseInt(prompt("Introduce el ID del estudiante:"));
                            const estudianteBuscarAsig = listaEstudiantes.buscarEstudiantePorID(idEstudianteBuscarAsig);
                            if (!estudianteBuscarAsig) {
                                console.log("Estudiante no encontrado.");
                                break;
                            }

                            const patronAsignatura = prompt("Introduce el patrón de búsqueda para la asignatura:");
                            const resultadosAsignaturas = estudianteBuscarAsig.buscarAsignatura(patronAsignatura);
                            if (resultadosAsignaturas.length === 0) {
                                console.log("No se encontraron asignaturas que coincidan con el patrón.");
                            } else {
                                console.log("Asignaturas encontradas:\n" + resultadosAsignaturas.map(asig => asig.nombre).join("\n"));
                            }
                            break;

                        default:
                            console.log("Opción no válida.");
                    }
                    opcionBuscar = mostrarMenuBuscar();
                }
                break;

            case 4: // Calcular Promedio
                let opcionCalcular = mostrarMenuCalcular();
                while (opcionCalcular !== 4) {
                    switch (opcionCalcular) {
                        case 1: // Promedio por Estudiante
                            const idEstudiantePromedio = parseInt(prompt("Introduce el ID del estudiante:"));
                            const estudiantePromedio = listaEstudiantes.buscarEstudiantePorID(idEstudiantePromedio);
                            if (!estudiantePromedio) {
                                console.log("Estudiante no encontrado.");
                                break;
                            }

                            console.log(`Promedio del estudiante: ${estudiantePromedio.calcularPromedio()}`);
                            break;

                        case 2: // Promedio por Asignatura
                            const nombreAsignaturaPromedio = prompt("Introduce el nombre de la asignatura:");
                            const asignaturasPromedio = listaEstudiantes.estudiantes.flatMap(e => e.asignaturas);
                            const asignaturaPromedio = asignaturasPromedio.find(asig => asig.nombre === nombreAsignaturaPromedio);
                            if (!asignaturaPromedio) {
                                console.log("Asignatura no encontrada.");
                                break;
                            }

                            console.log(`Promedio de la asignatura: ${asignaturaPromedio.calcularPromedio().toFixed(2)}`);
                            break;

                        case 3: // Promedio General
                            console.log(`Promedio general: ${listaEstudiantes.calcularPromedioGeneral().toFixed(2)}`);
                            break;

                        default:
                            console.log("Opción no válida.");
                    }
                    opcionCalcular = mostrarMenuCalcular();
                }
                break;

            case 5: // Generar Reporte
                console.log(listaEstudiantes.generarReporte());
                break;

            case 6: // Salir
                salir = true;
                break;

            default:
                console.log("Opción no válida.");
        }
    }

    alert("Gracias por usar el sistema. ¡Hasta pronto!");
}



main();

