<template>
	<view class="my-search-container">
		<view class="my-search-box">
			<image class="icon" src="@/static/images/sousuo.png" />
			<text class="placeholder">{{placeholderText}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-search",
		props:{
			placeholderText:{
				type:String,
				default:"搜索"
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.my-search-container {
		display: flex;
		align-items: center;

		.my-search-box {
			height: 36px;
			background-color: $uni-bg-color;
			border-radius: 15px;
			border: 1px solid $uni-bg-color-grey;
			width: 100%;
			display: flex;
			align-items: center;
			padding: 0 $uni-spacing-row-base;
			.icon{
				width: $uni-img-size-sm;
				height: $uni-img-size-sm;
			}
			.placeholder{
				font-size: $uni-font-size-sm;
				margin-left: $uni-spacing-row-base;
				color: $uni-bg-color-placeholder;
			}
		}
	}
</style>
