<!-- Componente que permite añadir un nuevo jugador. Si se le pasa el nombre de un 
    equipo no permite modificarlo. -->

<template>
    <form >
        <label for="nombre">Nombre: </label>
        <input type="text" name="nombre" v-model="nombre"><br>

        <label for="equipo">Equipo al que pertenece: </label>
        <input v-if="nombreEquipo == ''" type="text" name="equipo" v-model="equipo">
        <input v-else type="text" name="equipo" :value="nombreEquipo" readonly >        
        <br>

        <label for="goles">Goles que ha metido: </label>
        <input type="number" v-model="goles" name="goles"> 

        <input id="boton" type="button" value="Guardar" @click="guardarJugador">
    </form>
    <p v-if="mensaje != ''">{{mensaje}}</p>
</template>

<script>
import axios from 'axios'
export default {
    name: 'NuevoJugadorComponente',

    emits: ['cargarLista'],

    props: ['nombreEquipo'],

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
                this.equipo = this.nombreEquipo;
            }
            let jugador = {
                name: this.nombre,
                team: this.equipo,
                scores: Number(this.goles)
            }

            axios.post('http://localhost:3000/players', jugador)
            .then( (resultado) => {
                if (resultado.status == 201) {
                    this.mensaje = "Jugador insertado correctamente";
                    this.cargarLista();
                }
            });
        },

        cargarLista(){
            this.$emit('cargarLista');
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

h1, p{
    text-align: center;
}

p{
    color: #7f36d1;
    font-weight: bold;
}
</style>

