<template>
    <div id="divEliminarJugador">
        <h1>Eliminar jugador</h1>
        <label for="selectEquipos">Seleccione un equipo</label><br>
        <select v-model="equipoSeleccionado" id="selectEquipos" name="selectEquipos">
            <option v-for="(equipo, index) in equipos" :key="index" :value="equipo.name">{{equipo.name}}</option>
        </select>

        <SelectJugadores :equipo="equipoSeleccionado"></SelectJugadores>
    </div>
</template>

<script>
import axios from 'axios'
import SelectJugadores from '../components/SelectJugadores.vue'

export default {
    name: 'EliminarJugador',

    components: {
        SelectJugadores
    },

    data() {
        return {
            equipos: [],
            equipoSeleccionado: ''
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

    },
}
</script>