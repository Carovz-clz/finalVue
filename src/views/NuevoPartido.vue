<!-- Vista NuevoPartido. Permite insertar un nuevo partido con los equipos existentes. -->

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
        </select><br>

        <label for="equipo2">Equipo 2</label>
        <select v-model="equipo2"  name="equipo2">
            <option v-for="(equipo, index) in equipos" :key="index" :value="equipo.name">{{equipo.name}}</option>
        </select><br>

        <input id="boton" type="button" value="Guardar" @click="guardarPartido">
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
                team2: this.equipo2
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

<style scoped>
form{
  padding: 60px;
  max-width: 400px;
  background-color: #E7E7E7;
  margin: 0 auto;
}

form input, form select{
  margin-bottom: 15px;
  width: 100%;
  padding: 10px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box; 
  border: none; 
  color: #525c66; 
  font-size: 1em;
  resize: horizontal; 
}

#boton {
	display: block;
	background-color: #7f36d1;
	padding: 10px 45px 10px 45px;
	border: 0;
	font-size: 1em; 
	color: 	white;
  font-family: "Roboto", sans-serif;
}

#boton:hover{
	background-color: #431277;
}

h1{
    text-align: center;
}

p{
    color: #7f36d1;
    font-weight: bold;
    text-align: center;
}
</style>