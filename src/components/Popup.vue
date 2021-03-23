<template>
  <div class="popup-wrap">
    <a-modal
      title="新增待调单账户"
      :visible="showDiaLog"
      width="600px"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      :maskClosable="false"
    >
      <a-form-model ref="ruleForm" :model="form" :rules="rules" layout="inline">
        <a-row type="flex" style="margin-bottom: 10px;" justify="space-between">
          <a-form-model-item
            :style="{ width: itemW }"
            label="户名："
            ref="name"
            prop="name"
          >
            <a-input
              :style="{ width: inputW }"
              v-model.trim="form.name"
              placeholder="请输入账户所有人姓名"
              @blur="
                () => {
                  $refs.name.onFieldBlur();
                }
              "
            />
          </a-form-model-item>
          <a-form-model-item
            label="卡号："
            ref="cardNum"
            :style="{ width: itemW }"
            prop="cardNum"
          >
            <a-input
              type="number"
              v-model.trim="form.cardNum"
              onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )"
              :style="{ width: inputW }"
              placeholder="请输入账户卡号"
              @blur="
                () => {
                  $refs.cardNum.onFieldBlur();
                }
              "
            />
          </a-form-model-item>
        </a-row>
        <a-row type="flex" style="margin-bottom: 10px;" justify="space-between">
          <a-form-model-item
            label="证件号码："
            :style="{ width: itemW }"
            prop="cradId"
          >
            <a-input
              v-model.trim="form.cradId"
              :style="{ width: inputW }"
              placeholder="请输入证件号码"
            />
          </a-form-model-item>
          <a-form-model-item
            label="归属地："
            :style="{ width: itemW }"
            prop="location"
          >
            <a-input
              v-model.trim="form.location"
              :style="{ width: inputW }"
              placeholder="请输入归属地"
            />
          </a-form-model-item>
        </a-row>
        <a-row type="flex" justify="space-between" style="margin-bottom: 10px;">
          <a-form-model-item
            label="银行卡种类："
            :style="{ width: itemW }"
            prop="cradType"
          >
            <a-select v-model.trim="form.cradType" :style="{ width: inputW }">
              <a-select-option value="1">
                请选择银行卡种类
              </a-select-option>
              <a-select-option value="2">
                xxxx
              </a-select-option>
              <a-select-option value="3">
                xxxx
              </a-select-option>
              <a-select-option value="4">
                xxx
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item
            label="重要级别："
            :style="{ width: itemW }"
            ref="level"
            prop="level"
          >
            <a-select v-model.trim="form.level" :style="{ width: inputW }">
              <a-select-option value="1">
                1级
              </a-select-option>
              <a-select-option value="2">
                2级
              </a-select-option>
              <a-select-option value="3">
                3级
              </a-select-option>
              <a-select-option value="4">
                4级
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-row>
        <a-row style="margin-bottom: 10px;">
          <a-form-model-item label="待调单原因：" rule="cause" prop="cause">
            <a-input
              v-model.trim="form.cause"
              :style="{ width: '500px', resize: 'none' }"
              type="textarea"
            />
          </a-form-model-item>
        </a-row>
        <a-row type="flex" justify="space-between" style="margin-bottom: 10px;">
          <a-form-model-item
            label="进账金额："
            :style="{ width: itemW }"
            prop="incomeMoney"
          >
            <a-input
              v-model.trim="form.incomeMoney"
              @input="handleAmountChange($event, 'incomeMoney')"
              :style="{ width: inputW }"
              placeholder="请输入账户进账金额"
            />
          </a-form-model-item>
          <a-form-model-item
            label="出账金额："
            :style="{ width: itemW }"
            prop="expenditureMoney"
          >
            <a-input
              v-model.trim="form.expenditureMoney"
              @input="handleAmountChange($event, 'expenditureMoney')"
              :style="{ width: inputW }"
              placeholder="请输入账户出账金额"
            />
          </a-form-model-item>
        </a-row>
        <a-row type="flex" justify="space-between" style="margin-bottom: 10px;">
          <a-form-model-item label="总交易金额：" :style="{ width: itemW }">
            <a-input
              :style="{ width: inputW }"
              :value="form.incomeMoney * 1 + form.expenditureMoney * 1"
              placeholder=""
              :disabled="true"
            />
          </a-form-model-item>
          <a-form-model-item
            label="进账次数："
            onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )"
            type="number"
            :style="{ width: itemW }"
            prop="incomeNum"
          >
            <a-input
              v-model.trim="form.incomeNum"
              :style="{ width: inputW }"
              placeholder="请输入账户进账次数"
            />
          </a-form-model-item>
        </a-row>
        <a-row type="flex" justify="space-between" style="margin-bottom: 10px;">
          <a-form-model-item
            label="出账次数："
            :style="{ width: itemW }"
            prop="expenditureNum"
          >
            <a-input
              v-model.trim="form.expenditureNum"
              onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )"
              type="number"
              :style="{ width: inputW }"
              placeholder="请输入账户出账次数"
            />
          </a-form-model-item>
          <a-form-model-item label="总交易次数：" :style="{ width: itemW }">
            <a-input
              :value="form.expenditureNum * 1 + form.incomeNum * 1"
              :disabled="true"
              :style="{ width: inputW }"
              placeholder=""
            />
          </a-form-model-item>
        </a-row>
        <a-row type="flex" justify="space-between" style="margin-bottom: 10px;">
          <a-form-model-item
            label="最早交易日期："
            :style="{ width: itemW }"
            prop="firstDate"
          >
            <a-date-picker
              placeholder=""
              @change="firstChange"
              :style="{ width: inputW }"
            />
          </a-form-model-item>
          <a-form-model-item
            label="最晚交易日期："
            :style="{ width: itemW }"
            prop="lastDate"
          >
            <a-date-picker
              @change="lastChange"
              placeholder=""
              :style="{ width: inputW }"
            />
          </a-form-model-item>
        </a-row>
        <a-row type="flex">
          <a-form-model-item label="交易周期：" prop="dealPeriod">
            <a-input
              v-model.trim="form.dealPeriod"
              placeholder=""
              :disabled="true"
              style="width: 500px;"
            />
          </a-form-model-item>
        </a-row>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'Popup',
  props: {
    visible: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  watch: {
    visible(val) {
      this.showDiaLog = val;
    },
  },
  mounted() {
    console.log(this.visible);
  },
  data() {
    return {
      inputW: '200px',
      itemW: '300px',
      showDiaLog: this.visible,
      confirmLoading: false,
      form: {
        name: '',
        cardNum: '',
        cradId: '',
        location: '',
        cradType: '1',
        level: '1',
        cause: '',
        incomeMoney: '',
        expenditureMoney: '',
        incomeNum: '',
        expenditureNum: '',
        firstDate: '',
        lastDate: '',
        dealPeriod: '',
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入账户名',
            trigger: 'blur',
          },
        ],
        cardNum: [
          {
            required: true,
            message: '请输入卡号',
            trigger: 'blur',
          },
        ],
        level: [
          {
            required: true,
            message: 'Please input Activity name',
            trigger: 'change',
          },
        ],
        cause: [
          {
            required: true,
            message: '请输入待调单原因',
            trigger: 'blur',
          },
          {
            min: 0,
            max: 500,
            message: '长度不能超出500个字符',
            trigger: 'change',
          },
        ],
      },
    };
  },
  methods: {
    // 金额限制
    handleAmountChange(e, type) {
      //过滤e字符
      console.log(type);
      if (type === 'incomeMoney') {
        this.form.incomeMoney = e.target.value;
        // 必须保证第一个为数字而不是.
        this.form.incomeMoney = this.form.incomeMoney.replace(/^\./g, '0.');
        // 保证只有出现一个.而没有多个.
        this.form.incomeMoney = this.form.incomeMoney.replace(/\.{2,}/g, '.');

        //只能输入两个小数
        this.form.incomeMoney = this.form.incomeMoney.replace(
          /^()*(\d+)\.(\d\d).*$/,
          '$1$2.$3'
        );
      } else if (type === 'expenditureMoney') {
        this.form.expenditureMoney = e.target.value;
        // 必须保证第一个为数字而不是.
        this.form.expenditureMoney = this.form.expenditureMoney.replace(
          /^\./g,
          '0.'
        );
        // 保证只有出现一个.而没有多个.
        this.form.expenditureMoney = this.form.expenditureMoney.replace(
          /\.{2,}/g,
          '.'
        );

        //只能输入两个小数
        this.form.expenditureMoney = this.form.expenditureMoney.replace(
          /^()*(\d+)\.(\d\d).*$/,
          '$1$2.$3'
        );
      }
      e.target.value = e.target.value.replace('e', '');
      //判断输入是数字和.
      e.target.value = e.target.value.replace(/[^\d.]/g, '');
      // 保证.只出现一次，而不能出现两次以上
      e.target.value = e.target.value
        .replace('.', '$#$')
        .replace(/\./g, '')
        .replace('$#$', '.');
    },
    // 选中日期回调
    firstChange(date, dateString) {
      this.form.firstDate = dateString;
    },
    lastChange(date, dateString) {
      this.form.lastDate = dateString;
    },
    // 提交
    handleOk(e) {
      this.confirmLoading = true;
      this.onSubmit();
    },
    // 取消
    handleCancel(e) {
      // 关闭弹窗
      this.showDiaLog = false;
      // 清空表单
      this.$refs.ruleForm.resetFields();
      this.$emit('dialogShow', this.showDiaLog);
    },
    // 提交
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('submit', this.form);
        } else {
          console.log('error submit!!');
          this.confirmLoading = false;
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type='number'] {
  -moz-appearance: textfield;
}
/deep/ .ant-form-inline .ant-form-item {
  padding-left: 6px;
  margin: 0;
}
/deep/ .ant-form label {
  font-family: PingFangSC-Regular;
  font-size: 12px;
}
/deep/ .ant-form-item-label {
  width: 84px;
}
/deep/ .ant-modal-title {
  font-family: PingFangSC-Medium;
  font-size: 14px;
  line-height: 40px;
  color: #363637;
}
/deep/ .ant-modal-body {
  padding: 24px 0;
}
/deep/ .ant-modal-header {
  height: 40px;
  padding: 0;
  padding-left: 20px;
}
/deep/ .ant-modal-close-x {
  line-height: 40px;
}
/deep/ .ant-modal-footer {
  height: 40px;
  padding: 0;
  padding-right: 20px;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
}
/deep/ .ant-btn {
  font-family: PingFangSC-Regular;
  font-size: 12px;
}
</style>
