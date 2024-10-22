<template>
  <div class="tslyqk_constituent_3d">
    <div class="echarts3D" ref="echarts3D"></div>
    <div class="bg-nopx"></div>
  </div>
</template>

<script setup>
  import * as echarts from 'echarts';
  const { proxy } = getCurrentInstance();
  import 'echarts-gl';
  const myChart = ref(null);

  // 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
  function getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {
    // 计算
    let midRatio = (startRatio + endRatio) / 2;

    let startRadian = startRatio * Math.PI * 2;
    let endRadian = endRatio * Math.PI * 2;
    let midRadian = midRatio * Math.PI * 2;

    // 如果只有一个扇形，则不实现选中效果。
    // if (startRatio === 0 && endRatio === 1) {
    //     isSelected = false;
    // }
    isSelected = false;
    // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
    k = typeof k !== 'undefined' ? k : 1 / 3;

    // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
    let offsetX = isSelected ? Math.sin(midRadian) * 0.1 : 0;
    let offsetY = isSelected ? Math.cos(midRadian) * 0.1 : 0;

    // 计算高亮效果的放大比例（未高亮，则比例为 1）
    let hoverRate = isHovered ? 1.05 : 1;

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
          return Math.sin(u) * h * 0.1;
        }
        return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
      }
    };
  }
  // 生成模拟 3D 饼图的配置项
  function getPie3D(pieData, internalDiameterRatio) {
    let series = [];
    let sumValue = 0;
    let startValue = 0;
    let endValue = 0;
    let legendData = [];
    let k =
      typeof internalDiameterRatio !== 'undefined' ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio) : 1 / 3;

    // 为每一个饼图数据，生成一个 series-surface 配置
    for (let i = 0; i < pieData.length; i++) {
      sumValue += pieData[i].value;

      let seriesItem = {
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
          k: 1 / 10
        }
      };

      if (typeof pieData[i].itemStyle != 'undefined') {
        let itemStyle = {};

        typeof pieData[i].itemStyle.color != 'undefined' ? (itemStyle.color = pieData[i].itemStyle.color) : null;
        typeof pieData[i].itemStyle.opacity != 'undefined' ? (itemStyle.opacity = pieData[i].itemStyle.opacity) : null;

        seriesItem.itemStyle = itemStyle;
      }
      series.push(seriesItem);
    }

    // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
    // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
    for (let i = 0; i < series.length; i++) {
      endValue = startValue + series[i].pieData.value;

      series[i].pieData.startRatio = startValue / sumValue;
      series[i].pieData.endRatio = endValue / sumValue;
      series[i].parametricEquation = getParametricEquation(
        series[i].pieData.startRatio,
        series[i].pieData.endRatio,
        false,
        false,
        k,
        series[i].pieData.value
      );

      startValue = endValue;

      legendData.push(series[i].name);
    }

    // // 补充一个透明的圆环，用于支撑高亮功能的近似实现。
    series.push({
      name: 'mouseoutSeries',
      type: 'surface',
      parametric: true,
      wireframe: {
        show: false
      },
      itemStyle: {
        opacity: 0.9,
        color: '#296E99'
      },
      parametricEquation: {
        u: {
          min: 0,
          max: Math.PI * 2,
          step: Math.PI / 20
        },
        v: {
          min: 0,
          max: Math.PI,
          step: Math.PI / 20
        },
        x: function (u, v) {
          return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2;
        },
        y: function (u, v) {
          return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2;
        },
        z: function (u, v) {
          return Math.cos(v) > 0 ? -0.5 : -5;
        }
      }
    });

    // // 补充一个透明的圆环，用于支撑高亮功能的近似实现。
    series.push({
      name: 'mouseoutSeries',
      type: 'surface',
      parametric: true,
      wireframe: {
        show: false
      },
      itemStyle: {
        opacity: 0.2,
        color: '#215983'
      },
      parametricEquation: {
        u: {
          min: 0,
          max: Math.PI * 3,
          step: Math.PI / 20
        },
        v: {
          min: 0,
          max: Math.PI,
          step: Math.PI / 20
        },
        x: function (u, v) {
          return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 3;
        },
        y: function (u, v) {
          return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 3;
        },
        z: function (u, v) {
          return Math.cos(v) > 0 ? -5 : -7;
        }
      }
    });
    series.push({
      name: 'mouseoutSeries',
      type: 'surface',
      parametric: true,
      wireframe: {
        show: false
      },
      itemStyle: {
        opacity: 1,
        color: '#25719D'
      },
      parametricEquation: {
        u: {
          min: 0,
          max: Math.PI * 2,
          step: Math.PI / 20
        },
        v: {
          min: 0,
          max: Math.PI,
          step: Math.PI / 20
        },
        x: function (u, v) {
          return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2.5;
        },
        y: function (u, v) {
          return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2.5;
        },
        z: function (u, v) {
          return Math.cos(v) > 0 ? -7 : -7;
        }
      }
    });

    // 准备待返回的配置项，把准备好的 legendData、series 传入。
    let option = {
      tooltip: {
        formatter: (params) => {
          if (params.seriesName !== 'mouseoutSeries') {
            return `${
              params.seriesName
            }<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${
              params.color
            };"></span>${option.series[params.seriesIndex].pieData.value}`;
          }
        }
      },
      //animation: false,
      legend: {
        orient: 'vertical',
        icon: 'circle',
        right: '3%',
        top: '20%',
        show: true,
        itemGap: 10,
        textStyle: {
          color: '#A1E2FF',
          fontSize: 13
        },
        // icon:'diamond',
        data: legendData,
        formatter: (params) => {
          return params;
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
      zAxis3D: {},
      grid3D: {
        viewControl: {
          autoRotate: true
          //3d效果可以放大、旋转等，请自己去查看官方配置
          // alpha: 0,
          // beta: 100,
          // rotateSensitivity: 100,
          // zoomSensitivity: 100,
          // panSensitivity: 100,
        },
        top: '0%',
        left: 'left',
        width: '60%',
        show: false,
        boxHeight: 50
      },
      series: series
    };
    return option;
  }
  // 传入数据生成 option

  const initEcharts = () => {
    const optionData = [
      {
        name: '草(17.4k㎡,0.4%)',
        value: 17.4,
        itemStyle: {
          color: '#E7EA39'
        }
      },
      {
        name: '田 (4051.55k㎡,83.3%)',
        value: 4051.55,
        itemStyle: {
          color: '#E89668'
        }
      },
      {
        name: '林 (553.89k㎡,11.4%)',
        value: 553.89,
        itemStyle: {
          color: '#D863F4'
        }
      },
      {
        name: '湖 (78.54k㎡,1.6%)',
        value: 78.54,
        itemStyle: {
          color: '#03BABB'
        }
      },
      {
        name: '水 (165.05k㎡,3.4%)',
        value: 165.05,
        itemStyle: {
          color: '#3EB4F1'
        }
      }
    ];
    // 生成配置选项
    const option = getPie3D(optionData, 0.59);
    myChart.value = echarts.init(proxy.$refs.echarts3D);

    // 绘制图形
    myChart.value.setOption(option);
  };

  //自适应
  function resizeTheChart() {
    if (myChart.value) {
      myChart.value.resize();
    }
  }

  onMounted(() => {
    initEcharts();
    window.addEventListener('resize', resizeTheChart);
  });
</script>

<style lang="less" scoped>
  .tslyqk_constituent_3d {
    width: 100%;
    height: 550px;
    position: relative;
    //   background: red;
    .echarts3D {
      height: 100%;
      height: 550px;
      position: relative;
      // z-index: 310;
      // background: red;
    }
  }
</style>
<script>
  // 静态元数据
  export const meta = {
    title: '3D饼图2'
  };
</script>
