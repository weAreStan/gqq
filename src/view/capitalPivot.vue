<!--
 * @Author: 477
 * @Date: 2021-03-12 11:47:52
 * @LastEditTime: 2021-03-23 15:33:29
 * @LastEditors: Please set LastEditors
 * @Description: 数据透视
 * @FilePath: \guidance\src\views\dataAnalysis\autonomyJudge\common\capitalPivot.vue
-->
<template>
	<div class="capital-pivot">
		<!-- 维度字段及表格 -->
		<div class="dimension_index">
			<!-- 维度字段 -->
			<div class="dimension">
				<span class="title_desc">维度字段</span>
				<div class="one_dimension">
					<a-checkbox-group @change="onChange" v-model="dimensionList" class="auto_over">
						<a-row style="display: flex;">
							<a-col v-for="(items, index) in dimensionKey" :key="items.id">
								<a-checkbox :value="items.key"
									:disabled="dimensionList.length === 1 && items.key === dimensionList[0]"
									style="margin-left: 20px">
									{{items.name}}
								</a-checkbox>
								<a-button style="margin-right: 10px; width: 32px; height: 32px">
									<img style="width: 10px; height: 10px; margin-left: -9px" />
									<img style="width: 10px; height: 10px" />
								</a-button>
							</a-col>
						</a-row>
					</a-checkbox-group>
				</div>
			</div>
			<!-- 指标字段 -->
			<div class="indes_sion">
				<span class="title_desc"> 指标字段 </span>
				<div class="sum">
					<span class="indes_sion_title"> 求和：</span>
					<a-select default-value="jyje" style="width: 200px; height: 32px" @change="sum_handleChange">
						<a-select-option value="jyje"> 交易金额 </a-select-option>
						<a-select-option value="jyye"> 交易余额 </a-select-option>
					</a-select>
				</div>
				<div class="count">
					<span class="indes_sion_title"> 计数：</span>
					<a-select mode="tags" :size="size" placeholder="请选择（可多选）"
						style="width: 210px; height: 32px;overflow:auto" @change="count_handleChange">
						<a-select-option v-for="item in crLabel" :key="item.name">
							{{ item.name }}
						</a-select-option>
					</a-select>
				</div>
				<div class="average">
					<span class="indes_sion_title"> 平均值：</span>
					<a-select mode="tags" :size="size" placeholder="请选择（可多选）"
						style="width: 200px; height: 32px;overflow:auto" @change="count_handleChange">
						<a-select-option v-for="item in crLabel" :key="item.name">
							{{ item.name }}
						</a-select-option>
					</a-select>
				</div>
				<div class="mix">
					<span class="indes_sion_title"> 最大值：</span>
					<a-select mode="tags" :size="size" placeholder="请选择（可多选）"
						style="width: 200px; height: 32px;overflow:auto" @change="count_handleChange">
						<a-select-option v-for="item in crLabel" :key="item.name">
							{{ item.name }}
						</a-select-option>
					</a-select>
				</div>
				<div class="min">
					<span class="indes_sion_title"> 最小值：</span>
					<a-select mode="tags" :size="size" placeholder="请选择（可多选）"
						style="width: 200px; height: 32px;overflow:auto" @change="count_handleChange">
						<a-select-option v-for="item in crLabel" :key="item.name">
							{{ item.name }}
						</a-select-option>
					</a-select>
				</div>
			</div>
		</div>
		<!-- 表格 -->
		<div class="capTable">
			<a-table :columns="columns" :data-source="data" @change="table_onChange" :pagination="false" />
			<!-- 分页器 -->
			<div class="pagination">
				<a-pagination @showSizeChange="onShowSizeChange" size="small" :total="sizeTotal" show-size-changer
					show-quick-jumper @change="change" :show-total="(total) => `共 ${total} 条`" />
			</div>
		</div>
	</div>
</template>

