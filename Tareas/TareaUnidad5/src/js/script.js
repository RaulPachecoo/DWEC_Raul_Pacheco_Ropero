import Estudiante from './Estudiante.js';
import EstudianteGraduado from './EstudianteGraduado.js';
import Direccion from './Direccion.js';
import ListaEstudiantes from './ListaEstudiantes.js';

// Función para manejar la validación de cada campo
function validarCampo(input, errorMessageId) {
    const errorMessage = document.getElementById(errorMessageId);

    // Si no se encuentra el mensaje de error, se retorna verdadero (no hay error)
    if (!errorMessage) return true;

    // Si el campo no es válido o está vacío
    if (!input.validity.valid || input.value.trim() === "") {
        input.classList.add('no-valido');   // Añadir clase 'no-valido' para marcar el campo como inválido
        input.classList.remove('valido');   // Remover clase 'valido' si está presente
        errorMessage.style.display = 'block';  // Mostrar el mensaje de error
        return false;  // Retornar falso ya que el campo no es válido
    } else {
        input.classList.add('valido');  // Añadir clase 'valido' si el campo es válido
        input.classList.remove('no-valido');  // Remover clase 'no-valido'
        errorMessage.style.display = 'none';  // Ocultar el mensaje de error
        return true;  // Retornar verdadero si el campo es válido
    }
}

// Lista de estudiantes
let listaEstudiantes = new ListaEstudiantes();  // Crear una nueva lista de estudiantes

// Función para guardar la lista de estudiantes en localStorage
function guardarListaEstudiantes() {
    // Guardar la lista de estudiantes como una cadena JSON en localStorage
    localStorage.setItem('listaEstudiantes', JSON.stringify(listaEstudiantes.estudiantes));
}

// Función para cargar la lista de estudiantes desde localStorage
function cargarListaEstudiantes() {
    // Obtener los estudiantes guardados de localStorage
    const estudiantesGuardados = localStorage.getItem('listaEstudiantes');

    // Si no hay estudiantes guardados en localStorage
    if (!estudiantesGuardados) { 
        // Parsear los datos y crear instancias de Estudiante o EstudianteGraduado
        const estudiantes = JSON.parse(estudiantesGuardados).map(est => {
            if (!est.direccion) {
                alert(`El estudiante con ID ${est.id} no tiene una dirección definida.`);  // Si falta la dirección, mostrar alerta
                return null;
            }
            // Crear una nueva dirección
            const direccion = new Direccion(
                est.direccion.calle, est.direccion.numero, est.direccion.piso,
                est.direccion.codigoPostal, est.direccion.provincia, est.direccion.localidad
            );
            let estudiante;
            // Si el estudiante tiene fecha de graduación, crearlo como EstudianteGraduado
            if (est.fechaGraduacion) {
                estudiante = new EstudianteGraduado(est.nombre, est.edad, direccion, new Date(est.fechaGraduacion), est.titulo);
            } else {
                estudiante = new Estudiante(est.nombre, est.edad, direccion);  // Si no, crearlo como Estudiante normal
            }
            // Mapear las asignaturas del estudiante
            estudiante.asignaturas = est.asignaturas.map(asig => {
                const asignatura = new Asignatura(asig.nombre);
                asignatura.calificaciones = asig.calificaciones;
                return asignatura;
            });
            estudiante.matriculas = est.matriculas;  // Asignar las matrículas del estudiante
            return estudiante;
        }).filter(est => est !== null);  // Filtrar null si hubo algún error al procesar el estudiante
        listaEstudiantes.setEstudiantes(estudiantes);  // Establecer la lista de estudiantes
    } else {
        listaEstudiantes.setEstudiantes([]);  // Si no hay datos, establecer una lista vacía
    }
}

// Cargar la lista de estudiantes al iniciar la página
cargarListaEstudiantes();

