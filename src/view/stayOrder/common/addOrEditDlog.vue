<!--
 * @Author: 勾青琼
 * @Date: 2021-03-23 10:06:03
 * @LastEditTime: 2021-04-21 16:01:17
 * @LastEditors: Please set LastEditors
 * @Description: 待调单的新增及编辑弹窗
 * @FilePath: \guidance\src\views\dataAnalysis\stayOrder\common\addOrEditDlog.vue
-->
<template>
  <div class="popup-wrap">
    <a-modal
      :title="title"
      :visible="showDiaLog"
      width="600px"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      :maskClosable="false"
    >
      <a-form-model ref="ruleForm" :model="form" :rules="rules" layout="inline">
        <a-row type="flex" style="margin-bottom: 10px" justify="space-between">
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
            ref="card_number"
            :style="{ width: itemW }"
            prop="card_number"
          >
            <a-input
              type="number"
              v-model.trim="form.card_number"
              onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )"
              :style="{ width: inputW }"
              placeholder="请输入账户卡号"
              @blur="
                () => {
                  $refs.card_number.onFieldBlur();
                }
              "
            />
          </a-form-model-item>
        </a-row>
        <a-row type="flex" style="margin-bottom: 10px" justify="space-between">
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
            prop="attribution_place"
          >
            <a-input
              v-model.trim="form.attribution_place"
              :style="{ width: inputW }"
              placeholder="请输入归属地"
            />
          </a-form-model-item>
        </a-row>
        <a-row type="flex" justify="space-between" style="margin-bottom: 10px">
          <a-form-model-item
            label="银行卡种类："
            :style="{ width: itemW }"
            prop="card_type"
          >
            <a-input
              v-model.trim="form.card_type"
              :style="{ width: inputW }"
              placeholder="请输入银行卡种类"
            />
            <!-- <a-select v-model.trim="form.cradType" :style="{ width: inputW }">
              <a-select-option value="1"> 请输入银行卡种类 </a-select-option>
              <a-select-option value="2"> xxxx </a-select-option>
              <a-select-option value="3"> xxxx </a-select-option>
              <a-select-option value="4"> xxx </a-select-option>
            </a-select> -->
          </a-form-model-item>
          <a-form-model-item
            label="重要级别："
            :style="{ width: itemW }"
            ref="level"
            prop="level"
          >
            <a-select v-model.trim="form.level" :style="{ width: inputW }">
              <a-select-option value="1"> 1级 </a-select-option>
              <a-select-option value="2"> 2级 </a-select-option>
              <a-select-option value="3"> 3级 </a-select-option>
              <a-select-option value="4"> 4级 </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-row>
        <a-row style="margin-bottom: 10px">
          <a-form-model-item label="待调单原因：" rule="bill_cause" prop="bill_cause">
            <a-input
              v-model.trim="form.bill_cause"
              :style="{ width: '500px', resize: 'none' }"
              type="textarea"
            />
          </a-form-model-item>
        </a-row>
        <a-row type="flex" justify="space-between" style="margin-bottom: 10px">
          <a-form-model-item
            label="进账金额："
            :style="{ width: itemW }"
            prop="trade_amount"
          >
            <a-input
              v-model.trim="form.trade_amount"
              @input="handleAmountChange($event, 'incomeMoney')"
              :style="{ width: inputW }"
              placeholder="请输入账户进账金额"
            />
          </a-form-model-item>
          <a-form-model-item
            label="出账金额："
            :style="{ width: itemW }"
            prop="expenditure_count"
          >
            <a-input
              v-model.trim="form.expenditure_count"
              @input="handleAmountChange($event, 'expenditureMoney')"
              :style="{ width: inputW }"
              placeholder="请输入账户出账金额"
            />
          </a-form-model-item>
        </a-row>
        <a-row type="flex" justify="space-between" style="margin-bottom: 10px">
          <a-form-model-item label="总交易金额：" :style="{ width: itemW }">
            <a-input
              :style="{ width: inputW }"
              :value="form.trade_amount * 1 + form.expenditure_count * 1"
              placeholder=""
              :disabled="true"
            />
          </a-form-model-item>
          <a-form-model-item
            label="进账次数："
            onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )"
            type="number"
            :style="{ width: itemW }"
            prop="receipts_count"
          >
            <a-input
              v-model.trim="form.receipts_count"
              :style="{ width: inputW }"
              placeholder="请输入账户进账次数"
            />
          </a-form-model-item>
        </a-row>
        <a-row type="flex" justify="space-between" style="margin-bottom: 10px">
          <a-form-model-item
            label="出账次数："
            :style="{ width: itemW }"
            prop="trade_count"
          >
            <a-input
              v-model.trim="form.trade_count"
              onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )"
              type="number"
              :style="{ width: inputW }"
              placeholder="请输入账户出账次数"
            />
          </a-form-model-item>
          <a-form-model-item label="总交易次数：" :style="{ width: itemW }">
            <a-input
              :value="form.trade_count * 1 + form.receipts_count * 1"
              :disabled="true"
              :style="{ width: inputW }"
              placeholder=""
            />
          </a-form-model-item>
        </a-row>
        <a-row type="flex" justify="space-between" style="margin-bottom: 10px">
          <a-form-model-item
            label="最早交易日期："
            :style="{ width: itemW }"
            prop="earliest_date"
          >
            <a-date-picker
              placeholder=""
              v-model="form.earliest_date"
              @change="firstChange"
              :style="{ width: inputW }"
            />
          </a-form-model-item>
          <a-form-model-item
            label="最晚交易日期："
            :style="{ width: itemW }"
            prop="latest_date"
          >
            <a-date-picker
              @change="lastChange"
              :disabled="!form.earliest_date"
              v-model="form.latest_date"
              placeholder=""
              :disabled-date="disabledDate"
              :style="{ width: inputW }"
            />
          </a-form-model-item>
        </a-row>
        <a-row type="flex">
          <a-form-model-item label="交易周期：" prop="dealPeriod">
            <a-input
              v-model="form.trade_cycle"
              placeholder=""
              :disabled="true"
              style="width: 500px"
            />
          </a-form-model-item>
        </a-row>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
