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
        v-for="items in detailList"
        :key="items.type"
        @click="dealNumTable(items)"
        class="capital-features-deal-num-items"
      >
        {{ items.total }}
      </li>
    </ul>
    <!-- 弹窗 -->
    <div class="captail_modal">
      <a-modal
        v-model="visible"
        :title="type"
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
      type: '',
      detailList: [],
      visible: false,
      columns_capital: [
        {
          title: '交易卡号',
          dataIndex: 'jykh',
          className: 'title-class',
          key: 'jykh',
        },
        {
          title: '交易户名',
          dataIndex: 'jyhm',
          className: 'title-class',
          key: 'jyhm',
        },
        {
          title: '交易时间',
          dataIndex: 'jyrq',
          className: 'title-class',
          key: 'jyrq',
        },
        {
          title: '交易金额',
          dataIndex: 'jyje',
          className: 'title-class',
          key: 'jyje',
        },
        {
          title: '对手卡号',
          dataIndex: 'dskh',
          className: 'title-class',
          key: 'dskh',
        },
        {
          title: '对手户名',
          dataIndex: 'dshm',
          className: 'title-class',
          key: 'dshm',
        },
      ],
      data_capital: [],
    };
  },
  mounted() {
    this.getPurpose();
  },
  methods: {
    getPurpose() {
      // 发送请求
      let res = {
        code: 200,
        msg: null,
        data: {
          totalMoney: 31313.19,
          list: [
            {
              type: '工作生活',
              total: 156,
              money: 123.13,
              percent: 0.156,
            },
            {
              type: '行车交通',
              total: 156,
              money: 223.13,
              percent: 0.156,
            },
            {
              type: '食品酒水',
              total: 156,
              money: 323.13,
              percent: 0.156,
            },
            {
              type: '居家物业',
              total: 156,
              money: 423.13,
              percent: 0.156,
            },
            {
              type: '文娱',
              total: 156,
              money: 523.13,
              percent: 0.156,
            },
            {
              type: '杂项',
              total: 156,
              money: 623.13,
              percent: 0.156,
            },
            {
              type: '服饰饰品',
              total: 156,
              money: 723.13,
              percent: 0.156,
            },
            {
              type: '医疗保健',
              total: 156,
              money: 823.13,
              percent: 0.156,
            },
            {
              type: '理财保险',
              total: 156,
              money: 923.13,
              percent: 0.156,
            },
            {
              type: '数码产品',
              total: 156,
              money: 1023.13,
              percent: 0.156,
            },
          ],
        },
      };
      // 交易详情
      this.detailList = res.data.list;
      // 颜色
      let color = [
        '#3BA0FF',
        '#4DCC73',
        '#FAD338',
        '#F04964',
        '#9760E4',
        '#37CBCB',
        '#FA9838',
        '#F047D4',
        '#4260E0',
        '#147FC2',
      ];
      let myChart = this.$echarts.init(this.$refs.purpose_circular);
      let option;
      // 数据
      let pieData = res.data.list.map((items) => ({
        name: items.type,
        value: items.money,
      }));
      //总金额
      let totalMoney = res.data.list.reduce((pre, cur) => pre + cur.money, 0);
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
            itemStyle: {
              borderWidth: 2, //设置border的宽度有多大
              borderColor: '#fff',
            },
            center: ['50%', '50%'],
            name: '资金用途',
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
      let type = item.type;
      this.type = type;
      // 发送请求
      let res = {
        code: 200,
        msg: null,
        data: {
          total: 156,
          row: [
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2017-05-04 12:09:10',
              jyje: '1000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:30:06',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-07-24 16:41:27',
              jyje: '4900000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:30:06',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:32:04',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:32:03',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:32:04',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:32:04',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:30:06',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:32:04',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:32:04',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:32:04',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:30:06',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:32:04',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:32:04',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:32:04',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:32:04',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:30:06',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:32:04',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:32:04',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:32:06',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:32:05',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:36:06',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:36:07',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:32:07',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:36:06',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:36:07',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:32:05',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:36:07',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:36:05',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:32:04',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:32:06',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:32:04',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:36:06',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:36:07',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:36:09',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:36:09',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:36:09',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:36:08',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:36:08',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:36:09',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:36:08',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:36:08',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:36:10',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:36:09',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:38:03',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:38:03',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:38:03',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:36:08',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:38:03',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:36:10',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:38:03',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:38:03',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:38:03',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:38:03',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:38:05',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:38:03',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:38:03',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:38:03',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:38:05',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:38:05',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:38:04',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:38:04',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:38:05',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:38:04',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:38:03',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:46:03',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:46:03',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:46:03',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:46:03',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:38:06',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:46:03',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
            {
              jykh: 'AAAAABAA5896284A2',
              jyhm: '张三丰',
              jyrq: '2018-08-06 17:46:03',
              jyje: '50000.00',
              dskh: 'akafka',
              dshm: '周伯通',
            },
          ],
        },
      };
      this.data_capital = res.data.row;
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
    top: 7.7%;
    right: 12%;
    height: 288px;
    .capital-features-deal-num-items {
      // margin-top: 172%;
      margin-top: 36.2px;
      cursor: pointer;
      font-family: PingFangSC-Medium;
      font-size: 12px;
      color: #1890ff;
      &:first-child {
        margin-top: 0;
      }
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
