<template>
    <div id="divPartidos">
       
        <table v-if="mensajeError == ''">
            <tr>
                <th colspan="5">Partidos de la {{jornadaSelec}}</th>
            </tr>

            <tr v-for="(partido, index) in partidos" :key="index"> 
                <td>{{partido.team1}}</td>
                <td >
                    <span v-if="partido.hasOwnProperty('score')">
                        {{partido.score[0]}}
                    </span>
                    <span v-else>
                        <input type="number" v-model="partidosSinResultados[index].goles[0]">
                    </span>                    
                </td> 

                <td>-</td>

                <td>
                    <span v-if="partido.hasOwnProperty('score')">
                        {{partido.score[1]}}
                    </span>
                    <span v-else>
                        <input type="number" v-model="partidosSinResultados[index].goles[1]" >
                    </span>
                </td>
                <td>{{partido.team2}}</td>
                <td v-if="!partido.hasOwnProperty('score')"><button id="boton" @click="sumarGoles(partido)">Guardar</button></td>
            </tr>
        </table>

        <p v-else>{{mensajeError}}</p> 
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Partidos',

    props: ['jornadaSelec'],

    data() {
        return {
            partidos: [],
            mensajeError: '',
            gol1: '',
            gol2: '',
            partidosSinResultados: []
        }
    },

    created() {
        this.cargarPartidosJornada(this.jornadaSelec)
    },

    methods: {
        async cargarPartidosJornada(jornada){
            await axios.get('http://localhost:3000/matches?round='+jornada)
            .then((resultado) => {
                this.partidos = resultado.data;
                
                this.partidos.forEach(element => {
                    if(!element.score){
                        let dato = {
                            id: 1,
                            goles: [0, 0]
                        }

                        console.log("dato "+dato);

                        this.partidosSinResultados.push(dato);
                    }else{
                        this.partidosSinResultados.push(0);
                    }

                    
                });

                console.log("partidos sin resultados"+this.partidosSinResultados)
            })
            .catch((err) =>{this.mensajeError = 'Se ha producido un error al realizar la petición.'})
        },

        sumarGoles(partido){
            //let goles = this.partidosSinResultados.find(p => p.id == partido.id);
            console.log("holaaa: "+this.partidosSinResultados);

            console.log(partido);
             axios.patch('http://localhost:3000/matches/'+partido.id, )
            .then( (resultado) => {
                if (resultado.status == 201) {
                    this.mensaje = "Suma de goles realizada correctamente";
                }
            });
            
        }


    },

    watch:{
        jornadaSelec(newValue,oldValue){
            this.partidos = this.cargarPartidosJornada(newValue);
        }
    }
}
</script>