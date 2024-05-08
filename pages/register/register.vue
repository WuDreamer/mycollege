<template>
	<view>
		<view class="register-page">
			<view class="phone-part">
				<image class="phone-image" src="../../static/image/账号.png" ></image>
				<input class="phone-input" type="text" placeholder="请输入您的手机号"/>	
			</view>

			<view class="captcha-part">
				<image class="captcha-image" src="../../static/image/验证 验证码.png"></image>
				<input class="captcha-input" type="text" placeholder="请输入验证码"/>
				<image class="rod-image" src="../../static/image/分隔.png"></image>
				<text class="mag-text">发送短信</text>
			</view>

			<view class="password-part">
				<image class="password-image" src="../../static/image/密码.png"></image>
				<input class="password-input" type="text" placeholder="6-12位字母加数字的组合密码"/>
				<image class="hide-image" src="../../static/image/眼睛_隐藏_o.png"></image>
			</view>

			<view class="register-part">
				<button class="regitster-bot" type="warn" size="mini">注册</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.register-page{
	display: flex;
	
	flex-direction: column;
	

	/* background: url(https://tse1-mm.cn.bing.net/th/id/OIP-C.lQbm1T7K3_cbU3dL_XG_lQHaNK?rs=1&pid=ImgDetMain);
	background-size: cover; 		/* 覆盖整个容器 */  
	/* background-repeat: no-repeat; 	/* 不重复 */  
	/*height: 100vh; */					/* 视口高度 */  
}
/* 手机号区 */
	.phone-part{
		margin-top: 1px;	/* 与顶端元素边距 */
		margin-bottom: 2%;	/* 与底部边框边距 */
		justify-content: center;
		align-items: center;
	}
	.phone-image{
		width: 30px;
		height: 30px;
		margin-top: 20%;
	}
	.phone-input{
		border-color: #f0f0f0;
		/* 边框颜色 */
		border-radius: 6%;
		/* 边框圆角 */
		border-style: solid;
		/* 边框样式 */
		margin-left: 13%;
		/* 与左边边距 */
		margin-right: 3%;
		/* 与右边边距 */
		margin-top: 20%;
	}
/* 验证区 */
	.captcha-part{
		margin-top: 1px;	/* 与顶端元素边距 */
		margin-bottom: 2%;	/* 与底部边框边距 */
	}
	.captcha-image{
		width: 30px;
		height: 30px;
		
	}
	.captcha-input{
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
	.rod-image{
		width: 30px;
		height: 30px;
		position: absolute;
		right: 13%;
	}
	.mag-text{
		
	}
/* 密码区 */
	.password-part{
		margin-top: 1px;	/* 与顶端元素边距 */
		margin-bottom: 2%;	/* 与底部边框边距 */
	}
	.password-image{
		width: 30px;
		height: 30px;
		
	}
	.password-input{
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
	.hide-image{
		width: 30px;
		height: 30px;
		position: absolute;
		right: 6%;
	}
/* 注册按钮区 */
	.register-part{
		border-top: 6%;
		border-radius: 50%;
		margin-top: 10%;
	}
	.regitster-bot{
		
	}
</style>
