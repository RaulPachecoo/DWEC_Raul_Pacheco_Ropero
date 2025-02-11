document.querySelector("button").addEventListener("click", () => {
    fetch("https://api.chucknorris.io/jokes/random")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al conectar al servidor");
            }
            return response.json(); 
        })
        .then(datos => {
            console.log(datos);
            const parrafo = document.createElement("p");
            parrafo.innerText = datos.value; 
            document.body.append(parrafo);
        })
        .catch(error => {
            console.error(error);
        });
});


const imagen1 = "https://unsplash.com/search/photos?query=dog&client_id=706109"; 
const imagen2 = "https://unsplash.com/search/photos?query=dog&client_id=706109"; 
const imagen3 = "https://unsplash.com/search/photos?query=dog&client_id=706109"; 

promesa1 = cargarImagen(imagen1); 
promesa2 = cargarImagen(imagen2); 
promesa3 = cargarImagen(imagen3); 

function cargarImagen(url){
    return new Promise((resolve, reject)=> {
        const img = new Image(); 
        img.src = url; 
        img.onload=()=>resolve(img); 
        img.oneerror=()=>reject("Error al cargar"); 
    })
}

Promise.all([promesa1, promesa2, promesa3])
    .then(imagenes=>{
        imagenes.forEach(imagen => {
            document.body.append(imagen); 
        });
    }).catch(error=>{
        console.log(error); 
    }); 


const client_id = "706109"; 
const endpoint = "https://api.unsplash.com/search/dog"; 