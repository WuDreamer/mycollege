<template>
	<view>
		<view class="page-back">
			<!-- 登录区 -->
			<view class="head-part" @click="goToLogin">
				<view class="head-picture">
					<image class="head-image" src="../../static/image/登录人.png"></image>
				</view>
				<view class="button-part">
					<button class="button-login" type="primary" size="mini">立即登录</button>
				</view>
			</view>

<!-- 			舌诊区
			<view class="tougue-part">
				<view class="tougue-picture">
					<image class="toufue-image" src="../../static/image/口腔科.png"></image>
				</view>
				<view class="text-tougue">
					<text>舌诊报告</text>
				</view>
			</view> -->

			<!-- 静态页面区 -->
			<view class="static-part">
				<view class="service">
					<image class="static-left" src="../../static/image/关于我们.png"></image>
					<text class="static-text" >在线客服</text>
					<image class="static-right" src="../../static/image/返回键.png"></image>
				</view>
				<view class="service" @click="goToOur">
					<image class="static-left" src="../../static/image/关于我们.png"></image>
					<text class="static-text">关于我们</text>
					<image class="static-right" src="../../static/image/返回键.png"></image>
				</view>
				<view class="service" @click="goToUser">
					<image class="static-left" src="../../static/image/关于我们.png"></image>
					<text class="static-text">用户协议</text>
					<image class="static-right" src="../../static/image/返回键.png"></image>
				</view>
				<view class="service" @click="goToPrivacy">
					<image class="static-left" src="../../static/image/关于我们.png"></image>
					<text class="static-text">隐私政策</text>
					<image class="static-right" src="../../static/image/返回键.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			goToLogin() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
			goToUser() {
				uni.navigateTo({
					url: '/pages/useragreement/useragreement'
				})
			},
			goToPrivacy() {
				uni.navigateTo({
					url: '/pages/privacy/privacy'
				})
			},
			goToOur() {
				uni.navigateTo({
					url: '/pages/aboutme/aboutme'
				})
			}
		}
	}
</script>

<style>
	/* 登录部分 */
	.head-part {
		display: flex;
		/* 取消默认布局 */
		flex-direction: column;
		align-items: center;
		margin-top: 5%;
		/* 与顶端元素边距 */
		border-color: #f0f0f0;
		/* 边框颜色 */
		border-radius: 6%;
		/* 边框圆角 */
		border-style: solid;
		/* 边框样式 */
		margin-left: 3%;
		/* 与左边边距 */
		margin-right: 3%;
		/* 与右边边距 */
	}

	.head-picture {}

	/* 头像设置 */
	.head-image {
		margin-top: 10%;
		border-radius: 50%;
		/* 设置图片图形 */
		width: 130px;
		height: 130px;
	}

	/* 登录按钮设置 */
	.button-part {
		margin-top: 20px;
		/* 与顶端元素边距 */
		margin-bottom: 5%;
		/* 与底部边框边距 */
		font-size: 20px;
	}

	/* 舌诊部分 */
	/* .tougue-part {
		display: flex;
		align-items: center;
		flex-direction: column;
		/* margin-top: 4%; /* 与顶端元素边距 */
		/* border-color: #f0f0f0;/* 边框颜色 */ 
		/* border-radius: 6%;/* 边框圆角 */ 
		/* border-style: solid;/* 边框样式 */ 
		/* margin-left: 3%;/* 与左边边距 */ 
		/* margin-right: 3%;/* 与右边边距 */ 
	/* } */ 
	
	.toufue-image {
		width: 150rpx;
		height: 150rpx;
	}

	.text-tougue {
		margin-bottom: 10%;
		/* 与底部边框边距
		font-weight: 1000;
		/* 字体粗细 */
	}

	/* 静态页面部分 */
	.static-part {
		display: flex;
		flex-direction: column;
		margin-top: 4%;
		/* 与顶端元素边距 */
		border-color: #f0f0f0;
		/* 边框颜色 */
		border-radius: 6%;
		/* 边框圆角 */
		border-style: solid;
		/* 边框样式 */
		margin-left: 3%;
		/* 与左边边距 */
		margin-right: 3%;
		/* 与右边边距 */

	}

	.service {
		margin-top: 5%;
		margin-bottom: 5%;
	}

	.static-left {
		width: 50rpx;
		height: 50rpx;
		position: absolute;
		/* 与下面left并用设置绝对位置 */
		left: 6%;
	}

	.static-text {
		margin-top: 3%;
		margin-left: 15%;
		font-size: 18px;
		/* 字体大小 */
		font-weight: 550;
	}

	.static-right {
		width: 50rpx;
		height: 50rpx;
		position: absolute;
		/* 与下面right并用设置绝对位置 */
		right: 5%;
	}
</style>
