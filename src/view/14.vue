<!--
 * @Author: 勾青琼
 * @Date: 2021-03-05 09:08:19
 * @LastEditTime: 2021-04-15 09:49:10
 * @LastEditors: Please set LastEditors
 * @Description:常用工具部分注释 后台接口调整可打开
 * @FilePath: \guidance\src\App.vue
-->
<template>
  <div class="small-tool">
    <!-- 左侧展示列表 -->
    <div class="left-wrapper">
      <a-menu mode="vertical" :defaultSelectedKeys="defaultSelectedKeys">
        <a-menu-item
          v-for="(item, index) in leftListData"
          :index="(index + 1).toString()"
          :key="index"
          @click="showForm(index)"
        >
          <a-icon style="color: #ccc; margin-right: 0;" type="caret-right" />
          {{ item.title }}
        </a-menu-item>
      </a-menu>
    </div>
    <!-- 右侧内容 -->
    <div class="right-wrapper">
      <div style="width: 100%; text-align: right;">
        <!-- 导出 -->
        <a-button
          type="primary"
          icon="vertical-align-bottom"
          style="margin-top: 20px"
          @click="exportReport"
        >
          导出
        </a-button>
      </div>
      <!-- 靠上的边框+查询 -->
      <div class="top-wrapper">
        <!-- 框 -->
        <div class="input-wrapper">
          <a-textarea
            v-model="textarea"
            style="resize: none; "
            :placeholder="
              infoIndex == 0
                ? '请输入IP,多个以逗号隔开'
                : infoIndex == 1
                ? '请输入手机号，多个以逗号隔开'
                : infoIndex == 2
                ? '请输入银行卡号，多个以逗号隔开'
                : infoIndex == 3
                ? '请输入身份证号，多个以逗号隔开'
                : '请输入社会统一信用代码，多个以逗号隔开'
            "
            :rows="6"
          />
          <div class="input-search" @click="findList">
            <a-icon type="search" />
            <p>查询</p>
          </div>
        </div>
      </div>
      <!-- 靠下的表格 -->
      <div class="bottom-wrapper">
        <!-- 表格 -->
        <div class="form-wrapper">
          <a-table
            :columns="thead"
            :data-source="tableData"
            :pagination="false"
            height="800px"
            rowKey="id"
          >
          </a-table>
        </div>
        <!-- 分页器 -->
        <div class="pagination">
          <a-pagination
            size="small"
            :total="listTotal"
            show-size-changer
            show-quick-jumper
            :show-total="(total) => `共 ${total} 条`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import {
