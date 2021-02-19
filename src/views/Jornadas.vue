<!-- Vista de jornadas. Permite seleccionar una jornada para mostrar los resultados
    de cada partido de la misma. 
    Hace uso del componente Partidos -->

<template>
    <div id="select">
        <h1>Jornadas</h1>
        <label for="selectJornadas">Seleccione una jornada</label><br>
        <select v-model="jornadaSeleccionada" id="selectJornadas" name="selectJornadas">
            <option v-for="(jornada, index) in jornadas" :key="index" :value="jornada">{{jornada}}</option>
        </select>

        <Partidos v-if="jornadaSeleccionada != ''" :jornadaSelec="jornadaSeleccionada"></Partidos>
    </div>
</template>

<script>
import axios from 'axios'
import Partidos from '../components/Partidos.vue'

export default {
  components: { Partidos },
    name: 'Jornadas',

    comments: {
        Partidos
    },

    data() {
        return {
            jornadas: [],
            jornadaSeleccionada: ''
        }
    },

    created() {
        this.cargarJornadasSelect();
    },

    methods: {
        cargarJornadasSelect(){
            axios.get('http://localhost:3000/matches')
            .then( (resultado) => {
                let arrayResult = resultado.data;
                this.jornadas[0] = arrayResult[0].round;

                arrayResult.forEach((element) => {
                    if (!this.jornadas.includes(element.round)) {
                        this.jornadas.push(element.round);
                    }
                });
            });

        }
    },

    
}
</script>

<style scoped>
    #select{
        text-align: center;
    }

    select {
        margin-bottom: 15px;
        width: 20%;
        padding: 10px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #525c66;
        font-size: 1em;
        resize: horizontal;
        margin-top: 1em;
}
</style>