<!--
 * @Author: 勾青琼
 * @Date: 2021-03-10 10:02:30
 * @LastEditTime: 2021-04-22 10:11:51
 * @LastEditors: Please set LastEditors
 * @Description: 待调单
 * @FilePath: \guidance\src\views\dataAnalysis\common\survey.vue
-->
<template>
  <div class="stay-order">
    <!-- 首行 -->
    <div class="operation">
      <!-- 搜索框 -->
      <div class="wait_form_search">
        <a-input
          class="search-wrapper-input"
          v-model="inputSearch"
          placeholder="请输入户名/卡号"
          @change.enter="searchLawName"
          style="width: 323px; height: 32px"
        >
          <i
            slot="suffix"
            class="iconfont iconSearchIcon"
            style="color: #1890ff"
          ></i>
        </a-input>
      </div>
      <div class="right_wrappper">
        <!-- 五角星 -->
        <div class="stay_star">
          <i class="iconfont iconStar"></i>
        </div>
        <!--  新增按钮 -->
        <div class="add_button" @click="dialogShow(true, 'add')">
          <i class="iconfont iconNewlyAddedIcon"></i>
          <span>新增</span>
        </div>
        <!--  导出 -->
        <div class="stay_report" @click="reportThisData">
          <i class="iconfont iconExportIocn"></i>
          <span>导出</span>
        </div>
      </div>
    </div>
    <!-- 表格 -->
    <div class="stay_table">
      <a-table
        :columns="columns"
        :data-source="wait_data"
        :scroll="{ x: 3000, y: 400 }"
        :pagination="false"
      >
        <!--  户名 -->
        <a
          slot="name"
          slot-scope="name"
          style="cursor: pointer"
          @click="topanorama"
        >
          {{ name }}
        </a>

        <span slot="accountNameTitle">户名</span>
        <!-- 卡号 -->
        <a
          slot="card_number"
          slot-scope="card_number"
          style="cursor: pointer"
          @click="topanorama"
        >
          {{ card_number }}
        </a>
        <span slot="cardNumTitle">卡号</span>
        <span slot="attribution_place" slot-scope="attribution_place">
          {{ attribution_place }}
        </span>
        <span slot="placeTitle">
          <span v-if="!show_cascender_city">归属地</span>
          <a-cascader
            :options="options"
            :load-data="loadData"
            v-if="show_cascender_city"
            placeholder="请选择归属地"
            changeOnSelect="true"
            @change="onChange"
            @blur="hideSelect"
            :autoFocus="true"
          />
          <!-- 之前的src -->
          <!-- src="../../../assets/imgs/ScreenIcon.png" -->
          <img
            src="../../assets/logo.png"
            style="width: 13px; height: 13px; margin-left: 5px; cursor: pointer"
            @click="show_select_city"
          />
        </span>
        <!--  总交易金额 -->
        <span
          slot="receipts_amount"
          slot-scope="receipts_amount"
          style="color: #1890ff"
        >
          {{ receipts_amount }}
        </span>
        <span slot="allMoneyTitle">总交易金额</span>

        <!-- 进账金额 -->
        <span
          slot="trade_amount"
          slot-scope="trade_amount"
          style="color: #1890ff"
        >
          {{ trade_amount }}
        </span>
        <span slot="enterMoneyTitle">进账金额</span>
        <!-- 出账金额 -->
        <span
          slot="expenditure_count"
          slot-scope="expenditure_count"
          style="color: #1890ff"
        >
          {{ expenditure_count }}
        </span>
        <span slot="outMoneyTitle">出账金额</span>
        <span slot="action" slot-scope="text, record">
          <span
            style="font-size: 14px; color: #1890ff; cursor: pointer"
            @click="dialogShow(true, 'edit', record)"
            >编辑&nbsp;&nbsp;&nbsp;&nbsp;</span
          >
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <!--  cofirm确认弹框 -->
          <span
            @click="deleteData(record)"
            style="font-size: 14px; color: #1890ff; cursor: pointer"
            >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;删除</span
          >
        </span>
      </a-table>
      <div class="footer">
        <a-pagination
          @showSizeChange="onShowSizeChange"
          :page-size="params.pageNum"
          :default-current="params.pageIndex"
          size="small"
          :total="sizeTotal"
          show-size-changer
          show-quick-jumper
          class="pagination"
          @change="footer_change"
          :pageSizeOptions="pageSizeOptions"
          :defaultPageSize="defaultPageSize"
          :show-total="(total) => `共 ${total} 条`"
        />
      </div>
      <!-- <div class="select_city">
        <a-cascader
          v-if="show_cascender_city"
          :options="options"
          :load-data="loadData"
          placeholder="请选择归属地"
          change-on-select
          @change="onChange"
          @blur="hideSelect"
          :autoFocus="true"
        />
      </div> -->
    </div>
    <!-- 弹窗 -->
    <Popup
      ref="popup"
      :visible="show"
      @dialogShow="dialogShow"
      @submit="submit"
      :title="title"
    />
  </div>