const moment = require("moment");
export default {
  name: "Popup",
  props: {
    visible: {
      type: Boolean,
      default() {
        return false;
      },
    },
    title: {
      type: String,
      default: "新增待调单账户",
    },
  },
  watch: {
    visible(val) {
      this.showDiaLog = val;
    },
  },
  data() {
    return {
      period: "",
      lastDataDisabled: "",
      firstTime: "",
      lastTime: "",
      inputW: "200px",
      itemW: "300px",
      showDiaLog: this.visible,
      confirmLoading: false,
      form: {
        name: "",
        card_number: "",
        cradId: "",
        attribution_place: "",
        card_type: "",
        level: "1",
        bill_cause: "",
        trade_amount: "",
        expenditure_count: "",
        receipts_count: "",
        trade_count: "",
        earliest_date: "",
        latest_date: "",
        trade_cycle:''
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入账户名",
            trigger: "blur",
          },
        ],
        card_number: [
          {
            required: true,
            message: "请输入卡号",
            trigger: "blur",
          },
        ],
        level: [
          {
            required: true,
            message: "Please input Activity name",
            trigger: "change",
          },
        ],
        bill_cause: [
          {
            required: true,
            message: "请输入待调单原因",
            trigger: "blur",
          },
          {
            min: 0,
            max: 500,
            message: "长度不能超出500个字符",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    //    日期限制
    disabledDate(current) {
      return current && current < this.lastDataDisabled;
    },
    // 周期计算
    getPeriod() {
      let time = this.lastTime - this.firstTime;
      let day = Math.floor(time / (1000 * 3600 * 24));
      this.period = day + "天";
    },
    // 金额限制
    handleAmountChange(e, type) {
      //过滤e字符
      console.log(type);
      if (type === "incomeMoney") {
        this.form.trade_amount = e.target.value;
        // 必须保证第一个为数字而不是.
        this.form.trade_amount = this.form.trade_amount.replace(/^\./g, "0.");
        // 保证只有出现一个.而没有多个.
        this.form.trade_amount = this.form.trade_amount.replace(/\.{2,}/g, ".");

        //只能输入两个小数
        this.form.trade_amount = this.form.trade_amount.replace(
          /^()*(\d+)\.(\d\d).*$/,
          "$1$2.$3"
        );
      } else if (type === "expenditureMoney") {
        this.form.expenditure_count = e.target.value;
        // 必须保证第一个为数字而不是.
        this.form.expenditure_count = this.form.expenditure_count.replace(
          /^\./g,
          "0."
        );
        // 保证只有出现一个.而没有多个.
        this.form.expenditure_count = this.form.expenditure_count.replace(
          /\.{2,}/g,
          "."
        );

        //只能输入两个小数
        this.form.expenditure_count = this.form.expenditure_count.replace(
          /^()*(\d+)\.(\d\d).*$/,
          "$1$2.$3"
        );
      }
      e.target.value = e.target.value.replace("e", "");
      //判断输入是数字和.
      e.target.value = e.target.value.replace(/[^\d.]/g, "");
      // 保证.只出现一次，而不能出现两次以上
      e.target.value = e.target.value
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".");
    },
    //  选中日期回调
    firstChange(date, dateString) {
      this.firstTime = moment(date._d).valueOf();
      this.lastDataDisabled = date;
      this.form.earliest_date = dateString;
      this.form.latest_date = "";
      this.disabledDate();
    },
    lastChange(date, dateString) {
      this.lastTime = moment(date._d).valueOf();
      this.form.latest_date = dateString;
      this.getPeriod();
      this.getDaysBetween()
    },
    //  天数周期
    getDaysBetween(){
      this.form.trade_cycle = (Date.parse(this.form.latest_date) - Date.parse(this.form.earliest_date)) / (1*24*60*60*1000)
      console.log(this.form.trade_cycle,'this.form.trade_cycle');
      
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
      this.clearData();
      this.$emit("dialogShow", this.showDiaLog);
    },
    // 清空
    clearData() {
      this.form = {
        name: "",
        card_number: "",
        cradId: "",
        attribution_place: "",
        card_type: "",
        level: "1",
        bill_cause: "",
        trade_amount: "",
        expenditure_count: "",
        receipts_count: "",
        trade_count: "",
        earliest_date: "",
        latest_date: "",
      };
    },
    // 提交
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit("submit", this.form);
        } else {
          console.log("error submit!!");
          this.clearData();
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
input[type="number"] {
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