// Función para manejar el envío del formulario de añadir estudiantes
document.getElementById('formAñadirEstudiante').addEventListener('submit', function (event) {
    event.preventDefault();  // Prevenir que el formulario recargue la página al enviarlo

    // Obtener los valores de los campos del formulario
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

    let esValido = true;  // Variable para verificar si el formulario es válido

    // Lista de campos a validar
    const campos = [
        { id: 'nombreEstudiante', errorId: 'errorNombre' },
        { id: 'edadEstudiante', errorId: 'errorEdad' },
        { id: 'calleEstudiante', errorId: 'errorCalle' },
        { id: 'numeroEstudiante', errorId: 'errorNumero' },
        { id: 'codigoPostalEstudiante', errorId: 'errorCodigoPostal' },
        { id: 'provinciaEstudiante', errorId: 'errorProvincia' },
        { id: 'localidadEstudiante', errorId: 'errorLocalidad' }
    ];

    // Validar todos los campos definidos en la lista de campos
    campos.forEach(({ id, errorId }) => {
        const input = document.getElementById(id);  // Obtener el campo de entrada
        if (!validarCampo(input, errorId)) esValido = false;  // Si alguna validación falla, marcar el formulario como no válido
    });

    // Si el formulario es válido
    if (esValido) {
        // Crear un nuevo estudiante con los datos ingresados
        let estudiante = new Estudiante(nombre, edad, new Direccion(
            direccion.calle, direccion.numero, direccion.piso,
            direccion.codigoPostal, direccion.provincia, direccion.localidad
        ));

        // Agregar el estudiante a la lista
        listaEstudiantes.agregarEstudiante(estudiante);
        // Guardar la lista de estudiantes actualizada en localStorage
        guardarListaEstudiantes();

        alert("Estudiante añadido correctamente.");  // Mostrar mensaje de éxito
        cerrarModal('modalAñadirEstudiante');  // Cerrar el modal
    }
});


// Función para manejar el envío del formulario de añadir estudiantes graduados
document.getElementById('formAñadirEstudianteGraduado').addEventListener('submit', function (event) {
    event.preventDefault();  // Prevenir el comportamiento predeterminado del formulario (evitar que recargue la página)

    // Obtener los valores de los campos del formulario
    const nombre = document.getElementById('nombreGraduado').value;
    const edad = parseInt(document.getElementById('edadGraduado').value);  // Convertir la edad a número
    const direccion = {
        calle: document.getElementById('calleGraduado').value,
        numero: parseInt(document.getElementById('numeroGraduado').value),  // Convertir el número de la calle a número
        piso: document.getElementById('pisoGraduado').value,
        codigoPostal: document.getElementById('codigoPostalGraduado').value,
        provincia: document.getElementById('provinciaGraduado').value,
        localidad: document.getElementById('localidadGraduado').value
    };
    const fechaGraduacion = new Date(document.getElementById('fechaGraduacion').value);  // Obtener la fecha de graduación
    const titulo = document.getElementById('titulo').value;  // Obtener el título del estudiante

    let esValido = true;  // Variable para verificar si todos los campos son válidos

    // Lista de campos a validar, con sus respectivos IDs y mensajes de error
    const campos = [
        { id: 'nombreGraduado', errorId: 'errorNombreGraduado' },
        { id: 'edadGraduado', errorId: 'errorEdadGraduado' },
        { id: 'calleGraduado', errorId: 'errorCalleGraduado' },
        { id: 'numeroGraduado', errorId: 'errorNumeroGraduado' },
        { id: 'codigoPostalGraduado', errorId: 'errorCodigoPostalGraduado' },
        { id: 'provinciaGraduado', errorId: 'errorProvinciaGraduado' },
        { id: 'localidadGraduado', errorId: 'errorLocalidadGraduado' },
        { id: 'fechaGraduacion', errorId: 'errorFechaGraduacion' },
        { id: 'titulo', errorId: 'errorTitulo' }
    ];

    // Validar cada campo utilizando la función 'validarCampo'
    campos.forEach(({ id, errorId }) => {
        const input = document.getElementById(id);  // Obtener el campo de entrada
        if (!validarCampo(input, errorId)) esValido = false;  // Si el campo no es válido, marcar esValido como falso
    });

    // Si todos los campos son válidos, crear el estudiante graduado y añadirlo a la lista
    if (esValido) {
        // Crear un nuevo objeto EstudianteGraduado
        let estudianteGraduado = new EstudianteGraduado(
            nombre, edad, new Direccion(
                direccion.calle, direccion.numero, direccion.piso,
                direccion.codigoPostal, direccion.provincia, direccion.localidad
            ), fechaGraduacion, titulo
        );
        // Añadir el estudiante graduado a la lista de estudiantes
        listaEstudiantes.agregarEstudiante(estudianteGraduado);
        // Guardar la lista actualizada en localStorage
        guardarListaEstudiantes();

        alert("Estudiante graduado añadido correctamente.");  // Mostrar mensaje de éxito
        cerrarModal('modalAñadirEstudianteGraduado');  // Cerrar el modal de añadir estudiante graduado
    }
});

