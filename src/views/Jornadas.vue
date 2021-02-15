<template>
    <div id="select">
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
</style>