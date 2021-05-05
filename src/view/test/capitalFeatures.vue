<!--
 * @Author: 勾青琼
 * @Date: 2021-03-12 11:47:52
 * @LastEditTime: 2021-04-24 14:27:54
 * @LastEditors: Please set LastEditors
 * @Description: 资金特征
 * @FilePath: \guidance\src\views\dataAnalysis\autonomyJudge\common\capitalPivot.vue
-->
<template>
  <div class="capital-features">
    <!-- 交易时间特征 -->
    <div class="trisation_time">
      <div class="trastion_title">
        <!-- src="../../../../../assets/imgs/DivisionImg.png" -->
        <img src="../../assets/logo.png" class="trasion_img" />
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
        <!-- src="../../../../../assets/imgs/DivisionImg.png" -->
        <img src="../../assets/logo.png" class="trasion_img" />
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
        <!-- src="../../../../../assets/imgs/DivisionImg.png" -->
        <img src="../../assets/logo.png" class="trasion_img" />
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
    // @gr 定义treeCheck事件，勾选时触发，data是勾选的数据
    // this.$Bus.$on('treeCheck', (data) => {
    //   console.log(data);
    // });
    // 获取上方柱图
    this.get_trasction_time();
    // 散点图箱体图
    this.getTransationMoneyData();
    this.togglePeopleOrLocation(false);
  },
  beforeDestroy() {
    // this.$Bus.$off('treeCheck');
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
            201301: {
              outtotal: 2,
              outmoney: 1000000.0,
              intotal: 1,
              inmoney: 1000000.0,
            },
            201302: {
              outtotal: 2,
              outmoney: 2200000.0,
              intotal: 2,
              inmoney: 2200000.0,
            },
            201303: {
              outtotal: 1,
              outmoney: 16800.0,
              intotal: 2,
              inmoney: 17025.65,
            },
            201304: {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            201305: {
              outtotal: 6,
              outmoney: 80000.0,
              intotal: 3,
              inmoney: 130000.0,
            },
            201306: {
              outtotal: 6,
              outmoney: 115800.0,
              intotal: 2,
              inmoney: 65642.0,
            },
            201307: {
              outtotal: 1,
              outmoney: 725000.0,
              intotal: 2,
              inmoney: 725000.0,
            },
            201308: {
              outtotal: 1,
              outmoney: 74.87,
              intotal: 0,
              inmoney: 0,
            },
            201309: {
              outtotal: 0,
              outmoney: 0,
              intotal: 1,
              inmoney: 0.05,
            },
            201310: {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            201311: {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            201312: {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            201401: {
              outtotal: 3,
              outmoney: 2000010.05,
              intotal: 2,
              inmoney: 2000010.0,
            },
            201402: {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            201403: {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            201404: {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            201405: {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            201406: {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            201407: {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            201408: {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            201409: {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            201410: {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            201411: {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            201412: {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            201501: {
              outtotal: 4,
              outmoney: 2117066.7,
              intotal: 4,
              inmoney: 2117066.7,
            },
            201502: {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            201503: {
              outtotal: 0,
              outmoney: 0,
              intotal: 1,
              inmoney: 1.17,
            },
            201504: {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            201505: {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            201506: {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            201507: {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            201508: {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            201509: {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            201510: {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            201511: {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            201512: {
              outtotal: 0,
              outmoney: 0,
              intotal: 5,
              inmoney: 6000.54,
            },
            201601: {
              outtotal: 14,
              outmoney: 5543.8,
              intotal: 0,
              inmoney: 0,
            },
            201602: {
              outtotal: 2,
              outmoney: 360.0,
              intotal: 2,
              inmoney: 5400.0,
            },
            201603: {
              outtotal: 4,
              outmoney: 310.0,
              intotal: 2,
              inmoney: 5.18,
            },
            201604: {
              outtotal: 13,
              outmoney: 1714.8,
              intotal: 0,
              inmoney: 0,
            },
            201605: {
              outtotal: 20,
              outmoney: 3014.6,
              intotal: 0,
              inmoney: 0,
            },
            201606: {
              outtotal: 1,
              outmoney: 200000.0,
              intotal: 3,
              inmoney: 200002.28,
            },
            201607: {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            201608: {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            201609: {
              outtotal: 5,
              outmoney: 674844.65,
              intotal: 5,
              inmoney: 674843.5,
            },
            201610: {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            201611: {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            201612: {
              outtotal: 2,
              outmoney: 400000.0,
              intotal: 5,
              inmoney: 400006.06,
            },
            201701: {
              outtotal: 1,
              outmoney: 1600000.0,
              intotal: 1,
              inmoney: 1600000.0,
            },
            201702: {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            201703: {
              outtotal: 0,
              outmoney: 0,
              intotal: 4,
              inmoney: 0.04,
            },
            201704: {
              outtotal: 1,
              outmoney: 43200.0,
              intotal: 1,
              inmoney: 43200.0,
            },
            201705: {
              outtotal: 2,
              outmoney: 530000.0,
              intotal: 4,
              inmoney: 532000.0,
            },
            201706: {
              outtotal: 2,
              outmoney: 1096656.04,
              intotal: 5,
              inmoney: 1096679.53,
            },
            201707: {
              outtotal: 2,
              outmoney: 1260028.0,
              intotal: 2,
              inmoney: 1260000.0,
            },
            201708: {
              outtotal: 1,
              outmoney: 373289.39,
              intotal: 2,
              inmoney: 373306.41,
            },
            201709: {
              outtotal: 0,
              outmoney: 0,
              intotal: 3,
              inmoney: 2.19,
            },
            201710: {
              outtotal: 0,
              outmoney: 0,
              intotal: 1,
              inmoney: 6667.0,
            },
            201711: {
              outtotal: 1,
              outmoney: 16684.44,
              intotal: 2,
              inmoney: 10001.31,
            },
            201712: {
              outtotal: 0,
              outmoney: 0,
              intotal: 3,
              inmoney: 2.28,
            },
            201801: {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            201802: {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            201803: {
              outtotal: 0,
              outmoney: 0,
              intotal: 1,
              inmoney: 1.06,
            },
            201804: {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            201805: {
              outtotal: 2,
              outmoney: 2025.44,
              intotal: 0,
              inmoney: 0,
            },
            201806: {
              outtotal: 19,
              outmoney: 1120838.11,
              intotal: 14,
              inmoney: 1134967.59,
            },
            201807: {
              outtotal: 55,
              outmoney: 20362608.0,
              intotal: 48,
              inmoney: 20348554.04,
            },
            201808: {
              outtotal: 138,
              outmoney: 6594881.78,
              intotal: 125,
              inmoney: 6900682.49,
            },
            201809: {
              outtotal: 51,
              outmoney: 11631532.27,
              intotal: 31,
              inmoney: 11625989.28,
            },
            201810: {
              outtotal: 26,
              outmoney: 1314324.0,
              intotal: 12,
              inmoney: 1505786.0,
            },
            201811: {
              outtotal: 41,
              outmoney: 5562273.59,
              intotal: 23,
              inmoney: 5406939.9,
            },
            201812: {
              outtotal: 15,
              outmoney: 503430.61,
              intotal: 15,
              inmoney: 467048.36,
            },
            201901: {
              outtotal: 13,
              outmoney: 2057333.36,
              intotal: 10,
              inmoney: 2057333.17,
            },
            201902: {
              outtotal: 13,
              outmoney: 1265768.4,
              intotal: 10,
              inmoney: 1266857.8,
            },
            201903: {
              outtotal: 3,
              outmoney: 219501.17,
              intotal: 5,
              inmoney: 219000.63,
            },
            201904: {
              outtotal: 2,
              outmoney: 30816.67,
              intotal: 3,
              inmoney: 30300.29,
            },
            201905: {
              outtotal: 9,
              outmoney: 2004523.33,
              intotal: 7,
              inmoney: 2005248.13,
            },
            201906: {
              outtotal: 7,
              outmoney: 2681327.21,
              intotal: 8,
              inmoney: 2679850.82,
            },
            201907: {
              outtotal: 15,
              outmoney: 620732.77,
              intotal: 12,
              inmoney: 621006.03,
            },
            201908: {
              outtotal: 10,
              outmoney: 5313231.67,
              intotal: 5,
              inmoney: 5313000.0,
            },
            201909: {
              outtotal: 8,
              outmoney: 5989966.67,
              intotal: 5,
              inmoney: 5990000.07,
            },
            201910: {
              outtotal: 3,
              outmoney: 2029000.0,
              intotal: 3,
              inmoney: 2029000.28,
            },
            201911: {
              outtotal: 6,
              outmoney: 4030933.33,
              intotal: 4,
              inmoney: 4030837.25,
            },
            201912: {
              outtotal: 3,
              outmoney: 44000.31,
              intotal: 4,
              inmoney: 44000.32,
            },
            202001: {
              outtotal: 1,
              outmoney: 29966.67,
              intotal: 1,
              inmoney: 29966.67,
            },
            202002: {
              outtotal: 4,
              outmoney: 2229966.67,
              intotal: 4,
              inmoney: 2229966.67,
            },
            202003: {
              outtotal: 4,
              outmoney: 1778033.33,
              intotal: 5,
              inmoney: 1778033.38,
            },
            202004: {
              outtotal: 1,
              outmoney: 29966.67,
              intotal: 1,
              inmoney: 29966.67,
            },
            202005: {
              outtotal: 4,
              outmoney: 4029966.67,
              intotal: 3,
              inmoney: 4029966.67,
            },
            202006: {
              outtotal: 1,
              outmoney: 29966.67,
              intotal: 2,
              inmoney: 29966.72,
            },
            202007: {
              outtotal: 10,
              outmoney: 1329001.15,
              intotal: 8,
              inmoney: 1329001.15,
            },
            202008: {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            202009: {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            202010: {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            202011: {
              outtotal: 0,
              outmoney: 0,
              intotal: 0,
              inmoney: 0,
            },
            202012: {
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
            10: {
              outtotal: 54,
              outmoney: 11761733.73,
              intotal: 22,
              inmoney: 7771849.5,
            },
            11: {
              outtotal: 32,
              outmoney: 1550728.18,
              intotal: 10,
              inmoney: 1956111.0,
            },
            12: {
              outtotal: 6,
              outmoney: 2565044.0,
              intotal: 7,
              inmoney: 2996974.92,
            },
            13: {
              outtotal: 28,
              outmoney: 1411954.6,
              intotal: 5,
              inmoney: 312744.0,
            },
            14: {
              outtotal: 31,
              outmoney: 4503285.26,
              intotal: 19,
              inmoney: 8531739.7,
            },
            15: {
              outtotal: 67,
              outmoney: 10597011.0,
              intotal: 26,
              inmoney: 14533431.0,
            },
            16: {
              outtotal: 58,
              outmoney: 22591171.02,
              intotal: 26,
              inmoney: 22049828.04,
            },
            17: {
              outtotal: 32,
              outmoney: 1063119.6,
              intotal: 92,
              inmoney: 7327367.43,
            },
            18: {
              outtotal: 104,
              outmoney: 11154607.02,
              intotal: 27,
              inmoney: 11110000.0,
            },
            19: {
              outtotal: 5,
              outmoney: 5000000.0,
              intotal: 2,
              inmoney: 121000.0,
            },
            20: {
              outtotal: 9,
              outmoney: 6829000.0,
              intotal: 14,
              inmoney: 9600000.0,
            },
            21: {
              outtotal: 6,
              outmoney: 3000000.0,
              intotal: 4,
              inmoney: 200000.0,
            },
            22: {
              outtotal: 0,
              outmoney: 0,
              intotal: 2,
              inmoney: 0.94,
            },
            23: {
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
    // 交易金额特征接口
    getTransationMoneyData() {
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
            {
              total: 3,
              money: 0.39,
            },
            {
              total: 1,
              money: 0.4,
            },
            {
              total: 1,
              money: 0.41,
            },
            {
              total: 3,
              money: 0.43,
            },
            {
              total: 1,
              money: 0.44,
            },
            {
              total: 1,
              money: 0.47,
            },
            {
              total: 1,
              money: 0.49,
            },
            {
              total: 4,
              money: 0.5,
            },
            {
              total: 1,
              money: 0.52,
            },
            {
              total: 3,
              money: 0.53,
            },
            {
              total: 1,
              money: 0.54,
            },
            {
              total: 1,
              money: 0.56,
            },
            {
              total: 2,
              money: 0.57,
            },
            {
              total: 1,
              money: 0.58,
            },
            {
              total: 1,
              money: 0.61,
            },
            {
              total: 1,
              money: 0.65,
            },
            {
              total: 1,
              money: 0.69,
            },
            {
              total: 1,
              money: 0.7,
            },
            {
              total: 2,
              money: 0.77,
            },
            {
              total: 1,
              money: 0.78,
            },
            {
              total: 1,
              money: 0.85,
            },
            {
              total: 1,
              money: 0.87,
            },
            {
              total: 1,
              money: 0.89,
            },
            {
              total: 1,
              money: 0.97,
            },
            {
              total: 4,
              money: 1.0,
            },
            {
              total: 2,
              money: 1.06,
            },
            {
              total: 2,
              money: 1.07,
            },
            {
              total: 3,
              money: 1.08,
            },
            {
              total: 1,
              money: 1.13,
            },
            {
              total: 2,
              money: 1.14,
            },
            {
              total: 4,
              money: 1.17,
            },
            {
              total: 1,
              money: 1.3,
            },
            {
              total: 1,
              money: 1.31,
            },
            {
              total: 1,
              money: 1.32,
            },
            {
              total: 1,
              money: 1.36,
            },
            {
              total: 1,
              money: 1.45,
            },
            {
              total: 1,
              money: 1.49,
            },
            {
              total: 1,
              money: 1.74,
            },
            {
              total: 1,
              money: 2.04,
            },
            {
              total: 1,
              money: 2.05,
            },
            {
              total: 1,
              money: 2.15,
            },
            {
              total: 1,
              money: 2.5,
            },
            {
              total: 2,
              money: 2.59,
            },
            {
              total: 1,
              money: 2.73,
            },
            {
              total: 1,
              money: 2.8,
            },
            {
              total: 1,
              money: 3.0,
            },
            {
              total: 1,
              money: 3.03,
            },
            {
              total: 1,
              money: 3.45,
            },
            {
              total: 1,
              money: 4.16,
            },
            {
              total: 3,
              money: 5.0,
            },
            {
              total: 1,
              money: 5.08,
            },
            {
              total: 1,
              money: 5.83,
            },
            {
              total: 1,
              money: 6.03,
            },
            {
              total: 1,
              money: 7.93,
            },
            {
              total: 2,
              money: 9.6,
            },
            {
              total: 1,
              money: 9.72,
            },
            {
              total: 1,
              money: 10.0,
            },
            {
              total: 1,
              money: 12.52,
            },
            {
              total: 1,
              money: 17.41,
            },
            {
              total: 1,
              money: 17.8,
            },
            {
              total: 1,
              money: 20.0,
            },
            {
              total: 2,
              money: 22.0,
            },
            {
              total: 2,
              money: 24.0,
            },
            {
              total: 2,
              money: 24.7,
            },
            {
              total: 1,
              money: 28.0,
            },
            {
              total: 1,
              money: 28.39,
            },
            {
              total: 1,
              money: 34.03,
            },
            {
              total: 1,
              money: 37.02,
            },
            {
              total: 1,
              money: 42.19,
            },
            {
              total: 1,
              money: 42.81,
            },
            {
              total: 1,
              money: 50.0,
            },
            {
              total: 2,
              money: 55.0,
            },
            {
              total: 2,
              money: 59.0,
            },
            {
              total: 1,
              money: 60.0,
            },
            {
              total: 2,
              money: 61.0,
            },
            {
              total: 2,
              money: 69.0,
            },
            {
              total: 1,
              money: 74.87,
            },
            {
              total: 16,
              money: 100.0,
            },
            {
              total: 1,
              money: 100.14,
            },
            {
              total: 1,
              money: 101.23,
            },
            {
              total: 1,
              money: 104.0,
            },
            {
              total: 2,
              money: 180.0,
            },
            {
              total: 2,
              money: 187.9,
            },
            {
              total: 1,
              money: 200.0,
            },
            {
              total: 1,
              money: 203.02,
            },
            {
              total: 1,
              money: 225.65,
            },
            {
              total: 1,
              money: 239.2,
            },
            {
              total: 1,
              money: 241.0,
            },
            {
              total: 1,
              money: 247.0,
            },
            {
              total: 1,
              money: 250.0,
            },
            {
              total: 2,
              money: 256.0,
            },
            {
              total: 1,
              money: 280.0,
            },
            {
              total: 5,
              money: 300.0,
            },
            {
              total: 1,
              money: 337.25,
            },
            {
              total: 1,
              money: 371.0,
            },
            {
              total: 1,
              money: 390.0,
            },
            {
              total: 2,
              money: 400.0,
            },
            {
              total: 1,
              money: 414.0,
            },
            {
              total: 1,
              money: 436.0,
            },
            {
              total: 4,
              money: 500.0,
            },
            {
              total: 1,
              money: 526.4,
            },
            {
              total: 1,
              money: 545.0,
            },
            {
              total: 1,
              money: 580.0,
            },
            {
              total: 1,
              money: 627.0,
            },
            {
              total: 2,
              money: 640.0,
            },
            {
              total: 1,
              money: 656.8,
            },
            {
              total: 1,
              money: 660.0,
            },
            {
              total: 6,
              money: 680.0,
            },
            {
              total: 1,
              money: 686.0,
            },
            {
              total: 2,
              money: 700.0,
            },
            {
              total: 1,
              money: 710.35,
            },
            {
              total: 1,
              money: 720.0,
            },
            {
              total: 1,
              money: 750.0,
            },
            {
              total: 3,
              money: 850.0,
            },
            {
              total: 1,
              money: 880.0,
            },
            {
              total: 1,
              money: 919.4,
            },
            {
              total: 1,
              money: 940.47,
            },
            {
              total: 1,
              money: 948.6,
            },
            {
              total: 6,
              money: 1000.0,
            },
            {
              total: 2,
              money: 1012.72,
            },
            {
              total: 1,
              money: 1040.0,
            },
            {
              total: 1,
              money: 1078.0,
            },
            {
              total: 1,
              money: 1180.0,
            },
            {
              total: 1,
              money: 1200.0,
            },
            {
              total: 1,
              money: 1239.8,
            },
            {
              total: 1,
              money: 1400.0,
            },
            {
              total: 4,
              money: 1500.0,
            },
            {
              total: 1,
              money: 1541.0,
            },
            {
              total: 1,
              money: 1700.0,
            },
            {
              total: 12,
              money: 2000.0,
            },
            {
              total: 1,
              money: 2008.0,
            },
            {
              total: 1,
              money: 2081.96,
            },
            {
              total: 1,
              money: 2090.0,
            },
            {
              total: 1,
              money: 2221.0,
            },
            {
              total: 1,
              money: 2300.0,
            },
            {
              total: 1,
              money: 2310.0,
            },
            {
              total: 1,
              money: 2322.06,
            },
            {
              total: 1,
              money: 2336.0,
            },
            {
              total: 1,
              money: 2380.0,
            },
            {
              total: 1,
              money: 2528.0,
            },
            {
              total: 2,
              money: 2700.0,
            },
            {
              total: 2,
              money: 2730.0,
            },
            {
              total: 1,
              money: 2900.0,
            },
            {
              total: 9,
              money: 3000.0,
            },
            {
              total: 1,
              money: 3012.0,
            },
            {
              total: 1,
              money: 3041.0,
            },
            {
              total: 1,
              money: 3048.0,
            },
            {
              total: 1,
              money: 3057.0,
            },
            {
              total: 1,
              money: 3215.0,
            },
            {
              total: 1,
              money: 3273.0,
            },
            {
              total: 1,
              money: 3300.0,
            },
            {
              total: 1,
              money: 3313.0,
            },
            {
              total: 1,
              money: 3332.0,
            },
            {
              total: 1,
              money: 3500.0,
            },
            {
              total: 1,
              money: 3582.77,
            },
            {
              total: 1,
              money: 3800.0,
            },
            {
              total: 1,
              money: 3892.0,
            },
            {
              total: 1,
              money: 3897.0,
            },
            {
              total: 1,
              money: 3950.0,
            },
            {
              total: 4,
              money: 4000.0,
            },
            {
              total: 1,
              money: 4116.0,
            },
            {
              total: 1,
              money: 4224.0,
            },
            {
              total: 1,
              money: 4656.48,
            },
            {
              total: 2,
              money: 4800.0,
            },
            {
              total: 12,
              money: 5000.0,
            },
            {
              total: 1,
              money: 5040.0,
            },
            {
              total: 1,
              money: 5177.0,
            },
            {
              total: 2,
              money: 6000.0,
            },
            {
              total: 2,
              money: 6200.0,
            },
            {
              total: 1,
              money: 6500.0,
            },
            {
              total: 1,
              money: 6594.0,
            },
            {
              total: 1,
              money: 6667.0,
            },
            {
              total: 1,
              money: 6908.0,
            },
            {
              total: 3,
              money: 7000.0,
            },
            {
              total: 1,
              money: 7635.0,
            },
            {
              total: 1,
              money: 7740.0,
            },
            {
              total: 1,
              money: 7894.0,
            },
            {
              total: 1,
              money: 8000.0,
            },
            {
              total: 1,
              money: 8120.0,
            },
            {
              total: 1,
              money: 8226.0,
            },
            {
              total: 1,
              money: 8859.66,
            },
            {
              total: 1,
              money: 9075.0,
            },
            {
              total: 1,
              money: 9468.0,
            },
            {
              total: 1,
              money: 9819.0,
            },
            {
              total: 23,
              money: 10000.0,
            },
            {
              total: 1,
              money: 10018.0,
            },
            {
              total: 1,
              money: 10044.0,
            },
            {
              total: 1,
              money: 10345.0,
            },
            {
              total: 1,
              money: 10998.0,
            },
            {
              total: 1,
              money: 11371.29,
            },
            {
              total: 1,
              money: 11843.0,
            },
            {
              total: 1,
              money: 12000.0,
            },
            {
              total: 1,
              money: 12229.44,
            },
            {
              total: 1,
              money: 12305.0,
            },
            {
              total: 1,
              money: 12566.67,
            },
            {
              total: 1,
              money: 12925.0,
            },
            {
              total: 1,
              money: 13533.33,
            },
            {
              total: 1,
              money: 13800.0,
            },
            {
              total: 1,
              money: 14000.0,
            },
            {
              total: 4,
              money: 14500.0,
            },
            {
              total: 1,
              money: 14744.0,
            },
            {
              total: 1,
              money: 14848.0,
            },
            {
              total: 1,
              money: 14855.6,
            },
            {
              total: 3,
              money: 15000.0,
            },
            {
              total: 1,
              money: 15466.67,
            },
            {
              total: 1,
              money: 16433.33,
            },
            {
              total: 1,
              money: 16554.4,
            },
            {
              total: 1,
              money: 16684.44,
            },
            {
              total: 1,
              money: 16723.04,
            },
            {
              total: 2,
              money: 16800.0,
            },
            {
              total: 2,
              money: 17066.7,
            },
            {
              total: 1,
              money: 17680.0,
            },
            {
              total: 1,
              money: 18366.67,
            },
            {
              total: 1,
              money: 19910.0,
            },
            {
              total: 7,
              money: 20000.0,
            },
            {
              total: 1,
              money: 21000.0,
            },
            {
              total: 1,
              money: 23000.0,
            },
            {
              total: 2,
              money: 23367.43,
            },
            {
              total: 2,
              money: 25000.0,
            },
            {
              total: 1,
              money: 27000.0,
            },
            {
              total: 1,
              money: 27066.67,
            },
            {
              total: 1,
              money: 27432.38,
            },
            {
              total: 1,
              money: 28000.0,
            },
            {
              total: 2,
              money: 28033.33,
            },
            {
              total: 1,
              money: 28988.0,
            },
            {
              total: 9,
              money: 29000.0,
            },
            {
              total: 1,
              money: 29580.0,
            },
            {
              total: 1,
              money: 29850.0,
            },
            {
              total: 17,
              money: 29966.67,
            },
            {
              total: 2,
              money: 29967.0,
            },
            {
              total: 15,
              money: 30000.0,
            },
            {
              total: 1,
              money: 30405.54,
            },
            {
              total: 1,
              money: 33732.0,
            },
            {
              total: 1,
              money: 34000.0,
            },
            {
              total: 1,
              money: 35000.0,
            },
            {
              total: 1,
              money: 35358.0,
            },
            {
              total: 2,
              money: 35642.0,
            },
            {
              total: 1,
              money: 38000.0,
            },
            {
              total: 2,
              money: 39780.0,
            },
            {
              total: 1,
              money: 43000.0,
            },
            {
              total: 2,
              money: 43200.0,
            },
            {
              total: 1,
              money: 43400.0,
            },
            {
              total: 2,
              money: 45000.0,
            },
            {
              total: 1,
              money: 45247.17,
            },
            {
              total: 1,
              money: 47164.0,
            },
            {
              total: 1,
              money: 48000.0,
            },
            {
              total: 1,
              money: 49000.0,
            },
            {
              total: 266,
              money: 50000.0,
            },
            {
              total: 1,
              money: 51094.19,
            },
            {
              total: 1,
              money: 59859.0,
            },
            {
              total: 3,
              money: 60000.0,
            },
            {
              total: 1,
              money: 60028.0,
            },
            {
              total: 1,
              money: 61200.0,
            },
            {
              total: 1,
              money: 70000.0,
            },
            {
              total: 1,
              money: 72000.0,
            },
            {
              total: 1,
              money: 75000.0,
            },
            {
              total: 1,
              money: 80000.0,
            },
            {
              total: 1,
              money: 90000.0,
            },
            {
              total: 14,
              money: 100000.0,
            },
            {
              total: 1,
              money: 110000.0,
            },
            {
              total: 1,
              money: 120000.0,
            },
            {
              total: 1,
              money: 126441.0,
            },
            {
              total: 2,
              money: 135000.0,
            },
            {
              total: 1,
              money: 136240.0,
            },
            {
              total: 1,
              money: 140000.0,
            },
            {
              total: 3,
              money: 150000.0,
            },
            {
              total: 1,
              money: 155245.0,
            },
            {
              total: 1,
              money: 157100.0,
            },
            {
              total: 1,
              money: 159448.5,
            },
            {
              total: 1,
              money: 160000.0,
            },
            {
              total: 1,
              money: 162344.0,
            },
            {
              total: 2,
              money: 163373.0,
            },
            {
              total: 1,
              money: 164667.19,
            },
            {
              total: 2,
              money: 169065.0,
            },
            {
              total: 1,
              money: 169100.0,
            },
            {
              total: 1,
              money: 170000.0,
            },
            {
              total: 1,
              money: 175000.0,
            },
            {
              total: 1,
              money: 179000.0,
            },
            {
              total: 1,
              money: 179000.05,
            },
            {
              total: 1,
              money: 179990.0,
            },
            {
              total: 1,
              money: 183000.0,
            },
            {
              total: 1,
              money: 184060.16,
            },
            {
              total: 1,
              money: 185578.71,
            },
            {
              total: 1,
              money: 190000.0,
            },
            {
              total: 1,
              money: 192000.0,
            },
            {
              total: 1,
              money: 192432.0,
            },
            {
              total: 19,
              money: 200000.0,
            },
            {
              total: 1,
              money: 210000.0,
            },
            {
              total: 1,
              money: 215000.0,
            },
            {
              total: 2,
              money: 220000.0,
            },
            {
              total: 1,
              money: 230000.0,
            },
            {
              total: 1,
              money: 240000.0,
            },
            {
              total: 2,
              money: 249100.0,
            },
            {
              total: 2,
              money: 250000.0,
            },
            {
              total: 1,
              money: 251509.05,
            },
            {
              total: 2,
              money: 260000.0,
            },
            {
              total: 3,
              money: 280000.0,
            },
            {
              total: 1,
              money: 291654.0,
            },
            {
              total: 5,
              money: 300000.0,
            },
            {
              total: 2,
              money: 317000.0,
            },
            {
              total: 2,
              money: 343200.0,
            },
            {
              total: 2,
              money: 370000.0,
            },
            {
              total: 1,
              money: 373289.0,
            },
            {
              total: 1,
              money: 373289.39,
            },
            {
              total: 1,
              money: 380000.0,
            },
            {
              total: 2,
              money: 395000.0,
            },
            {
              total: 3,
              money: 400000.0,
            },
            {
              total: 1,
              money: 429552.0,
            },
            {
              total: 1,
              money: 450000.0,
            },
            {
              total: 1,
              money: 475000.0,
            },
            {
              total: 1,
              money: 495000.0,
            },
            {
              total: 4,
              money: 500000.0,
            },
            {
              total: 1,
              money: 530000.0,
            },
            {
              total: 3,
              money: 600000.0,
            },
            {
              total: 1,
              money: 621509.05,
            },
            {
              total: 4,
              money: 650000.0,
            },
            {
              total: 6,
              money: 700000.0,
            },
            {
              total: 1,
              money: 725000.0,
            },
            {
              total: 2,
              money: 750000.0,
            },
            {
              total: 2,
              money: 800000.0,
            },
            {
              total: 1,
              money: 850000.0,
            },
            {
              total: 2,
              money: 900000.0,
            },
            {
              total: 1,
              money: 904000.0,
            },
            {
              total: 1,
              money: 944374.78,
            },
            {
              total: 4,
              money: 950000.0,
            },
            {
              total: 1,
              money: 990000.0,
            },
            {
              total: 1,
              money: 996650.0,
            },
            {
              total: 1,
              money: 996656.04,
            },
            {
              total: 23,
              money: 1000000.0,
            },
            {
              total: 2,
              money: 1150000.0,
            },
            {
              total: 2,
              money: 1200000.0,
            },
            {
              total: 1,
              money: 1491000.0,
            },
            {
              total: 2,
              money: 1500000.0,
            },
            {
              total: 2,
              money: 1600000.0,
            },
            {
              total: 2,
              money: 1700000.0,
            },
            {
              total: 1,
              money: 1710614.0,
            },
            {
              total: 2,
              money: 1800000.0,
            },
            {
              total: 16,
              money: 2000000.0,
            },
            {
              total: 1,
              money: 2000009.0,
            },
            {
              total: 1,
              money: 2015466.67,
            },
            {
              total: 1,
              money: 2016000.0,
            },
            {
              total: 1,
              money: 2050000.0,
            },
            {
              total: 1,
              money: 2100000.0,
            },
            {
              total: 2,
              money: 3400000.0,
            },
            {
              total: 1,
              money: 4400000.0,
            },
            {
              total: 5,
              money: 4900000.0,
            },
            {
              total: 1,
              money: 5000000.0,
            },
          ],
          box: {
            fouIn: [
              225.65,
              1.13,
              0.07,
              2700.0,
              0.69,
              1000.0,
              1.08,
              2000000.0,
              50000.0,
              1.07,
              0.09,
              35642.0,
              1.07,
              0.28,
              1000.0,
              39780.0,
              30000.0,
              2700.0,
              200000.0,
              300000.0,
              1.08,
              395000.0,
              14500.0,
              43200.0,
              29966.67,
              0.03,
              0.14,
              0.02,
              140000.0,
              300000.0,
              43000.0,
              25000.0,
              0.04,
              159448.5,
              179000.05,
              904000.0,
              1800000.0,
              0.3,
              280000.0,
              0.61,
              249100.0,
              30000.0,
              10000.0,
              0.18,
              2000000.0,
              185578.71,
              1.06,
              162344.0,
              6500.0,
              90000.0,
              0.02,
              0.14,
              100000.0,
              0.78,
            ],
            sixIn: [
              100.14,
              1.32,
              0.05,
              3.45,
              50000.0,
              0.49,
              0.05,
              0.23,
              50000.0,
              0.35,
              4116.0,
              200000.0,
              0.14,
              300000.0,
              2380.0,
              0.27,
              0.77,
              34.03,
              0.29,
              6667.0,
              0.39,
              0.27,
              0.26,
              0.07,
              944374.78,
              0.05,
              0.65,
              23367.43,
              100000.0,
              0.02,
              2528.0,
              0.39,
              50000.0,
              1.17,
              0.2,
              500.0,
              10000.0,
              1.08,
              0.04,
            ],
            fouOut: [
              5000.0,
              2730.0,
              -2730.0,
              7894.0,
              400.0,
              100.0,
              7740.0,
              2310.0,
              2730.0,
              180.0,
              100.0,
              10998.0,
              7635.0,
              10000.0,
              35642.0,
              400000.0,
              34000.0,
              74.87,
              180.0,
              100.0,
              48000.0,
              3300.0,
              1000000.0,
              400.0,
              100.0,
              23367.43,
              200000.0,
              184060.16,
              1000000.0,
              29966.67,
              100000.0,
              135000.0,
              14500.0,
              29966.67,
              20000.0,
              640.0,
              1000000.0,
              400000.0,
              183000.0,
              2090.0,
              2000.0,
              2008.0,
              5000.0,
              10000.0,
              10000.0,
              280000.0,
              680.0,
              215000.0,
              29966.67,
              0.54,
              10000.0,
              680.0,
              640.0,
              179000.0,
              2000.0,
              500.0,
              10000.0,
              1000.0,
              2000000.0,
              1800000.0,
              60000.0,
              6000.0,
              11371.29,
              72000.0,
              29000.0,
              18366.67,
              50000.0,
              5040.0,
              3000.0,
              1239.8,
              656.8,
              59859.0,
              249100.0,
              1000000.0,
              700.0,
              5000.0,
              157100.0,
              5.0,
              580.0,
            ],
            oneIn: [
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              3400000.0,
              0.18,
              50000.0,
              50000.0,
              1150000.0,
              50000.0,
              2.59,
              2.59,
              1150000.0,
              0.18,
              3400000.0,
              28988.0,
              29966.67,
              2000000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              5000.0,
              0.18,
              317000.0,
              5.0,
              429552.0,
              30000.0,
              200000.0,
              0.7,
              50000.0,
              291654.0,
              10000.0,
              60000.0,
              5000000.0,
              996650.0,
              1600000.0,
              50000.0,
              16800.0,
              2000000.0,
              2000000.0,
              10.0,
              50000.0,
              30000.0,
            ],
            sevOut: [
              256.0,
              50000.0,
              69.0,
              61.0,
              60.0,
              50000.0,
              55.0,
              100.0,
              59.0,
              187.9,
              10000.0,
              50000.0,
              2050000.0,
              50000.0,
              55.0,
              28.0,
              100.0,
              187.9,
              29966.67,
              850.0,
              59.0,
              69.0,
              61.0,
              50000.0,
              256.0,
              50000.0,
            ],
            sevIn: [
              0.89,
              1.36,
              1.17,
              2.15,
              0.43,
              50000.0,
              0.11,
              0.1,
              0.85,
              0.04,
              4.16,
              0.12,
              29966.67,
              5000.0,
              0.08,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              17.41,
              0.05,
              0.53,
              0.28,
              0.39,
            ],
            oneOut: [
              500.0,
              100.0,
              100000.0,
              2000.0,
              950000.0,
              800000.0,
              1000000.0,
              300.0,
              650000.0,
              650000.0,
              750000.0,
              0.5,
              300.0,
              300.0,
              300.0,
              500.0,
              2000.0,
              0.5,
              0.52,
              950000.0,
              800000.0,
              100.0,
              1000000.0,
              29000.0,
              29966.67,
              100000.0,
              650000.0,
              1700000.0,
              300000.0,
              650000.0,
              750000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              3000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              10000.0,
              50000.0,
              10000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              136240.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              13533.33,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              2.5,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              50000.0,
              880.0,
              3800.0,
              5.0,
              1500.0,
              530000.0,
              179990.0,
              12229.44,
              230000.0,
              3012.0,
              680.0,
              1.0,
              317000.0,
              200000.0,
              14855.6,
              436.0,
              29966.67,
              2000.0,
              50000.0,
              50000.0,
              710.35,
              50000.0,
              19910.0,
              7000.0,
              10000.0,
              33732.0,
              3048.0,
              1000000.0,
              545.0,
              10000.0,
              3215.0,
              200000.0,
              1000000.0,
              1000000.0,
              60028.0,
              1000000.0,
              1000000.0,
              1600000.0,
              996656.04,
              395000.0,
              50000.0,
              2000000.0,
              2000009.0,
              16800.0,
              0.05,
              5000.0,
              5000.0,
              20000.0,
              35358.0,
            ],
            thrOut: [
              70000.0,
              190000.0,
              14744.0,
              3313.0,
              29966.67,
              1710614.0,
              4000.0,
              27066.67,
              4224.0,
              2000.0,
              28000.0,
              29966.67,
              260000.0,
              5000.0,
              1078.0,
              2300.0,
              3950.0,
              2000000.0,
              3582.77,
              239.2,
              15000.0,
              29966.67,
              43400.0,
              750.0,
              16433.33,
              2000000.0,
              23000.0,
              45000.0,
              110000.0,
              15000.0,
              35000.0,
              1200000.0,
              900000.0,
              10345.0,
              990000.0,
              2000000.0,
              4000.0,
              2000.0,
              700000.0,
              200000.0,
              2000000.0,
              15466.67,
              300000.0,
              100000.0,
              680.0,
              200000.0,
              500000.0,
              1.0,
              29580.0,
              29967.0,
              700000.0,
              3273.0,
              948.6,
              16554.4,
              9468.0,
              38000.0,
              10000.0,
              47164.0,
              20000.0,
              4800.0,
              1000000.0,
            ],
            sixOut: [
              50000.0,
              50000.0,
              50000.0,
              1000.0,
              526.4,
              13800.0,
              2221.0,
              850.0,
              155245.0,
              50000.0,
              50000.0,
              29000.0,
              50000.0,
              45000.0,
              50000.0,
              50000.0,
              280.0,
              9819.0,
              100.0,
              2900.0,
              3332.0,
              686.0,
              0.31,
              17.8,
              100.0,
              373289.39,
              10000.0,
              371.0,
              200.0,
              2336.0,
              50.0,
              8120.0,
              20000.0,
              12305.0,
              3057.0,
              20000.0,
              30405.54,
              51094.19,
              850000.0,
              247.0,
              10000.0,
              16723.04,
              14848.0,
              50000.0,
              10044.0,
              45247.17,
              5000.0,
              720.0,
              100.0,
              50000.0,
              20000.0,
              100.0,
            ],
            thrIn: [
              4400000.0,
              30000.0,
              100000.0,
              14000.0,
              27000.0,
              0.5,
              2000000.0,
              12000.0,
              4800.0,
              9.72,
              50000.0,
              0.19,
              260000.0,
              1.49,
              203.02,
              29850.0,
              2000000.0,
              0.05,
              2.04,
              0.41,
              337.25,
              0.09,
              500000.0,
              2016000.0,
              200000.0,
              2000000.0,
              1.31,
              29000.0,
              1200000.0,
              210000.0,
              2000000.0,
              2015466.67,
              6000.0,
              0.43,
              700000.0,
              0.57,
              28.39,
              0.53,
              0.08,
              0.01,
              0.01,
              29967.0,
              0.53,
              6.03,
              3000.0,
              0.57,
              1.06,
              700000.0,
              0.01,
              0.01,
              0.01,
              3000.0,
              1000000.0,
            ],
            fivIn: [
              50000.0,
              0.07,
              0.02,
              2.73,
              0.44,
              200000.0,
              0.97,
              0.33,
              380000.0,
              0.08,
              5.08,
              3897.0,
              42.19,
              0.33,
              0.07,
              9075.0,
              50000.0,
              0.01,
              3000.0,
              4900000.0,
              2.8,
              100000.0,
              50000.0,
              621509.05,
              0.47,
              50000.0,
              200000.0,
              50000.0,
              0.33,
              12.52,
              50000.0,
              50000.0,
              28033.33,
              163373.0,
              0.77,
              50000.0,
              6200.0,
              50000.0,
              220000.0,
              29966.67,
              135000.0,
              1.74,
              192000.0,
              15000.0,
              300.0,
              0.4,
              700000.0,
              29000.0,
              600000.0,
              10000.0,
              0.56,
              101.23,
              150000.0,
              0.28,
              950000.0,
              0.27,
              30000.0,
              0.43,
              21000.0,
              126441.0,
              0.12,
              42.81,
            ],
            towOut: [
              4900000.0,
              200000.0,
              30000.0,
              170000.0,
              1500000.0,
              1500.0,
              1700000.0,
              100.0,
              10000.0,
              100.0,
              1.0,
              250000.0,
              200000.0,
              3000.0,
              725000.0,
              100.0,
              2000.0,
              1000.0,
              2000.0,
              100.0,
              10000.0,
              17066.7,
              1.17,
              3000.0,
              1000000.0,
              1200.0,
              940.47,
              50000.0,
              3000.0,
              700000.0,
              5000.0,
              1000.0,
              160000.0,
              100000.0,
              3500.0,
              1000000.0,
              6594.0,
              50000.0,
              16684.44,
              200000.0,
              5000.0,
              6200.0,
              14500.0,
              1.45,
              11843.0,
              343200.0,
              4000.0,
              17680.0,
              169065.0,
              500000.0,
              6908.0,
              29966.67,
              4900000.0,
              150000.0,
              627.0,
              414.0,
              1500.0,
              8000.0,
              241.0,
              3041.0,
              680.0,
              495000.0,
              10018.0,
              30000.0,
              80000.0,
              12566.67,
              12925.0,
              1400.0,
              1491000.0,
              2000.0,
              500000.0,
              4656.48,
              2000.0,
              30000.0,
              100000.0,
            ],
            fivOut: [
              150000.0,
              390.0,
              250.0,
              29000.0,
              22.0,
              50000.0,
              20.0,
              660.0,
              24.0,
              10000.0,
              2322.06,
              30000.0,
              1541.0,
              9.6,
              50000.0,
              1012.72,
              1000000.0,
              75000.0,
              24.7,
              30000.0,
              25000.0,
              104.0,
              10000.0,
              39780.0,
              370000.0,
              4000.0,
              120000.0,
              30000.0,
              61200.0,
              50000.0,
              251509.05,
              0.19,
              0.5,
              27432.38,
              1000000.0,
              100000.0,
              680.0,
              1040.0,
              1500.0,
              200000.0,
              1012.72,
              163373.0,
              28033.33,
              50000.0,
              700.0,
              43200.0,
              1180.0,
              175000.0,
              7000.0,
              192432.0,
              5000.0,
              10000.0,
              22.0,
              29966.67,
              950000.0,
              100000.0,
              900000.0,
              29000.0,
              850.0,
              24.7,
              29000.0,
              2081.96,
              9.6,
              49000.0,
              1000000.0,
              29966.67,
              50000.0,
              1000000.0,
              1700.0,
              200000.0,
              600000.0,
              60000.0,
              29966.67,
              164667.19,
              2000.0,
              450000.0,
              24.0,
              919.4,
              10000.0,
              29000.0,
              8226.0,
              7000.0,
              5177.0,
              280000.0,
              220000.0,
            ],
            towIn: [
              200000.0,
              30000.0,
              4900000.0,
              50000.0,
              1000000.0,
              1500000.0,
              2100000.0,
              169065.0,
              475000.0,
              1000000.0,
              100000.0,
              1.14,
              250000.0,
              200000.0,
              0.01,
              400000.0,
              1.14,
              0.87,
              17066.7,
              1.0,
              1000000.0,
              0.09,
              0.01,
              5.83,
              100000.0,
              240000.0,
              200000.0,
              169100.0,
              373289.0,
              0.1,
              30000.0,
              14500.0,
              20000.0,
              8859.66,
              0.09,
              1000000.0,
              0.01,
              4900000.0,
              3892.0,
              0.25,
              370000.0,
              30000.0,
              0.38,
              0.58,
              2.05,
              37.02,
              600000.0,
              3.03,
              1.3,
              7.93,
              2000000.0,
              0.01,
              3000.0,
              0.16,
              3.0,
              343200.0,
              1.17,
            ],
          },
        },
      };
      // 散点图
      let scatterData = [];
      for (let key in res.data.scatter) {
        let arr = [];
        arr.push(res.data.scatter[key].total);
        arr.push(res.data.scatter[key].money);
        scatterData.push(arr);
      }
      this.getScatter(scatterData);
      // 箱体图
      let boxData = {
        inData: [
          res.data.box.oneIn,
          res.data.box.towIn,
          res.data.box.thrIn,
          res.data.box.fouIn,
          res.data.box.fivIn,
          res.data.box.sixIn,
          res.data.box.sevIn,
        ],
        outData: [
          res.data.box.oneOut,
          res.data.box.towOut,
          res.data.box.thrOut,
          res.data.box.fouOut,
          res.data.box.fivOut,
          res.data.box.sixOut,
          res.data.box.sevOut,
        ],
      };
      this.getBox(boxData);
    },
    //  人员地区切换
    togglePeopleOrLocation(flag) {
      this.toggleData = flag;
      /*
			发送请求 flag true交易人员 false发生地
			*/
      let people = {
        code: 200,
        msg: null,
        data: [
          {
            count: 10,
            province_name: '辽宁',
          },
          {
            count: 4,
            province_name: '吉林',
          },
          {
            count: 30,
            province_name: '山西',
          },
          {
            count: 15,
            province_name: '内蒙古',
          },
          {
            count: 24,
            province_name: '新疆',
          },
          {
            count: 14,
            province_name: '西藏',
          },
          {
            count: 34,
            province_name: '北京',
          },
          {
            count: 44,
            province_name: '浙江',
          },
          {
            count: 17,
            province_name: '海南',
          },
          {
            count: 27,
            province_name: '广西',
          },
          {
            count: 31,
            province_name: '云南',
          },
          {
            count: 47,
            province_name: '福建',
          },
          {
            count: 12,
            province_name: '黑龙江',
          },
          {
            count: 38,
            province_name: '辽宁',
          },
          {
            count: 4,
            province_name: '四川',
          },
          {
            count: 41,
            province_name: '青海',
          },
        ],
      };
      let site = {
        code: 200,
        msg: null,
        data: [
          {
            source: '山东',
            target: '四川',
          },
          {
            source: '山西',
            target: '北京',
          },
          {
            source: '河北',
            target: '新疆',
          },
        ],
      };
      let data = flag ? people : site;
      this.getMap(data, flag);
    },
    getMap(mapData, type) {
      console.log(mapData, type);
      let myChart = this.$echarts.init(this.$refs.map);
      this.$echarts.registerMap('china', china);
      let geoCoordMap = {};
      /*获取地图数据*/
      myChart.showLoading();
      let mapFeatures = this.$echarts.getMap('china').geoJson.features;
      myChart.hideLoading();
      mapFeatures.forEach(function(v) {
        // 地区名称
        let name = v.properties.name;
        // 地区经纬度
        geoCoordMap[name] = v.properties.cp;
      });
      let data;
      let lineData;
      if (type) {
        lineData = [];
        // 交易人员地图数据
        data = mapData.data.map((items) => ({
          name: items.province_name,
          value: items.count,
        }));
      } else {
        data = [];
        // 飞线图数据
        let source = mapData.data.map((items) => ({
          name: items.source,
          value: [],
        }));
        let target = mapData.data.map((items) => ({
          name: items.target,
          value: [],
        }));
        source = convertData(source);
        target = convertData(target);
        lineData = source.map((items, index) => ({
          coords: [
            [items.value[0], items.value[1]],
            [target[index].value[0], target[index].value[1]],
          ],
        }));
      }
      function convertData(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value),
            });
          }
        }
        console.log(res);
        return res;
      }
      let option = {
        tooltip: {
          padding: 0,
          enterable: true,
          transitionDuration: 1,
          textStyle: {
            color: '#000',
            decoration: 'none',
          },
          formatter: function(params) {
            let { name, value } = params;
            return (typeof value === 'number' ? value : value[2]) > 0
              ? ` <div >
          <div
            style="
              background: rgba(0, 0, 0, 0.60);
              border-radius: 4px 4px 0px 0px;
               color: #fff;
               line-height:30px;
                padding:0 10px;

            "
          >
            <span style="background: #F62157; display: inline-block; height: 6px; width: 6px; margin-right: 8px; border-radius: 50%;"></span>涉案人数：${
              typeof value === 'number' ? value : value[2]
            }人
          </div>
        </div>`
              : '';
          },
        },
        geo: {
          map: 'china',
          show: true,
          roam: false,
          label: {
            emphasis: {
              show: false,
            },
          },
          layoutSize: '100%',
          itemStyle: {
            normal: {},
          },
        },
        series: [
          {
            name: '散点',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            rippleEffect: {
              brushType: 'stroke',
            },
            showEffectOn: 'render',
            data: convertData(data),

            symbolSize: function(val) {
              return val[2] / 2 <= 12 ? 12 : val[2];
            },
            label: {
              normal: {
                show: true,
                color: '#fff',
                fontWeight: 'bold',
                position: 'inside',
                formatter: function(para) {
                  return '{cnNum|' + para.data.value[2] + '}';
                },
                rich: {
                  cnNum: {
                    fontSize: 8,
                    color: '#fff',
                  },
                },
              },
              emphasis: {
                show: false,
              },
            },
            itemStyle: {
              normal: {
                color: 'rgba(246,33,87, .5)',
              },
            },
          },
          {
            type: 'map',
            map: 'china',
            aspectScale: 0.75,
            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: '#fff',
                },
              },
            },
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
            animation: false,
            data,
          },
          {
            name: '线路',
            type: 'lines',
            coordinateSystem: 'geo',
            zlevel: 2,
            large: true,
            effect: {
              show: true,
              period: 10, //箭头指向速度，值越小速度越快
              trailLength: 0, //特效尾迹长度[0,1]值越大，尾迹越长重
              symbol: 'arrow', //箭头图标
              symbolSize: 6, //图标大小
            },
            lineStyle: {
              normal: {
                color: '#fff',
                width: 0.7,
                opacity: 0.6,
                curveness: 0.4,
              },
            },
            data: lineData,
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener('resize', function() {
        myChart.resize();
      });
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
            {
              name: '进账金额',
              icon: 'pin',
            },
            {
              name: '出账金额',
              icon: 'pin',
            },
            {
              name: '进账次数',
              icon: '',
            },
            {
              name: '出账次数',
              icon: '',
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
            // max: 400000,
            // interval: 100000,
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
            // max: 60,
            // interval: 15,
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
            {
              name: '进账金额',
              icon: 'pin',
            },
            {
              name: '出账金额',
              icon: 'pin',
            },
            {
              name: '进账次数',
              icon: '',
            },
            {
              name: '出账次数',
              icon: '',
            },
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
            // max: 400000,
            // interval: 100000,
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
            // max: 60,
            // interval: 15,
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
    getScatter(data) {
      console.log(data);
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
          formatter: function(params) {
            return (
              '交易金额：' +
              params.data[1] +
              '<br/>' +
              '交易次数：' +
              params.data[0]
            );
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
          // max: 400000,
          // interval: 100000,
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
              // icon:
              //   'image://' + require('../../../../../assets/imgs/DownIcon.png'),
              icon: 'image://' + require('../../assets/logo.png'),
              title: '下载',
              iconStyle: {},
              pixelRatio: 1,
            },
            myFull: {
              show: true,
              title: '全屏查看',
              // icon:
              //   'image://' +
              //   require('../../../../../assets/imgs/FullScreen.png'),
              icon: 'image://' + require('../../assets/logo.png'),
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
            symbolSize: 8,
            data,
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
    getBox(boxData) {
      let myChart = this.$echarts.init(this.$refs.box);
      this.$echarts.dataTool = require('echarts/extension/dataTool');
      let option;
      let data = this.$echarts.dataTool.prepareBoxplotData(boxData.inData);
      let data2 = this.$echarts.dataTool.prepareBoxplotData(boxData.outData);
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
            {
              name: '进账',
              icon: 'roundRect',
            },
            {
              name: '出账',
              icon: 'roundRect',
            },
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
              icon: 'image://' + require('../../assets/logo.png'),
              // icon:
              //   'image://' + require('../../../../../assets/imgs/DownIcon.png'),
              title: '下载',
              iconStyle: {},
              pixelRatio: 1,
            },
            myFull: {
              show: true,
              title: '全屏查看',
              icon: 'image://' + require('../../assets/logo.png'),
              // icon:
              //   'image://' +
              //   require('../../../../../assets/imgs/FullScreen.png'),
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
          // name: '数量',
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
            name: '进账',
            type: 'boxplot',
            data: data.boxData,
            barBorderRadius: ' 8px 8px 0px 0px',
            tooltip: {
              formatter: function(param) {
                return [
                  '日期 ' + param.name + ': ',
                  '交易金额: ' + param.data,
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
            name: '出账',
            type: 'boxplot',
            data: data2.boxData,
            tooltip: {
              formatter: function(param) {
                return [
                  '日期 ' + param.name + ': ',
                  '交易金额: ' + param.data,
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
