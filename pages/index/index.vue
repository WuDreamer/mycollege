<template>
	<view class="home">
		<!-- 搜索区域 -->
		<uni-section type="line" @click="onSearch()">
			<uni-search-bar placeholder="请输入您想查找的关键词..." bgColor="#EEEEEE" @click="onSearch()" />
		</uni-section>

		<!-- 轮播区域 -->
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="4000" :duration="1000">
			<!-- 添加图片轮滑图 -->
			<swiper-item class="item">
				<!-- image插入图 -->
				<image src="/static/images/pic1.jpg" mode="heightFix"></image>
			</swiper-item>
			<swiper-item class="item">
				<image src="/static/images/pic2.jpg" mode="heightFix"></image>
			</swiper-item>
			<!-- 设置文本框 -->
			<input type="text">
		</swiper>

		<!-- 内容区域 -->
		<view class="container">
			<view class="box-row">
				<view v-for="(item, index) in boxes" :key="index" class="box" :class="{ active: index === activeIndex }"
					@click="changeActive(index)">
					{{ item.text }}
				</view>
			</view>
			<view class="content">
				<!-- 这里展示根据 activeIndex 切换的内容 -->
				<view v-if="activeIndex === 0">
					<!-- 内容 A -->
					<view class="content">
						<view class="item" @click="goDetail(item._id)" v-for="item in listArr" :key="item._id">
							<view class="pic">
								<image v-if="item.picurls && item.picurls.length" 　mode="aspectFill"
									:src="item.picurls[0]"></image>
								<image v-else　mode="aspectFill" src="../../static/images/nopic.jpg"></image>
							</view>
							<view class="text">
								<view class="title">{{item.title}}</view>
								<view class="info">
									<text>{{item.author}}</text>

								</view>
							</view>
							
						</view>
					</view>
					<view class="goEdit" @click="goAdd">
						<uni-icons type="plusempty" size="30" color="#eee"></uni-icons>
					</view>
				</view>
				<view v-else-if="activeIndex === 1">
					<!-- 内容 B -->
					<view class="content">
						<view class="item" @click="goDetail(item._id)" v-for="item in listArr" :key="item._id">
							<view class="text">
								<view class="title">{{item.title}}</view>
								<view class="info">
									<text>{{item.author}}</text>
									<uni-dateformat :date="item.posttime" :threshold="[60000, 7200000]"
										format="yyyy-MM-dd">
									</uni-dateformat>
								</view>
							</view>
							<view class="pic">
								<image v-if="item.picurls && item.picurls.length" 　mode="aspectFill"
									:src="item.picurls[0]"></image>
								<image v-else　mode="aspectFill" src="../../static/images/nopic.jpg"></image>
							</view>
						</view>
					</view>
				</view>
				<view v-else>
					<!-- 内容 C -->
					<view class="content">
						<view class="item" @click="goDetail(item._id)" v-for="(item,inden) in listArr" :key="item._id">
							<view class="text">
								<view class="title">
									<text>热榜</text>{{inden+1}}:
								<br />{{item.title}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listArr: [],
				boxes: [{
						text: '推荐',
						bgColor: 'red'
					}, // 假设初始第一个背景颜色不同  
					{
						text: '最近',
						bgColor: 'blue'
					},
					{
						text: '榜单',
						bgColor: 'green'
					},
				],
				activeIndex: 0, // 默认选中第一个盒子
			}
		},
		onLoad() {
			// 调用getData方法
			this.getData();
		},
		// 触底方法
		onReachBottom() {
			this.getData()
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.listArr = []
			this.getData();
		},
		methods: {
			changeActive(index) {
				this.activeIndex = index;
				// 如果需要改变选中盒子的背景色（动态），可以在这里处理  
				// 但由于 uni-app 不支持直接修改内联样式中的背景色，你可能需要在 CSS 中使用变量或者类名来切换  
			},
			// 跳转到detial页面
			goDetail(e) {
				uni.navigateTo({
					url: "/pages/detial/detial?id=" + e
				})
			},
			onSearch(e) {
				uni.navigateTo({
					url: "/pages/search/search"
				})
			},
			// 获取数据库的列表
			getData() {
				uniCloud.callFunction({
					name: "article_get_all",
					data: {
						skip: this.listArr.length
					}
				}).then(res => {
					console.log(res);
					let oldList = this.listArr;
					let newList = [...oldList, ...res.result.data];
					this.listArr = newList
					uni.stopPullDownRefresh()
				})
			},
			// 跳转到add页面
			goAdd() {
				uni.switchTab({
					url: "/pages/add/add"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home {
		.swiper {
			height: 400rpx;
			width: 100%;

		}

		.item {
			height: 100%;
			width: 100%;
		}

		.container {
			display: flex;
			flex-direction: column;
		}

		.box-row {
			display: flex;
			justify-content: space-between;
			/* 等距间隔 */
			margin-left: 40rpx;
			margin-right: 40rpx;
			margin-top: 20rpx;
		}

		.box {
			padding: 10px;
			border: 1px solid #ccc;
			/* 边框 */
			border-radius: 15rpx;
			/* 圆角 */
			/* 默认的背景色可以在这里设置，但第一个盒子的不同背景色需要通过 data 或计算属性来处理 */

		}

		.box.active {
			/* 激活状态的背景色 */
			background-color: #6db33f;
		}

		.content {
			padding-right: 10rpx;
			padding-top: 10rpx;
			padding-left: 2rpx;

			.item {
				display: flex;
				justify-content: space-between;
				padding: 20rpx 0;
				border-bottom: 1rpx solid #eee;

				.text {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					padding-right: 20rpx;

					.title {
						font-size: 40rpx;
						color: #333;
						text-align: justify;
						overflow: hidden;
						/* 隐藏超出元素框的内容 */
						-webkit-line-clamp: 2;
						/* 限制文本显示的行数为两行 */
						text-overflow: ellipsis;
						/* 当文本溢出容器时，使用省略号表示 */
						display: -webkit-box;
						/* 将元素作为弹性伸缩盒子模型显示 */
						-webkit-box-orient: vertical;
						/* 设置伸缩盒对象的子元素的排列方式为垂直 */
						text {
							color: red;
						}
					}

					.info {
						font-size: 28rpx;
						color: #888;

						text {
							padding-right: 10rpx;
						}
					}
				}

				.pic {
					width: 260rpx;
					height: 180rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

			}
		}

		.goEdit {
			width: 120rpx;
			height: 120rpx;
			background: #2B9939;
			color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 50%;
			font-size: 50rpx;
			position: fixed;
			right: 60rpx;
			bottom: 100rpx;
			box-shadow: 0 0 20rpx rgba(43, 154, 57, 0.7);
		}
	}
</style>