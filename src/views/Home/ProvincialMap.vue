<template>
  <div>
    <div ref="chinaMap" class="echart-china"> </div>
  </div>
</template>

<script setup>
  import { ref, reactive, onMounted } from 'vue';
  import * as echarts from 'echarts';
  import axios from 'axios';
  const mapName = '河南';
  const chinaMap = ref(null);
  onMounted(() => {
    let myChart = echarts.init(chinaMap.value);
    myChart.showLoading();
    axios.get('https://geo.datav.aliyun.com/areas_v3/bound/410000_full.json').then((res) => {
      let geoJson = res.data;
      echarts.registerMap(mapName, geoJson);
      // console.log('geoJson', geoJson);
      let data = geoJson.features.map((item) => {
        return {
          value: (Math.random() * 1000).toFixed(2),
          name: item.properties.name
        };
      });
      myChart.hideLoading();
      let option = {
        tooltip: {
          backgroundColor: 'rgba(0,0,0,0)',
          trigger: 'item'
        },
        legend: {
          show: false
        },
        series: [
          {
            tooltip: {
              trigger: 'item',
              formatter: function (item) {
                var tipHtml = '';
                tipHtml = '<div style="background:#fff;border-radius:10px;padding-top:10px;box-shadow:0 0 10px #666">' + '<div style="color:#fff;height:20px;border-radius:6px;font-size:12px;line-height:20px;background-color:#5861a2;text-align:center;margin:0 2px;">' + item.data.name + '</div>' + '<div style="text-align:center;color:#494949;padding:8px 6px">' + '<span style="font-size:18px;font-weight:bold;">' + item.data.value + ' ' + '</span>' + '</div>' + '</div>';
                return tipHtml;
              }
            },
            name: '河南省数据',
            type: 'map',
            map: mapName, // 自定义扩展图表类型
            aspectScale: 1, // 长宽比
            zoom: 1, //缩放
            roam: true, //是否开启鼠标缩放和平移漫游
            showLegendSymbol: false, // 是否显示图例颜色标识（颜色条）
            label: {
              show: true,
              color: 'red',
              fontSize: 10
            },
            itemStyle: {
              areaColor: '#7fffd4',
              borderColor: '#0E95F1',
              borderWidth: 1,
              shadowColor: '#7fffd4',
              shadowBlur: 20
            },
            emphasis: {
              label: {
                show: true,
                color: '#fff',
                fontSize: 10
              },
              itemStyle: {
                areaColor: '#FFD181',
                borderColor: '#fff',
                borderWidth: 1
              }
            },
            layoutCenter: ['50%', '50%'],
            layoutSize: '160%', //缩放比例
            markPoint: {
              symbol: 'none' // 标记点
            },
            data: data
          }
        ]
      };
      myChart.setOption(option);
      showTips('河南省');
      // 默认鼠标移出canvas后显示广州的tooltip信息
      myChart.on('globalout', () => {
        setTimeout(() => {
          showTips('河南省');
        }, 5000);
      });

      function showTips(name) {
        data.forEach((item, i) => {
          if (item.name.includes(name)) {
            myChart.dispatchAction({
              type: 'showTip',
              seriesIndex: 0,
              dataIndex: i
            });
            myChart.dispatchAction({
              type: 'mapSelect',
              seriesIndex: 0,
              dataIndex: i
            });
          }
        });
      }
    });
  });
</script>
<style lang="less" scoped>
  .echart-china {
    width: 100vw;
    height: 100vh;
  }
</style>
<script>
  // 静态元数据
  export const meta = {
    title: '河南省内地图'
  };
</script>
