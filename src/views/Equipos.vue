<template>
    <div id="divEquipos">
        <h1>Equipos</h1>
        <ul>
            <li v-for="(equipo, index) in equipos" :key="index">{{equipo.name}}
                <JugadoresLista :nombreEquipo="equipo.name"></JugadoresLista>
                <button  @click="nuevoJugador">Nuevo Jugador</button>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'
import JugadoresLista  from '../components/JugadoresLista.vue'

export default {
    name: 'Equipos',

    components: {JugadoresLista},

    data() {
        return {
            equipos: [],
        }
    },

    created() {
        this.cargarEquipos();
    },

    methods: {
        cargarEquipos(){
            axios.get('http://localhost:3000/clubs')
            .then((resultado) => {
                this.equipos = resultado.data;
            });
        }
    },
}
</script>

<style scoped>
button {
	display: block;
	background-color: #0095eb;
	padding: 10px;
	border: 0;
	font-size: 1em; 
	color: 	white;
    font-family: "Roboto", sans-serif;
    margin-left: 2em;
    margin-top: 1em;
    margin-bottom: 1em;
}

button:hover{
	background-color: #046193;
}   
</style>