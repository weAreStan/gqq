<!--
 * @Author: 勾青琼
 * @Date: 2021-03-08 10:38:12
 * @LastEditTime: 2021-04-07 16:08:49
 * @LastEditors: Please set LastEditors
 * @report_desc: 分析报告
 * @FilePath: \guidance\src\views\reportResearch\index.vue
-->
<template>
  <div class="wrapper">
    <!-- 搜索及新增 -->
    <div class="search_add">
      <div class="search-wrapper">
        <a-input
          class="search-input"
          v-model="inputSearch"
          placeholder="请输入"
          @change.enter="searchLawName"
        >
        </a-input>
        <a-icon type="search" class="top-search" />
      </div>
      <!--  新增 -->
      <a-button @click="reportPopup" type="primary" icon="plus">
        新增
      </a-button>
    </div>
    <!--  下方表格
      :rowKey="(record) => record.suspectName"
     -->
    <div class="table-wrapper">
      <a-table
        class="analyse-info-top-table"
        :columns="reportColums"
        :data-source="reportData"
        :pagination="false"
      >
        <span slot="action" slot-scope="text, record">
          <span
            style="font-size: 14px; color: #1890ff; cursor: pointer"
            @click="reportPopup(record)"
            >编辑&nbsp;&nbsp;&nbsp;&nbsp;</span
          >
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span
            style="font-size: 14px; color: #1890ff; cursor: pointer"
            @click="report(record)"
            >导出&nbsp;&nbsp;&nbsp;&nbsp;</span
          >
          <!--  cofirm确认弹框 -->
          <span
            style="font-size: 14px; color: #1890ff; cursor: pointer"
            @click="deleteReport(record)"
            >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;删除</span
          >
        </span>
      </a-table>
    </div>
    <!-- 分页 -->
    <div class="footer">
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
    <!--  弹窗 -->
    <a-modal
      v-model="visible"
      :title="reportType"
      @ok="handleOk"
      @cancel="handleCansel"
      :width="'600px'"
      :bodyStyle="{ height: '400px' }"
    >
      <a-form-model
        ref="ruleForm"
        :model="form_wrapper"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item
          label="报告名称："
          ref="report_name"
          prop="report_name"
        >
          <a-input
            :style="{ width: inputW, height: '32px' }"
            v-model.trim="form_wrapper.report_name"
            placeholder="请输入报告名称"
          />
        </a-form-model-item>

        <a-form-model-item
          label="报告类型："
          ref="report_type"
          prop="report_type"
        >
          <a-select
            v-model.trim="form_wrapper.report_type"
            :style="{ width: inputW }"
          >
            <a-select-option value="1"> 资金分析 </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="描述：" ref="report_desc">
          <a-textarea
            v-model.trim="form_wrapper.report_desc"
            style="resize: none;"
            placeholder="请输入描述"
            rows="5"
          ></a-textarea>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
