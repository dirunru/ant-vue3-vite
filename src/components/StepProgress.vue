	<template>
	<div class="step-progress">
		<div
			v-for="(step, index) in steps"
			:key="index"
			class="step-item"
			:class="{ active: index === activeIndex }"
		>
			<div class="step-item-left">
				<div class="step-img">
					<img :src="step.url" alt="步骤图" />
					<div class="step-icon">
						<!-- 根据步骤状态显示不同的图标 -->
						<div v-if="index === activeIndex" class="step-icon">
							<CheckCircleFilled :style="{ color: 'green' }" />
						</div>
						<div v-else class="step-icon">
							<CheckCircleFilled :style="{ color: '#ccc' }" />
						</div>
					</div>
				</div>
				<div class="step-division"></div>
			</div>
			<div class="step-item-right">
				<div class="step-title">{{ step.title }}</div>
				<div class="step-description">{{ step.description }}</div>
				<div class="step-status">状态：发起</div>
				<div class="step-next">下一步：申请人审核</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { CheckCircleFilled } from "@ant-design/icons-vue";
defineProps({
	steps: Array, // 步骤数组，每个步骤包含status, title, description等属性
	activeIndex: {
		// 当前激活的步骤索引
		type: Number,
		default: 0
	}
});
</script>
<style lang="less" scoped>
@fontSize: 14px;
@fontSecondSize: 12px;
.step-progress {
	width: 300px;
	.step-item {
		display: flex;
		&:not(:last-child) {
			.step-item-left {
				.step-division {
					width: 30px;
					height: 30px;
					border-right: dashed 1px #ccc;
					margin: 10px 0;
				}
			}
		}
		.step-item-left {
			.step-img {
				position: relative;
				border: solid 1px #ccc;
				border-radius: 4px;
				margin-right: 20px;
				width: 60px;
				height: 60px;
				img {
					/* 图片样式*/
					width: 100%;
					height: 100%;
				}
				.step-icon {
					/* 图标样式 */
					position: absolute;
					bottom: -2px;
					right: -2px;
					z-index: 1;
				}
			}
		}
		.step-item-right {
			div {
				line-height: 20px;
			}
			.step-title {
				/* 标题样式 */
				font-size: @fontSize;
				color: #333;
			}

			.step-description {
				/* 描述样式 */
				font-size: @fontSecondSize;
				color: #ccc;
			}
			.step-status {
				font-size: @fontSecondSize;
				color: green;
			}
			.step-next {
				font-size: @fontSecondSize;
				color: #ccc;
			}
		}
	}
}
</style>