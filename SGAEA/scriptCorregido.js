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
        // Comprueba si la asignatura esta matriculada
        if (!this.#matriculas[nombreAsignatura]) {
            // Si no esta matriculada la añade a la lista de matrículas
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
            // Si la asignatura esta en la lista, pero está en estado "desmatriculado" la cambia a "matriculado"
            this.#matriculas[nombreAsignatura] = {
                estado: "matriculado",
                fecha: new Date(),
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
            fecha: new Date(),
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

/**
 * Clase EstudianteGraduado
 * 
 * Representa a un estudiante que ha completado sus estudios y se ha graduado.
 * Extiende la clase Estudiante, añadiendo atributos y funcionalidades específicas para estudiantes graduados.
 * 
 * Atributos:
 *  - fechaGraduacion: Fecha en que el estudiante se graduó.
 *  - titulo: Título obtenido por el estudiante al graduarse.
 */
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

/**
 * Clase Direccion
 * 
 * Representa la dirección de una persona, incluyendo detalles como calle,
 * número, piso, código postal, provincia y localidad.
 * 
 * Atributos:
 *  - calle: Nombre de la calle.
 *  - numero: Número de la vivienda.
 *  - piso: Piso dentro del edificio (puede ser nulo si no aplica).
 *  - codigoPostal: Código postal (formato de 5 dígitos).
 *  - provincia: Provincia en la que se encuentra la dirección.
 *  - localidad: Localidad o ciudad de la dirección.
 */
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
        this.#codigoPostal = (new String(codigoPostal).match(/^[0-9]{5}$/)) ? codigoPostal : "00000"; // Comprueba que el código postal tenga 5 números sino le asigna "00000"
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
     * Busca un estudiante en la lista por su ID.
     * 
     * @param {number} id - El ID del estudiante a buscar.
     * @returns {Estudiante | undefined} El estudiante encontrado o undefined si no existe.
     */
    buscarEstudiantePorID(id) {
        return this.#estudiantes.find(estudiante => estudiante.id === id);
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

    // Crear estudiantes con una dirección completa
    const estudiante1 = new Estudiante("Fran Aguilera", 20, new Direccion("Calle Falsa 1", 123, 1, "28001", "Madrid", "Madrid"));
    const estudiante2 = new Estudiante("Raúl Pacheco", 22, new Direccion("Calle Falsa 2", 456, 2, "08002", "Córdoba", "Córdoba"));
    const estudiante3 = new Estudiante("Álvaro Rodríguez", 21, new Direccion("Calle Falsa 3", 789, 3, "50003", "Granada", "Granada"));

    // Matricular a los estudiantes en las asignaturas correspondientes
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

    // Asignar calificaciones a los estudiantes
    estudiante1.asignaturas.find(asignatura => asignatura.nombre === "Matemáticas").agregarCalificacion(estudiante1, 8.5);
    estudiante1.asignaturas.find(asignatura => asignatura.nombre === "Historia").agregarCalificacion(estudiante1, 7.2);
    estudiante1.asignaturas.find(asignatura => asignatura.nombre === "Física").agregarCalificacion(estudiante1, 9.0);
    estudiante1.asignaturas.find(asignatura => asignatura.nombre === "Inglés").agregarCalificacion(estudiante1, 6.8);

    estudiante2.asignaturas.find(asignatura => asignatura.nombre === "Matemáticas").agregarCalificacion(estudiante2, 9.3);
    estudiante2.asignaturas.find(asignatura => asignatura.nombre === "Historia").agregarCalificacion(estudiante2, 8.1);
    estudiante2.asignaturas.find(asignatura => asignatura.nombre === "Física").agregarCalificacion(estudiante2, 7.8);
    estudiante2.asignaturas.find(asignatura => asignatura.nombre === "Inglés").agregarCalificacion(estudiante2, 8.5);

    estudiante3.asignaturas.find(asignatura => asignatura.nombre === "Matemáticas").agregarCalificacion(estudiante3, 7.0);
    estudiante3.asignaturas.find(asignatura => asignatura.nombre === "Historia").agregarCalificacion(estudiante3, 6.5);
    estudiante3.asignaturas.find(asignatura => asignatura.nombre === "Física").agregarCalificacion(estudiante3, 8.3);
    estudiante3.asignaturas.find(asignatura => asignatura.nombre === "Inglés").agregarCalificacion(estudiante3, 7.8);

    // Agregar los estudiantes a la lista
    listaEstudiantes.agregarEstudiante(estudiante1);
    listaEstudiantes.agregarEstudiante(estudiante2);
    listaEstudiantes.agregarEstudiante(estudiante3);

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
                            // Buscar la asignatura dentro de las asignaturas del estudiante
                            const asignaturaCalificar = estudianteCalificar.asignaturas.find(asig => asig.nombre === nombreAsignaturaCalificar);
                            if (!asignaturaCalificar) {
                                console.log("Asignatura no encontrada.");
                                break;
                            }

                            const calificacion = parseFloat(prompt("Introduce la calificación (0 a 10):"));
                            // Validación de la calificación
                            if (isNaN(calificacion) || calificacion < 0 || calificacion > 10) {
                                console.log("La calificación debe estar entre 0 y 10.");
                                break;
                            }
                            
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

                            if (resultadosEstudiantes.length === 0) {
                                console.log("Estudiante no encontrado");
                            } else {
                                console.log(resultadosEstudiantes.map(est => `ID: ${est.id}, Nombre: ${est.nombre}`).join("\n"));
                            }
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
                            const promedioGeneral = listaEstudiantes.calcularPromedioGeneral();
                            if (promedioGeneral === null) {
                                console.log("No hay estudiantes en la lista para calcular el promedio general.");
                            } else {
                                console.log(`Promedio general: ${promedioGeneral.toFixed(2)}`);
                            }
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

