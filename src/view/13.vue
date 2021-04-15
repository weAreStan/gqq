<!--
 * @Author:477
 * @Date: 2021-03-02 12:04:42
 * @LastEditTime: 2021-04-14 14:01:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \forerunner\src\views\caseDetails\index.vue
-->
<template>
  <div class="case-details">
    <!-- 案件详情部分 -->
    <!-- 数据收集和数据分析 -->
    <div class="dataColletionAl">
      <!-- 数据收集 -->
      <div class="dataColltion">
        <div class="collectionTit">
          <div class="iconTil">
            <img src="../assets/DataIcon-1.png" alt="" />
            <span>数据收集</span>
          </div>
          <div class="titleMore" @click="toColl">更多>></div>
        </div>
        <!-- 暂无数据 -->
        <!-- <div class="notYetData">
          <img src="../assets/zwsu@1.png" alt="" />
          <p>暂无数据</p>
        </div> -->
        <!-- 案情数据 -->
        <div class="caseData1">
          <div class="caseLeft">案情数据</div>
          <div class="caseRight">
            <!-- 资金数据 -->
            <div
              :class="
                items.dataType === 'CAPTIAL' ? 'capitalData' : 'taxationData'
              "
              v-for="items in caseDataList.rows"
              :key="items.id"
            >
              <div class="leftCaptail">
                <img
                  v-if="items.dataType === 'CAPTIAL'"
                  src="../assets/CapitalDataIcon.png"
                  alt=""
                />
                <img
                  v-if="items.dataType === 'TAX'"
                  src="../assets/TaxDataIcon.png"
                  alt=""
                />
                <span>{{items.dataName}}</span>
                <div class="num">5</div>
              </div>
              <div class="rightCaptail">
                <div class="captailDesc">{{items.description}}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 嫌疑主体 -->
        <div class="mainSup">
          <!-- 左边 -->
          <div class="leftSuspicion">嫌疑主体</div>
          <!-- 右侧 -->
          <div class="rightSuspicion">
            <div
              class="suspiAll"
              v-for="items in suspectSubjectList.records"
              :key="items.id"
            >
              <div class="left-susp">
                <img
                  v-if="items.suspectType === 1"
                  src="../assets/SuspecIcon.png"
                  alt=""
                />
                <img
                  v-if="items.suspectType === 2"
                  src="../assets/CompanyIcon.png"
                  alt=""
                />
                <span>{{ items.suspectName }}</span>
              </div>
              <div class="right-susp">
                <div
                  v-for="(tags, index) in items.tags"
                  :key="tags"
                  :class="index % 2 ? 'susp1' : 'susp2'"
                >
                  {{ tags }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 数据分析 -->
      <div class="dataAlayls">
        <div class="collectionTit">
          <div class="iconTil">
            <img src="" alt="" />
            <span>数据分析</span>
          </div>
          <div class="titleMore" @click="toAlay">更多>></div>
        </div>
        <!-- 暂无数据 -->
        <div class="notYetData" v-if="alayData.length == 0">
          <img src="" alt="" />
          <p>暂无数据</p>
        </div>
        <!-- 表格 -->
        <div class="alaysTable" v-else>
          <a-table
            class="analyse-info-top-table analyse-info-bottom-table"
            :columns="alaysColumns"
            :data-source="alayData"
            :pagination="false"
          >
            <span slot="percentage" style="color: tomato" slot-scope="text">
              {{ text }}</span
            >
            <span slot="name" style="color: #363637" slot-scope="text">
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
      </div>
    </div>
    <!-- 分析报告和结论汇总 -->
    <div class="reportAndSummary">
      <!-- 分析报告 -->
      <div class="report">
        <div class="dataColltion">
          <div class="collectionTit">
            <div class="iconTil">
              <img src="../assets/DataIcon-3.png" alt="" />
              <span>分析报告</span>
            </div>
            <div class="titleMore" @click="toRepo">更多>></div>
          </div>
        </div>
        <!-- 分析报告标题 -->
        <div class="reportTitle" v-for="items in analyseList" :key="items.id">
          <div class="leftReport">
            <img src="../assets/ReportIcon.png" alt="" />
            <p>{{ items.report_name }}</p>
          </div>
          <div class="rightReport">
            <img
              @click="reportShow(items)"
              src="../assets/LookOverIcon.png"
              alt=""
            />
            <img
              @click="reportDownLoad(items)"
              src="../assets/DownloadIcon.png"
              alt=""
            />
          </div>
        </div>
        <!-- 暂无数据 -->
        <!-- <div class="notYetData">
          <img src="../assets/zwsu@1.png" alt="" />
          <p>暂无数据</p>
        </div> -->
      </div>
      <!-- 结论汇总 -->
      <div class="summary">
        <div class="dataColltion">
          <div class="collectionTit">
            <div class="iconTil">
              <img src="../assets/DataIcon-4.png" alt="" />
              <span>结论汇总</span>
            </div>
            <div class="titleMore" @click="toSumm">更多>></div>
          </div>
        </div>
        <!-- 暂无数据 -->
        <!-- <div class="notYetData">
          <img src="../assets/zwsu@1.png" alt="" />
          <p>暂无数据</p>
        </div> -->
        <!-- 结论 -->
        <div
          class="summaryAll"
          v-for="items in concludeGatherList"
          :key="items.id"
        >
          <img src="../assets/StarIcon.png" alt="" />
          {{ items.desription }}
        </div>
      </div>
    </div>
    <!-- <router-link class="list" :to="{ path: '/dataCollection' }"
      >数据收集</router-link
    > -->
    <!-- <div @click="toDataCollection">数据收集111</div> -->
    <!-- 编辑弹框 -->
    <!-- 新建弹框 -->
    <a-modal
      v-model="visible"
      title="编辑案件"
      @ok="handleOk"
      :width="'600px'"
      :bodyStyle="{ height: '400px' }"
    >
      <!-- 表单验证 -->
      <div class="verForm">
        <a-form-model
          ref="ruleForm"
          :model="form"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <div class="allCaseDe">
            <div class="left_right">
              <!-- 左边三个 -->
              <div class="left_option">
                <!-- 案件编号 -->
                <div>
                  <a-form-model-item
                    ref="caseNum"
                    label="案件编号"
                    prop="caseNum"
                  >
                    <a-input
                      disabled
                      placeholder="请输入案件编号"
                      v-model="form.caseNum"
                    />
                  </a-form-model-item>
                </div>

                <!-- 立案日期 -->
                <div>
                  <a-form-model-item label="立案时间" prop="data">
                    <a-date-picker
                      v-model="form.data"
                      @change="dataTimeChange"
                      :disabledDate="disabledDate"
                    />
                  </a-form-model-item>
                </div>

                <!-- 案件状态 -->
                <div>
                  <a-form-model-item label="案件状态" prop="region">
                    <a-select
                      placeholder="请选择案件状态"
                      default-value="instatus"
                      v-model="form.region"
                      @change="handleChange"
                    >
                      <a-select-option value="分析中"> 分析中 </a-select-option>
                      <a-select-option value="已完成"> 已完成 </a-select-option>
                      <a-select-option value="已归档"> 已归档 </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </div>
              </div>
              <!-- 右边三个 -->
              <div class="rightCase">
                <!-- 案件名称 -->
                <div>
                  <a-form-model-item label="案件名称" prop="caseName">
                    <a-input
                      placeholder="请输入案件名称"
                      v-model="form.caseName"
                    />
                  </a-form-model-item>
                </div>

                <!-- 案件类型 -->
                <div>
                  <a-form-model-item label="案件类型" prop="caseType">
                    <a-cascader
                      v-model="form.caseType"
                      :options="criOptions"
                      @change="crimeChange"
                      :show-search="fielName"
                      :fieldNames="fielName"
                      placeholder="请选择案件类型"
                    />
                  </a-form-model-item>
                </div>

                <!-- 案件标签 -->
                <div>
                  <a-form-model-item label="案件标签">
                    <a-select
                      mode="tags"
                      :size="size"
                      placeholder="请选择或自定义案件标签"
                      @change="tagHandleChange"
                      v-model="form.label"
                    >
                      <a-select-option v-for="item in crLabel" :key="item.name">
                        {{ item.name }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </div>
              </div>
            </div>
            <!--案件详情 -->
            <div class="caseDescrption" style="margin-left: -154px">
              <a-form-model-item label="案件详情">
                <a-textarea
                  placeholder="请输入案件详情"
                  v-model="form.desc"
                  style="height: 100px; width: 440px"
                  :maxLength="maxLength"
                />
                <p>您还可以输入{{ 500 - form.desc.length }}字</p>
              </a-form-model-item>
            </div>
          </div>
        </a-form-model>
      </div>
    </a-modal>
  </div>
</template>

<script>
// import {
//   caseDetailApi,
//   deleteCaseApi,
//   chargeListApi,
// } from "../../api/caseList";
// import { dataAnalysisApi } from "../../api/analysisOverview";
// import { analysListApi} from '../../api/analysis'
import moment, { now } from 'moment';
const alaysColumns = [
  {
    title: '嫌疑程度',
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
];

const alayData = [
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
];
export default {
  data() {
    return {
      caseDataList: [],
      suspectSubjectList: [],
      concludeGatherList: [],
      analyseList: [],
      moment,
      size: 'default',
      alayData,
      alaysColumns,
      visible: false,
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
      other: '',
      caseInfo: {},
      crLabel: [
        { name: '线索发现', id: 0 },
        { name: '加急件', id: 1 },
        { name: '移交件', id: 2 },
      ],
      form: {
        caseNum: '', // 案件编号
        region: '分析中',
        caseName: '', // 案件名称
        data: undefined,
        label: undefined,
        desc: '', // 案件描述
        type: undefined,
        caseType: null,
      },
      rules: {
        caseNum: [
          {
            required: true,
            message: '请输入案件编号',
            trigger: 'blur',
          },
          {
            min: 8,
            max: 20,
            trigger: 'blur',
          },
        ],
        region: [
          {
            required: true,
            message: '请选择案件状态',
            trigger: 'change',
          },
        ],
        type: [
          {
            required: true,
            message: '请选择案件状态',
            trigger: 'change',
          },
        ],
        caseName: [
          {
            required: true,
            message: '请输入案件名称',
            trigger: 'blur',
          },
          {
            min: 3,
            max: 30,
            trigger: 'blur',
            message: '名称至少大于3个字数',
          },
        ],
        caseType: [
          {
            required: true,
            message: '请选择案件类型',
            trigger: 'change',
          },
        ],
        data: [{ required: true, message: '请选择日期', trigger: 'change' }],
        label: [{ required: true, message: '请选择标签', trigger: 'change' }],
        desc: [
          {
            required: true,
            message: '请输入案件详情',
            trigger: 'blur',
          },
          {
            min: 1,
            max: 500,
            message: '案件详情字数不得超过500字',
            trigger: 'blur',
          },
        ],
      },
      returnCaseLIst: {}, // 案件详情回来的数据
      maxLength: 500,
      //  编辑案件需要的部分参数
      status_code: null, // 状态编码
      charge_name: null, // 类罪名称
      crStatusCode: null, // 类罪代码
      happen_time: null, // 案件时间
      labelTags: null, // 标签
      statusCode: null, // 状态编码
      status_name: '', // 状态名称
      sizeTotal: 0,
      criOptions: [],
      fielName: {
        value: 'code',
        label: 'name',
        children: 'children',
      },
      caseId: '',
    };
  },
  mounted() {
    // this.caseInfo = JSON.parse(sessionStorage.getItem('baseObj'));
    // this.caseId = JSON.parse(sessionStorage.getItem('baseObj')).id;
    this.getAll();
  },
  created() {},
  beforeRouteUpdate(to, from, next) {
    next();
  },
  methods: {
    getAll() {
      // this.detailApi();
      // this.crimeList();
      // this.criminalList();
      this.analysisRepotList();
      this.concludeGather();
      this.dataCollect();
    },
    //  案件详情接口
    detailApi() {
      //  直接拼参数
      let param = this.caseInfo.id;
      // let param = 1;
      caseDetailApi(param).then((res) => {
        if (res.data.code == 200) {
          console.log('1121');

          this.returnCaseLIst = res.data.data;
        }
      });
    },
    // 案件修改接口
    caseUpdata() {
      if (this.labelTags) {
        let param = {
          case_name: this.form.caseName,
          happen_time: this.happen_time || this.form.data,
          status_code: this.statusCode || this.caseInfo.status_code,
          status_name: this.status_name || this.caseInfo.status_name,
          charge_code: this.crStatusCode || this.caseInfo.charge_code,
          charge_name: this.charge_name || this.caseInfo.charge_name,
          description: this.form.desc,
          // tags: this.labelTags || this.caseInfo.tags,
          tags: this.form.label.join(','),
          caseId: this.caseInfo.id,
        };
        caseUpdataApi(param).then((res) => {
          if (res.data.code == 200) {
            this.$message.success('编辑案件成功');
            this.detailApi();
            let baseObj = JSON.parse(sessionStorage.getItem('baseObj'));
            baseObj.case_name = this.form.caseName;
            baseObj.status_code = this.statusCode;
            baseObj.charge_code = this.crStatusCode;
            baseObj.charge_name = this.charge_name;
            baseObj.status_name = this.status_name;
            baseObj.description = this.form.desc;
            baseObj.happen_time = this.happen_time;
            baseObj.tags = this.labelTags.split(',');
            sessionStorage.setItem('baseObj', {});
            sessionStorage.setItem('baseObj', JSON.stringify(baseObj));
            this.caseInfo = JSON.parse(sessionStorage.getItem('baseObj'));
            // console.log(res.data);
          }
        });
      } else {
        let param = {
          case_name: this.form.caseName,
          happen_time: this.happen_time || this.form.data,
          status_code: this.statusCode || this.caseInfo.status_code,
          status_name: this.status_name || this.caseInfo.status_name,
          charge_code: this.crStatusCode || this.caseInfo.charge_code,
          charge_name: this.charge_name || this.caseInfo.charge_name,
          description: this.form.desc,
          // tags: this.labelTags || this.caseInfo.tags,
          // tags: this.form.label.join(",") ,
          caseId: this.caseInfo.id,
        };
        caseUpdataApi(param).then((res) => {
          if (res.data.code == 200) {
            this.$message.success('编辑案件成功');
            this.detailApi();
            let baseObj = JSON.parse(sessionStorage.getItem('baseObj'));
            baseObj.case_name = this.form.caseName;
            baseObj.status_code = this.statusCode;
            baseObj.charge_code = this.crStatusCode;
            baseObj.charge_name = this.charge_name;
            baseObj.status_name = this.status_name;
            baseObj.description = this.form.desc;
            baseObj.happen_time = this.happen_time;
            baseObj.tags = null;
            sessionStorage.setItem('baseObj', {});
            sessionStorage.setItem('baseObj', JSON.stringify(baseObj));
            this.caseInfo = JSON.parse(sessionStorage.getItem('baseObj'));
            //  console.log(res.data);
          }
        });
      }
    },
    // 类罪接口
    crimeList() {
      chargeListApi().then((res) => {
        if (res.data.code == 200) {
          this.criOptions.push(res.data.data);
          this.test = res.data.data.children;
          // console.log(res.data.data.children);
        }
      });
    },
    //  嫌疑人预测接口
    criminalList() {
      let param = {
        caseId: this.caseId,
      };
      dataAnalysisApi(param).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          this.alayData = res.data.data;
        }
      });
    },
    //  分析报告列表请求
    async analysisRepotList() {
      // ggagr&ggagr&ggagr
      let param = {};
      // let res = await xxx(params)
      let res = {
        code: 200,
        msg: null,
        data: {
          title: [],
          count: 4,
          rows: [
            {
              id: 0,
              report_name: 'xxxxxxxx',
              report_type: '类型',
              description: '描述',
              create_time: Date.now(),
            },
            {
              id: 1,
              report_name: 'yyyyyy',
              report_type: '类型',
              description: '描述',
              create_time: Date.now(),
            },
            {
              id: 2,
              report_name: 'zzzzzzz',
              report_type: '类型',
              description: '描述',
              create_time: Date.now(),
            },
          ],
        },
      };
      this.analyseList = res.data.rows;
    },
    // 小眼睛事件
    reportShow(item) {
      alert('id' + item.id);
    },
    // 点击下载
    reportDownLoad(item) {
      alert('id' + item.id);
    },
    // 结论汇总请求
    async concludeGather() {
      // ggagr&ggagr&ggagr
      let params = {};
      // let res = await xxxx(params)
      let res = {
        code: 200,
        msg: null,
        data: {
          count: 4,
          rows: [
            {
              id: 0,
              desription:
                '通过对IP关联交易方账户进出情况的统计分析，找出关联账户数前N个IP地址，进而通过账户与账户关联关系，得到可能存在的同IP团伙 通过对IP关联交易方账户进出情况的统计分析，找出关联账户数前N个IP地址，进而通过账户与账户关联关系，得到可能存在的同IP团伙',
              conclusion_type: '论结类型',
              method: '分析方法',
              group_time: Date.now(),
            },
            {
              id: 1,
              desription:
                '通过对IP关联交易方账户进出情况的统计分析，找出关联账户数前N个IP地址，进而通过账户与账户关联关系，得到可能存在的同IP团伙 通过对IP关联交易方账户进出情况的统计分析，找出关联账户数前N个IP地址，进而通过账户与账户关联关系，得到可能存在的同IP团伙',
              conclusion_type: '论结类型',
              method: '分析方法',
              group_time: Date.now(),
            },
            {
              id: 2,
              desription:
                '33333333333账户进出情况的统计分析，找出关联账户数前N个IP地址，进而通过账户与账户关联关系，得到可能存在的同IP团伙 通过对IP关联交易方账户进出情况的统计分析，找出关联账户数前N个IP地址，进而通过账户与账户关联关系，得到可能存在的同IP团伙',
              conclusion_type: '论结类型',
              method: '分析方法',
              group_time: Date.now(),
            },
            {
              id: 3,
              desription:
                '444444444444账户进出情况的统计分析，找出关联账户数前N个IP地址，进而通过账户与账户关联关系，得到可能存在的同IP团伙 通过对IP关联交易方账户进出情况的统计分析，找出关联账户数前N个IP地址，进而通过账户与账户关联关系，得到可能存在的同IP团伙',
              conclusion_type: '论结类型',
              method: '分析方法',
              group_time: Date.now(),
            },
            {
              id: 4,
              desription:
                '55555555555方账户进出情况的统计分析，找出关联账户数前N个IP地址，进而通过账户与账户关联关系，得到可能存在的同IP团伙 通过对IP关联交易方账户进出情况的统计分析，找出关联账户数前N个IP地址，进而通过账户与账户关联关系，得到可能存在的同IP团伙',
              conclusion_type: '论结类型',
              method: '分析方法',
              group_time: Date.now(),
            },
          ],
        },
      };
      this.concludeGatherList = res.data.rows;
    },
    // 数据收集请求
    async dataCollect() {
      // ggagr&ggagr&ggagr
      // 案情数据
      // let caseRes = await xxxxxx()
      let caseRes = {
        code: 200,
        msg: null,
        data: {
          count: 4,
          rows: [
            {
              dataName: '资金数据',
              dataType: 'CAPTIAL',
              description: 'xx银行股份有限公司关联子账户信息',
              status: 1,
              create_time: Date.now(),
              update_time: Date.now(),
              id: 0,
            },
            {
              dataName: '税务数据',
              dataType: 'TAX',
              description: 'xx有限公司申报信息表',
              status: 1,
              create_time: Date.now(),
              update_time: Date.now(),
              id: 1,
            },
          ],
        },
      };
      this.caseDataList = caseRes.data;
      // let suspectRes = await xxxxx()
      let suspectRes = {
        code: 200,
        msg: null,
        data: {
          total: 1,
          current: 1,
          pages: 1,
          size: 20,
          records: [
            {
              id: 0,
              suspectName: '11111',
              tags: ['1', '2'],
              suspectType: 1,
              eneityIdnumber: '123',
              suspicionContent: '123321',
            },
            {
              id: 1,
              suspectName: '22222',
              tags: ['3', '4'],
              suspectType: 2,
              eneityIdnumber: '123',
              suspicionContent: '123321',
            },
          ],
        },
      };
      this.suspectSubjectList = suspectRes.data;
    },
    // 编辑案件
    dialogShowsedit() {
      this.detailApi();
      this.$refs.amodalsedit.dialogShow();
      this.form.caseNum = this.caseInfo.case_no;
      if (this.returnCaseLIst.status_code == 40) {
        this.form.region = '已完成';
      } else if (this.returnCaseLIst.status_code == 30) {
        this.form.region = '分析中';
      } else if (this.returnCaseLIst.status_code == 50) {
        this.form.region = '已归档';
      }
      this.form.caseType = ['0', this.returnCaseLIst.charge_code];
      // this.form.caseName = this.caseInfo.case_name;
      this.form.caseName = this.returnCaseLIst.case_name;
      // this.form.caseName = this.caseInfo.case_name;
      this.form.data = this.returnCaseLIst.create_time;
      this.form.desc = this.returnCaseLIst.description;
      this.form.label = this.returnCaseLIst.tags.split(',');
      this.form.caseType = ['0', this.returnCaseLIst.charge_code];

      this.detailApi();
    },
    // 案件删除接口
    caseDelete() {
      let param = {
        caseId: this.caseInfo.id,
      };
      deleteCaseApi(param).then((res) => {
        if (res.data.code == 200) {
          this.$message.success('删除案件成功');
        }
      });
    },
    // 案件时间改变
    dataTimeChange(date, dateString) {
      this.happen_time = dateString;
    },
    // 截止选择日期
    disabledDate(current) {
      // Can not select days before today and today
      return current && current > moment().endOf('day');
    },
    // 案件状态改变的回调
    handleChange(value) {
      this.status_name = value;
      // 判断并给出对应的code编码
      if (value == '分析中') {
        this.statusCode = 30;
      } else if (value == '已完成') {
        this.statusCode = 40;
      } else {
        this.statusCode = 50;
      }
    },
    // 类罪改变
    crimeChange(value) {
      //console.log(this.form.caseType, "11111");

      // value对应的是code编码
      this.crStatusCode = value[1];
      // 获取code编码对应的名字
      this.test.forEach((i) => {
        if (i.code == this.crStatusCode) {
          return (this.charge_name = i.name);
        }
      });
    },
    tagHandleChange(value) {
      let obj = value.join();
      this.labelTags = obj;
      // console.log(this.labelTags, "this.labelTags");
    },
    timeOk(date) {
      if (date < moment()) {
        console.log('无效时间，请重新选择');
        this.form.setFields({
          stopTime: {
            value: undefined,
            errors: [new Error('无效时间，请重新选择')],
          },
        });
      }
    },
    toColl() {
      this.$router.push({
        name: 'DataCollection',
      });
    },
    toAlay() {
      this.$router.push({
        name: 'DataAnalysis',
      });
    },
    toRepo() {
      this.$router.push({
        name: 'ReportResearch',
      });
    },
    toSumm() {
      this.$router.push({
        name: 'Summary',
      });
    },
    // 弹框点击确定
    modalDetermine() {
      console.log('111');
    },
    editDlog() {
      this.detailApi();
      this.visible = true;
      this.form.caseNum = this.caseInfo.case_no;
      if (this.returnCaseLIst.status_code == 40) {
        this.form.region = '已完成';
      } else if (this.returnCaseLIst.status_code == 30) {
        this.form.region = '分析中';
      } else if (this.returnCaseLIst.status_code == 50) {
        this.form.region = '已归档';
      }
      this.form.caseType = ['0', this.returnCaseLIst.charge_code];
      // this.form.caseName = this.caseInfo.case_name;
      this.form.caseName = this.returnCaseLIst.case_name;
      // this.form.caseName = this.caseInfo.case_name;
      this.form.data = this.returnCaseLIst.create_time;
      this.form.desc = this.returnCaseLIst.description;
      this.form.label = this.returnCaseLIst.tags.split(',');
      this.form.caseType = ['0', this.returnCaseLIst.charge_code];

      this.detailApi();
    },
    // 提交表格
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleOk(e) {
      console.log(e);
      this.form.caseType = ['0', this.returnCaseLIst.charge_code];
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.caseUpdata();
          this.visible = false;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 有bug
    showConfirm() {
      const _this = this;
      this.$confirm({
        title: '是否确定删除该案件',

        onOk() {
          return new Promise((resolve, reject) => {
            let param = {
              caseId: JSON.parse(sessionStorage.getItem('baseObj')).id,
            };
            deleteCaseApi(param)
              .then((res) => {
                if (res.data.code == 200) {
                  _this.$message.success('删除案件成功');
                  _this.$router.push({
                    path: '/caseManage',
                  });
                } else {
                  _this.$message.success('删除案件失败');
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
  },
};
</script>
<style lang="less" scoped>
.case-details {
  min-width: 1300px;
  padding-left: 20px;
  padding-right: 20px;
  // 案件详情
  .detailWrapper {
    margin-top: 15px;
    padding-left: 20px;
    width: 100%;
    height: 240px;
    background: #fdfeff;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.06);
    border-radius: 4px;
    .title-label {
      display: flex;
      justify-content: space-between;
      //  标题
      .title {
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #212121;
        line-height: 40px;
        height: 40px;
        font-weight: bold;
        position: relative;
      }
      //
      .caseLabel {
        position: relative;
        margin-top: 10px;
        .statusImage {
          width: 85px;
          height: 30px;
        }
        .descStatus {
          position: absolute;
          left: 35%;
          top: 15%;
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #ffffff;
        }
      }
    }
    // 案件详情等
    .moreOpration {
      display: flex;
      justify-content: space-between;
      height: 40px;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #353535;
      line-height: 40px;
      // 编辑及删除图标
      .editAndDele {
        img {
          width: 16px;
          height: 15px;
        }
        .image2 {
          margin-left: 20px;
          margin-right: 20px;
        }
      }
    }
    // 案件描述
    .caseDataDetail {
      height: 60px;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #6c767d;
      text-align: justify;
      line-height: 20px;
      margin-right: 20px;
    }
    // 案件时间及创建
    .caseTimeCreate {
      height: 20px;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #afb6bb;
      line-height: 20px;
      .iconTimeIcon {
        font-size: 12px;
        margin-right: 6px;
      }
      .detailMin {
        margin-left: 10px;
        margin-right: 6px;
      }
      .admin {
        margin-right: 10px;
      }
    }
    // 横线
    .detailLine {
      //  width: 100%;
      height: 1px;
      background-color: #eaeef5;
      margin-top: 10px;
    }
    // 案件标签
    .detailLabel {
      height: 44px;
      display: flex;
      align-items: center;
      margin-top: 14px;
      .label-tabs1 {
        display: flex;
        width: 70px;
        height: 22px;
        background: #e4f1ff;
        border-radius: 11px;
        // 文字
        .labelDesc {
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #1890ff;
          margin-left: 5px;
        }
        // 图标
        .imageIcon {
          background-image: url('../assets/LabelIconBlue.png');
          background-repeat: no-repeat;
          background-size: 100% 100%;
          width: 18px;
          height: 18px;
        }
      }
      .label-tabs2 {
        display: flex;
        width: 70px;
        height: 22px;
        background: #e2f6cb;
        border-radius: 11px;
        margin-left: 12px;
        // 文字
        .labelDesc {
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #52c41b;
          margin-left: 5px;
        }
        // 图标
        .imageIcon {
          background-image: url('../assets/LabelIconGreen.png');
          background-repeat: no-repeat;
          background-size: 100% 100%;
          width: 18px;
          height: 18px;
        }
      }
      .label-tabs3 {
        display: flex;
        width: 70px;
        height: 22px;
        background: #e4f1ff;
        border-radius: 11px;
        margin-left: 12px;
        // 文字
        .labelDesc {
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #1890ff;
          margin-left: 5px;
        }
        // 图标
        .imageIcon {
          background-image: url('../assets/LabelIconBlue.png');
          background-repeat: no-repeat;
          background-size: 100% 100%;
          width: 18px;
          height: 18px;
        }
      }
      .label-tabs4 {
        display: flex;
        width: 70px;
        height: 22px;
        background: #dffffa;
        border-radius: 11px;
        margin-left: 12px;
        // 文字
        .labelDesc {
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #14c2c1;
          margin-left: 5px;
        }
        // 图标
        .imageIcon {
          background-image: url('../assets/LabelIconGreenG.png');
          background-repeat: no-repeat;
          background-size: 100% 100%;
          width: 18px;
          height: 18px;
        }
      }
    }
  }
  // 数据收集和数据分析
  .dataColletionAl {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    // 数据收集
    .dataColltion {
      height: 360px;
      width: 49.5%;
      background: #ffffff;
      box-shadow: 0 0 20px 0 rgba(24, 144, 255, 0.1);
      border-radius: 4px;
      padding-left: 20px;
      position: relative;
      .notYetData {
        position: absolute;
        left: 50%;
        top: 50%;
        p {
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #afb6bb;
          line-height: 20px;
          margin-top: 19px;
          margin-left: 10px;
        }
      }
      // 标题
      .collectionTit {
        height: 40px;
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        line-height: 20px;
        .iconTil {
          font-family: PingFangSC-Semibold;
          font-size: 16px;
          color: #353535;
          img {
            width: 16px;
            height: 16px;
            margin-right: 5px;
          }
        }
        .titleMore {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #3f9eff;
          text-align: right;
          padding-right: 20px;
          cursor: pointer;
        }
      }
      // 案情数据
      .caseData1 {
        display: flex;
        justify-content: space-between;
        // 左边
        .caseLeft {
          font-family: PingFangSC-Medium;
          font-size: 14px;
          width: 10%;
          margin-top: 30px;
          color: #353535;
        }
        // 右边
        .caseRight {
          margin-right: 20px;
          width: 90%;
          .capitalData {
            width: 100%;
            min-height: 85px;
            background: #fdf6ec;
            border: 1px solid #f5dbb1;
            border-radius: 4px;
            display: flex;
            justify-content: space-between;
            .leftCaptail {
              display: flex;
              height: 20px;
              margin-left: 58px;
              margin-top: 33px;
              width: 120px;
              img {
                width: 14px;
                height: 15px;
                margin-top: 5px;
                margin-right: 4px;
              }
              span {
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #353535;
              }
              .num {
                width: 22px;
                height: 15px;
                background: #ffeebd;
                border-radius: 2px;
                line-height: 15px;
                text-align: center;
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #f7b500;
                margin-top: 5px;
                margin-left: 4px;
              }
            }
            .rightCaptail {
              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: #707070;
              // height: 17px;
              line-height: 17px;
              display: flex;
              flex-direction: column;
              align-items: center;
              margin-top: 20px;
              margin-right: 20%;
            }
          }
          // 税务数据
          .taxationData {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
            // width: 803px;
            min-height: 85px;
            background: #f3f9ff;
            border: 1px solid #c9e7ff;
            border-radius: 4px;
            .leftCaptail {
              display: flex;
              width: 120px;
              height: 20px;
              margin-top: 33px;
              margin-left: 58px;
              img {
                width: 14px;
                height: 15px;
                margin-top: 5px;
                margin-right: 4px;
              }
              span {
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #353535;
              }
              .num {
                width: 22px;
                height: 15px;
                background: #e6f4ff;
                border-radius: 2px;
                line-height: 15px;
                text-align: center;
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #1890ff;
                margin-top: 5px;
                margin-left: 4px;
              }
            }
            .rightCaptail {
              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: #707070;
              // height: 17px;
              line-height: 17px;
              display: flex;
              flex-direction: column;
              // align-items: center;
              margin-right: 28%;
              margin-top: 20px;
            }
          }
        }
      }
      // 嫌疑主体
      .mainSup {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .leftSuspicion {
          font-family: PingFangSC-Medium;
          font-size: 14px;
          color: #353535;
          width: 10%;
        }
        // 右边
        .rightSuspicion {
          margin-top: 25px;
          width: 90%;
          min-height: 85px;
          background: #fef1f0;
          border: 1px solid #fbc6c6;
          border-radius: 4px;
          margin-right: 20px;
          .suspiAll {
            display: flex;
            justify-content: space-between;
            .left-susp {
              margin-left: 58px;
              align-items: center;
              margin-top: 15px;
              width: 120px;
              display: flex;
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #353535;
              img {
                width: 14px;
                height: 15px;
                margin-right: 4px;
              }
            }
            .right-susp {
              display: flex;
              margin-right: 25%;
              margin-top: 13px;
              .susp1 {
                margin-left: 10px;
                padding: 0 5px;
                background: #fff0f6;
                border: 1px solid #ffdae9;
                box-sizing: border-box;
                border-radius: 4px;
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #fe4d97;
              }
              .susp2 {
                margin-left: 10px;
                padding: 0 5px;
                box-sizing: border-box;
                background: #e3d9fc;
                border: 1px solid #d9c9ff;
                border-radius: 4px;
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #7540ee;
              }
            }
          }
        }
      }
    }
    // 数据分析
    .dataAlayls {
      width: 49.5%;
      height: 360px;
      background: #ffffff;
      box-shadow: 0 0 20px 0 rgba(24, 144, 255, 0.1);
      border-radius: 4px;
      padding-left: 20px;
      overflow: auto;
      position: relative;
      .notYetData {
        position: absolute;
        left: 50%;
        top: 50%;
        p {
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #afb6bb;
          line-height: 20px;
          margin-top: 19px;
          margin-left: 10px;
        }
      }
      // 标题
      .collectionTit {
        height: 40px;
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        line-height: 20px;
        .iconTil {
          font-family: PingFangSC-Semibold;
          font-size: 16px;
          color: #353535;
          img {
            width: 16px;
            height: 16px;
            margin-right: 5px;
          }
        }
        .titleMore {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #3f9eff;
          text-align: right;
          padding-right: 20px;
          cursor: pointer;
        }
      }
    }
  }
  // 分析报告和结论汇总
  .reportAndSummary {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    // 分析报告
    .report {
      height: 315px;
      width: 49.5%;
      background: #ffffff;
      box-shadow: 0 0 20px 0 rgba(24, 144, 255, 0.1);
      border-radius: 4px;
      padding-left: 20px;
      position: relative;
      // 暂无数据
      .notYetData {
        position: absolute;
        left: 50%;
        top: 50%;
        p {
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #afb6bb;
          line-height: 20px;
          margin-top: 19px;
          margin-left: 10px;
        }
      }
      // 标题
      .collectionTit {
        height: 40px;
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        line-height: 20px;
        .iconTil {
          font-family: PingFangSC-Semibold;
          font-size: 16px;
          color: #353535;
          img {
            width: 16px;
            height: 16px;
            margin-right: 5px;
          }
        }
        .titleMore {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #3f9eff;
          text-align: right;
          padding-right: 20px;
          cursor: pointer;
        }
      }
      .reportTitle {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        .leftReport {
          display: flex;
          align-items: center;
          img {
            width: 13px;
            height: 14px;
            vertical-align: middle;
          }
          p {
            margin: 0;
            margin-left: 6px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #777777;
          }
        }
        .rightReport {
          img {
            width: 14px;
            height: 10px;
            margin-right: 20px;
          }
        }
      }
    }
    // 结论汇总
    .summary {
      min-height: 315px;
      width: 49.5%;
      background: #ffffff;
      box-shadow: 0 0 20px 0 rgba(24, 144, 255, 0.1);
      border-radius: 4px;
      padding-left: 20px;
      padding-right: 20px;
      position: relative;
      .notYetData {
        position: absolute;
        left: 50%;
        top: 50%;
        p {
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #afb6bb;
          line-height: 20px;
          margin-top: 19px;
          margin-left: 10px;
        }
      }
      // 标题
      .collectionTit {
        height: 40px;
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        line-height: 20px;
        .iconTil {
          font-family: PingFangSC-Semibold;
          font-size: 16px;
          color: #353535;
          img {
            width: 16px;
            height: 16px;
            margin-right: 5px;
          }
        }
        .titleMore {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #3f9eff;
          text-align: right;
          padding-right: 20px;
          cursor: pointer;
        }
      }
      .summaryAll {
        // height: 40px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #707070;
        text-align: justify;
        line-height: 30px;
        img {
          width: 14px;
          height: 13px;
        }
      }
    }
  }
}
// 弹框样式
.verForm {
  .allCaseDe {
    display: flex;
    flex-direction: column;
    .left_right {
      display: flex;
    }
  }
}
</style>
<style scoped>
.editAndDele >>> .ant-modal-confirm .ant-modal-body {
  width: 400px;
  height: 200px;
}
.editAndDele >>> .ant-modal-confirm .ant-modal-confirm-btns {
  margin-top: 80px;
}
</style>
