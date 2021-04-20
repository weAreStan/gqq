<!--
 * @Author: 477
 * @Date: 2021-03-12 11:47:52
 * @LastEditTime: 2021-03-21 16:40:45
 * @LastEditors: Please set LastEditors
 * @Description: 余额变动
 * @FilePath: \guidance\src\views\dataAnalysis\autonomyJudge\common\capitalPivot.vue
-->
<template>
  <div class="capital-balance">
    <div
      class="balance_change"
      style="width: 100%; height: 380px; background: #fff;margin-top:20px"
      ref="balance_change"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'capital-balance',
  data() {
    return {};
  },
  mounted() {
    this.get_balance_change();
  },
  methods: {
    filterData(res) {
      let outmoney = [];
      let inmoney = [];
      for (let key in res.data.monthtMap) {
        if (
          res.data.monthtMap[key].outmoney ||
          res.data.monthtMap[key].inmoney !== undefined
        ) {
          outmoney.push(res.data.monthtMap[key].outmoney);
          inmoney.push(res.data.monthtMap[key].inmoney);
        }
      }
      return {
        outmoney,
        inmoney,
      };
    },
    get_balance_change() {
      // 发送请求
      let res = {
        code: 200,
        msg: null,
        data: {
          balance: '0.00',
          monthtMap: {
            '201301': {
              outtotal: 2,
              outmoney: 1000000.0,
              intotal: 1,
              inmoney: 1000000.0,
            },
            '201302': {
              outtotal: 2,
              outmoney: 2200000.0,
              intotal: 2,
              inmoney: 2200000.0,
            },
            '201303': {
              outtotal: 1,
              outmoney: 16800.0,
              intotal: 2,
              inmoney: 17025.65,
            },
            '201304': {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            '201305': {
              outtotal: 6,
              outmoney: 80000.0,
              intotal: 3,
              inmoney: 130000.0,
            },
            '201306': {
              outtotal: 6,
              outmoney: 115800.0,
              intotal: 2,
              inmoney: 65642.0,
            },
            '201307': {
              outtotal: 1,
              outmoney: 725000.0,
              intotal: 2,
              inmoney: 725000.0,
            },
            '201308': {
              outtotal: 1,
              outmoney: 74.87,
              intotal: 0,
              inmoney: 0,
            },
            '201309': {
              outtotal: 0,
              outmoney: 0,
              intotal: 1,
              inmoney: 0.05,
            },
            '201310': {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            '201311': {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            '201312': {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            '201401': {
              outtotal: 3,
              outmoney: 2000010.05,
              intotal: 2,
              inmoney: 2000010.0,
            },
            '201402': {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            '201403': {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            '201404': {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            '201405': {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            '201406': {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            '201407': {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            '201408': {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            '201409': {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            '201410': {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            '201411': {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            '201412': {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            '201501': {
              outtotal: 4,
              outmoney: 2117066.7,
              intotal: 4,
              inmoney: 2117066.7,
            },
            '201502': {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            '201503': {
              outtotal: 0,
              outmoney: 0,
              intotal: 1,
              inmoney: 1.17,
            },
            '201504': {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            '201505': {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            '201506': {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            '201507': {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            '201508': {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            '201509': {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            '201510': {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            '201511': {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            '201512': {
              outtotal: 0,
              outmoney: 0,
              intotal: 5,
              inmoney: 6000.54,
            },
            '201601': {
              outtotal: 14,
              outmoney: 5543.8,
              intotal: 0,
              inmoney: 0,
            },
            '201602': {
              outtotal: 2,
              outmoney: 360.0,
              intotal: 2,
              inmoney: 5400.0,
            },
            '201603': {
              outtotal: 4,
              outmoney: 310.0,
              intotal: 2,
              inmoney: 5.18,
            },
            '201604': {
              outtotal: 13,
              outmoney: 1714.8,
              intotal: 0,
              inmoney: 0,
            },
            '201605': {
              outtotal: 20,
              outmoney: 3014.6,
              intotal: 0,
              inmoney: 0,
            },
            '201606': {
              outtotal: 1,
              outmoney: 200000.0,
              intotal: 3,
              inmoney: 200002.28,
            },
            '201607': {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            '201608': {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            '201609': {
              outtotal: 5,
              outmoney: 674844.65,
              intotal: 5,
              inmoney: 674843.5,
            },
            '201610': {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            '201611': {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            '201612': {
              outtotal: 2,
              outmoney: 400000.0,
              intotal: 5,
              inmoney: 400006.06,
            },
            '201701': {
              outtotal: 1,
              outmoney: 1600000.0,
              intotal: 1,
              inmoney: 1600000.0,
            },
            '201702': {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            '201703': {
              outtotal: 0,
              outmoney: 0,
              intotal: 4,
              inmoney: 0.04,
            },
            '201704': {
              outtotal: 1,
              outmoney: 43200.0,
              intotal: 1,
              inmoney: 43200.0,
            },
            '201705': {
              outtotal: 2,
              outmoney: 530000.0,
              intotal: 4,
              inmoney: 532000.0,
            },
            '201706': {
              outtotal: 2,
              outmoney: 1096656.04,
              intotal: 5,
              inmoney: 1096679.53,
            },
            '201707': {
              outtotal: 2,
              outmoney: 1260028.0,
              intotal: 2,
              inmoney: 1260000.0,
            },
            '201708': {
              outtotal: 1,
              outmoney: 373289.39,
              intotal: 2,
              inmoney: 373306.41,
            },
            '201709': {
              outtotal: 0,
              outmoney: 0,
              intotal: 3,
              inmoney: 2.19,
            },
            '201710': {
              outtotal: 0,
              outmoney: 0,
              intotal: 1,
              inmoney: 6667.0,
            },
            '201711': {
              outtotal: 1,
              outmoney: 16684.44,
              intotal: 2,
              inmoney: 10001.31,
            },
            '201712': {
              outtotal: 0,
              outmoney: 0,
              intotal: 3,
              inmoney: 2.28,
            },
            '201801': {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            '201802': {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            '201803': {
              outtotal: 0,
              outmoney: 0,
              intotal: 1,
              inmoney: 1.06,
            },
            '201804': {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            '201805': {
              outtotal: 2,
              outmoney: 2025.44,
              intotal: 0,
              inmoney: 0,
            },
            '201806': {
              outtotal: 19,
              outmoney: 1120838.11,
              intotal: 14,
              inmoney: 1134967.59,
            },
            '201807': {
              outtotal: 55,
              outmoney: 20362608.0,
              intotal: 48,
              inmoney: 20348554.04,
            },
            '201808': {
              outtotal: 138,
              outmoney: 6594881.78,
              intotal: 125,
              inmoney: 6900682.49,
            },
            '201809': {
              outtotal: 51,
              outmoney: 11631532.27,
              intotal: 31,
              inmoney: 11625989.28,
            },
            '201810': {
              outtotal: 26,
              outmoney: 1314324.0,
              intotal: 12,
              inmoney: 1505786.0,
            },
            '201811': {
              outtotal: 41,
              outmoney: 5562273.59,
              intotal: 23,
              inmoney: 5406939.9,
            },
            '201812': {
              outtotal: 15,
              outmoney: 503430.61,
              intotal: 15,
              inmoney: 467048.36,
            },
            '201901': {
              outtotal: 13,
              outmoney: 2057333.36,
              intotal: 10,
              inmoney: 2057333.17,
            },
            '201902': {
              outtotal: 13,
              outmoney: 1265768.4,
              intotal: 10,
              inmoney: 1266857.8,
            },
            '201903': {
              outtotal: 3,
              outmoney: 219501.17,
              intotal: 5,
              inmoney: 219000.63,
            },
            '201904': {
              outtotal: 2,
              outmoney: 30816.67,
              intotal: 3,
              inmoney: 30300.29,
            },
            '201905': {
              outtotal: 9,
              outmoney: 2004523.33,
              intotal: 7,
              inmoney: 2005248.13,
            },
            '201906': {
              outtotal: 7,
              outmoney: 2681327.21,
              intotal: 8,
              inmoney: 2679850.82,
            },
            '201907': {
              outtotal: 15,
              outmoney: 620732.77,
              intotal: 12,
              inmoney: 621006.03,
            },
            '201908': {
              outtotal: 10,
              outmoney: 5313231.67,
              intotal: 5,
              inmoney: 5313000.0,
            },
            '201909': {
              outtotal: 8,
              outmoney: 5989966.67,
              intotal: 5,
              inmoney: 5990000.07,
            },
            '201910': {
              outtotal: 3,
              outmoney: 2029000.0,
              intotal: 3,
              inmoney: 2029000.28,
            },
            '201911': {
              outtotal: 6,
              outmoney: 4030933.33,
              intotal: 4,
              inmoney: 4030837.25,
            },
            '201912': {
              outtotal: 3,
              outmoney: 44000.31,
              intotal: 4,
              inmoney: 44000.32,
            },
            '202001': {
              outtotal: 1,
              outmoney: 29966.67,
              intotal: 1,
              inmoney: 29966.67,
            },
            '202002': {
              outtotal: 4,
              outmoney: 2229966.67,
              intotal: 4,
              inmoney: 2229966.67,
            },
            '202003': {
              outtotal: 4,
              outmoney: 1778033.33,
              intotal: 5,
              inmoney: 1778033.38,
            },
            '202004': {
              outtotal: 1,
              outmoney: 29966.67,
              intotal: 1,
              inmoney: 29966.67,
            },
            '202005': {
              outtotal: 4,
              outmoney: 4029966.67,
              intotal: 3,
              inmoney: 4029966.67,
            },
            '202006': {
              outtotal: 1,
              outmoney: 29966.67,
              intotal: 2,
              inmoney: 29966.72,
            },
            '202007': {
              outtotal: 10,
              outmoney: 1329001.15,
              intotal: 8,
              inmoney: 1329001.15,
            },
            '202008': {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            '202009': {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            '202010': {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            '202011': {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            '202012': {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            X: [
              201301,
              201302,
              201303,
              201304,
              201305,
              201306,
              201307,
              201308,
              201309,
              201310,
              201311,
              201312,
              201401,
              201402,
              201403,
              201404,
              201405,
              201406,
              201407,
              201408,
              201409,
              201410,
              201411,
              201412,
              201501,
              201502,
              201503,
              201504,
              201505,
              201506,
              201507,
              201508,
              201509,
              201510,
              201511,
              201512,
              201601,
              201602,
              201603,
              201604,
              201605,
              201606,
              201607,
              201608,
              201609,
              201610,
              201611,
              201612,
              201701,
              201702,
              201703,
              201704,
              201705,
              201706,
              201707,
              201708,
              201709,
              201710,
              201711,
              201712,
              201801,
              201802,
              201803,
              201804,
              201805,
              201806,
              201807,
              201808,
              201809,
              201810,
              201811,
              201812,
              201901,
              201902,
              201903,
              201904,
              201905,
              201906,
              201907,
              201908,
              201909,
              201910,
              201911,
              201912,
              202001,
              202002,
              202003,
              202004,
              202005,
              202006,
              202007,
              202008,
              202009,
              202010,
              202011,
              202012,
            ],
          },
        },
      };
      // 数据
      let monthMapData = this.filterData(res);
      // 时间
      let monthDate = res.data.monthtMap.X.map(
        (items) =>
          items.toString().slice(0, 4) + '-' + items.toString().slice(4)
      );
      /////////////// 缺少已知金额字段
      let knownMoney = '1,000.00'
      let myChart = this.$echarts.init(this.$refs.balance_change);
      let option;
      option = {
        //标题
        title: {
          show: true, //显示策略，默认值true,可选为：true（显示） | false（隐藏）
          text: '已知金额    ¥' + knownMoney, //主标题文本，'\n'指定换行
          x: '1%', //水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
          y: '2%', //垂直安放位置，默认为top，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
          textStyle: {
            //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
            fontSize: 12,
            color: '#595959',
          },
          zlevel: 0, //一级层叠控制。默认0,每一个不同的zlevel将产生一个独立的canvas，相同zlevel的组件或图标将在同一个canvas上渲染。zlevel越高越靠顶层，canvas对象增多会消耗更多的内存和性能，并不建议设置过多的zlevel，大部分情况可以通过二级层叠控制z实现层叠控制。
          z: 6, //二级层叠控制，默认6,同一个canvas（相同zlevel）上z越高约靠顶层。
        },
        grid: {
          left: '6%',
          width: '90%',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999',
            },
          },
        },
        // toolbox: {
        //   // echarts中的工具栏 内置导出图片 数据视图 动态类型切换 数据区域缩放 重置五个工具
        //   feature: {
        //     dataView: { show: true, readOnly: false }, // 数据视图工具
        //     magicType: { show: true, type: ['line', 'bar'] }, // 动态类型切换
        //     restore: { show: true },
        //     saveAsImage: { show: true },
        //     dataZoom: { show: true }, // 数据区域缩放
        //   },
        // },
        legend: {
          itemWidth: 20,
          itemHeight: 10,
          itemGap: 10,
          data: [
            {
              name: '进账金额',
              icon: 'pin',
            },
            {
              name: '出账金额',
              icon: 'pin',
            },
          ],
          right: '7%',
          top: '2%',
          textStyle: {
            fontSize: 12,
            color: '#9EA5BD',
          },
        },
        xAxis: [
          {
            type: 'category',
            data: monthDate,
            axisPointer: {
              type: 'shadow',
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: '万元                       ',
            min: 0,
            // max: 400000,
            // interval: 100000,
            nameLocation: 'end',
            axisLabel: {
              formatter: '{value}',
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
          },
          // {
          //   type: 'value',
          //   name: '次数',
          //   min: 0,
          //   // max: 60,
          //   // interval: 15,
          //   axisLabel: {
          //     formatter: '{value}',
          //   },
          //   axisLine: {
          //     show: false,
          //   },
          //   axisTick: {
          //     show: false,
          //   },
          // },
        ],
        dataZoom: {
          show: true,
          realtime: true,
          height: 20,
          start: 0,
          end: 100,
        },
        series: [
          {
            name: '进账金额',
            type: 'bar',
            barWidth: '8px',
            data: monthMapData.inmoney,
            itemStyle: {
              color: '#4DCCBE',
            },
            barBorderRadius: ' 8px 8px 0px 0px',
          },
          {
            name: '出账金额',
            type: 'bar',
            barWidth: '8px',
            data: monthMapData.outmoney,
            itemStyle: {
              color: ' #F6AA3C',
            },
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener('resize', function() {
        myChart.resize();
      });
    },
  },
};
</script>
<style lang="less" scoped></style>
