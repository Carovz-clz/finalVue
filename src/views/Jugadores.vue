<template>
    <div id="divEquipos">
        <h1>Equipos</h1>
        <ul>
            <li v-for="(equipo, index) in equipos" :key="index" @click="mostrarJugadores(equipo.name)">{{equipo.name}}</li>
        </ul>
    </div>

    <div id="divJug">
        <h2 v-if="nombreEquipo != ''">Jugadores del equipo {{nombreEquipo}}</h2>
        <JugadoresEstadisticas v-if="nombreEquipo != '' " :nombreEquipo="nombreEquipo" ></JugadoresEstadisticas>
    </div>
</template>

<script>
import axios from 'axios'
import JugadoresEstadisticas from '../components/JugadoresEstadisticas.vue'

export default {
    name: 'Jugadores',

    components: {
        JugadoresEstadisticas
    },

    data() {
        return {
            equipos:[],
            nombreEquipo: ''
        }
    },

    created() {
        this.cargarEquipos();
    },

    methods: {
        cargarEquipos(){
            axios.get("http://localhost:3000/clubs")
            .then( (resultado) => {
                this.equipos = resultado.data;
            });
        },

        mostrarJugadores(nombre){
            this.nombreEquipo = nombre;
        }
    },
}
</script>

<style scoped>
    #divEquipos{
        width: 40%;
        float: left;
    }

    #divJug{
        width: 40%;
        float: right;
    }

     #divEquipos h1{
        text-align: center;
    }
</style>