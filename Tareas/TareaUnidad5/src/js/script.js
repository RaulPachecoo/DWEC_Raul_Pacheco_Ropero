import Estudiante from './Estudiante.js';
import EstudianteGraduado from './EstudianteGraduado.js';
import Direccion from './Direccion.js';
import ListaEstudiantes from './ListaEstudiantes.js';

// Función para manejar la validación de cada campo
function validarCampo(input, errorMessageId) {
    const errorMessage = document.getElementById(errorMessageId); // Obtener el mensaje de error

    if (!input.validity.valid) {
        input.classList.add('no-valido');
        input.classList.remove('valido');
        errorMessage.style.display = 'block'; // Mostrar el mensaje de error personalizado
    } else {
        input.classList.add('valido');
        input.classList.remove('no-valido');
        errorMessage.style.display = 'none'; // Ocultar el mensaje de error
    }
}

let listaEstudiantes = new ListaEstudiantes();

// Función para guardar la lista de estudiantes en localStorage
function guardarListaEstudiantes() {
    localStorage.setItem('listaEstudiantes', JSON.stringify(listaEstudiantes.estudiantes));
}

// Función para cargar la lista de estudiantes desde localStorage
function cargarListaEstudiantes() {
    const estudiantesGuardados = localStorage.getItem('listaEstudiantes');

    if (!estudiantesGuardados) {
        const estudiantes = JSON.parse(estudiantesGuardados).map(est => {
            if (!est.direccion) {
                alert(`El estudiante con ID ${est.id} no tiene una dirección definida.`);
                return null;
            }
            const direccion = new Direccion(est.direccion.calle, est.direccion.numero, est.direccion.piso, est.direccion.codigoPostal, est.direccion.provincia, est.direccion.localidad);
            let estudiante;
            if (est.fechaGraduacion) {
                estudiante = new EstudianteGraduado(est.nombre, est.edad, direccion, new Date(est.fechaGraduacion), est.titulo);
            } else {
                estudiante = new Estudiante(est.nombre, est.edad, direccion);
            }
            estudiante.asignaturas = est.asignaturas.map(asig => {
                const asignatura = new Asignatura(asig.nombre);
                asignatura.calificaciones = asig.calificaciones;
                return asignatura;
            });
            estudiante.matriculas = est.matriculas;
            return estudiante;
        }).filter(est => est !== null); // Filtrar estudiantes nulos
        listaEstudiantes.setEstudiantes(estudiantes);
    } else {
        listaEstudiantes.setEstudiantes([]); // Inicializar lista vacía si no hay datos en localStorage
    }
}

// Cargar la lista de estudiantes al iniciar
cargarListaEstudiantes();

