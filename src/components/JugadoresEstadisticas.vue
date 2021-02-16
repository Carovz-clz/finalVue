<template>
    <div id="jugadoresDatos">
        <ul >
            <li v-for="(jugador, index) in jugadores" :key="index" @click="recuperarDatosJugador(jugador.name)">
                {{jugador.name}} 
            </li>

        </ul>
    <DatosJugador :jugador="jugador" v-if="existeJugador"></DatosJugador>
    </div>
</template>


<script>
import axios from 'axios'
import DatosJugador from '../components/DatosJugador.vue'

export default {
    name: 'JugadoresEstadisticas',

    components: {
        DatosJugador
    },

    props: ['nombreEquipo'],

    data() {
        return {
            jugadores: [],                  
            jugador: {},               
            existeJugador : false,  
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
        },

        recuperarDatosJugador(nombreJugador){
            this.jugador = this.jugadores.find(j => j.name == nombreJugador);
            this.existeJugador = true;
        },

    },

    watch: {
        nombreEquipo(newValue,oldValue){
            this.jugadores = this.recuperarJugadores(newValue);
        }
    }
}
</script>

<style >
button {
	display: inline-block;
	background-color: #0095eb;
	padding: 10px;
	border: 0;
	font-size: 1em; 
	color: 	white;
    font-family: "Roboto", sans-serif;
    margin-left: 2em;
}

button:hover{
	background-color: #046193;
}

#eliminar{
    margin-top: 1em;    
}

input{
    width: 50px;
    font-size: 1em; 
    padding: 10px;
}
    #divDatos{
        margin: auto;
    }
 /*
    table{
        margin: auto;
    }*/
</style>