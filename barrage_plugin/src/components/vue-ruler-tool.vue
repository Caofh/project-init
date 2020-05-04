<template>
    <div class="c-barrage">
        <div ref="itemPart"
             v-for="(item, index) in barrageData" class="item-part"
        >

            <div :ref="`item${index}`"
                 class="item"
                 :style="{
                  transform: `translateX(${itemSon.left}px)`,
                  'transition-duration': `${itemSon.duration || 8}s`,
                  top: `${itemSon.top}px`,
              }"
                 v-for="(itemSon, indexSon) in item.data" :key="indexSon" v-if="itemSon">
                <div :style="itemCss ? itemCss : ''" v-html="itemSon.itemTemplate ? itemSon.itemTemplate : itemSon.content"></div>
            </div>

        </div>

    </div>
</template>

<script>
  export default {
    name: '',
    data () {
      return {
        listOrigin: [], // 弹幕源数据
        channel: [], // 轨道位置
        channelCount: 40, // 每个轨道每屏幕展示弹幕最多数量
        itemCss: '', // 自定义弹幕样式
        duration: 8, // 弹幕横跨全屏的时间(单位：s)

        barrageData: [], // 弹幕render数据
        winW: 0, // 弹幕最外层容器宽度

        barNum: 0, // 渲染弹幕数计数
        barLoop: null, // 弹幕轮训标识
      };
    },

    props: {
      baseConfig: {
        type: Object,
        default: {
          container: '', // 外部容器，默认window的宽度渲染弹幕，传入则以外部容易为基准(传入id)
          list: [],
          channel: [60],
          itemCss: '',
        },
      }
    },

    created () {
      this.listOrigin = this.baseConfig.list
      this.channel = this.baseConfig.channel
      this.channelCount = this.baseConfig.channelCount
      this.itemCss = this.baseConfig.itemCss
      this.duration = this.baseConfig.duration

    },

    mounted () {

      this.$nextTick(() => {
        // 初始化弹幕最外层容器宽度
        this.winW = this.baseConfig.container ? document.getElementById(this.baseConfig.container.replace(/\#/, '')).getBoundingClientRect().width : window.innerWidth

        this.start()
      })

    },
    methods: {
      start () {
        let channelLen = this.channel.length

        let targetArr = []
        for (let i = 0; i < channelLen; i++) {
          targetArr.push({
            top: this.channel[i],
            data: []
          })
        }

        this.barrageData = targetArr

        this.$nextTick(() => {
          this.loopCore()
        })

      },

      loopCore () {
        // 池子中无弹幕数据
        if (!this.listOrigin.length) {
          // 每300毫秒添加一个弹幕
          this.barLoop = setTimeout(() => {
            this.loopCore()
          }, 300)
          return
        }

        // 取弹幕池子中的弹幕数据
        let item = this.listOrigin[0]

        let channelIndex = this.getMinChannel()
        if (channelIndex === undefined) {
          // 每300毫秒添加一个弹幕
          this.barLoop = setTimeout(() => {
            this.loopCore()
          }, 300)

        } else {
          item.left = this.winW
          item.top = this.channel[channelIndex]

          this.barrageData[channelIndex].data.push(item)
          this.listOrigin.splice(0, 1)

          // 每300毫秒添加一个弹幕
          this.barLoop = setTimeout(() => {

            if (this.$refs[`item${channelIndex}`][this.$refs[`item${channelIndex}`].length-1]) {

              let clientRectWidth = this.$refs[`item${channelIndex}`][this.$refs[`item${channelIndex}`].length-1].getBoundingClientRect().width

              let durationNew = this.duration
              if (this.$refs[`item${channelIndex}`][this.$refs[`item${channelIndex}`].length-2]) {
                let lastClientRectWidth = this.$refs[`item${channelIndex}`][this.$refs[`item${channelIndex}`].length-2].getBoundingClientRect().width
                let lastDuration = this.$refs[`item${channelIndex}`][this.$refs[`item${channelIndex}`].length-2].style['transition-duration'].replace(/\s/g, '')
                let durationOld = (this.winW + lastClientRectWidth) / parseInt(lastDuration)

                durationNew = Math.ceil((this.winW + clientRectWidth) / durationOld)
              }

              this.barrageData[channelIndex].data[this.barrageData[channelIndex].data.length-1].left = -clientRectWidth
              this.barrageData[channelIndex].data[this.barrageData[channelIndex].data.length-1].duration = durationNew
              this.$forceUpdate()

              this.barNum++
              this.consoleTip(`检测到弹幕池子中的数据，共渲染弹幕数：${this.barNum}`)

              // 统一删除过期弹幕
              this.deleteBarrage()

            }

            this.loopCore()
          }, 300)

        }

      },
      getMinChannel () {
        let result = []

        this.channel.map((item, index) => {

          if (this.$refs[`item${index}`]) {
            let left = this.$refs[`item${index}`].length ? this.getNodePosition(this.$refs[`item${index}`][this.$refs[`item${index}`].length-1]) : 0

            result.push(left)
          } else {
            result.push(0)
          }

        })

        let min = Math.min.apply(null, result)

        if (min < this.winW) {
          return result.indexOf(min)
        } else {
          return undefined
        }

      },
      getNodePosition (ele) {
        if (!ele) return 0

        let clientRect = ele.getBoundingClientRect()
        let containerRect = this.baseConfig.container ? document.getElementById(this.baseConfig.container.replace(/\#/, '')).getBoundingClientRect() : ''

        // 区分有外部父级容器情况
        let left = this.baseConfig.container ? (clientRect.left - containerRect.left) : clientRect.left
        let width = clientRect.width

        return left + width
      },

      // 统一删除过期弹幕
      deleteBarrage () {
        let arr = []

        this.barrageData.map((item, index) => {
          let obj = {
            top: item.top,
            data: []
          }
          let len = item.data.length
          item.data.map((item, index) => {
            if (index < len - this.channelCount) {
              obj.data.push(null)
            } else {
              obj.data.push(item)
            }
          })

          arr.push(obj)
        })

        this.barrageData = arr
        // this.$forceUpdate()

        this.consoleTip(`清理过期弹幕`)
        // this.consoleTip(this.barrageData)
      },

      consoleTip (str) {
        console.log(str)
      },

      // 对外api----
      // 向弹幕池子中追加弹幕弹幕数据
      addBarrage (itemData) {
        this.listOrigin.push(itemData)
        this.$forceUpdate()

        this.consoleTip(`向弹幕池子中追加弹幕弹幕数据`)

      },
      // 清除所有弹幕数据
      clearBarrage () {
        let arr = []
        this.barrageData.map((item, index) => {
          let obj = {
            top: item.top,
            data: []
          }
          arr.push(obj)
        })

        this.barrageData = arr

        this.consoleTip(`清除所有弹幕数据`)
      },
      // 暂停弹幕轮训
      stopLoop () {
        clearTimeout(this.barLoop)
        this.barLoop = null

        this.consoleTip(`暂停弹幕轮训`)
      },
      // 重启弹幕轮训
      reStart () {
        this.loopCore()

        this.consoleTip(`重启弹幕轮训`)
      }

    }

  };
</script>

<style lang="scss">
    body {
        margin: 0;

        .c-barrage {
            position: relative;
            width: 100%;
            height: 100%;

            .item-part {
                position: absolute;
                width: 100%;
                height: 100%;
                overflow-x: hidden;

                .item {
                    box-sizing: border-box;
                    position: absolute;
                    transition-property: all;
                    // transition-duration: 8s;
                    transition-timing-function: linear;
                    will-change: transform;

                    background: #f0f0f0;
                    color: #000;
                    padding: 10px;
                    border-radius: 10px;
                }
            }

        }
    }


</style>