// Función para manejar el envío del formulario de añadir estudiantes
document.getElementById('formAñadirEstudiante').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe por defecto

    // Obtener los valores de los campos
    const nombre = document.getElementById('nombreEstudiante').value;
    const edad = parseInt(document.getElementById('edadEstudiante').value);
    const direccion = {
        calle: document.getElementById('calleEstudiante').value,
        numero: parseInt(document.getElementById('numeroEstudiante').value),
        piso: document.getElementById('pisoEstudiante').value,
        codigoPostal: document.getElementById('codigoPostalEstudiante').value,
        provincia: document.getElementById('provinciaEstudiante').value,
        localidad: document.getElementById('localidadEstudiante').value
    };

    let esValido = true;

    // Validar nombre
    const nombreInput = document.getElementById('nombreEstudiante');
    if (!nombreInput.validity.valid) {
        esValido = false;
        validarCampo(nombreInput, 'errorNombre');
    }

    const edadInput = document.getElementById('edadEstudiante');
    if (!edadInput.validity.valid) {
        esValido = false;
        validarCampo(edadInput, 'errorEdad');
    }

    const calleInput = document.getElementById('calleEstudiante');
    if (!calleInput.validity.valid) {
        esValido = false;
        validarCampo(calleInput, 'errorCalle');
    }

    const numeroInput = document.getElementById('numeroEstudiante');
    if (!numeroInput.validity.valid) {
        esValido = false;
        validarCampo(numeroInput, 'errorNumero');
    }

    const codigoPostalInput = document.getElementById('codigoPostalEstudiante');
    if (!codigoPostalInput.validity.valid) {
        esValido = false;
        validarCampo(codigoPostalInput, 'errorCodigoPostal');
    }

    const provinciaInput = document.getElementById('provinciaEstudiante');
    if (!provinciaInput.validity.valid) {
        esValido = false;
        validarCampo(provinciaInput, 'errorProvincia');
    }

    const localidadInput = document.getElementById('localidadEstudiante');
    if (!localidadInput.validity.valid) {
        esValido = false;
        validarCampo(localidadInput, 'errorLocalidad');
    }

    // Si el formulario es válido, procesamos los datos
    if (esValido) {
        let estudiante = new Estudiante(nombre, edad, new Direccion(direccion.calle, direccion.numero, direccion.piso, direccion.codigoPostal, direccion.provincia, direccion.localidad));
        listaEstudiantes.agregarEstudiante(estudiante);
        guardarListaEstudiantes(); // Guardar en localStorage

        alert("Estudiante añadido correctamente.");

        // Obtener el modal y cerrarlo
        const modalElement = document.getElementById('modalAñadirEstudiante');
        const modal = bootstrap.Modal.getInstance(modalElement); // Obtener la instancia del modal
        modal.hide(); // Cerrar el modal
    }
});



// Función para manejar el envío del formulario para Añadir Estudiante Graduado
document.querySelector('#formAñadirEstudianteGraduado').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe por defecto

    // Obtener los valores de los campos
    const nombreGraduado = document.querySelector('#nombreGraduado').value;
    const edadGraduado = parseInt(document.querySelector('#edadGraduado').value);
    const direccionGraduado = {
        calle: document.querySelector('#calleGraduado').value,
        numero: parseInt(document.querySelector('#numeroGraduado').value),
        piso: document.querySelector('#pisoGraduado').value,
        codigoPostal: document.querySelector('#codigoPostalGraduado').value,
        provincia: document.querySelector('#provinciaGraduado').value,
        localidad: document.querySelector('#localidadGraduado').value
    };

    const fechaGraduacion = new Date(document.querySelector('#fechaGraduacion').value);
    const titulo = document.querySelector('#titulo').value;

    // Validar los campos antes de procesar
    let esValido = true;

    // Validar nombreGraduado
    const nombreGraduadoInput = document.querySelector('#nombreGraduado');
    if (!nombreGraduadoInput.validity.valid) {
        esValido = false;
        validarCampo(nombreGraduadoInput, 'errorNombreGraduado');
    }

    // Validar edadGraduado
    const edadGraduadoInput = document.querySelector('#edadGraduado');
    if (!edadGraduadoInput.validity.valid) {
        esValido = false;
        validarCampo(edadGraduadoInput, 'errorEdadGraduado');
    }

    // Validar los campos de dirección
    const calleGraduadoInput = document.querySelector('#calleGraduado');
    if (!calleGraduadoInput.validity.valid) {
        esValido = false;
        validarCampo(calleGraduadoInput, 'errorCalleGraduado');
    }

    const numeroGraduadoInput = document.querySelector('#numeroGraduado');
    if (!numeroGraduadoInput.validity.valid) {
        esValido = false;
        validarCampo(numeroGraduadoInput, 'errorNumeroGraduado');
    }

    const codigoPostalGraduadoInput = document.querySelector('#codigoPostalGraduado');
    if (!codigoPostalGraduadoInput.validity.valid) {
        esValido = false;
        validarCampo(codigoPostalGraduadoInput, 'errorCodigoPostalGraduado');
    }

    const provinciaGraduadoInput = document.querySelector('#provinciaGraduado');
    if (!provinciaGraduadoInput.validity.valid) {
        esValido = false;
        validarCampo(provinciaGraduadoInput, 'errorProvinciaGraduado');
    }

    const localidadGraduadoInput = document.querySelector('#localidadGraduado');
    if (!localidadGraduadoInput.validity.valid) {
        esValido = false;
        validarCampo(localidadGraduadoInput, 'errorLocalidadGraduado');
    }


    const fechaGraduacionInput = document.querySelector('#fechaGraduacion');
    if (!fechaGraduacionInput.validity.valid) {
        esValido = false;
        validarCampo(fechaGraduacionInput, 'errorFechaGraduacion');
    }

    const tituloInput = document.querySelector('#titulo');
    if (!tituloInput.validity.valid) {
        esValido = false;
        validarCampo(tituloInput, 'errorTitulo');
    }

    // Si el formulario es válido, procesamos los datos
    if (esValido) {
        let estudianteGraduado = new EstudianteGraduado(
            nombreGraduado,
            edadGraduado,
            new Direccion(direccionGraduado.calle, direccionGraduado.numero, direccionGraduado.piso, direccionGraduado.codigoPostal, direccionGraduado.provincia, direccionGraduado.localidad),
            fechaGraduacion,
            titulo
        );

        // Agregar estudiante graduado a la lista
        listaEstudiantes.agregarEstudiante(estudianteGraduado);
        guardarListaEstudiantes(); // Guardar en localStorage
        alert("Estudiante graduado añadido correctamente.");

        // Cerrar el modal después de enviar el formulario
        const modalElement = document.querySelector('#modalAñadirEstudianteGraduado');
        const modal = bootstrap.Modal.getInstance(modalElement); // Obtener la instancia del modal
        modal.hide(); // Cerrar el modal
    }
});


