<!-- Vista de equipos. Muestra una lista con los equipos y  permite añadir 
    un nuevo jugador a cualquiera de ellos desde la vista NuevoJugador. 
    Hace uso del componente Jugadores Lista. -->
<template>
    <div id="divEquipos">
        <h1>Equipos</h1>
        <ul>
            <li v-for="(equipo, index) in equipos" :key="index">{{equipo.name}}
                <JugadoresLista :nombreEquipo="equipo.name"></JugadoresLista>
                <button  @click="nuevoJugador(equipo.name)">Nuevo Jugador</button>
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
        },

        nuevoJugador(equipo){
            this.$router.push({name: "NuevoJugador", params: { equipo: equipo }}); 
        }
    },
}
</script>

<style scoped>
button {
	display: block;
	background-color: #7f36d1;
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
	background-color: #431277;
}   
</style>