<!--
 * @Author: 勾青琼
 * @Date: 2021-04-20 09:32:59
 * @LastEditTime: 2021-04-23 16:27:56
 * @LastEditors: Please set LastEditors
 * @Description: 发票流向
 * @FilePath: \guidance\src\views\dataAnalysis\autonomyJudge\common\capital\invoiceTrade.vue
-->
<template>
  <div class="invoice-flow-wrap">
    <section class="invoice-flow-map-wrap">
      <h3 class="invoice-flow-map-title invoice-flow-title">
        <!-- src="@/assets/imgs/DivisionImg.png" -->
        <img
          src="../../assets/logo.png"
          style="width: 14px; height: 16px; margin-right: 10px;"
          alt=""
        />
        <span>发票地域流向分布</span>
      </h3>
      <div ref="map" class="invoice-flow-map invoice-flow-chart"></div>
    </section>
    <section class="invoice-flow-detail-wrap">
      <h3 class="invoice-flow-detail-title invoice-flow-title">
        <!-- src="@/assets/imgs/DivisionImg.png" -->
        <img
          src="../../assets/logo.png"
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
      this.$echarts.registerMap('china', china);
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
      // 范围title
      let pieces = [
        {
          gt: 500000,
          lte: 1000000,
          label: '50万-100万',
        },
        {
          gt: 1000000,
          lte: 10000000,
          label: '100万-1000万',
        },
        {
          gt: 10000000,
          lte: 100000000,
          label: '1000万-1亿',
        },
        {
          gt: 100000000,
          lte: 1000000000,
          label: '1亿-10亿',
        },
        {
          gt: 1000000000,
          lte: 2500000000,
          label: '10亿-25亿',
        },
      ];
      // 随机数据
      function randoData() {
        return Math.floor(Math.random() * (2500000000 - 500000 + 1) + 500000);
      }
      //  发送请求
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
              total: randoData(),
              xhfSF: '河北',
              ghfSF: '山西',
            },
            {
              ghfsbh: '9131A1153326115964',
              xhfnsrsbh: '91130628X01967993M',
              hwjetotal: 1168917.96,
              hwsetotal: 187026.84,
              total: randoData(),
              xhfSF: '河北',
              ghfSF: '北京',
            },
            {
              ghfsbh: '9131A115MA1H8NJG2P',
              xhfnsrsbh: '91130628MA08C9A75D',
              hwjetotal: 1981484.5,
              hwsetotal: 317037.5,
              total: randoData(),
              xhfSF: '河北',
              ghfSF: '内蒙古',
            },
            {
              ghfsbh: '9131A115MA1H8NJG2P',
              xhfnsrsbh: '91130628MA08C9A75D',
              hwjetotal: 1981484.5,
              hwsetotal: 317037.5,
              total: randoData(),
              xhfSF: '河北',
              ghfSF: '新疆',
            },
            {
              ghfsbh: '9131A115MA1H8NJG2P',
              xhfnsrsbh: '91130628MA08C9A75D',
              hwjetotal: 1981484.5,
              hwsetotal: 317037.5,
              total: randoData(),
              xhfSF: '河北',
              ghfSF: '青海',
            },
            {
              ghfsbh: '9131A115MA1H8NJG2P',
              xhfnsrsbh: '91130628MA08C9A75D',
              hwjetotal: 1981484.5,
              hwsetotal: 317037.5,
              total: randoData(),
              xhfSF: '河北',
              ghfSF: '广西',
            },
            {
              ghfsbh: '9131A115MA1H8NJG2P',
              xhfnsrsbh: '91130628MA08C9A75D',
              hwjetotal: 1981484.5,
              hwsetotal: 317037.5,
              total: randoData(),
              xhfSF: '河北',
              ghfSF: '海南',
            },
            {
              ghfsbh: '9131A115MA1H8NJG2P',
              xhfnsrsbh: '91130628MA08C9A75D',
              hwjetotal: 1981484.5,
              hwsetotal: 317037.5,
              total: randoData(),
              xhfSF: '河北',
              ghfSF: '甘肃',
            },
            {
              ghfsbh: '9113A628MAA7R7G44W',
              xhfnsrsbh: '91130628MA07N78X9H',
              hwjetotal: 1993620.6,
              hwsetotal: 318979.4,
              total: randoData(),
              xhfSF: '河北',
              ghfSF: '河南',
            },
            {
              ghfsbh: '9131A115MA1H8NJG2P',
              xhfnsrsbh: '91130628MA07W4543W',
              hwjetotal: 4581603.36,
              hwsetotal: 733056.48,
              total: randoData(),
              xhfSF: '河北',
              ghfSF: '西藏',
            },
            {
              ghfsbh: '9131A115MA1H8NJG2P',
              xhfnsrsbh: '91130628MA07LCA712',
              hwjetotal: 1825038.6,
              hwsetotal: 292006.2,
              total: randoData(),
              xhfSF: '河北',
              ghfSF: '云南',
            },
            {
              ghfsbh: '9113A628336288431F',
              xhfnsrsbh: '9113062871585005X3',
              hwjetotal: 86206.9,
              hwsetotal: 13793.1,
              total: randoData(),
              xhfSF: '河北',
              ghfSF: '重庆',
            },
            {
              ghfsbh: '9131A115MA1H8NJG2P',
              xhfnsrsbh: '91130628MA07LE5916',
              hwjetotal: 1384584.86,
              hwsetotal: 221533.54,
              total: randoData(),
              xhfSF: '河北',
              ghfSF: '四川',
            },
            {
              ghfsbh: '9113A628MAA7R7G44W',
              xhfnsrsbh: '91130628MA07L7PR7W',
              hwjetotal: 26331.86,
              hwsetotal: 4213.06,
              total: randoData(),
              xhfSF: '河北',
              ghfSF: '辽宁',
            },
            {
              ghfsbh: '9131A115MA1H8NJG2P',
              xhfnsrsbh: '91130628MA07NE5F1U',
              hwjetotal: 3251311.08,
              hwsetotal: 520209.72,
              total: randoData(),
              xhfSF: '河北',
              ghfSF: '吉林',
            },
            {
              ghfsbh: '9113A628MAA7XF1XAX',
              xhfnsrsbh: '91130628674675098F',
              hwjetotal: 868103.48,
              hwsetotal: 138896.52,
              total: randoData(),
              xhfSF: '河北',
              ghfSF: '黑龙江',
            },
            {
              ghfsbh: '9113A628336288431F',
              xhfnsrsbh: '91130628MA07L7PR7W',
              hwjetotal: 8253.04,
              hwsetotal: 1320.48,
              total: randoData(),
              xhfSF: '河北',
              ghfSF: '福建',
            },
            {
              ghfsbh: '9113A628MAA7XF1XAX',
              xhfnsrsbh: '91130628MA07L7PR7W',
              hwjetotal: 43948.52,
              hwsetotal: 7031.76,
              total: randoData(),
              xhfSF: '河北',
              ghfSF: '深圳',
            },
            {
              ghfsbh: '9113A628MAA7R7G44W',
              xhfnsrsbh: '130628L85043861',
              hwjetotal: 1163499.62,
              hwsetotal: 186159.98,
              total: randoData(),
              xhfSF: '河北',
              ghfSF: '广州',
            },
            {
              ghfsbh: '9131A115MA1H8NJG2P',
              xhfnsrsbh: '91130628MA07XF1X0X',
              hwjetotal: 4007806.38,
              hwsetotal: 641249.22,
              total: randoData(),
              xhfSF: '河北',
              ghfSF: '香港',
            },
            {
              ghfsbh: '9113A628MAA7R7G44W',
              xhfnsrsbh: '4444',
              hwjetotal: 90879.31,
              hwsetotal: 14540.69,
              total: randoData(),
              xhfSF: '北京',
              ghfSF: '台湾',
            },
            {
              ghfsbh: '9131A1153326115964',
              xhfnsrsbh: '91130628MA07M4JH41',
              hwjetotal: 1523023.52,
              hwsetotal: 243683.68,
              total: randoData(),
              xhfSF: '河北',
              ghfSF: '贵州',
            },
            {
              ghfsbh: '9131A1153326115964',
              xhfnsrsbh: '91130628MA07R7G44W',
              hwjetotal: 781586.24,
              hwsetotal: 125053.76,
              total: randoData(),
              xhfSF: '河北',
              ghfSF: '苏州',
            },
            {
              ghfsbh: '9131A1153326115964',
              xhfnsrsbh: '91130628MA09URRY2B',
              hwjetotal: 1811630.42,
              hwsetotal: 289860.78,
              total: randoData(),
              xhfSF: '河北',
              ghfSF: '青岛',
            },
            {
              ghfsbh: '9131A1153326115964',
              xhfnsrsbh: '91130628MA07ME0CXB',
              hwjetotal: 1962097.26,
              hwsetotal: 313935.54,
              total: randoData(),
              xhfSF: '河北',
              ghfSF: '乐山',
            },
            {
              ghfsbh: '9113A628MAA7XF1XAX',
              xhfnsrsbh: '91130628MA07NTJP3T',
              hwjetotal: 2719560.3,
              hwsetotal: 435129.7,
              total: randoData(),
              xhfSF: '河北',
              ghfSF: '浙江',
            },
            {
              ghfsbh: '9131A115MA1H8NJG2P',
              xhfnsrsbh: '91130628MA07NX623N',
              hwjetotal: 1599022.72,
              hwsetotal: 255843.68,
              total: randoData(),
              xhfSF: '河北',
              ghfSF: '山东',
            },
            {
              ghfsbh: '9113A628MAA7XF1XAX',
              xhfnsrsbh: '91130628MA09CH613N',
              hwjetotal: 1776924.12,
              hwsetotal: 284307.88,
              total: randoData(),
              xhfSF: '河北',
              ghfSF: '长沙',
            },
            {
              ghfsbh: '9131A1153326115964',
              xhfnsrsbh: '91130628MA08PQBK51',
              hwjetotal: 1188539.2,
              hwsetotal: 190166.24,
              total: randoData(),
              xhfSF: '河北',
              ghfSF: '湖南',
            },
            {
              ghfsbh: '9131A1153326115964',
              xhfnsrsbh: '91130628336288431F',
              hwjetotal: 3335895.44,
              hwsetotal: 533743.28,
              total: randoData(),
              xhfSF: '河北',
              ghfSF: '上海',
            },
            {
              ghfsbh: '9131A1153326115964',
              xhfnsrsbh: '9113062878980059X4',
              hwjetotal: 5826032.6,
              hwsetotal: 932165.0,
              total: randoData(),
              xhfSF: '河北',
              ghfSF: '天津',
            },
          ],
        },
      };

      //  始发点数据坐标
      let start = res.data.line.map((items) => ({
        name: items.xhfSF,
      }));
      start = convertData(start);
      //  到达点数据
      let endData = res.data.line.map((items) => ({
        name: items.ghfSF,
        value: items.total,
      }));
      //  起点坐标和终点坐标
      let lineData = convertData(endData).map((items, index) => ({
        coords: [
          //  起点坐标
          [start[index].value[0], start[index].value[1]],
          //   终点坐标
          [items.value[0], items.value[1]],
        ],
        // 根据不用数据不用不同颜色
        color:
          (items.value[2] >= pieces[0].gt &&
            items.value[2] <= pieces[0].lte &&
            '#00A0E9') ||
          (items.value[2] >= pieces[1].gt &&
            items.value[2] <= pieces[1].lte &&
            '#7CDCB2') ||
          (items.value[2] >= pieces[2].gt &&
            items.value[2] <= pieces[2].lte &&
            '#F7DC00') ||
          (items.value[2] >= pieces[3].gt &&
            items.value[2] <= pieces[3].lte &&
            '#9037AA') ||
          (items.value[2] >= pieces[4].gt &&
            items.value[2] <= pieces[4].lte &&
            '#E45240'),
      }));
      let myChart = this.$echarts.init(this.$refs.map);
      let option = {
        tooltip: {
          triggerOn: 'item',
          formatter: function(params) {
            let data;
            if (params.componentSubType === 'effectScatter') {
              data = `${params.data.name}</br>数量：${params.data.value[2]}`;
            } else {
              data = `发票流向`;
            }
            return data;
          },
        },
        visualMap: {
          type: 'piecewise',
          right: '5%',
          top: '75%',
          min: 0,
          // max: 0,
          splitNumber: 5,
          align: 'left',
          //  图例
          color: ['#E45240', '#9037AA', '#F7DC00', '#7CDCB2', '#00A0E9'],
          pieces,
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
              areaColor: 'rgba(57, 111, 255)',
              shadowBlur: 1,
              shadowColor: 'rgba(18, 32, 70,0.4)',
              borderColor: 'rgba(18, 32, 70)',
            },
            emphasis: {
              areaColor: 'rgba(23, 240, 204)',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              borderWidth: 0,
            },
          },
        },
        series: [
          {
            // 散点图
            name: '前往地区',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            rippleEffect: {
              period: 15,
              scale: 4,
              brushType: 'fill',
            },
            data: convertData(endData),
            symbolSize: function(val) {
              return val[2] / 150000000 < 5 ? 5 : val[2] / 150000000;
            },
          },
        ],
      };
      // serices里面添加飞线图
      lineData.forEach((items, index) => {
        option.series.push({
          // 飞线图
          name: '发票流向',
          zlevel: 2,
          type: 'lines',
          effect: {
            show: true,
            period: 4, //箭头指向速度，值越小速度越快
            trailLength: 0.4, //特效尾迹长度[0,1]值越大，尾迹越长重
            symbol: 'arrow', //箭头图标
            symbolSize: 7, //图标大小
          },
          lineStyle: {
            normal: {
              color: items.color,
              opacity: 0.1, //尾迹线条透明度
              curveness: 0.3, //尾迹线条曲直度
            },
          },
          data: [items.coords],
        });
      });
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
