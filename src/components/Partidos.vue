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
            partidosSinResultados: [ ],
            objetorecuperado: {},
            club: []
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
                            id: element.id,
                            goles: [0, 0]
                        };

                        this.partidosSinResultados.push(dato);
                    }else{
                        this.partidosSinResultados.push(0);
                    }                    
                });

            })
            .catch((err) =>{this.mensajeError = 'Se ha producido un error al cargar los partidos de la jornada '+jornada})
        },

        async sumarGoles(partido){

            let objetoGoles = this.partidosSinResultados.find(p => p.id == partido.id); //Recupero el objeto que contiene los goles que se han añadido
            let dato = { //Objeto que paso al patch para actualizar los goles del partido
                score: [Number(objetoGoles.goles[0]), Number(objetoGoles.goles[1])]
            } 

            await axios.patch('http://localhost:3000/matches/'+partido.id, dato) //Actualizo dato del partido que se pasa por parámetro
            .then( (resultado) => {
                if (resultado.status == 201) {
                    this.mensaje = "Suma de goles realizada correctamente";
                }
            });
            
            this.actualizarClasificacion(partido.team1, Number(dato.score[0]), partido.team2, Number(dato.score[1]));
        },

        actualizarClasificacion(equipo1, goles1, equipo2, goles2){
            if(goles1 > goles2){
                this.sumarPuntosClub(equipo1, 3);
            }else if(goles1 < goles2){
                this.sumarPuntosClub(equipo2, 3);
            }else{
                this.sumarPuntosClub(equipo1, 1);
                this.sumarPuntosClub(equipo2, 1);
            }
        },

        async sumarPuntosClub(equipo, ptos){ 
            //Primero recupero el equipo con el nombre pasado por parámetro y lo guardo en el data club
            await axios.get("http://localhost:3000/clubs?name="+equipo)
            .then((resultado) => { 
                this.club = resultado.data;
            });

            let dato = {
                points: (Number(this.club[0].points) + ptos)
            }

            //Actualizo el campo points del equipo 
            await axios.patch('http://localhost:3000/clubs/'+this.club[0].id, dato)
            .then( (resultado) => {
                if (resultado.status == 200) {
                    console.log("Ptos actualizados correctamente");
                }
            });
        },

    },

    watch:{
        jornadaSelec(newValue,oldValue){
            this.partidos = this.cargarPartidosJornada(newValue);
        }
    }
}
</script>