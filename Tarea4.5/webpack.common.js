import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(process.cwd(), 'dist', process.env.modo),
        filename: 'bundle.js',  // Asegúrate de que la salida de JS también tenga un nombre
    },
    module: {
        rules: [
            // Regla para procesar archivos CSS
            {
                test: /\.css$/i,  // Aplica esta regla a los archivos .css
                use: [
                    process.env.NODE_ENV === 'production'
                        ? MiniCssExtractPlugin.loader  // Extrae CSS en producción
                        : 'style-loader',  // Inyecta CSS en el DOM en desarrollo
                    'css-loader',  // Resuelve @import y url() dentro de CSS
                ],
            },
        ],
    },
    plugins: [
        // Plugin para extraer el CSS en un archivo separado en producción
        process.env.NODE_ENV === 'production' &&
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',  // Nombre del archivo CSS generado
        }),
    ].filter(Boolean),  // Filtra el plugin si no estamos en producción
    mode: process.env.modo || 'development',  // Usar 'modo' del entorno, por defecto es 'development'
};
