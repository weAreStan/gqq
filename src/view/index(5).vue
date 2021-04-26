<!--
 * @Author: 勾青琼
 * @Date: 2021-03-04 18:13:32
 * @LastEditTime: 2021-04-24 19:05:47
 * @LastEditors: Please set LastEditors
 * @Description: 全景侦查
 * @FilePath: \guidance\src\views\panoramicReconnaissance\index.vue
-->
<template>
  <div class="full-view-detect-wrap">
    <!-- 搜索区 -->
    <header class="full-view-detect-search-wrap">
      <div class="full-view-detect-search-to">
        <a-form-model
          layout="inline"
          ref="ruleForm"
          :model="searchData"
          :rules="rules"
        >
          <a-form-model-item label="查询范围：" prop="scope">
            <a-select
              allowClear
              @change="changeHandle($event, 'scope')"
              placeholder="请选择案件"
              style="width: 200px"
            >
              <a-select-option
                v-for="items in scopeList"
                :key="items.value"
                :value="items.value"
              >
                {{ items.label }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="查询对象：" prop="searchObj">
            <a-select v-model="searchData.searchObj" style="width: 200px">
              <a-select-option
                v-for="items in searchObjList"
                :key="items.value"
                :value="items.value"
              >
                {{ items.label }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item style="position: relative" prop="searchObjContent">
            <a-input
              placeholder="请输入"
              v-model.trim="searchData.searchObjContent"
              style="width: 320px; padding-right: 40px"
            />
            <span
              @click="toSearch"
              style="
                position: absolute;
                cursor: pointer;
                top: 50%;
                transform: translateY(-50%);
                right: 0px;
                width: 40px;
                height: 32px;
              "
            >
              <a-icon
                type="search"
                style="
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  color: #1890ff;
                "
              />
            </span>
          </a-form-model-item>
        </a-form-model>
      </div>
      <a-button
        @click="exportHandle"
        type="primary"
        class="full-view-detect-search-export"
      >
        <i
          class="iconfont iconExportIocn"
          style="font-size: 14px; margin-right: 5px"
        ></i>
        <!-- <a-icon type="export" /> -->
        导出
      </a-button>
    </header>
    <!-- 内容区 -->
    <section v-if="searchData.searchObj" class="full-view-detect-content-wrap">
      <!-- 上方信息 -->
      <div class="full-view-detect-content-top">
        <div class="full-view-detect-content-top-detail-wrap">
          <!--  左边公司或者个人 -->
          <div class="full-view-detect-content-top-detail-left">
            <div class="full-view-detect-content-top-detail-left-icon">
              <!-- 之前的地址 -->
              <!-- src="../../assets/imgs/CompanyIcon.png" -->
              <img src="../assets/logo.png" alt="" width="80px" />
            </div>
            <ul
              class="full-view-detect-content-top-detail-left-tag"
              ref="tagContainer"
            >
              <li
                class="full-view-detect-content-top-detail-left-tag-items"
                ref="tags"
                v-for="(items, index) in tagList"
                :key="items.id"
                @mouseenter="enterTag(items, index)"
                @mouseleave="leaveTag(items)"
              >
                <p :class="items.class">{{ items.tag }}</p>
                <p v-show="items.show" class="hoverClass" ref="popup">
                  <span
                    v-for="(detail, index) in items.detailList"
                    :key="index"
                    >{{ detail }}</span
                  >
                </p>
              </li>
            </ul>
          </div>
          <!--  公司详情 -->
          <ul
            class="full-view-detect-content-top-detail-right"
            v-if="subject == 2"
          >
            <li class="full-view-detect-content-top-detail-right-items">
              <span class="title"> 公司名称： </span>
              <span class="name"> xxx有限责任公司 </span>
            </li>
            <li class="full-view-detect-content-top-detail-right-items">
              <span class="title"> 社会机构代码： </span>
              <span class="name"> 25468594120xx454xx </span>
            </li>
            <li class="full-view-detect-content-top-detail-right-items">
              <span class="title"> 注册登记地址： </span>
              <span class="name"> 北京市西城区xx路xx街道xxx号 </span>
            </li>
            <li class="full-view-detect-content-top-detail-right-items">
              <span class="title"> 注册登记地址： </span>
              <span class="name"> 北京市西城区xx路xx街道xxx号 </span>
            </li>
            <li class="full-view-detect-content-top-detail-right-items">
              <span class="title"> 经营范围： </span>
              <span class="name"> 暂无 </span>
            </li>
            <li class="full-view-detect-content-top-detail-right-items">
              <span class="title"> 注册资金 </span>
              <span class="name"> 300万 </span>
            </li>
            <li class="full-view-detect-content-top-detail-right-items">
              <span class="title"> 所属税务园区： </span>
              <span class="name"> 暂无 </span>
            </li>
          </ul>
          <!--  个人 -->
          <ul
            class="full-view-detect-content-top-detail-right"
            v-if="subject == 1"
          >
            <li class="full-view-detect-content-top-detail-right-items">
              <span class="title">姓名：</span>
              <span class="name">张xx </span>
            </li>
            <li class="full-view-detect-content-top-detail-right-items">
              <span class="title">证件号码：</span>
              <span class="name">50024219970515xxxx </span>
            </li>
            <li class="full-view-detect-content-top-detail-right-items">
              <span class="title">籍贯：</span>
              <span class="name">重庆 </span>
            </li>
            <li class="full-view-detect-content-top-detail-right-items">
              <span class="title">住址信息：</span>
              <span class="name">暂无 </span>
            </li>
            <li class="full-view-detect-content-top-detail-right-items">
              <span class="title">联系电话：</span>
              <span class="name">150959169xx </span>
            </li>
            <li class="full-view-detect-content-top-detail-right-items">
              <span class="title">工作单位：</span>
              <span class="name">北京 </span>
            </li>
          </ul>
          <!-- 之前的src -->
          <!-- src="../../assets/imgs/QJZC1.png" -->
          <img
            class="full-view-detect-content-top-detail-img"
            src="../assets/logo.png"
            alt=""
            width="100%"
            style="height: 11px; margin-left: -20px"
          />
        </div>
        <div class="full-view-detect-content-top-carousel-wrap">
          <div class="full-view-detect-content-top-carousel-title-wrap">
            <h3 class="full-view-detect-content-top-carousel-title">
              开户行数量
              <span class="num"> 2 </span>
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
                      <!-- 之前的src -->
                      <!-- src="../../assets/imgs/proDbanklogo.png" -->
                      <img
                        style="width: 22px; height: 22px"
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
                      <span class="swiper-content-value">520158987456</span>
                    </li>
                    <li class="swiper-content-inner">
                      <span class="swiper-content-title">出账次数：</span>
                      <span class="swiper-content-value">2</span>
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
                      <span class="swiper-content-value">北京</span>
                    </li>
                    <li class="swiper-content-inner">
                      <span class="swiper-content-title">进账金额：</span>
                      <span class="swiper-content-value">100，000，00</span>
                    </li>
                    <li class="swiper-content-inner">
                      <span class="swiper-content-title">银行卡类型：</span>
                      <span class="swiper-content-value">一类</span>
                    </li>
                    <li class="swiper-content-inner">
                      <span class="swiper-content-title">出账金额：</span>
                      <span class="swiper-content-value">100，000，00</span>
                    </li>
                    <li class="swiper-content-inner">
                      <span class="swiper-content-title">进出账差额：</span>
                      <span class="swiper-content-value">0</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- 左右导航按钮 -->
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
          </div>
        </div>
      </div>
      <!-- 资金流向 -->
      <div class="fund-flow">
        <div class="fund-flow-title trastion_title">
          <!-- 之前的img -->
          <!-- <img src="../../assets/imgs/DivisionImg.png" class="trasion_img" /> -->
          <img src="../assets/logo.png" class="trasion_img" />
          <h3 class="transtion_h3">资金流向</h3>
        </div>
        <div class="fund-charts"></div>
      </div>
      <!-- 交易时间特征 -->
      <div class="trisation_time">
        <div class="trastion_title">
          <!-- 之前的img -->
          <!-- <img src="../../assets/imgs/DivisionImg.png" class="trasion_img" /> -->
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
          <!-- 之前的图片 -->
          <!-- <img src="../../assets/imgs/DivisionImg.png" class="trasion_img" /> -->
          <img src="../assets/logo.png" class="trasion_img" />
          <h3 class="transtion_h3">交易金额特征</h3>
        </div>
        <!-- 散点图及箱形图 -->
        <div class="scatter_box">
          <!-- 散点图 -->
          <div class="scatter" ref="scatter"></div>
          <div class="box" ref="box"></div>
        </div>
      </div>
      <!-- 交易行为特征 -->
      <div class="trisation_action">
        <div class="trastion_title">
          <!-- 之前的图片 -->
          <!-- <img src="../../assets/imgs/DivisionImg.png" class="trasion_img" /> -->
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
        <div class="trisation-action-list"></div>
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
    <h1 class="tipInfo" v-else>请选择查询对象</h1>
  </div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/css/swiper.css';
import china from 'echarts/map/json/china.json';
// import {
//   getTagList,
//   getInfoList,
//   getBankCardList,
// } from "../../api/overallView";
export default {
  data() {
    return {
      rules: {
        topList: {},
        scope: {
          required: true,
          message: '请选择查询范围',
          trigger: 'blur',
        },
        // searchObj: {
        //   required: true,
        //   message: '',
        //   trigger: 'blur',
        // },
        searchObjContent: {
          required: true,
          message: '请输入卡号',
          trigger: 'blur',
        },
      },
      subject: '',
      tagList: [],
      infoData: {},
      bankCardList: [],
      // 案件id和主体
      dataInfo: {},
      params: {},
      searchData: {
        scope: '',
        searchObj: 0,
        searchObjContent: '',
      },
      // 查询范围数组
      scopeList: [],
      // 查询对象数组
      searchObjList: [
        {
          label: '主体',
          value: 0,
        },
        {
          label: '账户',
          value: 1,
        },
      ],
      //  标签
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
        {
          id: 11,
          class: 'tag3',
          tag: '可疑变票公司',
          show: false,
          detailList: ['xxx案件', 'xxxxxxx案件'],
        },
        {
          id: 12,
          class: 'tag3',
          tag: '可疑变票公司',
          show: false,
          detailList: ['xxx案件', 'xxxxxxx案件'],
        },
        {
          id: 13,
          class: 'tag3',
          tag: '可疑变票公司',
          show: false,
          detailList: ['xxx案件', 'xxxxxxx案件'],
        },
        {
          id: 14,
          class: 'tag3',
          tag: '可疑变票公司',
          show: false,
          detailList: ['xxx案件', 'xxxxxxx案件'],
        },
        {
          id: 15,
          class: 'tag3',
          tag: '可疑变票公司',
          show: false,
          detailList: ['xxx案件', 'xxxxxxx案件'],
        },
      ],
      toggleData: true, // 交易人员交易发生地切换
    };
  },
  mounted() {
    // this.getMyEcharts();
    // this.getSeconedEcharts();
    // this.getScatter();
    // this.getBox();
    // this.getMap();
    // 轮播图
    this.swiper();
    // 获取查询范围列表
    this.getScopeList();
    // 如果携带参数则直接发送请求获取数据
    this.getSearchData({
      scope: '',
      searchObj: this.$route.params.subject,
      searchObjContent: this.$route.params.caseId,
    });
  },
  created() {
    // 赋值caseid和主体
    this.dataInfo = {
      case_id: this.$route.params.caseId ? this.$route.params.caseId : '',
      subject: this.$route.params.subject ? this.$route.params.subject : 0,
    };
  },
  methods: {
    //  搜索框
    toSearch() {
      // 表单验证
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // 获取搜索数据
          // 调用接口发送请求
          this.getSearchData(this.searchData);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 获取查询范围列表
    getScopeList() {
      // 发送请求
      const res = {
        code: 200,
        msg: null,
        data: {
          count: 4,
          rows: [
            {
              case_no: 'p120210201013',
              task_status: 1,
              status_code: '30',
              create_time: '2021-02-08 17:01:00',
              status_name: '分析中',
              happen_time: '2021-02-01',
              case_name: '测试4',
              charge_code: '57',
              description: '123',
              charge_name: '虚开普通发票案',
              creator_id: '1',
              creator_name: 'admin',
              id: 5,
            },
            {
              case_no: 'p120210201078',
              task_status: 1,
              status_code: '30',
              create_time: '2021-02-05 15:53:42',
              status_name: '分析中',
              happen_time: '2021-02-01',
              case_name: '测试1',
              charge_code: '75',
              description: '测试用',
              tags: '标签1,标签1,标签1',
              charge_name: '职务侵占案',
              creator_id: '1',
              creator_name: 'admin',
              id: 2,
            },
            {
              case_no: 'p120210201006',
              task_status: 1,
              status_code: '30',
              create_time: '2021-02-01 16:53:08',
              status_name: '分析中',
              happen_time: '2021-02-01',
              case_name: '测试3',
              charge_code: '57',
              description: '123123123131231312313123',
              charge_name: '虚开普通发票案',
              creator_id: '1',
              creator_name: 'admin',
              id: 4,
            },
            {
              case_no: 'p120210201004',
              task_status: 1,
              status_code: '30',
              create_time: '2021-02-01 16:52:01',
              status_name: '分析中',
              happen_time: '2021-02-01',
              case_name: '测试2',
              charge_code: '57',
              description: '13132123132',
              charge_name: '虚开普通发票案',
              creator_id: '1',
              creator_name: 'admin',
              id: 3,
            },
          ],
        },
      };
      this.scopeList = res.data.rows.map((items) => ({
        label: items.case_name,
        value: items.id,
      }));
    },
    // 上方三个请求函数
    getSearchData(data) {
      // data数据是三个搜索框的参数
      console.log(data);
      // 标签数据
      const tagsRes = {
        code: 200,
        msg: null,
        data: {
          system: [
            {
              createtime: '2021-04-01 11:16:00',
              name: 'lisi',
              ajid: 0,
              tag: '交易对手异常',
              type: 'system',
              idnum: 'idnum5',
            },
            {
              createtime: '2021-04-01 11:16:00',
              name: 'lisi',
              ajid: 0,
              tag: '过渡账户',
              type: 'system',
              idnum: 'idnum5',
            },
            {
              createtime: '2021-04-01 11:16:00',
              name: 'lisi',
              ajid: 0,
              tag: '过渡账户',
              type: 'system',
              idnum: 'idnum5',
            },
            {
              createtime: '2021-04-01 11:16:00',
              name: 'lisi',
              ajid: 0,
              tag: '过渡账户',
              type: 'system',
              idnum: 'idnum5',
            },
            {
              createtime: '2021-04-01 11:16:00',
              name: 'lisi',
              ajid: 0,
              tag: '过渡账户',
              type: 'system',
              idnum: 'idnum5',
            },
            {
              createtime: '2021-04-01 11:16:00',
              name: 'lisi',
              ajid: 0,
              tag: '可疑团伙',
              type: 'system',
              idnum: 'idnum5',
            },
            {
              createtime: '2021-04-01 11:16:00',
              name: 'lisi',
              ajid: 0,
              tag: '公对私转账异常',
              type: 'system',
              idnum: 'idnum5',
            },
            {
              createtime: '2021-04-01 11:16:00',
              name: 'tyw',
              ajid: 1,
              tag: '第一等级',
              type: 'system',
              idnum: '210404199207182200',
            },
            {
              createtime: '2021-04-01 11:16:00',
              name: 'tyw1',
              ajid: 1,
              tag: '过渡账户',
              type: 'system',
              idnum: '210404199207182200',
            },
            {
              createtime: '2021-04-01 11:16:00',
              name: 'tyw2',
              ajid: 1,
              tag: '过渡账户',
              type: 'system',
              idnum: '210404199207182200',
            },
            {
              createtime: '2021-04-01 11:16:00',
              name: 'tyw3',
              ajid: 1,
              tag: '过渡账户',
              type: 'system',
              idnum: '210404199207182200',
            },
            {
              createtime: '2021-04-01 11:16:00',
              name: 'tyw4',
              ajid: 1,
              tag: '过渡账户',
              type: 'system',
              idnum: '210404199207182200',
            },
            {
              createtime: '2021-04-01 11:16:00',
              name: 'tyw1',
              ajid: 1,
              tag: '过渡账户',
              type: 'system',
              idnum: '210404199207182200',
            },
            {
              createtime: '2021-04-01 11:16:00',
              name: 'tyw2',
              ajid: 1,
              tag: '过渡账户',
              type: 'system',
              idnum: '210404199207182200',
            },
            {
              createtime: '2021-04-01 11:16:00',
              name: 'tyw3',
              ajid: 1,
              tag: '过渡账户',
              type: 'system',
              idnum: '210404199207182200',
            },
            {
              createtime: '2021-04-01 11:16:00',
              name: 'zhangsan',
              ajid: 1,
              tag: '可疑团伙',
              type: 'system',
              idnum: 'idnum4',
            },
            {
              createtime: '2021-04-01 11:16:00',
              name: 'lisi',
              ajid: 1,
              tag: '交易对手异常',
              type: 'system',
              idnum: 'idnum5',
            },
            {
              createtime: '2021-04-01 11:16:00',
              name: 'lisi',
              ajid: 1,
              tag: '交易对手异常',
              type: 'system',
              idnum: 'idnum5',
            },
          ],
          manual: [
            {
              createtime: '2021-03-17 11:48:02',
              ajid: 11,
              tag: '2222',
              type: 'manual',
            },
            {
              createtime: '2021-03-17 11:48:02',
              name: '张三',
              ajid: 11,
              tag: '4444',
              type: 'manual',
              idnum: '2104041993',
            },
            {
              createtime: '2021-03-17 11:48:02',
              ajid: 11,
              tag: '5555',
              type: 'manual',
            },
            {
              createtime: '2021-03-17 11:48:02',
              name: '张三',
              ajid: 11,
              tag: '3333',
              type: 'manual',
              idnum: '2104041993',
            },
            {
              createtime: '2021-03-17 11:48:02',
              name: '张三',
              ajid: 11,
              tag: 'aaaa',
              type: 'manual',
              idnum: '2104041993',
            },
            {
              createtime: '2021-03-17 11:48:02',
              name: '张三',
              ajid: 11,
              tag: 'xxxx',
              type: 'manual',
              idnum: '2104041993',
            },
            {
              createtime: '2021-03-17 11:48:02',
              name: '张三',
              ajid: 11,
              tag: '4444',
              type: 'manual',
              idnum: '2104041993',
            },
            {
              createtime: '2021-03-17 11:48:02',
              name: '张三',
              ajid: 11,
              tag: '5555',
              type: 'manual',
              idnum: '2104041993',
            },
            {
              createtime: '2021-03-17 11:48:02',
              ajid: 11,
              tag: '3333',
              type: 'manual',
            },
            {
              createtime: '2021-03-17 11:48:02',
              ajid: 11,
              tag: '1111',
              type: 'manual',
            },
            {
              createtime: '2021-03-24 06:08:16',
              ajid: 1,
              tag: '2',
              type: 'manual',
            },
            {
              createtime: '2021-03-24 06:08:02',
              ajid: 1,
              tag: '1',
              type: 'manual',
            },
            {
              createtime: '2021-03-25 10:28:09',
              name: '李四',
              tag: '456',
              type: 'manual',
              idnum: '2104041982',
            },
            {
              createtime: '2021-03-25 10:34:53',
              tag: '123',
              type: 'manual',
            },
            {
              createtime: '2021-03-25 10:34:53',
              tag: '456',
              type: 'manual',
            },
            {
              createtime: '2021-03-25 10:44:28',
              tag: '312',
              type: 'manual',
            },
            {
              createtime: '2021-03-25 10:44:28',
              tag: '456',
              type: 'manual',
            },
            {
              createtime: '2021-03-25 10:27:32',
              name: '张三',
              ajid: 11,
              tag: '123',
              type: 'manual',
              idnum: '2104041993',
            },
            {
              createtime: '2021-03-25 10:27:32',
              name: '张三',
              ajid: 11,
              tag: '312',
              type: 'manual',
              idnum: '2104041993',
            },
            {
              createtime: '2021-03-25 10:27:32',
              name: '张三',
              ajid: 11,
              tag: '456',
              type: 'manual',
              idnum: '2104041993',
            },
            {
              createtime: '2021-03-25 10:28:09',
              name: '李四',
              ajid: 11,
              tag: '123',
              type: 'manual',
              idnum: '2104041982',
            },
            {
              createtime: '2021-03-25 10:28:09',
              name: '李四',
              ajid: 11,
              tag: '312',
              type: 'manual',
              idnum: '2104041982',
            },
            {
              createtime: '2021-03-17 11:48:02',
              ajid: 11,
              tag: '1',
              type: 'manual',
            },
            {
              createtime: '2021-03-25 10:29:01',
              ajid: 11,
              tag: '123',
              type: 'manual',
            },
            {
              createtime: '2021-03-25 10:29:01',
              ajid: 11,
              tag: '312',
              type: 'manual',
            },
            {
              createtime: '2021-03-25 10:29:01',
              ajid: 11,
              tag: '456',
              type: 'manual',
            },
            {
              createtime: '2021-03-25 10:34:53',
              ajid: 11,
              tag: '312',
              type: 'manual',
            },
            {
              createtime: '2021-03-25 10:44:28',
              ajid: 11,
              tag: '123',
              type: 'manual',
            },
            {
              createtime: '2021-03-20 10:13:11',
              name: '张三',
              ajid: 11,
              tag: '1111',
              type: 'manual',
              idnum: '2104041993',
            },
            {
              createtime: '2021-03-17 11:48:02',
              name: '李四',
              ajid: 11,
              tag: '2222',
              type: 'manual',
              idnum: '2104041982',
            },
          ],
        },
      };
      // 信息
      const infoRes = {
        code: 200,
        msg: null,
        data: {
          capital: {
            dbrzjhm: '',
            khmc: '李志清',
            csrq: '',
            zjlx: '居民身份证',
            dwdz: '山西省太原市晋源区长风商务区长兴南街8号阳光城1601',
            dbrxm: '',
            frdbzjlx: '',
            zjhm: '350321198008150033',
            lxdz: '',
            lxsj: '',
            xszk: '',
            dbrzjlx: '',
            AJID: 0,
            CREATE_TIME: '2021-03-18 11:36:12',
            xzz_xz: '',
            email: '',
            lxdh: '',
            dsnsh: '',
            xzz_xzqh: '',
            hjdz: '',
            qtzj_zjhm: '',
            UPDATE_TIME: '1970-01-01 08:00:00',
            MD5_INT: 1,
            gzdw: '山西省太原市21站石油',
            gsnsh: '',
            dwdh: '',
            khgszzhm: '',
            frdb: '',
            zzdh: '',
            frdbzjhm: '',
          },
          tax: null,
        },
      };
      // 银行卡
      const bankCardRes = {
        code: 200,
        msg: null,
        data: {
          bankList: [
            {
              zhkhyh: '中国工商银行',
              khwd: '工行江苏省盐城大丰支行营业部',
              zhlx: '',
              jykh: 'AAAAABAA5896284A2',
              jincount: 182,
              chucount: 205,
              totalcount: 387,
              jinmoney: 47411861.24,
              chumoney: 47111354.64,
              camoney: 300506.6,
            },
          ],
          bankCount: {
            khhs: 2,
            zhkhmc: '王*龙',
            yhks: 4,
          },
        },
      };
      this.topList = {
        tags: tagsRes.data,
        info: infoRes.data,
        bankCards: bankCardRes.data,
      };
      console.log(this.topList);
    },
    //  导出
    exportHandle() {
      alert('export');
    },
    // 鼠标移入标签
    enterTag(item, index) {
      // 获取当前移入的标签元素
      let tag = this.$refs.tags[index];
      // 标签元素高度
      const height = tag.clientHeight;
      // 获取当前移入的标签弹窗元素
      let popup = this.$refs.popup[index];
      // 获取元素到滚动条距离
      let scrollTop = this.$refs.tagContainer.scrollTop;
      // 元素x周坐标
      let x = tag.offsetLeft;
      // 标签y轴坐标（当前y轴坐标减去距离滚动条高度）
      let y = tag.offsetTop - scrollTop;
      // 设置top需要加上标签高度，不然会遮盖标签元素
      popup.style.top = y + height + 'px';
      popup.style.left = x + 'px';
      item.show = true;
    },
    //  鼠标移出标签
    leaveTag(item) {
      item.show = false;
    },
    //  人员地区切换
    togglePeopleOrLocation(flag) {
      this.toggleData = flag;
    },
    //  两个下拉框
    changeHandle(value, type) {
      type === 'scope' && value !== undefined
        ? (this.searchData.scope = value)
        : (this.searchData.scope = '');
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
              // 之前的地址
              // icon: "image://" + require("../../assets/imgs/CompanyIcon.png"),
              icon: 'image://' + require('../assets/logo.png'),
              title: '下载',
              iconStyle: {},
              pixelRatio: 1,
            },
            myFull: {
              show: true,
              title: '全屏查看',
              // 之前的地址
              // icon: "image://" + require("../../assets/imgs/CompanyIcon.png"),
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
            {
              name: 'lunch',
              icon: 'roundRect',
            },
            {
              name: 'dinner',
              icon: 'roundRect',
            },
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
              // 之前的地址
              // icon: "image://" + require("../../assets/imgs/CompanyIcon.png"),
              icon: 'image://' + require('../assets/logo.png'),
              title: '下载',
              iconStyle: {},
              pixelRatio: 1,
            },
            myFull: {
              show: true,
              title: '全屏查看',
              // 之前的地址
              // icon: "image://" + require("../../assets/imgs/CompanyIcon.png"),
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
          data: [
            {
              name: '涉嫌人员',
              icon: 'pin',
            },
          ],
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
        direction: 'horizontal', // 水平滑动
        loop: true, // 循环模式选项
        slidesPerView: 3, // 设置容器能同时现实的数量
        slidesPerView: 'auto',
        watchSlidesProgress: true, // 每个slide的progress
        watchSlidesVisibility: true,
        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    },
  },
};
</script>
<style lang="less" scoped>
.full-view-detect-wrap {
  width: 100%;
  height: 100%;
  overflow: auto;

  //  搜索区
  .full-view-detect-search-wrap {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    margin-bottom: 8px;
    background: #fff;
    .full-view-detect-search-export {
      margin-top: 5px;
    }
  }

  //  内容区
  .full-view-detect-content-wrap {
    width: 100%;
    height: 100%;
    background-color: rgb(240, 246, 255);
    padding: 0px 20px 30px;

    .full-view-detect-content-top {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 340px;
      margin-bottom: 20px;
      // 之前的url
      // background: url('../../assets/imgs/QJZCimg.png') no-repeat;
      background: url('../assets/bg.gif') no-repeat;
      // background-color: #3c3c3c;
      background-size: cover;
      border-radius: 2px;
      padding: 15px;

      .full-view-detect-content-top-detail-wrap {
        padding: 20px;
        margin-left: 10px;
        display: flex;
        position: relative;
        width: 34%;
        margin-top: 15px;
        height: 300px;
        background: #fff;
        border-radius: 4px;

        .full-view-detect-content-top-detail-left {
          border-right: 2px solid #eaeef5;
          box-sizing: border-box;
          text-align: center;
          // overflow: hidden;
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
            height: 150px;
            display: flex;
            flex-wrap: wrap;
            overflow-y: auto;
            padding: 0 7%;
            justify-content: space-between;

            .full-view-detect-content-top-detail-left-tag-items {
              width: 48%;
              margin-bottom: 16px;

              //  移入标签的样式
              .hoverClass {
                position: absolute;
                width: 70px;
                z-index: 99;
                display: flex;
                flex-direction: column;
                padding: 5px 0;
                height: 70px;
                background: #fff;
                box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
                border-radius: 4px;
                font-family: PingFangSC-Regular;
                font-size: 12px;
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
                margin-bottom: 0;
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

        // 轮播图
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
            background: #fff;
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
      background: #fff;

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
          background: #fff;
          box-shadow: 0 0 20px 0 rgba(24, 144, 255, 0.1);
          border-radius: 4px;
        }

        .box {
          margin-left: 1.5%;
          width: 49.25%;
          height: 350px;
          background: #fff;
          box-shadow: 0 0 20px 0 rgba(24, 144, 255, 0.1);
          border-radius: 4px;
        }
      }
    }

    // 交易行为特征
    .trisation_action {
      margin-top: 25px;

      // 四个图表
      .trisation-items-box {
        display: flex;
        margin-top: 20px;

        .trisation-items-box-items {
          width: 49.25%;
          height: 350px;
          background: #fff;
          box-shadow: 0 0 20px 0 rgba(24, 144, 255, 0.1);
          border-radius: 4px;
        }

        .trisation-items-box-right {
          margin-left: 1.5%;
        }
      }

      // 三个数据显示
      .trisation-action-list {
        margin-top: 20px;
      }
    }

    //  地图
    .trisation-map {
      position: relative;
      margin-top: 20px;
      width: 100%;
      height: 600px;
      background: #fff;
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

        // hover
        .active {
          background-color: #1890ff;
          color: #fff;
        }
      }
    }
  }

  .tipInfo {
    width: 100%;
    text-align: center;
    margin-top: 200px;
    font-size: 40px;
    font-weight: bold;
  }
}
</style>
