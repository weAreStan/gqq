<!--
 * @Author: 477
 * @Date: 2021-03-10 10:02:30
 * @LastEditTime: 2021-04-14 16:28:49
 * @LastEditors: Please set LastEditors
 * @Description: 分析概况
 * @FilePath: \guidance\src\views\dataAnalysis\common\survey.vue
-->
<template>
  <div class="analyse-info-wrap">
    <!-- 上面三个标题 -->
    <div class="analyse-info-top">
      <!-- 黑名单 -->
      <div class="analyse-info-top-blacklist analyse-info-top-items">
        <!-- 标题 -->
        <div class="analyse-info-title-wrap">
          <img src="../assets/logo.png" class="analyse-info-title-top-icon" />
          <h3 class="analyse-info-title">黑名单</h3>
        </div>
        <!-- 表单 -->

        <a-table
          class="analyse-info-top-table"
          :rowKey="(record) => record.suspectName"
          :columns="blackListColumns"
          :data-source="blackTableList"
          :pagination="false"
          :scroll="{ y: 400 }"
        >
          <span slot="suspectName" style="color: #363637" slot-scope="text">
            <img
              src="../assets/logo.png"
              style="margin-right: 15px; height: 13.5px; width: 14px"
            />
            {{ text }}</span
          >
        </a-table>
      </div>
      <!-- 地图外层 -->
      <div class="analyse-info-top-datamap analyse-info-top-items">
        <!-- 嫌疑主体分布 -->
        <div class="analyse-info-map-theme">嫌疑主体分布</div>
        <!-- 标题 -->
        <div class="analyse-info-title-wrap">
          <img src="../assets/logo.png" class="analyse-info-title-top-icon" />
          <h3 class="analyse-info-title">数据地图</h3>
        </div>
        <!-- 地图 -->
        <div
          style="margin-top: 10px; width: 100%; height: 93.8%; background: #fff"
          ref="map"
        ></div>
      </div>
      <!-- 历史碰撞 -->
      <div class="analyse-info-top-history analyse-info-top-items">
        <!-- 标题 -->
        <div class="analyse-info-title-wrap">
          <img src="../assets/logo.png" class="analyse-info-title-top-icon" />
          <h3 class="analyse-info-title">历史碰撞</h3>
        </div>
        <!-- 表单 -->
        <a-table
          class="analyse-info-top-table"
          :columns="historyCollisionListColumns"
          :rowKey="(record) => record.suspectName"
          :data-source="historyCollisionTableList"
          :pagination="false"
          :scroll="{ y: 400 }"
        >
          <span slot="suspectName" style="color: #363637" slot-scope="text">
            {{ text }}</span
          >
          <span slot="content" style="color: #363637" slot-scope="text">
            <span style="color: #777777">涉嫌 </span>
            {{ text }}</span
          >
          <!-- 点击出现弹窗 -->
          <span
            slot="count"
            style="color: #178dfb; cursor: pointer"
            slot-scope="text, record"
            @click="histor_admol_show(record)"
          >
            <span style="color: #777">等</span>{{ text + '个案例' }}
          </span>
        </a-table>
      </div>
    </div>
    <!-- 下面两个 -->
    <div class="analyse-info-bottom">
      <div class="analyse-info-bottom-suspects">
        <!-- 下方标题 -->
        <div class="analyse-info-title-wrap analyse-info-title-suspects-wrap">
          <img
            src="../assets/logo.png"
            class="analyse-info-title-top-icon analyse-info-title-bottom-icon"
          />
          <h3 class="analyse-info-title">嫌疑人预测</h3>
        </div>
        <!-- 下方表单 -->
        <a-table
          class="analyse-info-top-table analyse-info-bottom-table"
          :rowKey="(record) => record.suspectName"
          :columns="suspectForecastListColumns"
          :data-source="suspectForecastTableList"
          :pagination="false"
          :scroll="{ y: 295 }"
        >
          <span slot="percent" style="color: tomato" slot-scope="text">
            {{ text }}</span
          >
          <span slot="suspectName" style="color: #363637" slot-scope="text">
            {{ text }}</span
          >
          <span slot="tags" slot-scope="tags">
            <a-tag
              v-for="tag in tags"
              :key="tag"
              style="color: #777777"
              color="#CEE7FF"
            >
              {{ tag }}
            </a-tag>
          </span>
        </a-table>
      </div>
      <!-- 团伙预测 -->
      <div class="analyse-info-bottom-gang">
        <!-- 下方标题 -->
        <div class="analyse-info-title-wrap analyse-info-title-suspects-wrap">
          <img
            src="../assets/logo.png"
            class="analyse-info-title-top-icon analyse-info-title-bottom-icon"
          />
          <h3 class="analyse-info-title">团伙预测</h3>
        </div>
      </div>
    </div>
    <!-- 弹窗 -->
    <div class="histoy_modal">
      <a-modal
        v-model="visible"
        title="历史碰撞"
        @ok="handleOk"
        :width="'600px'"
        :bodyStyle="{ height: '500px' }"
      >
        <!-- 第一部分 嫌疑主体 -->
        <div class="main_suspicion">
          <p class="main_name">
            嫌疑主体：<span
              class="blue_light"
              style="color: #1890ff; margin-left: 2px; cursor: pointer"
              @click="to_panorama"
              >{{ dilogName }}</span
            >
          </p>
        </div>
        <!-- 表格 -->
        <div class="suspicion_case" style="margin-top: 20px">
          <a-table
            class="suspicion_case"
            :columns="columns_case"
            :data-source="data_case"
            :pagination="false"
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
        </div>
        <div class="footer" style="margin-top: 30px; margin-left: 10px">
          <a-pagination
            @showSizeChange="onShowSizeChange"
            size="small"
            :total="sizeTotal"
            show-size-changer
            show-quick-jumper
            @change="footer_change"
            :pageSizeOptions="pageSizeOptions"
            :defaultPageSize="defaultPageSize"
            :show-total="(total) => `共 ${total} 条`"
          />
        </div>
        <!-- 1 -->

        <!-- 2 -->
      </a-modal>
    </div>
  </div>
