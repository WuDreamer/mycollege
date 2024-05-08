<template>
	<view class="detail">
		<view v-if="loadState">
			
			<view class="title">{{detail.title}}</view>
			<view class="info">
				<text>{{detail.author}}</text>
				<text>
					<uni-dateformat :date="detail.posttime" format="yyyy年MM月dd日 hh:mm:ss"
						:threshold="[60000,3600000]"></uni-dateformat>
				</text>
			</view>
			<view class="content">
				{{detail.content}}
			</view>
			<view class="picurls" v-if="detail.picurls && detail.picurls.length">
				<image v-for="item in detail.picurls" :src="item" mode="widthFix"></image>
			</view>
			
			<view class="buTGroue">
				<button type="primary" size="mini" @click="goEdit">修改</button>
				<button type="warn" size="mini" @click="onRemove">删除</button>
			</view>
			
		</view>
		
		<view v-else>
			<uni-load-more status="loading"></uni-load-more>
		</view>
	</view>
</template>

<script>
	let id;
	export default {
		data() {
			return {
				detail:{},
				loadState:false
			};
		},
		onLoad(e) {
			id = e.id
			
		},
		onShow() {
			this.getDetail();
		},
		methods: {
			// 跳转到修改页面
			goEdit(){
				uni.navigateTo({
					url:"/pages/edit/edit?id="+id
				})
			},
			
			//删除一条记录
			onRemove(){
				uni.showModal({
					content:"是否确认删除?",
					success:res=>{
						if(res.confirm){
							this.removeFun()
						}
					}
				})
			},
			removeFun(){
				uniCloud.callFunction({
					name:"arctile_remove_row",
					data:{
						id
					}
				}).then(res=>{
					uni.showToast({
						title:"删除成功"
					})
					setTimeout(()=>{
						uni.reLaunch({
							url:"/pages/index/index"
						})
					},800)
				})
			},
			
			//获取详情
			getDetail() {
				uniCloud.callFunction({
					name: "article_get_row",
					data: {
						id
					}
				}).then(res => {
					console.log(res);
					this.detail = res.result.data[0];
					this.loadState= true
					uni.setNavigationBarTitle({
						title:this.detail.title
					})
				}).catch(()=>{
					uni.showToast({
						icon:"error",
						title:"删除有误"
					})
					setTimeout(()=>{
						uni.reLaunch({
							url:"/pages/index/index"
						})
					},800)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.detail {
		padding: 30rpx;

		.title {
			font-size: 50rpx;
			color: #000;
			text-align: justify;
			line-height: 1.4em;
		}

		.info {
			font-size: 30rpx;
			color: #666;
			padding: 30rpx 0 60rpx;

			text {
				padding-right: 30rpx;
			}
		}

		.content {
			font-size: 36rpx;
			line-height: 1.7em;
		}

		.picurls{
			padding-top: 50rpx;
			image{
				width: 100%;
				display: block;
				margin-bottom: 30rpx;
			}
		}
		
		.buTGroue {
			padding: 50rpx 0;

			button {
				margin-right: 30rpx;
			}
		}
	}
</style>