// Manejo de pasos del formulario
document.addEventListener("DOMContentLoaded", function () {
    // Obtener todos los pasos, botones de siguiente y anterior del formulario
    const botonesSiguiente = document.querySelectorAll(".next-step");
    const botonesAnterior = document.querySelectorAll(".prev-step");

    // Función para validar todos los campos de un paso
    function validarPaso(numeroPaso, idFormulario) {
        let esValido = true;
        // Validar cada campo dentro del paso específico
        document.querySelectorAll(`#${idFormulario} #step-${numeroPaso} input`).forEach(input => {
            const idError = input.getAttribute("data-error");
            if (!validarCampo(input, idError)) esValido = false;  // Si un campo no es válido, marcar como no válido
        });
        return esValido;  // Retornar si el paso es válido o no
    }

    // Función para mostrar un paso del formulario
    function mostrarPaso(numeroPaso, idFormulario) {
        // Ocultar todos los pasos
        document.querySelectorAll(`#${idFormulario} .form-step`).forEach((paso) => paso.classList.add("d-none"));
        // Mostrar solo el paso actual
        document.querySelector(`#${idFormulario} #step-${numeroPaso}`).classList.remove("d-none");
        // Actualizar el historial para reflejar el paso actual en la URL
        history.pushState({ step: numeroPaso, formId: idFormulario }, "", `?step=${numeroPaso}&formId=${idFormulario}`);
    }

    // Evento para el botón "siguiente"
    botonesSiguiente.forEach((boton) => {
        boton.addEventListener("click", function () {
            const pasoActual = parseInt(this.getAttribute("data-step")) - 1;  // Obtener el paso actual
            const pasoSiguiente = parseInt(this.getAttribute("data-step"));  // Obtener el siguiente paso
            const idFormulario = this.closest("form").id;  // Obtener el ID del formulario al que pertenece el botón

            // Si el paso actual es válido, avanzar al siguiente paso
            if (validarPaso(pasoActual, idFormulario)) {
                mostrarPaso(pasoSiguiente, idFormulario);
                history.forward();  // Avanzar en el historial
            }
        });
    });

    // Evento para el botón "anterior"
    botonesAnterior.forEach((boton) => {
        boton.addEventListener("click", function () {
            const paso = this.getAttribute("data-step");  // Obtener el paso al que retroceder
            const idFormulario = this.closest("form").id;  // Obtener el ID del formulario
            mostrarPaso(paso, idFormulario);  // Mostrar el paso anterior
            history.back();  // Retroceder en el historial
        });
    });

    // Evento para detectar cambios en el historial (cuando se navega con los botones de retroceder/avanzar del navegador)
    window.addEventListener("popstate", function (evento) {
        if (evento.state && evento.state.step && evento.state.formId) {
            mostrarPaso(evento.state.step, evento.state.formId);  // Mostrar el paso según el estado del historial
        }
    });

    // Obtener los parámetros de la URL (para recuperar el paso y formulario actual)
    const parametrosUrl = new URLSearchParams(window.location.search);
    const pasoActual = parametrosUrl.get("step") || "1";  // Paso actual, por defecto es el primer paso
    const idFormulario = parametrosUrl.get("formId") || "formAñadirEstudiante";  // ID del formulario, por defecto es "formAñadirEstudiante"
    mostrarPaso(pasoActual, idFormulario);  // Mostrar el paso y formulario correctos al cargar la página

    // Ahora 'mostrarPaso' estará disponible globalmente para ser utilizado en otras partes del código
    window.mostrarPaso = mostrarPaso;
});


