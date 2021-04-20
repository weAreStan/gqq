<!--
 * @Author: 勾青琼
 * @Date: 2021-04-20 09:32:59
 * @LastEditTime: 2021-04-20 13:59:53
 * @LastEditors: Please set LastEditors
 * @Description: 发票特征
 * @FilePath: \guidance\src\views\dataAnalysis\autonomyJudge\common\capital\invoiceTrade.vue
-->
<template>
  <div class="wrapper">
    <!-- 顶额开票 -->
    <div class="billing">
      <div class="title-wrapper">
        <!--  标题-->
        <h3 class="title title-blue">顶额开票</h3>
        <!-- 顶额开票 -->
        <div class="topForehead" ref="topForehead" style="width: 100%"></div>
      </div>
      <div class="title-right-wrapper">
        <!-- 标题 -->
        <h3 class="title title-green">作废率高</h3>
        <!-- 作废率高 -->
        <div class="toVoid" ref="toVoid" style="width: 100%"></div>
      </div>
    </div>
    <!-- 下面两个
     -->
    <div class="bottom-double">
      <!-- 夜间开票 -->
      <div class="title-night-wrapper">
            <h3 class="title title-purple">夜间开票</h3>
        <div class="night-billing" ref="nightbilling" style="width: 100%">
        
        </div>
      </div>

      <!-- 同质不同价 -->
      <div class="homogeneity">
        <h3 class="title title-cyan">同质不同价</h3>
        <div class="descrption">
          <div class="behavior">
            发票明细中体现出<span class="high-light">xx责任有限公司</span
            >在货物棉纱发票开具上存在同质不同价的行为
          </div>
          <div class="behavior">
            发票明细中体现出<span class="high-light">xx责任有限公司</span
            >在货物棉纱发票开具上存在同质不同价的行为
          </div>
          <div class="behavior">
            发票明细中体现出<span class="high-light">xx责任有限公司</span
            >在货物棉纱发票开具上存在同质不同价的行为
          </div>
           <div class="behavior">
            发票明细中体现出<span class="high-light">xx责任有限公司</span
            >在货物棉纱发票开具上存在同质不同价的行为
          </div>
           <div class="behavior">
            发票明细中体现出<span class="high-light">xx责任有限公司</span
            >在货物棉纱发票开具上存在同质不同价的行为
          </div>
        </div>
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
    this.getTopForHead();
    this.gettoVoid();
    this.getNightBroken();
  },
  methods: {
    getTopForHead() {
      let myChart = this.$echarts.init(this.$refs.topForehead);
      let option;
      const handred = 100;
      let point = 78;

      option = {
        title: [
          {
            text: point + "%",
            x: "center",
            y: "40%",
            textStyle: {
              fontWeight: "normal",
              color: "#595959",
              fontSize: "25",
            },
          },
          {
            subtext: "发票数量（张） ",
            left: "30.67%",
            top: "75%",
            textAlign: "center",
            subtextStyle: {
              fontWeight: "normal",
              color: "#595959",
              fontSize: "12",
            },
          },
          {
            subtext: handred,
            left: "38.67%",
            top: "75%",
            textAlign: "center",
            subtextStyle: {
              fontWeight: "normal",
              color: "#1890FF",
              fontSize: "12",
            },
          },
          {
            subtext: "顶额开票数量（张） ",
            left: "65.67%",
            top: "75%",
            textAlign: "center",
            subtextStyle: {
              fontWeight: "normal",
              color: "#595959",
              fontSize: "12",
            },
          },
          {
            subtext: point,
            left: "75.67%",
            top: "75%",
            textAlign: "center",
            subtextStyle: {
              fontWeight: "normal",
              color: "#1890FF",
              fontSize: "12",
            },
          },
        ],
        tooltip: {
          formatter: function (params) {
            return params.name + "：" + params.percent + " %";
          },
        },
        series: [
          {
            name: "circle",
            type: "pie",
            clockWise: true,
            radius: ["30%", "46%"], // 饼的弧度大小
            top: "-10%",
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
              },
            },
            hoverAnimation: false,
            data: [
              {
                value: point,
                name: "占比",
                itemStyle: {
                  normal: {
                    color: "#1890FF", // 占比的颜色
                    label: {
                      show: false,
                    },
                    labelLine: {
                      show: false,
                    },
                  },
                },
              },
              {
                name: "剩余",
                value: handred - point,
                itemStyle: {
                  normal: {
                    color: "#E9E9E9", // 剩余的颜色
                  },
                },
              },
            ],
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      }); // 随浏览器大小变化而变化
    },
    gettoVoid() {
      let myChart = this.$echarts.init(this.$refs.toVoid);
      let option;
      const handred = 100;
      let point = 78;

      option = {
        title: [
          {
            text: point + "%",
            x: "center",
            y: "40%",
            textStyle: {
              fontWeight: "normal",
              color: "#595959",
              fontSize: "25",
            },
          },
          {
            subtext: "发票数量（张） ",
            left: "30.67%",
            top: "75%",
            textAlign: "center",
            subtextStyle: {
              fontWeight: "normal",
              color: "#595959",
              fontSize: "12",
            },
          },
          {
            subtext: handred,
            left: "38.67%",
            top: "75%",
            textAlign: "center",
            subtextStyle: {
              fontWeight: "normal",
              color: "#1890FF",
              fontSize: "12",
            },
          },
          {
            subtext: "顶额开票数量（张） ",
            left: "65.67%",
            top: "75%",
            textAlign: "center",
            subtextStyle: {
              fontWeight: "normal",
              color: "#595959",
              fontSize: "12",
            },
          },
          {
            subtext: point,
            left: "75.67%",
            top: "75%",
            textAlign: "center",
            subtextStyle: {
              fontWeight: "normal",
              color: "#1890FF",
              fontSize: "12",
            },
          },
        ],
        tooltip: {
          formatter: function (params) {
            return params.name + "：" + params.percent + " %";
          },
        },
        series: [
          {
            name: "circle",
            type: "pie",
            clockWise: true,
            radius: ["30%", "46%"], // 饼的弧度大小
            top: "-10%",
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
              },
            },
            hoverAnimation: false,
            data: [
              {
                value: point,
                name: "占比",
                itemStyle: {
                  normal: {
                    color: "#8ADA04", // 占比的颜色
                    label: {
                      show: false,
                    },
                    labelLine: {
                      show: false,
                    },
                  },
                },
              },
              {
                name: "剩余",
                value: handred - point,
                itemStyle: {
                  normal: {
                    color: "#E9E9E9", // 剩余的颜色
                  },
                },
              },
            ],
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      }); // 随浏览器大小变化而变化
    },
    // 夜间开票
    getNightBroken() {
      let myChart = this.$echarts.init(this.$refs.nightbilling);
      let option;
      option = {
        grid: {
            top:"20%",
          left: "6%",
          width: "90%",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
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
            { name: "开票金额", icon: "pin" },
            { name: "开票次数", icon: "" },
          ],
          right: "7%",
          top: "2%",
          textStyle: {
            fontSize: 12,
            color: "#9EA5BD",
          },
        },
        dataZoom: {
          show: true,
          realtime: true,
          height: 20,
          start: 0,
          end: 100,
        },
        xAxis: [
          {
            type: "category",
            data: [
              "2020-01",
              "2020-02",
              "2020-03",
              "2020-04",
              "2020-05",
              "2020-06",
              "2020-07",
              "2020-08",
              "2020-09",
              "2020-10",
              "2020-11",
              "2020-12",
            ],
            axisPointer: {
              type: "shadow",
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
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
            type: "value",
            name: "金额",
            min: 0,
            max: 400000,
            interval: 100000,
            axisLabel: {
              formatter: "{value}",
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
          },
          {
            type: "value",
            name: "次数",
            min: 0,
            max: 60,
            interval: 15,
            axisLabel: {
              formatter: "{value}",
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "开票金额",
            type: "bar",
            barWidth: "8px",
            data: [
              302342,
              302342,
              102342,
              302342,
              202342,
              302342,
              302342,
              102342,
              302342,
              302342,
              102342,
              302342,
            ],
            itemStyle: {
              color: "#FAD338",
            },
            barBorderRadius: " 8px 8px 0px 0px",
          },
          {
            name: "开票次数",
            type: "line",
            yAxisIndex: 1,
            data: [32, 33, 43, 46, 56, 32, 22, 13, 15, 32, 22, 33],
            itemStyle: {
              color: "#D174EC",
            },
          },
        ],
      };
      myChart.setOption(option);
    },
  },
};
</script>
<style lang="less" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  .billing {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    position: relative;
    .title-wrapper {
      width: 49.5%;
      .topForehead {
        width: 100%;
        height: 360px;
        background: #ffffff;
        box-shadow: 0 0 20px 0 rgba(24, 144, 255, 0.1);
        border-radius: 4px;
      }
      .title {
        position: absolute;
        z-index: 99;
        width: 70px;
        height: 30px;
        background: #ecf5ff;
        border: 1px solid #b3d8ff;
        border-radius: 4px;
        font-family: PingFangSC-Medium;
        font-size: 12px;
        color: #1890ff;
        text-align: center;
        line-height: 30px;
        margin-left: 10px;
        margin-top: 5px;
      }
    }
    // height: 100%;
    .title-right-wrapper {
      width: 49.5%;
      .toVoid {
        width: 100%;
        height: 360px;
        background: #ffffff;
        box-shadow: 0 0 20px 0 rgba(24, 144, 255, 0.1);
        border-radius: 4px;
      }
      .title {
        position: absolute;
        z-index: 9;
        width: 70px;
        height: 30px;
        background: #f6ffec;
        border: 1px solid #b0e985;
        border-radius: 4px;
        font-family: PingFangSC-Medium;
        font-size: 12px;
        color: #52c41b;
        text-align: center;
        line-height: 30px;
        margin-left: 10px;
        margin-top: 5px;
      }
    }
  }
  //    下面两个
  .bottom-double {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    position: relative;
    // 夜间开票
    .title-night-wrapper {
      width: 64.5%;
      height: 380px;
      .night-billing {
        height: 100%;
        background: #ffffff;
        box-shadow: 0 0 20px 0 rgba(24, 144, 255, 0.1);
        border-radius: 4px;
      }
      .title {
        position: absolute;
        margin-left: 10px;
        margin-top: 5px;
        width: 70px;
        height: 30px;
        z-index: 99;
        background: #f9efff;
        border: 1px solid #b893e9;
        border-radius: 4px;
        font-family: PingFangSC-Medium;
        font-size: 12px;
        color: #9e5df3;
        text-align: center;
        line-height: 30px;
      }
    }

    //  同质不同价
    .homogeneity {
      padding: 0 15px;
      width: 34.5%;
      height: 380px;
      background: #ffffff;
      box-shadow: 0 0 20px 0 rgba(24, 144, 255, 0.1);
      border-radius: 4px;
      margin-left: 20px;
      .title {
        margin-top: 5px;
        width: 70px;
        height: 30px;
        background: #f2fffd;
        border: 1px solid #89e5e1;
        border-radius: 4px;
        font-family: PingFangSC-Medium;
        font-size: 12px;
        color: #14c2c1;
        text-align: center;
        line-height: 30px;
      }
      .descrption {
        margin-top: 14px;
        box-sizing: border-box;
        .behavior {
          //   width: 475px;
          box-sizing: border-box;
          padding: 0 10px;

          //   height: 50px;
          line-height: 40px;
          margin-bottom: 15px;
          background: #f2fffd;
          border: 1px solid #89e5e1;
          font-size: 12px;
          border-radius: 4px;
          .high-light {
            font-family: PingFangSC-Medium;
            font-size: 12px;
            color: #1890ff;
            line-height: 17px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>