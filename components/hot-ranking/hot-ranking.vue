<template>
	<view class="renking-container">
		<image class="renking-bg" :src="getRankingBg"/>
		<text class="renking-text" :class="{'text-white':ranking<=3}">{{ranking}}</text>
	</view>
</template>

<script>
	export default {
		name:"hot-ranking",
		props:{
			ranking:{
				type:Number,
				required:true
			}
		},
		data() {
			return {
				
			};
		},
		computed: {
			getRankingBg() {
				if (this.ranking <= 3) {
					return require(`@/static/images/rebangbiaoqian-${this.ranking}.png`)
				}
				return require(`@/static/images/rebangbiaoqian-4.png`)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.renking-container{
		position: relative;
		text-align: center;
		width: 18px;
		height: 20px;
		.renking-bg{
			width: 100%;
			height: 100%;
		}
		.renking-text{
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-55%,-55%);
			font-size: $uni-font-size-sm;
			font-weight: bold;
			color: #333;
			
		}
		.text-white{
			color:white;
		}
	}
	
	
</style>
