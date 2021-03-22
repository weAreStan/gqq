<template>
  <div class="analyse-info-wrap">
    <!-- 上面三个 -->
    <div class="analyse-info-top">
      <!-- 黑名单 -->
      <div class="analyse-info-top-blacklist analyse-info-top-items">
        <!-- 标题 -->
        <div class="analyse-info-title-wrap">
          <span class="analyse-info-title-top-icon"></span>
          <h3 class="analyse-info-title">黑名单</h3>
        </div>
        <!-- 表单 -->
        <a-table
          class="analyse-info-top-table"
          :columns="columns1"
          :data-source="blackTableList"
          :pagination="false"
        >
          <span slot="name" style=" color: #363637;" slot-scope="text">
            <a-icon
              type="down"
              style="margin-right: 15px; height: 13.5px; width: 14px;"
            />
            {{ text }}</span
          >
        </a-table>
      </div>
      <!-- 地图外层 -->
      <div class="analyse-info-top-datamap analyse-info-top-items">
        <!-- 嫌疑主题分布 -->
        <div class="analyse-info-map-theme">嫌疑主题分布</div>
        <!-- 标题 -->
        <div class="analyse-info-title-wrap">
          <span class="analyse-info-title-top-icon"></span>
          <h3 class="analyse-info-title">数据地图</h3>
        </div>
        <!-- 地图 -->
        <div
          style="margin-top: 10px; width:100%;height: 93.8%; background: #fff;"
          ref="map"
        ></div>
      </div>
      <!-- 历史碰撞 -->
      <div class="analyse-info-top-history analyse-info-top-items">
        <!-- 标题 -->
        <div class="analyse-info-title-wrap">
          <span class="analyse-info-title-top-icon"></span>
          <h3 class="analyse-info-title">黑名单</h3>
        </div>
        <!-- 表单 -->
        <a-table
          class="analyse-info-top-table"
          :columns="columns2"
          :data-source="data2"
          :pagination="false"
        >
          <span slot="name" style=" color: #363637;" slot-scope="text">
            {{ text }}</span
          >
          <span slot="num" style="color: #363637;" slot-scope="text">
            <span style="color: #777777;">涉嫌 </span>
            {{ text }}</span
          >
          <span slot="class" style="color: #178DFB" slot-scope="text">
            <span style="color: #777;">等</span>{{ text }}
          </span>
        </a-table>
      </div>
    </div>
    <!-- 下面两个 -->
    <div class="analyse-info-bottom">
      <div class="analyse-info-bottom-suspects">
        <!-- 下方标题 -->
        <div class="analyse-info-title-wrap analyse-info-title-suspects-wrap">
          <span
            class="analyse-info-title-top-icon analyse-info-title-bottom-icon"
          ></span>
          <h3 class="analyse-info-title">嫌疑人预测</h3>
        </div>
        <!-- 下方表单 -->
        <a-table
          class="analyse-info-top-table analyse-info-bottom-table"
          :columns="columns3"
          :data-source="data3"
          :pagination="false"
        >
          <span slot="percentage" style=" color: tomato;" slot-scope="text">
            {{ text }}</span
          >
          <span slot="name" style="color: #363637;" slot-scope="text">
            {{ text }}</span
          >
          <span slot="tags" slot-scope="tags">
            <a-tag
              v-for="tag in tags"
              :key="tag"
              style="color: #777777;"
              color="#CEE7FF"
            >
              {{ tag }}
            </a-tag>
          </span>
        </a-table>
      </div>
      <div class="analyse-info-bottom-gang">
        <!-- 下方标题 -->
        <div class="analyse-info-title-wrap analyse-info-title-suspects-wrap">
          <span
            class="analyse-info-title-top-icon analyse-info-title-bottom-icon"
          ></span>
          <h3 class="analyse-info-title">团伙预测</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import china from 'echarts/map/json/china.json';
import { blackList } from '../api/analysisOverview';

