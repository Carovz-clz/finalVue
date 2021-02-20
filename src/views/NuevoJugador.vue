<!-- Vista de NuevoJugador. Permite añadir un jugador.
    Usa el componente NuevoJugadorComponente para introducir los datos del nuevo jugador  -->
<template>
<div>
    <h1>Nuevo jugador</h1>
    <NuevoJugadorComponente :nombreEquipo="''"></NuevoJugadorComponente>

    
</div>
    
</template>

<script>
import axios from 'axios'
import NuevoJugadorComponente from '../components/NuevoJugadorComponente'

export default {
    name: 'NuevoJugador',

    components: {NuevoJugadorComponente},

    

    data() {
        return {
            mensaje: '',
            nombre: '',
            equipo: '',
            goles: 0,

        }
    },

    methods: {
        guardarJugador(){
            if(this.equipo == ''){
                this.equipo = this.$route.params.equipo;
            }
            let jugador = {
                name: this.nombre,
                team: this.equipo,
                scores: Number(this.goles)
            }

            axios.post('http://localhost:3000/players', jugador)
            .then( (resultado) => {
                if (resultado.status == 201) {
                    this.mensaje = "Jugador insertado correctamente"
                }
            });
        }
    },
}
</script>

