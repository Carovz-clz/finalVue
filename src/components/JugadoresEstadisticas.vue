<template>
    <div id="jugadoresDatos">
        <ul >
            <li v-for="(jugador, index) in jugadores" :key="index" @click="recuperarDatosJugador(jugador.name)">
                {{jugador.name}} 
            </li>

        </ul>

        <div id="divDatos" v-if="existeJugador">
            <h3>Datos del jugador {{jugador.name}}</h3>
            <p>- Goles: {{jugador.scores}}</p>
            <input type="number" v-model="nGoles">
            <button id="suma" @click="sumarGoles">Suma goles</button>
            <button id="eliminar" @click="eliminarJugador">Eliminar Jugador</button>
        </div>
    </div>
</template>


<script>
import axios from 'axios'

export default {
    name: 'JugadoresEstadisticas',

    props: ['nombreEquipo'],

    data() {
        return {
            jugadores: [],
            jugador: {},
            existeJugador : false,
            nGoles: '',
            mensaje: ''
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
        
        sumarGoles(){
            let suma = this.jugador.scores + Number(this.nGoles);
            this.jugador.scores = suma;

            let jugador = {
                name : this.jugador.name,
                team : this.jugador.team,
                scores : suma
            };

            axios.put('http://localhost:3000/players/'+this.jugador.id, jugador)
            .then( (resultado) => {
                if (resultado.status == 201) {
                    this.mensaje = "Suma de goles realizada correctamente";
                }
            });
        },

        eliminarJugador(){
            axios.delete('http://localhost:3000/players/'+this.jugador.id);
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
   #jugadoresDatos{
       background-color: aquamarine;
    }

    #divDatos{
        background-color: blue;
    }
 /*
    table{
        margin: auto;
    }*/
</style>