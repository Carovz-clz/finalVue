<template>
    <br><label for="selectJugadores">Seleccione un jugador</label><br>
    <select v-model="jugadorSelect" @change="enviarJugador" id="selectJugador" name="selectJugador">
        <option v-for="(jugador, index) in jugadores" :key="index" :value="jugador.id">{{jugador.name}}</option>
    </select>
</template>

<script>
import axios from 'axios'

export default {
    name: 'SelectJugadores',

    props: ['equipo'],

    emits: ['idjugador'],

    data() {
        return {
            jugadorSelect: '',
            jugadores: []
        }
    },

    
    created() {
        this.cargarJugadores();
    },

    methods: {
       async cargarJugadores(){

            await axios.get('http://localhost:3000/players?team='+this.equipo)
            .then((resultado) => {
                this.jugadores = resultado.data;
            });

       },

       enviarJugador(){
           console.log('Jugador seleccionado: '+this.jugadorSelect)
           this.$emit('idjugador', this.jugadorSelect);
       }
    },

     watch: {
        equipo(newValue,oldValue){
            this.jugadores = this.cargarJugadores(newValue);
        }
    }
    
   /* computed: {
        async jugadores() {
            console.log('voy a cargar jugadores '+this.equipo);
            let arrayJugadores = [];

            await axios.get('http://localhost:3000/players?team='+this.equipo)
            .then((resultado) => {
                arrayJugadores = resultado.data;
                console.log(arrayJugadores);
                return arrayJugadores
            });
            
            return [1, 2, 3]
        }
  }*/


}
</script>