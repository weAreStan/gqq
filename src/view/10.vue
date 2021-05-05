<!--
 * @Author: 勾青琼
 * @Date: 2021-03-05 17:57:48
 * @LastEditTime: 2021-04-08 17:19:36
 * @LastEditors: Please set LastEditors
 * @Description: 用户管理
 * @FilePath: \guidance\src\views\userManagement\index.vue
-->
<template>
  <div class="user_wrapper">
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
      <a-button @click="add_new_user" type="primary" icon="plus">
        新增
      </a-button>
    </div>
    <div class="table-wrapper">
      <a-table
        class="analyse-info-top-table"
        :columns="userColums"
        :data-source="userData"
        :pagination="false"
      >
        <span slot="action" slot-scope="text, record">
          <span
            style="font-size: 14px; color: #1890ff; cursor: pointer"
            @click="add_new_user(record)"
            >编辑&nbsp;&nbsp;&nbsp;&nbsp;</span
          >
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>

          <!--  cofirm确认弹框 -->
          <span
            style="font-size: 14px; color: #1890ff; cursor: pointer"
            @click="deleteUser(record)"
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
        :labelCol="{ span: 4 }"
        ref="ruleForm"
        :model="form_wrapper"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="用户名：" ref="name" prop="name">
          <a-input
            :style="{ width: inputW, height: '32px' }"
            v-model.trim="form_wrapper.name"
            placeholder="请输入用户名"
          />
        </a-form-model-item>
        <a-form-model-item label="角色：" ref="role" prop="role">
          <a-select v-model.trim="form_wrapper.role" :style="{ width: inputW }">
            <a-select-option value="1"> 管理员 </a-select-option>
            <a-select-option value="2"> 数据分析师 </a-select-option>
            <a-select-option value="3"> 普通用户 </a-select-option>
            <a-select-option value="4"> 案情分析专家 </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item
          label="用户密码："
          style="position: relative;"
          has-feedback
          ref="user_pass"
          prop="user_pass"
        >
          <a-input-password
            :disabled="forbidPass"
            placeholder="请输入密码"
            v-model.trim="form_wrapper.user_pass"
            :style="{ width: inputW }"
          />
          <a-button
            type="link"
            v-if="forbidPass"
            @click="forbidPass = false"
            style="position: absolute; top: 50%; transform: translateY(-50%); right: -50px; font-size: 14px;"
          >
            修改
          </a-button>
        </a-form-model-item>
        <a-form-model-item label="联系电话：" ref="phone" prop="phone">
          <a-input
            :style="{ width: inputW, height: '32px' }"
            v-model.trim="form_wrapper.phone"
            placeholder="请输入联系电话"
          />
        </a-form-model-item>
        <a-form-model-item label="邮箱：" ref="email" prop="email">
          <a-input
            :style="{ width: inputW, height: '32px' }"
            v-model.trim="form_wrapper.email"
            placeholder="请输入邮箱"
          />
        </a-form-model-item>
        <a-form-model-item label="备注：" ref="content" prop="content">
          <a-textarea
            v-model.trim="form_wrapper.content"
            style="resize: none"
            placeholder="请输入备注"
            rows="2"
          >
          </a-textarea>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