const reportColums = [
  {
    title: '报告名称',
    dataIndex: 'report_name',
    key: 'report_name',
    // width: 150,
  },
  {
    title: '报告类型',
    dataIndex: 'report_type',
    key: 'report_type',
    filters: [],
    onFilter: (value, record) => record.level.indexOf(value) !== -1,
  },
  {
    title: '描述',
    dataIndex: 'report_desc',
    key: 'report_desc',
    // width: 250,
  },
  {
    title: '生成时间',
    dataIndex: 'create_time',
    key: 'create_time',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.create_time - b.create_time,
  },
  {
    title: '操作',
    key: 'operation',
    scopedSlots: { customRender: 'action' },
  },
];
const reportData = [
  {
    key: '1',
    report_name: 'xx银行股份有限公司明细表',
    report_type: '资金分析',
    report_desc: '该报告是描述了一些该报告',
    create_time: '2019-02-18 22:30:25',
  },
  {
    key: '2',
    report_name: 'xx银行股份有限公司明细表',
    report_type: '资金分析',
    report_desc: '该报告是描述了一些该报告',
    create_time: '2019-02-18 22:34:25',
  },
  {
    key: '3',
    report_name: 'xx银行股份有限公司明细表',
    report_type: '资金分析',
    report_desc: '该报告是描述了一些该报告',
    create_time: '2019-02-18 22:38:25',
  },
  {
    key: '4',
    report_name: 'xx银行股份有限公司明细表',
    report_type: '资金分析',
    report_desc: '该报告是描述了一些该报告',
    create_time: '2019-02-18 22:35:25',
  },
  {
    key: '5',
    report_name: 'xx银行股份有限公司明细表',
    report_type: '资金分析',
    report_desc: '该报告是描述了一些该报告',
    create_time: '2019-02-18 22:20:25',
  },
];
export default {
  data() {
    return {
      reportType: '',
      reportColums,
      reportData,
      inputSearch: '', // 输入框值
      sizeTotal: 200,
      pageSizeOptions: ['10', '12', '24', '30'],
      defaultPageSize: 12,
      pageNum: 12, // 每页显示数量
      pageIndex: 1, // 分页索引
      visible: false,
      visibleEdit: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      inputW: '480px',
      form_wrapper: {
        report_name: '',
        report_type: '',
        report_desc: '',
      },
      rules: {
        report_name: [
          {
            required: true,
            message: '请输入报告名称',
            trigger: 'blur',
          },
        ],

        report_type: [
          {
            required: true,
            message: '请选择级别',
            trigger: 'change',
          },
        ],
      },
      rules_edit: {
        report_name_edit: [
          {
            required: true,
            message: '请输入报告名称',
            trigger: 'blur',
          },
        ],

        report_desc_edit: [
          {
            required: true,
            message: '请选择级别',
            trigger: 'change',
          },
        ],
      },
    };
  },
  methods: {
    //  输入框搜索
    searchLawName() {
      console.log('1');
    },
    //  报告弹窗
    reportPopup(item) {
      if (item.report_name) {
        // 编辑
        this.reportType = '编辑报告';
        this.form_wrapper = item;
      } else {
        // 新增
        this.reportType = '新增报告';
      }
      this.visible = true;
    },
    //  导出报告
    report() {},
    //  删除报告
    deleteReport() {
      this.$confirm({
        title: '是否确定删除该报告',
        onOk() {
          console.log('OK');
        },
        onCancel() {
          console.log('Cancel');
        },
        class: 'test',
      });
    },
    onShowSizeChange(pageIndex, pageNum) {
      this.pageNum = pageNum;
    },
    footer_change(pageIndex, pageNum) {
      this.pageIndex = pageIndex;
      // 写的死数据？
      this.pageNum = 12;
    },
    // 提交
    handleOk() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.reportType === '新增报告') {
            alert('新增报告提交');
          } else {
            alert('编辑报告提交');
          }
          this.visible = false;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 取消
    handleCansel() {
      // 清空表单数据
      this.form_wrapper = {
        report_name: '',
        report_type: '',
        report_desc: '',
      };
    },
  },
};
</script>
<style lang="less" scoped>
/deep/ .ant-modal-title {
  font-family: PingFangSC-Medium;
  font-size: 16px;
  font-weight: 600;
  color: #363637;
}
.wrapper {
  width: 100%;
  height: 100%;
  margin-top: 15px;
  padding-left: 20px;
  padding-right: 20px;
  background: #ffffff;
  border-radius: 4px;
  .search_add {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .search-wrapper {
      width: 320px;
      position: relative;
      .search-input {
        padding-right: 30px;
      }
      .top-search {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 10px;
        width: 12px;
        color: #1890ff;
      }
    }
    .add-list {
      width: 4.2%;
    }
  }
  .table-wrapper {
    border: 1px solid #eaeef5;
    box-sizing: border-box;
  }
  .footer {
    float: right;
    margin-top: 20px;
  }
}
</style>
<style scoped>
.table-wrapper >>> .ant-table-thead > tr > th {
  background: #f8fbff;
}
.ant-form {
  margin-left: -20px;
}
</style>
