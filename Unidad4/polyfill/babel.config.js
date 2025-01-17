export default{
    presets: [
        [
            '@babel/preset-env',{
                targets: '> 0.25%, firefox>10, not dead', //navegadores objetivo para los que servir
                useBuiltIns: 'usage', //incluya polyfills 
            }
        ]
    ]
};