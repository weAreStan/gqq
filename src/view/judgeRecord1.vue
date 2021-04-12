<!--
 * @Author: 477
 * @Date: 2021-03-10 10:02:30
 * @LastEditTime: 2021-03-29 10:58:58
 * @LastEditors: Please set LastEditors
 * @Description: 研判记录
 * @FilePath: \guidance\src\views\dataAnalysis\common\survey.vue
-->
<template>
	<div class="judge-record-wrap" @click="hiddenMenu" ref="judgeRecord">
		<!-- 内容外层 -->
		<ul class="judge-record-content">
			<!-- 每一行的内容 -->
			<li class="judge-record-content-items" v-for="(items, index) in list" :key="index">
				<!--  时间轴 -->
				<div class="judge-record-content-items-time">
					<span class="time">研判记录 {{items.time}} </span>
					<span class="timeline">
						<span class="circle"></span>
						<span class="line"></span>
					</span>
				</div>
				<!-- 卡片内容 -->
				<div class="judge-record-content-items-detail">
					<ul class="judge-record-content-items-detail-content">
						<!-- 每一行内容 -->
						<li class="judge-record-content-items-detail-content-items"
							v-for="(cards, cIndex) in items.content" :key="cIndex">
							<!-- 标签 -->
							<h3 class="judge-record-content-items-detail-content-items-title "
								:class="cards.tagType === 'system' ? 'title-blue' : (!cIndex%2 ? 'title-purple' : (cIndex%4 ? 'title-pink' : 'title-orange'))">
								{{cards.tag}}
							</h3>
							<span class="judge-record-content-items-detail-content-items-text"
								v-for="(inners, Iindex) in cards.list" :key="Iindex"
								@contextmenu.prevent="handleMouseup($event, inners)">
								{{inners}}
							</span>
						</li>
					</ul>
				</div>
			</li>
		</ul>
		<!-- 右键点击 -->
		<div class="right-click-menu" v-show="showMenu" ref="menu">
			<a-menu slot="overlay" style="border: none" @click="handleMenu">
				<a-menu-item>
					<a href="javascript:;" @click="toPanoramic">全景侦查</a>
				</a-menu-item>
				<a-menu-item>
					<a href="javascript:;" @click="modalShow">研判记录</a>
				</a-menu-item>
			</a-menu>
		</div>
		<!--  研判记录的弹窗 -->
		<a-modal v-model="visible" :title="rightClickParam" @ok="handleOk" width="800px"
			:bodyStyle="{ height: '600px' }">
			<div class="dlalogShow">
				<div class="mainName">{{rightClickParam}}</div>
				<ul class="judge-record-content">
					<li class="judge-record-content-items" v-for="(index, items) in 3" :key="items">
						<!--  时间轴 -->
						<div class="judge-record-content-items-time">
							<span class="time">研判记录 2021-03-22 13:11:03 </span>
							<span class="timeline">
								<span class="circle"></span>
								<span class="line"></span>
							</span>
						</div>
						<!--  卡片内容 -->
						<div class="judge-record-content-items-detail">
							<ul class="judge-record-content-items-detail-content">
								<!-- 每一行内容 -->
								<li class="judge-record-content-items-detail-content-items">
									<!-- 标签 -->
									<h3 class="judge-record-content-items-detail-content-items-title title-blue">
										可能真人卡
									</h3>
									<h3 class="judge-record-content-items-detail-content-items-title title-orange">
										可能真人卡
									</h3>
									<h3 class="judge-record-content-items-detail-content-items-title title-purple">
										可能真人卡
									</h3>
								</li>
								<!-- 每一行内容 暂无 -->
								<li class="judge-record-content-items-detail-content-items">
									<!-- 标签 -->
									<h3 class="judge-record-content-items-detail-content-items-title title-none">
										暂无标签
									</h3>
								</li>
							</ul>
						</div>
					</li>
				</ul>
			</div>
		</a-modal>
	</div>
</template>

