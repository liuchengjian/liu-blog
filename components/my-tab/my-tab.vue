<template>
	<view class="tab-container">
		<view class="tab-box">
			<scroll-view scroll-x class="scroll-view" scroll-with-animation :scroll-left="scrollLeft">
				<view class="scroll-content">
					<view class="tab-item-box">
						<block v-for="(item,index) in tabData" :key="index">
							<view :id="'_tab_'+index" class="tab-item"
								:class="{'tab-item-active' : activeIndex===index}" :style="{
									 color:activeIndex===index?defaultConfig.activeTextColor:defaultConfig.textColor
								 }" @click="onTabClick(index)">
								{{item.label||item}}
							</view>
						</block>
					</view>
					<!--滑块-->
					<view class="underLine" :style="{
						transform:'translateX('+slider.left+'px)',
						width:defaultConfig.underLineWidth+'px',
						height:defaultConfig.underLineHeight+'px',
						backgroundColor:defaultConfig.underLineColor
					}"></view>
				</view>
			</scroll-view>

		</view>

	</view>
</template>

<script>
	export default {
		name: "my-tab",
		props: {
			config: {
				type: Object,
				default: () => {
					return {};
				}
			},
			tabData: {
				type: Array,
				default: () => {
					return [];
				}
			},
			defaultIndex: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				tabList: [],
				activeIndex: -1,
				//滚动的时机
				//滚动的距离
				//滑块
				slider: {
					//滑块距离左侧距离
					left: 0
				},
				scrollLeft: 0,
				defaultConfig: {
					textColor: '#333333',
					activeTextColor: '#f94d2a',
					underLineWidth: 24,
					underLineHeight: 2,
					underLineColor: '#f94d2a'

				}
			};
		},
		//监听器
		watch: {
			config: {
				handler(val) {
					this.defaultConfig={
						...this.defaultConfig,
						...val
					}
				},
				//immediate 当前的handler回调将监听之后立即回调
				immediate: true
			},
			tabData: {
				handler(val) {
					this.tabList = val;
					setTimeout(() => {
						//dom渲染之后调用，使用一个延时器
						this.updateTabWidth();
					}, 0);
				},
				//immediate 当前的handler回调将监听之后立即回调
				immediate: true
			},
			defaultIndex: {
				handler(val) {
					this.activeIndex = val;
					//重新计算滑块位置
					this.tabToIndex();
				},
				//immediate 当前的handler回调将监听之后立即回调
				immediate: true
			}

		},
		methods: {
			updateTabWidth() {
				let data = this.tabList;
				if (data.length === 0) return;
				const query = uni.createSelectorQuery().in(this);
				//循环
				data.forEach((item, index) => {
					query
						.select('#_tab_' + index)
						.boundingClientRect((res) => {
							//res就是拿到dom
							item._slider = {
								left: res.left + (res.width - this.defaultConfig.underLineWidth) / 2
							};
							//运算完成后
							if (data.length - 1 === index) {
								this.tabToIndex();
							}
						})
						.exec();
				});
			},
			onTabClick(index) {
				this.activeIndex = index;
				this.tabToIndex();
				//发送一个通知，通知表示tab项发生变化了
				this.$emit('tabClick', index)
			},
			/**
			 * 计算滑块的滚动位置
			 */
			tabToIndex() {
				if(this.tabList.length===0) return;
				const index = this.activeIndex;
				//TODO：计算滑块的滚动
				this.slider = {
					left: this.tabList[index]._slider.left
				};
				//控制scrollView横向滚动
				this.scrollLeft = this.activeIndex * this.defaultConfig.underLineWidth
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tab-container {
		font-size: $uni-font-size-base;
		height: 45px;
		line-height: 45px;
		background-color: $uni-bg-color;

		.tab-box {
			width: 100%;
			height: 45px;
			display: flex;
			position: relative;

			.scroll-view {
				white-space: nowrap;
				width: 100%;
				height: 100%;
				box-sizing: border-box;

				.scroll-content {
					width: 100%;
					height: 100%;
					position: relative;

					.tab-item-box {
						height: 100%;

						.tab-item {
							height: 100%;
							display: inline-block;
							text-align: center;
							padding: 0 15rpx;
							position: relative;
							color: $uni-text-color;

							&-active {
								color: $uni-text-color-hot;
							}
						}
					}

					.underLine {
						height: 2px;
						width: 24px;
						background-color: $uni-text-color-hot;
						border-radius: 3px;
						transition: .5s;
						position: absolute;
						bottom: 0;
					}
				}
			}
		}
	}
</style>
