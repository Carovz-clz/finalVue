<template>
    <div id="divDatos">
            <h3>Datos del jugador {{jugador.name}}</h3>
            <p>- Goles: {{jugador.scores}}</p>
            <input type="number" v-model="nGoles">
            <button id="suma" @click="sumarGoles">Suma goles</button><br>
            <button id="eliminar" @click="eliminarJugador">Eliminar Jugador</button>
        </div>
</template>

<script>
export default {
    name: 'DatosJugador',

    props: ['jugador'],

    data() {
        return {
            nGoles: '',
            mensaje: ''
        }
    },

    methods: {       
        
        sumarGoles(){
            let suma = this.jugador.scores + Number(this.nGoles);
            this.jugador.scores = suma;

            let jugador = {
                name : this.jugador.name,
                team : this.jugador.team,
                scores : suma
            };

            axios.put('http://localhost:3000/players/'+this.jugador.id, jugador)
            .then( (resultado) => {
                if (resultado.status == 201) {
                    this.mensaje = "Suma de goles realizada correctamente";
                }
            });
        },

        eliminarJugador(){
            axios.delete('http://localhost:3000/players/'+this.jugador.id);
        }
    },
}
</script>

<style >
button {
	display: inline-block;
	background-color: #0095eb;
	padding: 10px;
	border: 0;
	font-size: 1em; 
	color: 	white;
    font-family: "Roboto", sans-serif;
    margin-left: 2em;
}

button:hover{
	background-color: #046193;
}

#eliminar{
    margin-top: 1em;    
}

input{
    width: 50px;
    font-size: 1em; 
    padding: 10px;
}
    #divDatos{
        margin: auto;
    }
 /*
    table{
        margin: auto;
    }*/
</style>