</template>

<script>
import china from 'echarts/map/json/china.json';
// import {
//   blackList,
//   suspectForecastList,
//   historyCollisionList,
// } from "../../../api/analysisOverview";
export default {
  name: 'survey',
  data() {
    return {
      visible: false, // 弹窗状态
      sizeTotal: 0,
      pageSizeOptions: ['10', '12', '24', '30'],
      defaultPageSize: 12,
      pageNum: 12, // 每页显示数量
      pageIndex: 1, // 分页索引
      dilogName: '',
      params: {
        // 接收参数的id
        caseId: '',
        // 更新时间
        updateTime: '',
      },
      // 接收参数的id
      caseId: '',
      // 更新时间
      updateTime: '2021-03-02 18:00:00',
      // 黑名单列表数据
      blackTableList: [],
      // 历史碰撞
      historyCollisionTableList: [],
      // 嫌疑人预测
      suspectForecastTableList: [],
      data1: [
        {
          key: '1',
          name: '蔡*姬',
          num: 62220202212171478,
          class: '走私假币',
        },
        {
          key: '2',
          name: '蔡*姬',
          num: 62220202212171478,
          class: '走私假币',
        },
        {
          key: '3',
          name: '蔡*姬',
          num: 62220202212171478,
          class: '走私假币',
        },
        {
          key: '4',
          name: '蔡*姬',
          num: 62220202212171478,
          class: '走私假币',
        },
        {
          key: '5',
          name: '蔡*姬',
          num: 62220202212171478,
          class: '走私假币',
        },
        {
          key: '6',
          name: '蔡*姬',
          num: 62220202212171478,
          class: '走私假币',
        },
        {
          key: '7',
          name: '蔡*姬',
          num: 62220202212171478,
          class: '走私假币',
        },
        {
          key: '8',
          name: '蔡*姬',
          num: 62220202212171478,
          class: '走私假币',
        },
        {
          key: '9',
          name: '蔡*姬',
          num: 62220202212171478,
          class: '走私假币',
        },
      ],
      blackListColumns: [
        {
          title: '嫌疑主体',
          dataIndex: 'suspectName',
          key: 'suspectName',
          className: 'title-class',
          scopedSlots: {
            customRender: 'suspectName',
          },
        },
        {
          title: '证件号码',
          dataIndex: 'idCard',
          className: 'title-class',
          key: 'idCard',
        },
        {
          title: '类罪',
          dataIndex: 'tags',
          className: 'title-class',
          key: 'tags',
        },
      ],
      historyCollisionListColumns: [
        {
          title: '嫌疑主体',
          dataIndex: 'suspectName',
          key: 'suspectName',
          className: 'title-class',
          scopedSlots: {
            customRender: 'suspectName',
          },
        },
        {
          title: '涉嫌案件',
          dataIndex: 'content',
          className: 'title-class',
          key: 'content',
          scopedSlots: {
            customRender: 'content',
          },
        },
        {
          dataIndex: 'count',
          className: 'title-class',
          key: 'count',
          scopedSlots: {
            customRender: 'count',
          },
        },
      ],
      data2: [
        {
          key: '1',
          name: '蔡*姬',
          num: 'xx恐怖活动案…',
          class: '20个案例',
        },
        {
          key: '2',
          name: '蔡*姬',
          num: 'xx恐怖活动案…',
          class: '20个案例',
        },
        {
          key: '3',
          name: '蔡*姬',
          num: 'xx恐怖活动案…',
          class: '20个案例',
        },
        {
          key: '4',
          name: '蔡*姬',
          num: 'xx恐怖活动案…',
          class: '20个案例',
        },
        {
          key: '5',
          name: '蔡*姬',
          num: 'xx恐怖活动案…',
          class: '20个案例',
        },
        {
          key: '6',
          name: '蔡*姬',
          num: 'xx恐怖活动案…',
          class: '20个案例',
        },
        {
          key: '7',
          name: '蔡*姬',
          num: 'xx恐怖活动案…',
          class: '20个案例',
        },
        {
          key: '8',
          name: '蔡*姬',
          num: 'xx恐怖活动案…',
          class: '20个案例',
        },
        {
          key: '9',
          name: '蔡*姬',
          num: 'xx恐怖活动案…',
          class: '20个案例',
        },
      ],
      suspectForecastListColumns: [
        {
          title: '犯罪程度',
          dataIndex: 'percent',
          key: 'percent',
          className: 'title-class',
          scopedSlots: {
            customRender: 'percent',
          },
        },
        {
          title: '嫌疑主体',
          dataIndex: 'suspectName',
          className: 'title-class',
          key: 'suspectName',
          scopedSlots: {
            customRender: 'suspectName',
          },
        },
        {
          title: '证件号码',
          dataIndex: 'idCard',
          className: 'title-class',
          key: 'idCard',
        },
        {
          dataIndex: 'tags',
          className: 'tag-class',
          key: 'tags',
          scopedSlots: {
            customRender: 'tags',
          },
        },
      ],
      data3: [
        {
          key: '1',
          percentage: '96%',
          name: '蔡*姬',
          num: 62220202212171478,
          tags: ['高额大笔', '关联对手多', '过渡账户'],
        },
        {
          key: '2',
          percentage: '96%',
          name: '蔡*姬',
          num: 62220202212171478,
          tags: ['高额大笔', '关联对手多', '过渡账户'],
        },
        {
          key: '3',
          percentage: '96%',
          name: '蔡*姬',
          num: 62220202212171478,
          tags: ['高额大笔', '关联对手多', '过渡账户'],
        },
        {
          key: '4',
          percentage: '96%',
          name: '蔡*姬',
          num: 62220202212171478,
          tags: ['高额大笔', '关联对手多', '过渡账户'],
        },
        {
          key: '5',
          percentage: '96%',
          name: '蔡*姬',
          num: 62220202212171478,
          tags: ['高额大笔', '关联对手多', '过渡账户'],
        },
        {
          key: '6',
          percentage: '96%',
          name: '蔡*姬',
          num: 62220202212171478,
          tags: ['高额大笔', '关联对手多', '过渡账户'],
        },
        {
          key: '7',
          percentage: '96%',
          name: '蔡*姬',
          num: 62220202212171478,
          tags: ['高额大笔', '关联对手多', '过渡账户'],
        },
        {
          key: '8',
          percentage: '96%',
          name: '蔡*姬',
          num: 62220202212171478,
          tags: ['高额大笔', '关联对手多', '过渡账户'],
        },
        {
          key: '9',
          percentage: '96%',
          name: '蔡*姬',
          num: 62220202212171478,
          tags: ['高额大笔', '关联对手多', '过渡账户'],
        },
      ],
      columns_case: [
        {
          title: '涉嫌案件',
          dataIndex: 'case_supi',
          key: 'case_supi',
          className: 'title-class',
          scopedSlots: {
            customRender: 'case_supi',
          },
        },
        {
          title: '简要案情',
          dataIndex: 'simple',
          className: 'title-class',
          key: 'simple',
        },
      ],
      data_case: [
        {
          key: '1',
          case_supi: 'xx传销案',
          simple: '这个案情的简要介绍是这样的...',
        },
        {
          key: '2',
          case_supi: 'xx虚开发票案',
          simple: '这个案情的简要介绍是这样的...',
        },
        {
          key: '3',
          case_supi: 'xx传销案',
          simple: '这个案情的简要介绍是这样的...',
        },
        {
          key: '4',
          case_supi: 'xx虚开发票案',
          simple: '这个案情的简要介绍是这样的...',
        },
        {
          key: '5',
          case_supi: 'xx传销案',
          simple: '这个案情的简要介绍是这样的...',
        },
      ],
    };
  },
  created() {
    // 这里赋值caseId和更新时间
    this.params.caseId = '';
  },
  mounted() {
    // this.caseInfo = JSON.parse(sessionStorage.getItem("baseObj"));
    // this.caseId = JSON.parse(sessionStorage.getItem("baseObj")).id;
    this.map();
    // this.blankLIst()
    // this.historyList()
    // this.suspectList()
    // this.getAllListData();
  },
  methods: {
    // 获取黑名单列表
    blankLIst() {
      let param = {
        caseId: this.caseId,
        updateTime: this.updateTime,
      };
      blackList(param).then((res) => {
        this.blackTableList = res.data.data;
      });
    },
    //  历史碰撞列表
    historyList() {
      let param = {
        caseId: this.caseId,
        updateTime: this.updateTime,
      };
      historyCollisionList(param).then((res) => {
        this.historyCollisionTableList = res.data.data;
      });
    },
    // 嫌疑人预测列表
    suspectList() {
      let param = {
        caseId: this.caseId,
        updateTime: this.updateTime,
      };
      suspectForecastList(param).then((res) => {
        this.suspectForecastTableList = res.data.data;
      });
    },
    // echarts地图
    map() {
      // 发送请求获取地图数据
      let res = {
        code: 200,
        msg: null,
        data: [
          {
            area: '上海',
            tags: [
              {
                total: 1,
                tag: 'tag4',
              },
              {
                total: 3,
                tag: 'tag2',
              },
              {
                total: 5,
                tag: 'tag1',
              },
            ],
          },
          {
            area: '重庆',
            tags: [
              {
                total: 1,
                tag: 'tag1',
              },
              {
                total: 2,
                tag: 'tag5',
              },
              {
                total: 1,
                tag: 'tag3',
              },
              {
                total: 3,
                tag: 'tag2',
              },
              {
                total: 1,
                tag: 'tag4',
              },
            ],
          },
        ],
      };
      let data = res.data.map((items) => ({
        name: items.area,
        value: items.tags.reduce((pre, cur) => (pre += cur.total), 0),
      }));
      let tipData = res.data;
      console.log(tipData);
      let myChart = this.$echarts.init(this.$refs.map);
      // 地图
      this.$echarts.registerMap('china', china);
      let mapName = 'china';
      let geoCoordMap = {};
      // 获取地图数据
      myChart.showLoading();
      let mapFeatures = this.$echarts.getMap(mapName).geoJson.features;
      myChart.hideLoading();
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
      // let convertedData = [
      //   convertData(data),
      //   convertData(
      //     data
      //       .sort(function (a, b) {
      //         return b.value - a.value;
      //       })
      //       .slice(0, 6)
      //   ),
      // ];
      myChart.setOption({
        tooltip: {
          padding: 0,
          enterable: true,
          transitionDuration: 1,
          textStyle: {
            color: '#000',
            decoration: 'none',
          },
          formatter: function(params) {
            console.log(params);
            let tipHtml = '';
            let tagText = '';
            let tags = tipData.find((items) => items.area === params.name);
            tags &&
              tags.tags.forEach((items) => {
                tagText += `<p>${items.total}个${items.tag}</p>`;
              });
            tipHtml = ` <div style="width: 140px;height:30px">
          <div
            style="
              background: rgba(0, 0, 0, 0.60);
              border-radius: 4px 4px 0px 0px;
               color: #fff;
               line-height:30px;
                padding-left:10px

            "
          >
            嫌疑主体分部
          </div>
          <div
            style="
              background: rgba(0, 0, 0, 0.5);
              border-radius: 0px 0px 4px 4px;
              color: #fff;
              line-height:30px;
              padding-left:10px
            "
          >
            ${tagText}
          </div>
        </div>`;
            return tags && tipHtml;
          },
        },

        // selfButtons: {
        //   // 自定义按钮
        //   show: true, // 是否显示
        //   title: "自定义", // 鼠标移动上去显示的文字
        //   icon: "test.png", //  ？
        //   option: {},
        //   onclick: function (option1) {
        //     //  点击事件 这里的option1是echarts的option信息
        //     alert("1"); // 这里可以处理相应逻辑
        //   },
        // },
        // color: ["#9037AA", "#E45240", "#F39C39", "#F7DC00"],
        // legend: {
        //   x: "right",
        //   padding: [10, 20, 0, 0],
        //   top: 15,
        //   data: ["非法集资", "地下钱庄", "电信诈骗", "恐怖活动"],
        // },
        visualMap: {
          show: false,
          min: 0,
          max: 200,
          left: '10%',
          top: 'bottom',
          calculable: true,
          seriesIndex: [1],
          inRange: {
            color: ['#0074FF', '#5199FF'], // 蓝绿
          },
        },
        geo: {
          show: true,
          map: mapName,
          label: {
            normal: {
              show: false,
            },
            emphasis: {
              show: false,
            },
          },
          roam: false,
          itemStyle: {
            normal: {
              areaColor: '#4499d0',
              borderColor: '#023677',
            },
          },
        },
        series: [
          {
            name: '散点',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(data),
            symbolSize: function(val) {
              return val[2];
            },
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true,
              },
              emphasis: {
                show: true,
              },
            },
            itemStyle: {
              normal: {
                color: 'tomato',
              },
            },
          },
          {
            type: 'map',
            map: mapName,
            geoIndex: 0,
            aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: true,
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: '#fff',
                },
              },
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: '#031525',
                borderColor: '#3B5077',
              },
              emphasis: {
                areaColor: '#2B91B7',
              },
            },
            animation: false,
            data: data,
          },
        ],
      });
      window.addEventListener('resize', function() {
        myChart.resize();
      });
    },
    histor_admol_show(record) {
      console.log(record, 'text');
      this.dilogName = record.suspectName;
      this.visible = true;
    },
    // 弹框点击确定的时候
    handleOk() {
      this.visible = false;
    },
    onShowSizeChange(pageIndex, pageNum) {
      this.pageNum = pageNum;
    },
    footer_change(pageIndex, pageNum) {
      this.pageIndex = pageIndex;
      // 写的死数据？
      this.pageNum = 12;
    },
    // 去全景侦查
    to_panorama() {
      this.$router.push({
        path: '/panoramicReconnaissance',
      });
    },
    // 去案件详情
    to_case_detail() {
      this.$router.push({
        path: '/caseDetails',
      });
    },
  },
};
</script>
<style lang="less" scoped>
.analyse-info-wrap {
  padding: 15px 20px 30px;
  background: #eef4fd;
  min-width: 1300px;

  // overflow: auto;
  // 修改表头背景颜色
  .ant-table-thead > tr > th {
    background-color: #f8fbff;
  }

  .tag-class {
    text-align: right;
  }

  // 移入背景颜色
  .ant-table-tbody
    > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected)
    > td {
    background: #f3f9ff;
  }

  // 表头颜色
  .title-class {
    color: #7e7e7e;
  }

  // 标题外层
  .analyse-info-title-wrap {
    display: flex;
    align-items: center;

    // icon图标
    .analyse-info-title-top-icon {
      width: 10px;
      height: 16px;
      margin-right: 5px;
      // background-color: red;
    }

    // 标题文字
    .analyse-info-title {
      font-family: PingFangSC-Semibold;
      font-size: 16px;
      color: #353535;
      margin: 0;
    }
  }

  // 上面外层
  .analyse-info-top {
    display: flex;
    justify-content: space-between;

    .analyse-info-top-blacklist {
      box-sizing: border-box;
      padding-left: 15px;
      padding-right: 15px;
      height: 490px;
      background: #ffffff;
      box-shadow: 0 0 20px 0 rgba(24, 144, 255, 0.1);
      border-radius: 4px;
    }

    // 上面里面的三个
    .analyse-info-top-items {
      width: 28.1%;
    }

    // 地图
    .analyse-info-top-datamap {
      width: 42.4%;
      position: relative;
      background: #ffffff;
      box-shadow: 0 0 20px 0 rgba(24, 144, 255, 0.1);
      border-radius: 4px;
      height: 490px;

      // 嫌疑主体分布
      .analyse-info-map-theme {
        position: absolute;
        z-index: 10;
        top: 50px;
        left: 15px;
        cursor: pointer;
        background: #1890ff;
        color: #fff;
        border-radius: 4px;
        border-radius: 4px;
        padding: 4px 14px;
      }
    }

    .analyse-info-top-history {
      background: #ffffff;
      box-shadow: 0 0 20px 0 rgba(24, 144, 255, 0.1);
      border-radius: 4px;
      height: 490px;
    }

    // 上方表单
    .analyse-info-top-table {
      background-color: #fff;
      margin-top: 10px;
      // width: 90%;
      height: 430px;
      // height: 450px;
      // overflow: auto;
    }
  }

  // 下方外层
  .analyse-info-bottom {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    height: 400px;

    // 标题icon
    .analyse-info-title-bottom-icon {
      width: 15px;
      height: 15px;
    }

    // 下方标题
    .analyse-info-title-suspects-wrap {
      padding: 20px 0 0 20px;
    }

    // 嫌疑人预测
    .analyse-info-bottom-suspects {
      width: 44.4%;
      background-color: #fff;

      // height: 400px;
      // 下方表单
      .analyse-info-bottom-table {
        margin-top: 10px;
        height: 329px;
      }
    }

    // 团伙预测
    .analyse-info-bottom-gang {
      background-color: #fff;
      width: 55%;
    }
  }

  .histoy_modal {
    .main_suspicion {
      color: #363637;
    }
  }
}
</style>
