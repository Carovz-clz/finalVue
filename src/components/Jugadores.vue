<template>
    <div id="jugadores">
        <ul >
            <li v-for="(jugador, index) in jugadores" :key="index">
                {{jugador.name}} - Goles: {{jugador.scores}}
            </li>

        </ul>

    </div>
</template>


<script>
import axios from 'axios'

export default {
    name: 'Jugadores',

    props: ['nombreEquipo'],

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