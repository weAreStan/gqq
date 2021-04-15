<template>
  <div class="login-outer">
    <!-- 登录框区域 -->
    <div class="content">
      <form autocomplete="off" class="login-form">
        <div class="input-item">
          <div class="input-list">
            <input
              autocomplete="off"
              @keyup.enter="postLogin"
              v-model.trim="ruleForm.userName"
              @blur="blurInput(ruleForm.userName, 'user')"
              class="is-input"
              type="text"
            />
            <img src="../assets/LoginusernameIcon.png" alt="" class="imgUser" />
          </div>
          <div class="errtext" v-show="rules.userName">
            请输入账号
          </div>
        </div>
        <div class="input-item">
          <div class="input-list">
            <input
              @keyup.enter="postLogin"
              autocompleted="off"
              v-model.trim="ruleForm.pass"
              @blur="blurInput(ruleForm.pass, 'pass')"
              class="is-input"
              type="password"
            />
            <img src="../assets/LoginpasswordIcon.png" alt="" class="passImg" />
          </div>
          <div class="errtext" v-show="rules.pass">
            请输入密码
          </div>
        </div>
        <div class="button-item">
          <div class="button" @click="postLogin">登 &nbsp;&nbsp; 录</div>
        </div>
        <!-- <div class="copyright">
          Copyright &copy; 2021 北京集侦云科技有限责任公司 版权所有
        </div> -->
      </form>
      <div class="authorize-wrapper">
        <div
          class="authorize-overdue authorize-item"
          v-if="authorizeState == 0"
        >
          <div class="describes">
            <div class="text">
              <span class="icon">
                <i class="iconfont iconcuowu"></i>
              </span>
              <span>当前平台试用期已结束，请联系技术团队获取版本授权</span>
            </div>
            <a-popover placement="rightTop" :visible="clicked" trigger="click">
              <template slot="title">
                <span style="font-size: 12px">更新授权</span>
              </template>
              <template slot="content">
                <a-input
                  placeholder="请输入授权码"
                  style="margin-bottom: 10px"
                  v-model.trim="authorizeCode"
                />
                <div class="codeButton">
                  <a-button
                    size="small"
                    @click="clicked = false"
                    style="margin-right: 5px"
                    >取消</a-button
                  >
                  <a-button type="primary" size="small" @click="updataAuthorize"
                    >确定</a-button
                  >
                </div>
              </template>
              <a-button type="link" @click="clicked = true">更新授权</a-button>
            </a-popover>
            <!-- <div class="update">更新授权</div> -->
          </div>
          <div class="text">
            技术支持 Tel：010-63100366 Email：jizhenyun@jizhenyun.com
          </div>
        </div>
        <div
          class="authorize-unexpired authorize-item"
          v-if="authorizeState == 1"
        >
          <div class="describes">
            <div class="text">
              <span class="icon">
                <i class="iconfont iconbiaoshi"></i>
              </span>
              <span style="margin-top: -8px">
                当前平台试用期还有
                <span class="num">{{ checkCodeCallback.warning }}</span>
                天，过期将无法使用，请联系技术团队获取版本授权</span
              >
            </div>
            <a-popover placement="rightTop" :visible="clicked" trigger="click">
              <template slot="title">
                <span style="font-size: 12px">更新授权</span>
              </template>
              <template slot="content">
                <a-input
                  placeholder="请输入授权码"
                  style="margin-bottom: 10px"
                  v-model.trim="authorizeCode"
                />
                <div class="codeButton">
                  <a-button
                    size="small"
                    @click="clicked = false"
                    style="margin-right: 5px"
                    >取消</a-button
                  >
                  <a-button type="primary" size="small" @click="updataAuthorize"
                    >确定</a-button
                  >
                </div>
              </template>
              <a-button type="link" @click="clicked = true">更新授权</a-button>
            </a-popover>
          </div>
          <div class="text">
            技术支持 Tel：010-63100366 Email：jizhenyun@jizhenyun.com
          </div>
        </div>
      </div>
      <!-- 版权 -->
      <div class="copyright">
        <p>
          copyright &copy; 2021
          {{ checkCodeCallback.companyName || '集侦云科技有限公司' }} 版权所有
        </p>
        <p>技术支持 Tel: 18855558888 Email: jizhenyun@jizhenyun.com</p>
      </div>
    </div>
  </div>
