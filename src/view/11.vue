<!--
 * @Author: 勾青琼
 * @Date: 2021-03-05 17:57:48
 * @LastEditTime: 2021-04-09 16:08:59
 * @LastEditors: Please set LastEditors
 * @Description: 角色管理
 * @FilePath: \guidance\src\views\roleManagement\index.vue
-->
<template>
  <div class="management_wrapper">
    <div class="double_wrapper">
      <!-- 选择器 -->
      <div class="select_wrapper">
        系统角色：
        <a-select @change="handleChange" default-value="1" class="select_role">
          <a-select-option value="1"> 管理员 </a-select-option>
          <a-select-option value="2"> 普通用户 </a-select-option>
        </a-select>
      </div>
      <a-menu
        mode="horizontal"
        @click="add_edit_dialog"
        style="border: 1px solid transparent;"
      >
        <a-sub-menu>
          <span slot="title" class="submenu-title-wrapper">
            <img src="../assets/logo.png" alt="" class="upIcon" />
          </span>
          <a-menu-item key="add">
            <a href="javascript:;">新增</a>
          </a-menu-item>
          <a-menu-item key="edit">
            <a href="javascript:;">编辑</a>
          </a-menu-item>
          <a-menu-item key="delete">
            <a href="javascript:;">删除</a>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </div>
    <!--  表格 -->
    <div class="table">
      <a-table
        bordered
        align="center"
        :row-selection="rowSelection"
        :columns="columns"
        :data-source="data"
        :pagination="false"
      />
    </div>
    <!-- 新增的弹框 -->
    <a-modal
      v-model="visible"
      :title="reportType"
      @ok="handleOk"
      @cancel="handleCansel"
      :width="'400px'"
      :bodyStyle="{ height: '100px' }"
    >
      <a-form-model
        ref="ruleForm"
        :model="form_wrapper"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item
          label="角色名称："
          ref="roleName"
          prop="roleName"
          style="margin-top:10px"
        >
          <a-input
            :style="{ width: inputW, height: '32px' }"
            v-model.trim="form_wrapper.roleName"
            placeholder="请输入角色名称"
          />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows
    );
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};
const columns = [
  {
    title: '功能模块',
    dataIndex: 'functionMoudler',
    key: 'functionMoudler',
    align: 'center',
    width: '35%',
  },
  {
    title: '操作权限',
    dataIndex: 'opration',
    key: 'opration',
    align: 'center',
  },
];
const data = [
  {
    key: '1',
    functionMoudler: '案件管理',
    opration: '查看案件列表',
  },
  {
    key: '2',
    functionMoudler: '案件管理',
    opration: '编辑案件列表',
  },
];
export default {
  data() {
    return {
      rowSelection,
      columns,
      data,
      visible: false,
      reportType: '',
      labelCol: { span: 6 },
      wrapperCol: { span: 15 },
      form_wrapper: {
        roleName: '',
      },
      rules: {
        roleName: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
          },
        ],
      },
      inputW: '200px',
    };
  },
  methods: {
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    //  新增及编辑
    add_edit_dialog(e) {
      const type = e.key;
      this.visible = true;
      console.log(type);
    },
    //  删除
    delete_role_name() {
      this.$confirm({
        title: '是否确定删除该数据',
        onOk() {
          console.log('OK');
        },
        onCancel() {
          console.log('Cancel');
        },
        class: 'test',
      });
    },
    // 提交
    handleOk() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.reportType === '新增用户') {
            alert('新增用户');
          } else {
            alert('编辑用户提交');
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
      //将所有字段值重置为初始值并移除校验结果
      this.$refs.ruleForm.resetFields();
      // 清空表单数据
      this.form_wrapper = {
        name: '',
        role: '',
        user_pass: '',
        phone: '',
        email: '',
        content: '',
      };
    },
  },
};
</script>
<style lang="less" scoped>
/deep/ .ant-menu-submenu-title {
  padding: 0;
}
/deep/ .ant-table-selection-column {
  border-right: none !important;
}
/deep/ .ant-table-row-cell-break-word {
  border-right: none !important;
}
/deep/ .ant-menu-horizontal > .ant-menu-item:hover,
.ant-menu-horizontal > .ant-menu-submenu:hover,
.ant-menu-horizontal > .ant-menu-item-active,
.ant-menu-horizontal > .ant-menu-submenu-active,
.ant-menu-horizontal > .ant-menu-item-open,
.ant-menu-horizontal > .ant-menu-submenu-open,
.ant-menu-horizontal > .ant-menu-item-selected,
.ant-menu-horizontal > .ant-menu-submenu-selected {
  border-bottom: 2px solid transparent;
}

/deep/ .ant-menu-vertical.ant-menu-sub {
  width: 80px !important;
}

.management_wrapper {
  width: 100%;
  height: 100%;
  margin-top: 15px;
  padding-left: 20px;
  padding-right: 20px;
  background: #ffffff;
  border-radius: 4px;
  .double_wrapper {
    display: flex;
    .select_wrapper {
      height: 50px;
      line-height: 50px;
      .select_role {
        width: 200px;
      }
    }
  }

  .upIcon {
    margin-left: 10px;
    width: 14px;
    height: 14px;
  }

  .table {
  }
}
</style>
