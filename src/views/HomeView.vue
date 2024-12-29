<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main>
    <w-grid columns="6" class="wrapper">
      <div v-for="i in 12" :key="i" class="box"></div>
    </w-grid>
    <TheWelcome />
  </main>
</template>

<style scoped>
.wrapper {
  background-color: #faeed4;
  padding: 12px;
}

.box {
  background-color: #e2ecfc;
  border: 1px solid #b2c2f0;
  padding: 12px;
}
</style>