// Manejo del formulario para matricular asignaturas
document.getElementById('formAñadirAsignatura').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita que el formulario recargue la página

    let valido = true;

    const idEstudianteMatricular = document.getElementById('idEstudianteMatricular');
    validarCampo(idEstudianteMatricular, 'errorIdEstudianteMatricular');
    if (!idEstudianteMatricular.validity.valid) {
        valido = false;
    }

    const nombreAsignaturaMatricular = document.getElementById('nombreAsignaturaMatricular');
    validarCampo(nombreAsignaturaMatricular, 'errorNombreAsignaturaMatricular');
    if (!nombreAsignaturaMatricular.validity.valid) {
        valido = false;
    }

    if (valido) {
        const estudianteMatricular = listaEstudiantes.buscarEstudiantePorID(parseInt(idEstudianteMatricular.value));

        if (!estudianteMatricular) {
            alert("Estudiante no encontrado.");
            return;
        }

        // Matricular la asignatura
        estudianteMatricular.matricularAsignatura(nombreAsignaturaMatricular.value);
        alert("Asignatura matriculada correctamente.");
        guardarListaEstudiantes(); // Guardar en localStorage

        // Cerrar el modal
        const modalElement = document.getElementById('modalAñadirAsignatura');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();

        // Limpiar el formulario SOLO si todo está correcto
        document.getElementById('formAñadirAsignatura').reset();
    }
});



