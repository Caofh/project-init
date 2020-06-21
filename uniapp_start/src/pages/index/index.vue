<template>
	<view class="content">
		<img class="logo" :src="logo">

		<div class="logo" :style="{ background: 'url(' + logo_bg + ') no-repeat center / cover'}"></div>
		<view>
			<text class="title">{{title}}</text>
			<div @click="jump">12345</div>

			<AD></AD>
		</view>
	</view>
</template>

<script>
	// 工具函数
	import { getImgUrl } from '@/utils/platform/index.js'

	// 接口
	import { listPage } from '@/api/pages/home/home.js'

	// 组件
	import AD from '@/components/ad/ad.vue'

	// 图片资源
	const logo = getImgUrl('cut_093350_4021.png')
	const logo_bg = getImgUrl('cut_093350_4021.png', 'bg')

	export default {
		data() {
			return {
				title: 'Hello',
				logo: logo,
				logo_bg: logo_bg,
			}
		},
		components: {
			AD
		},
		onLoad() {

			listPage().then((data) => {
				console.log(data)
			})

		},
		methods: {
			jump () {
				uni.navigateTo({
					url: '/pages/sub/index/index'
				})
			}

		}
	}
</script>

<style lang="scss">
	.content {
		text-align: center;
		height: 400upx;

		.logo {
			height: 200upx;
			width: 200upx;
			margin-top: 200upx;
		}

		.title {
			font-size: 36upx;
			color: #8f8f94;
		}
	}

	
</style>