//   ipPlaceApi,
//   phonePlaceApi,
//   bankPlaceApi,
//   idAndSocialPlaceApi,
//   reportReApi
// } from "../../api/tool";
export default {
  data() {
    return {
      // 左侧列表标题
      leftListData: [
        { title: 'IP归属地查询' },
        { title: '手机归属地查询' },
        { title: '银行归属地查询' },
        { title: '身份证归属地查询' },
        { title: '社会统一信用代码归属地查询' },
      ],
      defaultSelectedKeys: [0], //左侧菜单默认
      infoIndex: 0, // input框绑定的索引
      textarea: '', // 输入框输入的内容
      listTotal: 0,
      // 表头
      thead: [],
      // 表格数据
      tableData: [],
      // 模拟ip数据
      ipData: [],
      // 模拟手机归属地
      phoneData: [],
      // 模拟银行数据
      bankData: [],
      // 模拟身份证归属
      idData: [],
      // 模拟社会信用数据
      sociologyData: [],
      head: [],
      // IP模拟表头
      ipHead: [
        {
          title: 'IP',
          dataIndex: 'ipzt',
          key: 'ipzt',
          align: 'center',
        },
        {
          title: '状态',
          dataIndex: 'place_of_ownership',
          key: 'place_of_ownership',
          align: 'center',
        },
        {
          title: '备注',
          key: 'terminate_ip',
          dataIndex: 'terminate_ip',
          align: 'center',
        },
      ],
      // 手机归属地模拟表头
      phoneHead: [
        {
          title: '手机号',
          dataIndex: 'phones',
          key: 'phones',
          align: 'center',
        },
        {
          title: '手机号归属地',
          dataIndex: 'city_name',
          key: 'city_name',
          align: 'center',
        },
        {
          title: '备注',
          key: 'sim_type',
          dataIndex: 'sim_type',
          align: 'center',
        },
      ],
      // 身份证归属地模拟表头
      idHead: [
        {
          title: '身份证号',
          dataIndex: 'codes',
          key: 'codes',
          align: 'center',
        },
        {
          title: '身份证归属地',
          dataIndex: 'full_name',
          key: 'full_name',
          align: 'center',
        },
        {
          title: '备注',
          key: '',
          dataIndex: '',
          align: 'center',
        },
      ],
      // 银行归属地模拟查询
      bankHead: [
        {
          title: '银行卡号',
          dataIndex: 'cards',
          key: 'cards',
          align: 'center',
        },
        {
          title: '银行归属地',
          dataIndex: 'bank_name',
          key: 'bank_name',
          align: 'center',
        },
        {
          title: '备注',
          key: 'type_card',
          dataIndex: 'type_card',
          align: 'center',
        },
      ],
      // 社会归属地模拟查询
      sociologyHead: [
        {
          title: '社会统一信用代码',
          dataIndex: 'codes',
          key: 'codes',
          align: 'center',
        },
        {
          title: '社会统一信用代码归属地',
          dataIndex: 'full_name',
          key: 'full_name',
          align: 'center',
        },
        {
          title: '备注',
          key: 'province_name',
          dataIndex: 'province_name',
          align: 'center',
        },
      ],
      zt: '', // 接口所需要参数
      reptype: '', // 接口需要的类型
    };
  },
  mounted() {
    this.thead = [
      {
        title: 'IP',
        dataIndex: 'ipzt',
        key: 'ipzt',
        align: 'center',
      },
      {
        title: '状态',
        dataIndex: 'place_of_ownership',
        key: 'place_of_ownership',
        align: 'center',
      },
      {
        title: '备注',
        key: '',
        dataIndex: '',
        align: 'center',
      },
    ];
  },
  methods: {
    // ip接口
    ipApi() {
      let param = `zt=${this.textarea}`;
      ipPlaceApi(param).then((res) => {
        if (res.data.code == 200) {
          let ip_data = res.data.data;
          this.ipData = ip_data;
          this.tableData = this.ipData;
          this.listTotal = this.tableData.length;
        }
      });
    },
    // 手机归属地接口
    phoneApi() {
      let param = `zt=${this.textarea}`;
      phonePlaceApi(param).then((res) => {
        if (res.data.code == 200) {
          let phone_data = res.data.data;
          this.phoneData = phone_data;
          this.tableData = this.phoneData;
          this.listTotal = this.tableData.length;
        }
      });
    },

    //  银行归属地接口
    bankApi() {
      let param = `zt=${this.textarea}`;
      bankPlaceApi(param).then((res) => {
        if (res.data.code == 200) {
          let bank_data = res.data.data;
          this.bankData = bank_data;
          this.tableData = this.bankData;
          this.listTotal = this.tableData.length;
        }
      });
    },

    // 身份证以及社会归属地接口
    id_SocialApi() {
      let param = `zt=${this.textarea}`;
      idAndSocialPlaceApi(param).then((res) => {
        if (res.data.code == 200) {
          let id_data = res.data.data;
          this.idData = id_data;
          this.tableData = this.idData;
          let social_data = res.data.data;
          this.sociologyData = social_data;
          this.tableData = this.sociologyData;
          this.listTotal = this.tableData.length;
        }
      });
    },
    // 导出接口
    reportDataApi() {
      if (this.tableData != '') {
        let param = {
          zt: this.textarea,
          type: this.reptype,
        };
        reportReApi(param);
      } else {
        this.$message.error('请先获取查询结果');
      }
    },
    // 点击左侧列表
    showForm(index) {
      this.infoIndex = index;
      // 输入框置为空
      this.textarea = '';
      this.ipData = [];
      // 模拟手机归属地
      this.phoneData = [];
      // 模拟银行数据
      this.bankData = [];
      // 模拟身份证归属
      this.idData = [];
      // 模拟社会信用数据
      this.sociologyData = [];
      if (index == 0) {
        this.thead = this.ipHead;
        this.tableData = this.ipData;
      } else if (index == 1) {
        this.thead = this.phoneHead;
        this.tableData = this.phoneData;
      } else if (index == 2) {
        this.thead = this.bankHead;
        this.tableData = this.bankData;
      } else if (index == 3) {
        this.thead = this.idHead;
        this.tableData = this.idData;
      } else {
        this.thead = this.sociologyHead;
        this.tableData = this.sociologyData;
      }
    },
    // 点击查询按钮回来的数据
    findList() {
      this.textarea = this.textarea.replace('，', ','); // 中文逗号转为英文逗号
      if (this.textarea) {
        if (this.infoIndex == 0) {
          //  调用ip
          this.reptype = 'ipHome';
          this.ipApi();
        } else if (this.infoIndex == 1) {
          //  调用手机api
          this.reptype = 'mobilPhone';
          this.phoneApi();
        } else if (this.infoIndex == 2) {
          this.reptype = 'bankCardBin';
          //  调用银行aoi
          this.bankApi();
        } else if (this.infoIndex == 3) {
          this.reptype = 'idCard';
          //  调用身份证api
          this.id_SocialApi();
        } else if (this.infoIndex == 4) {
          this.reptype = 'social';
          // 社会统一信用代码api
          this.id_SocialApi();
        }
      }
    },
    // 点击导出回来的数据
    exportReport() {
      this.reportDataApi();
    },
  },
};
</script>
<style lang="less" scoped>
/deep/ .ant-menu-item-selected {
  background-color: #f3f9ff !important;
  color: inherit;
}

