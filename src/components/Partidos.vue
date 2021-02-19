<template>
    <div id="divPartidos">
       
        <table v-if="mensajeError == ''">
            <tr>
                <th colspan="5">Partidos de la {{jornadaSelec}}</th>
            </tr>

            <tr v-for="(partido, index) in partidos" :key="index"> 
                <td>{{partido.team1}}</td>
                <td >
                    <span v-if="partido.hasOwnProperty('score')">
                        {{partido.score[0]}}
                    </span>
                    <span v-else>
                        <input type="number" v-model="gol1">
                    </span>                    
                </td> 

                <td>-</td>

                <td>
                    <span v-if="partido.hasOwnProperty('score')">
                        {{partido.score[1]}}
                    </span>
                    <span v-else>
                        <input type="number" v-model="gol2" >
                    </span>
                </td>
                <td>{{partido.team2}}</td>
                <td v-if="!partido.hasOwnProperty('score')"><button id="boton" @click="sumarGoles(partido)">Guardar</button></td>
            </tr>
        </table>

        <p v-else>{{mensajeError}}</p> 
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
            mensajeError: '',
            gol1: '',
            gol2: ''
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
        },

        sumarGoles(partido){
            console.log(partido);

            
        }


    },

    watch:{
        jornadaSelec(newValue,oldValue){
            this.partidos = this.cargarPartidosJornada(newValue);
        }
    }
}
</script>