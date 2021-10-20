<script setup>
import { ref } from 'vue'
import axios from 'axios'

var messages = ref([])

function getmsg(event) {
  axios.get('http://localhost:3000/msg')
  .then((reponse) => {
    messages.value = reponse.list_messages
  })
  .catch((error) => {
    alert(error)
  })
}
</script>

<template>
  <div>
    <ul id="list_msg">
      <li v-for="msg in messages.value" :key="msg.text">
        {{ msg.timestamp }} : {{ msg.message }}
      </li>
    </ul>
    <button v-on:click="getmsg">Recuperer les messages de la DB</button>
  </div>
</template>

<style scoped>
div {
  margin: 15px;
}
</style>