const userColums = [
  {
    title: '用户名',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => {
      // a.name.charCodeAt(0) - b.name.charCodeAt(0)
      // return a.name.localeCompare(b.name, 'zh');
      let reg = /[a-zA-Z0-9]/;
      if (reg.test(a.name) || reg.test(b.name)) {
        if (a.name > b.name) {
          return 1;
        } else if (a.name < b.name) {
          return -1;
        } else {
          return 0;
        }
      } else {
        return a.name.localeCompare(b.name);
      }
    },
    // sorter: (a, b) => {
    //   let stringA = a.name.toUpperCase();
    //   let stringB = b.name.toUpperCase();
    //   console.log(stringA, stringB)
    //   if (stringA < stringB) {
    //     return -1;
    //   }
    //   if (stringA > stringB) {
    //     return 1;
    //   }
    //   return 0;
    // },
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: '角色',
    dataIndex: 'role',
    key: 'role',
    filters: [
      {
        text: '管理员',
        value: '管理员',
      },
      {
        text: '数据分析师',
        value: '数据分析师',
      },
      {
        text: '普通用户',
        value: '普通用户',
      },
      {
        text: '案情分析专家',
        value: '案情分析专家',
      },
    ],
    filterMultiple: false,
    onFilter: (value, record) => record.role.indexOf(value) === 0,
  },
  {
    title: '联系电话',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    sorter: (a, b) => Date.parse(a.createTime) - Date.parse(b.createTime),
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: '备注',
    dataIndex: 'content',
    key: 'content',
  },
  {
    title: '操作',
    key: 'operation',
    scopedSlots: {
      customRender: 'action',
    },
  },
];
const userData = [
  {
    key: '1',
    name: 'c',
    role: '管理员',
    phone: '010-8699589',
    user_pass: 88888888,
    email: '1462569149@qq.com',
    createTime: '2019-02-18 22:30:25',
    content: '备注信息',
  },
  {
    key: '2',
    name: '啊',
    role: '数据分析师',
    phone: '010-8699589',
    user_pass: 88888888,
    email: '1462569149@qq.com',
    createTime: '2019-02-19 22:30:25',
    content: '备注信息',
  },
  {
    key: '3',
    name: 'e',
    role: '普通用户',
    phone: '010-8699589',
    user_pass: 88888888,
    email: '1462569149@qq.com',
    createTime: '2019-02-19 22:30:25',
    content: '备注信息',
  },
  {
    key: '4',
    name: '吧',
    role: '案情分析专家',
    phone: '010-8699589',
    user_pass: 88888888,
    email: '1462569149@qq.com',
    createTime: '2019-08-19 22:30:25',
    content: '备注信息',
  },
  {
    key: '5',
    name: '的',
    role: '普通用户',
    phone: '010-8699589',
    user_pass: 88888888,
    email: '1462569149@qq.com',
    createTime: '2019-08-19 22:30:25',
    content: '备注信息',
  },
];
export default {
  data() {
    return {
      userColums,
      userData,
      inputSearch: '', // 输入框的值
      sizeTotal: 0,
      pageSizeOptions: ['10', '12', '24', '30'],
      defaultPageSize: 12,
      pageNum: 12, // 每页显示数量
      pageIndex: 1, // 分页索引
      visible: false,
      inputW: '460px',
      reportType: '',
      forbidPass: false,
      labelCol: {
        span: 3,
      },
      wrapperCol: {
        span: 20,
      },
      form_wrapper: {
        name: '',
        role: '',
        user_pass: '',
        phone: '',
        email: '',
        content: '',
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
          },
        ],

        role: [
          {
            required: true,
            message: '请选择角色',
            trigger: 'change',
          },
        ],
        user_pass: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          },
        ],
        email: [
          {
            type: 'email',
            required: false,
            message: '请输入正确的邮箱格式',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  mounted() {
    this.userColums[1].filters = { a: 'b', c: 'd' };
    console.log(this.userColums);
  },
  methods: {
    // 搜索
    searchLawName() {
      console.log('1');
    },
    // 新增
    add_new_user(item) {
      if (item.name) {
        // 编辑
        this.reportType = '编辑用户';
        this.forbidPass = true;
        this.form_wrapper = Object.assign({}, item);
      } else {
        // 新增
        this.reportType = '新增用户';
        this.forbidPass = false;
      }
      this.visible = true;
    },
    //  编辑
    dialogShow() {
      console.log('1');
    },
    //  删除
    deleteUser() {
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
/deep/ .ant-modal-title {
  font-family: PingFangSC-Medium;
  font-size: 16px;
  font-weight: 600;
  color: #363637;
}
/deep/ .ant-table-thead > tr > th {
  background: #f8fbff;
}

/deep/ .ant-input-password-icon {
  color: #1890ff;
}

/deep/ .ant-form-item {
  margin-bottom: 15px;
}

.user_wrapper {
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
