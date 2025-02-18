<script setup>
    const mensaje = "Qué ilusión, mi primer mensaje de vue";
    import Boton from './Boton.vue'; 

    function saluda(){
        return "hola"; 
    }
    const persona = {
        nombre: "procopio", 
        edad:35
    }
</script>
<template>
    <article class="flex-columna borde">
        <p> {{ mensaje }} </p>
        <p> {{ saluda() }} </p>
        <p> {{ "hola".toUpperCase() }} </p>
        <p> {{ 5+3 }} </p>
        <p> {{ persona.nombre }} </p>
        <Boton />
    </article>

</template>

<style scoped lang="scss">

    .flex-columna{
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
    }
    .borde{
        border: 1px solid blue;
    }
</style>