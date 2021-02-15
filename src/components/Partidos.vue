<template>
    <div id="divPartidos">
       <!-- <p v-if="mensajeError =! ''">{{mensajeError}}</p> -->
        <table >
            <tr>
                <th colspan="5">Partidos de la {{jornadaSelec}}</th>
            </tr>

            <tr v-for="(partido, index) in partidos" :key="index"> <!--Comprobar si existe la propiedad score-->
                <td>{{partido.team1}}</td>
                <td>{{partido.score[0]}}</td>
                <td>-</td>
                <td>{{partido.score[1]}}</td>
                <td>{{partido.team2}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Partidos',

    props: ['jornadaSelec'],

    data() {
        return {
            partidos: [],
            mensajeError: ''
        }
    },

    created() {
        this.cargarPartidosJornada(this.jornadaSelec)
    },

    methods: {
        cargarPartidosJornada(jornada){
            axios.get('http://localhost:3000/matches?round='+jornada)
            .then((resultado) => {
                this.partidos = resultado.data;
            })
            .catch((err) =>{this.mensajeError = 'Se ha producido un error al realizar la petición.'})
        }
    },
}
</script>