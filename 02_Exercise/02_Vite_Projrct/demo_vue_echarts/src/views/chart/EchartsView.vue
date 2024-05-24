<template>
  <div class="chart">
    <router-link to="/chart/bar">bar</router-link>
    <router-link to="/chart/line">line</router-link>
    <router-link to="/chart/pie">pie</router-link>
  </div>
  <router-view></router-view>
</template>

<script setup></script>

<style scoped>
.chart {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
}

.chart a {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-decoration: none;
}

.chart a:hover {
  background-color: #ccc;
}
</style>
