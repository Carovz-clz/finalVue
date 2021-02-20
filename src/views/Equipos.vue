<!-- Vista de equipos. Muestra una lista con los equipos y  permite añadir 
    un nuevo jugador a cualquiera de ellos cargando el componente NuevoJugadorComponente -->
<template>
    <div id="contenedor">
        <div id="divEquipos">
            <h1>Equipos</h1>
            <ul>
                <li v-for="(equipo, index) in equipos" :key="index">{{equipo.name}}
                    <JugadoresLista :nombreEquipo="equipo.name"></JugadoresLista>
                    <button @click="cargarCompNuevoJugador(equipo.name)">Nuevo Jugador</button>
                </li>
            </ul>
        </div>
        

        <div id="divNuevoJugador" v-if="nuevoJugador">
            <NuevoJugadorComponente :nombreEquipo="nombreEquipo" @cargarLista="recargarLista"></NuevoJugadorComponente>
        </div>
    </div>
   
</template>

<script>
import axios from 'axios'
import JugadoresLista  from '../components/JugadoresLista.vue'
import NuevoJugadorComponente from '../components/NuevoJugadorComponente'

export default {
    name: 'Equipos',

    components: {JugadoresLista, NuevoJugadorComponente},

    data() {
        return {
            equipos: [],
            nombreEquipo: '',
            nuevoJugador : false
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

        cargarCompNuevoJugador(equipo){
            this.nombreEquipo = equipo;
            this.nuevoJugador = true;
        },

        recargarLista(){
            this.equipos = [];
            this.cargarEquipos();
        }
    },
}
</script>

<style scoped>
#contenedor{
    overflow: hidden;
}

#divEquipos{
    width: 30%;
    float: left;
}

#divNuevoJugador{
    width: 40%;
    float: left;
    margin-left: 5%;
}
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