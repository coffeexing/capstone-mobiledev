// pages/profile/profile.js
const app = getApp();

Page({
  data: {
    avatar: '',
    nickname: '',
    vipLevel: '',
    services: [],
    // 新增：统计展示字段
    coinsDisplay: '0',
    coinsUnit: '',
    couponsDisplay: '0',
    giftDisplay: '0'
  },

  onLoad() {
    const g = app.globalData || {};
    // 顶部信息：优先从全局拿；没有就兜底
    this.setData({
      avatar: g.avatar || (g.userInfo && g.userInfo.avatarUrl) || '',
      nickname: g.nickname || (g.userInfo && g.userInfo.nickName) || '',
      vipLevel: g.vipLevel || '普通会员'
    });

    // 统计：从全局拿（没有则兜底 0）
    const g = app.globalData || {};
    const coins = Number(g.coins || 0);
    const coupons = Number(g.coupons || 0);
    const gift = Number(g.giftAmount || 0); // 若没有礼品卡字段，默认 0

    const c1 = this.formatWan(coins); // { val, unit }
    const c2 = this.formatInt(coupons); // "42"
    const c3 = this.formatInt(gift); // "0"（元）

    this.setData({
      coinsDisplay: c1.val,
      coinsUnit: c1.unit, // 显示 “25.2 / 万”
      couponsDisplay: c2,
      giftDisplay: c3
    });

    // 常用功能：从全局 services 读取；没有就用默认
    const fromGlobal = Array.isArray(g.services) && g.services.length ? g.services : null;
    this.setData({
      services: fromGlobal || this.defaultServices()
    });
  },

  // 兜底的常用功能（如果你已把 home 的 service 放到 app.globalData.services，这里不会用到）
  defaultServices() {
    return [{
        name: '会员中心',
        icon: '/assets/services/membership.png'
      },
      {
        name: '我的余额',
        icon: '/assets/services/balance.png'
      },
      {
        name: '我的推广',
        icon: '/assets/services/promotion.png'
      },
      {
        name: '联系客服',
        icon: '/assets/services/contact.png'
      }
    ];
  },

  onServiceTap(e) {
    const item = e.currentTarget.dataset.item || {};
    if (item.url) {
      wx.navigateTo({
        url: item.url
      });
    } else {
      wx.showToast({
        title: '功能开发中',
        icon: 'none'
      });
    }
  },

  // formatWan(n) {
  //   // >= 10000 显示成 “x.x 万”
  //   if (n >= 10000) return { val: (n/10000).toFixed(1), unit: '万' };
  //   return { val: String(n), unit: '' };
  // },
  // formatInt(n) {
  //   return String(Math.floor(Number(n) || 0));
  // },  

  onOpenPlus() {
    wx.showToast({
      title: '开通入口示例',
      icon: 'none'
    });
    // TODO: 跳转到你“大神卡”详情页
    // wx.navigateTo({ url: '/pages/plus/plus' });
  },

  onLogout() {
    wx.showModal({
      title: '确认退出',
      content: '退出后将清空本地登录状态',
      confirmText: '退出',
      confirmColor: '#E53935',
      success: (res) => {
        if (res.confirm) {
          try {
            // 清全局 + 本地
            app.globalData.isLogin = false;
            app.globalData.maskedPhone = '';
            // 如果你在 globalData 里还有 token/userInfo，也一起清
            app.globalData.userInfo = null;

            wx.removeStorageSync('isLogin');
            wx.removeStorageSync('maskedPhone');

            wx.showToast({
              title: '已退出',
              icon: 'none'
            });
            setTimeout(() => {
              // 回登录页或首页
              wx.navigateTo({
                url: '/pages/login/login'
              });
            }, 500);
          } catch (err) {
            wx.showToast({
              title: '退出失败',
              icon: 'none'
            });
          }
        }
      }
    });
  }
});