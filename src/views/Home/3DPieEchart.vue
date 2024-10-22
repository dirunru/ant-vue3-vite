<template>
  <div class="s-body echart">
    <SEchart :option="option" />
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue';
  import SEchart from '@/components/SEchart.vue';
  var colorList = ['#FF9900', '#FFCC33', '#99CC00'];

  var echartData = [
    {
      value: 48,
      name: '未上报行程单'
    },
    {
      value: 32,
      name: '途径购物店'
    },
    {
      value: 19,
      name: '行程偏移'
    }
  ];
  var seriesData = echartData.map((item, index) => {
    return {
      ...item,
      actValue: item.value,
      label: {
        show: true,
        position: 'inner',
        borderRadius: 5,
        padding: [0, 5, 3, -3],
        color: colorList[index],
        textStyle: {
          fontSize: 14
        },
        formatter: '{b}\n\n{c}\n\n{d}%'
      }
    };
  });
  const option = getPie3D(seriesData, 0); // 可做为调整内环大小 0为实心圆饼图，大于0 小于1 为圆环

  // 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
  function getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {
    const midRatio = (startRatio + endRatio) / 2;
    const startRadian = startRatio * Math.PI * 2;
    const endRadian = endRatio * Math.PI * 2;
    const midRadian = midRatio * Math.PI * 2;
    // 如果只有一个扇形，则不实现选中效果。
    if (startRatio === 0 && endRatio === 1) {
      isSelected = false;
    }
    k = typeof k !== 'undefined' ? k : 1 / 3;
    const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
    const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;
    // 鼠标滑过时外环放大大小
    const hoverRate = isHovered ? 1.05 : 1;
    // 返回曲面参数方程
    return {
      u: {
        min: -Math.PI,
        max: Math.PI * 3,
        step: Math.PI / 32
      },

      v: {
        min: 0,
        max: Math.PI * 2,
        step: Math.PI / 20
      },

      x: function (u, v) {
        if (u < startRadian) {
          return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
        }
        if (u > endRadian) {
          return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
        }
        return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
      },

      y: function (u, v) {
        if (u < startRadian) {
          return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
        }
        if (u > endRadian) {
          return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
        }
        return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
      },

      z: function (u, v) {
        if (u < -Math.PI * 0.5) {
          return Math.sin(u);
        }
        if (u > Math.PI * 2.5) {
          return Math.sin(u);
        }
        return Math.sin(v) > 0 ? 20 : -1;
      }
    };
  }

  // 生成模拟 3D 饼图的配置项
  function getPie3D(pieData, internalDiameterRatio) {
    const series = [];
    let sumValue = 0;
    let startValue = 0;
    let endValue = 0;
    const legendData = [];
    const k =
      typeof internalDiameterRatio !== 'undefined' ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio) : 1 / 3;
    for (let i = 0; i < pieData.length; i += 1) {
      sumValue += pieData[i].value;
      const seriesItem = {
        name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
        type: 'surface',
        parametric: true,
        wireframe: {
          show: false
        },
        pieData: pieData[i],
        pieStatus: {
          selected: false,
          hovered: false,
          k
        }
      };
      if (typeof pieData[i].itemStyle !== 'undefined') {
        const { itemStyle } = pieData[i];
        // eslint-disable-next-line no-unused-expressions
        typeof pieData[i].itemStyle.color !== 'undefined' ? (itemStyle.color = pieData[i].itemStyle.color) : null;
        // eslint-disable-next-line no-unused-expressions
        typeof pieData[i].itemStyle.opacity !== 'undefined' ? (itemStyle.opacity = pieData[i].itemStyle.opacity) : null;

        seriesItem.itemStyle = itemStyle;
      }
      series.push(seriesItem);
    }
    for (let i = 0; i < series.length; i += 1) {
      endValue = startValue + series[i].pieData.value;
      series[i].pieData.startRatio = startValue / sumValue;
      series[i].pieData.endRatio = endValue / sumValue;
      series[i].parametricEquation = getParametricEquation(
        series[i].pieData.startRatio,
        series[i].pieData.endRatio,
        true,
        false,
        k,
        10 //在此处传入饼图初始高度h
      );
      startValue = endValue;
      legendData.push(series[i].name);
    }

    series.push({
      name: 'pie2d',
      type: 'pie',
      label: {
        color: '#ffffff',
        opacity: 1,
        fontStyle: 'normal',
        fontSize: 12,
        fontFamily: 'Microsoft YaHei',
        formatter: (params) => {
          return `${params.data.name}\n${params.data.value}\n${(
            (params.data.value / _.sumBy(pieData, 'value')) *
            100
          ).toFixed(2)}%`;
        }
      },
      labelLine: {
        length: 60
      },
      startAngle: -30, //起始角度，支持范围[0, 360]。
      clockwise: false, //饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
      radius: ['40%', '60%'],
      center: ['50%', '50%'],
      data: pieData,
      itemStyle: {
        opacity: 0
      }
    });

    // 底部透明的圆环
    series.push({
      name: 'mouseoutSeries',
      type: 'surface',
      parametric: true,
      wireframe: {
        show: false
      },
      itemStyle: {
        opacity: 1,
        color: '#102b6f'
      },
      parametricEquation: {
        u: {
          min: 0,
          max: Math.PI * 2,
          step: Math.PI / 30
        },
        v: {
          min: 0,
          max: Math.PI,
          step: Math.PI / 30
        },
        x: function (u, v) {
          return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 3.75;
        },
        y: function (u, v) {
          return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 3.75;
        },
        z: function (u, v) {
          return Math.cos(v) > 0 ? -5 : -7;
        }
      }
    });

    // 准备待返回的配置项，把准备好的series 传入。
    const option = {
      backgroundColor: '#123756',
      title: {
        show: false
      },
      // legend: {
      //   show: false,
      // },
      color: ['rgba(111,57,244,1)', 'rgba(217,36,242,1)', 'rgba(51,210,186,1)'],
      tooltip: {
        formatter: (params) => {
          if (params.seriesName !== 'mouseoutSeries') {
            return `${params.marker}${params.seriesName}：${pieData[params.seriesIndex].value}`;
          }
          return '';
        }
      },
      xAxis3D: {
        min: -1,
        max: 1
      },
      yAxis3D: {
        min: -1,
        max: 1
      },
      zAxis3D: {
        min: -1,
        max: 1
      },
      grid3D: {
        show: false,
        top: '-10%',
        boxHeight: 1, //修改立体饼图的高度
        viewControl: {
          // 3d效果可以放大、旋转等，
          alpha: 30, //饼图翻转的程度
          beta: 30,
          rotateSensitivity: 1,
          zoomSensitivity: 0,
          panSensitivity: 0,
          autoRotate: false, //是否自动旋转
          distance: 500 //距离越小看到的饼图越大
        }
      },
      series
    };
    return option;
  }
</script>
<style lang="less" scoped>
  .echart {
    width: 500px;
    height: 500px;
  }
</style>
<script>
  // 静态元数据
  export const meta = {
    title: '3D饼图'
  };
</script>
