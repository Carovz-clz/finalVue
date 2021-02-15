<template>

    <div id="clasificacion">
        <h1>Clasificación</h1>
        <div id="resultados">
            <table v-if="equipos.length > 0">
                <tr>
                    <th>Puesto</th>
                    <th>Equipo</th>
                    <th>Puntos</th>
                </tr>

                <tr v-for="(equipo, index) in equipos" :key="index">
                    <td>{{index+1}}</td>
                    <td @click="recogerNombreEquipo(equipo.name)">{{equipo.name}}</td>
                    <td>{{equipo.points}}</td>
                </tr>
            </table>
            <h2 v-else>No hay equipos para mostrar</h2>
        </div>
        
    </div>

    <div id="divJugadores">
        <h1>Jugadores del equipo {{nombreEquipo}}</h1>
        <Jugadores v-if="nombreEquipo != '' " :nombreEquipo="nombreEquipo"></Jugadores>
    </div>
    

    
    
</template>

<script>

import axios from "axios";
import Jugadores from "../components/Jugadores.vue"

export default {
    name: "Clasificacion",

    components: {
        Jugadores
    },

    data() {
        return {
            equipos:[],
            nombreEquipo: ''
        }
    },

    created() {
        this.recuperarEquipos();
    },

    methods: {
        recuperarEquipos(){
            axios.get("http://localhost:3000/clubs").then((resultado) => { 
                this.equipos = resultado.data;                     
                this.equipos.sort((a,b) => b.points - a.points);    
            })
        },

        recogerNombreEquipo(nombre){
            this.nombreEquipo = nombre;
        }
    },

}
</script>

<style scoped>
    #clasificacion{
        text-align: center;
        width: 40%;
        float: left;
    }

    table{
        margin: auto;
    }

    #divJugadores{
        width: 40%;
        float: right;
    }

    #divJugadores h1{
        text-align: center;
    }
</style>