// Manejo del formulario para añadir calificación
document.getElementById('formAñadirCalificacion').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita que el formulario recargue la página

    let valido = true;

    // Obtener los inputs del formulario
    const idEstudianteCalificar = document.getElementById('idEstudianteCalificar');
    const nombreAsignaturaCalificar = document.getElementById('nombreAsignaturaCalificar');
    const calificacionInput = document.getElementById('calificacion');

    // Validar ID del estudiante
    if (!idEstudianteCalificar.validity.valid) {
        valido = false;
        validarCampo(idEstudianteCalificar, 'errorIdEstudianteCalificar');
    }

    // Validar Nombre de la Asignatura
    if (!nombreAsignaturaCalificar.validity.valid) {
        valido = false;
        validarCampo(nombreAsignaturaCalificar, 'errorNombreAsignaturaCalificar');
    }

    // Validar Calificación (debe estar entre 0 y 10)
    const calificacion = parseFloat(calificacionInput.value);
    if (isNaN(calificacion) || calificacion < 0 || calificacion > 10) {
        valido = false;
        calificacionInput.classList.add('no-valido');
        calificacionInput.classList.remove('valido');
        document.getElementById('errorCalificacion').style.display = 'block';
    } else {
        calificacionInput.classList.add('valido');
        calificacionInput.classList.remove('no-valido');
        document.getElementById('errorCalificacion').style.display = 'none';
    }

    // Si hay errores, detener el proceso
    if (valido) {
        // Buscar al estudiante
        const estudianteCalificar = listaEstudiantes.buscarEstudiantePorID(parseInt(idEstudianteCalificar.value));

        if (!estudianteCalificar) {
            alert("Estudiante no encontrado.");
            return;
        }

        // Buscar la asignatura del estudiante
        const asignaturaCalificar = estudianteCalificar.buscarAsignatura(nombreAsignaturaCalificar.value, true);

        if (!asignaturaCalificar) {
            alert("Asignatura no encontrada.");
            return;
        }

        // Agregar la calificación
        asignaturaCalificar.agregarCalificacion(parseInt(idEstudianteCalificar.value), calificacion);
        alert("Calificación añadida correctamente.");
        guardarListaEstudiantes(); // Guardar en localStorage

        // Cerrar el modal
        const modalElement = document.getElementById('modalAñadirCalificacion');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();

        // Limpiar el formulario
        document.getElementById('formAñadirCalificacion').reset();
    }


});



// Función para cargar estudiantes en el select del modal
function cargarEstudiantesEnSelectEliminar() {
    const selectEstudiante = document.getElementById('idEstudianteEliminar');
    selectEstudiante.innerHTML = '<option value="">Seleccione un estudiante...</option>'; 

    listaEstudiantes.estudiantes.forEach(estudiante => {
        const option = document.createElement('option');
        option.value = estudiante.id;
        option.textContent = `${estudiante.nombre} (ID: ${estudiante.id})`;
        selectEstudiante.appendChild(option);
    });
}

// Manejar el envío del formulario para eliminar un estudiante
document.getElementById('formEliminarEstudiante').addEventListener('submit', function (event) {
    event.preventDefault();

    const idEstudiante = parseInt(document.getElementById('idEstudianteEliminar').value);

    if (!idEstudiante) {
        alert("Por favor, seleccione un estudiante.");
        return;
    }

    const estudiante = listaEstudiantes.buscarEstudiantePorID(idEstudiante);

    if (!estudiante) {
        alert("El estudiante seleccionado no existe.");
        return;
    }

    // Confirmación antes de eliminar
    if (!confirm(`¿Seguro que deseas eliminar a ${estudiante.nombre}?`)) {
        return;
    }

    // Eliminar estudiante de la lista
    listaEstudiantes.eliminarEstudiante(idEstudiante);
    guardarListaEstudiantes(); // Guardar en localStorage
    alert(`Estudiante "${estudiante.nombre}" eliminado correctamente.`);
    // Cerrar el modal
    const modalElement = document.getElementById('modalEliminarEstudiante');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
});

// Cargar estudiantes cuando se abre el modal
document.getElementById('modalEliminarEstudiante').addEventListener('show.bs.modal', cargarEstudiantesEnSelectEliminar);




// Función para cargar estudiantes en el select del modal
function cargarEstudiantesEnSelectEliminarAsignatura() {
    const selectEstudiante = document.getElementById('idEstudianteEliminar');
    selectEstudiante.innerHTML = '<option value="">Seleccione un estudiante...</option>'; // Reset

    listaEstudiantes.estudiantes.forEach(estudiante => {
        const option = document.createElement('option');
        option.value = estudiante.id;
        option.textContent = `${estudiante.nombre} (ID: ${estudiante.id})`;
        selectEstudiante.appendChild(option);
    });
}

