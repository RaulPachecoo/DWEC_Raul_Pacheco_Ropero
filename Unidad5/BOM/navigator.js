console.log(navigator.userAgent); //Antigua 
console.log(navigator.userAgentData.brands, 
    navigator.userAgentData.platform
); //Moderna

console.log(navigator.language); 
console.log(navigator.onLine);
console.log(navigator.cookieEnabled);


if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
        (position)=>{
            console.log("Latitud: " + position.coords.latitude); 
            console.log("Longitud: " + position.coords.longitude); 
            console.log("Altitud: " + position.coords.altitude);
        }, {enableHighAccuracy:true}); 
}else{
    console.log("Error, no lo soporta"); 
}






