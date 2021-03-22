<!--
 * @Author: 477
 * @Date: 2021-03-12 11:47:52
 * @LastEditTime: 2021-03-16 11:05:18
 * @LastEditors: Please set LastEditors
 * @Description: 资金特征
 * @FilePath: \guidance\src\views\dataAnalysis\autonomyJudge\common\capitalPivot.vue
-->
<template>
  <div class="capital-features">
    <!-- 交易时间特征 -->
    <div class="trisation_time">
      <div class="trastion_title">
        <img src="../assets/logo.png" class="trasion_img" />
        <h3 class="transtion_h3">交易时间特征</h3>
      </div>
      <!-- 第一个柱状图 -->
      <div
        ref="histogram"
        style="width: 100%; height: 380px; background: #fff"
      ></div>
      <!-- 第二个柱状图 -->
      <div
        ref="second_histogram"
        style="width: 100%; height: 380px; background: #fff; margin-top: 30px"
      ></div>
    </div>
    <!-- 交易金额特征 -->
    <div class="trisation_many">
      <div class="trastion_title">
        <img src="../assets/logo.png" class="trasion_img" />
        <h3 class="transtion_h3">交易金额特征</h3>
      </div>
      <!-- 散点图及箱型图 -->
      <div class="scatter_box">
        <!-- 散点图 -->
        <div class="scatter" ref="scatter"></div>
        <div class="box" ref="box"></div>
      </div>
    </div>
    <!-- 交易行为特征 -->
    <div class="trisation-action">
      <div class="trastion_title">
        <img src="../assets/logo.png" class="trasion_img" />
        <h3 class="transtion_h3">交易行为特征</h3>
      </div>
      <!-- 四个图表 -->
      <div class="trisation-items-box" style="margin-top: 0;">
        <div class="trisation-items-box-left trisation-items-box-items"></div>
        <div class="trisation-items-box-right trisation-items-box-items"></div>
      </div>
      <div class="trisation-items-box">
        <div class="trisation-items-box-left trisation-items-box-items"></div>
        <div class="trisation-items-box-right trisation-items-box-items"></div>
      </div>
      <!-- 三个数据展示 -->
      <div class="trisation-action-list">
        <div class="trisation-action-rival trisation-action-list-items">
          <h3
            class="trisation-action-list-items-title trisation-action-list-rival-title"
          >
            交易对手异常
          </h3>
          <img
            src="../assets/TaxDataIcon.png"
            style="width: 28px; height: 28px;"
            alt=""
            class="trisation-action-list-items-collect"
          />
          <ul class="trisation-action-list-items-content">
            <li
              class="trisation-action-list-items-content-items"
              v-for="(items, index) in 5"
              :key="index"
            >
              交易明细中体现出账户<i style="color: #1890FF; font-weight: bold;"
                >6222020200122779564</i
              >存在与黑名单账户进行多次交易的行为
            </li>
          </ul>
        </div>
        <div class="trisation-action-ip trisation-action-list-items">
          <h3
            class=" trisation-action-list-items-title trisation-action-list-ip-title"
          >
            交易IP地址异常
          </h3>
          <img
            src="../assets/TaxDataIcon.png"
            style="width: 28px; height: 28px;"
            alt=""
            class="trisation-action-list-items-collect"
          />
          <ul class="trisation-action-list-items-content">
            <li
              class="trisation-action-list-items-content-items"
              v-for="(items, index) in 5"
              :key="index"
            >
              交易明细中体现出账户<i style="color: #1890FF; font-weight: bold;"
                >6222020200122779564</i
              >存在与黑名单账户进行多次交易的行为
            </li>
          </ul>
        </div>
        <div class="trisation-action-transfer trisation-action-list-items">
          <h3
            class=" trisation-action-list-items-title trisation-action-list-transfer-title"
          >
            公转私交易频繁
          </h3>
          <img
            src="../assets/TaxDataIcon.png"
            style="width: 28px; height: 28px;"
            alt=""
            class="trisation-action-list-items-collect"
          />
          <ul class="trisation-action-list-items-content">
            <li
              class="trisation-action-list-items-content-items"
              v-for="(items, index) in 5"
              :key="index"
            >
              交易明细中体现出账户<i style="color: #1890FF; font-weight: bold;"
                >6222020200122779564</i
              >存在与黑名单账户进行多次交易的行为
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 最下边地图 -->
    <div class="trisation-map">
      <!-- 地区人员切换 -->
      <div class="trisation-map-toggle">
        <p
          class="trisation-map-toggle-items trisation-map-toggle-people"
          @click="togglePeopleOrLocation(true)"
          :class="toggleData && 'active'"
        >
          交易人员
        </p>
        <p
          class="trisation-map-toggle-items trisation-map-toggle-area"
          @click="togglePeopleOrLocation(false)"
          :class="!toggleData && 'active'"
        >
          交易发生地
        </p>
      </div>
      <div style="width: 100%; height: 600px;" ref="map"></div>
    </div>
  </div>
