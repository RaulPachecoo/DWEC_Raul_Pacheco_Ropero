import path from 'path';

export default{
    entry: './src/main.js',
    output:{
        path: path.resolve(process.cwd(), 'dist', process.env.modo),
    },
    mode: process.env.modo,
}; 