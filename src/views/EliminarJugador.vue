<!-- Vista que carga los equipos y los jugadores que cada uno de ellos y permite eliminar un jugador -->

<template>
    <div id="divEliminarJugador">
        <h1>Eliminar jugador</h1>
        <label for="selectEquipos">Seleccione un equipo</label><br>
        <select v-model="equipoSeleccionado" id="selectEquipos" name="selectEquipos" @change="desahbilitarBoton">
            <option v-for="(equipo, index) in equipos" :key="index" :value="equipo.name">{{equipo.name}}</option>
        </select>

        <SelectJugadores :equipo="equipoSeleccionado" @idjugador="guardarIdJugador"></SelectJugadores>

        <button id="boton" :disabled="habilitarDeshabilitar" @click="eliminarJugador">Eliminar Jugador</button>

        <p v-if="mensaje != ''">{{mensaje}}</p>

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
            equipoSeleccionado: '',
            idjugadorSeleccionado: '',
            mensaje: ''
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

        guardarIdJugador(id){
            this.idjugadorSeleccionado = id;
            
        },

        eliminarJugador(){
            axios.delete('http://localhost:3000/players/'+this.idjugadorSeleccionado)
            .then( (resultado) => {
                 if (resultado.status == 200) {
                    this.mensaje = "Jugador eliminado correctamente";
                }
            });
        },

    },

    computed: {
        habilitarDeshabilitar(){
            if(this.idjugadorSeleccionado == 0){
                return true;
            }else{
                return false;
            }
        }
    }
}
</script>

<style >
#divEliminarJugador{
  padding: 60px;
  max-width: 400px;
  background-color: #E7E7E7;
  margin: 0 auto;
}

#divEliminarJugador select{
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
    margin-top: 1em;
    margin-left: auto;
    margin-right: auto;
}

#boton:hover{
	background-color: #431277;
}

#boton:disabled{
    background-color: grey;
}

h1, p{
    text-align: center;
}

p{
    color: #7f36d1;
    font-weight: bold;
}
</style>