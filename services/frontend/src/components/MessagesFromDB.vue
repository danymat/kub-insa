<script setup>
import { ref } from 'vue'

var messages = ref([])

function getmsg(event) {
  // get the messages from the backend
  alert("recuperation messages")
}
</script>

<template>
  <div>
    <ul id="list_msg">
      <li v-for="msg in messages.value" :key="msg.text">
        {{ msg }}
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
