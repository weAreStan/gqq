<!--
 * @Author: your name
 * @Date: 2021-03-02 12:04:42
 * @LastEditTime: 2021-03-11 19:31:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \forerunner\src\views\caseDetails\index.vue
-->
<template>
  <div class="case-details">
    <!-- 案件详情部分 -->
    <div class="detailWrapper">
      <!-- 标题及右侧标签标识 -->
      <div class="title-label">
        <!-- 标题 -->
        <div class="title">安徽x博览园非法吸收公众存款案</div>
        <!-- 标签 -->
        <div class="caseLabel">
          <img src="../assets/LabelImg.png" alt="" class="statusImage" />
          <span class="descStatus">侦查中</span>
        </div>
      </div>
      <!-- 案件编号等 -->
      <div class="moreOpration">
        <!-- 案件编号 -->
        <div class="caseNum">案件编号：Y477477477</div>
        <!-- 立案日期 -->
        <div class="dataTime">立案日期：2020-03-10</div>
        <!-- 案件类型 -->
        <div class="caseTYpe">案件类型：走私货币</div>
        <!-- 编辑及删除图标 -->
        <div class="editAndDele">
          <!-- 编辑 -->
          <img src="../assets/ReviseIcon.png" alt="" />
          <img src="../assets/deleteIcon.png" alt="" class="image2" />
        </div>
      </div>
      <!-- 案件详情 -->
      <div class="caseDataDetail">
        2018年2月，公安部会同人民银行有关部门工作发现，徐某某等人涉嫌从事跨境地下钱庄活动，遂部署北京市公安局立案侦查，并商请澳门警方同步开展侦查工作。经缜密侦查，查明了地下钱庄团伙人员架构、作案窝点和作案事实。2019年1月，北京专案组出动100余名警力，会同广东、河北、湖北等地公安机关联合澳门警方同步开展收网，一举抓获犯罪嫌疑人39名，捣毁地下钱庄窝点5个，缴获作案车辆4辆、非法改装POS机32台、作案电脑、银行卡等一大批作案工具，涉案交易金额达300余亿元人民币。
      </div>
      <!-- 案件时间及创建 -->
      <div class="caseTimeCreate">
        <i class="iconfont iconTimeIcon"></i>
        <span>2021-03-10</span>
        <span class="detailMin">10:58:00</span>
        <span class="admin">admin</span>
        <span>创建</span>
      </div>
      <div class="detailLine"></div>
      <!-- 案件标签 -->
      <div class="detailLabel">
        <div class="label-tabs1">
          <span class="imageIcon"></span>
          <span class="labelDesc">移交件</span>
        </div>
        <div class="label-tabs2">
          <span class="imageIcon"></span>
          <span class="labelDesc">移交件</span>
        </div>
        <div class="label-tabs3">
          <span class="imageIcon"></span>
          <span class="labelDesc">移交件</span>
        </div>
        <div class="label-tabs4">
          <span class="imageIcon"></span>
          <span class="labelDesc">移交件</span>
        </div>
      </div>
    </div>
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
        <!-- 案情数据 -->
        <div class="caseData1">
          <div class="caseLeft">案情数据</div>
          <div class="caseRight">
            <!-- 资金数据 -->
            <div class="capitalData">
              <div class="leftCaptail">
                <img src="../assets/CapitalDataIcon.png" alt="" />
                <span>资金数据</span>
                <div class="five">5</div>
              </div>
              <div class="rightCaptail">
                <div class="captailDesc">xx银行股份有限公司关联子账户信息</div>
                <div class="captailDesc">xx银行股份有限公司关联子账户信息</div>
                <div class="captailDesc">xx银行股份有限公司关联子账户信息</div>
              </div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <!-- 税务数据 -->
            <div class="taxationData">
              <div class="leftCaptail">
                <img src="../assets/TaxDataIcon.png" alt="" />
                <span>税务数据</span>
                <div class="five">10</div>
              </div>
              <div class="rightCaptail">
                <div class="captailDesc">xx有限公司申报信息表</div>
                <div class="captailDesc">入库信息表</div>
                <div class="captailDesc">入库信息表</div>
              </div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
        <!-- 嫌疑主体 -->
        <div class="mainSup">
          <!-- 左边 -->
          <div class="leftSuspicion">嫌疑主体</div>
          <!-- 右侧 -->
          <div class="rightSuspicion">
            <div class="suspiAll">
              <div class="left-susp">
                <img src="../assets/SuspecIcon.png" alt="" />
                <span>王xx</span>
              </div>
              <div class="right-susp">
                <div class="susp1">可疑空壳公司</div>
                <div class="susp2">可能真人卡</div>
              </div>
              <div></div>
              <div></div>
              <div></div>
            </div>

            <div class="suspiAll">
              <div class="left-susp">
                <img src="../assets/CompanyIcon.png" alt="" />
                <span>xx有限责任公司</span>
              </div>
              <div class="right-susp">
                <div class="susp1">可疑财会人员</div>
                <div class="susp2">可疑变票人员</div>
              </div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
      <!-- 数据分析 -->
      <div class="dataAlayls">
        <div class="collectionTit">
          <div class="iconTil">
            <img src="../assets/DataIcon-2.png" alt="" />
            <span>数据分析</span>
          </div>
          <div class="titleMore" @click="toAlay">更多>></div>
        </div>
        <!-- 表格 -->
        <div class="alaysTable">
          <a-table :columns="columns" :data-source="data" :pagination="false">
            <a slot="name" slot-scope="text">{{ text }}</a>
            <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
            <span slot="tags" slot-scope="tags">
              <a-tag
                v-for="tag in tags"
                :key="tag"
                :color="
                  tag === 'loser'
                    ? 'volcano'
                    : tag.length > 5
                    ? 'geekblue'
                    : 'green'
                "
              >
                {{ tag.toUpperCase() }}
              </a-tag>
            </span>
            <span slot="action" slot-scope="text, record">
              <a>Invite 一 {{ record.name }}</a>
              <a-divider type="vertical" />
              <a>Delete</a>
              <a-divider type="vertical" />
              <a class="ant-dropdown-link">
                More actions <a-icon type="down" />
              </a>
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
        <div class="reportTitle">
          <div class="leftReport">
            <img src="../assets/ReportIcon.png" alt="" />
            <p>第一轮xx公司涉案资金分析报告</p>
          </div>
          <div class="rightReport">
            <img src="../assets/LookOverIcon.png" alt="" />
            <img src="../assets/DownloadIcon.png" alt="" />
          </div>
        </div>
        <div class="reportTitle">
          <div class="leftReport">
            <img src="../assets/ReportIcon.png" alt="" />
            <p>第一轮xx公司涉案资金分析报告</p>
          </div>
          <div class="rightReport">
            <img src="../assets/LookOverIcon.png" alt="" />
            <img src="../assets/DownloadIcon.png" alt="" />
          </div>
        </div>
        <div class="reportTitle">
          <div class="leftReport">
            <img src="../assets/ReportIcon.png" alt="" />
            <p>第一轮xx公司涉案资金分析报告</p>
          </div>
          <div class="rightReport">
            <img src="../assets/LookOverIcon.png" alt="" />
            <img src="../assets/DownloadIcon.png" alt="" />
          </div>
        </div>
        <div class="reportTitle">
          <div class="leftReport">
            <img src="../assets/ReportIcon.png" alt="" />
            <p>第一轮xx公司涉案资金分析报告</p>
          </div>
          <div class="rightReport">
            <img src="../assets/LookOverIcon.png" alt="" />
            <img src="../assets/DownloadIcon.png" alt="" />
          </div>
        </div>
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
        <!-- 结论 -->
        <div class="summaryAll">
          <img src="../assets/StarIcon.png" alt="" />
          通过对IP关联交易方账户进出情况的统计分析，找出关联账户数前N个IP地址，进而通过账户与账户关联关系，得到可能存在的同IP团伙
          通过对IP关联交易方账户进出情况的统计分析，找出关联账户数前N个IP地址，进而通过账户与账户关联关系，得到可能存在的同IP团伙
        </div>
        <div class="summaryAll">
          <img src="../assets/StarIcon.png" alt="" />
          通过对IP关联交易方账户进出情况的统计分析，找出关联账户数前N个IP地址，进而通过账户与账户关联关系，得到可能存在的同IP团伙
          通过对IP关联交易方账户进出情况的统计分析，找出关联账户数前N个IP地址，进而通过账户与账户关联关系，得到可能存在的同IP团伙
        </div>
        <div class="summaryAll">
          <img src="../assets/StarIcon.png" alt="" />
          通过对IP关联交易方账户进出情况的统计分析，找出关联账户数前N个IP地址，进而通过账户与账户关联关系，得到可能存在的同IP团伙
          通过对IP关联交易方账户进出情况的统计分析，找出关联账户数前N个IP地址，进而通过账户与账户关联关系，得到可能存在的同IP团伙
        </div>
        <div class="summaryAll">
          <img src="../assets/StarIcon.png" alt="" />
          通过对IP关联交易方账户进出情况的统计分析，找出关联账户数前N个IP地址，进而通过账户与账户关联关系，得到可能存在的同IP团伙
          通过对IP关联交易方账户进出情况的统计分析，找出关联账户数前N个IP地址，进而通过账户与账户关联关系，得到可能存在的同IP团伙
        </div>
      </div>
    </div>
    <!-- <router-link class="list" :to="{ path: '/dataCollection' }"
      >数据收集</router-link
    > -->
    <!-- <div @click="toDataCollection">数据收集111</div> -->
  </div>
