const app = getApp();
const common = app.common; // 公用方法

let that = ''
Page({
  data: {
    windowWidth: '',
    windowHeight: '',

  },
  onLoad: function() {
    that = this

    common.getSystemInfo().then((res) => {
      this.setData({
        windowWidth: res.windowWidth,
        windowHeight: res.windowHeight,
      }, () => {

        that.start()

      })

    })

  },

  start () {
    console.log('设置完毕')

  },


  // 设置页面分享
  onShareAppMessage: function (opt) {
    // console.log(opt);
    return {
      title: opt.from === 'button' ? 'Button Share' : 'Menu Share',
      path: '/pages/full_info/index?from=' + opt.from,
      PCPath: '/pages/full_info/index?from=' + opt.from,
      PCMode: 'sidebar-semi',
      // imageUrl: "https://xxx.jpg",
      success(res) {
        console.log('success', res);
      },
      fail(errr) {
        console.error(errr);
      },
    };
  }

});