// Evento cuando cambia el estudiante seleccionado
document.getElementById('idEstudianteEliminar').addEventListener('change', function () {
    const idEstudiante = parseInt(this.value);
    const estudiante = listaEstudiantes.buscarEstudiantePorID(idEstudiante);
    const selectAsignatura = document.getElementById('asignaturaEliminar');

    selectAsignatura.innerHTML = '<option value="">Seleccione una asignatura...</option>'; // Reset

    if (estudiante) {
        estudiante.asignaturas.forEach(asignatura => {
            const option = document.createElement('option');
            option.value = asignatura.nombre;
            option.textContent = asignatura.nombre;
            selectAsignatura.appendChild(option);
        });
    }
});

//  Manejar el envío del formulario para eliminar la asignatura
document.getElementById('formEliminarAsignatura').addEventListener('submit', function (event) {
    event.preventDefault();

    const idEstudiante = parseInt(document.getElementById('idEstudianteEliminar').value);
    const nombreAsignatura = document.getElementById('asignaturaEliminar').value;

    if (!idEstudiante || !nombreAsignatura) {
        alert("Por favor, seleccione un estudiante y una asignatura.");
        return;
    }

    const estudiante = listaEstudiantes.buscarEstudiantePorID(idEstudiante);

    if (!estudiante) {
        alert("El estudiante seleccionado no existe.");
        return;
    }

    // Eliminar la asignatura del estudiante
    estudiante.desmatricularAsignatura(nombreAsignatura);
    guardarListaEstudiantes(); // Guardar en localStorage
    alert(`Asignatura "${nombreAsignatura}" desmatriculada correctamente.`);

    // Cerrar el modal
    const modalElement = document.getElementById('modalEliminarAsignatura');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
});

//  Cargar estudiantes cuando se abre el modal
document.getElementById('modalEliminarAsignatura').addEventListener('show.bs.modal', cargarEstudiantesEnSelectEliminarAsignatura);



// Cargar estudiantes en el select cuando se abre el modal
function cargarEstudiantesEnSelectEliminarCalif() {
    const selectEstudiante = document.getElementById('idEstudianteEliminarCalif');
    selectEstudiante.innerHTML = '<option value="">Seleccione un estudiante...</option>'; // Reset

    listaEstudiantes.estudiantes.forEach(estudiante => {
        const option = document.createElement('option');
        option.value = estudiante.id;
        option.textContent = `${estudiante.nombre} (ID: ${estudiante.id})`;
        selectEstudiante.appendChild(option);
    });
}

// Cargar asignaturas cuando se selecciona un estudiante
document.getElementById('idEstudianteEliminarCalif').addEventListener('change', function () {
    const idEstudiante = parseInt(this.value);
    const selectAsignatura = document.getElementById('nombreAsignaturaEliminarCalif');
    selectAsignatura.innerHTML = '<option value="">Seleccione una asignatura...</option>'; // Reset

    const estudiante = listaEstudiantes.buscarEstudiantePorID(idEstudiante);
    if (estudiante) {
        estudiante.asignaturas.forEach(asignatura => {
            const option = document.createElement('option');
            option.value = asignatura.nombre;
            option.textContent = asignatura.nombre;
            selectAsignatura.appendChild(option);
        });
    }
});

// Manejar la eliminación de la calificación
document.getElementById('formEliminarCalificacion').addEventListener('submit', function (event) {
    event.preventDefault();

    const idEstudiante = parseInt(document.getElementById('idEstudianteEliminarCalif').value);
    const nombreAsignatura = document.getElementById('nombreAsignaturaEliminarCalif').value;

    if (!idEstudiante || !nombreAsignatura) {
        alert("Por favor, seleccione un estudiante y una asignatura.");
        return;
    }

    const estudiante = listaEstudiantes.buscarEstudiantePorID(idEstudiante);
    if (!estudiante) {
        alert("El estudiante seleccionado no existe.");
        return;
    }

    const asignatura = estudiante.buscarAsignatura(nombreAsignatura, true);
    if (!asignatura) {
        alert("La asignatura seleccionada no existe.");
        return;
    }

    // Confirmación antes de eliminar la calificación
    if (!confirm(`¿Seguro que deseas eliminar todas las calificaciones de "${nombreAsignatura}" para ${estudiante.nombre}?`)) {
        return;
    }

    // Eliminar la calificación
    asignatura.eliminarCalificacion(estudiante.id);
    guardarListaEstudiantes(); // Guardar en localStorage
    alert(`Calificaciones de "${nombreAsignatura}" eliminadas correctamente para ${estudiante.nombre}.`);

    // Cerrar el modal
    const modalElement = document.getElementById('modalEliminarCalificacion');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
});

