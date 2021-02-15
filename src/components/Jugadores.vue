<template>
    <div id="jugadores">
        <h1 >Jugadores del equipo {{nombreEquipo}}</h1>
        <table>
            <tr>
                <th>Jugador</th>
                <th>Goles</th>
            </tr>

            <tr v-for="(jugador, index) in jugadores" :key="index">
                <td>{{jugador.name}}</td>
                <td>{{jugador.scores}}</td>
            </tr>

        </table>

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
    #jugadores{
        text-align: center;
    }

    table{
        margin: auto;
    }
</style>