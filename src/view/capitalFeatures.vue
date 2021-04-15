<!--
 * @Author: 勾青琼
 * @Date: 2021-03-12 11:47:52
 * @LastEditTime: 2021-04-15 16:38:10
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
    <!--交易行为特征  -->
    <div class="trisation_action">
      <div class="trastion_title">
        <img src="../assets/logo.png" class="trasion_img" />
        <h3 class="transtion_h3">交易行为特征</h3>
      </div>
      <!-- 四个图表 -->
      <div class="trisation-items-box" style="margin-top: 0">
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
          <ul class="trisation-action-list-items-content">
            <li
              class="trisation-action-list-items-content-items"
              v-for="(items, index) in 5"
              :key="index"
            >
              交易明细中体现出账户<span
                style="color: #1890ff; font-weight: bold"
                >6222020200122779564</span
              >存在与黑名单账户进行多次交易的行为
            </li>
          </ul>
        </div>
        <div class="trisation-action-rival trisation-action-list-items">
          <h3
            class="trisation-action-list-items-title trisation-action-list-rival-title"
          >
            交易对手异常
          </h3>

          <ul class="trisation-action-list-items-content">
            <li
              class="trisation-action-list-items-content-items"
              v-for="(items, index) in 5"
              :key="index"
            >
              交易明细中体现出账户<span
                style="color: #1890ff; font-weight: bold"
                >6222020200122779564</span
              >存在与黑名单账户进行多次交易的行为
            </li>
          </ul>
        </div>
        <div class="trisation-action-rival trisation-action-list-items">
          <h3
            class="trisation-action-list-items-title trisation-action-list-rival-title"
          >
            交易对手异常
          </h3>

          <ul class="trisation-action-list-items-content">
            <li
              class="trisation-action-list-items-content-items"
              v-for="(items, index) in 5"
              :key="index"
            >
              交易明细中体现出账户<span
                style="color: #1890ff; font-weight: bold"
                >6222020200122779564</span
              >存在与黑名单账户进行多次交易的行为
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 地图 -->
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
      <div style="width: 100%; height: 600px" ref="map"></div>
    </div>
  </div>
</template>