</template>

<script>
import china from 'echarts/map/json/china.json';
export default {
  name: 'capital-features',
  data() {
    return {
      toggleData: true,
    };
  },
  mounted() {
    this.getMyEcharts();
    this.getSeconedEcharts();
    this.getScatter();
    this.getBox();
    this.getMap();
  },
  methods: {
    // 人员地区切换
    togglePeopleOrLocation(flag) {
      console.log(flag);
      this.toggleData = flag;
    },
    getMyEcharts() {
      let myChart = this.$echarts.init(this.$refs.histogram);
      let option;
      option = {
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
            { name: '进账金额', icon: 'pin' },
            { name: '出账金额', icon: 'pin' },
            { name: '进账次数', icon: '' },
            { name: '出账次数', icon: '' },
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
            data: [
              '2020-01',
              '2020-02',
              '2020-03',
              '2020-04',
              '2020-05',
              '2020-06',
              '2020-07',
              '2020-08',
              '2020-09',
              '2020-10',
              '2020-11',
              '2020-12',
            ],
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
            name: '交易金额',
            min: 0,
            max: 400000,
            interval: 100000,
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
          {
            type: 'value',
            name: '次数',
            min: 0,
            max: 60,
            interval: 15,
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
              color: '#4DCCBE',
            },
            barBorderRadius: ' 8px 8px 0px 0px',
          },
          {
            name: '出账金额',
            type: 'bar',
            barWidth: '8px',
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
              color: ' #FAD338',
            },
          },
          {
            name: '进账次数',
            type: 'line',
            yAxisIndex: 1,
            data: [15, 42, 23, 13, 13, 32, 13, 43, 32, 22, 43, 33],
            itemStyle: {
              color: '#0077FF',
            },
          },
          {
            name: '出账次数',
            type: 'line',
            yAxisIndex: 1,
            data: [32, 33, 43, 46, 56, 32, 22, 13, 15, 32, 22, 33],
            itemStyle: {
              color: '#B620E0',
            },
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener('resize', function() {
        myChart.resize();
      });
    },
    getSeconedEcharts() {
      let myChart = this.$echarts.init(this.$refs.second_histogram);
      let option;
      option = {
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
            { name: '进账金额', icon: 'pin' },
            { name: '出账金额', icon: 'pin' },
            { name: '进账次数', icon: '' },
            { name: '出账次数', icon: '' },
          ],
          right: '7%',
          top: '2%',
          textStyle: {
            fontSize: 12,
            color: '#9EA5BD',
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
            type: 'category',
            data: [
              '2020-01',
              '2020-02',
              '2020-03',
              '2020-04',
              '2020-05',
              '2020-06',
              '2020-07',
              '2020-08',
              '2020-09',
              '2020-10',
              '2020-11',
              '2020-12',
            ],
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
            name: '交易金额',
            min: 0,
            max: 400000,
            interval: 100000,
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
          {
            type: 'value',
            name: '次数',
            min: 0,
            max: 60,
            interval: 15,
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
        ],
        series: [
          {
            name: '进账金额',
            type: 'bar',
            barWidth: '8px',
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
              color: '#4DCCBE',
            },
            barBorderRadius: ' 8px 8px 0px 0px',
          },
          {
            name: '出账金额',
            type: 'bar',
            barWidth: '8px',
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
              color: ' #FAD338',
            },
          },
          {
            name: '进账次数',
            type: 'line',
            yAxisIndex: 1,
            data: [15, 42, 23, 13, 13, 32, 13, 43, 32, 22, 43, 33],
            itemStyle: {
              color: '#0077FF',
            },
          },
          {
            name: '出账次数',
            type: 'line',
            yAxisIndex: 1,
            data: [32, 33, 43, 46, 56, 32, 22, 13, 15, 32, 22, 33],
            itemStyle: {
              color: '#B620E0',
            },
          },
        ],
      };
      myChart.setOption(option);
    },
    getScatter() {
      let myChart = this.$echarts.init(this.$refs.scatter);
      let option;
      option = {
        tooltip: {
          axisPointer: {
            crossStyle: {
              color: '#999',
            },
          },
        },
        xAxis: {
          type: 'value',
          name: '次数',
          data: [10, 20, 30, 40, 50],
          splitLine: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          type: 'value',
          name: '交易金额',
          min: 0,
          max: 400000,
          interval: 100000,
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
        toolbox: {
          //工具栏
          show: true,
          right: '10%',
          iconStyle: {
            borderColor: '#03ceda',
          },
          itemSize: 20,
          feature: {
            saveAsImage: {
              // icon: 'image://' + require('../assets/logo.png'),
              title: '下载',
              iconStyle: {},
              pixelRatio: 1,
            },
            myFull: {
              show: true,
              title: '全屏查看',
              icon: 'image://' + require('../assets/title.png'),
              onclick: () => {
                const element = this.$refs.scatter;
                if (element.requestFullScreen) {
                  // HTML W3C 提议
                  element.requestFullScreen();
                } else if (element.msRequestFullscreen) {
                  // IE11
                  element.msRequestFullScreen();
                } else if (element.webkitRequestFullScreen) {
                  // Webkit (works in Safari5.1 and Chrome 15)
                  element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                  // Firefox (works in nightly)
                  element.mozRequestFullScreen();
                }
                // 退出全屏
                if (element.requestFullScreen) {
                  document.exitFullscreen();
                } else if (element.msRequestFullScreen) {
                  document.msExitFullscreen();
                } else if (element.webkitRequestFullScreen) {
                  document.webkitCancelFullScreen();
                } else if (element.mozRequestFullScreen) {
                  document.mozCancelFullScreen();
                }
              },
            },
          },
        },
        series: [
          {
            symbolSize: 20,
            data: [
              [23, 143533],
              [2, 243234],
              [1, 354245],
              [2, 198746],
              [3, 198746],
              [2, 3333333],
              [3, 123342],
              [4, 354245],
              [5, 344234],
              [1, 354245],
              [2, 234222],
              [3, 433223],
            ],
            itemStyle: {
              color: '#FFD347',
            },
            type: 'scatter',
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener('resize', function() {
        myChart.resize();
      });
    },
    getBox() {
      let myChart = this.$echarts.init(this.$refs.box);
      let option;
      option = {
        toolbox: {
          //工具栏
          show: true,
          right: '10%',
          iconStyle: {
            borderColor: '#03ceda',
          },
          itemSize: 20,
          feature: {
            saveAsImage: {
              // icon: 'image://' + require('../assets/logo.png'),
              title: '下载',
              iconStyle: {},
              pixelRatio: 1,
            },
            myFull: {
              show: true,
              title: '全屏查看',
              icon: 'image://' + require('../assets/title.png'),
              onclick: () => {
                const element = this.$refs.box;
                if (element.requestFullScreen) {
                  // HTML W3C 提议
                  element.requestFullScreen();
                } else if (element.msRequestFullscreen) {
                  // IE11
                  element.msRequestFullScreen();
                } else if (element.webkitRequestFullScreen) {
                  // Webkit (works in Safari5.1 and Chrome 15)
                  element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                  // Firefox (works in nightly)
                  element.mozRequestFullScreen();
                }
                // 退出全屏
                if (element.requestFullScreen) {
                  document.exitFullscreen();
                } else if (element.msRequestFullScreen) {
                  document.msExitFullscreen();
                } else if (element.webkitRequestFullScreen) {
                  document.webkitCancelFullScreen();
                } else if (element.mozRequestFullScreen) {
                  document.mozCancelFullScreen();
                }
              },
            },
          },
        },
        legend: {
          itemWidth: 20,
          itemHeight: 10,
          itemGap: 10,
          data: [
            { name: 'Lunch', icon: 'roundRect' },
            { name: 'Dinner', icon: 'roundRect' },
          ],
          left: '7%',
          top: '2%',
          textStyle: {
            fontSize: 12,
            // color: '#9EA5BD',
          },
        },
        tooltip: {
          axisPointer: {
            crossStyle: {
              color: '#999',
            },
          },
        },
        xAxis: {
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6', '7'],
          splitLine: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: [
          {
            type: 'value',
            name: '数量',
            min: 0,
            max: 50,
            interval: 10,
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
        ],
        series: [
          {
            name: 'Lunch',
            type: 'bar',
            data: [2, 12, 25, 32, 12, 21, 13],
            barBorderRadius: ' 8px 8px 0px 0px',
            itemStyle: {
              normal: {
                color: 'rgba(184,198,242,.7)', //柱子颜色
                borderColor: '#5A76C8', //边框颜色
              },
            },
          },
          {
            name: 'Dinner',
            type: 'bar',
            data: [12, 32, 15, 22, 32, 41, 3],
            itemStyle: {
              normal: {
                color: 'rgba(189,228,169, .7)', //柱子颜色
                borderColor: '#94CF79', //边框颜色
              },
            },
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener('resize', function() {
        myChart.resize();
      });
    },
    getMap() {
      let myChart = this.$echarts.init(this.$refs.map);
      this.$echarts.registerMap('china', china);
      function randomData() {
        return Math.round(Math.random() * 100);
      }
      let data = [
        {
          name: '齐齐哈尔',
        },
        {
          name: '盐城',
        },
        {
          name: '青岛',
        },
        {
          name: '金昌',
        },
        {
          name: '泉州',
        },
        {
          name: '拉萨',
        },
        {
          name: '上海浦东',
        },
        {
          name: '攀枝花',
        },
        {
          name: '威海',
        },
        {
          name: '承德',
        },
        {
          name: '汕尾',
        },
        {
          name: '克拉玛依',
        },
        {
          name: '重庆市',
        },
      ];

      let geoCoordMap = {
        齐齐哈尔: [123.97, 47.33],
        盐城: [120.13, 33.38],
        青岛: [120.33, 36.07],
        金昌: [102.188043, 38.520089],
        泉州: [118.58, 24.93],
        拉萨: [91.11, 29.97],
        上海浦东: [121.48, 31.22],
        攀枝花: [101.718637, 26.582347],
        威海: [122.1, 37.5],
        承德: [117.93, 40.97],
        汕尾: [115.375279, 22.786211],
        克拉玛依: [84.77, 45.59],
        重庆市: [108.384366, 30.439702],
      };

      myChart.setOption({
        series: [
          {
            type: 'map',
            map: 'china',
          },
        ],
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

      let option = {
        tooltip: {
          trigger: 'item',
          formatter(params) {
            let info =
              '<p style="font-size:18px">' +
              params.name +
              '</p><p style="font-size:14px"> ' +
              params.value +
              '</p>';
            return info;
          },
        },
        legend: {
          itemWidth: 20,
          itemHeight: 10,
          itemGap: 10,
          data: [{ name: '涉嫌人员', icon: 'pin' }],
          left: '20%',
          top: '3%',
        },
        visualMap: {
          show: false,
          min: 0,
          max: 100,
          text: ['高', '低'],
          calculable: false,
          inRange: {
            color: [
              '#ffffff',
              '#E0DAFF',
              '#ADBFFF',
              '#9CB4FF',
              '#6A9DFF',
              '#3889FF',
            ],
          },
        },
        geo: {
          map: 'china',
          zoom: 1,
          label: {
            normal: {
              show: true,
              color: '#c1c4c8',
            },
            emphasis: {
              show: false,
              color: '#292929',
            },
          },
          roam: false,
          itemStyle: {
            normal: {
              areaColor: '#fbfbfb',
              borderColor: '#b9b4b7',
            },
            emphasis: {
              areaColor: '#05ff09',
            },
          },
        },
        series: [
          {
            name: '涉嫌人员',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(data),
            symbolSize: 10,
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke',
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: false,
              },
              emphasis: {
                show: true,
              },
            },
            itemStyle: {
              normal: {
                color: 'tomato',
                shadowBlur: 10,
                shadowColor: '#333',
              },
            },
          },
          {
            type: 'map',
            mapType: 'china',
            geoIndex: 0,
            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
              },
            },
            data: [
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
            ],
          },
        ],
      };

      myChart.setOption(option);

      myChart.on('mouseover', function(params) {
        if (params.data.value != undefined) {
          myChart.dispatchAction({
            type: 'downplay',
          });
        }
      });
      window.addEventListener('resize', function() {
        myChart.resize();
      });
    },
  },
};
</script>
<style lang="less" scoped>
.capital-features {
  padding: 15px 20px 30px;
  background: #eef4fd;
  min-width: 1200px;
  .trastion_title {
    display: flex;
    height: 40px;
    border-radius: 2px;
    font-family: PingFangSC-Semibold;
    font-size: 16px;
    color: #353535;
    .trasion_img {
      width: 16px;
      height: 20px;
      margin-top: 4px;
    }
  }
  // 交易金额特征
  .trisation_many {
    margin-top: 25px;
    .scatter_box {
      display: flex;
      .scatter {
        width: 49.25%;
        height: 350px;
        background: #ffffff;
        box-shadow: 0 0 20px 0 rgba(24, 144, 255, 0.1);
        border-radius: 4px;
      }
      .box {
        margin-left: 1.5%;
        width: 49.25%;
        height: 350px;
        background: #ffffff;
        box-shadow: 0 0 20px 0 rgba(24, 144, 255, 0.1);
        border-radius: 4px;
      }
    }
  }

  // 交易行为特征
  .trisation-action {
    margin-top: 25px;
    // 四个图标
    .trisation-items-box {
      display: flex;
      margin-top: 20px;
      .trisation-items-box-items {
        width: 49.25%;
        height: 350px;
        background: #ffffff;
        box-shadow: 0 0 20px 0 rgba(24, 144, 255, 0.1);
        border-radius: 4px;
      }
      .trisation-items-box-right {
        margin-left: 1.5%;
      }
    }
    // 三个数据展示
    .trisation-action-list {
      display: flex;
      margin-top: 20px;
      justify-content: space-between;
      .trisation-action-list-items {
        width: 32.3%;
        background: #ffffff;
        box-shadow: 0 0 20px 0 rgba(24, 144, 255, 0.1);
        border-radius: 4px;
        position: relative;
        .trisation-action-list-items-title {
          background: #f2a830;
          border-radius: 4px;
          border-radius: 4px;
          line-height: 30px;
          text-align: center;
          width: 100px;
          height: 30px;
          font-family: PingFangSC-Medium;
          font-size: 12px;
          color: #ffffff;
          margin: 6px 0 0 15px;
        }
        .trisation-action-list-ip-title {
          background: #f57d7d;
        }
        .trisation-action-list-transfer-title {
          background: #a875eb;
        }
        .trisation-action-list-items-collect {
          position: absolute;
          right: 15px;
          top: 10px;
          cursor: pointer;
        }
        .trisation-action-list-items-content {
          .trisation-action-list-items-content-items {
            margin: 18px auto 0px;
            width: 95%;
            background: #fdf6ec;
            border: 1px solid #f5dbb1;
            border-radius: 4px;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            padding: 8px 10px;
            color: #707070;
            &:first-child {
              margin-top: 14px;
            }
          }
        }
      }
    }
  }
  // 最下边地图
  .trisation-map {
    position: relative;
    margin-top: 20px;
    width: 100%;
    height: 600px;
    background-color: #fff;
    box-shadow: 0 0 20px 0 rgba(24, 144, 255, 0.1);
    border-radius: 4px;
    .trisation-map-toggle {
      position: absolute;
      z-index: 9;
      display: flex;
      top: 15px;
      left: 41px;
      .trisation-map-toggle-items {
        cursor: pointer;
        text-align: center;
        line-height: 24px;
        width: 100px;
        height: 24px;
        background: #eaeef5;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #595959;
      }
      .trisation-map-toggle-people {
        border-radius: 4px 0 0 4px;
      }
      .trisation-map-toggle-area {
        border-radius: 0 4px 4px 0;
      }
      .active {
        background-color: #1890ff;
        color: #fff;
      }
    }
  }
}
</style>
