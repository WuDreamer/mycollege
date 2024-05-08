<template>
	<view class="add">
		<form @submit="onSubmit">
			<!-- 标题 -->
			<view class="item">
				<input v-model="formValue.title" type="text" name="title" placeholder="请输入标题"> </input>
			</view>
			<!-- 作者 -->
			<view class="item">
				<input v-model="formValue.author" name="author" placeholder="请输入作者名称"> </iuput>
			</view>
			<!-- 内容 -->
			<view class="item">
				<textarea v-model="formValue.content" name="content" placeholder="请输入详细内容" maxlength="2000"> </textarea>
			</view>
			
			<!-- 文件上传 -->
			<view class="item">
				<uni-file-picker
					v-model="imageValue" 
					fileMediatype="image" 
					mode="grid"  
					@success="uploadSuccess" 
				/>
			</view>
			<!-- 按钮 -->
			<view class="item">
				<button form-type="reset">重置</button>
				<button form-type="submit" type="primary" :disabled="isDisabled(formValue)">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageValue:[],
				formValue:{
					title:"",
					author:"",
					content:""
				},
				picurls:[]
			};
		},
		methods:{
			// 图片上传成功
			uploadSuccess(e){
				this.picurls=e.tempFilePaths
			},
			
			// 判断按钮是否禁用
			isDisabled(obj){
				for(let key in obj){
					if(!obj[key]){
						return true;
					}
				}
			},
		
			// 提交方法
			onSubmit(e){
				let detail = e.detail.value
				uniCloud.callFunction({
					name:"aritcle_add_row",
					data:{
						detail,
						picurls:this.picurls
					}
				}).then(res=>{
					
					uni.showToast({
						title:"发布成功!"
					})
					setTimeout(()=>{
						uni.reLaunch({
							url:"/pages/index/index"
						})
					},800)
					
				})
			},
			
			// 获取上传状态
			select(e){
				console.log('选择文件：',e)
			},
			// 获取上传进度
			progress(e){
				console.log('上传进度：',e)
			},
			
			// 上传成功
			success(e){
				console.log('上传成功')
			},
			
			// 上传失败
			fail(e){
				console.log('上传失败：',e)
			}
		}
		
	}
</script>

<style lang="scss" scoped>
.add{
	padding: 30rpx;
	.item{
		padding-bottom: 20rpx;
		input,textarea{
			border: 1rpx solid #eee;
			height: 80rpx;
			padding: 0 20rpx;
		}
		textarea{
			height: 500rpx;
			width: 100%;
			
		}
	}
}
</style>
