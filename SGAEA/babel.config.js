export default{
    presets: [
        [
            '@babel/preset-env',{
                targets: '> 0.25%, firefox>10, not dead', 
                useBuiltIns: 'usage',  
                corejs: 3
            }
        ]
    ]
};