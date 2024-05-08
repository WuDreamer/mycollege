<template>
	<view class="container">
		<view class="box">
			<image class="logo" src="../../static/image/登录人.png"></image>
			<input class="input-user" placeholder="请输入用户名" prefix-icon="person" />
			<input class="input-password" placeholder="请输入密码" type="password" prefix-icon="locked" />
			<view class="button">
				<button @click="login">登录</button>
			</view>
			<view class="forget" @click="navigateToRegisterOrForget">
				<text class="register">注册</text>
				<text class="forget-bot">忘记密码</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					username: '',
					password: ''
				}
			};
		},
		methods: {
			login() {
				// 这里添加登录逻辑，例如验证用户名和密码，然后决定是否跳转  
				// 假设验证通过，则跳转到主页  
				uni.reLaunch({
					url: '/pages/index/index'
				});
			},
			navigateToRegisterOrForget() {
				// 跳转到注册或忘记密码页面  
				uni.navigateTo({
					url: '/pages/register/register' // 假设这是注册或忘记密码页面的路径  
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.container {
		height: 50vh;
		display: flex;
		justify-content: center;
		align-items: center;
		background: url(https://pic4.zhimg.com/v2-f89fd59595c5a784049078ddb6c528d4_r.jpg?source=1940ef5c);
		background-size: cover;
		/* 覆盖整个容器 */
		background-repeat: no-repeat;
		/* 不重复 */

		background-position: center center;

		height: 100vh;
		/* 视口高度 */

	}

	.logo {
		width: 250px; // 使用标准的px单位，并根据需要调整大小  
		height: 250px; // 使用标准的px单位，并根据需要调整大小  
		margin: 0 auto 60px; // 在logo下方添加一些空间 
	}

	.input-user {
		height: 50px;
		width: 90%;
		margin-bottom: 10%;
		/* 调整输入框间距 */
		border-radius: 20px;
		/* 显示圆弧边框 */
		background-color: #fff;
		/* 背景颜色为白色 */
		padding: 10px;
	}

	.input-password {
		/* 添加样式代码，同样可以调整间距、边框和背景颜色 */
		height: 50px;
		width: 90%;
		margin-top: 10%;
		margin-bottom: 10%;
		border-radius: 20px;
		background-color: #fff;
		padding: 10px;
	}

	.button button {
		width: 100%; // 使按钮宽度填满其容器  
		padding: 10px; // 添加内边距以提高按钮的点击区域和美观度  
		background-color: #00ff7f; // 使用一个鲜明的绿色作为背景色（可根据品牌或设计指南进行调整）  
		color: #fff; // 使用白色文本以确保在任何背景上都可读性良好  
		border: none; // 移除边框以获得更简洁的外观（可选）  
		border-radius: 50px; // 添加圆角以提高美观度和与其他元素的一致性（可根据需要进行调整）  
		font-size: 16px; // 设置合适的字体大小以确保可读性良好（可根据需要进行调整）  
		font-weight: bold; // 使用粗体字体以强调按钮的重要性（可选）  
		cursor: pointer; // 当鼠标悬停在按钮上时更改光标样式以提供视觉反馈（可选但推荐）
		margin-top: 3%;
	}

	.forget {
		margin-top: 10px; // 在“注册/忘记密码”文本上方添加一些空间以提高可读性  
		justify-content: space-between;
		padding: 10rpx;
		color: #272822; // 使用灰色文本以区分主要操作和其他信息（可根据品牌或设计指南进行调整）  
		cursor: pointer; // 当鼠标悬停在该元素上时更改光标样式以提供视觉反馈（可选但推荐）  
	}

	.register {
		position: absolute;
		/* 与下面right并用设置绝对位置 */
		left: 22%;
		color: #fff;

	}

	.forget-bot {
		position: absolute;
		/* 与下面right并用设置绝对位置 */
		right: 22%;
		color: #fff;
	}
</style>