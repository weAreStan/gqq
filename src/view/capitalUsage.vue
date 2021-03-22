<!--
 * @Author: 477
 * @Date: 2021-03-12 11:47:52
 * @LastEditTime: 2021-03-19 15:58:15
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
        title="Basic Modal"
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
        {
          key: '5',
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
        {
          key: '5',
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
        {
          key: '5',
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
        {
          key: '5',
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
    getPurpose() {
      let myChart = this.$echarts.init(this.$refs.purpose_circular);
      let option;
      let politicsFenBu_data = [
        {
          value: 1796,
          name: '食品酒水',
          // num: '20笔',
        },
        {
          value: 675,
          name: '行车交通',
          // num: '20笔',
        },
        {
          value: 301,
          name: '医疗保健',
          // num: '20笔',
        },
        {
          value: 147,
          name: '工作生活',
          // num: '20笔',
        },
        {
          value: 234,
          name: '居家物业',
          // num: '20笔',
        },
        {
          value: 213,
          name: '杂项',
          // num: '20笔',
        },
      ];
      let politicsFenBu_total = 0; //总金额
      politicsFenBu_data.forEach((item) => (politicsFenBu_total += item.value));
      option = {
        backgroundColor: '#fff',
        color: [
          '#3BA0FF',
          '#4DCC73',
          '#FAD338',
          '#F04964',
          '#9760E4',
          '#37CBCB',
        ],
        title: {
          itemGap: 10,
          text: '总金额',
          subtext: '￥' + politicsFenBu_total,
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
          formatter: '{a} <br/>{b} : {c} 人',
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
              // d: {
              //   color: '#1890FF',
              // },
            },
          },
          formatter: function(name) {
            let target;
            // let num;
            for (let i = 0; i < politicsFenBu_data.length; i++) {
              if (politicsFenBu_data[i].name == name) {
                target = politicsFenBu_data[i].value;
                // num = politicsFenBu_data[i].num;
              }
            }
            return `{a|${name}}{b|${(
              (target / politicsFenBu_total) *
              100
            ).toFixed(2) + '%'}}{c|${target} }`;
          },
        },
        series: [
          {
            itemStyle: {
              borderWidth: 2, //设置border的宽度有多大
              borderColor: '#fff',
            },
            center: ['50%', '50%'],
            // name: '政治面貌',
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
            data: politicsFenBu_data,
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
    // 点击笔数弹窗
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
