import path from 'path';
import {merge} from 'webpack-merge';
import common from './webpack.common.js';


export default merge(common, {
    output:{
        filename: 'bundle.legacy.js',
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
        ],
    },
}); 