<script>
	import {
		getRecordData
	} from '../api/IndependentJudged.js'
	export default {
		name: "judge-record",
		data() {
			return {
				showMenu: false,
				rightClickParam: "12", // 右键发送请求携带的参数
				list: [],
				visible: false,
				// 发送请求参数
				params: {
					caseId: '',
					updateTime: '',
				}
			};
		},
		created() {
			// 赋值参数
			this.params = {
				caseId: '',
				updateTime: '',
			}
		},
		mounted() {
			this.getRecordList()
		},
		methods: {
			// 页面数据
			async getRecordList() {
				let res = await getRecordData(this.params)
				this.list = res.data
			},
			//  点击菜单
			handleMenu() {
				console.log(this.rightClickParam)
			},
			// 右键
			handleMouseup(e, item) {
				let judgeRecordY = this.$refs.judgeRecord.offsetTop;
				let judgeRecordX = this.$refs.judgeRecord.offsetLeft;
				// 保存右键的参数 用于发请求
				this.rightClickParam = item;
				this.showMenu = true;
				let x = e.pageX;
				let y = e.pageY;
				let menu = this.$refs.menu;
				menu.style.left = x - judgeRecordX + "px";
				menu.style.top = y - judgeRecordY + "px";
			},
			//  隐藏菜单
			hiddenMenu() {
				this.showMenu = false;
				this.rightClickParam = "";
			},
			//  点击去全景侦查
			toPanoramic() {
				this.$router.push({
					path: "/panoramicReconnaissance",
				});
			},
			//  出现弹窗
			modalShow() {
				this.visible = true;
			},
			// 弹窗点击确定
			handleOk(e) {
				this.visible = false;
			},
		},
	};
