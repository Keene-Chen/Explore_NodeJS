import { Chart } from '@antv/g2';

// 准备数据
const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

// 更新数据
const newData = [
  { genre: 'Sports', sold: 175 },
  { genre: 'Strategy', sold: 215 },
  { genre: 'Action', sold: 220 },
  { genre: 'Shooter', sold: 250 },
  { genre: 'Other', sold: 50 },
];

// 初始化图表实例
const chart = new Chart({
  // width: 600, // 指定图表宽度
  // height: 300, // 指定图表高度
  autoFit: true, // 自适应容器宽高
  container: 'container',
  theme: 'classic',
});

// 声明可视化
chart
  .interval() // 创建一个 Interval 标记
  .data(data) // 绑定数据
  .encode('x', 'genre') // 编码 x 通道
  .encode('y', 'sold') // 编码 y 通道
  // .style('fill', 'red') // 指定 style 填充色为红色
  // .style('viewFill', '#4e79a7') // 设置视图区域样式
  // .style('plotFill', '#f28e2c') // 绘制区域样式
  // .style('mainFill', '#e15759') // 主区域样式
  // .style('contentFill', '#76b7b2') // 内容区域样式
  .encode('color', 'genre') // genre 是一个离散数据
  .scale('color', {
    // 指定映射后的颜色
    range: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#c564be'],
  })
  .axis('y', true) // 关闭 y 轴
  .axis('x', true) // 关闭 x 轴
  .legend('genre', false) // 关闭图例
  .tooltip(['genre', 'sold']); // 设置 tooltip

// 定时器定时一秒后更新数据
setTimeout(() => {
  chart.changeData(newData); // 更新数据
}, 3000);

// 渲染可视化
chart
  .render()
  .then(() => {
    console.log('渲染完成');
  })
  .catch((err) => {
    console.error(err);
  });
