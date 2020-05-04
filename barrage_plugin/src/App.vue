<template>
  <div id="app">

    <div id="barrage" class="bar-part">
      <Barrage ref="barrage" :baseConfig="baseConfig"></Barrage>

      <div @click="pause" :style="{color: '#000',fontSize: '30px'}">暂停弹幕</div>
      <div @click="reStart" :style="{color: '#000',fontSize: '30px'}">重启弹幕</div>
      <div @click="clear" :style="{color: '#000',fontSize: '30px'}">清空弹幕数据</div>

      <input placeholder="哈哈哈哈" @copy.prevent>

    </div>

    <!--<img src="./assets/logo.png">-->
    <!--<h1>{{ msg }}</h1>-->
    <!--<h2>Essential Links</h2>-->
    <!--<ul>-->
      <!--<li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>-->
      <!--<li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>-->
      <!--<li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>-->
      <!--<li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>-->
    <!--</ul>-->
    <!--<h2>Ecosystem</h2>-->
    <!--<ul>-->
      <!--<li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>-->
      <!--<li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>-->
      <!--<li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>-->
      <!--<li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>-->
    <!--</ul>-->
  </div>
</template>

<script>
  import Barrage from './components/vue-ruler-tool.vue'

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',

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
            itemTemplate: `
                            <div>花木兰${'花擦'}</div>
                        `,
          },
          {
            content: '胡歌胡歌胡歌',
          },
          {
            content: '陈坤陈坤',
          },
          {
            content: '花木兰',
            itemTemplate: `
                            <div>花木兰${'花擦'}</div>
                        `,
          },
          {
            content: '胡歌胡歌胡歌',
          },
          {
            content: '陈坤陈坤',
          },
          {
            content: '花木兰',
            itemTemplate: `
                            <div>花木兰${'花擦'}</div>
                        `,
          },
          {
            content: '胡歌胡歌胡歌',
          },
          {
            content: '陈坤陈坤',
          },
        ],
      },
    }
  },
  components: {
    Barrage
  },
  mounted () {

    setInterval(() => {
      let data = {
        content: '花木兰',
        itemTemplate: `
                            <div>花木兰${'花擦'}</div>
                        `,
      }

      this.$refs.barrage.addBarrage(data)

    }, 1000)

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

    copy () {
      return false
      console.log(123)
    }
  }
}
</script>

<style lang="scss">
  .bar-part {
    width: 70%;
    height: 500px;
    margin-top: 100px;
    margin-left: 20px;
    // overflow: hidden;
  }

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