</script>
<style lang="less" scoped>
	.judge-record-wrap {
		padding-left: 16.6%;
		padding-top: 40px;
		padding-bottom: 74px;
		position: relative;
		background: #fff;

		// 右键菜单
		.right-click-menu {
			position: absolute;
			z-index: 10;
			width: 90px;
			background: #fff;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
			border-radius: 4px;

			.ant-menu-item-active {
				background: #f3f9ff !important;
			}

			.ant-menu-item-selected {
				background-color: #fff;
			}

			.ant-menu-item-active>a {
				color: #1890ff !important;
			}

			.ant-menu-item>a {
				font-family: PingFangSC-Regular;
				font-size: 12px;
				color: #929292;
			}

			.ant-menu-item {
				margin: 0px;
			}
		}

		//  外层内容
		.judge-record-content {

			// 每一行内容 ul
			.judge-record-content-items {
				display: flex;

				//  时间轴
				.judge-record-content-items-time {
					display: flex;

					// 时间
					.time {
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: #707070;
						margin-right: 20px;
						line-height: 11px;
					}

					//  时间轴
					.timeline {
						display: flex;
						flex-direction: column;
						align-items: center;

						.circle {
							background: #fff;
							border: 2px solid #1890ff;
							width: 11px;
							height: 11px;
							border-radius: 50%;
							box-sizing: border-box;
						}

						.line {
							height: 100%;
							width: 1px;
							background-color: #eaeef5;
						}
					}
				}
			}

			// 卡片内容
			.judge-record-content-items-detail {
				margin-bottom: 30px;
				padding: 22px 20px;
				box-sizing: border-box;
				margin-left: 1%;
				width: 45.8%;
				min-height: 260px;
				background-image: linear-gradient(90deg, #f8fcff 0%, #ffffff 99%);
				border: 1px solid #eaeef5;
				box-shadow: 0 0 20px 0 rgba(24, 144, 255, 0.1);
				border-radius: 4px;

				.judge-record-content-items-detail-content {
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					//  每一行内容
					.judge-record-content-items-detail-content-items {
						display: flex;

						.title-pink {
							color: #fe4d97;
							border: 1px solid #ffdae9;
							background: #fff0f6;
						}

						.title-blue {
							color: #fff;
							// border: 1px solid #ffdae9;
							background: #1890ff;
						}

						.title-purple {
							background: #e3d9fc;
							border: 1px solid #d9c9ff;
							color: #7540ee;
						}

						.title-orange {
							color: #ff7052;
							background: #ffe2dc;
							border: 1px solid #ffcdc3;
						}

						//  标题
						.judge-record-content-items-detail-content-items-title {
							min-width: 90px;
							border-radius: 4px;
							padding: 3px 9px;
							font-family: PingFangSC-Regular;
							font-size: 12px;
							text-align: center;
							box-sizing: border-box;
						}

						//  文本
						.judge-record-content-items-detail-content-items-text {
							display: inline-block;
							margin-left: 30px;
							font-family: PingFangSC-Regular;
							font-size: 14px;
							color: #595959;
							cursor: pointer;
							padding: 3px 0px;
						}
					}
				}
			}
		}
	}

	.dlalogShow {
		height: 100%;

		background: #fff;
		text-align: center;

		.mainName {
			// margin-top: 9px;
			// margin-bottom: 9px;
			font-size: 16px;
			font-weight: bold;
			height: 32px;
			background: #f3f9ff;
			border: 1px solid #dcedff;
			border-radius: 4px;
			color: black;
		}

		// margin: 0 auto;
		.judge-record-content {
			overflow: auto;
			height: 100%;
			margin-top: 9px;

			.judge-record-content-items {
				display: flex;

				//  时间轴
				.judge-record-content-items-time {
					display: flex;
					width: 50%;

					// 时间
					.time {
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: #707070;
						margin-right: 20px;
						line-height: 11px;
					}

					//  时间轴
					.timeline {
						display: flex;
						flex-direction: column;
						align-items: center;

						.circle {
							background: #fff;
							border: 2px solid #1890ff;
							width: 11px;
							height: 11px;
							border-radius: 50%;
							box-sizing: border-box;
						}

						.line {
							height: 100%;
							width: 1px;
							background-color: #eaeef5;
						}
					}
				}
			}

			// 卡片内容
			.judge-record-content-items-detail {
				margin-bottom: 30px;
				padding: 22px 20px;
				box-sizing: border-box;
				margin-left: 1%;
				width: 100%;
				margin-left: -15px;
				min-height: 88px;
				// background-image: linear-gradient(90deg, #f8fcff 0%, #ffffff 99%);
				// border: 1px solid #eaeef5;
				box-shadow: 0 0 20px 0 rgba(24, 144, 255, 0.1);
				border-radius: 4px;

				.judge-record-content-items-detail-content {
					height: 100%;
					display: flex;
					flex-direction: column;

					// justify-content: space-between;
					//  每一行内容
					.judge-record-content-items-detail-content-items {
						display: flex;
						margin-bottom: 20px;

						.title-blue {
							background: #1890FF;
							color: #ffffff;
							text-align: center;
							margin-right: 10px;
							border-radius: 4px;
						}

						.title-pink {
							color: #fe4d97;
							border: 1px solid #ffdae9;
							background: #fff0f6;
							margin-right: 10px;
						}

						// .title-orange{
						//    background: #FFE2DC;
						//   color: #FF7052;
						//   border: 1px solid #FFCDC3;
						//   text-align: center;
						//    margin-right: 10px;
						//   border-radius: 4px;
						// }
						.title-purple {
							background: #E3D9FC;
							;
							border: 1px solid #d9c9ff;
							color: #7540ee;
							margin-right: 10px;
						}

						.title-orange {
							color: #ff7052;
							background: #ffe2dc;
							border: 1px solid #ffcdc3;
							margin-right: 10px;
						}

						.title-none {
							color: #777777;
							background: #EAEEF5;
							border: 1px solid #EAEEF5;
							margin-right: 10px;
						}

						//  标题
						.judge-record-content-items-detail-content-items-title {
							min-width: 90px;
							border-radius: 4px;
							padding: 3px 9px;
							font-family: PingFangSC-Regular;
							font-size: 12px;
							text-align: center;
							box-sizing: border-box;
						}
					}
				}
			}
		}
	}
</style>
