<template>
    <br><label for="selectJugadores">Seleccione un jugador</label><br>
    <select v-model="jugadorSelect" id="selectJugador" name="selectEquipos">
        <option v-for="(jugador, index) in jugadores" :key="index" :value="jugador.id">{{jugador.name}}</option>
    </select>
</template>

<script>
import axios from 'axios'

export default {
    name: 'SelectJugadores',

    props: ['equipo'],

    data() {
        return {
            jugadorSelect: '',
        }
    },

    
    created() {
    },

    methods: {
       
    },
    computed: {
        jugadores() {
            console.log('voy a cargar jugadores'+this.equipo);
            let arrayJugadores = [];

            axios.get('http://localhost:3000/players')
            .then((resultado) => {
                resultado.data.forEach(element => {
                    if(element.team == this.equipo){
                        arrayJugadores.push(element);
                    }
                });

            });
            
            console.log(arrayJugadores);
            return arrayJugadores;
        }
  }
}
</script>