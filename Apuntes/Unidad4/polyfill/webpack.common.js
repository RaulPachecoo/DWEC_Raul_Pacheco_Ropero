import path from 'path';

export default{
    entry: './src/js/index.js',
    output:{
        path: path.resolve(process.cwd(), 'dist', process.env.modo),
        //dos modos de "compilación": desarrollo y producción
        //minifying, optimixación de código
    },
    mode: process.env.modo,
}; 