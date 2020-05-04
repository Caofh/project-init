# barrage_plugin（基于vue的弹幕插件）

## 下载
~~~
npm install barrage_plugin --save
~~~

## 使用(demo示例)

#### template:
``` bash
<div id="barrage" class="bar-part">
  <Barrage ref="barrage" :baseConfig="baseConfig"></Barrage>

  <div @click="pause">暂停弹幕</div>
  <div @click="reStart">重启弹幕</div>
  <div @click="clear">清空弹幕数据</div>
</div>
```

#### js
``` bash
import Barrage from 'barrage_plugin'

export default {
  name: "Home",
  components: {
    Barrage
  },
  data() {
    return {
        baseConfig: {
          channel: [60, 120, 180], // 轨道位置
          channelCount: 5,
          duration: 6,
          itemCss: {
            color: 'blue',
          },
          container: '#barrage', // 注只能传入id
          list: [
            {
              content: '花木兰',
              itemTemplate: `<div>花木兰${'花擦'}</div>`,
            },
            {
              content: '胡歌胡歌胡歌',
            },
          ],

      },
    };
  },
  created() {

  },
  methods: {
    pause () {
      console.log('click')
      this.$refs.barrage.stopLoop()
    },
    reStart () {
      console.log('click')
      this.$refs.barrage.reStart()
    },
    clear () {
      console.log('click')
      this.$refs.barrage.clearBarrage()
    },

  }
};

```
#### css
``` bash
<style scoped>
  .bar-part {
    width: 70%;
    height: 500px;
    margin-top: 100px;
    margin-left: 20px;
  }
</style>

```

## 配置
#### 传入的config(具体如上方示例)
~~~
baseConfig: {
  listOrigin: [], // 弹幕源数据
  channel: [], // 轨道位置，如[60, 120, 180]，各个轨道的top距离（px）
  channelCount: 40, // 每个轨道每屏幕展示弹幕最多数量，默认40
  itemCss: '', // 自定义弹幕样式，每个弹幕上会增加此配置样式类
  duration: 8, // 弹幕横跨全屏的时间(单位：s)
}
~~~

## api(具体如上方示例)
~~~
this.$refs.barrage.stopLoop() // 停止弹幕移动

this.$refs.barrage.reStart() // 弹幕移动重新启动

this.$refs.barrage.clearBarrage() // 清空弹幕元素
~~~


