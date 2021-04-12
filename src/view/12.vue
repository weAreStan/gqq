<template>
  <div class="full-view-detect-wrap">
    <!-- 搜索区 -->
    <header class="full-view-detect-search-wrap">
      <div class="full-view-detect-search-to">
        <a-form layout="inline" :form="searchData">
          <a-form-item label="查询范围：">
            <a-select
              allowClear
              placeholder="请选择案件"
              @change="changeHandle($event, 'scope')"
              style="width: 200px;"
            >
              <a-select-option
                v-for="items in scopeList"
                :key="items.value"
                :value="items.value"
              >
                {{ items.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="查询对象：">
            <a-select
              allowClear
              v-model="searchData.searchObj"
              @change="changeHandle($event, 'obj')"
              style="width: 200px;"
            >
              <a-select-option
                v-for="items in searchObjList"
                :key="items.value"
                :value="items.value"
              >
                {{ items.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item style="position: relative;">
            <a-input
              placeholder="请输入"
              v-model.trim="searchData.searchObjContent"
              style="width: 320px;  padding-right: 40px;"
            />
            <span
              @click="toSearch"
              style="position: absolute; cursor: pointer; top: 50%; transform: translateY(-50%); right: 0px; width: 40px; height: 32px;"
            >
              <a-icon
                type="search"
                style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color:#1890FF;"
              />
            </span>
          </a-form-item>
        </a-form>
      </div>
      <a-button
        @click="exportHandle"
        type="primary"
        class="full-view-detect-search-export"
      >
        <a-icon type="export" />
        导出
      </a-button>
    </header>
    <!-- 内容区 -->
    <section class="full-view-detect-content-wrap">
      <!-- 上方信息 -->
      <div class="full-view-detect-content-top">
        <div class="full-view-detect-content-top-detail-wrap">
          <div class="full-view-detect-content-top-detail-left">
            <div class="full-view-detect-content-top-detail-left-icon">
              <img src="../assets/logo.png" alt="" width="80px" />
            </div>
            <ul class="full-view-detect-content-top-detail-left-tag">
              <li
                class="full-view-detect-content-top-detail-left-tag-items"
                v-for="(items, index) in tagList"
                :key="items.id"
                @mouseenter="enterTag(items)"
                @mouseleave="leaveTag(items)"
              >
                <p :class="items.class">{{ items.tag }}</p>
                <p v-show="items.show" class="hoverClass">
                  <span
                    v-for="(detail, index) in items.detailList"
                    :key="index"
                    >{{ detail }}</span
                  >
                </p>
              </li>
            </ul>
          </div>
          <ul class="full-view-detect-content-top-detail-right">
            <li class="full-view-detect-content-top-detail-right-items">
              <span class="title">公司名称：</span>
              <span class="name">xxxxxx有限责任公司</span>
            </li>
            <li class="full-view-detect-content-top-detail-right-items">
              <span class="title">社会机构代码码：</span>
              <span class="name">114de s3012419850919103x</span>
            </li>
            <li class="full-view-detect-content-top-detail-right-items">
              <span class="title">注册登记地址：</span>
              <span class="name">北京市xxx区xxx路xxx街道xxxx号</span>
            </li>
            <li class="full-view-detect-content-top-detail-right-items">
              <span class="title">经营范围：</span>
              <span class="name">暂无</span>
            </li>
            <li class="full-view-detect-content-top-detail-right-items">
              <span class="title">注册资金：</span>
              <span class="name">300万</span>
            </li>
            <li class="full-view-detect-content-top-detail-right-items">
              <span class="title">所属税务园区：</span>
              <span class="name">暂无</span>
            </li>
            <li class="full-view-detect-content-top-detail-right-items">
              <span class="title">所属税务专员：</span>
              <span class="name">暂无</span>
            </li>
            <li class="full-view-detect-content-top-detail-right-items">
              <span class="title">所属税务专员：</span>
              <span class="name">暂无</span>
            </li>
            <li class="full-view-detect-content-top-detail-right-items">
              <span class="title">所属税务专员：</span>
              <span class="name">暂无</span>
            </li>
            <li class="full-view-detect-content-top-detail-right-items">
              <span class="title">所属税务专员：</span>
              <span class="name">暂无</span>
            </li>
          </ul>
          <img
            class="full-view-detect-content-top-detail-img"
            src="../assets/QJZC1.png"
            width="100%"
            style="height: 11px;"
            alt=""
          />
        </div>
        <div class="full-view-detect-content-top-carousel-wrap">
          <div class="full-view-detect-content-top-carousel-title-wrap">
            <h3 class="full-view-detect-content-top-carousel-title">
              开户行数量
              <span class="num">2</span>
            </h3>
            <h3 class="full-view-detect-content-top-carousel-title">
              银行卡数量
              <span class="num">5</span>
            </h3>
          </div>
          <div class="swiper-container-wrap">
            <!-- 轮播图 -->
            <div class="swiper-container" ref="swiper">
              <div class="swiper-wrapper">
                <div
                  class="swiper-slide"
                  v-for="(items, index) in 10"
                  :key="index"
                >
                  <ul class="swiper-content">
                    <li class="swiper-content-inner">
                      <img
                        style="width: 22px; height: 22px;"
                        src="../assets/logo.png"
                        alt=""
                      />
                      <h3 class="swiper-content-caption">建设银行</h3>
                    </li>
                    <li class="swiper-content-inner">
                      <span class="swiper-content-title">交易次数：</span>
                      <span class="swiper-content-value">2</span>
                    </li>
                    <li class="swiper-content-inner">
                      <span class="swiper-content-value"
                        >43012419850919103x</span
                      >
                    </li>
                    <li class="swiper-content-inner">
                      <span class="swiper-content-title">出账次数：</span>
                      <span class="swiper-content-value">1</span>
                    </li>
                    <li class="swiper-content-inner">
                      <span class="swiper-content-title">开户行：</span>
                      <span class="swiper-content-value">建设银行</span>
                    </li>
                    <li class="swiper-content-inner">
                      <span class="swiper-content-title">出账次数：</span>
                      <span class="swiper-content-value">3</span>
                    </li>
                    <li class="swiper-content-inner">
                      <span class="swiper-content-title">开户地：</span>
                      <span class="swiper-content-value"
                        >43012419850919103x</span
                      >
                    </li>
                    <li class="swiper-content-inner">
                      <span class="swiper-content-title">进账金额：</span>
                      <span class="swiper-content-value">100,000,000</span>
                    </li>
                    <li class="swiper-content-inner">
                      <span class="swiper-content-title">银行卡类型：</span>
                      <span class="swiper-content-value">一类</span>
                    </li>
                    <li class="swiper-content-inner">
                      <span class="swiper-content-title">出账金额：</span>
                      <span class="swiper-content-value">100,000,000</span>
                    </li>
                    <li class="swiper-content-inner"></li>
                    <li class="swiper-content-inner">
                      <span class="swiper-content-title">进出账差额：</span>
                      <span class="swiper-content-value">0</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- 如果需要导航按钮 -->
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
          </div>
        </div>
      </div>
      <!-- 资金流向 -->
      <div class="fund-flow">
        <div class="fund-flow-title trastion_title">
          <img src="../assets/logo.png" class="trasion_img" />
          <h3 class="transtion_h3">资金流向</h3>
        </div>
        <div class="fund-charts"></div>
      </div>
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
          <div
            class="trisation-items-box-right trisation-items-box-items"
          ></div>
        </div>
        <div class="trisation-items-box">
          <div class="trisation-items-box-left trisation-items-box-items"></div>
          <div
            class="trisation-items-box-right trisation-items-box-items"
          ></div>
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
                  style="color: #1890FF; font-weight: bold;"
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
                  style="color: #1890FF; font-weight: bold;"
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
                  style="color: #1890FF; font-weight: bold;"
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
    </section>
  </div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/css/swiper.css';
import china from 'echarts/map/json/china.json';

export default {
  data() {
    return {
      tagList: [
        {
          id: 0,
          class: 'tag1',
          tag: '可疑空壳公司',
          show: false,
          detailList: ['xxx案件', 'xxxxxxx案件'],
        },
        {
          id: 1,
          class: 'tag2',
          tag: '可能真人卡',
          show: false,
          detailList: ['xxx案件', 'xxxxxxx案件'],
        },
        {
          id: 2,
          class: 'tag2',
          tag: '可疑财会人员',
          show: false,
          detailList: ['xxx案件', 'xxxxxxx案件'],
        },
        {
          id: 3,
          class: 'tag3',
          tag: '可疑变票公司',
          show: false,
          detailList: ['xxx案件', 'xxxxxxx案件'],
        },
        {
          id: 4,
          class: 'tag3',
          tag: '可疑变票公司',
          show: false,
          detailList: ['xxx案件', 'xxxxxxx案件'],
        },
        {
          id: 5,
          class: 'tag3',
          tag: '可疑变票公司',
          show: false,
          detailList: ['xxx案件', 'xxxxxxx案件'],
        },
        {
          id: 6,
          class: 'tag3',
          tag: '可疑变票公司',
          show: false,
          detailList: ['xxx案件', 'xxxxxxx案件'],
        },
        {
          id: 7,
          class: 'tag3',
          tag: '可疑变票公司',
          show: false,
          detailList: ['xxx案件', 'xxxxxxx案件'],
        },
        {
          id: 8,
          class: 'tag3',
          tag: '可疑变票公司',
          show: false,
          detailList: ['xxx案件', 'xxxxxxx案件'],
        },
        {
          id: 9,
          class: 'tag3',
          tag: '可疑变票公司',
          show: false,
          detailList: ['xxx案件', 'xxxxxxx案件'],
        },
        {
          id: 10,
          class: 'tag3',
          tag: '可疑变票公司',
          show: false,
          detailList: ['xxx案件', 'xxxxxxx案件'],
        },
      ],
      toggleData: true, // 交易人员交易发生地切换
      searchData: {
        scope: '',
        searchObj: 0,
        searchObjContent: '',
      },
      scopeList: [
        {
          label: 'xxxx案0',
          value: 0,
        },
        {
          label: 'xxxx案1',
          value: 1,
        },
        {
          label: 'xxxx案2',
          value: 2,
        },
      ],
      searchObjList: [
        {
          label: '主体',
          value: 0,
        },
        {
          label: '个人',
          value: 1,
        },
        {
          label: '公司',
          value: 2,
        },
      ],
    };
  },
  mounted() {
    this.getMyEcharts();
    this.getSeconedEcharts();
    this.getScatter();
    this.getBox();
    this.getMap();
    this.swiper();
  },
  methods: {
    // 鼠标移入标签
    enterTag(item) {
      item.show = true;
    },
    leaveTag(item) {
      item.show = false;
    },
    //  人员地区切换
    togglePeopleOrLocation(flag) {
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
              color: '#4DCC74',
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
              color: ' #F6AA3C',
            },
          },
          {
            name: '进账次数',
            type: 'line',
            yAxisIndex: 1,
            data: [15, 42, 23, 13, 13, 32, 13, 43, 32, 22, 43, 33],
            itemStyle: {
              color: '#92C5FF',
            },
          },
          {
            name: '出账次数',
            type: 'line',
            yAxisIndex: 1,
            data: [32, 33, 43, 46, 56, 32, 22, 13, 15, 32, 22, 33],
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
      }); // 随浏览器大小变化而变化
    },
    getBox() {
      let myChart = this.$echarts.init(this.$refs.box);
      this.$echarts.dataTool = require('echarts/extension/dataTool');
      let option;
      let data = this.$echarts.dataTool.prepareBoxplotData([
        [20, 13, 42, 21],
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
    swiper() {
      let mySwiper = new Swiper(this.$refs.swiper, {
        direction: 'horizontal',
        loop: true, // 循环模式选项
        slidesPerView: 3,
        slidesPerView: 'auto',
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    },
    // 两个下拉框
    changeHandle(value, type) {
      type === 'scope'
        ? value
          ? (this.searchData.scope = value)
          : (this.searchData.scope = '')
        : value
        ? (this.searchData.searchObj = value)
        : (this.searchData.searchObj = '');
    },
    // 搜索
    toSearch() {
      console.log(this.searchData);
    },
    // 导出
    exportHandle() {
      alert('export');
    },
  },
};
</script>

<style lang="less" scoped>
* {
  scrollbar-arrow-color: rgb(200, 200, 200);
  /*ok-上下三角箭头*/
  scrollbar-3dlight-color: rgb(200, 200, 200);
  /*ok-3d滑块左上角高光部分颜色*/
  scrollbar-highlight-color: rgb(200, 200, 200);
  /*ok-滑块左上角高光部分颜色*/
  scrollbar-shadow-color: rgb(200, 200, 200);
  /*ok*/
  scrollbar-darkshadow-color: rgb(200, 200, 200);
  /*ok-以上都是定义一些阴影高光等3D效果*/
  scrollbar-face-color: rgb(200, 200, 200);
  /*ok-滑块*/
  scrollbar-track-color: rgb(240, 240, 240);
  /*ok-滑道*/
}

/*chrome滚动条样式*/
::-webkit-scrollbar {
  /*滚动条整体部分，其中的属性有width,height,background,border（就和一个块级元素一样）等。*/
  width: 5px;
  height: 10px;
}

::-webkit-scrollbar-button {
  /*滚动条两端的按钮。可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果。*/
  display: none;
}

::-webkit-scrollbar-track {
  /*外层轨道。可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果。*/
  display: none;
}

::-webkit-scrollbar-track-piece {
  /*内层轨道，滚动条中间部分（除去）。*/
  background: rgb(240, 240, 240);
}

::-webkit-scrollbar-thumb {
  /*滚动条里面可以拖动的那部分*/
  background: rgb(200, 200, 200);
}

::-webkit-scrollbar-thumb:hover {
  /*滚动条里面可以拖动的那部分*/
  background: rgb(180, 180, 180);
}

::-webkit-scrollbar-corner {
  /*边角*/
  background: rgb(200, 200, 200);
}

::-webkit-scrollbar-resizer {
  /*定义右下角拖动块的样式*/
  background: rgb(200, 200, 200);
}
.full-view-detect-wrap {
  width: 100%;
  // 搜索区
  .full-view-detect-search-wrap {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    margin-bottom: 8px;
  }
  // 内容区
  .full-view-detect-content-wrap {
    width: 100%;
    height: 100%;
    background-color: rgb(240, 246, 255);
    padding: 15px 20px 30px;
    .full-view-detect-content-top {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 340px;
      margin-bottom: 20px;
      // background: url('../assets/QJZCimg.png') no-repeat;
      background-color: #3c3c3c;
      // background-size: cover;
      border-radius: 2px;
      padding: 10px;
      .full-view-detect-content-top-detail-wrap {
        padding-bottom: 11px;
        display: flex;
        position: relative;
        width: 35%;
        height: 320px;
        background-color: #fff;
        border-radius: 4px;
        .full-view-detect-content-top-detail-left {
          border-right: 2px solid #eaeef5;
          box-sizing: border-box;
          text-align: center;
          overflow: hidden;
          width: 35%;
          .full-view-detect-content-top-detail-left-icon {
            height: 120px;
            border-radius: 50%;
            & > img {
              margin-top: 9%;
              vertical-align: middle;
            }
          }
          .full-view-detect-content-top-detail-left-tag {
            display: flex;
            flex-wrap: wrap;
            overflow-y: auto;
            height: 180px;
            padding: 0 7%;
            justify-content: space-between;
            .full-view-detect-content-top-detail-left-tag-items {
              position: relative;
              width: 48%;
              // 移入标签菜单的样式
              .hoverClass {
                position: absolute;
                z-index: 9;
                display: flex;
                flex-direction: column;
                padding: 5px 0;
                height: 70px;
                background: #ffffff;
                box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
                border-radius: 4px;
                font-family: PingFangSC-Regular;
                font-size: 12px;
                width: 100%;
                color: #929292;
                & > span {
                  height: 50%;
                  width: 100%;
                  line-height: 200%;
                  cursor: pointer;
                  &:hover {
                    background: #f3f9ff;
                    color: #1890ff;
                  }
                }
              }
              .tag1,
              .tag2,
              .tag3 {
                width: 100%;
                overflow: hidden;
                cursor: pointer;
                height: 24px;
                border-radius: 4px;
                font-family: PingFangSC-Regular;
                font-size: 12px;
                box-sizing: border-box;
                line-height: 24px;
              }
              .tag1 {
                background: #fff0f6;
                border: 1px solid #ffdae9;
                color: #fe4d97;
              }
              .tag2 {
                background: #e3d9fc;
                border: 1px solid #d9c9ff;
                color: #7540ee;
              }
              .tag3 {
                background: #ffe2dc;
                border: 1px solid #ffcdc3;
                color: #ff7052;
              }
            }
          }
        }
        .full-view-detect-content-top-detail-right {
          overflow-y: auto;
          width: 65%;
          margin: 0;
          padding: 3%;
          .full-view-detect-content-top-detail-right-items {
            margin-bottom: 20px;
            display: flex;
            .title {
              width: 100px;
              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: #707070;
            }
            .name {
              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: #363637;
            }
          }
        }
      }
      .full-view-detect-content-top-detail-img {
        position: absolute;
        bottom: 0;
      }
      .full-view-detect-content-top-carousel-wrap {
        width: 64%;
        .full-view-detect-content-top-carousel-title-wrap {
          display: flex;
          padding-left: 3%;
          padding-top: 1%;
          .full-view-detect-content-top-carousel-title {
            margin: 0;
            margin-left: 3.5%;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #ffffff;
            &:first-child {
              margin: 0;
            }
            .num {
              color: #1890ff;
            }
          }
        }
        .swiper-container-wrap {
          width: 99%;
          position: relative;
          margin: 0 auto;
        }
        .swiper-container {
          height: 280px;
          padding-top: 1.5%;
          width: 95%;
          .swiper-slide {
            width: 38%;
            background: #ffffff;
            box-sizing: border-box;
            border: 1px solid #eaeef5;
            box-shadow: 0 0 20px 0 rgba(24, 144, 255, 0.1);
            background-image: linear-gradient(46deg, #eef4fd 0%, #ffffff 100%);
            border-radius: 10px;
            margin-right: 2%;
            .swiper-content {
              display: flex;
              padding: 5% 0 5% 4%;
              flex-wrap: wrap;
              .swiper-content-inner {
                display: flex;
                font-family: PingFangSC-Medium;
                font-size: 12px;
                width: 50%;
                height: 40px;
                .swiper-content-title {
                  color: #707070;
                }
                .swiper-content-value {
                  color: #363637;
                }
                .swiper-content-caption {
                  margin: 0;
                  margin-left: 6.5px;
                  color: #363637;
                }
              }
            }
          }
        }
        .swiper-button-next {
          right: 0;
        }
        .swiper-button-prev {
          left: 0;
        }
        .swiper-button-prev,
        .swiper-button-next {
          outline: none;
          background-color: rgba(43, 108, 217, 0.5);
          border-radius: 4px;
          height: 60px;
          width: 20px;
          &::after {
            font-size: 12px;
            color: #fff;
          }
        }
      }
    }
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
    // 资金流向
    .fund-flow {
      margin-bottom: 25px;
      width: 100%;
      background-color: #fff;
      height: 600px;
      .fund-flow-title {
        padding: 10px;
      }
      .fund-charts {
        height: 100%;
        width: 100%;
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
}
</style>
