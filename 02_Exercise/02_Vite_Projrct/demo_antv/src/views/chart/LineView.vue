<template>
  <div ref="root" style="height: 90%"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Line } from '@antv/g2plot';

const root = ref(null);

const initChart = () => {
  fetch('https://gw.alipayobjects.com/os/bmw-prod/e00d52f4-2fa6-47ee-a0d7-105dd95bde20.json')
    .then((res) => res.json())
    .then((data) => {
      const linePlot = new Line(root.value, {
        data,
        xField: 'year',
        yField: 'gdp',
        seriesField: 'name',
        yAxis: {
          label: {
            formatter: (v) => `${(v / 10e8).toFixed(1)} B`
          }
        },
        legend: {
          position: 'top'
        },
        smooth: true,
        // @TODO 后续会换一种动画方式
        animation: {
          appear: {
            animation: 'path-in',
            duration: 5000
          }
        }
      });

      linePlot.render();
    });
};

onMounted(() => {
  initChart();
});
</script>
