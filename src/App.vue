<template>
  <div>
    <Titulo />
    <div id="nav">
      <router-link to="/inicio" class="seccion">Inicio</router-link>
      <router-link to="/clasificacion" class="seccion">Clasificación</router-link>
      <router-link to="/jornadas" class="seccion">Jornadas</router-link>
      <router-link to="/nuevopartido" class="seccion submenu">Nuevo Partido</router-link>
      <router-link to="/equipos" class="seccion">Equipos</router-link>
      <router-link to="/jugadores" class="seccion">Jugadores</router-link>
      <router-link to="/nuevojugador" class="seccion submenu">Nuevo Jugador</router-link>
      <router-link to="/eliminarjugador" class="seccion submenu">Eliminar Jugador</router-link>
    </div>
    <div id="vistas">
      <router-view />
    </div>
  </div>
</template>

<script>
import Titulo from "./components/Titulo.vue";

export default {
  name: "Inicio",
  components: {
      Titulo,
  },
  data () {
    return {
      numeroPag: 0
    }
  },
  methods : {
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#vistas {
  float: right;
  width: 80%;
  box-sizing: border-box;
  padding: 30px;
}

.seccion {
  display: block;
  padding: 50 0;
}

#nav {
  float: left;
  width: 20%;
  position: absolute;
  top: 0;
  bottom: 0;
  box-sizing: border-box;
  padding: 30px;
  padding-top: 150px;
  background-color: rgb(199, 199, 199);
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  margin: 2em;
}

.submenu{
  padding-left: 1.5em;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
