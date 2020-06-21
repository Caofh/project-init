# demo_4

## 基础架构

### 安装npm依赖
```
npm install
```

### 本地构建，带watch监听
```
npm run serve
npm run serve_tt
```

### 测试环境构建
```
npm run test
npm run test_tt
```

### 预发布环境构建
```
npm run pre
npm run pre_tt
```

### 线上环境构建
```
npm run build
npm run build_tt
```

## 项目规则
### 所有图片资源均使用js引用，如下
```
注意：图片资源放到 static/img/ 目录下

<script>
// 工具函数
import { getImgUrl } from '@/utils/platform/index.js' // 获取当前图片路径

// 图片资源(传入图片名称)
const logo = getImgUrl('/home/cut_093350_4021.png') // 模版图片
const logo_bg = getImgUrl('cut_093350_4021.png', 'bg') // 背景图片，注：背景图片后面需要加一个bg

export default {
    data() {
        return {
            logo: logo,
            logo_bg: logo_bg,
        }
    },
}

模版中引用：
<img class="logo" :src="logo">

css中引用背景，也在模版内使用行级样式：
<div class="logo" :style="{ background: 'url(' + logo_bg + ') no-repeat center / cover'}"></div>

</script>
```

### 打包生成weixin小程序包路径为：/dist/dev/mp-weixin
### 打包生成toutiao小程序包路径为：/dist/dev/mp-toutiao


### 参考资料
[uniapp-vue.config.js配置详细](https://uniapp.dcloud.io/collocation/vue-config).
