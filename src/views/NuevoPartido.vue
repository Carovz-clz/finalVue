<template>
<div id="divFormulario">
    <h1>Nuevo partido</h1>

    <form v-if="mensaje == ''">
        <label for="jornada">Jornada: </label>
        <input type="text" name="jornada" v-model="jornada"><br>

        <label for="fecha">Fecha</label>
        <input type="date" name="fecha" v-model="fecha"><br>

        <label for="equipo1">Equipo 1</label>
        <select v-model="equipo1"  name="equipo1">
            <option v-for="(equipo, index) in equipos" :key="index" :value="equipo.name">{{equipo.name}}</option>
        </select>
        
        <label for="goles1">Goles equipo 1</label>
        <input type="number" name="goles1" v-model="gol1">
        <br>

        <label for="equipo2">Equipo 2</label>
        <select v-model="equipo2"  name="equipo2">
            <option v-for="(equipo, index) in equipos" :key="index" :value="equipo.name">{{equipo.name}}</option>
        </select>
        
        <label for="goles2">Goles equipo 2</label>
        <input type="number" name="goles2" v-model="gol2">
        <br>

        <input type="button" value="Guardar" @click="guardarPartido">
    </form>
    <p v-else>{{mensaje}}</p>
</div>
    
</template>

<script>
import axios from 'axios'

export default {
    name: 'NuevoPartido',

    data() {
        return {
            jornada: '',
            fecha: '',
            equipo1: '',
            equipo2: '',
            equipos: [],
            gol1: '',
            gol2: '',
            mensaje: 0

        }
    },

    created() {
        this.cargarEquipos();
    },

    methods: {
        cargarEquipos(){
            axios.get("http://localhost:3000/clubs").then((resultado) => { 
                this.equipos = resultado.data;    
            })
        },

        guardarPartido(){
            let partido = {
                round: this.jornada,
                date: this.fecha,
                team1: this.equipo1,
                team2: this.equipo2,
                score: [this.gol1, this.gol2]
            }

            axios.post('http://localhost:3000/matches', partido)
            .then( (resultado) => {
                if (resultado.status == 201) {
                    this.mensaje = "Partido insertado correctamente"
                }
            });
        }
    },
}
</script>