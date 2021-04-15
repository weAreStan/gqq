<template>
	<div style="display: flex;">
		<div style="width: 10.42vw; background-color: red;"></div>
		<div style="width: 89.58vw;">
			<div class="task-info-container">
				<div class="task-info-search-container">
					<div>
						<el-select v-model="taskName" style="width: 13.54vw;" placeholder="请选择" clearable>
							<el-option v-for="item in taskList" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
						<el-select v-model="taskName" style="width: 8.59vw;" placeholder="请选择" clearable>
							<el-option v-for="item in taskList" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
						<el-select v-model="taskName" style="width: 8.59vw;" placeholder="请选择" clearable>
							<el-option v-for="item in taskList" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
						<el-select v-model="taskName" style="width: 8.59vw;" placeholder="请选择" clearable>
							<el-option v-for="item in taskList" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
						<el-select v-model="taskName" style="width: 8.59vw;" placeholder="请选择" clearable>
							<el-option v-for="item in taskList" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
						<el-select v-model="taskName" style="width: 8.59vw;" placeholder="请选择" clearable>
							<el-option v-for="item in taskList" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
						<el-select v-model="taskName" style="width: 13.54vw;" placeholder="请选择" clearable>
							<el-option v-for="item in taskList" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</div>
					<el-button type="primary" style="height: 40px; width: 5.21vw;">查询</el-button>
				</div>
				<h3 class="task-info-search-total">当前条件下共有100条数据</h3>
				<el-table :data="tableData" @selection-change="handleSelectionChange"
					:header-cell-style="{fontWeight: 'bold', color: '#000000',}" border style="width: 100%" height="500"
					stripe>
					<el-table-column prop="id" label="#" width="45" align="center">
					</el-table-column>
					<el-table-column type="selection" width="50" align="center">
					</el-table-column>
					<el-table-column prop="name" label="数据名称" width="190" align="center">
					</el-table-column>
					<el-table-column prop="time" label="日期" width="190" align="center">
					</el-table-column>
					<el-table-column prop="addr" label="地址" width="190" align="center">
					</el-table-column>
					<el-table-column prop="spaceData" label="空间数据" width="190" align="center">
						<template slot-scope="{row}">
							<p class="finished">{{row.spaceData}}</p>
						</template>
					</el-table-column>
					<el-table-column prop="question" label="问卷" width="190" align="center">
						<template slot-scope="{row}">
							<p class="finished">{{row.question}}</p>
						</template>
					</el-table-column>
					<el-table-column prop="picture" label="照片" width="190" align="center">
						<template slot-scope="{row}">
							<p class="unfinished">{{row.picture}}</p>
						</template>
					</el-table-column>
					<el-table-column prop="video" label="视频" width="190" align="center">
						<template slot-scope="{row}">
							<p class="unfinished">{{row.video}}</p>
						</template>
					</el-table-column>
					<el-table-column prop="audio" label="音频" width="190" align="center">
						<template slot-scope="{row}">
							<p class="unfinished">{{row.audio}}</p>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination style="margin-top: 30px; text-align: right;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1"
					:page-sizes="[100, 200, 300, 400]" :page-size="100" background
					layout="prev, pager, next, jumper, total, sizes" :total="400">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	let tableData = []
	for (let i = 0; i < 100; i++) {
		tableData.push({
			id: i + 1,
			name: '数据的名称',
			time: '1985年08月08日',
			addr: '某某省某某市',
			spaceData: '点数据',
			question: '已上传',
			picture: '未上传',
			video: '未上传',
			audio: '未上传',
		})
	}
	export default {
		data() {
			return {
				taskList: [{
					value: 0,
					label: '夜袭塔利班'
				}, {
					value: 1,
					label: '潜伏叙利亚'
				}, ],
				taskName: 0,
				tableData,
			}
		},
		methods: {
			handleSelectionChange(val) {
				console.log(val)
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			}
		}
	}
</script>

<style lang="less" scoped>
	/deep/ .el-input__inner {
		background: #F4F8FB;
		border: none;
	}

	/deep/ .el-select {
		margin-left: 20px;

		&:first-child {
			margin: 0;
		}
	}

	.task-info-container {
		width: 100%;

		.task-info-search-container {
			width: 100%;
			display: flex;
			justify-content: space-between;
			padding: 20px 40px 10px 20px;
		}

		.task-info-search-total {
			font-size: 20px;
			font-family: SourceHanSansCN-Bold, SourceHanSansCN;
			font-weight: bold;
			color: #3388EF;
			padding-left: 20px;
			margin-bottom: 10px;
			line-height: 30px;
		}

		.unfinished {
			color: #FA6400;
		}

		.finished {
			color: #009688;
		}
	}
</style>