<script>
import china from 'echarts/map/json/china.json';
// import { transactionApi} from '../../../../api/autonoMy'
export default {
  name: 'capital-features',
  data() {
    return {
      toggleData: true, // 交易人员交易发生地切换
      time: [],
      caseId: '',
      params: '',
      updateTime: '',
      subject: '',
      xArray: [],
      jzArrayJe: [],
      scallArray: [],
      monthMapData: {},
      hoursMapData: {},
      monthDate: [],
      hoursDate: [],
    };
  },
  mounted() {
    this.dateTime();
    this.getSeconedEcharts();
    this.getScatter();
    this.getBox();
    this.getMap();
    this.get_transation_money();
    // 获取上方柱图
    this.get_trasction_time();
  },
  methods: {
    filterData(type, res) {
      let outtotal = [];
      let outmoney = [];
      let intotal = [];
      let inmoney = [];
      if (type === 'month') {
        for (let key in res.data.monthtMap) {
          if (
            res.data.monthtMap[key].outtotal ||
            res.data.monthtMap[key].outmoney ||
            res.data.monthtMap[key].intotal ||
            res.data.monthtMap[key].inmoney !== undefined
          ) {
            outtotal.push(res.data.monthtMap[key].outtotal);
            outmoney.push(res.data.monthtMap[key].outmoney);
            intotal.push(res.data.monthtMap[key].intotal);
            inmoney.push(res.data.monthtMap[key].inmoney);
          }
        }
      } else {
        for (let key in res.data.hourMap) {
          if (
            res.data.hourMap[key].outtotal ||
            res.data.hourMap[key].outmoney ||
            res.data.hourMap[key].intotal ||
            res.data.hourMap[key].inmoney !== undefined
          ) {
            outtotal.push(res.data.hourMap[key].outtotal);
            outmoney.push(res.data.hourMap[key].outmoney);
            intotal.push(res.data.hourMap[key].intotal);
            inmoney.push(res.data.hourMap[key].inmoney);
          }
        }
      }
      return {
        outtotal,
        outmoney,
        intotal,
        inmoney,
      };
    },
    //  交易时间特征接口
    get_trasction_time() {
      //   let param = {
      //     caseid:this.caseId,
      //     updateTime:this.updateTime,
      //     subject:this.subject
      //   }
      // transactionApi(param).then((res) =>{

      // })
      let res = {
        code: 200,
        msg: null,
        data: {
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
          hourMap: {
            '00': {
              outtotal: 0,
              outmoney: 0,
              intotal: 76,
              inmoney: 172.61,
            },
            '01': {
              outtotal: 0,
              outmoney: 0,
              intotal: 57,
              inmoney: 350.29,
            },
            '02': {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            '03': {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            '04': {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            '05': {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            '06': {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            '07': {
              outtotal: 0,
              outmoney: 0,
              intotal: 1,
              inmoney: 43200.0,
            },
            '08': {
              outtotal: 28,
              outmoney: 1714597.13,
              intotal: 17,
              inmoney: 2802232.4,
            },
            '09': {
              outtotal: 101,
              outmoney: 13554062.32,
              intotal: 30,
              inmoney: 8238901.69,
            },
            '10': {
              outtotal: 54,
              outmoney: 11761733.73,
              intotal: 22,
              inmoney: 7771849.5,
            },
            '11': {
              outtotal: 32,
              outmoney: 1550728.18,
              intotal: 10,
              inmoney: 1956111.0,
            },
            '12': {
              outtotal: 6,
              outmoney: 2565044.0,
              intotal: 7,
              inmoney: 2996974.92,
            },
            '13': {
              outtotal: 28,
              outmoney: 1411954.6,
              intotal: 5,
              inmoney: 312744.0,
            },
            '14': {
              outtotal: 31,
              outmoney: 4503285.26,
              intotal: 19,
              inmoney: 8531739.7,
            },
            '15': {
              outtotal: 67,
              outmoney: 10597011.0,
              intotal: 26,
              inmoney: 14533431.0,
            },
            '16': {
              outtotal: 58,
              outmoney: 22591171.02,
              intotal: 26,
              inmoney: 22049828.04,
            },
            '17': {
              outtotal: 32,
              outmoney: 1063119.6,
              intotal: 92,
              inmoney: 7327367.43,
            },
            '18': {
              outtotal: 104,
              outmoney: 11154607.02,
              intotal: 27,
              inmoney: 11110000.0,
            },
            '19': {
              outtotal: 5,
              outmoney: 5000000.0,
              intotal: 2,
              inmoney: 121000.0,
            },
            '20': {
              outtotal: 9,
              outmoney: 6829000.0,
              intotal: 14,
              inmoney: 9600000.0,
            },
            '21': {
              outtotal: 6,
              outmoney: 3000000.0,
              intotal: 4,
              inmoney: 200000.0,
            },
            '22': {
              outtotal: 0,
              outmoney: 0,
              intotal: 2,
              inmoney: 0.94,
            },
            '23': {
              outtotal: 0,
              outmoney: 0,
              intotal: 2,
              inmoney: 229.81,
            },
            X: [
              '00',
              '01',
              '02',
              '03',
              '04',
              '05',
              '06',
              '07',
              '08',
              '09',
              '10',
              '11',
              '12',
              '13',
              '14',
              '15',
              '16',
              '17',
              '18',
              '19',
              '20',
              '21',
              '22',
              '23',
            ],
          },
        },
      };
      this.monthMapData = this.filterData('month', res);
      this.monthDate = res.data.monthtMap.X.map(
        (items) =>
          items.toString().slice(0, 4) + '-' + items.toString().slice(4)
      );
      this.hoursDate = res.data.hourMap.X.map((items) => items + ':' + '00');
      this.hoursMapData = this.filterData('hours', res);
      this.getMyEcharts();
      this.getSeconedEcharts();
    },
    // 交易金额特征
    get_transation_money() {
      let res = {
        code: 200,
        msg: null,
        data: {
          scatter: [
            {
              total: 1,
              money: -2730.0,
            },
            {
              total: 10,
              money: 0.01,
            },
            {
              total: 4,
              money: 0.02,
            },
            {
              total: 1,
              money: 0.03,
            },
            {
              total: 3,
              money: 0.04,
            },
            {
              total: 6,
              money: 0.05,
            },
            {
              total: 4,
              money: 0.07,
            },
            {
              total: 3,
              money: 0.08,
            },
            {
              total: 4,
              money: 0.09,
            },
            {
              total: 2,
              money: 0.1,
            },
            {
              total: 1,
              money: 0.11,
            },
            {
              total: 2,
              money: 0.12,
            },
            {
              total: 3,
              money: 0.14,
            },
            {
              total: 1,
              money: 0.16,
            },
            {
              total: 4,
              money: 0.18,
            },
            {
              total: 2,
              money: 0.19,
            },
            {
              total: 1,
              money: 0.2,
            },
            {
              total: 1,
              money: 0.23,
            },
            {
              total: 1,
              money: 0.25,
            },
            {
              total: 1,
              money: 0.26,
            },
            {
              total: 3,
              money: 0.27,
            },
            {
              total: 3,
              money: 0.28,
            },
            {
              total: 1,
              money: 0.29,
            },
            {
              total: 1,
              money: 0.3,
            },
            {
              total: 1,
              money: 0.31,
            },
            {
              total: 3,
              money: 0.33,
            },
            {
              total: 1,
              money: 0.35,
            },
            {
              total: 1,
              money: 0.38,
            },
          ],
        },
      };
      let a = res.data.scatter;
      a.forEach((item, index) => {
        a[index] = [item.total, item.money];
      });
      console.log(a, 'a12122a');

      this.scallArray = a;
    },
    dateTime() {
      // 可以得到x轴坐标
      this.time = [
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
      ];
    },
    //  人员地区切换
    togglePeopleOrLocation(flag) {
      this.toggleData = flag;
    },
    // 第一个柱状图
    getMyEcharts() {
      console.log(this.monthMapData);
      let myChart = this.$echarts.init(this.$refs.histogram);
      let option = {
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
            data: this.monthDate,
            axisPointer: {
              type: 'shadow',
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
            data: this.monthMapData.inmoney,
            itemStyle: {
              color: '#4DCCBE',
            },
            barBorderRadius: ' 8px 8px 0px 0px',
          },
          {
            name: '出账金额',
            type: 'bar',
            barWidth: '8px',
            data: this.monthMapData.outmoney,
            itemStyle: {
              color: ' #F6AA3C',
            },
          },
          {
            name: '进账次数',
            type: 'line',
            yAxisIndex: 1,
            data: this.monthMapData.intotal,
            itemStyle: {
              color: '#92C5FF',
            },
          },
          {
            name: '出账次数',
            type: 'line',
            yAxisIndex: 1,
            data: this.monthMapData.outtotal,
            itemStyle: {
              color: '#F0166D',
            },
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener('resize', function() {
        myChart.resize();
      });
    },
    //  第二个柱状图
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
            data: this.hoursDate,
            axisPointer: {
              type: 'shadow',
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
            data: this.hoursMapData.inmoney,
            itemStyle: {
              color: '#4DCCBE',
            },
            barBorderRadius: ' 8px 8px 0px 0px',
          },
          {
            name: '出账金额',
            type: 'bar',
            barWidth: '8px',
            data: this.hoursMapData.outmoney,
            itemStyle: {
              color: ' #FAD338',
            },
          },
          {
            name: '进账次数',
            type: 'line',
            yAxisIndex: 1,
            data: this.hoursMapData.intotal,
            itemStyle: {
              color: '#0077FF',
            },
          },
          {
            name: '出账次数',
            type: 'line',
            yAxisIndex: 1,
            data: this.hoursMapData.outtotal,
            itemStyle: {
              color: '#B620E0',
            },
          },
        ],
      };
      myChart.setOption(option);
    },
    // 散点图
    getScatter() {
      let myChart = this.$echarts.init(this.$refs.scatter);
      let option;
      option = {
        tooltip: {
          // 提示框组件。
          axisPointer: {
            crossStyle: {
              color: '#999',
            },
          },
        },
        xAxis: {
          // x轴
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
          // y轴
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
          // 工具栏。内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具。
          show: true,
          right: '10%',
          iconStyle: {
            borderColor: '#03ceda',
          },
          itemSize: 20,
          feature: {
            saveAsImage: {
              // 保存为图片
              icon: 'image://' + require('../assets/logo.png'),
              title: '下载',
              iconStyle: {},
              pixelRatio: 1,
            },
            myFull: {
              show: true,
              title: '全屏查看',
              icon: 'image://' + require('../assets/logo.png'),
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
        series: [
          {
            symbolSize: 20,
            data: this.scallArray,
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
      }); // 随浏览器大小变化而变化
    },
    getBox() {
      let myChart = this.$echarts.init(this.$refs.box);
      this.$echarts.dataTool = require('echarts/extension/dataTool');
      let option;
      let data = this.$echarts.dataTool.prepareBoxplotData([
        [60, 1, 50, 70, 3, 100],
        [10, 23, 32, 11],
        [22, 33, 22, 41],
        [10, 43, 12, 21],
        [13, 13, 42, 11],
        [8, 28, 19, 31],
        [19, 31, 37, 41],
      ]);
      let data2 = this.$echarts.dataTool.prepareBoxplotData([
        [1, 20, 30, 40],
        [10, 23, 32, 50],
        [32, 3, 22, 11],
        [10, 23, 32, 41],
        [13, 43, 12, 21],
        [40, 18, 39, 11],
        [9, 11, 17, 31],
      ]);
      data.axisData = ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun Day'];
      option = {
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: {
          itemWidth: 20,
          itemHeight: 10,
          itemGap: 10,
          data: [
            { name: 'lunch', icon: 'roundRect' },
            { name: 'dinner', icon: 'roundRect' },
          ],
          left: '13%',
          top: '7.5%',
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
              icon: 'image://' + require('../assets/logo.png'),
              title: '下载',
              iconStyle: {},
              pixelRatio: 1,
            },
            myFull: {
              show: true,
              title: '全屏查看',
              icon: 'image://' + require('../assets/logo.png'),
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
        grid: {
          left: '10%',
          right: '10%',
          bottom: '15%',
        },
        xAxis: {
          type: 'category',
          data: data.axisData,
          boundaryGap: true,
          nameGap: 30,
          splitArea: {
            show: false,
          },
          axisLabel: {
            formatter: '{value}',
          },
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
          name: '数量',
          splitArea: {
            show: true,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        series: [
          {
            name: 'lunch',
            type: 'boxplot',
            data: data.boxData,
            barBorderRadius: ' 8px 8px 0px 0px',
            tooltip: {
              formatter: function(param) {
                return [
                  '日期 ' + param.name + ': ',
                  '数据: ' + param.data,
                ].join('<br/>');
              },
            },
            itemStyle: {
              normal: {
                color: 'rgba(184,198,242,.7)', //柱子颜色
                borderColor: '#5A76C8', //边框颜色
              },
            },
          },
          {
            name: 'dinner',
            type: 'boxplot',
            data: data2.boxData,
            tooltip: {
              formatter: function(param) {
                return [
                  '日期 ' + param.name + ': ',
                  '数据: ' + param.data,
                ].join('<br/>');
              },
            },
            itemStyle: {
              normal: {
                color: 'rgba(189,228,169, .7)', //柱子颜色
                borderColor: '#94CF79', //边框颜色
              },
            },
          },
          {
            name: '小圆点',
            type: 'scatter',
            data: data.outliers,
            itemStyle: {
              normal: {
                color: '#95CE7B',
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
  height: 100%;
  overflow: auto;
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

  // 交易行为特征
  .trisation_action {
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
