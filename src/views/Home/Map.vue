<template>
  <div>
    <div ref="chinaMap" class="echart-china"> </div>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue';
  import * as echarts from 'echarts';
  import chinaJSON from '../../assets/constant/chain.json';
  var mapName = 'china';
  var data = [
    { name: '北京', value: 5 },
    { name: '天津', value: 14 },
    { name: '河北', value: 157 },
    { name: '山西', value: 110 },
    { name: '内蒙古', value: 40 },
    { name: '辽宁', value: 40 },
    { name: '吉林', value: 40 },
    { name: '黑龙江', value: 60 },
    { name: '上海', value: 10 },
    { name: '江苏', value: 60 },
    { name: '浙江', value: 50 },
    { name: '安徽', value: 151 },
    { name: '福建', value: 60 },
    { name: '江西', value: 74 },
    { name: '山东', value: 200 },
    { name: '河南', value: 100 },
    { name: '湖北', value: 40 },
    { name: '湖南', value: 50 },
    { name: '重庆', value: 40 },
    { name: '四川', value: 120 },
    { name: '贵州', value: 135 },
    { name: '云南', value: 90 },
    { name: '西藏', value: 25 },
    { name: '陕西', value: 100 },
    { name: '甘肃', value: 60 },
    { name: '青海', value: 20 },
    { name: '宁夏', value: 110 },
    { name: '新疆', value: 32 },
    { name: '广东', value: 10 },
    { name: '广西', value: 100 },
    { name: '海南', value: 40 }
  ];

  var geoCoordMap = {};
  var toolTipData = [
    {
      name: '河南省',
      value: '牧野之战 昆阳之战 黄巾起义 白马之围 官渡之战 荥阳大战 洛阳之战 虎牢关之战 东京保卫战',
      areas: ['长沙', '株洲', '益阳']
    },
    {
      name: '山西省',
      value: '长平之战 柏壁之战 太原之战（唐） 太原之战（宋）',
      areas: ['长沙', '株洲', '益阳']
    },
    {
      name: '河北省',
      value: '易京之战 巨鹿之战',
      areas: ['长沙', '株洲', '益阳']
    },
    {
      name: '陕西省',
      value: '潼关大战',
      areas: ['长沙', '株洲', '益阳']
    },
    {
      name: '黑龙江省',
      value: '蒙金战争',
      areas: ['长沙', '株洲', '益阳']
    },
    {
      name: '新疆省',
      value: '清灭准噶尔之战 大小和卓叛乱之战',
      areas: ['长沙', '株洲', '益阳']
    },
    {
      name: '安徽省',
      value: '淝水之战',
      areas: ['长沙', '株洲', '益阳']
    }
  ];
  const chinaMap = ref(null);
  onMounted(() => {
    let myChart = echarts.init(chinaMap.value);
    // /*获取地图数据*/
    myChart.showLoading();
    echarts.registerMap('china', chinaJSON); //注册可用的地图
    myChart.hideLoading();
    chinaJSON.features.forEach(function (v) {
      // 地区名称
      var name = v.properties.name;
      // 地区经纬度
      geoCoordMap[name] = v.properties.center;
    });
    var convertData = function (data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          });
        }
      }
      return res;
    };
    let option = {
      backgroundColor: '#003366',
      title: {
        show: true,
        text: '中国黄河20战争',
        x: 'center',
        top: '10',
        textStyle: {
          color: '#fff',
          fontFamily: '等线',
          fontSize: 18
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          if (typeof params.value[2] == 'undefined') {
            var toolTiphtml = '';
            for (var i = 0; i < toolTipData.length; i++) {
              if (params.name == toolTipData[i].name) {
                toolTiphtml += toolTipData[i].name + '：' + toolTipData[i].value;
              }
            }
            console.log(toolTiphtml);
            // console.log(convertData(data))
            return toolTiphtml;
          } else {
            var toolTiphtml = '';
            for (var i = 0; i < toolTipData.length; i++) {
              if (params.name == toolTipData[i].name) {
                toolTiphtml += toolTipData[i].name + '：' + toolTipData[i].value;
              }
            }
            // console.log(toolTiphtml);
            return toolTiphtml;
          }
        },
        backgroundColor: '#fff',
        borderColor: '#333',
        padding: [5, 10],
        textStyle: {
          color: '#333',
          fontSize: '16'
        }
      },
      geo: {
        layoutCenter: ['45%', '48%'], //位置
        layoutSize: '100%', //大小
        show: true,
        map: mapName,
        roam: true,
        label: {
          show: true,
          textStyle: {
            color: '#fff'
          }
        },
        emphasis: {
          show: true,
          textStyle: {
            color: '#fff'
          }
        },
        itemStyle: {
          normal: {
            borderColor: 'rgba(147, 235, 248, 1)',
            borderWidth: 1,
            areaColor: {
              type: 'radial',
              x: 0.5,
              y: 0.5,
              r: 0.8,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
                }
              ],
              globalCoord: false // 缺省为 false
            },
            // shadowColor: 'rgba(128, 217, 248, 1)',
            shadowColor: 'rgba(255, 255, 255, 1)',
            shadowOffsetX: -2,
            shadowOffsetY: 2,
            shadowBlur: 10
          },
          emphasis: {
            areaColor: '#389BB7',
            borderWidth: 0
          }
        }
      },
      series: [
        {
          type: 'map',
          map: mapName,
          geoIndex: 0, //地图索引
          aspectScale: 0.9, //长宽比
          zoom: 1,
          showLegendSymbol: true, //是否显示图例颜色标识（颜色条）
          roam: true, //是否开启鼠标缩放和平移漫游
          itemStyle: {
            normal: {
              areaColor: '#031525',
              borderColor: '#3B5077'
            },
            emphasis: {
              areaColor: '#2B91B7'
            }
          },
          animation: false,
          data: data
        },
        {
          name: 'Top 5',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: convertData(toolTipData),
          symbolSize: function (val) {
            return 15;
          },
          // 动画
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke'
          },
          hoverAnimation: true,
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: true,
              color: '#fff'
            }
          },
          itemStyle: {
            normal: {
              color: '#1DE9B6',
              shadowBlur: 10,
              shadowColor: '#1DE9B6'
            }
          },
          zlevel: 1
        }
      ]
    };
    myChart.setOption(option);
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
    title: '中国地图2'
  };
</script>
