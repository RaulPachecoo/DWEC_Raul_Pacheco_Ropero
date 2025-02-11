// console.log(location.href); 
// //location.href = "https://www.google.es"
// console.log(location.protocol, 
//     location.host, 
//     location.hostname, 
//     location.port, 
//     location.pathname, 
//     location.search, 
//     location.hash
// ); 

// location.replace(); //Redirigir y sustituir 
// location.assign() //Redirige pero no sustituye

//history
//SPA

//history.back() //->lleva a la página anterior en el historial
// let numero = 1; 
// document.getElementById("anyadir").addEventListener("click", ()=>{
//     const informacion = {page: numero, titulo: `Página ${numero}`};
//     history.pushState(informacion, `Página ${numero}`, `?pagina=${numero}`) ; 
//     console.log(`Se ha añadido al historial la info ${numero}`); 
//     numero++; 
// });

// document.getElementById("anterior").addEventListener("click", ()=>{
//     history.back(); 
// });

// document.getElementById("siguiente").addEventListener("click", ()=>{
//     history.forward(); 
// });

// window.addEventListener("popstate", ()=>{
//     console.log(history.state.titulo); 
// }); 


//Almacenamiento en el cliente
//sessionStorage
//cookies

/*
localStorage

1-Vida útil -> No tiene fecha de fin (Hasta que se borre explícitamente)
2- Alcance -> Sólo las webs del mismo origen (protocolo+dominio+puerto)
3- Capacidad -> depende del navegador (5MB)
4- Tipos de datos -> string. Si quiero objetos -> JSON
5- Disponibilidad -> Cualquier pestaña o ventana del navegador (tener en cuenta alcance)
*/

// localStorage.setItem("nombre", "Atanasio"); 
// localStorage.setItem("edad", "25"); 
// localStorage.setItem("profesión", "deshollinador")
// //localStorage.clear(); 
// console.log(localStorage.getItem("nombre"));
// console.log(localStorage.length); 

// //funciona solo cuando se modifica el almac. en otra pestaña del mismmo dominio
// window.addEventListener("storage", (evento)=>{
//     console.log("Esto es el evento");   
//     console.log(`Algo se ha introducido en el localStorage ${evento.key} ${evento.newValue}`); 
// })


/*
//sesionStorage

1-Vida útil -> la sesión (hasta que se cierre la pestaña)
2- Alcance -> Sólo las webs del mismo origen (protocolo+dominio+puerto)
3- Capacidad -> depende del navegador (5MB)
4- Tipos de datos -> string. Si quiero objetos -> JSON
5- Disponibilidad -> sólo la pestaña actual
*/

// sessionStorage.setItem("nombre", "Atanasio"); 
// sessionStorage.setItem("edad", "25"); 
// sessionStorage.setItem("profesión", "deshollinador")
// //sessionStorage.clear(); 
// console.log(sessionStorage.getItem("nombre"));
// console.log(sessionStorage.length); 

/* 
Cookies
 BOM -> DOM (document)
stateless
origen(first-party) -> dominio actual
terceros (third-party) -> dominios
1-Vida útil -> Fecha de fin
2- Alcance -> Sólo las webs del mismo dominio
3- Capacidad -> 4k por cookie
4- Tipos de datos -> string. Si quiero objetos -> JSON
5- Disponibilidad -> sólo la pestaña actual

- expires -> Fecha en formato UTF: "Thu, 6 Feb 2025, 12:00:00 UTC", PD sesión
- max-age -> validez en sg 
- path -> Ruta para la que es válida www.midominio.com/productos. PD: directorio en el que esté
- domain -> Dominio www.midominio.com 
- secure -> sólo si la conex es HTTPS. PD: False
- samesite -> Controlalas solicitudes entre sitios. PD: LAX
    - strict: solo se manda si la solic viene del mismo dominio
    - lax: se manda si viene del mismo dom y DE DOMINIOS DISTINTOS CUANDO EL USUARIO picha en un enlace. NO cuando se manda automático
    - none: se manda en TODAS LAS SOLICITUDES (secure tiene que estar habilitado)
*/

// document.cookie = "nombre=Procopio"; 
document.cookie = "nombre=Procopio ; max-age=3600"; 


