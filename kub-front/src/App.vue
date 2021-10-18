<script setup>
import MessagesFromDB from './components/MessagesFromDB.vue'
import Messager from './components/Messager.vue'
</script>

<template>
  <div>
    <MessagesFromDB />
    <Messager />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