// Cargar estudiantes cuando se abre el modal
document.getElementById('modalEliminarCalificacion').addEventListener('show.bs.modal', cargarEstudiantesEnSelectEliminarCalif);


// Cargar estudiantes en el select cuando se abre el modal
function cargarEstudiantesEnSelectPromedio() {
    const selectEstudiante = document.getElementById('idEstudiantePromedio');
    selectEstudiante.innerHTML = '<option value="">Seleccione un estudiante...</option>'; // Reset

    listaEstudiantes.estudiantes.forEach(estudiante => {
        const option = document.createElement('option');
        option.value = estudiante.id;
        option.textContent = `${estudiante.nombre} (ID: ${estudiante.id})`;
        selectEstudiante.appendChild(option);
    });
}

// Manejar el cálculo del promedio
document.getElementById('formMostrarPromedio').addEventListener('submit', function (event) {
    event.preventDefault();

    const idEstudiante = parseInt(document.getElementById('idEstudiantePromedio').value);
    const resultadoPromedio = document.getElementById('resultadoPromedio');

    if (!idEstudiante) {
        alert("Por favor, seleccione un estudiante.");
        return;
    }

    const estudiante = listaEstudiantes.buscarEstudiantePorID(idEstudiante);
    if (!estudiante) {
        alert("El estudiante seleccionado no existe.");
        return;
    }

    try {
        //Se invoca el método polimórfico calcularPromedio()
        const promedio = estudiante.calcularPromedio();
        resultadoPromedio.textContent = `${promedio.toFixed(2)}`;
    } catch (error) {
        resultadoPromedio.textContent = "Error al calcular el promedio.";
        console.error(`Error al calcular el promedio: ${error.message}`);
    }
});

// Cargar estudiantes cuando se abre el modal
document.getElementById('modalMostrarPromedioEstudiante').addEventListener('show.bs.modal', cargarEstudiantesEnSelectPromedio);


// Manejar el cálculo del promedio de una asignatura
document.getElementById('formPromedioAsignatura').addEventListener('submit', function (event) {
    event.preventDefault();

    const nombreAsignatura = document.getElementById('nombreAsignaturaPromedio').value.trim();
    const resultadoPromedioAsignatura = document.getElementById('resultadoPromedioAsignatura');

    if (!nombreAsignatura) {
        alert("Por favor, ingrese el nombre de una asignatura.");
        return;
    }

    const promedio = listaEstudiantes.obtenerPromedioAsignatura(nombreAsignatura);

    if (promedio === null) {
        resultadoPromedioAsignatura.textContent = "Asignatura no encontrada.";
    } else {
        resultadoPromedioAsignatura.textContent = `${promedio.toFixed(2)}`;
    }
});


// Manejar el cálculo del promedio general
document.getElementById('btnCalcularPromedioGeneral').addEventListener('click', function () {
    const resultadoPromedioGeneral = document.getElementById('resultadoPromedioGeneral');

    const promedioGeneral = listaEstudiantes.calcularPromedioGeneral();

    if (promedioGeneral === null) {
        resultadoPromedioGeneral.textContent = "No hay estudiantes en la lista.";
    } else {
        resultadoPromedioGeneral.textContent = `${promedioGeneral.toFixed(2)}`;
    }
});