<script>
	const dimensionKey = [{
			id: 1,
			name: '交易卡号',
			key: 'jykh',
		},
		{
			id: 2,
			name: '交易账号',
			key: 'jyzh',
		},
		{
			id: 3,
			name: '交易户名',
			key: 'jyhm',
		},
		{
			id: 4,
			name: '交易证件号码',
			key: 'jyzjhm',
		},
		{
			id: 5,
			name: '交易日期',
			key: 'jyrq',
		},
		{
			id: 6,
			name: '交易金额',
			key: 'jyje',
		},
		{
			id: 7,
			name: '交易余额',
			key: 'jyye',
		},
		{
			id: 8,
			name: '收付标志',
			key: 'sfbz',
		},
		{
			id: 9,
			name: '对手账号',
			key: 'dszh',
		},
		{
			id: 10,
			name: '对手卡号',
			key: 'dskh',
		},
		{
			id: 11,
			name: '现金标志',
			key: 'xjbz',
		},
		{
			id: 12,
			name: '对手户名',
			key: 'dshm',
		},
		{
			id: 13,
			name: '对手身份证号',
			key: 'dssfzh',
		},
		{
			id: 14,
			name: '对手开户银行',
			key: 'dskhyh',
		},
		{
			id: 15,
			name: '摘要说明',
			key: 'zysm',
		},
		{
			id: 16,
			name: '交易币种',
			key: 'jybz',
		},
		{
			id: 17,
			name: '交易网点名称',
			key: 'jywdmc',
		},
		{
			id: 18,
			name: '交易场所',
			key: 'jycs',
		}, {
			id: 19,
			name: '交易发生地',
			key: 'jyfsd',
		},
		{
			id: 20,
			name: '交易是否成功',
			key: 'jysfcg',
		},
		{
			id: 21,
			name: '传票号',
			key: 'cph',
		},
		{
			id: 22,
			name: 'ip地址',
			key: 'ipdz',
		},
		{
			id: 23,
			name: 'mac地址',
			key: 'macdz',
		},
		{
			id: 24,
			name: '对手交易余额',
			key: 'dsjyye',
		},
		{
			id: 25,
			name: '交易流水号',
			key: 'jylsh',
		},
		{
			id: 26,
			name: '对手余额',
			key: 'dsye',
		},
		{
			id: 27,
			name: '渠道',
			key: 'qd',
		},
		{
			id: 28,
			name: '日志号',
			key: 'rzh',
		},
		{
			id: 29,
			name: '凭证种类',
			key: 'pzzl',
		}, {
			id: 30,
			name: '凭证号',
			key: 'pzh',
		},
		{
			id: 31,
			name: '交易柜员号',
			key: 'jygyh',
		},
		{
			id: 32,
			name: '备注',
			key: 'bz',
		},
		{
			id: 33,
			name: '交易类型',
			key: 'jylx',
		},
	]
	const plainOptions = ["Apple", "Pear", "Orange"];
	const defaultCheckedList = ["Apple", "Orange"];

	const data = [{
			key: "1",
			name: "439943994399",
			age: 1400.58,
			address: "4201.74",
		},
		{
			key: "2",
			name: "439943994399",
			age: 1400.58,
			address: "",
		},
		{
			key: "3",
			name: "439943994399",
			age: 1400.58,
			address: "",
		},
		{
			key: "4",
			name: "500242777777",
			age: 5555.88,
			address: "5555.88",
		},
	];
	const columns = [{
			title: "交易卡号",
			dataIndex: "jykh",
			width: 100
		},
		{
			title: "交易账号",
			dataIndex: "jyzh",
			align: "center",
		},
		{
			title: "交易户名",
			dataIndex: "jyhm",
			align: "center",
		},
		{
			title: "交易证件号码",
			dataIndex: "jyzjhm",
			align: "center",
		},
		{
			title: "交易日期",
			dataIndex: "jyrq",
			align: "center",
		},
		{
			title: "交易金额",
			dataIndex: "jyje",
			align: "center",
		},
		{
			title: "交易余额",
			dataIndex: "jyye",
			align: "center",
		},
		{
			title: "收付标志",
			dataIndex: "sfbz",
			align: "center",
		},
		{
			title: "对手账号",
			dataIndex: "dszh",
			align: "center",
		},
		{
			title: "对手卡号",
			dataIndex: "dskh",
			align: "center",
		},
		{
			title: "现金标志",
			dataIndex: "xjbz",
			align: "center",
		},
		{
			title: "对手户名",
			dataIndex: "dshm",
			align: "center",
		},
		{
			title: "对手身份证号",
			dataIndex: "dssfzh",
			align: "center",
		},
		{
			title: "对手开户银行",
			dataIndex: "dskhyh",
			align: "center",
		},
		{
			title: "摘要说明",
			dataIndex: "zysm",
			align: "center",
		},
		{
			title: "交易币种",
			dataIndex: "jybz",
			align: "center",
		},
		{
			title: "交易网点名称",
			dataIndex: "jywdmc",
			align: "center",
		},
		{
			title: "交易场所",
			dataIndex: "jycs",
			align: "center",
		},
		{
			title: "交易发生地",
			dataIndex: "jyfsd",
			align: "center",
		},
		{
			title: "交易是否成功",
			dataIndex: "jysfcg",
			align: "center",
		},
		{
			title: "传票号",
			dataIndex: "cph",
			align: "center",
		},
		{
			title: "ip地址",
			dataIndex: "ipdz",
			align: "center",
		},
		{
			title: "mac地址",
			dataIndex: "macdz",
			align: "center",
		},
		{
			title: "对手交易余额",
			dataIndex: "dsjyye",
			align: "center",
		},
		{
			title: "交易流水号",
			dataIndex: "jylsh",
			align: "center",
		},
		{
			title: "对手余额",
			dataIndex: "dsye",
			align: "center",
		},
		{
			title: "渠道",
			dataIndex: "qd",
			align: "center",
		},
		{
			title: "日志号",
			dataIndex: "rzh",
			align: "center",
		},
		{
			title: "凭证种类",
			dataIndex: "pzzl",
			align: "center",
		},
		{
			title: "凭证号",
			dataIndex: "pzh",
			align: "center",
		},
		{
			title: "交易柜员号",
			dataIndex: "jygyh",
			align: "center",
		},
		{
			title: "备注",
			dataIndex: "bz",
			align: "center",
		},
		{
			title: "交易类型",
			dataIndex: "jylx",
			align: "center",
		},
		{
			title: "交易金额（求和）",
			dataIndex: "jyjeAll",
			align: "center",
			fixed: 'right',
			sorter: (a, b) => a.address.length - b.address.length,
			sortDirections: ["descend", "ascend"],
		},
	];

	function table_onChange(pagination, filters, sorter) {
		console.log("params", pagination, filters, sorter);
	}
	export default {
		name: "capital-pivot",
		data() {
			return {
				dimensionList: ['jykh'],
				dimensionKey: dimensionKey,
				data,
				columns: [{
					title: "交易卡号",
					dataIndex: "jykh",
				}, {
					title: "交易金额（求和）",
					dataIndex: "jyjeAll",
					align: "center",
					fixed: 'right',
					sorter: (a, b) => a.address.length - b.address.length,
					sortDirections: ["descend", "ascend"],
				}, ],
				checkedList: defaultCheckedList,
				indeterminate: true,
				checkAll: false,
				plainOptions,
				sizeTotal: 0,
				crLabel: [{
						name: "交易金额",
						id: 0
					},
					{
						name: "交易余额",
						id: 1
					},
					{
						name: "交易数量",
						id: 2
					},
					{
						name: "交易金额1",
						id: 3
					},
					{
						name: "交易余额2",
						id: 4
					},
					{
						name: "交易数量3",
						id: 5
					},
				],
				size: 'default',
			};
		},
		methods: {
			onChange(checkedList) {
				let newColumn = columns.concat()
				let selectColumn = checkedList.map(checked => {
					return newColumn.find(items => items.dataIndex === checked)
				})
				selectColumn.push(columns[columns.length - 1])
				console.log(selectColumn)
				this.columns = selectColumn
			},
			// 求和下拉框变化
			sum_handleChange(value) {
				console.log(`selected ${value}`);
			},
			count_handleChange(value) {
				console.log(`Selected: ${value}`);
			},
			table_onChange,
			// 页码改变的回调
			onShowSizeChange(pageIndex, pageNum) {
				// this.pageNum = pageNum;
				// this.pageIndex = pageIndex;
			},
			// 点击页码发生改变的回调
			change(pageIndex, pageNum) {
				// this.pageIndex = pageIndex;
				// // 写的死数据？
				// this.pageNum = 10;
			},
		},
	};
