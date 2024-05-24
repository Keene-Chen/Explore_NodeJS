<template>
  <nav>
    <RouterLink to="/chart">Chart</RouterLink>
    <RouterLink to="/chart/bar">Bar</RouterLink>
    <RouterLink to="/chart/line">line</RouterLink>
    <RouterLink to="/chart/pie">pie</RouterLink>
  </nav>
  <RouterView></RouterView>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<style scoped></style>
