<!-- Vista de la clasificación. Hace uso del componente JugadoresLista -->
<template>

    <div id="clasificacion">
        <h1>Clasificación</h1>
        <div id="resultados">
            <table v-if="equipos.length > 0">
                <tr>
                    <th>Puesto</th>
                    <th>Equipo</th>
                    <th>Puntos</th>
                </tr>

                <tr v-for="(equipo, index) in equipos" :key="index">
                    <td>{{index+1}}</td>
                    <td @click="recogerNombreEquipo(equipo.name)">{{equipo.name}}</td>
                    <td>{{equipo.points}}</td>
                </tr>
            </table>
            <h2 v-else>No hay equipos para mostrar</h2>
        </div>
        
    </div>

    <div id="divJugadores">
        <h1 v-if="nombreEquipo != '' ">Jugadores del equipo {{nombreEquipo}}</h1>
        <JugadoresLista v-if="nombreEquipo != '' " :nombreEquipo="nombreEquipo" componentePadre="clasificacion"></JugadoresLista>
    </div>
    

    
    
</template>

<script>

import axios from "axios";
import JugadoresLista from "../components/JugadoresLista.vue"

export default {
    name: "Clasificacion",

    components: {
        JugadoresLista
    },

    data() {
        return {
            equipos:[],
            nombreEquipo: ''
        }
    },

    created() {
        this.recuperarEquipos();
    },

    methods: {
        recuperarEquipos(){
            axios.get("http://localhost:3000/clubs").then((resultado) => { 
                this.equipos = resultado.data;                     
                this.equipos.sort((a,b) => b.points - a.points);    
            })
        },

        recogerNombreEquipo(nombre){
            this.nombreEquipo = nombre;
        }
    },

}
</script>

<style scoped>
    #clasificacion{
        text-align: center;
        width: 40%;
        float: left;
    }

    #divJugadores{
        width: 40%;
        float: right;
    }

    #divJugadores h1{
        text-align: center;
    }

    table {
  text-align: center;
  font-size: 12px;
  margin: auto;
  width: 100%;
  text-align: left;
  border-collapse: collapse;
}

th {
  font-size: 13px;
  text-align: center;
  padding: 8px;
  background: #E7E7E7;
  border-top: 4px solid #7f36d1;
  border-bottom: 1px solid #fff;
  color: #039;
}

td {
  padding: 8px;
  background: #e8edff;
  border-bottom: 1px solid #fff;
  color: #669;
  border-top: 1px solid transparent;
  text-align: center;
}

tr:hover td {
  background: #d0dafd;
  color: #339;
}
</style>