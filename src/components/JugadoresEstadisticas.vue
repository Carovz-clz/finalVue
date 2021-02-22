<!-- Componente JugadoresEstadisticas. Muestra los jugadores de un eqipo determinado.
    Hace uso del componente DatosJugador para mostrar los datos almacenados del jugador 
    que se pulse. -->

<template>
    <div id="jugadoresDatos">
        <ul >
            <li v-for="(jugador, index) in jugadores" :key="index" @click="recuperarDatosJugador(jugador.name)">
                {{jugador.name}} 
            </li>

        </ul>
    <DatosJugador :jugador="jugador" v-if="existeJugador" :jugadorEliminado="cambiarExiteJugador"></DatosJugador>
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

        cambiarExiteJugador(){
            this.existeJugador = false;
        }

    },

    watch: {
        nombreEquipo(newValue,oldValue){
            this.jugadores = this.recuperarJugadores(newValue);
            this.existeJugador = false;
        }
    }
}
</script>