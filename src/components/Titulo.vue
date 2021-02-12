<template>
  <h1>{{ titulo }}</h1>
</template>

<script>
export default {
  name:"Titulo",
  data() {
    return {
      titulo: "Liga de futbol profesional de 1ª división"
    }
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
  color: whitesmoke;
  width: 80%;
  background-color: rgb(199, 199, 199);
  padding: 25px;
  float: right;
}
</style>