</script>
<style lang="less" scoped>
	/deep/ .ant-table-header-column {
		width: 133px;
	}

	/deep/ .ant-table-scroll {
		overflow: auto;
	}

	.capital-pivot {
		width: 100%;
		height: 100%;
		background: #ffffff;

		.dimension_index {
			width: 100%;
			height: 100px;
			background: #ecf5ff;
			border: 1px solid #b3d8ff;
			border-radius: 4px;
			padding-left: 20px;
			display: flex;
			flex-direction: column;
			justify-content: center;

			.dimension {
				display: flex;

				.title_desc {
					font-family: PingFangSC-Medium;
					font-size: 12px;
					color: #363637;
					margin-top: 8px;
					width: 4%;
				}

				.one_dimension {
					width: 100%;
					overflow: auto;
					display: flex;
					white-space: nowrap;
				}

				.one_dimension::-webkit-scrollbar {
					/*滚动条整体样式*/
					width: 5px;
					/*高宽分别对应横竖滚动条的尺寸*/
					height: 5px;
				}

				.one_dimension::-webkit-scrollbar-thumb {
					/*滚动条里面小方块*/
					border-radius: 10px;
					-webkit-box-shadow: inset005pxrgba(0, 0, 0, 0.2);
					background: rgba(0, 0, 0, 0.2);
				}

				.one_dimension::-webkit-scrollbar-track {
					/*滚动条里面轨道*/
					-webkit-box-shadow: inset005pxrgba(0, 0, 0, 0.2);
					border-radius: 0;
					background: rgba(0, 0, 0, 0.1);
				}
			}

			// 指标字段
			.indes_sion {
				overflow-x: auto;
				margin-top: 10px;
				display: flex;
				justify-content: space-between;

				.title_desc {
					font-family: PingFangSC-Medium;
					font-size: 12px;
					color: #363637;
					margin-top: 8px;
					width: 4%;
				}

				.sum {
					display: flex;
					margin-left: 20px;
					align-items: center;
				}

				.count {
					display: flex;
					margin-left: 15px;
					align-items: center;
				}

				.average {
					display: flex;
					margin-left: 15px;
					align-items: center;
				}

				.mix {
					display: flex;
					margin-left: 15px;
					align-items: center;
				}

				.min {
					display: flex;
					margin-left: 15px;
					align-items: center;
				}
			}
		}

		// 表格
		.capTable {
			margin-top: 20px;

			.pagination {
				text-align: right;
				margin-top: 20px;
			}
		}

		.capTable::-webkit-scrollbar {
			/*滚动条整体样式*/
			width: 5px;
			/*高宽分别对应横竖滚动条的尺寸*/
			height: 5px;
		}

		.capTable::-webkit-scrollbar-thumb {
			/*滚动条里面小方块*/
			border-radius: 10px;
			-webkit-box-shadow: inset005pxrgba(0, 0, 0, 0.2);
			background: rgba(0, 0, 0, 0.2);
		}

		.capTable::-webkit-scrollbar-track {
			/*滚动条里面轨道*/
			-webkit-box-shadow: inset005pxrgba(0, 0, 0, 0.2);
			border-radius: 0;
			background: rgba(0, 0, 0, 0.1);
		}
	}
</style>
