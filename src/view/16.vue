<!--
 * @Author:勾青琼
 * @Date: 2021-04-20 09:35:37
 * @LastEditTime: 2021-04-20 13:38:15
 * @LastEditors: Please set LastEditors
 * @Description: 进销项对比
 * @FilePath: \guidance\src\views\dataAnalysis\autonomyJudge\common\capital\contrast.vue
-->
<template>
  <div class="wrapper">
    <div class="contrast">
      <!-- 标题 -->
      <div class="title">
        <img src="@/assets/logo.png" alt="" />
        <h3>发票进销项品名对比图</h3>
      </div>
      <!-- 两个饼图 -->
      <div class="doubleBar">
        <!-- 进项发票货品名称 -->
        <div class="income Invoice" ref="income"></div>
        <!-- 销项发票货品名称 -->
        <div class="outInvoice Invoice" ref="outInvoice"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.income();
    this.outInvoice();
  },
  methods: {
    // 数据筛选
    dataFilter(data) {
      let result;
      // 遍历对象里面每一个数组
      for (let key in data) {
        // 进或出数据必须存在
        data[key].length &&
          (result = data[key].map((items) => ({
            name: items.hwtype,
            value: items.fz,
          })));
      }
      return result;
    },
    // 进项发票
    income() {
      // 发送请求
      const res = {
        code: 200,
        msg: null,
        data: {
          xiao: [],
          jin: [
            {
              hwtype: '*供电*电',
              fz: 91098.72,
              total: 53181354.4,
              persent: 0.0017,
            },
            {
              hwtype: '*劳务*毛巾加工费',
              fz: 1007000.0,
              total: 53181354.4,
              persent: 0.0189,
            },
            {
              hwtype: '*纺织产品*毛巾',
              fz: 23630494.88,
              total: 53181354.4,
              persent: 0.4443,
            },
            {
              hwtype: '*纺织产品*毛巾被',
              fz: 9574429.6,
              total: 53181354.4,
              persent: 0.18,
            },
            {
              hwtype: '*纺织产品*毛巾|',
              fz: 211704.48,
              total: 53181354.4,
              persent: 0.0039,
            },
            {
              hwtype: '*劳务*加工费',
              fz: 100000.0,
              total: 53181354.4,
              persent: 0.0018,
            },
            {
              hwtype: '*纺织产品*浴巾',
              fz: 9583025.12,
              total: 53181354.4,
              persent: 0.1801,
            },
            {
              hwtype: '*纺织产品*棉纱',
              fz: 6671001.6,
              total: 53181354.4,
              persent: 0.1254,
            },
            {
              hwtype: '*纺织产品*普梳棉纱',
              fz: 2312600.0,
              total: 53181354.4,
              persent: 0.0434,
            },
          ],
        },
      };
      // 请求回来的数据加工
      let dataArr = this.dataFilter(res.data);
      let myChart = this.$echarts.init(this.$refs.income);
      let option;
      let total = 0; //合计总数
      for (var totalIndex = 0; totalIndex < dataArr.length; totalIndex++) {
        total += dataArr[totalIndex].value;
      }
      if (total === 0) {
        //当值为0时 不显示 改为字符串可显示
        total = '0';
      }

      let colorsArr = [
        '#0298FE',
        '#48C2E8',
        '#FE7270',
        '#E7BCF0',
        '#FF9A65',
        '#5F58DA',
        '#6BB7B1',
        '#B88250',
        '#9ACD35',
        '#4FBB5E',
        '#DB4E36',
        '#FB47FF',
        '#02A658',
        '#B0B0B0',
        '#8C54E6',
        '#F19C13',
        '#5ED9A8',
      ];
      option = {
        title: [
          {
            text: '进项发票货品名称',
            x: 'center',
            y: '62%',
            textStyle: {
              color: '#595959',
              fontSize: 14,
            },

            // subtext: total,
            // subtextStyle: {
            //     color: '#000',
            //     fontSize: 24,
            //     fontWeight: 'bold'
            // }
          },
          {
            text: '进项发票货品名称',
            x: '20',
            y: '5%',
            textStyle: {
              color: '#000',
              fontSize: 16,
            },
          },
        ],
        tooltip: {
          trigger: 'item',
          borderColor: 'rgba(255,255,255,.3)',
          backgroundColor: 'rgba(13,5,30,.6)',
          borderWidth: 1,
          padding: 5,
          formatter: function(parms) {
            //hover显示内容
            var str =
              parms.marker +
              '' +
              parms.data.name +
              '</br>' +
              '数量：' +
              parms.data.value +
              '</br>' +
              '占比：' +
              parms.percent +
              '%';
            return str;
          },
          textStyle: {
            fontSize: 14,
          },
        },
        legend: {
          orient: 'horizontal', //纵向图例 改为横向图标
          left: 'center',
          itemWidth: 10,
          itemHeight: 10,
          icon: 'circle',
          top: '12%',
          itemGap: 15, //图例item间距
          textStyle: {
            color: '#000',
            fontSize: 14,
          },
          data: dataArr,
          // formatter: function(name) { //图表名称+数值
          //     if (dataArr && dataArr.length) {
          //         for (var index = 0; index < dataArr.length; index++) {
          //             if (name === dataArr[index].name) {
          //                 return (
          //                     name + "  ： " + dataArr[index].value
          //                 )
          //             }
          //         }
          //     }
          // },
        },
        series: [
          {
            type: 'pie',
            center: ['50%', '65%'],
            radius: ['25%', '40%'],
            clockwise: true,
            avoidLabelOverlap: true,
            hoverOffset: 2,
            itemStyle: {
              normal: {
                color: function(params) {
                  return colorsArr[params.dataIndex];
                },
              },
            },
            label: {
              show: true,
              position: 'outside',
              formatter: '{d}%',
              fontSize: 10,
            },
            labelLine: {
              normal: {
                length: 5,
                length2: 8,
                lineStyle: {
                  width: 1,
                },
              },
            },
            data: dataArr,
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener('resize', function() {
        myChart.resize();
      }); // 随浏览器大小变化而变化
      // 图例改变事件
      myChart.on('legendselectchanged', function(params) {
        var option_reset = this.getOption();
        let select_value = Object.values(params.selected);
        let total_reset = 0; //  重置合计
        if (select_value && select_value.length) {
          for (var index = 0; index < select_value.length; index++) {
            if (select_value[index] !== false) {
              total_reset += dataArr[index].value;
            }
          }
        }
        option_reset.title[0].subtext = total_reset; //修改合计值为修改后的值
        this.setOption(option_reset);
      });
    },
    //  销项发票
    outInvoice() {
      // 发送请求
      const res = {
        code: 200,
        msg: null,
        data: {
          xiao: [
            {
              hwtype: '*供电*电',
              fz: 91098.72,
              total: 53181354.4,
              persent: 0.0017,
            },
            {
              hwtype: '*劳务*毛巾加工费',
              fz: 1007000.0,
              total: 53181354.4,
              persent: 0.0189,
            },
            {
              hwtype: '*纺织产品*毛巾',
              fz: 23630494.88,
              total: 53181354.4,
              persent: 0.4443,
            },
            {
              hwtype: '*纺织产品*毛巾被',
              fz: 9574429.6,
              total: 53181354.4,
              persent: 0.18,
            },
            {
              hwtype: '*纺织产品*毛巾|',
              fz: 211704.48,
              total: 53181354.4,
              persent: 0.0039,
            },
            {
              hwtype: '*劳务*加工费',
              fz: 100000.0,
              total: 53181354.4,
              persent: 0.0018,
            },
            {
              hwtype: '*纺织产品*浴巾',
              fz: 9583025.12,
              total: 53181354.4,
              persent: 0.1801,
            },
            {
              hwtype: '*纺织产品*棉纱',
              fz: 6671001.6,
              total: 53181354.4,
              persent: 0.1254,
            },
            {
              hwtype: '*纺织产品*普梳棉纱',
              fz: 2312600.0,
              total: 53181354.4,
              persent: 0.0434,
            },
          ],
          jin: [],
        },
      };
      let myChart = this.$echarts.init(this.$refs.outInvoice);
      let option;
      // 请求回来的数据加工
      let dataArr = this.dataFilter(res.data);
      let total = 0; //合计总数
      for (var totalIndex = 0; totalIndex < dataArr.length; totalIndex++) {
        total += dataArr[totalIndex].value;
      }
      if (total === 0) {
        //当值为0时 不显示 改为字符串可显示
        total = '0';
      }

      let colorsArr = [
        '#3B64FF',
        '#FFBD19',
        '#5EE1FF',
        '#6EB0FF',
        '#D7948C',
        '#AC51EA',
        '#00AAEA',
        '#C44B8C',
        '#81E639',
        '#FF8CAF',
        '#FFB66B',
        '#CEFFDB',
        '#C8EF4C',
        '#5D81CE',
        '#DE6DC6',
        '#11D36A',
        '#C8C8C8',
      ];
      option = {
        title: [
          {
            text: '销项发票货品名称',
            x: 'center',
            y: '62%',
            textStyle: {
              color: '#595959',
              fontSize: 14,
            },
            // subtext: total,
            // subtextStyle: {
            //     color: '#000',
            //     fontSize: 24,
            //     fontWeight: 'bold'
            // }
          },
          {
            text: '销项发票货品名称',
            x: '20',
            y: '5%',
            textStyle: {
              color: '#000',
              fontSize: 16,
            },
          },
        ],
        tooltip: {
          trigger: 'item',
          borderColor: 'rgba(255,255,255,.3)',
          backgroundColor: 'rgba(13,5,30,.6)',
          borderWidth: 1,
          padding: 5,
          formatter: function(parms) {
            //hover显示内容
            var str =
              parms.marker +
              '' +
              parms.data.name +
              '</br>' +
              '数量：' +
              parms.data.value +
              '</br>' +
              '占比：' +
              parms.percent +
              '%';
            return str;
          },
          textStyle: {
            fontSize: 14,
          },
        },
        legend: {
          orient: 'horizontal', //纵向图例 改为横向图标
          left: 'center',
          itemWidth: 10,
          itemHeight: 10,
          icon: 'circle',
          top: '12%',
          itemGap: 15, //图例item间距
          textStyle: {
            color: '#000',
            fontSize: 14,
          },
          data: dataArr,
          // formatter: function(name) { //图表名称+数值
          //     if (dataArr && dataArr.length) {
          //         for (var index = 0; index < dataArr.length; index++) {
          //             if (name === dataArr[index].name) {
          //                 return (
          //                     name + "  ： " + dataArr[index].value
          //                 )
          //             }
          //         }
          //     }
          // },
        },
        series: [
          {
            type: 'pie',
            center: ['50%', '65%'],
            radius: ['25%', '40%'],
            clockwise: true,
            avoidLabelOverlap: true,
            hoverOffset: 2,
            itemStyle: {
              normal: {
                color: function(params) {
                  return colorsArr[params.dataIndex];
                },
              },
            },
            label: {
              show: true,
              position: 'outside',
              formatter: '{d}%',
              fontSize: 10,
            },
            labelLine: {
              normal: {
                length: 5,
                length2: 8,
                lineStyle: {
                  width: 1,
                },
              },
            },
            data: dataArr,
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener('resize', function() {
        myChart.resize();
      }); // 随浏览器大小变化而变化
      // 图例改变事件
      myChart.on('legendselectchanged', function(params) {
        var option_reset = this.getOption();
        let select_value = Object.values(params.selected);
        let total_reset = 0; //  重置合计
        if (select_value && select_value.length) {
          for (var index = 0; index < select_value.length; index++) {
            if (select_value[index] !== false) {
              total_reset += dataArr[index].value;
            }
          }
        }
        option_reset.title[0].subtext = total_reset; //修改合计值为修改后的值
        this.setOption(option_reset);
      });
    },
  },
};
</script>
<style lang="less" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  .contrast {
    height: 100%;
    .title {
      display: flex;
      margin-left: 10px;
      height: 40px;
      line-height: 40px;
      // text-align: center;
      align-items: center;
      img {
        width: 16px;
        height: 16px;
        margin-top: -5px;
      }
      h3 {
        font-family: PingFangSC-Semibold;
        font-size: 16px;
        color: #353535;
      }
    }
    .doubleBar {
      height: 100%;
      display: flex;
      justify-content: space-between;
      .Invoice {
        width: 50%;
        height: 72.2%;
        background: #ffffff;
        box-shadow: 0 0 20px 0 rgba(24, 144, 255, 0.1);
        border-radius: 4px;
        margin-right: 20px;
      }
    }
  }
}
</style>
