// home.js
const app = getApp();

Page({
  isLogin: false,
  data: {
    userInfo: {
      username: '',
      vipLevel: '',
      coins: 0,
      coupons: 0,
      progress: 0,
      progressMax: 1000,
      taskDone: 0,
      taskTotal: 1,
    },
    drinks: [{
        id: 1,
        name: '奶茶',
        price: 8.00,
        img: '/assets/goods/fruit/1.jpg'
      },
      {
        id: 2,
        name: '饮品2',
        price: 25.00,
        img: '/assets/goods/ice/2.jpg'
      },
      {
        id: 3,
        name: '普洱茶',
        price: 9.00,
        img: '/assets/goods/tea/3.jpg'
      }
    ],
  },

  onLoad() {
    const isLogin = wx.getStorageSync('isLogin')
    this.setData({
      isLogin
    });
    if (!app.globalData.isLogin) {
      wx.showToast({
        title: '未登录',
        icon: 'none',
        duration: 1500
      });
      return;
    }
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    });
    this.updatePercents();
  },

  onShow() {
    const isLogin = wx.getStorageSync('isLogin') === true;
    if (isLogin !== this.data.isLogin) {
      this.setData({
        isLogin
      });
      if (isLogin) {
        this.setData({
          userInfo: wx.getStorageSync('userInfo')
        });
        this.updatePercents();
      }
    }
  },

  updatePercents() {
    const {
      progress,
      progressMax,
      taskDone,
      taskTotal
    } = this.data;
    const progressPercent = Math.min(100, Math.round((progress / progressMax) * 100));
    const taskPercent = Math.min(100, Math.round((taskDone / taskTotal) * 100));
    this.setData({
      progressPercent,
      taskPercent
    });
  },

  onAuthorizeTap() {
    wx.navigateTo({
      url: '/pages/login/login'
    });
  },

  onTodoTap() {
    wx.showToast({
      title: '暂未开发',
      icon: 'none'
    });
  },

  onOrderTap() {
    wx.navigateTo({
      url: '/pages/cart/cart',
    })
  }
});