<template>
	<div class="judge-record-wrap" @click="hiddenMenu" ref="judgeRecord">
		<!-- 内容外层 -->
		<ul class="judge-record-content">
			<!-- 每一行内容 -->
			<li class="judge-record-content-items" v-for="(index, items) in 5" :key="items">
				<!-- 时间轴 -->
				<div class="judge-record-content-items-time">
					<span class="time">研判记录 2021-01-12 17 09：12</span>
					<span class="timeline">
						<span class="circle"></span>
						<span class="line"></span>
					</span>
				</div>
				<!-- 卡片内容 -->
				<div class="judge-record-content-items-detail">
					<ul class="judge-record-content-items-detail-content">
						<!-- 每一行内容 -->
						<li class="judge-record-content-items-detail-content-items">
							<!-- 标题 -->
							<h3 class="judge-record-content-items-detail-content-items-title title-pink">
								可能真人卡
							</h3>
							<span class="judge-record-content-items-detail-content-items-text"
								@contextmenu.prevent="handleMouseup($event, items)">王XX</span>
							<span class="judge-record-content-items-detail-content-items-text"
								@contextmenu.prevent="handleMouseup($event, items)">陈XX</span>
						</li>
						<li class="judge-record-content-items-detail-content-items">
							<!-- 标题 -->
							<h3 class="judge-record-content-items-detail-content-items-title title-purple">
								可疑空壳公司
							</h3>
							<span class="judge-record-content-items-detail-content-items-text"
								@contextmenu.prevent="handleMouseup($event, items)">XX有限责任公司</span>
						</li>
						<li class="judge-record-content-items-detail-content-items">
							<!-- 标题 -->
							<h3 class="judge-record-content-items-detail-content-items-title title-orange">
								可疑变票公司
							</h3>
							<span class="judge-record-content-items-detail-content-items-text"
								@contextmenu.prevent="handleMouseup($event, items)">XX有限责任公司</span>
						</li>
						<li class="judge-record-content-items-detail-content-items">
							<!-- 标题 -->
							<h3 class="judge-record-content-items-detail-content-items-title title-pink">
								可疑空壳公司
							</h3>
							<span class="judge-record-content-items-detail-content-items-text"
								@contextmenu.prevent="handleMouseup($event, items)">王XX</span>
							<span class="judge-record-content-items-detail-content-items-text"
								@contextmenu.prevent="handleMouseup($event, items)">陈XX</span>
						</li>
						<li class="judge-record-content-items-detail-content-items">
							<!-- 标题 -->
							<h3 class="judge-record-content-items-detail-content-items-title title-purple">
								可疑财会人员
							</h3>
							<span ref="asd" class="judge-record-content-items-detail-content-items-text"
								@contextmenu.prevent="handleMouseup($event, items)">王XX</span>
						</li>
					</ul>
				</div>
			</li>
		</ul>
		<div class="right-click-menu" v-show="showMenu" ref="menu">
			<a-menu slot="overlay" style="border: none;" @click="handleMenu">
				<a-menu-item>
					<a href="javascript:;">全景侦查</a>
				</a-menu-item>
				<a-menu-item>
					<a href="javascript:;">研判记录</a>
				</a-menu-item>
			</a-menu>
		</div>
	</div>
</template>

<script>
	import {
		getRecordData
	} from '../api/IndependentJudged.js'
	export default {
		name: 'judgeRecord',
		data() {
			return {
				showMenu: false,
				// 右键保存发送请求所需的参数
				rightClickParam: '',
			};
		},
		mounted() {
			console.log(getRecordData)
		},
		methods: {
			// 点击菜单
			handleMenu() {
				alert(this.rightClickParam);
			},
			// 右键
			handleMouseup(e, item) {
				console.log(e);
				console.log(item);
				let judgeRecordY = this.$refs.judgeRecord.offsetTop;
				let judgeRecordX = this.$refs.judgeRecord.offsetLeft;
				// 保存右键的参数，用于发请求
				this.rightClickParam = item;
				this.showMenu = true;
				let x = e.pageX;
				let y = e.pageY;
				let menu = this.$refs.menu;
				menu.style.left = x - judgeRecordX + 'px';
				menu.style.top = y - judgeRecordY + 'px';
			},
			// 隐藏菜单
			hiddenMenu() {
				this.showMenu = false;
				this.rightClickParam = '';
			},
		},
	};
</script>

<style lang="less">
	.judge-record-wrap {
		padding-left: 16.6%;
		padding-top: 40px;
		padding-bottom: 74px;
		position: relative;

		// 右键菜单
		.right-click-menu {
			position: absolute;
			z-index: 10;
			width: 90px;
			background: #ffffff;
			box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
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

		// 内容外层
		.judge-record-content {

			// 每一行内容
			.judge-record-content-items {
				display: flex;

				// 时间轴
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

					// 时间轴
					.timeline {
						display: flex;
						flex-direction: column;
						align-items: center;

						.circle {
							background: #ffffff;
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

					// 每一行内容
					.judge-record-content-items-detail-content-items {
						display: flex;

						.title-pink {
							color: #fe4d97;
							border: 1px solid #ffdae9;
							background: #fff0f6;
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

						// 标题
						.judge-record-content-items-detail-content-items-title {
							min-width: 90px;
							border-radius: 4px;
							padding: 3px 9px;
							font-family: PingFangSC-Regular;
							font-size: 12px;
							text-align: center;
							box-sizing: border-box;
						}

						// 文本
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
</style>