// Manejar la búsqueda de estudiantes
document.getElementById('btnBuscarEstudiante').addEventListener('click', function () {
    const patronEstudiante = document.getElementById('patronBusquedaEstudiante').value.trim();
    const resultadosEstudiantes = listaEstudiantes.buscarEstudiante(patronEstudiante);
    const resultadosElemento = document.getElementById('resultadosBusquedaEstudiante');

    // Limpiar resultados anteriores
    resultadosElemento.innerHTML = "";

    if (resultadosEstudiantes.length === 0) {
        resultadosElemento.innerHTML = "<li class='list-group-item'>Estudiante no encontrado.</li>";
    } else {
        // Mostrar resultados encontrados
        resultadosEstudiantes.forEach(estudiante => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item');
            listItem.textContent = `ID: ${estudiante.id}, Nombre: ${estudiante.nombre}`;
            resultadosElemento.appendChild(listItem);
        });
    }
});


// Manejar la búsqueda de estudiantes graduados
document.getElementById('btnBuscarEstudianteGraduado').addEventListener('click', function () {
    const patronGraduado = document.getElementById('patronBusquedaGraduado').value.trim();
    const resultadosGraduados = listaEstudiantes.buscarEstudiantesGraduados(patronGraduado);
    const resultadosElemento = document.getElementById('resultadosBusquedaGraduado');

    // Limpiar resultados anteriores
    resultadosElemento.innerHTML = "";

    if (resultadosGraduados.length === 0) {
        resultadosElemento.innerHTML = "<li class='list-group-item'>No se encontraron estudiantes graduados que coincidan con el patrón.</li>";
    } else {
        // Mostrar resultados encontrados
        resultadosGraduados.forEach(graduado => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item');
            listItem.textContent = graduado.toString();
            resultadosElemento.appendChild(listItem);
        });
    }
});


// Manejar la búsqueda de asignaturas
document.getElementById('btnBuscarAsignatura').addEventListener('click', function () {
    const idEstudianteBuscarAsig = parseInt(document.getElementById('idEstudianteBuscarAsig').value.trim());
    const patronAsignatura = document.getElementById('patronBusquedaAsignatura').value.trim();
    const resultadosElemento = document.getElementById('resultadosBusquedaAsignatura');
    const estudianteBuscarAsig = listaEstudiantes.buscarEstudiantePorID(idEstudianteBuscarAsig);

    // Limpiar resultados anteriores
    resultadosElemento.innerHTML = "";

    if (!estudianteBuscarAsig) {
        resultadosElemento.innerHTML = "<li class='list-group-item'>Estudiante no encontrado.</li>";
    } else {
        const resultadosAsignaturas = estudianteBuscarAsig.buscarAsignatura(patronAsignatura);

        if (resultadosAsignaturas.length === 0) {
            resultadosElemento.innerHTML = "<li class='list-group-item'>No se encontraron asignaturas que coincidan con el patrón.</li>";
        } else {
            // Mostrar resultados encontrados
            resultadosAsignaturas.forEach(asignatura => {
                const listItem = document.createElement('li');
                listItem.classList.add('list-group-item');
                listItem.textContent = asignatura.nombre;
                resultadosElemento.appendChild(listItem);
            });
        }
    }
});

document.getElementById('btnGenerarReporte').addEventListener('click', function () {
    try {
        // Asegúrate de que 'listaEstudiantes' es la instancia correcta
        const reporte = listaEstudiantes.generarReporte();

        // Abrir una nueva ventana
        const nuevaVentana = window.open('', '_blank');

        // Crear contenido HTML para la nueva página con Bootstrap
        nuevaVentana.document.write(`
            <html>
                <head>
                    <title>Reporte de Estudiantes</title>
                    <!-- Agregar Bootstrap para los estilos -->
                    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
                </head>
                <body>
                    <div class="container mt-4">
                        <h1 class="text-center text-primary mb-4">Reporte de Estudiantes</h1>
                        <pre class="bg-light p-4 border rounded">${reporte}</pre>
                    </div>
                </body>
            </html>
        `);

        // Asegurarse de que el documento se cierre adecuadamente
        nuevaVentana.document.close();
    } catch (error) {
        console.error("Error al generar reporte: ", error);
    }
});