</template>

<script>
const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'name' },
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    scopedSlots: { customRender: 'tags' },
  },
  {
    title: 'Action',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
export default {
  data() {
    return {
      data,
      columns,
    };
  },
  methods: {
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
  },
};
</script>
<style lang="less">
.case-details {
  min-width: 1200px;
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
      min-height: 360px;
      width: 49.5%;
      background: #ffffff;
      box-shadow: 0 0 20px 0 rgba(24, 144, 255, 0.1);
      border-radius: 4px;
      padding-left: 20px;
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
            min-height: 85px;
            width: 100%;
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
              .five {
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
            }
          }
          // 税务数据
          .taxationData {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
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
              .five {
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
              margin-top: 13px;
              .susp1 {
                // height: 24px;
                background: #fff0f6;
                border: 1px solid #ffdae9;
                border-radius: 4px;
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #fe4d97;
              }
              .susp2 {
                margin-left: 10px;
                // height: 24px;
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
      min-height: 315px;
      width: 49.5%;
      background: #ffffff;
      box-shadow: 0 0 20px 0 rgba(24, 144, 255, 0.1);
      border-radius: 4px;
      padding-left: 20px;
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
        height: 40px;
        // line-height: 40px;
        .leftReport {
          display: flex;
          img {
            width: 13px;
            height: 14px;
          }
          p {
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
        margin-top: 15px;
        color: #707070;
        text-align: justify;
        line-height: 20px;
        img {
          width: 14px;
          height: 13px;
        }
      }
    }
  }
}
</style>
