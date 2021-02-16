<template>
    <div id="jugadores">
        <ul >
            <li v-for="(jugador, index) in jugadores" :key="index" >
                {{jugador.name}} <span v-if="componentePadre == 'clasificacion'"> - Goles: {{jugador.scores}}</span> 
            </li>

        </ul>

    </div>
</template>


<script>
import axios from 'axios'

export default {
    name: 'JugadoresLista',

    props: ['nombreEquipo', 'componentePadre'],

    data() {
        return {
            jugadores: []
        }
    },

    created() {
        this.recuperarJugadores(this.nombreEquipo);
    },

    methods: {
        recuperarJugadores(equipo){
            axios.get('http://localhost:3000/players?team='+equipo)
            .then ( (resultado) =>{
               this.jugadores = resultado.data;
            })
        }
    },

    watch: {
        nombreEquipo(newValue,oldValue){
            this.jugadores = this.recuperarJugadores(newValue);
        }
    }
}
</script>

<style scoped>
   /* #jugadores{
        text-align: center;
    }

    table{
        margin: auto;
    }*/
</style>