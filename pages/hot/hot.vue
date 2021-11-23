<template>
	<view class="hot-container">
		<view class="logo-view">
			<image class="logo" src="../../static/images/tuwenlogo.png" mode="aspectFit" />
		</view>
		
		<view class="search-box">
			<my-search placeholderText="请前往搜索"></my-search>
		</view>
		<view class="tab-sticky">
			<my-tab :tabData="tabList" :defaultIndex="currentIndex" :config="{
				textColor:'#333333'
			}" @tabClick="onTabClilk"></my-tab>
		</view>
		<swiper class="swiper" :current="currentIndex" :style="{height:currentSwiperHeight+'px'}"
			@animationfinish="onSwiperEnd" @change="onSwiperChange">
			<swiper-item class="swiper-item" v-for="(item,tabIndex) in tabList" :key="tabIndex">
				<view>
					<uni-load-more status="loading" v-if="isLoading" />
					<block v-else>
						<hot-list-item :class="'hot-list-item-'+tabIndex" v-for="(item,index) in listData[tabIndex]"
							:key="index" :data="item" :rankings="index+1" />
					</block>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList: [],
				currentIndex: 0,
				isLoading: true,
				listData: {},
				currentSwiperHeight: 0,
				swiperHeightData: {},
				currentPageScrollTop: 0
			};
		},
		created() {
			this.loadHotTabs();
		},
		onPageScroll(res) {
			//监听页面滚动
			this.currentPageScrollTop = res.scrollTop;
		},
		methods: {
			loadHotTabs() {
				this.$api.getHotTabs().then((res) => {
					const {
						list
					} = res;
					this.tabList = list;
					this.loadHostListFormType();
				})

			},

			loadHostListFormType() {
				// if (!this.listData[this.currentIndex]) {
				//没有缓存数据
				this.isLoading = true
				const id = this.tabList[this.currentIndex].id;
				this.$api.getHotListFromTabType({
					type: id
				}).then((res) => {
					const {
						list
					} = res;
					console.log(res);
					this.listData[this.currentIndex] = list;
					console.log(this.listData);
					this.isLoading = false

					setTimeout(() => {
						this.getCurrentSwiperHeight().then((res) => {
							this.currentSwiperHeight = res
							this.swiperHeightData[this.currentIndex] = this.currentSwiperHeight;
						});
					}, 0);
				})
				// }
				// else{
				// 	//有缓存数据
				// }

			},
			/**
			 * tab点击事件
			 */
			onTabClilk(index) {
				this.currentIndex = index;
				//this.loadHostListFormType();
			},
			onSwiperChange(e) {
				if(this.currentPageScrollTop>130){
					uni.pageScrollTo({
						scrollTop:130
					});
				}
				console.log("e", e.detail.current)
				this.currentIndex = e.detail.current;

			},
			onSwiperEnd() {
				//swiper动画完成
				if (!this.listData[this.currentIndex]) {
					this.loadHostListFormType();
					return;
				}
				//存在数据缓存
				this.currentSwiperHeight = this.swiperHeightData[this.currentIndex];
			},
			getCurrentSwiperHeight() {
				return new Promise((resolve, reject) => {
					let sum = 0;
					const query = uni.createSelectorQuery().in(this);
					query.selectAll(`.hot-list-item-${this.currentIndex}`)
						.boundingClientRect((res) => {
							console.log(res);
							res.forEach((item, index) => {
								sum += item.height
							});
							resolve(sum)
						})
						.exec();
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.hot-container {
		background-color: $uni-bg-color;
		.logo-view{
			width: 100%;
			height: 80px;
			display: flex;
			justify-content: center;
			align-items: center;
			.logo {
				width: 100px;
				height: 80px;
			}
		}
		

		.search-box {
			padding: 0 16px;
			margin-bottom: $uni-spacing-row-base;
		}

		.tab-sticky {
			position: sticky;
			z-index: 99;
			top: 0;
		}
	}
</style>
