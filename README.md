# DWEC_VIEW_PachecoRopero_Raul

# Tarea 4.5

## WEBPACK Y BABEL

Primero debemos instalar los siguientes paquetes utilizando node:

![Instalación de paquetes](https://files.catbox.moe/cffxxq.png)

También debemos instalar la siguiente dependencia pero sin usar `--save-dev` ya que se va a usar en producción:

![Dependencia de producción](https://files.catbox.moe/jseg1g.png)

Creamos los siguientes archivos: `babel.config.js`, `webpack.common.js`, `webpack.legacy.js` y `webpack.modern.js`.

![Archivos creados](https://files.catbox.moe/hptsw8.png)

En el archivo `webpack.common.js` debemos incluir lo siguiente, donde `entry` es el archivo desde el cual Webpack comenzará a empaquetar tu código, `output` define cómo y dónde Webpack debe colocar los archivos generados después del proceso de bundling y `mode` le indica a Webpack si debe compilar en modo de desarrollo (`development`) o en modo de producción:

![webpack.common.js](https://files.catbox.moe/ydjnsg.png)

El archivo `webpack.legacy.js` contendrá un conjunto de reglas para los archivos que Webpack debe procesar. `test` es un patrón que indica qué archivos deben ser procesados, en `exclude` se especifica que los archivos dentro de `node_modules` no deben ser procesados por esta regla y `use` define qué loader se debe usar para procesar los archivos. En este caso, se está utilizando `babel-loader`:

![webpack.legacy.js](https://files.catbox.moe/nrowut.png)

En el archivo `webpack.modern.js` solo aparecerá `output`, que es una propiedad que le indica a Webpack dónde y con qué nombre debe guardar el archivo final después de procesar todos los módulos:

![webpack.modern.js](https://files.catbox.moe/pyjdno.png)

Por último, el archivo `babel.config.js` debe contener los `presets`, que son una lista de conjuntos de reglas o configuraciones predefinidas que Babel usará para transpilar el código. `targets` define los navegadores o entornos que Babel debe soportar al transpilar el código. `corejs` especifica la versión de `core-js` que Babel debe usar para los polyfills. `useBuiltIns` optimiza la inclusión de polyfills (fragmentos de código que simulan funciones modernas en navegadores antiguos).

![babel.config.js](https://files.catbox.moe/sv10bo.png)

En el archivo `package.json` debemos definir los scripts que vamos a ejecutar:

![package.json](https://files.catbox.moe/f90kki.png)

### Probar el código en Netlif

Para poder probar nuestro código, vamos a subir nuestro proyecto a un proveedor de hosting como puede ser [Netlify](https://www.netlify.com/). Debemos acceder a esta página y crearnos una cuenta. Una vez que iniciamos sesión y estamos en la página de inicio, pulsamos en *Add new site* y *Import an existing project*:

![Add new site](https://files.catbox.moe/tzaa1s.png)

Seleccionamos *Try Netlify Drop* y subimos nuestro proyecto desde local.

![Netlify Drop](https://files.catbox.moe/qsxp9a.png)

Ya lo tenemos subido, y para probarlo copiamos el enlace que nos proporciona.

![Copiar enlace](https://files.catbox.moe/nhu2rd.png)

Debemos añadir lo siguiente a nuestro HTML para que el navegador elija el archivo JS a ejecutar según la versión:

![Completar HTML](https://files.catbox.moe/8s0str.png)

Nos dirigimos a [BrowserStack](https://www.browserstack.com/) donde nos registramos y vamos a elegir un navegador para probar nuestro código. Yo por ejemplo voy a probar Firefox(versión 50) ya que tiene una cuota de mercado mayor al 0,25% y una versión mayor a la 10.

![BrowserStack](https://files.catbox.moe/zqvo3q.png)

Podemos comprobar que funciona correctamente nuestro programa.

![Correcto Funcionamiento](https://files.catbox.moe/ckd8ww.png)


## Configuración para servir ficheros CSS

Primero debemos instalar las siguientes dependencias:

![Instalación de dependencias](https://files.catbox.moe/4z7vls.png)

Ahora vamos a modificar los diferentes archivos que ya tenemos. Vamos a empezar por el `webpack.common.js`: En este archivo hay que añadir unas reglas para extraer el CSS de producción e inyectarlo en desarrollo, además también hay que añadir plugins para poder realizar las tareas anteriormente comentadas.

![webpack.common.js configuración](https://files.catbox.moe/gjx35x.png)

En los archivos `webpack.modern.js` y `webpack.legacy.js` tenemos que añadir el mismo código que hemos añadido a `webpack.common.js`.

![webpack.modern.js](https://files.catbox.moe/tpang1.png)

![webpack.legacy.js](https://files.catbox.moe/wlqp7u.png)

Vamos a añadir código CSS que no soportan los navegadores antiguos.

![Código CSS antiguo](https://files.catbox.moe/mlnb1g.png)

Los demás archivos no cambian. Ahora vamos a proceder a probar esto en Firefox (versión 60).

![Prueba en Firefox](https://files.catbox.moe/4moygh.png)


## Parcel

Para realizar la transpilación con Parcel primero vamos a crearnos un nuevo proyecto con la siguiente estructura y a iniciar node para que se cree el archivo `package.json`:

![Npm Init](https://files.catbox.moe/66rfcm.png)

![Estructura del proyecto](https://files.catbox.moe/hpwi7p.png)

Ahora vamos a insertar un código de ejemplo en los archivos:

### `index.js`

![Código de index.js](https://files.catbox.moe/ueihi6.png)

### `index.html`

![Código de index.html](https://files.catbox.moe/6nyfkm.png)

### `estilos.css`

![Código de estilos.css](https://files.catbox.moe/terw40.png)

Debemos instalar la dependencia de Parcel:

![Instalación de Parcel](https://files.catbox.moe/x7p5tj.png)

Vamos a instalar `rimraf` también para que nos permita eliminar los archivos transpilados.

![Instalación de rimraf](https://files.catbox.moe/2vn9qd.png)

Una vez instalada esta dependencia, procedemos a configurar los scripts en el archivo `package.json`.

![Configuración de package.json](https://files.catbox.moe/k8ey66.png)

Vamos a añadir también los navegadores objetivo en nuestro archivo `package.json`, aunque por defecto Parcel soportará los siguientes navegadores:

- Los últimos 2 navegadores principales.
- Navegadores con más del 0.5% de cuota de mercado.
- Navegadores que no estén marcados como "dead".

![Navegadores objetivo](https://files.catbox.moe/ke28ec.png)

Ahora vamos a proceder a ejecutarlos. Debemos ejecutar el comando `npm run build`.

![Ejecutando npm run build](https://files.catbox.moe/uilc2j.png)

Vamos a subir nuestro proyecto a Netlify, siguiendo el proceso anteriormente comentado para poder probarlo.

![Subiendo a Netlify](https://files.catbox.moe/1dn6x7.png)

Y vamos a probarlo en BrowserStack usando, por ejemplo, Firefox (versión 30).

![Prueba en BrowserStack](https://files.catbox.moe/d95tje.png)



