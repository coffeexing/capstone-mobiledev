// app.js
App({
  onLaunch() {
    const isLogin = wx.getStorageSync('isLogin')
    if (!isLogin) {
      wx.setStorageSync('isLogin', data)
      wx.setStorageSync('userInfo', {
        username: '',
        vipLevel: '',
        coins: 0,
        coupons: 0,
        progress: 0,
        progressMax: 1000,
        taskDone: 0,
        taskTotal: 1
      })
    }
  },
  globalData: {
    
  }
})
