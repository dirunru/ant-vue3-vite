<template>
	<div class="s-body">
		<pre>
      rowspan:合并行
      colspan:合并列
    </pre>
		<table>
			<tr>
				<th colspan="4">标题</th>
			</tr>
			<tr>
				<th>标题1：姓名</th>
				<th>标题2：性别</th>
				<th>标题3：年龄</th>
				<th>出生日期：</th>
			</tr>
			<tr>
				<td>姓名：小明</td>
				<!-- 表格数据单元格，使用<td>标签 -->
				<td>性别：男</td>
				<td>年龄：18</td>
				<td colspan="2">出生日期（跨越两列）</td>
			</tr>
			<tr>
				<td>姓名：小红</td>
				<td>性别：男</td>
				<td>年龄：18</td>
				<td colspan="2">出生日期（跨越两列）</td>
			</tr>
			<tr>
				<th colspan="4">合计：</th>
			</tr>
			<!-- 可以继续添加更多的行和列 -->
		</table>
	</div>
</template>

<script setup>
import { ref, reactive } from "vue";
</script>
<style lang='less' scoped>
/* 可选的CSS样式，用于美化表格 */
table {
	width: 100%; /* 表格宽度占满父容器 */
	border-collapse: collapse; /* 边框合并，避免双重边框 */
	th,
	td {
		border: 1px solid black; /* 单元格边框 */
		padding: 8px; /* 单元格内边距 */
		text-align: left; /* 文本左对齐 */
	}
	th {
		background-color: #f2f2f2; /* 表头背景色 */
	}
}
</style>

<script>
// 静态元数据
export const meta = {
	title: "tr-td实现table"
};
</script>