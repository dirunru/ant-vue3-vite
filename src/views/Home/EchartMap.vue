<template>
  <div class="page">
    <div ref="chinaMap" class="echart-china"> </div>
  </div>
</template>

<script lang="ts" setup>
  import * as echarts from 'echarts';
  import chinaJSON from '../../assets/constant/chain.json';
  import { onMounted, ref } from 'vue';
  import { reactive } from 'vue';
  const chinaMap = ref(null);
  onMounted(() => {
    drawChina();
  });

  let keyIndex = '湖北省';
  let collegeList = {
    广东省: [{ title: '上海职业学员', id: 1 }],
    湖北省: [{ title: '湖北职业学员', id: 6 }]
  };
  let devCoordMap = {
    江苏: [119.6062, 32.9208],
    河北: [115.0488, 39.0948],
    广西: [108.479, 23.1152],
    湖北: [112.3896, 30.6628]
  };

  let heatmapData = [
    {
      name: '河北',
      value: 1231504
    },
    {
      name: '广西',
      value: 244021
    },
    {
      name: '江苏',
      value: 1195364
    }
  ];
  function convertData(data) {
    let res = new Array();
    for (let i = 0; i < data.length; i++) {
      let dataItem = data[i];
      let fromCoord = devCoordMap[dataItem.source];
      let toCoord = devCoordMap[dataItem.target];
      if (fromCoord && toCoord) {
        res.push({
          fromName: dataItem.source,
          toName: dataItem.target,
          coords: [fromCoord, toCoord],
          value: dataItem.value
        });
      }
    }
    return res;
  }
  let lineData = [
    {
      target: '河北',
      source: '湖北',
      value: ''
    },
    {
      target: '广西',
      source: '湖北',
      value: ''
    },
    {
      target: '江苏',
      source: '湖北',
      value: ''
    }
  ];
  let alls = '提示词';
  let arrs = Array('湖北省', '江西省', '广西壮族自治区', '广东省', '山东省', '湖南省', '福建省', '甘肃省', '青海省', '安徽省', '');
  let mapCode = '审图号：GS(2022)4308号';
  function drawChina() {
    let myChart = echarts.init(chinaMap.value);
    echarts.registerMap('china', chinaJSON); //注册可用的地图

    let option = {
      layoutCenter: ['49.7%', '45.8%'], //位置
      layoutSize: '100%', //大小
      title: {
        show: true,
        textStyle: {
          fontWeight: '500',
          fontSize: 40,
          color: '#ffffff'
        },
        top: 20,
        left: '0%'
      },
      aspectScale: 1, // 地图的长宽比 默认0.75
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          if (params.seriesType === 'lines') {
            // 轨迹线上的数据展示areaColor
            return;
            // return params.data.fromName + '>' + params.data.toName + ':' + params.data.value
            return params.data.fromName + '<br>省服务商：' + params.data.value;
          } else if (params.seriesType === 'map') {
            let str = '';
            for (let i in lineData) {
              if (params.name.indexOf(lineData[i].target) != -1) {
                str = lineData[i].value;
                break;
              }
            }
            console.log('=====', str);
            if (str) {
              return params.name + '<br>' + '<br>省服务商：' + str;
            } else {
              return params.name + '<br>' + alls;
            }
          } else {
            return params.name + '<br>' + alls;
          }
        }
      },
      visualMap: {
        show: false,
        min: 0,
        seriesIndex: 0,
        pieces: [
          {
            gt: 100000,
            label: '3级'
          }, // (1500, Infinity]
          {
            gt: 50000,
            lte: 100000,
            label: '2级'
          }, // (200, 300]
          {
            lt: 50000,
            label: '1级'
          } // (-Infinity, 5)
        ],
        calculable: false, // true 柱状展示 false 分级别展示
        inRange: {
          color: ['#41a2b7', '#3486E7', '#3486E7']
        },
        textStyle: {
          color: '#fff'
        }
      },
      geo: {
        map: 'china',
        label: {
          normal: {
            show: true,
            textStyle: {
              color: '#FFFFFF',
              fontSize: 20
            }
          },
          emphasis: {
            show: true,
            textStyle: {
              color: '#fff',
              fontSize: 20
            }
          }
        },
        center: [104.114129, 37.550339],
        zoom: 1,
        regions: [
          {
            name: '中国',
            label: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              // borderColor: 'rgba(147, 235, 248, 0.1)',
              borderWidth: 0,
              areaColor: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(6, 18, 51, .5)' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(6, 18, 51, 1)' // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              },
              shadowColor: 'rgba(255, 255, 255, 0.1)',
              shadowOffsetX: -2,
              shadowOffsetY: 2,
              shadowBlur: 30
            }
          }
        ],
        roam: false, // true scale move
        // 整体地图调整
        itemStyle: {
          normal: {
            borderColor: '#11f5f1',
            // borderColor: 'rgba(204, 204, 204, .1)',
            borderWidth: 1,
            areaColor: 'rgba(52,134,231,0.15)',
            // shadowColor: 'rgba(255, 255, 255, .3)',
            shadowOffsetX: -2,
            shadowOffsetY: -3,
            shadowBlur: 10
          },
          emphasis: {
            areaColor: 'rgba(52,134,231,0.4)', // 区域悬停颜色 rgba(0, 0, 0, .3)
            borderWidth: 0,
            color: '#fff'
          }
        },
        select: {
          // 地图选中区域样式
          label: {
            show: true,
            color: '#fff',
            fontSize: 20
          },
          itemStyle: {
            color: 'rgba(52,134,231,0.6)', // 设置地图点击后的颜色
            fontSize: 20
          }
        }
      },
      series: [
        {
          // 区域热力值
          name: '区域热力值',
          type: 'map',
          geoIndex: 0,
          data: heatmapData
        },
        {
          // 画线
          type: 'lines',
          symbol: ['circle', 'none'],
          zlevel: 2,
          effect: {
            show: true,
            period: 6,
            trailLength: 0.2,
            symbol: 'arrow',
            symbolSize: 10
          },
          lineStyle: {
            normal: {
              color: '#afec2a',
              width: 1,
              opacity: 0.8,
              curveness: 0.2
            }
          },
          data: convertData(lineData)
        },
        {
          // 画线
          type: 'lines',
          symbol: ['circle', 'none'],
          zlevel: 2,
          effect: {
            show: true,
            period: 6,
            trailLength: 0.2,
            symbol: 'arrow',
            symbolSize: 10
          },
          lineStyle: {
            normal: {
              color: '#afec2a',
              width: 1,
              opacity: 0.8,
              curveness: 0.2
            }
          },
          data: convertData(lineData)
        }
      ]
    };
    myChart.setOption(option);
  }
</script>

<style lang="less" scoped>
  //设置背景图片
  .page {
    width: 100%;
    height: 100vh;
    color: #fff;
    background: url('../../assets/images/xingkong.webp') repeat;
    background-position: center center;
    background-size: cover;
  }

  .show-box {
    background: #040000;
    position: fixed;
    top: 10px;
    left: 200px;
    border: #28f1fa;
    padding: 20px;
    font-size: 14px;
    border-radius: 5px;

    .show-title {
      text-align: center;
      font-size: 24px;
    }
  }

  .echart-china {
    height: 100%;
    width: 100vw;
    /* border: 1px solid; */
  }

  .echart-college {
    position: absolute;
    height: 500px;
    width: 100%;
    right: 15%;
    top: 10%;
    text-align: center;
    /* border: 1px solid; */
  }

  .college {
    font-weight: 700;
  }

  .scrollbar-demo-item {
    align-items: center;
    justify-content: center;
    padding: 5px 10px;
    height: 40px;
    font-size: 16px;
  }
</style>
<script lang="ts">
  // 静态元数据
  export const meta = {
    title: '中国地图'
  };
</script>
