import Estudiante from './Estudiante.js';
import EstudianteGraduado from './EstudianteGraduado.js';
import Direccion from './Direccion.js';
import ListaEstudiantes from './ListaEstudiantes.js';

// Función para manejar la validación de cada campo
function validarCampo(input, errorMessageId) {
    const errorMessage = document.getElementById(errorMessageId);

    if (!errorMessage) return true; // Evitar error si el mensaje no existe

    if (!input.validity.valid || input.value.trim() === "") {
        input.classList.add('no-valido');
        input.classList.remove('valido');
        errorMessage.style.display = 'block';
        return false;
    } else {
        input.classList.add('valido');
        input.classList.remove('no-valido');
        errorMessage.style.display = 'none';
        return true;
    }
}

// Lista de estudiantes
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
            const direccion = new Direccion(
                est.direccion.calle, est.direccion.numero, est.direccion.piso,
                est.direccion.codigoPostal, est.direccion.provincia, est.direccion.localidad
            );
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
        }).filter(est => est !== null);
        listaEstudiantes.setEstudiantes(estudiantes);
    } else {
        listaEstudiantes.setEstudiantes([]); 
    }
}

// Cargar la lista al iniciar
cargarListaEstudiantes();

// Asegurarse de que el DOM esté completamente cargado antes de agregar los event listeners
document.addEventListener("DOMContentLoaded", function () {
    const formAñadirEstudiante = document.getElementById('formAñadirEstudiante');
    const formAñadirEstudianteGraduado = document.getElementById('formAñadirEstudianteGraduado');

    if (formAñadirEstudiante) {
        // Función para manejar el envío del formulario de añadir estudiantes
        formAñadirEstudiante.addEventListener('submit', function (event) {
            event.preventDefault();

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

            const campos = [
                { id: 'nombreEstudiante', errorId: 'errorNombre' },
                { id: 'edadEstudiante', errorId: 'errorEdad' },
                { id: 'calleEstudiante', errorId: 'errorCalle' },
                { id: 'numeroEstudiante', errorId: 'errorNumero' },
                { id: 'codigoPostalEstudiante', errorId: 'errorCodigoPostal' },
                { id: 'provinciaEstudiante', errorId: 'errorProvincia' },
                { id: 'localidadEstudiante', errorId: 'errorLocalidad' }
            ];

            campos.forEach(({ id, errorId }) => {
                const input = document.getElementById(id);
                if (!validarCampo(input, errorId)) esValido = false;
            });

            if (esValido) {
                let estudiante = new Estudiante(nombre, edad, new Direccion(
                    direccion.calle, direccion.numero, direccion.piso,
                    direccion.codigoPostal, direccion.provincia, direccion.localidad
                ));
                listaEstudiantes.agregarEstudiante(estudiante);
                guardarListaEstudiantes();

                alert("Estudiante añadido correctamente.");
                cerrarModal('modalAñadirEstudiante');
            }
        });
    }

    if (formAñadirEstudianteGraduado) {
        // Función para manejar el envío del formulario de añadir estudiantes graduados
        formAñadirEstudianteGraduado.addEventListener('submit', function (event) {
            event.preventDefault();

            const nombre = document.getElementById('nombreGraduado').value;
            const edad = parseInt(document.getElementById('edadGraduado').value);
            const direccion = {
                calle: document.getElementById('calleGraduado').value,
                numero: parseInt(document.getElementById('numeroGraduado').value),
                piso: document.getElementById('pisoGraduado').value,
                codigoPostal: document.getElementById('codigoPostalGraduado').value,
                provincia: document.getElementById('provinciaGraduado').value,
                localidad: document.getElementById('localidadGraduado').value
            };
            const fechaGraduacion = new Date(document.getElementById('fechaGraduacion').value);
            const titulo = document.getElementById('titulo').value;

            let esValido = true;

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

            campos.forEach(({ id, errorId }) => {
                const input = document.getElementById(id);
                if (!validarCampo(input, errorId)) esValido = false;
            });

            if (esValido) {
                let estudianteGraduado = new EstudianteGraduado(nombre, edad, new Direccion(
                    direccion.calle, direccion.numero, direccion.piso,
                    direccion.codigoPostal, direccion.provincia, direccion.localidad
                ), fechaGraduacion, titulo);
                listaEstudiantes.agregarEstudiante(estudianteGraduado);
                guardarListaEstudiantes();

                alert("Estudiante graduado añadido correctamente.");
                cerrarModal('modalAñadirEstudianteGraduado');
            }
        });
    }

    // Manejo de pasos del formulario
    const steps = document.querySelectorAll(".form-step");
    const nextButtons = document.querySelectorAll(".next-step");
    const prevButtons = document.querySelectorAll(".prev-step");

    // Función para validar todos los campos de un paso
    function validarPaso(stepNumber, formId) {
        let esValido = true;
        document.querySelectorAll(`#${formId} #step-${stepNumber} input`).forEach(input => {
            const errorId = input.getAttribute("data-error");
            if (!validarCampo(input, errorId)) esValido = false;
        });
        return esValido;
    }

    // Función para mostrar un paso
    function showStep(stepNumber, formId) {
        const steps = document.querySelectorAll(`#${formId} .form-step`);
        if (steps.length === 0) return; // Verificar si hay pasos en el formulario

        steps.forEach((step) => step.classList.add("d-none"));
        const stepElement = document.querySelector(`#${formId} #step-${stepNumber}`);
        if (stepElement) {
            stepElement.classList.remove("d-none");
            history.pushState({ step: stepNumber, formId: formId }, "", `?step=${stepNumber}&formId=${formId}`);
        }
    }

    nextButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const currentStep = parseInt(this.getAttribute("data-step")) - 1; // Paso actual
            const nextStep = parseInt(this.getAttribute("data-step"));
            const formId = this.closest("form").id;

            if (validarPaso(currentStep, formId)) {
                showStep(nextStep, formId);
                history.forward();
            }
        });
    });

    prevButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const step = this.getAttribute("data-step");
            const formId = this.closest("form").id;
            showStep(step, formId);
            history.back();
        });
    });

    window.addEventListener("popstate", function (event) {
        if (event.state && event.state.step && event.state.formId) {
            showStep(event.state.step, event.state.formId);
        }
    });

    const urlParams = new URLSearchParams(window.location.search);
    const currentStep = urlParams.get("step") || "1";
    const formId = urlParams.get("formId") || "formAñadirEstudiante";
    showStep(currentStep, formId);

    // Ahora showStep estará disponible globalmente
    window.showStep = showStep;

    // Función para cerrar el modal después de añadir un estudiante y volver al paso 1
    function cerrarModal(modalId) {
        const modalElement = document.getElementById(modalId);
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
        reiniciarFormulario(modalId);
    }

    // Función para reiniciar el formulario al abrir el modal
    function reiniciarFormulario(modalId) {
        const formId = modalId === 'modalAñadirEstudiante' ? 'formAñadirEstudiante' : 'formAñadirEstudianteGraduado';
        document.getElementById(formId).reset();
        document.querySelectorAll(`#${formId} .no-valido`).forEach(el => el.classList.remove('no-valido'));
        document.querySelectorAll(`#${formId} .valido`).forEach(el => el.classList.remove('valido'));
        document.querySelectorAll(`#${formId} .text-danger`).forEach(el => el.style.display = 'none');

        if (typeof showStep === "function") {
            showStep(1, formId);
        }
    }

    // Asegurar que el modal siempre inicie en el primer paso
    document.getElementById('modalAñadirEstudiante').addEventListener('show.bs.modal', function () {
        reiniciarFormulario('modalAñadirEstudiante');
    });

    document.getElementById('modalAñadirEstudianteGraduado').addEventListener('show.bs.modal', function () {
        reiniciarFormulario('modalAñadirEstudianteGraduado');
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
            // Me aseguro de que 'listaEstudiantes' es la instancia correcta
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
});







