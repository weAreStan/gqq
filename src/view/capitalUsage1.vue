<!--
 * @Author: 477
 * @Date: 2021-03-12 11:47:52
 * @LastEditTime: 2021-03-22 18:14:03
 * @LastEditors: Please set LastEditors
 * @Description: 资金用途
 * @FilePath: \guidance\src\views\dataAnalysis\autonomyJudge\common\capitalPivot.vue
-->
<template>
  <div class="capital-features">
    <div class="purpose_capital" ref="purpose_circular"></div>
    <ul class="capital-features-deal-num">
      <li
        v-for="(index, items) in 6"
        :key="index"
        @click="dealNumTable(items)"
        class="capital-features-deal-num-items"
      >
        20笔
      </li>
    </ul>
    <!-- 弹窗 -->
    <div class="captail_modal">
      <a-modal
        v-model="visible"
        title="交易记录-食品酒水"
        @ok="handleOk"
        :width="'800px'"
        :bodyStyle="{ height: '500px' }"
      >
        <!-- 表格 -->
        <a-table
          class="suspicion_case"
          :columns="columns_capital"
          :data-source="data_capital"
          :pagination="false"
          :scroll="{ y: 400 }"
        >
          <span
            slot="case_supi"
            style="color: #1890ff; cursor: pointer"
            slot-scope="text"
            @click="to_case_detail"
          >
            {{ text }}</span
          >
        </a-table>
      </a-modal>
    </div>
  </div>
</template>

