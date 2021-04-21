<!--
 * @Author: 勾青琼
 * @Date: 2021-04-20 09:32:59
 * @LastEditTime: 2021-04-20 13:38:59
 * @LastEditors: Please set LastEditors
 * @Description: 发票流向
 * @FilePath: \guidance\src\views\dataAnalysis\autonomyJudge\common\capital\invoiceTrade.vue
-->
<template>
  <div class="invoice-flow-wrap">
    <section class="invoice-flow-map-wrap">
      <h3 class="invoice-flow-map-title invoice-flow-title">
        <img
          src="@/assets/logo.png"
          style="width: 14px; height: 16px; margin-right: 10px;"
          alt=""
        />
        <span>发票地域流向分布</span>
      </h3>
      <div ref="map" class="invoice-flow-map invoice-flow-chart"></div>
    </section>
    <section class="invoice-flow-detail-wrap">
      <h3 class="invoice-flow-detail-title invoice-flow-title">
        <img
          src="@/assets/logo.png"
          style="width: 14px; height: 16px; margin-right: 10px;"
          alt=""
        />
        <span>发票公司流向</span>
      </h3>
      <div ref="" class="invoice-flow-detail invoice-flow-chart"></div>
    </section>
  </div>
</template>

<script>
import china from 'echarts/map/json/china.json';
export default {
  data() {
    return {};
  },
  mounted() {
    this.getMap();
  },
  methods: {
    getMap() {
      // 发送请求
      let res = {
        code: 200,
        msg: null,
        data: {
          money: {},
          line: [
            {
              ghfsbh: '9131A115MA1H8NJG2P',
              xhfnsrsbh: '91130628MA07Q89F79',
              hwjetotal: 840093.52,
              hwsetotal: 134414.96,
              total: 974508.48,
              xhfSF: '河北',
              ghfSF: '山西',
            },
            {
              ghfsbh: '9131A1153326115964',
              xhfnsrsbh: '91130628X01967993M',
              hwjetotal: 1168917.96,
              hwsetotal: 187026.84,
              total: 1355944.8,
              xhfSF: '河北',
              ghfSF: '北京',
            },
            {
              ghfsbh: '9131A115MA1H8NJG2P',
              xhfnsrsbh: '91130628MA08C9A75D',
              hwjetotal: 1981484.5,
              hwsetotal: 317037.5,
              total: 2298522.0,
              xhfSF: '河北',
              ghfSF: '内蒙',
            },
            {
              ghfsbh: '9113A628MAA7R7G44W',
              xhfnsrsbh: '91130628MA07N78X9H',
              hwjetotal: 1993620.6,
              hwsetotal: 318979.4,
              total: 2312600.0,
              xhfSF: '河北',
              ghfSF: '河南',
            },
            {
              ghfsbh: '9131A115MA1H8NJG2P',
              xhfnsrsbh: '91130628MA07W4543W',
              hwjetotal: 4581603.36,
              hwsetotal: 733056.48,
              total: 5314659.84,
              xhfSF: '河北',
              ghfSF: '西藏',
            },
            {
              ghfsbh: '9131A115MA1H8NJG2P',
              xhfnsrsbh: '91130628MA07LCA712',
              hwjetotal: 1825038.6,
              hwsetotal: 292006.2,
              total: 2117044.8,
              xhfSF: '河北',
              ghfSF: '云南',
            },
            {
              ghfsbh: '9113A628336288431F',
              xhfnsrsbh: '9113062871585005X3',
              hwjetotal: 86206.9,
              hwsetotal: 13793.1,
              total: 100000.0,
              xhfSF: '河北',
              ghfSF: '重庆',
            },
            {
              ghfsbh: '9131A115MA1H8NJG2P',
              xhfnsrsbh: '91130628MA07LE5916',
              hwjetotal: 1384584.86,
              hwsetotal: 221533.54,
              total: 1606118.4,
              xhfSF: '河北',
              ghfSF: '四川',
            },
            {
              ghfsbh: '9113A628MAA7R7G44W',
              xhfnsrsbh: '91130628MA07L7PR7W',
              hwjetotal: 26331.86,
              hwsetotal: 4213.06,
              total: 30544.92,
              xhfSF: '河北',
              ghfSF: '辽宁',
            },
            {
              ghfsbh: '9131A115MA1H8NJG2P',
              xhfnsrsbh: '91130628MA07NE5F1U',
              hwjetotal: 3251311.08,
              hwsetotal: 520209.72,
              total: 3771520.8,
              xhfSF: '河北',
              ghfSF: '吉林',
            },
            {
              ghfsbh: '9113A628MAA7XF1XAX',
              xhfnsrsbh: '91130628674675098F',
              hwjetotal: 868103.48,
              hwsetotal: 138896.52,
              total: 1007000.0,
              xhfSF: '河北',
              ghfSF: '黑龙江',
            },
            {
              ghfsbh: '9113A628336288431F',
              xhfnsrsbh: '91130628MA07L7PR7W',
              hwjetotal: 8253.04,
              hwsetotal: 1320.48,
              total: 9573.52,
              xhfSF: '河北',
              ghfSF: '福建',
            },
            {
              ghfsbh: '9113A628MAA7XF1XAX',
              xhfnsrsbh: '91130628MA07L7PR7W',
              hwjetotal: 43948.52,
              hwsetotal: 7031.76,
              total: 50980.28,
              xhfSF: '河北',
              ghfSF: '深圳',
            },
            {
              ghfsbh: '9113A628MAA7R7G44W',
              xhfnsrsbh: '130628L85043861',
              hwjetotal: 1163499.62,
              hwsetotal: 186159.98,
              total: 1349659.6,
              xhfSF: '河北',
              ghfSF: '广州',
            },
            {
              ghfsbh: '9131A115MA1H8NJG2P',
              xhfnsrsbh: '91130628MA07XF1X0X',
              hwjetotal: 4007806.38,
              hwsetotal: 641249.22,
              total: 4649055.6,
              xhfSF: '河北',
              ghfSF: '香港',
            },
            {
              ghfsbh: '9113A628MAA7R7G44W',
              xhfnsrsbh: '4444',
              hwjetotal: 90879.31,
              hwsetotal: 14540.69,
              total: 105420.0,
              xhfSF: '北京',
              ghfSF: '台湾',
            },
            {
              ghfsbh: '9131A1153326115964',
              xhfnsrsbh: '91130628MA07M4JH41',
              hwjetotal: 1523023.52,
              hwsetotal: 243683.68,
              total: 1766707.2,
              xhfSF: '河北',
              ghfSF: '贵州',
            },
            {
              ghfsbh: '9131A1153326115964',
              xhfnsrsbh: '91130628MA07R7G44W',
              hwjetotal: 781586.24,
              hwsetotal: 125053.76,
              total: 906640.0,
              xhfSF: '河北',
              ghfSF: '苏州',
            },
            {
              ghfsbh: '9131A1153326115964',
              xhfnsrsbh: '91130628MA09URRY2B',
              hwjetotal: 1811630.42,
              hwsetotal: 289860.78,
              total: 2101491.2,
              xhfSF: '河北',
              ghfSF: '青岛',
            },
            {
              ghfsbh: '9131A1153326115964',
              xhfnsrsbh: '91130628MA07ME0CXB',
              hwjetotal: 1962097.26,
              hwsetotal: 313935.54,
              total: 2276032.8,
              xhfSF: '河北',
              ghfSF: '乐山',
            },
            {
              ghfsbh: '9113A628MAA7XF1XAX',
              xhfnsrsbh: '91130628MA07NTJP3T',
              hwjetotal: 2719560.3,
              hwsetotal: 435129.7,
              total: 3154690.0,
              xhfSF: '河北',
              ghfSF: '浙江',
            },
            {
              ghfsbh: '9131A115MA1H8NJG2P',
              xhfnsrsbh: '91130628MA07NX623N',
              hwjetotal: 1599022.72,
              hwsetotal: 255843.68,
              total: 1854866.4,
              xhfSF: '河北',
              ghfSF: '山东',
            },
            {
              ghfsbh: '9113A628MAA7XF1XAX',
              xhfnsrsbh: '91130628MA09CH613N',
              hwjetotal: 1776924.12,
              hwsetotal: 284307.88,
              total: 2061232.0,
              xhfSF: '河北',
              ghfSF: '长沙',
            },
            {
              ghfsbh: '9131A1153326115964',
              xhfnsrsbh: '91130628MA08PQBK51',
              hwjetotal: 1188539.2,
              hwsetotal: 190166.24,
              total: 1378705.44,
              xhfSF: '河北',
              ghfSF: '湖南',
            },
            {
              ghfsbh: '9131A1153326115964',
              xhfnsrsbh: '91130628336288431F',
              hwjetotal: 3335895.44,
              hwsetotal: 533743.28,
              total: 3869638.72,
              xhfSF: '河北',
              ghfSF: '上海',
            },
            {
              ghfsbh: '9131A1153326115964',
              xhfnsrsbh: '9113062878980059X4',
              hwjetotal: 5826032.6,
              hwsetotal: 932165.0,
              total: 6758197.6,
              xhfSF: '河北',
              ghfSF: '天津',
            },
          ],
        },
      };
      // 
      
      let myChart = this.$echarts.init(this.$refs.map);
      this.$echarts.registerMap('china', china);
      function randomData() {
        return Math.floor(Math.random() * 15000);
      }
      let mapData = [
        {
          name: '北京',
          value: randomData(),
        },
        {
          name: '天津',
          value: randomData(),
        },
        {
          name: '上海',
          value: randomData(),
        },
        {
          name: '重庆',
          value: randomData(),
        },
        {
          name: '河北',
          value: randomData(),
        },
        {
          name: '河南',
          value: randomData(),
        },
        {
          name: '云南',
          value: randomData(),
        },
        {
          name: '辽宁',
          value: randomData(),
        },
        {
          name: '黑龙江',
          value: randomData(),
        },
        {
          name: '湖南',
          value: randomData(),
        },
        {
          name: '安徽',
          value: randomData(),
        },
        {
          name: '山东',
          value: randomData(),
        },
        {
          name: '新疆',
          value: randomData(),
        },
        {
          name: '江苏',
          value: randomData(),
        },
        {
          name: '浙江',
          value: randomData(),
        },
        {
          name: '江西',
          value: randomData(),
        },
        {
          name: '湖北',
          value: randomData(),
        },
        {
          name: '广西',
          value: randomData(),
        },
        {
          name: '甘肃',
          value: randomData(),
        },
        {
          name: '山西',
          value: randomData(),
        },
        {
          name: '内蒙古',
          value: randomData(),
        },
        {
          name: '陕西',
          value: randomData(),
        },
        {
          name: '吉林',
          value: randomData(),
        },
        {
          name: '福建',
          value: randomData(),
        },
        {
          name: '贵州',
          value: randomData(),
        },
        {
          name: '广东',
          value: randomData(),
        },
        {
          name: '青海',
          value: randomData(),
        },
        {
          name: '西藏',
          value: randomData(),
        },
        {
          name: '四川',
          value: randomData(),
        },
        {
          name: '宁夏',
          value: randomData(),
        },
        {
          name: '海南',
          value: randomData(),
        },
        {
          name: '台湾',
          value: randomData(),
        },
        {
          name: '香港',
          value: randomData(),
        },
        {
          name: '澳门',
          value: randomData(),
        },
        {
          name: '南海诸岛',
          value: randomData(),
        },
      ];
      let mapData2 = [
        {
          name: '北京',
          value: randomData(),
        },
        {
          name: '天津',
          value: randomData(),
        },
        {
          name: '上海',
          value: randomData(),
        },
        {
          name: '重庆',
          value: randomData(),
        },
        {
          name: '河北',
          value: randomData(),
        },
        {
          name: '河南',
          value: randomData(),
        },
        {
          name: '云南',
          value: randomData(),
        },
        {
          name: '辽宁',
          value: randomData(),
        },
        {
          name: '黑龙江',
          value: randomData(),
        },
        {
          name: '湖南',
          value: randomData(),
        },
        {
          name: '安徽',
          value: randomData(),
        },
        {
          name: '山东',
          value: randomData(),
        },
        {
          name: '新疆',
          value: randomData(),
        },
        {
          name: '江苏',
          value: randomData(),
        },
        {
          name: '浙江',
          value: randomData(),
        },
        {
          name: '江西',
          value: randomData(),
        },
        {
          name: '湖北',
          value: randomData(),
        },
        {
          name: '广西',
          value: randomData(),
        },
        {
          name: '甘肃',
          value: randomData(),
        },
        {
          name: '山西',
          value: randomData(),
        },
        {
          name: '内蒙古',
          value: randomData(),
        },
        {
          name: '陕西',
          value: randomData(),
        },
        {
          name: '吉林',
          value: randomData(),
        },
        {
          name: '福建',
          value: randomData(),
        },
        {
          name: '贵州',
          value: randomData(),
        },
        {
          name: '广东',
          value: randomData(),
        },
        {
          name: '青海',
          value: randomData(),
        },
        {
          name: '西藏',
          value: randomData(),
        },
        {
          name: '四川',
          value: randomData(),
        },
        {
          name: '宁夏',
          value: randomData(),
        },
        {
          name: '海南',
          value: randomData(),
        },
        {
          name: '台湾',
          value: randomData(),
        },
        {
          name: '香港',
          value: randomData(),
        },
        {
          name: '澳门',
          value: randomData(),
        },
        {
          name: '南海诸岛',
          value: randomData(),
        },
      ];
      let geoCoordMap = {};
      let mapFeatures = this.$echarts.getMap('china').geoJson.features;
      mapFeatures.forEach(function(v) {
        // 地区名称
        let name = v.properties.name;
        // 地区经纬度
        geoCoordMap[name] = v.properties.cp;
      });
      let convertData = function(data) {
        let res = [];
        for (let i = 0; i < data.length; i++) {
          let geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value),
            });
          }
        }
        return res;
      };
      let lineData = convertData(mapData).map((items) => ({
        coords: [
          [111.005106, 35.034976],
          [items.value[0], items.value[1]],
        ],
      }));
      let lineData2 = convertData(mapData).map((items) => ({
        coords: [
          [111.005106, 35.034976],
          [items.value[0], items.value[1]],
        ],
      }));
      let option = {
        tooltip: {
          triggerOn: 'onmousemove',
        },
        visualMap: {
          type: 'piecewise',
          right: '5%',
          top: '75%',
          min: 0,
          // max: 0,
          splitNumber: 5,
          align: 'left',
          color: ['#E45240', '#9037AA', '#F7DC00', '#7CDCB2', '#00A0E9'],
          pieces: [
            {
              gt: 50,
              lte: 100,
              label: '50-100',
            },
            {
              gt: 100,
              lte: 1000,
              label: '100-1000',
            },
            {
              gt: 1000,
              lte: 5000,
              label: '1000-5000',
            },
            {
              gt: 5000,
              lte: 10000,
              label: '5000-10000',
            },
            {
              gt: 10000,
              lte: 15000,
              label: '10000-15000',
            },
          ],
          textStyle: {
            color: '#aaaaaa',
          },
          itemWidth: 10,
          itemHeight: 10,
        },
        legend: {
          orient: 'horizontal',
          top: 15,
          data: ['前往地区', '发票流向'],
        },
        color: ['#E45240', '#5DDCF0'],
        geo: {
          map: 'china',
          zoom: 0.8,
          label: {
            show: false,
            emphasis: {
              show: false,
            },
          },
          roam: false,
          itemStyle: {
            normal: {
              areaColor: '#3a7fd5',
              borderColor: '#0a53e9', //线
              shadowColor: '#092f8f', //外发光
              shadowBlur: 20,
            },
            emphasis: {
              areaColor: 'inherit', //悬浮区背景
            },
          },
        },
        series: [
          {
            // 热力图
            name: '前往地区',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(mapData),
            symbolSize: function(val) {
              return 4;
            },
            tooltip: {
              formatter: function(param) {
                return (
                  param.data.name +
                  '<br>' +
                  param.seriesName +
                  ':' +
                  param.data.value[2]
                );
              },
            },
          },
          {
            // 热力图
            name: '发票流向',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(mapData2),
            symbolSize: function(val) {
              return 4;
            },
            tooltip: {
              formatter: function(param) {
                return (
                  param.data.name +
                  '<br>' +
                  param.seriesName +
                  ':' +
                  param.data.value[2]
                );
              },
            },
          },
          {
            type: 'lines',
            zlevel: 1,
            effect: {
              show: true,
              period: 10, //箭头指向速度，值越小速度越快
              trailLength: 0, //特效尾迹长度[0,1]值越大，尾迹越长重
              symbol: 'arrow', //箭头图标
              symbolSize: 4, //图标大小
            },
            lineStyle: {
              normal: {
                color: '#46bee9',
                width: 0.7, //线条宽度
                opacity: 0, //尾迹线条透明度
                curveness: 0.2, //尾迹线条曲直度
              },
            },
            data: lineData,
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener('resize', () => myChart.resize());
    },
  },
};
</script>
<style lang="less" scoped>
.invoice-flow-wrap {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #eef4fd;
  padding: 10px 20px;
  .invoice-flow-title {
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #353535;
    margin: 0;
  }
  .invoice-flow-chart {
    margin-top: 10px;
    width: 100%;
    height: 600px;
    background: #fff;
    box-shadow: 0 0 20px 0 rgba(24, 144, 255, 0.1);
    border-radius: 4px;
  }
  .invoice-flow-detail-wrap {
    margin-top: 10px;
  }
}
</style>
