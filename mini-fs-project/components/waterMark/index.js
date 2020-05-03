const app = getApp();
const common = app.common; // 公用方法
/** 调用方法
 1. .json文件中配置自定义组件
 2. .ttml文件中调用：<watermark content="曹方晖 8102"></watermark>
 3. .ttml文件中调用，可配置水印的基础配置：<watermark content="曹方晖 8102" config="{{config}}"></watermark>
 */

Component({
  properties: {
    // 水印内容
    content: {
      type: String,
      value: '请传入水印',
    },
    config: {
      type: Object,
      value: {
        fontSize: '14', // 字号大小
        fillStyle: 'rgba(169,169,169,.2)',  // 字体颜色
        itemWidth: 140, // 横轴间隔
        itemHeight: 80, // 纵轴间隔
        len: 10, // 横轴列数
        lineLen: 10, // 纵轴行数
        rotate: -45, // 根据0，0坐标旋转角度
      },
    },
  },
  data: {
    // 组件内部数据
    innerWidth: 0,
    innerHeight: 0,
  },
  attached() {
    console.log('水印组件start')

    // 获取系统宽高信息
    common.getSystemInfo().then((res) => {
      let innerWidth = res.windowWidth
      let innerHeight = res.windowHeight
      this.setData({
        innerWidth: innerWidth,
        innerHeight: innerHeight,
      })

      // 绘制水印
      this.drawMark()

    })

  },
  methods: {
    // 自定义方法
    drawMark () {
      let name_xx = this.data.content // 水印内容
      let config = this.data.config

      // 水印配置
      let fontSize = config.fontSize || '14' // 字号大小
      let fillStyle = config.fillStyle || 'rgba(169,169,169,.2)' // 字体颜色
      let itemWidth = config.itemWidth || 140 // 横轴间隔
      let itemHeight = config.itemHeight || 80 // 纵轴间隔
      let len = config.len || 10 // 横轴列数
      let lineLen = config.lineLen || 10 // 纵轴行数
      let rotate = config.rotate || -45 // 根据0，0坐标旋转角度


      let ctx = tt.createCanvasContext('waterMark')

      ctx.rotate(rotate * Math.PI / 180);//设置文字的旋转角度，角度为45°；

      let left = 0 - (len / 2 * itemWidth)

      for (let j = 0; j < lineLen; j++){
        let currHeight = 0 + (j * itemHeight)
        // console.log(currHeight)

        for (let i = 0; i < len; i++) {
          let currLeft = left + (i * itemWidth)
          // console.log(currLeft)

          ctx.beginPath();
          ctx.setFontSize(fontSize);
          ctx.setFillStyle(fillStyle);
          ctx.fillText(name_xx, currLeft, currHeight);
        }

      }

      ctx.draw(false);
    }
  }
})