<script>
export default {
  name: 'capital-features',
  data() {
    return {
      visible: false,
      columns_capital: [
        {
          title: '交易卡号',
          dataIndex: 'number',
          className: 'title-class',
          key: 'number',
        },
        {
          title: '交易户名',
          dataIndex: 'name',
          className: 'title-class',
          key: 'name',
        },
        {
          title: '交易时间',
          dataIndex: 'time',
          className: 'title-class',
          key: 'time',
        },
        {
          title: '交易金额',
          dataIndex: 'quota',
          className: 'title-class',
          key: 'quota',
        },
        {
          title: '对手卡号',
          dataIndex: 'opponentNum',
          className: 'title-class',
          key: 'opponentNum',
        },
        {
          title: '对手户名',
          dataIndex: 'opponentName',
          className: 'title-class',
          key: 'opponentName',
        },
      ],
      data_capital: [
        {
          key: '1',
          number: '145897756258',
          name: '蔡*姬',
          time: '2015-10-16 18：18：18',
          quota: '12888.88',
          opponentNum: '125698456785',
          opponentName: '杨*环',
        },
        {
          key: '2',
          number: '145897756258',
          name: '蔡*姬',
          time: '2015-10-16 18：18：18',
          quota: '12888.88',
          opponentNum: '125698456785',
          opponentName: '杨*环',
        },
        {
          key: '3',
          number: '145897756258',
          name: '蔡*姬',
          time: '2015-10-16 18：18：18',
          quota: '12888.88',
          opponentNum: '125698456785',
          opponentName: '杨*环',
        },
        {
          key: '4',
          number: '145897756258',
          name: '蔡*姬',
          time: '2015-10-16 18：18：18',
          quota: '12888.88',
          opponentNum: '125698456785',
          opponentName: '杨*环',
        },
        {
          key: '5',
          number: '145897756258',
          name: '蔡*姬',
          time: '2015-10-16 18：18：18',
          quota: '12888.88',
          opponentNum: '125698456785',
          opponentName: '杨*环',
        },
      ],
    };
  },
  mounted() {
    this.getPurpose();
  },
  methods: {
    // 随机色
    randomColor(length) {
      let arr = [];
      for (let i = 0; i < length - 1; i++) {
        let color =
          '#' +
          Math.random()
            .toString(16)
            .substr(-6);
        arr[arr.length] = color;
      }
      return arr;
    },
    getPurpose() {
      // 发送请求
      let res = {
        code: 200,
        msg: null,
        data: {
          totalMoney: 194892447.19,
          list: [
            {
              type: '汇款',
              total: 156,
              money: 38232715.13,
              percent: 0.156,
            },
            {
              type: '结息',
              total: 46,
              money: 324.42,
              percent: 0.046,
            },
            {
              type: '调账',
              total: 1,
              money: -2730.0,
              percent: 0.001,
            },
            {
              type: '汇兑',
              total: 308,
              money: 14090937.13,
              percent: 0.308,
            },
            {
              type: '转账支取',
              total: 215,
              money: 86233265.88,
              percent: 0.215,
            },
            {
              type: '转账存入',
              total: 103,
              money: 52744417.85,
              percent: 0.103,
            },
            {
              type: '工资/奖金',
              total: 2,
              money: 6000.0,
              percent: 0.002,
            },
            {
              type: 'ATM取款',
              total: 2,
              money: 600.0,
              percent: 0.002,
            },
            {
              type: 'ATM存款',
              total: 2,
              money: 5400.0,
              percent: 0.002,
            },
            {
              type: '网银转账',
              total: 7,
              money: 2541944.35,
              percent: 0.007,
            },
            {
              type: '现场消费',
              total: 27,
              money: 2343.2,
              percent: 0.027,
            },
            {
              type: '现金支取',
              total: 11,
              money: 964800.0,
              percent: 0.011,
            },
            {
              type: '自定义',
              total: 1,
              money: 50000.0,
              percent: 0.001,
            },
            {
              type: '他行ATM取现',
              total: 26,
              money: 21000.0,
              percent: 0.026,
            },
            {
              type: '异地他行ATM取现',
              total: 2,
              money: 1000.0,
              percent: 0.002,
            },
            {
              type: '自动理财批量结息入账',
              total: 91,
              money: 429.23,
              percent: 0.091,
            },
          ],
        },
      };
      let totalMoney = res.data.totalMoney; //总金额
      // 颜色
      let color = this.randomColor(res.data.list.length);
      // 数据
      let pieData = res.data.list.map((items) => ({
        name: items.type,
        value: items.money,
      }));
      let myChart = this.$echarts.init(this.$refs.purpose_circular);
      let option;

      option = {
        backgroundColor: '#fff',
        color,
        title: {
          itemGap: 10,
          text: '总金额',
          subtext: '￥' + totalMoney,
          left: '50%',
          top: '44%',
          textAlign: 'center',
          textStyle: {
            fontWeight: '400',
            fontSize: 18,
            color: '#999',
          },
          subtextStyle: {
            fontFamily: 'Arial',
            fontWeight: '400',
            fontSize: 40,
            color: '#111',
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ',
          backgroundColor: 'rgba(0,0,0,0.6)',
          borderColor: 'rgba(0,0,0,0.6)',
          padding: 15,
          // left: '70%',
          textStyle: {
            color: '#fff',
            fontSize: 14,
            fontWeight: '300',
          },
        },
        legend: {
          itemGap: 40,
          icon: 'circle',
          type: 'scroll',
          orient: 'vertical',
          right: '15%',
          top: 'center',
          textStyle: {
            color: '#77899c',
            rich: {
              a: {
                color: '#999',
                width: 70,
              },
              b: {
                color: '#999',
                width: 40,
                align: 'right',
              },
              c: {
                color: '#333',
                width: 60,
                align: 'right',
              },
            },
          },
          formatter: function(name) {
            let target;
            for (let i = 0; i < pieData.length; i++) {
              if (pieData[i].name == name) {
                target = pieData[i].value;
              }
            }
            return `{a|${name}}{b|${((target / totalMoney) * 100).toFixed(2) +
              '%'}}{c|${target} }`;
          },
        },
        series: [
          {
            name: '资金用途',
            itemStyle: {
              borderWidth: 2, //设置border的宽度有多大
              borderColor: '#fff',
            },
            center: ['50%', '50%'],
            type: 'pie',
            radius: ['55%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                formatter: '',
                show: true,
                fontSize: '40',
                fontWeight: 'bold',
              },
            },
            data: pieData,
          },
        ],
      };

      myChart.setOption(option);
      window.addEventListener('resize', function() {
        myChart.resize();
      });
      myChart.on('legendselectchanged', function(params) {
        console.log(params);
      });
    },
    //  点击笔数弹窗
    dealNumTable(item) {
      this.visible = true;
    },
    handleOk(e) {
      this.visible = false;
    },
  },
};
</script>
<style lang="less" scoped>
.capital-features {
  position: relative;
  .capital-features-deal-num {
    display: flex;
    z-index: 22;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    top: 25.8%;
    right: 12%;
    height: 288px;

    .capital-features-deal-num-items {
      cursor: pointer;
      font-family: PingFangSC-Medium;
      font-size: 12px;
      color: #1890ff;
    }
  }
  .purpose_capital {
    width: 100%;
    height: 600px;
    background: #ffffff;
    box-shadow: 0 0 20px 0 rgba(24, 144, 255, 0.1);
    border-radius: 4px;
  }
}
</style>