/deep/ .ant-input {
  &:focus {
    box-shadow: none;
  }
  &:hover {
    border: 1px solid #dcedff;
    border-right: none;
  }
  border: 1px solid #dcedff;
  border-right: none;
  border-radius: 4px 0 0 4px;
}

.small-tool {
  width: 100%;
  height: 100%;
  display: flex;
  background: #fff;
  min-width: 1200px;
  .left-wrapper {
    width: 402px;
    height: 100%;
    background: #fff;
    border-right: solid 1px #e6e6e6;
  }
  // 右侧
  .right-wrapper {
    margin-right: 100px;
    flex: 1;
    // width: 100%;
    height: 100%;
    margin-left: 30px;
    // input框容器
    .top-wrapper {
      display: flex;
      align-items: center;
      // input框
      .input-wrapper {
        width: 100%;
        display: flex;
        margin-top: 14px;
        height: 140px;
        .input-search {
          display: flex;
          flex-direction: column;
          justify-content: center;
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #1890ff;
          cursor: pointer;
          text-align: center;
          height: 100%;
          width: 60px;
          background: #f3f9ff;
          border: 1px solid #dcedff;
          border-radius: 0 4px 4px 0;
        }
      }
      // 按钮
    }
    // 下表格
    .bottom-wrapper {
      flex: 1;
      margin-top: 70px;

      // 表格
      .form-wrapper {
        overflow: auto;
      }
      // 分页器
      .pagination {
        text-align: right;
        margin-top: 20px;
      }
    }
  }

  // 媒体查询
  @media (min-width: 1200px) {
    .right-wrapper {
      width: 75%;
    }
  }
}
</style>
<style scoped>
.pagination >>> .ant-select-selection--single {
  width: 100px;
}
.bottom-wrapper
  >>> .ant-select-selection--single
  .ant-select-selection__rendered {
  margin-top: 2px;
}
.pagination >>> .ant-pagination.mini .ant-pagination-options-quick-jumper {
  margin-top: 3px;
}
.left-wrapper >>> .ant-menu-root.ant-menu-vertical {
  border: none;
}
.form-wrapper >>> .ant-table-wrapper {
  border: 1px solid #eaeef5;
}
</style>
