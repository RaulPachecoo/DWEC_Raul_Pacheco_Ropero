import path from 'path';
import { merge } from 'webpack-merge';
import common from './webpack.common.js';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default merge(common, {
    output: {
        filename: 'bundle.modern.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            // Añadimos la regla para procesar archivos CSS
            {
                test: /\.css$/i,
                use: [
                    process.env.NODE_ENV === 'production'
                        ? MiniCssExtractPlugin.loader  // Extrae el CSS en producción
                        : 'style-loader',  // Inyecta el CSS en desarrollo
                    'css-loader',  // Resuelve los imports y URLs en CSS
                ],
            },
        ],
    },
    plugins: [
        // Plugin para extraer el CSS en un archivo separado en producción
        process.env.NODE_ENV === 'production' &&
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
    ].filter(Boolean),
});
