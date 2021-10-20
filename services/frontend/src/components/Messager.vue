<script setup>
import { ref } from 'vue'
import axios from 'axios'

var msg_text = ref("")

function sendmsg(event) {
  axios.post('http://localhost:3000/msg', {
    message: msg_text.value
  })
  .then((reponse) => {
    alert(reponse.data)
  })
  .catch((error) => {
    alert(error)
  })
}
</script>

<template>
  <div>
    <input type="text" placeholder="mon message" v-model="msg_text" />
    <button v-on:click="sendmsg">Envoyer</button>
  </div>
</template>

<style scoped>
div {
  margin: 15px;
}
</style>
