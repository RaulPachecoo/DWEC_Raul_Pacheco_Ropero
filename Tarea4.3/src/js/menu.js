export function mostrarMenuPrincipal() {
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

export function mostrarMenuAñadir() {
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

export function mostrarMenuEliminar() {
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

export function mostrarMenuBuscar() {
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

export function mostrarMenuCalcular() {
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