</template>

<script>
// import { postLoginApi } from '../../api/login';
// import { checkCodeApi, registerCodeApi } from "../../api/authority.js";
export default {
  name: 'login',
  data() {
    return {
      ruleForm: {
        userName: '',
        pass: '',
      },
      rules: {
        pass: false,
        userName: false,
      },
      form: {
        username: '',
        password: '',
      },
      authorizeState: 0, // 是否过期
      clicked: false, // 是否显示更新授权
      authorizeCode: '',
      checkCodeCallback: {},
      is_login: false,
    };
  },
  created() {
    // 初始化面包屑、用户信息、token
    let initBread = [{ auth: true, title: '案件管理', hierarchy: 1 }];
    let userInfo = {};
    sessionStorage.setItem('bread', JSON.stringify(initBread));
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    localStorage.setItem('token', '');
  },
  mounted() {
    //  this.$nextTick(() => {
    //   this._checkCodeApi();
    // });
  },
  // watch: {
  //   $route: {
  //     handler(route) {
  //       this.redirect = route.query && route.query.redirect;
  //     },
  //     immediate: true,
  //   },
  // },
  methods: {
    // 失去焦点验证
    blurInput(value, type) {
      type === 'user'
        ? !value
          ? (this.rules.userName = true)
          : (this.rules.userName = false)
        : !value
        ? (this.rules.pass = true)
        : (this.rules.pass = false);
    },
    // 权限
    _checkCodeApi() {
      checkCodeApi().then((res) => {
        if (res.data.code == 200) {
          this.checkCodeCallback = res.data.data;
          this.is_login = true;
          // 判断条件 200 500 505
          if (this.checkCodeCallback.warning == '') {
            this.authorizeState = 2;
          } else {
            this.authorizeState = 1;
          }
        } else if (res.data.code == 505) {
          this.is_login = false;
          this.authorizeState = 0;
        } else {
          this.$message.error(res.data.msg);
          this.is_login = false;
          this.authorizeState = 0;
        }
      });
    },
    // 注册
    _registerCodeApi() {
      let param = {
        code: this.authorizeCode,
      };
      registerCodeApi(param).then((res) => {
        if (res.data.code == 200) {
          console.log(res, '=======>>>');
          this.$message.success('授权成功');
          this.authorizeCode = '';
          this.is_login = true;
          this.clicked = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 登录接口 login
    postLogin() {
      //   this.$router.push({
      //   name: "Layout",
      // });
      //  this.$router.push({ path: '/layout'});
      // this.$router.push({ path: "/screenPage" });
      // if (!this.is_login) return this.$message.error("请完成授权后再登陆");
      if (this.ruleForm.userName == '' && this.ruleForm.pass == '') {
        this.rules.userName = true;
        this.rules.pass = true;
        return;
      } else {
        this.rules.userName = false;
        this.rules.pass = false;
      }
      if (this.ruleForm.userName == '') {
        this.rules.userName = true;
        return;
      } else {
        this.rules.userName = false;
      }
      if (this.ruleForm.pass == '') {
        this.rules.pass = true;
        return;
      } else {
        this.rules.pass = false;
      }

      let param = {
        username: this.ruleForm.userName,
        password: this.ruleForm.pass,
      };
      // postLoginApi(param).then((res) => {
      //   if (res.data.code == 200) {
      //     let userInfo = res.data.data.user;
      //     sessionStorage.setItem('baseObj', JSON.stringify({ case_number: 0 }));
      //     localStorage.setItem('userInfo', JSON.stringify(userInfo));
      //     localStorage.setItem('token', res.data.data.token);
      //     // this.$router.push({ path: "/layout" });
      //     // this.$router.push({ path: '/screenPage'});
      //     this.$message.success(res.data.msg);
      //     this.$router.push({ path: '/layout' });
      //   } else {
      //     localStorage.setItem('userInfo', '');
      //     localStorage.setItem('token', '');
      //     this.$message.error(res.data.msg);
      //   }
      // });
    },
    // 更新授权接口
    updataAuthorize() {
      this._registerCodeApi();
    },
    //  submit() {
    //   if (this.ruleForm.userName === "admin" && this.ruleForm.pass === "111111") {
    //     let userInfo = {
    //       avatarUrl:'https://avatars3.githubusercontent.com/u/22117876?s=460&v=4',
    //       userName:"小明"
    //     }

    //     // 保存token以及登陆信息
    //     sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
    //     sessionStorage.setItem("token", "TOKEN123456789");

    //     this.$router.push({ path: '/screenPage'});
    //   } else {
    //     if (this.ruleForm.userName !== "admin") {
    //    this.rules.userName = true
    //     }

    //     if (this.ruleForm.pass !== "111111") {
    //       this.rules.pass = true
    //     }
    //   }
    // },
  },
};
</script>

<style lang="less" scoped>
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  box-shadow: 0 0 0px 100000000px #0b258e inset !important;
  color: #fff !important;
}
.login-outer {
  // 背景图
  min-width: 1300px;
  background-image: url('../assets/signbg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  .login-region {
    height: 100px;
    .title {
      padding: 40px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 365px;
        height: 28px;
        // margin-left: 40%;
      }
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .login-form {
      width: 521px;
      height: 354px;
      margin: 0px auto;
      margin-top: 370px;
      background-image: url('../assets/signline.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 57px 0 46px 0;
      .input-item {
        &:first-child {
          margin-bottom: 37px;
        }
        .input-list {
          position: relative;
          .is-input {
            padding: 0 40px;
            width: 379px;
            height: 46px;
            border: 2px solid #00dfee;
            border-radius: 2px;
            box-sizing: border-box;
            outline: none;
            background-color: transparent;
            -webkit-text-fill-color: white;
            font-size: 14px;
            caret-color: white;
          }
          .imgUser {
            width: 21px;
            height: 21px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 14px;
          }
          .passImg {
            width: 20px;
            height: 22px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 14px;
          }
        }
        .errtext {
          position: absolute;
          align-self: start;
          color: red;
          padding-top: 5px;
        }
      }
      .button-item {
        background: rgba(0, 234, 255, 0.8);
        border: 1px solid #00c0e3;
        border-radius: 2px;
        box-sizing: border-box;
        width: 379px;
        height: 46px;
        margin-top: 76px;
        &:hover {
          background-color: rgba(0, 234, 255, 0.6);
        }
        &:active {
          background-color: rgba(0, 234, 255, 0.4);
        }
        .button {
          font-family: PingFangSC-Regular;
          font-size: 18px;
          color: #ffffff;
          text-align: center;
          line-height: 46px;
          cursor: pointer;
        }
      }
    }
    .authorize-wrapper {
      width: 650px;
      height: 80px;
      margin: 45px auto;
      font-size: 12px;
      .authorize-item {
        width: 650px;
        height: 80px;
        padding: 10px 18px 18px 18px;
        font-size: 14px;
        box-sizing: border-box;
        border-radius: 4px;
        .text {
          display: flex;
          align-items: center;
          margin-left: 22px;
        }
        .describes {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3px;
          margin-left: -27px;
          .icon {
            margin-right: 10px;
            margin-top: 2px;
          }
          .update {
            color: #02bcf8;
            cursor: pointer;
          }
        }
      }
      .authorize-overdue {
        border: 1px solid #ce3b3c;
        background: rgba(206, 59, 60, 0.2);
        color: #ce3b3c;
        .overdue-describe {
          display: flex;
          justify-content: space-between;
          margin-bottom: 9px;
          margin-left: -29px;
          .icon {
            margin-right: 10px;
            margin-top: 2px;
          }
          .update {
            color: #02bcf8;
            cursor: pointer;
          }
        }
      }
      .authorize-unexpired {
        border: 1px solid #ffab00;
        background: rgba(255, 171, 0, 0.2);
        color: #ffab00;
        .num {
          font-size: 24px;
          color: #02bcf8;
        }
        .describes {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3px;
          margin-left: -22px;
          .icon {
            margin-right: 5px;
          }
          .update {
            color: #02bcf8;
            cursor: pointer;
          }
        }
      }
    }

    // 版权
    .copyright {
      text-align: center;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #a2c0e7;
      margin-bottom: 27px;
      & > p:last-child {
        margin: 0;
      }
    }
  }
}
.codeButton {
  display: flex;
  justify-content: flex-end;
}
</style>
<style scoped></style>