export default {
  name: 'App',
  data() {
    return {
      // 携带的参数
      params: {
        // 接收参数的id
        caseId: '',
        // 更新时间
        updateTime: '',
      },
      blackTableList: [],
      data2: [
        {
          key: '1',
          name: '孙悟空',
          num: 'xx恐怖活动案…',
          class: '20个案例',
        },
        {
          key: '2',
          name: '孙悟空',
          num: 'xx恐怖活动案…',
          class: '20个案例',
        },
        {
          key: '3',
          name: '孙悟空',
          num: 'xx恐怖活动案…',
          class: '20个案例',
        },
        {
          key: '4',
          name: '孙悟空',
          num: 'xx恐怖活动案…',
          class: '20个案例',
        },
        {
          key: '5',
          name: '孙悟空',
          num: 'xx恐怖活动案…',
          class: '20个案例',
        },
        {
          key: '6',
          name: '孙悟空',
          num: 'xx恐怖活动案…',
          class: '20个案例',
        },
        {
          key: '7',
          name: '孙悟空',
          num: 'xx恐怖活动案…',
          class: '20个案例',
        },
        {
          key: '8',
          name: '孙悟空',
          num: 'xx恐怖活动案…',
          class: '20个案例',
        },
        {
          key: '9',
          name: '孙悟空',
          num: 'xx恐怖活动案…',
          class: '20个案例',
        },
      ],
      data3: [
        {
          key: '1',
          percentage: '96%',
          name: '孙悟空',
          num: 62220202212171478,
          tags: ['高额大笔', '关联对手多', '过渡账户'],
        },
        {
          key: '2',
          percentage: '96%',
          name: '孙悟空',
          num: 62220202212171478,
          tags: ['高额大笔', '关联对手多', '过渡账户'],
        },
        {
          key: '3',
          percentage: '96%',
          name: '孙悟空',
          num: 62220202212171478,
          tags: ['高额大笔', '关联对手多', '过渡账户'],
        },
        {
          key: '4',
          percentage: '96%',
          name: '孙悟空',
          num: 62220202212171478,
          tags: ['高额大笔', '关联对手多', '过渡账户'],
        },
        {
          key: '5',
          percentage: '96%',
          name: '孙悟空',
          num: 62220202212171478,
          tags: ['高额大笔', '关联对手多', '过渡账户'],
        },
        {
          key: '6',
          percentage: '96%',
          name: '孙悟空',
          num: 62220202212171478,
          tags: ['高额大笔', '关联对手多', '过渡账户'],
        },
        {
          key: '7',
          percentage: '96%',
          name: '孙悟空',
          num: 62220202212171478,
          tags: ['高额大笔', '关联对手多', '过渡账户'],
        },
        {
          key: '8',
          percentage: '96%',
          name: '孙悟空',
          num: 62220202212171478,
          tags: ['高额大笔', '关联对手多', '过渡账户'],
        },
        {
          key: '9',
          percentage: '96%',
          name: '孙悟空',
          num: 62220202212171478,
          tags: ['高额大笔', '关联对手多', '过渡账户'],
        },
      ],
      columns1: [
        {
          title: '嫌疑主体',
          dataIndex: 'name',
          key: 'name',
          className: 'title-class',
          scopedSlots: { customRender: 'name' },
        },
        {
          title: '证件号码',
          dataIndex: 'num',
          className: 'title-class',
          key: 'num',
        },
        {
          title: '类罪',
          dataIndex: 'class',
          className: 'title-class',
          key: 'class',
        },
      ],
      columns2: [
        {
          title: '嫌疑主体',
          dataIndex: 'name',
          key: 'name',
          className: 'title-class',
          scopedSlots: { customRender: 'name' },
        },
        {
          title: '嫌疑主体',
          dataIndex: 'num',
          className: 'title-class',
          key: 'num',
          scopedSlots: { customRender: 'num' },
        },
        {
          dataIndex: 'class',
          className: 'title-class',
          key: 'class',
          scopedSlots: { customRender: 'class' },
        },
      ],
      columns3: [
        {
          title: '犯罪程度',
          dataIndex: 'percentage',
          key: 'percentage',
          className: 'title-class',
          scopedSlots: { customRender: 'percentage' },
        },
        {
          title: '嫌疑主体',
          dataIndex: 'name',
          className: 'title-class',
          key: 'name',
          scopedSlots: { customRender: 'name' },
        },
        {
          title: '证件号码',
          dataIndex: 'num',
          className: 'title-class',
          key: 'class',
        },
        {
          dataIndex: 'tags',
          className: 'tag-class',
          key: 'tags',
          scopedSlots: { customRender: 'tags' },
        },
      ],
    };
  },
  created() {
    // 这里赋值caseId和更新时间
    this.params.caseId = '';
  },
  mounted() {
    this.map();
    this.getAllListData();
  },
  methods: {
    // 获取所有列表数据
    async getAllListData() {
      let params = Object.assign({}, this.params);
      // 获取黑名单列表
      let blackListData = await blackList(params);
      console.log(blackListData.data);
      if (blackListData.data.status === 200) {
        this.blackTableList = blackListData.data.data;
      }
      console.log(this.blackTableList);
    },
    // echarts地图
    map() {
      let myChart = this.$echarts.init(this.$refs.map);
      this.$echarts.registerMap('china', china);
      let mapName = 'china';
      let data = [
        { name: '北京', value: 199 },
        { name: '天津', value: 42 },
        { name: '河北', value: 102 },
        { name: '山西', value: 81 },
        { name: '内蒙古', value: 47 },
        { name: '辽宁', value: 67 },
        { name: '吉林', value: 82 },
        { name: '黑龙江', value: 123 },
        { name: '上海', value: 24 },
        { name: '江苏', value: 92 },
        { name: '浙江', value: 114 },
        { name: '安徽', value: 109 },
        { name: '福建', value: 116 },
        { name: '江西', value: 91 },
        { name: '山东', value: 119 },
        { name: '河南', value: 137 },
        { name: '湖北', value: 116 },
        { name: '湖南', value: 114 },
        { name: '重庆', value: 91 },
        { name: '四川', value: 125 },
        { name: '贵州', value: 62 },
        { name: '云南', value: 83 },
        { name: '西藏', value: 9 },
        { name: '陕西', value: 80 },
        { name: '甘肃', value: 56 },
        { name: '青海', value: 10 },
        { name: '宁夏', value: 18 },
        { name: '新疆', value: 50 },
        { name: '广东', value: 123 },
        { name: '广西', value: 59 },
        { name: '海南', value: 14 },
      ];
      let geoCoordMap = {};
      /*获取地图数据*/
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
      myChart.setOption({
        tooltip: {
          trigger: 'item',
        },
        color: ['#9037AA', '#E45240', '#F39C39', '#F7DC00'],
        legend: {
          x: 'right',
          padding: [10, 20, 0, 0],
          top: 15,
          data: ['非法集资', '地下钱庄', '电信诈骗', '恐怖活动'],
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
            emphasis: {
              areaColor: '#0499d0',
            },
          },
        },
        series: [
          {
            name: '非法集资',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(data),
            symbolSize: function(val) {
              return val[2] / 10;
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
          },
          {
            name: '地下钱庄',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(data),
            symbolSize: function(val) {
              return val[2] / 10;
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
          },
          {
            name: '电信诈骗',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(data),
            symbolSize: function(val) {
              return val[2] / 10;
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
          },
          {
            name: '恐怖活动',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(data),
            symbolSize: function(val) {
              return val[2] / 10;
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
          },
        ],
      });
      window.addEventListener('resize', function() {
        myChart.resize();
      });
    },
  },
};
</script>

<style lang="less">
.analyse-info-wrap {
  padding: 15px 20px 30px;
  background: #eef4fd;
  min-width: 1200px;
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
      width: 3px;
      height: 16px;
      margin-right: 5px;
      background-color: red;
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
    // 上面里面的三个
    .analyse-info-top-items {
      width: 28.1%;
    }
    // 地图
    .analyse-info-top-datamap {
      width: 42.4%;
      position: relative;
      // 嫌疑主题分布
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
    // 上方表单
    .analyse-info-top-table {
      background-color: #fff;
      margin-top: 10px;
    }
  }
  // 下方外层
  .analyse-info-bottom {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    // 标题icon
    .analyse-info-title-bottom-icon {
      background-color: red;
      border-radius: 50%;
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

      // 下方表单
      .analyse-info-bottom-table {
        margin-top: 10px;
      }
    }
    // 团伙预测
    .analyse-info-bottom-gang {
      background-color: #fff;
      width: 55%;
    }
  }
}
</style>
