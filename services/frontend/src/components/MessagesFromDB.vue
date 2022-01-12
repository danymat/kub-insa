<script setup>
import { ref } from 'vue'
import axios from 'axios'

var messages = ref([])

function getmsg(event) {
  axios.get('http://backend-service/messages')
  .then((res) => {
    messages.value = res.data
  })
  .catch((error) => {
    alert(error)
  })
}
</script>

<template>
  <div>
    <ul id="list_msg">
      <li v-for="(key, message) in messages" :key="key">
        {{ key }} : {{ message }}
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
