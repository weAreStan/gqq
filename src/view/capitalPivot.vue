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
								<a-checkbox :value="items.key" @click="checkboxHandle($event, index)" :disabled="
                    dimensionList.length === 1 && items.key === dimensionList[0]
                  " style="margin-left: 20px">
									{{ items.name }}
								</a-checkbox>
								<a-button :disabled="
                    !dimensionList.some(
                      (dimensionList) => dimensionList === items.key
                    )
                  " style="margin-right: 10px; width: 32px; height: 32px">
									<img @click="toggle('l', index)"
										style="width: 10px; height: 10px; margin-left: -9px" />
									<img @click="toggle('r', index)" style="width: 10px; height: 10px" />
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
					<a-select placeholder="请选择" allowClear style="width: 200px; height: 32px" @change="sum_handleChange"
						v-model="sumSelect">
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
		</div>
		<!-- 分页器 -->
		<div class="pagination">
			<a-pagination @showSizeChange="onShowSizeChange" size="small" :total="sizeTotal" show-size-changer
				show-quick-jumper @change="change" :show-total="(total) => `共 ${total} 条`" />
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
		},
		{
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
		},
		{
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
	];
	const plainOptions = ['Apple', 'Pear', 'Orange'];

	let data = [];

	for (let i = 0; i < 9; i++) {
		let temp = {
			key: i,
			jyye: 435.34 + i,
			jykh: 439943994399 + i,
			jyzh: 7654567654567 + i,
			jyje: 4201.74 + i,
			jyhm: 7654567654567 + i,
			jyzjhm: 7654567654567 + i,
			jyrq: 7654567654567 + i,
			sfbz: 7654567654567 + i,
			dszh: 7654567654567 + i,
			dskh: 7654567654567 + i,
			xjbz: 7654567654567 + i,
			dshm: 7654567654567 + i,
			dssfzh: 7654567654567 + i,
			dskhyh: 7654567654567 + i,
			zysm: 7654567654567 + i,
			jywdmc: 7654567654567 + i,
			jycs: 7654567654567 + i,
			jyfsd: 7654567654567 + i,
			jysfcg: 7654567654567 + i,
			cph: 7654567654567 + i,
			ipdz: 7654567654567 + i,
			macdz: 7654567654567 + i,
			dsjyye: 7654567654567 + i,
			jylsh: 7654567654567 + i,
			dsye: 7654567654567 + i,
			qd: 7654567654567 + i,
			rzh: 7654567654567 + i,
			pzzl: 7654567654567 + i,
			pzh: 7654567654567 + i,
			jygyh: 7654567654567 + i,
			bz: 7654567654567 + i,
			jylx: 7654567654567 + i,
			jyjeSum: 4201.74 + i,
			jyyeSum: 435.34 + i,
		};
		data.push(temp);
	}

	const jyjeSum = {
		title: '交易金额（求和）',
		dataIndex: 'jyjeSum',
		key: 'jyjeSum',
		align: 'center',
		sorter: (a, b) => a.jyjeSum - b.jyjeSum,
		sortDirections: ['descend', 'ascend'],
	};
	const jyyeSum = {
		title: '交易余额（求和）',
		dataIndex: 'jyyeSum',
		key: 'jyyeSum',
		align: 'center',
		sorter: (a, b) => a.jyyeSum - b.jyyeSum,
		sortDirections: ['descend', 'ascend'],
	};

	const columns = dimensionKey.map((items, index) => ({
		title: items.name,
		dataIndex: items.key,
		key: items.key,
	}));

	function table_onChange(pagination, filters, sorter) {
		console.log('params', pagination, filters, sorter);
	}
	export default {
		name: 'capital-pivot',
		data() {
			return {
				dimensionList: ['jykh'],
				dimensionKey: dimensionKey,
				data,
				checkedList: ['jykh'],
				keyIndex: 0,
				sumSelect: [],
				columns: [{
					title: '交易卡号',
					dataIndex: 'jykh',
				}, ],
				indeterminate: true,
				checkAll: false,
				plainOptions,
				sizeTotal: 0,
				crLabel: [{
						name: '交易金额',
						id: 0,
					},
					{
						name: '交易余额',
						id: 1,
					},
					{
						name: '交易数量',
						id: 2,
					},
					{
						name: '交易金额1',
						id: 3,
					},
					{
						name: '交易余额2',
						id: 4,
					},
					{
						name: '交易数量3',
						id: 5,
					},
				],
				size: 'default',
			};
		},
		methods: {
			// 左右切换
			toggle(flag, index) {
				let curIndex = index;
				console.log(curIndex, 'curIndex');
				let leftIndex =
					curIndex <= 0 ? (leftIndex = this.columns.length - 1) : curIndex - 1;
				let rightIndex = curIndex >= this.columns.length - 1 ? 0 : curIndex + 1;
				if (flag === 'l') {
					this.dimensionKey[curIndex] = this.dimensionKey.splice(
						leftIndex,
						1,
						this.dimensionKey[curIndex]
					)[0];

				} else {
					this.dimensionKey[curIndex] = this.dimensionKey.splice(
						rightIndex,
						1,
						this.dimensionKey[curIndex]
					)[0];
					this.columns[curIndex] = this.columns.splice(
						rightIndex,
						1,
						this.columns[curIndex]
					)[0];
				}
				console.log(this.columns);
			},
			onChange() {},
			// 选择字段位置插入
			checkboxHandle(e, index) {
				let newColumn = columns.concat();
				let checked = e.target.checked;
				if (checked) {
					this.checkedList[index] = dimensionKey[index].key;
				} else {
					this.checkedList.splice(index, 1, undefined);
				}
				let selectColumn = this.checkedList.map((checked) => {
					return newColumn.find(
						(items) => checked && items.dataIndex === checked
					);
				});
				selectColumn.forEach((items, index) => {
					if (typeof items === 'undefined') {
						delete selectColumn[index]
					}
				});
				console.log(selectColumn);
				this.columns = selectColumn;
				this.sumSelect = [];
			},
			// 求和下拉框变化
			sum_handleChange(value) {
				let jyjeSumIndex = this.columns.indexOf(
					this.columns.find((items) => items.key === 'jyjeSum')
				);
				let jyyeSumIndex = this.columns.indexOf(
					this.columns.find((items) => items.key === 'jyyeSum')
				);
				if (this.columns.find((items) => items.dataIndex === value + 'Sum')) {
					return;
				} else if (typeof value === 'undefined') {
					if (jyjeSumIndex !== -1) {
						this.columns.splice(jyjeSumIndex, 1);
					} else if (jyyeSumIndex !== -1) {
						this.columns.splice(jyyeSumIndex, 1);
					}
					return;
				} else if (value === 'jyje') {
					this.columns.push(jyjeSum);
					jyyeSumIndex !== -1 && this.columns.splice(jyyeSumIndex, 1);
				} else {
					this.columns.push(jyyeSum);
					jyjeSumIndex !== -1 && this.columns.splice(jyjeSumIndex, 1);
				}
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
			overflow: auto;
		}

		.pagination {
			text-align: right;
			margin-top: 20px;
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
