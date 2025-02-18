import Estudiante from './Estudiante.js';
import EstudianteGraduado from './EstudianteGraduado.js';
import Direccion from './Direccion.js';
import ListaEstudiantes from './ListaEstudiantes.js';
import Asignatura from './Asignatura.js';

// Función para manejar la validación de cada campo
function validarCampo(input, errorMessageId, soloSiInteractuado = false) {
    const errorMessage = document.getElementById(errorMessageId);
    if (!errorMessage) return true; // Evitar error si no existe el mensaje de error

    // Si es solo en interacción y no se ha tocado el campo, no valida
    if (soloSiInteractuado && !input.dataset.tocado) {
        return true;
    }

    // Si el campo no es válido o está vacío, se marca como inválido
    if (!input.validity.valid || input.value.trim() === "") {
        input.classList.add('no-valido'); // Añadir clase para marcarlo como inválido
        input.classList.remove('valido'); // Eliminar la clase 'valido' si estaba presente
        errorMessage.style.display = 'block'; // Mostrar el mensaje de error
        return false;
    } else {
        // Si el campo es válido, se marca como válido
        input.classList.add('valido'); // Añadir clase para marcarlo como válido
        input.classList.remove('no-valido'); // Eliminar la clase 'no-valido' si estaba presente
        errorMessage.style.display = 'none'; // Ocultar el mensaje de error
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
    listaEstudiantes.setEstudiantes([]); // Inicializa la lista vacía

    // Intenta obtener los estudiantes guardados desde localStorage
    const estudiantesGuardados = localStorage.getItem('listaEstudiantes');
    if (estudiantesGuardados) {
        try {
            const estudiantesArray = JSON.parse(estudiantesGuardados);

            // Verifica que los datos cargados sean válidos
            if (Array.isArray(estudiantesArray) && estudiantesArray.length > 0) {
                const estudiantes = estudiantesArray
                    .filter(est => est && typeof est === 'object' && Object.keys(est).length > 0) // Filtra objetos vacíos
                    .map(est => {
                        // Validaciones para evitar errores en los estudiantes
                        if (!est.id || typeof est.id !== 'number') {
                            console.warn('Se encontró un estudiante inválido (sin ID) en localStorage:', est);
                            return null; // Si el estudiante no tiene ID, lo descarta
                        }

                        if (!est.direccion || typeof est.direccion !== 'object') {
                            console.warn(`El estudiante con ID ${est.id} no tiene una dirección válida.`);
                            return null; // Si no tiene dirección válida, lo descarta
                        }

                        const { calle, numero, codigoPostal, provincia, localidad, piso } = est.direccion;
                        if (!(calle && numero && codigoPostal && provincia && localidad)) {
                            console.warn(`El estudiante con ID ${est.id} no tiene una dirección completa.`);
                            return null; // Si la dirección está incompleta, lo descarta
                        }

                        // Crea una nueva instancia de 'Direccion' con los datos validados
                        const direccion = new Direccion(
                            calle, numero, piso,
                            codigoPostal, provincia, localidad
                        );

                        let estudiante;
                        // Crea el estudiante basado en si tiene fecha de graduación o no
                        if (est.fechaGraduacion) {
                            estudiante = new EstudianteGraduado(
                                est.nombre, est.edad, direccion,
                                new Date(est.fechaGraduacion), est.titulo
                            );
                        } else {
                            estudiante = new Estudiante(est.nombre, est.edad, direccion);
                        }

                        // Asigna las asignaturas si existen, validando que sean correctas
                        estudiante.asignaturas = Array.isArray(est.asignaturas)
                            ? est.asignaturas.map(asig => {
                                const asignatura = new Asignatura(asig.nombre);
                                asignatura.calificaciones = Array.isArray(asig.calificaciones) ? asig.calificaciones : [];
                                return asignatura;
                            })
                            : [];

                        // Asigna las matrículas si existen, validando que sean correctas
                        estudiante.matriculas = Array.isArray(est.matriculas) ? est.matriculas : [];
                        return estudiante;
                    })
                    .filter(est => est !== null); // Filtra los estudiantes inválidos

                listaEstudiantes.setEstudiantes(estudiantes); // Asigna los estudiantes válidos a la lista
            }
        } catch (error) {
            console.error('Error al parsear estudiantesGuardados:', error);
            localStorage.removeItem('listaEstudiantes'); // Borra los datos si están corruptos
        }
    }
}

// Función para cargar los modales desde un archivo externo
async function cargarModales() {
    try {
        // Realiza la solicitud fetch para cargar los modales desde 'html/modals.html'
        const response = await fetch('html/modals.html');
        const html = await response.text(); // Obtiene el contenido como texto
        document.getElementById('contenedorModales').innerHTML = html; // Inserta el contenido en el contenedor

        // Inicializa eventos y otras funciones necesarias después de cargar los modales
        inicializarEventos();
    } catch (error) {
        console.error('Error cargando los modales:', error); // Muestra el error si ocurre algún problema al cargar
    }
}

// Función para inicializar los eventos relacionados con los formularios de estudiantes
function inicializarEventos() {
    // Inicializa el formulario de añadir estudiante
    const formAñadirEstudiante = document.getElementById('formAñadirEstudiante');
    const formAñadirEstudianteGraduado = document.getElementById('formAñadirEstudianteGraduado');

    // Si existe el formulario de añadir estudiante, se asigna el evento de submit
    if (formAñadirEstudiante) {
        formAñadirEstudiante.addEventListener('submit', function (event) {
            event.preventDefault(); // Evita el envío del formulario por defecto

            // Obtiene los valores de los campos del formulario
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

            // Valida cada uno de los campos del formulario
            const campos = [
                { id: 'nombreEstudiante', errorId: 'errorNombre' },
                { id: 'edadEstudiante', errorId: 'errorEdad' },
                { id: 'calleEstudiante', errorId: 'errorCalle' },
                { id: 'numeroEstudiante', errorId: 'errorNumero' },
                { id: 'codigoPostalEstudiante', errorId: 'errorCodigoPostal' },
                { id: 'provinciaEstudiante', errorId: 'errorProvincia' },
                { id: 'localidadEstudiante', errorId: 'errorLocalidad' }
            ];

            // Recorre los campos y realiza la validación
            campos.forEach(({ id, errorId }) => {
                const input = document.getElementById(id);
                if (!validarCampo(input, errorId)) esValido = false; // Si alguna validación falla, marca como no válido
            });

            // Si todos los campos son válidos, agrega el estudiante a la lista
            if (esValido) {
                let estudiante = new Estudiante(nombre, edad, new Direccion(
                    direccion.calle, direccion.numero, direccion.piso,
                    direccion.codigoPostal, direccion.provincia, direccion.localidad
                ));
                listaEstudiantes.agregarEstudiante(estudiante);
                guardarListaEstudiantes(); // Guarda la lista actualizada en localStorage

                alert("Estudiante añadido correctamente.");
                cerrarModal('modalAñadirEstudiante'); // Cierra el modal
            }
        });
    }

    // Inicializa el formulario de añadir estudiante graduado (similar al anterior)
    if (formAñadirEstudianteGraduado) {
        formAñadirEstudianteGraduado.addEventListener('submit', function (event) {
            event.preventDefault(); // Evita el envío del formulario por defecto

            // Obtiene los valores de los campos del formulario
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

            // Valida cada uno de los campos del formulario
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

            // Recorre los campos y realiza la validación
            campos.forEach(({ id, errorId }) => {
                const input = document.getElementById(id);
                if (!validarCampo(input, errorId)) esValido = false; // Si alguna validación falla, marca como no válido
            });

            // Si todos los campos son válidos, agrega el estudiante graduado a la lista
            if (esValido) {
                let estudianteGraduado = new EstudianteGraduado(nombre, edad, new Direccion(
                    direccion.calle, direccion.numero, direccion.piso,
                    direccion.codigoPostal, direccion.provincia, direccion.localidad
                ), fechaGraduacion, titulo);
                listaEstudiantes.agregarEstudiante(estudianteGraduado);
                guardarListaEstudiantes(); // Guarda la lista actualizada en localStorage

                alert("Estudiante graduado añadido correctamente.");
                cerrarModal('modalAñadirEstudianteGraduado'); // Cierra el modal
            }
        });
    }



    // Selecciona todos los elementos relacionados con los pasos del formulario, botones de siguiente y anterior
    const steps = document.querySelectorAll(".form-step"); // Todos los pasos del formulario
    const nextButtons = document.querySelectorAll(".next-step"); // Botones de siguiente
    const prevButtons = document.querySelectorAll(".prev-step"); // Botones de anterior

    // Función que valida los campos de un paso específico del formulario
    function validarPaso(stepNumber, formId) {
        let esValido = true;

        // Recorre todos los inputs del paso específico
        document.querySelectorAll(`#${formId} #step-${stepNumber} input`).forEach(input => {
            const errorId = input.getAttribute("data-error"); // Obtiene el ID del mensaje de error
            if (!validarCampo(input, errorId)) esValido = false; // Valida el campo y marca como no válido si hay un error
        });

        return esValido; // Devuelve si el paso es válido
    }

    // Función para mostrar un paso específico del formulario
    function showStep(stepNumber, formId) {
        const steps = document.querySelectorAll(`#${formId} .form-step`); // Obtiene todos los pasos del formulario
        if (steps.length === 0) return; // Si no hay pasos, termina la función

        // Oculta todos los pasos
        steps.forEach((step) => step.classList.add("d-none"));

        // Muestra el paso solicitado
        const stepElement = document.querySelector(`#${formId} #step-${stepNumber}`);
        if (stepElement) {
            stepElement.classList.remove("d-none"); // Elimina la clase d-none para mostrar el paso
            // Actualiza la URL con el número de paso y el ID del formulario
            history.pushState({ step: stepNumber, formId: formId }, "", `?step=${stepNumber}&formId=${formId}`);
        }
    }

    // Evento de los botones de siguiente
    nextButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const currentStep = parseInt(this.getAttribute("data-step")) - 1; // Obtiene el paso actual
            const nextStep = parseInt(this.getAttribute("data-step")); // Obtiene el siguiente paso
            const formId = this.closest("form").id; // Obtiene el ID del formulario

            // Si el paso actual es válido, muestra el siguiente paso y avanza en el historial
            if (validarPaso(currentStep, formId)) {
                showStep(nextStep, formId);
                history.pushState({ step: nextStep, formId: formId }, "", `?step=${nextStep}&formId=${formId}`); // Avanza un paso en el historial
            }
        });
    });

    // Evento de los botones de anterior
    prevButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const step = parseInt(this.getAttribute("data-step")); // Obtiene el paso actual
            const formId = this.closest("form").id; // Obtiene el ID del formulario
            showStep(step, formId); // Muestra el paso anterior
            history.pushState({ step: step, formId: formId }, "", `?step=${step}&formId=${formId}`); // Retrocede un paso en el historial
        });
    });

    // Escucha los cambios en el historial para navegar entre los pasos al usar el navegador
    window.addEventListener("popstate", function (event) {
        if (event.state && event.state.step && event.state.formId) {
            showStep(event.state.step, event.state.formId); // Muestra el paso y formulario correspondientes
        }
    });

    // Obtiene el número de paso y el ID del formulario desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const currentStep = urlParams.get("step") || "1"; // Paso actual, por defecto el paso 1
    const formId = urlParams.get("formId") || "formAñadirEstudiante"; // ID del formulario, por defecto 'formAñadirEstudiante'

    // Muestra el paso actual desde la URL
    showStep(currentStep, formId);

    // Expone la función showStep globalmente
    window.showStep = showStep;

    // Función para cerrar un modal y reiniciar el formulario asociado
    function cerrarModal(modalId) {
        const modalElement = document.getElementById(modalId);
        if (modalElement) {
            const modal = bootstrap.Modal.getInstance(modalElement); // Obtiene la instancia del modal
            modal.hide(); // Oculta el modal
            reiniciarFormulario(modalId); // Reinicia el formulario asociado al modal
        }
    }

    // Función para reiniciar el formulario de un modal
    function reiniciarFormulario(modalId) {
        const formId = modalId === 'modalAñadirEstudiante' ? 'formAñadirEstudiante' : 'formAñadirEstudianteGraduado'; // Define qué formulario reiniciar
        const form = document.getElementById(formId); // Obtiene el formulario correspondiente
        if (form) {
            form.reset(); // Resetea los campos del formulario
            // Elimina las clases de validación de los campos
            document.querySelectorAll(`#${formId} .no-valido`).forEach(el => el.classList.remove('no-valido'));
            document.querySelectorAll(`#${formId} .valido`).forEach(el => el.classList.remove('valido'));
            // Oculta los mensajes de error
            document.querySelectorAll(`#${formId} .text-danger`).forEach(el => el.style.display = 'none');
            showStep(1, formId); // Muestra el primer paso del formulario
        }
    }

    // Configura los eventos para cuando los modales de estudiantes se abran
    const modalAñadirEstudiante = document.getElementById('modalAñadirEstudiante');
    if (modalAñadirEstudiante) {
        modalAñadirEstudiante.addEventListener('show.bs.modal', function () {
            reiniciarFormulario('modalAñadirEstudiante'); // Reinicia el formulario cuando se muestra el modal
        });
    }

    const modalAñadirEstudianteGraduado = document.getElementById('modalAñadirEstudianteGraduado');
    if (modalAñadirEstudianteGraduado) {
        modalAñadirEstudianteGraduado.addEventListener('show.bs.modal', function () {
            reiniciarFormulario('modalAñadirEstudianteGraduado'); // Reinicia el formulario cuando se muestra el modal
        });
    }

    // Función para gestionar el envío del formulario de añadir asignatura
    const formAñadirAsignatura = document.getElementById('formAñadirAsignatura');
    if (formAñadirAsignatura) {
        formAñadirAsignatura.addEventListener('submit', function (evento) {
            evento.preventDefault(); // Previene el comportamiento por defecto del formulario

            let valido = true;

            // Valida los campos del formulario
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

            // Si los campos son válidos, matricula la asignatura al estudiante
            if (valido) {
                const estudianteMatricular = listaEstudiantes.buscarEstudiantePorID(parseInt(idEstudianteMatricular.value));

                if (!estudianteMatricular) {
                    alert("Estudiante no encontrado.");
                    return;
                }

                // Matricula la asignatura al estudiante
                estudianteMatricular.matricularAsignatura(nombreAsignaturaMatricular.value);
                alert("Asignatura matriculada correctamente.");
                guardarListaEstudiantes(); // Guarda la lista de estudiantes actualizada

                // Cierra el modal y resetea el formulario
                const modalElemento = document.getElementById('modalAñadirAsignatura');
                const modal = bootstrap.Modal.getInstance(modalElemento);
                modal.hide();

                document.getElementById('formAñadirAsignatura').reset(); // Resetea el formulario de asignatura
            }
        });
    }


    // Obtiene el formulario de añadir calificación
    const formAñadirCalificacion = document.getElementById('formAñadirCalificacion');

    // Si el formulario de añadir calificación existe
    if (formAñadirCalificacion) {
        // Escucha el evento de envío del formulario
        formAñadirCalificacion.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevé la acción por defecto de enviar el formulario

            let valido = true; // Inicializa la variable para saber si el formulario es válido

            // Obtiene los elementos de los campos del formulario
            const idEstudianteCalificar = document.getElementById('idEstudianteCalificar');
            const nombreAsignaturaCalificar = document.getElementById('nombreAsignaturaCalificar');
            const calificacionInput = document.getElementById('calificacion');

            // Valida el campo ID del estudiante
            if (!idEstudianteCalificar.validity.valid) {
                valido = false;
                validarCampo(idEstudianteCalificar, 'errorIdEstudianteCalificar'); // Muestra el error si es inválido
            }

            // Valida el campo nombre de la asignatura
            if (!nombreAsignaturaCalificar.validity.valid) {
                valido = false;
                validarCampo(nombreAsignaturaCalificar, 'errorNombreAsignaturaCalificar'); // Muestra el error si es inválido
            }

            // Valida la calificación
            const calificacion = parseFloat(calificacionInput.value);
            if (isNaN(calificacion) || calificacion < 0 || calificacion > 10) {
                valido = false;
                // Si la calificación es inválida, muestra el error
                calificacionInput.classList.add('no-valido');
                calificacionInput.classList.remove('valido');
                document.getElementById('errorCalificacion').style.display = 'block';
            } else {
                // Si la calificación es válida, muestra el campo como válido y oculta el error
                calificacionInput.classList.add('valido');
                calificacionInput.classList.remove('no-valido');
                document.getElementById('errorCalificacion').style.display = 'none';
            }

            // Si todos los campos son válidos
            if (valido) {
                // Busca el estudiante por ID
                const estudianteCalificar = listaEstudiantes.buscarEstudiantePorID(parseInt(idEstudianteCalificar.value));

                if (!estudianteCalificar) {
                    alert("Estudiante no encontrado.");
                    return;
                }

                // Busca la asignatura del estudiante
                const asignaturaCalificar = estudianteCalificar.buscarAsignatura(nombreAsignaturaCalificar.value, true);

                if (!asignaturaCalificar) {
                    alert("Asignatura no encontrada.");
                    return;
                }

                // Agrega la calificación a la asignatura del estudiante
                asignaturaCalificar.agregarCalificacion(parseInt(idEstudianteCalificar.value), calificacion);
                alert("Calificación añadida correctamente.");
                guardarListaEstudiantes(); // Guarda la lista de estudiantes con la nueva calificación

                // Cierra el modal de añadir calificación
                const modalElement = document.getElementById('modalAñadirCalificacion');
                const modal = bootstrap.Modal.getInstance(modalElement);
                modal.hide();

                // Resetea el formulario de calificación
                document.getElementById('formAñadirCalificacion').reset();
            }
        });
    }

    // Función para cargar los estudiantes en el select del formulario de eliminar estudiante
    function cargarEstudiantesEnSelectEliminar() {
        const selectEstudiante = document.getElementById('idEstudianteEliminar');
        if (selectEstudiante) {
            // Limpia las opciones actuales del select
            selectEstudiante.innerHTML = '<option value="">Seleccione un estudiante...</option>';

            // Carga todos los estudiantes en el select
            listaEstudiantes.estudiantes.forEach(estudiante => {
                const option = document.createElement('option');
                option.value = estudiante.id;
                option.textContent = `${estudiante.nombre} (ID: ${estudiante.id})`; // Muestra el nombre del estudiante y su ID
                selectEstudiante.appendChild(option);
            });
        }
    }

    // Obtiene el formulario de eliminar estudiante
    const formEliminarEstudiante = document.getElementById('formEliminarEstudiante');

    // Si el formulario de eliminar estudiante existe
    if (formEliminarEstudiante) {
        // Escucha el evento de envío del formulario
        formEliminarEstudiante.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevé el comportamiento por defecto de enviar el formulario

            // Obtiene el ID del estudiante a eliminar
            const idEstudiante = parseInt(document.getElementById('idEstudianteEliminar').value);

            // Verifica que se haya seleccionado un estudiante
            if (!idEstudiante) {
                alert("Por favor, seleccione un estudiante.");
                return;
            }

            // Busca al estudiante seleccionado
            const estudiante = listaEstudiantes.buscarEstudiantePorID(idEstudiante);

            if (!estudiante) {
                alert("El estudiante seleccionado no existe.");
                return;
            }

            // Pide confirmación para eliminar al estudiante
            if (!confirm(`¿Seguro que deseas eliminar a ${estudiante.nombre}?`)) {
                return;
            }

            // Elimina al estudiante de la lista
            listaEstudiantes.eliminarEstudiante(idEstudiante);
            guardarListaEstudiantes(); // Guarda la lista de estudiantes actualizada
            alert(`Estudiante "${estudiante.nombre}" eliminado correctamente.`);

            // Cierra el modal de eliminar estudiante
            const modalElement = document.getElementById('modalEliminarEstudiante');
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal.hide();
        });
    }

    // Configura el modal de eliminar estudiante para cargar la lista de estudiantes cuando se muestre
    const modalEliminarEstudiante = document.getElementById('modalEliminarEstudiante');
    if (modalEliminarEstudiante) {
        modalEliminarEstudiante.addEventListener('show.bs.modal', cargarEstudiantesEnSelectEliminar);
    }

    // Función para cargar los estudiantes en el select del formulario de eliminar asignatura
    function cargarEstudiantesEnSelectEliminarAsignatura() {
        const selectEstudiante = document.getElementById('idEstudianteEliminar');
        if (selectEstudiante) {
            // Limpia las opciones actuales del select
            selectEstudiante.innerHTML = '<option value="">Seleccione un estudiante...</option>';

            // Carga todos los estudiantes en el select
            listaEstudiantes.estudiantes.forEach(estudiante => {
                const option = document.createElement('option');
                option.value = estudiante.id;
                option.textContent = `${estudiante.nombre} (ID: ${estudiante.id})`; // Muestra el nombre del estudiante y su ID
                selectEstudiante.appendChild(option);
            });
        }
    }

    // Evento para cargar las asignaturas del estudiante seleccionado en el select correspondiente
    const idEstudianteEliminar = document.getElementById('idEstudianteEliminar');
    if (idEstudianteEliminar) {
        idEstudianteEliminar.addEventListener('change', function () {
            const idEstudiante = parseInt(this.value); // Obtiene el ID del estudiante seleccionado
            const estudiante = listaEstudiantes.buscarEstudiantePorID(idEstudiante);
            const selectAsignatura = document.getElementById('asignaturaEliminar');

            if (selectAsignatura) {
                // Limpia las opciones actuales del select de asignaturas
                selectAsignatura.innerHTML = '<option value="">Seleccione una asignatura...</option>';

                // Si el estudiante existe, carga sus asignaturas en el select
                if (estudiante) {
                    estudiante.asignaturas.forEach(asignatura => {
                        const option = document.createElement('option');
                        option.value = asignatura.nombre;
                        option.textContent = asignatura.nombre; // Muestra el nombre de la asignatura
                        selectAsignatura.appendChild(option);
                    });
                }
            }
        });
    }


    // Obtiene el formulario de eliminar asignatura
    const formEliminarAsignatura = document.getElementById('formEliminarAsignatura');

    // Si el formulario de eliminar asignatura existe
    if (formEliminarAsignatura) {
        // Escucha el evento de envío del formulario
        formEliminarAsignatura.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevé el comportamiento por defecto de enviar el formulario

            // Obtiene el ID del estudiante y el nombre de la asignatura a eliminar
            const idEstudiante = parseInt(document.getElementById('idEstudianteEliminar').value);
            const nombreAsignatura = document.getElementById('asignaturaEliminar').value;

            // Verifica que se haya seleccionado un estudiante y una asignatura
            if (!idEstudiante || !nombreAsignatura) {
                alert("Por favor, seleccione un estudiante y una asignatura.");
                return;
            }

            // Busca al estudiante por ID
            const estudiante = listaEstudiantes.buscarEstudiantePorID(idEstudiante);

            if (!estudiante) {
                alert("El estudiante seleccionado no existe.");
                return;
            }

            // Desmatricula al estudiante de la asignatura seleccionada
            estudiante.desmatricularAsignatura(nombreAsignatura);
            alert(`Asignatura "${nombreAsignatura}" desmatriculada correctamente.`);

            // Guarda la lista de estudiantes actualizada
            guardarListaEstudiantes();

            // Cierra el modal de eliminar asignatura
            const modalElement = document.getElementById('modalEliminarAsignatura');
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal.hide();
        });
    }

    // Configura el modal de eliminar asignatura para cargar la lista de estudiantes cuando se muestre
    const modalEliminarAsignatura = document.getElementById('modalEliminarAsignatura');
    if (modalEliminarAsignatura) {
        modalEliminarAsignatura.addEventListener('show.bs.modal', cargarEstudiantesEnSelectEliminarAsignatura);
    }

    // Función para cargar los estudiantes en el select del formulario de eliminar calificación
    function cargarEstudiantesEnSelectEliminarCalif() {
        const selectEstudiante = document.getElementById('idEstudianteEliminarCalif');
        if (selectEstudiante) {
            // Limpia las opciones actuales del select
            selectEstudiante.innerHTML = '<option value="">Seleccione un estudiante...</option>';

            // Carga todos los estudiantes en el select
            listaEstudiantes.estudiantes.forEach(estudiante => {
                const option = document.createElement('option');
                option.value = estudiante.id;
                option.textContent = `${estudiante.nombre} (ID: ${estudiante.id})`; // Muestra el nombre y ID del estudiante
                selectEstudiante.appendChild(option);
            });
        }
    }

    // Obtiene el select de estudiante para eliminar calificación
    const idEstudianteEliminarCalif = document.getElementById('idEstudianteEliminarCalif');
    if (idEstudianteEliminarCalif) {
        // Escucha el evento de cambio del select de estudiante
        idEstudianteEliminarCalif.addEventListener('change', function () {
            const idEstudiante = parseInt(this.value); // Obtiene el ID del estudiante seleccionado
            const selectAsignatura = document.getElementById('nombreAsignaturaEliminarCalif');
            selectAsignatura.innerHTML = '<option value="">Seleccione una asignatura...</option>'; // Limpia las asignaturas previas

            // Busca al estudiante seleccionado
            const estudiante = listaEstudiantes.buscarEstudiantePorID(idEstudiante);
            if (estudiante) {
                // Si el estudiante existe, carga sus asignaturas en el select
                estudiante.asignaturas.forEach(asignatura => {
                    const option = document.createElement('option');
                    option.value = asignatura.nombre;
                    option.textContent = asignatura.nombre; // Muestra el nombre de la asignatura
                    selectAsignatura.appendChild(option);
                });
            }
        });
    }

    // Obtiene el formulario de eliminar calificación
    const formEliminarCalificacion = document.getElementById('formEliminarCalificacion');

    // Si el formulario de eliminar calificación existe
    if (formEliminarCalificacion) {
        // Escucha el evento de envío del formulario
        formEliminarCalificacion.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevé el comportamiento por defecto de enviar el formulario

            // Obtiene el ID del estudiante y el nombre de la asignatura para eliminar la calificación
            const idEstudiante = parseInt(document.getElementById('idEstudianteEliminarCalif').value);
            const nombreAsignatura = document.getElementById('nombreAsignaturaEliminarCalif').value;

            // Verifica que se haya seleccionado un estudiante y una asignatura
            if (!idEstudiante || !nombreAsignatura) {
                alert("Por favor, seleccione un estudiante y una asignatura.");
                return;
            }

            // Busca al estudiante por ID
            const estudiante = listaEstudiantes.buscarEstudiantePorID(idEstudiante);
            if (!estudiante) {
                alert("El estudiante seleccionado no existe.");
                return;
            }

            // Busca la asignatura seleccionada
            const asignatura = estudiante.buscarAsignatura(nombreAsignatura, true);
            if (!asignatura) {
                alert("La asignatura seleccionada no existe.");
                return;
            }

            // Pide confirmación antes de eliminar todas las calificaciones de la asignatura
            if (!confirm(`¿Seguro que deseas eliminar todas las calificaciones de "${nombreAsignatura}" para ${estudiante.nombre}?`)) {
                return;
            }

            // Elimina las calificaciones de la asignatura seleccionada para el estudiante
            asignatura.eliminarCalificacion(estudiante.id);
            alert(`Calificaciones de "${nombreAsignatura}" eliminadas correctamente para ${estudiante.nombre}.`);

            // Guarda la lista de estudiantes con la eliminación aplicada
            guardarListaEstudiantes();

            // Cierra el modal de eliminar calificación
            const modalElement = document.getElementById('modalEliminarCalificacion');
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal.hide();
        });
    }

    // Configura el modal de eliminar calificación para cargar la lista de estudiantes cuando se muestre
    const modalEliminarCalificacion = document.getElementById('modalEliminarCalificacion');
    if (modalEliminarCalificacion) {
        modalEliminarCalificacion.addEventListener('show.bs.modal', cargarEstudiantesEnSelectEliminarCalif);
    }

    // Función para cargar los estudiantes en el select para el cálculo de promedio
    function cargarEstudiantesEnSelectPromedio() {
        const selectEstudiante = document.getElementById('idEstudiantePromedio');
        if (selectEstudiante) {
            // Limpia las opciones actuales del select
            selectEstudiante.innerHTML = '<option value="">Seleccione un estudiante...</option>';

            // Carga todos los estudiantes en el select
            listaEstudiantes.estudiantes.forEach(estudiante => {
                const option = document.createElement('option');
                option.value = estudiante.id;
                option.textContent = `${estudiante.nombre} (ID: ${estudiante.id})`; // Muestra el nombre y ID del estudiante
                selectEstudiante.appendChild(option);
            });
        }
    }


    // Obtiene el formulario para mostrar el promedio de un estudiante
    const formMostrarPromedio = document.getElementById('formMostrarPromedio');

    // Si el formulario de mostrar promedio existe
    if (formMostrarPromedio) {
        // Escucha el evento de envío del formulario
        formMostrarPromedio.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevé el comportamiento por defecto de enviar el formulario

            // Obtiene el ID del estudiante seleccionado y el elemento donde mostrar el resultado
            const idEstudiante = parseInt(document.getElementById('idEstudiantePromedio').value);
            const resultadoPromedio = document.getElementById('resultadoPromedio');

            // Verifica si se seleccionó un estudiante
            if (!idEstudiante) {
                alert("Por favor, seleccione un estudiante.");
                return;
            }

            // Busca al estudiante por su ID
            const estudiante = listaEstudiantes.buscarEstudiantePorID(idEstudiante);
            if (!estudiante) {
                alert("El estudiante seleccionado no existe.");
                return;
            }

            try {
                // Intenta calcular el promedio del estudiante
                const promedio = estudiante.calcularPromedio();
                resultadoPromedio.textContent = `${promedio.toFixed(2)}`; // Muestra el promedio con dos decimales
            } catch (error) {
                // Si ocurre un error al calcular el promedio, muestra un mensaje de error
                resultadoPromedio.textContent = "Error al calcular el promedio.";
                console.error(`Error al calcular el promedio: ${error.message}`);
            }
        });
    }

    // Obtiene el modal de mostrar promedio de estudiante
    const modalMostrarPromedioEstudiante = document.getElementById('modalMostrarPromedioEstudiante');

    // Si el modal existe, carga la lista de estudiantes en el select cuando se muestre
    if (modalMostrarPromedioEstudiante) {
        modalMostrarPromedioEstudiante.addEventListener('show.bs.modal', cargarEstudiantesEnSelectPromedio);
    }

    // Obtiene el formulario para mostrar el promedio de una asignatura
    const formPromedioAsignatura = document.getElementById('formPromedioAsignatura');

    // Si el formulario de mostrar promedio por asignatura existe
    if (formPromedioAsignatura) {
        // Escucha el evento de envío del formulario
        formPromedioAsignatura.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevé el comportamiento por defecto de enviar el formulario

            // Obtiene el nombre de la asignatura y el elemento donde mostrar el resultado
            const nombreAsignatura = document.getElementById('nombreAsignaturaPromedio').value.trim();
            const resultadoPromedioAsignatura = document.getElementById('resultadoPromedioAsignatura');

            // Verifica que se haya ingresado el nombre de la asignatura
            if (!nombreAsignatura) {
                alert("Por favor, ingrese el nombre de una asignatura.");
                return;
            }

            // Obtiene el promedio de la asignatura de todos los estudiantes
            const promedio = listaEstudiantes.obtenerPromedioAsignatura(nombreAsignatura);

            // Si la asignatura no fue encontrada, muestra un mensaje correspondiente
            if (promedio === null) {
                resultadoPromedioAsignatura.textContent = "Asignatura no encontrada.";
            } else {
                // Muestra el promedio de la asignatura con dos decimales
                resultadoPromedioAsignatura.textContent = `${promedio.toFixed(2)}`;
            }
        });
    }

    // Obtiene el botón para calcular el promedio general de todos los estudiantes
    const btnCalcularPromedioGeneral = document.getElementById('btnCalcularPromedioGeneral');

    // Si el botón existe, agrega el evento de clic
    if (btnCalcularPromedioGeneral) {
        btnCalcularPromedioGeneral.addEventListener('click', function () {
            const resultadoPromedioGeneral = document.getElementById('resultadoPromedioGeneral');

            // Calcula el promedio general de todos los estudiantes
            const promedioGeneral = listaEstudiantes.calcularPromedioGeneral();

            // Si no hay estudiantes, muestra un mensaje correspondiente
            if (promedioGeneral === null) {
                resultadoPromedioGeneral.textContent = "No hay estudiantes en la lista.";
            } else {
                // Muestra el promedio general con dos decimales
                resultadoPromedioGeneral.textContent = `${promedioGeneral.toFixed(2)}`;
            }
        });
    }

    // Obtiene el botón de búsqueda de estudiantes
    const btnBuscarEstudiante = document.getElementById('btnBuscarEstudiante');

    // Si el botón existe, agrega el evento de clic para realizar la búsqueda
    if (btnBuscarEstudiante) {
        btnBuscarEstudiante.addEventListener('click', function () {
            const patronEstudiante = document.getElementById('patronBusquedaEstudiante').value.trim();
            const resultadosEstudiantes = listaEstudiantes.buscarEstudiante(patronEstudiante);
            const resultadosElemento = document.getElementById('resultadosBusquedaEstudiante');

            // Limpia los resultados previos de la búsqueda
            resultadosElemento.innerHTML = "";

            // Si no se encontraron estudiantes, muestra un mensaje
            if (resultadosEstudiantes.length === 0) {
                resultadosElemento.innerHTML = "<li class='list-group-item'>Estudiante no encontrado.</li>";
            } else {
                // Muestra los resultados de la búsqueda con los estudiantes encontrados
                resultadosEstudiantes.forEach(estudiante => {
                    const listItem = document.createElement('li');
                    listItem.classList.add('list-group-item');
                    listItem.textContent = `ID: ${estudiante.id}, Nombre: ${estudiante.nombre}`; // Muestra el ID y nombre
                    resultadosElemento.appendChild(listItem);
                });
            }
        });
    }

    // Obtiene el botón de búsqueda de estudiantes graduados
    const btnBuscarEstudianteGraduado = document.getElementById('btnBuscarEstudianteGraduado');

    // Si el botón existe, agrega el evento de clic para realizar la búsqueda de graduados
    if (btnBuscarEstudianteGraduado) {
        btnBuscarEstudianteGraduado.addEventListener('click', function () {
            const patronGraduado = document.getElementById('patronBusquedaGraduado').value.trim();
            const resultadosGraduados = listaEstudiantes.buscarEstudiantesGraduados(patronGraduado);
            const resultadosElemento = document.getElementById('resultadosBusquedaGraduado');

            // Limpia los resultados previos de la búsqueda
            resultadosElemento.innerHTML = "";

            // Si no se encontraron graduados, muestra un mensaje
            if (resultadosGraduados.length === 0) {
                resultadosElemento.innerHTML = "<li class='list-group-item'>No se encontraron estudiantes graduados que coincidan con el patrón.</li>";
            } else {
                // Muestra los resultados de la búsqueda con los graduados encontrados
                resultadosGraduados.forEach(graduado => {
                    const listItem = document.createElement('li');
                    listItem.classList.add('list-group-item');
                    listItem.textContent = graduado.toString(); // Muestra la representación en cadena del graduado
                    resultadosElemento.appendChild(listItem);
                });
            }
        });
    }


    // Obtiene el botón para buscar asignaturas de un estudiante
    const btnBuscarAsignatura = document.getElementById('btnBuscarAsignatura');

    // Si el botón de búsqueda de asignaturas existe, agrega el evento de clic
    if (btnBuscarAsignatura) {
        btnBuscarAsignatura.addEventListener('click', function () {
            // Obtiene el ID del estudiante y el patrón de búsqueda para las asignaturas
            const idEstudianteBuscarAsig = parseInt(document.getElementById('idEstudianteBuscarAsig').value.trim());
            const patronAsignatura = document.getElementById('patronBusquedaAsignatura').value.trim();
            const resultadosElemento = document.getElementById('resultadosBusquedaAsignatura');

            // Busca al estudiante por su ID en la lista de estudiantes
            const estudianteBuscarAsig = listaEstudiantes.buscarEstudiantePorID(idEstudianteBuscarAsig);

            // Limpia los resultados previos de la búsqueda
            resultadosElemento.innerHTML = "";

            // Si no se encuentra al estudiante, muestra un mensaje de error
            if (!estudianteBuscarAsig) {
                resultadosElemento.innerHTML = "<li class='list-group-item'>Estudiante no encontrado.</li>";
            } else {
                // Si el estudiante es encontrado, busca las asignaturas que coincidan con el patrón de búsqueda
                const resultadosAsignaturas = estudianteBuscarAsig.buscarAsignatura(patronAsignatura);

                // Si no se encuentran asignaturas que coincidan con el patrón, muestra un mensaje
                if (resultadosAsignaturas.length === 0) {
                    resultadosElemento.innerHTML = "<li class='list-group-item'>No se encontraron asignaturas que coincidan con el patrón.</li>";
                } else {
                    // Si se encuentran asignaturas, muestra los resultados en una lista
                    resultadosAsignaturas.forEach(asignatura => {
                        const listItem = document.createElement('li');
                        listItem.classList.add('list-group-item');
                        listItem.textContent = asignatura.nombre; // Muestra el nombre de la asignatura
                        resultadosElemento.appendChild(listItem);
                    });
                }
            }
        });
    }

    // Obtiene el botón para generar el reporte de los estudiantes
    const btnGenerarReporte = document.getElementById('btnGenerarReporte');

    // Si el botón de generar reporte existe, agrega el evento de clic
    if (btnGenerarReporte) {
        btnGenerarReporte.addEventListener('click', function () {
            try {
                // Intenta generar el reporte de estudiantes llamando a la función correspondiente
                const reporte = listaEstudiantes.generarReporte();

                // Abre una nueva ventana para mostrar el reporte
                const nuevaVentana = window.open('', '_blank');

                // Escribe el contenido del reporte en la nueva ventana
                nuevaVentana.document.write(`
                <html>
                    <head>
                        <title>Reporte de Estudiantes</title>
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

                // Cierra el flujo de escritura en el documento de la nueva ventana
                nuevaVentana.document.close();
            } catch (error) {
                // Si ocurre un error al generar el reporte, lo muestra en la consola
                console.error("Error al generar reporte: ", error);
            }
        });
    }
}
// Llama a las funciones que cargan los modales y la lista de estudiantes
cargarModales();
cargarListaEstudiantes();