</template>

<script>
import Popup from './common/addOrEditDlog';
// import {
//   waitListApi,
//   addWaitListApi,
//   editWaitListApi,
//   deleteWaitListApi,
//   reportWaitListApi
// } from "../../../api/waitOrder";
// import indexVue from "../../../common/Breadcurumb/index.vue";
const city = [
  {
    text: '北京',
    value: '北京',
  },
  {
    text: '上海',
    value: '上海',
  },
  {
    text: '天津',
    value: '天津',
    children: [
      {
        text: '连云港',
        value: '连云港',
      },
      {
        text: 'xx市',
        value: 'xx市',
      },
    ],
  },
];
const columns = [
  {
    // title: "户名",
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    align: 'center',
    slots: { title: 'accountNameTitle' },
    scopedSlots: { customRender: 'name' },
    // width:'10%'
  },
  {
    title: '卡号',
    width: 150,
    dataIndex: 'card_number',
    key: 'card_number',
    fixed: 'left',
    align: 'center',
    slots: { title: 'cardNumTitle' },
    scopedSlots: { customRender: 'card_number' },
  },
  {
    title: '证件号码',
    dataIndex: 'identification_num',
    key: 'identification_num',
    width: 150,
    align: 'center',
  },
  {
    // title: "归属地",
    dataIndex: 'attribution_place',
    key: 'attribution_place',
    slots: { title: 'placeTitle' },
    scopedSlots: { customRender: 'attribution_place' },
    width: 250,
    align: 'center',
    // filters: city,
    //  id唯一 城市返回
    // onFilter: (value, record) => record.place.includes(value),
  },
  {
    title: '银行卡种类',
    dataIndex: 'card_type',
    key: 'card_type',
    width: 150,
    align: 'center',
  },
  {
    title: '重要级别',
    dataIndex: 'level',
    key: 'level',
    width: 150,
    align: 'center',
    filters: [
      {
        text: '1级',
        value: '1',
      },
      {
        text: '2级',
        value: '2',
      },
      {
        text: '3级',
        value: '3',
      },
      {
        text: '4级',
        value: '4',
      },
    ],
    onFilter: (value, record) => record.level.indexOf(value) !== -1,
  },
  {
    title: '待调单原因',
    dataIndex: 'bill_cause',
    key: 'bill_cause',
    width: 250,
    align: 'center',
  },
  {
    // title: "总交易金额",
    dataIndex: 'receipts_amount',
    key: 'receipts_amount',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.allMoney - b.allMoney,
    slots: { title: 'allMoneyTitle' },
    scopedSlots: { customRender: 'receipts_amount' },
    width: 150,
    align: 'center',
  },
  {
    title: '总交易次数',
    dataIndex: 'expenditure_amount',
    key: 'expenditure_amount',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.allFrequency - b.allFrequency,
    width: 150,
    align: 'center',
  },
  {
    title: '进账金额',
    dataIndex: 'trade_amount',
    key: 'trade_amount',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.enterMoney - b.enterMoney,
    slots: { title: 'enterMoneyTitle' },
    scopedSlots: { customRender: 'trade_amount' },
    width: 150,
    align: 'center',
  },
  {
    title: '进账次数',
    dataIndex: 'receipts_count',
    key: 'receipts_count',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.enterFre - b.enterFre,
    width: 150,
    align: 'center',
  },
  {
    title: '出账金额',
    dataIndex: 'expenditure_count',
    key: 'expenditure_count',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.outMoney - b.outMoney,
    slots: { title: 'outMoneyTitle' },
    scopedSlots: { customRender: 'expenditure_count' },
    width: 150,
    align: 'center',
  },
  {
    title: '出账次数',
    dataIndex: 'trade_count',
    key: 'trade_count',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.outFre - b.outFre,
    width: 150,
    align: 'center',
  },
  {
    title: '最早交易日期',
    dataIndex: 'earliest_date',
    key: 'earliest_date',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.earliest - b.earliest,
    width: 150,
    align: 'center',
  },
  {
    title: '最晚交易日期',
    dataIndex: 'latest_date',
    key: 'latest_date',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.latest - b.latest,
    width: 150,
    align: 'center',
  },
  {
    title: '交易周期',
    dataIndex: 'trade_cycle',
    key: 'trade_cycle',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.cycle - b.cycle,
    width: 150,
    align: 'center',
  },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 100,
    scopedSlots: { customRender: 'action' },
    width: 150,
    align: 'center',
  },
];
const wait_data = [
  {
    key: 1,
    name: '蔡XX',
    cardNum: '125800048963',
    place: '海南省-海口',
    identification_num: '351485858598',
    cardClass: '建设银行-借记卡',
    imporatentLevel: ' 2级',
    reasion: '这里是待调单的原因',
    allMoney: '￥123456.78',
    allFrequency: '600',
    enterMoney: '4578985',
    enterFre: '400',
    outMoney: '5000000',
    outFre: '400',
    earliest: '2021-03-20',
    latest: '2021-03-20',
    cycle: '200',
  },
  {
    key: 2,
    accountName: '蔡XX',
    cardNum: '125800048963',
    place: '北京',
    identification_num: '351485858598',
    cardClass: '建设银行-借记卡',
    imporatentLevel: '4级',
    reasion: '这里是待调单的原因',
    allMoney: '￥123456.78',
    allFrequency: '600',
    enterMoney: '4578985',
    enterFre: '400',
    outMoney: '5000000',
    outFre: '400',
    earliest: '2021-03-20',
    latest: '2021-03-20',
    cycle: '200',
  },
  {
    key: 3,
    accountName: '蔡XX',
    cardNum: '125800048963',
    place: '海南省-海口',
    identification_num: '351485858598',
    cardClass: '建设银行-借记卡',
    imporatentLevel: '4级',
    reasion: '这里是待调单的原因',
    allMoney: '￥123456.78',
    allFrequency: '600',
    enterMoney: '4578985',
    enterFre: '400',
    outMoney: '5000000',
    outFre: '400',
    earliest: '2021-03-20',
    latest: '2021-03-20',
    cycle: '200',
  },
  {
    key: 4,
    accountName: '蔡XX',
    cardNum: '125800048963',
    place: '海南省-海口',
    identification_num: '351485858598',
    cardClass: '建设银行-借记卡',
    imporatentLevel: '4级',
    reasion: '这里是待调单的原因',
    allMoney: '￥123456.78',
    allFrequency: '600',
    enterMoney: '4578985',
    enterFre: '400',
    outMoney: '5000000',
    outFre: '400',
    earliest: '2021-03-20',
    latest: '2021-03-20',
    cycle: '200',
  },
  {
    key: 5,
    accountName: '蔡XX',
    identification_num: '351485858598',
    cardClass: '建设银行-借记卡',
    cardNum: '125800048963',
    place: '上海',
    imporatentLevel: '4级',
    reasion: '这里是待调单的原因',
    allMoney: '￥123456.78',
    allFrequency: '600',
    enterMoney: '4578985',
    enterFre: '400',
    outMoney: '5000000',
    outFre: '400',
    earliest: '2021-03-20',
    latest: '2021-03-20',
    cycle: '200',
  },
];
export default {
  name: 'stay-order',
  components: {
    Popup,
  },
  data() {
    return {
      wait_data,
      columns,
      sizeTotal: 0,
      pageSizeOptions: ['10', '20', '30', '40'],
      defaultPageSize: 10,
      title: '新增待调单账户',
      inputSearch: '', // 搜索框需要的参数
      options: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          isLeaf: false,
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          isLeaf: false,
        },
      ],
      show_cascender_city: false,
      show: false,
      //  获取案件列表需要的参数
      params: {
        caseId: '',
        updateTime: '',
        pageNum: 10,
        pageIndex: 1,
        sortKey: '',
        sortKeyType: '',
      },
      // 待调单列表所需参数
      waitCheck: {
        caseId: '',
        updateTime: '',
        keyWord: '',
        pageNum: 10,
        pageIndex: 1,
      },
      //  新增里面的数据
      addData: {},
      caseInfo: {},
      deleteId: null,
    };
  },
  mounted() {
    // this.caseInfo = JSON.parse(sessionStorage.getItem("baseObj"));
    // this.waitCheck.caseId = JSON.parse(sessionStorage.getItem("baseObj")).id;
    // //  监听更新时间
    // this.$Bus.$off("updataTime");
    // this.$Bus.$on("updataTime", (date) => {
    //   console.log(date, this.$store.state.analysisDateupTime);
    // });
    // this.getWaitList();
  },
  methods: {
    // 待调单列表的接口
    getWaitList() {
      // let param = {
      //   caseId: this.waitCheck.caseId,
      //   updateTime:this.$store.state.analysisDateupTime,
      //   keyWord:inputSearch,
      //   pageNum:this.waitCheck.pageNum,
      //   pageIndex:this.waitCheck.pageIndex,

      // }
      // waitListApi(param).then((res) =>{
      //   if(res.data.code ==200 ){
      //     this.wait_data = res.data.data.rows
      //       this.sizeTotal =  res.data.data.total
      //   }
      // })
      let res = {
        code: 200,
        msg: null,
        data: {
          total: 5,
          rows: [
            {
              id: 1,
              case_id: 1,
              card_number: ' 121211',
              attribution_place: '长沙 ',
              card_type: '建设银行-借记卡 ',
              level: 1,
              receipts_amount: '10000 ',
              trade_amount: '1',
              receipts_count: 1,
              expenditure_count: 1,
              trade_count: 1,
              earliest_date: '2021-04-09 11:00:09',
              latest_date: '2021-04-09 11:00:12',
              trade_cycle: '1',
              creator_id: 1,
              create_time: '2021-04-15 10:59:29',
              updator_id: 1,
              update_time: '2021-04-09 10:59:22',
              name: '蔡*姬',
            },
            {
              id: 2,
              case_id: 1,
              card_number: ' 121211',
              attribution_place: '长沙 ',
              card_type: '建设银行-借记卡 ',
              level: 1,
              receipts_amount: '10000 ',
              trade_amount: '1',
              receipts_count: 1,
              expenditure_count: 1,
              trade_count: 1,
              earliest_date: '2021-04-09 11:00:09',
              latest_date: '2021-04-09 11:00:12',
              trade_cycle: '1',
              creator_id: 1,
              create_time: '2021-04-15 10:59:29',
              updator_id: 1,
              update_time: '2021-04-09 10:59:22',
              name: '蔡*姬',
            },
            {
              id: 3,
              case_id: 1,
              card_number: ' 121211',
              attribution_place: '长沙 ',
              card_type: '建设银行-借记卡 ',
              level: 1,
              receipts_amount: '10000 ',
              trade_amount: '1',
              receipts_count: 1,
              expenditure_count: 1,
              trade_count: 1,
              earliest_date: '2021-04-09 11:00:09',
              latest_date: '2021-04-09 11:00:12',
              trade_cycle: '1',
              creator_id: 1,
              create_time: '2021-04-15 10:59:29',
              updator_id: 1,
              update_time: '2021-04-09 10:59:22',
              name: '蔡*姬',
            },
            {
              id: 4,
              case_id: 1,
              card_number: ' 121211',
              attribution_place: '长沙 ',
              card_type: '建设银行-借记卡 ',
              level: 1,
              receipts_amount: '10000 ',
              trade_amount: '1',
              receipts_count: 1,
              expenditure_count: 1,
              trade_count: 1,
              earliest_date: '2021-04-09 11:00:09',
              latest_date: '2021-04-09 11:00:12',
              trade_cycle: '1',
              creator_id: 1,
              create_time: '2021-04-15 10:59:29',
              updator_id: 1,
              update_time: '2021-04-09 10:59:22',
              name: '蔡*姬',
            },
            {
              id: 5,
              case_id: 1,
              card_number: ' 121211',
              attribution_place: '长沙 ',
              card_type: '建设银行-借记卡 ',
              level: 1,
              receipts_amount: '10000 ',
              trade_amount: '1',
              receipts_count: 1,
              expenditure_count: 1,
              trade_count: 1,
              earliest_date: '2021-04-09 11:00:09',
              latest_date: '2021-04-09 11:00:12',
              trade_cycle: '1',
              creator_id: 1,
              create_time: '2021-04-15 10:59:29',
              updator_id: 1,
              update_time: '2021-04-09 10:59:22',
              name: '蔡*姬',
            },
          ],
        },
      };
      this.wait_data = res.data.rows;
      this.sizeTotal = res.data.total;
    },
    //  新增接口
    addOrderData() {
      let param = {
        caseId: this.waitCheck.caseId, // 案件id
        updateTime: this.$store.state.analysisDateupTime, // 案件时间
        name: this.addData.name, // 姓名
        card_number: this.addData.card_number, //  卡号
        attribution_place: this.addData.attribution_place, // 归属地
        card_type: this.addData.card_type, // 银行卡种类
        level: this.addData.level * 1, // 级别
        bill_cause: this.addData.bill_cause, // 待调单原因
        // receipts_amount:this.addData.receipts_amount *1,  // 总交易金额
        expenditure_amount: this.addData.expenditure_amount, // 总交易次数
        trade_amount: this.addData.trade_amount, // 进账金额
        receipts_count: this.addData.receipts_count * 1, // 进账次数
        expenditure_count: this.addData.expenditure_count * 1, // 出账金额
        trade_count: this.addData.trade_count * 1, // 出账次数
        earliest_date: this.addData.earliest_date + ' 00:00:00', // 最早交易日期
        latest_date: this.addData.latest_date + ' 00:00:00', // 最晚交易日期
        trade_cycle: this.addData.trade_cycle + '', // 交易周期
      };

      addWaitListApi(param).then((res) => {
        if (res.data.code == 200) {
          this.$message.success('res.msg');
          this.$refs.popup.handleCancel();
          this.getWaitList();
        }
      });
    },

    //  编辑接口
    editOrder() {
      let param = {
        caseId: this.waitCheck.caseId, // 案件id
        updateTime: this.$store.state.analysisDateupTime, // 案件时间
        name: this.addData.name, // 姓名
        card_number: this.addData.card_number, //  卡号
        attribution_place: this.addData.attribution_place, // 归属地
        card_type: this.addData.card_type, // 银行卡种类
        level: this.addData.level * 1, // 级别
        bill_cause: this.addData.bill_cause, // 待调单原因
        // receipts_amount:this.addData.receipts_amount *1,  // 总交易金额
        expenditure_amount: this.addData.expenditure_amount, // 总交易次数
        trade_amount: this.addData.trade_amount, // 进账金额
        receipts_count: this.addData.receipts_count * 1, // 进账次数
        expenditure_count: this.addData.expenditure_count * 1, // 出账金额
        trade_count: this.addData.trade_count * 1, // 出账次数
        earliest_date: this.addData.earliest_date + ' 00:00:00', // 最早交易日期
        latest_date: this.addData.latest_date + ' 00:00:00', // 最晚交易日期
        trade_cycle: this.addData.trade_cycle + '', // 交易周期
      };

      editWaitListApi(param).then((res) => {
        if (res.data.code == 200) {
          this.$message.success('res.msg');
          this.$refs.popup.handleCancel();
          this.getWaitList();
        }
      });
    },

    //  获取待调单列表
    // async getWaitList() {
    //   let testData = await waitListApi(this.params);
    //   console.log(testData);
    //   this.data = testData.data.rows;
    //   this.sizeTotal = testData.data.count;
    // },
    //  页码大小发生回调
    onShowSizeChange(pageIndex, pageNum) {
      this.waitCheck.pageNum = pageNum;
      this.getWaitList();
    },
    // 点击页码发生的回调
    footer_change(pageIndex, pageNum) {
      this.waitCheck.pageIndex = pageIndex;
      this.getWaitList();
    },
    //   删除提示信息
    deleteData(value) {
      const _this = this;
      this.$confirm({
        title: '是否确定删除该待调单账户?',
        onOk() {
          return new Promise((resolve, reject) => {
            let param = {
              id: value.id,
            };
            deleteWaitListApi(param)
              .then((res) => {
                if (res.data.code == 200) {
                  _this.$message.success('res.msg');
                } else {
                  _this.$message.success('删除失败');
                }
              })
              .catch((e) => {})
              .finally(() => {
                resolve();
              });
          });
        },
        onCancel() {
          console.log('Cancel');
        },
        class: 'test',
      });
    },
    //  导出
    reportThisData() {
      let param = {
        caseId: this.waitCheck.caseId, // 案件id
        updateTime: this.$store.state.analysisDateupTime, // 案件时间
      };
      reportWaitListApi(param);
    },
    //  查询
    searchLawName() {
      //  获取列表
      this.getWaitList();
    },
    submit(data) {
      this.addData = data;
      this.addOrderData();

      //  data数据就是弹窗组件的数据
    },
    dialogShow(val, type, item) {
      if (type === 'edit') {
        this.$refs.popup.form = item;
        console.log(item, 'item');
      }
      this.show = val;
    },
    topanorama() {
      this.$router.push({
        path: '/panoramicReconnaissance',
      });
    },
    //  显示城市
    show_select_city() {
      this.show_cascender_city = !this.show_cascender_city;
    },
    //  隐藏
    hideSelect() {
      this.show_cascender_city = false;
    },
    onChange(value) {
      console.log(value);
    },
    loadData(selectedOptions) {
      console.log(selectedOptions);
      const targetOption = selectedOptions[selectedOptions.length - 1];
      targetOption.loading = true;

      // load options lazily
      setTimeout(() => {
        targetOption.loading = false;
        targetOption.children = [
          {
            label: `a`,
            value: 'dynamic1',
          },
          {
            label: `b`,
            value: 'dynamic2',
          },
        ];
        this.options = [...this.options];
      }, 1000);
    },
  },
};
</script>
<style lang="less" scoped>
.stay-order {
  padding-left: 20px;
  background: #ffffff;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.06);
  height: 100%;

  // 首行
  .operation {
    display: flex;
    justify-content: space-between;
    height: 32px;
    padding-top: 9px;
    padding: 9px;
    .right_wrappper {
      display: flex;
      // 五角星
      .stay_star {
        width: 32px;
        height: 32px;
        background: #f3f9ff;
        border: 1px solid #dcedff;
        border-radius: 4px;
        text-align: center;
        .iconStar {
          color: #3399ff;
          line-height: 32px;
        }
      }
      //  新增按钮
      .add_button {
        width: 80px;
        height: 32px;
        background: #1890ff;
        border-radius: 4px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #ffffff;
        text-align: center;
        line-height: 32px;
        cursor: pointer;
        .iconNewlyAddedIcon {
          margin-right: 5px;
        }
        span {
          font-size: 14px;
        }
        margin: 0 10px;
      }
      //  导出按钮
      .stay_report {
        width: 80px;
        height: 32px;
        background: #1890ff;
        border-radius: 4px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #ffffff;
        text-align: center;
        line-height: 32px;
        margin-right: 20px;
        cursor: pointer;
        .iconExportIocn {
          margin-right: 5px;
        }
        span {
          font-size: 14px;
        }
      }
    }
  }
  .stay_table {
    margin-top: 20px;
    position: relative;
    //  分页
    .footer {
      margin-top: 20px;
      float: right;
      margin-right: 15px;
    }
    //  选择器
    .select_city {
      position: absolute;
      top: 40%;
      left: 25%;
    }
  }
}
</style>
