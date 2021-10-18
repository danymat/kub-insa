<script setup>
import { ref } from 'vue'

var msg_text = ref("")

function sendmsg(event) {
  // send the msg to the backend
  alert(msg_text.value)
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
