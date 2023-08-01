import * as echarts from 'echarts';

// 基于准备好的dom，初始化echarts实例
let chart = echarts.init(document.getElementById('main'), 'light', {
  renderer: 'svg',
  width: 600,
  height: 400,
});

// 绘制图表
chart.setOption({
  title: {
    text: 'ECharts 入门示例',
  },
  tooltip: {},
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20],
    },
  ],
});
