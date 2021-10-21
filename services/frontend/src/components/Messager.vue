<script setup>
import { ref } from 'vue'
import axios from 'axios'

var msg_text = ref("")

function sendmsg(event) {
  console.log(msg_text)
  axios.post('http://localhost:8081/messages', {
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
