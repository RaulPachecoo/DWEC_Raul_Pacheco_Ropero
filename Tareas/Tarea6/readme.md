# Dog Wiki 🐶

Este proyecto muestra información sobre razas de perros usando **The Dog API** y está desarrollado con **JavaScript, jQuery, Parcel y TailwindCSS**.

# 1. Creación del Proyecto

Para empezar tenemos que crear el proyecto con la misma estructura de archivos de siempre.

![Estructura de archivos](https://files.catbox.moe/swh1in.png "Estructura de archivos")

Iniciamos node para crear el archivo package.json.

~~~
npm init
~~~

Intalamos las siguientes dependencias con node, que vamos a usar posteriormente.

~~~
npm install --save-dev tailwindcss postcss autoprefixer parcel svgo
~~~

# 2. Configuración TailwindCSS

También vamos a instalar Flowbite que es un componente externo de TailwindCSS pero no vamos a usar ```--save-dev``` ya que lo vamos a usar en producción.

~~~
npm install flowbite
~~~

Una vez hecho esto vamos a iniciar Tailwind para crear tailwind.config.js y postcss.config.js y poder editar la configuración.

~~~
npx tailwindcss init
~~~

Esta es la configuración necesaria del archivo tailwind.config.js para asegurarse que Tailwind procese todos los archivos HTML y JS, y además añadir el plugin de Flowbite.

~~~
module.exports = {
  content: [
    "./src/**/*.{html,js}", 
    "./node_modules/flowbite/**/*.js", 
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'), 
  ],
};
~~~

El siguiente código del archivo postcss.config.js carga el plugin de TailwindCSS y el plugin Autoprefixer para que el código sea compatible con navegadores antiguos.

~~~
module.exports = {
    plugins: [
      require('tailwindcss'),   // Habilita Tailwind CSS
      require('autoprefixer'),   // Agrega los prefijos automáticos
    ],
  };
~~~

# 3. Código usando JavaSript

Vamos a usar TheDogApi para mostrar una lista de tarjetas en la página con información sobre razas de perros. Para conectar a la API hay que iniciar sesión en la siguiente página [TheDogApi](https://www.thedogapi.com/) y esta te proporcionará una API Key.

![Inicio de sesión en TheDogAPI](https://files.catbox.moe/smuuke.png "Inicio de sesión en TheDogAPI")

El código JavaScript del archivo ```script.js``` carga y muestra información sobre razas de perros desde The Dog API:

- Primero usa DOMContentLoaded para asegurarse de que el documento esté completamente cargado antes de ejecutar el código

- Hace una solicitud a la API para obtener una lista de 9 razas de perro, y por cada raza hace otra solicitud para obtener la imagen correspondiente.

- Crea una tarjeta ```<section>``` con la imagen, nombre y temperamento.

- Cuando el usuario se acerca al final de la página y carga más perros automáticamente.

- Al hacer click en el botón *Ver más información* se abre un modal con la información el cuál es un componente de Flowbite.

- Por último, detecta los clics en los botones de cierre del modal para ocultar el mismo.



El código HTML correspondiente del ```index.html```, muestra la información sobre las razas de perros, con un diseño agradable usando TailwindCSS:

- El header muestra el logo de la páginay el título, y además contiene un pequeño menú de navegación.

- La seccion principal contiene una alerta de bienvenida, que es un componente de Flowite, y que permite cerrarlo. También contiene las tarjetas de perros, donde se mostrará la información.

- También contiene un modal emergente para mostar los detalles de una raza al hacer clic en *Ver más información*, que también es un componente de Flowbite.

- Por último, contiene un Footer sencillo.

![Resultado](https://files.catbox.moe/75bqkj.png "Resultado")

# 4. Código usando jQuery

El código del archivo ```scriptJQuery.js``` realiza la misma operación de cargar la información de razas de perros desde la API pero usando jQuery.

- Comprueba que la página esté lista usando ```($(document).ready())``` y una vez lista obtiene el contenedor ```#dogs-container``` donde se insertan las tarjetas de los perros.

- Hace una petición AJAX a The Dog Api para obtener las razas y por cada raza hace otra petición AJAX para conseguir la imagen correspondiente.

- Crea una tarjeta HTML con la imagen, nombre y temperamento y el botón de "Ver más información".

- Agrega las tarjetas dinámicamente al contenedor

- Implementa también el scroll infinito y el manejo del modal con la información de una raza en concreto.

A diferencia del código en JavaScript puro usa las siguientes expresiones: 

- Usa ```($.ajax())``` en lugar de ```fetch()``` para hacer las solicitudes a la API.

- Usa ```($().append())``` para insertar contenido en vez de ```appendChild()```.

- Por último, el manejo de eventos es más simple gracias a ```(.on('click'))``` en lugar de ```addEventListener()```

Al final el código HTML no cambia y el resultado tampoco, pero jQuery te permite hacer las peticiones de una manera más simple.


# 5. Proceso de traducción, prefijación, minimización y empaquetación.

Para este proceso he usado Parcel instalado al principio. Para ello, hay que configurar los scripts en el archivo ```package.json```. Además de la compilación de Tailwind para traducirlo a código CSS. Estos serían los Scripts necesarios:

~~~
"scripts": {
    "compila": "tailwindcss -i ./src/styles/principal.css -o ./src/styles/salida.css",
    "vigila": "tailwindcss -i ./src/styles/principal.css -o ./src/styles/salida.css --watch",
    "dev": "parcel src/index.html",
    "build": "parcel build src/index.html"
},
~~~

- El primer script ```compila``` usa Tailwind para procesar el archivo principal.css y generar salida.css, pero lo compila una sola vez.

- El segundo script ```vigila``` es similar a ```compila``` pero añade ```--watch``` que mantiene el proceso en ejecución para compilar al detectar cambios en principal.css.

- El tercer script ```dev``` inicia un servidor de desarrollo y Parcel gestiona y empaqueta los archivos del proyecto.

- Por último, el script ```build``` generauna versión optimizada del proyecto para producción. Parcel minimiza y optimiza el código CSS, JavaScript y las imágenes.

Todos estos script se ejecutan usando el siguiente comando:

~~~
npm run "script"
~~~

Sustituyendo "script" por uno de los scripts anteriormente mencionados.

