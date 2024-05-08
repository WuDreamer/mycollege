<template>
	<view class="edit">
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
				<textarea v-model="formValue.content" name="content" placeholder="请输入详细内容"> </textarea>
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
	let id;
	export default {
		data() {
			return {
				picurls:[],
				imageValue:[],
				formValue:{
					title:"",
					author:"",
					content:""
				}
			};
		},
		onLoad(e) {
			id = e.id;
			this.getDetail();
		},
		
		methods:{
			// 图片上传成功
			uploadSuccess(e){
				this.picurls=e.tempFilePaths
			},
			
			// 获取详情
			getDetail(){
				uniCloud.callFunction({
					name: "article_get_row",
					data: {
						id
					}
				}).then(res=>{
					this.formValue=res.result.data[0];
					if(!this.formValue.picurls) return;
					let urls=this.formValue.picurls.map(item=>{
						return {url:item}
					})
					this.imageValue=urls;
				})
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
			onSubmit(){
				let _picurls=this.imageValue.map(item=>{
					return item.url;
				})
				uniCloud.callFunction({
					name:"arctile_update_row",
					data:{
						detail:this.formValue,
						picurls:this.picurls
					}
				}).then(res=>{
					uni.showToast({
						title:"修改成功"
					})
					setTimeout(()=>{
						uni.navigateBack()
					},800)
				})
			}
		}
		
	}
</script>

<style lang="scss" scoped>
.edit{
	padding: 30rpx;
	.item{
		padding-bottom: 20rpx;
		input,textarea{
			border: 1rpx solid #eee;
			height: 80rpx;
			padding: 0 20rpx;
		}
		textarea{
			height: 200rpx;
			width: 100%;
			
		}
	}
}
</style>