// Función para cerrar el modal después de añadir un estudiante y volver al paso 1
function cerrarModal(idModal) {
    const modalElemento = document.getElementById(idModal);  // Obtener el elemento del modal utilizando su ID
    const modal = bootstrap.Modal.getInstance(modalElemento);  // Obtener la instancia del modal de Bootstrap
    modal.hide();  // Ocultar el modal
    reiniciarFormulario(idModal);  // Llamar a la función para reiniciar el formulario
}

// Función para reiniciar el formulario al abrir el modal
function reiniciarFormulario(idModal) {
    // Determinar el ID del formulario correspondiente según el modal abierto
    const idFormulario = idModal === 'modalAñadirEstudiante' ? 'formAñadirEstudiante' : 'formAñadirEstudianteGraduado';

    // Resetear el formulario (limpiar los campos)
    document.getElementById(idFormulario).reset();

    // Eliminar las clases 'no-valido' de los campos que estaban marcados como no válidos
    document.querySelectorAll(`#${idFormulario} .no-valido`).forEach(el => el.classList.remove('no-valido'));
    
    // Eliminar las clases 'valido' de los campos que estaban marcados como válidos
    document.querySelectorAll(`#${idFormulario} .valido`).forEach(el => el.classList.remove('valido'));

    // Ocultar los mensajes de error (en caso de haber alguno visible)
    document.querySelectorAll(`#${idFormulario} .text-danger`).forEach(el => el.style.display = 'none');

    // Si la función 'mostrarPaso' está definida, reiniciar el paso del formulario al paso 1
    if (typeof mostrarPaso === "function") {
        mostrarPaso(1, idFormulario);  // Mostrar el primer paso del formulario
    }
}

// Asegurar que el modal siempre inicie en el primer paso
document.getElementById('modalAñadirEstudiante').addEventListener('show.bs.modal', function () {
    reiniciarFormulario('modalAñadirEstudiante');  // Reiniciar el formulario al abrir el modal
});

document.getElementById('modalAñadirEstudianteGraduado').addEventListener('show.bs.modal', function () {
    reiniciarFormulario('modalAñadirEstudianteGraduado');  // Reiniciar el formulario al abrir el modal
});



// Manejo del formulario para matricular asignaturas
document.getElementById('formAñadirAsignatura').addEventListener('submit', function (evento) {
    evento.preventDefault();  // Evita que el formulario recargue la página

    let valido = true;

    // Obtener el campo de ID de estudiante y validar
    const idEstudianteMatricular = document.getElementById('idEstudianteMatricular');
    validarCampo(idEstudianteMatricular, 'errorIdEstudianteMatricular');
    if (!idEstudianteMatricular.validity.valid) {
        valido = false;  // Marcar como no válido si el ID no es válido
    }

    // Obtener el campo de nombre de asignatura y validar
    const nombreAsignaturaMatricular = document.getElementById('nombreAsignaturaMatricular');
    validarCampo(nombreAsignaturaMatricular, 'errorNombreAsignaturaMatricular');
    if (!nombreAsignaturaMatricular.validity.valid) {
        valido = false;  // Marcar como no válido si el nombre de asignatura no es válido
    }

    // Si todo es válido
    if (valido) {
        const estudianteMatricular = listaEstudiantes.buscarEstudiantePorID(parseInt(idEstudianteMatricular.value));  // Buscar estudiante por ID

        if (!estudianteMatricular) {
            alert("Estudiante no encontrado.");  // Mostrar mensaje si el estudiante no existe
            return;
        }

        // Matricular la asignatura
        estudianteMatricular.matricularAsignatura(nombreAsignaturaMatricular.value);
        alert("Asignatura matriculada correctamente.");  // Mostrar mensaje de éxito
        guardarListaEstudiantes();  // Guardar la lista actualizada de estudiantes en localStorage

        // Cerrar el modal
        const modalElemento = document.getElementById('modalAñadirAsignatura');
        const modal = bootstrap.Modal.getInstance(modalElemento);
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







