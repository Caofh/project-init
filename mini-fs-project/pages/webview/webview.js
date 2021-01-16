Page({
  loadDone(e) {
    tt.showToast({
      title: "success",
      duration: 2000,
      success: res => {
        console.log(JSON.stringify(res))
      },
      fail: res => {
        console.log(JSON.stringify(res))
      }
    })
  },
  errorLoad(e) {
    tt.showModal({
      title: 'load failed',
      content: e.detail.src,
      showCancel: false,
      cancelColor: '#000000',
      confirmText: 'confirm',
      confirmColor: '#3CC51F',
      success: res => {
        console.log(JSON.stringify(res))
      },
      fail: res => {
        console.log(JSON.stringify(res))
      }
    })
  },
})