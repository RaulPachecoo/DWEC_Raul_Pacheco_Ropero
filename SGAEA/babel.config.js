export default{
    presets: [
        [
            '@babel/preset-env',{
                targets: '> 0.25%, firefox>10, not dead', // Navegadores que van a ser compatibles con tu programa
                useBuiltIns: 'usage',  
                corejs: 3
            }
        ]
    ]
};