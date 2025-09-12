// pages/order/order.js
const app = getApp();

Page({
  data: {
    orders: []
  },

  onLoad() {
    if (!app.globalData.isLogin) {
      wx.showToast({
        title: '未登录',
        icon: 'none',
        duration: 1500
      });
      return; // 结束当前函数
    }

    // 模拟数据，可替换为后端接口返回
    const mock = [
      {
        id: 'o1',
        store: '安师大花津校区店(NO.A5647)',
        status: '已完成',
        time: '2024-09-11 13:42',
        amount: '11.02',
        items: [
          {
            pic: '/assets/drinks/mocha.png', // 请在项目中放置占位图
            name: '摩卡',
            spec: '默认奶油 / 少少甜 / 大 / 冰 / 燕麦奶',
            qty: 1
          }
        ],
        showAll: true
      },
      {
        id: 'o2',
        store: '安师大花津校区店(NO.A5647)',
        status: '已完成',
        time: '2024-09-01 14:56',
        amount: '15.92',
        items: [
          { pic: '/assets/food/cookie.png', name: '巧克力味曲奇', spec: '', qty: 1 },
          { pic: '/assets/drinks/matcha.png', name: '抹茶好喝椰', spec: '冰 / 不另外加糖', qty: 1 }
        ],
        showAll: true
      },
      {
        id: 'o3',
        store: '安师大花津校区店(NO.A5647)',
        status: '已完成',
        time: '2024-08-28 16:12',
        amount: '13.50',
        items: [
          { pic: '/assets/drinks/matcha-latte.png', name: '抹茶拿铁', spec: '无奶油 / 冰 / 少少甜 / 燕麦奶', qty: 1 }
        ],
        showAll: true
      }
    ].map(o => ({
      ...o,
      totalCount: o.items.reduce((s, g) => s + Number(g.qty || 0), 0)
    }));

    this.setData({ orders: mock });
  },

  // 展开/收起“更多”
  onToggleMore(e) {
    const id = e.currentTarget.dataset.id;
    const list = this.data.orders.map(o =>
      o.id === id ? { ...o, showAll: !o.showAll } : o
    );
    this.setData({ orders: list });
  },

  // 再来一单（示例：跳到点单页并携带上次商品）
  onReorder(e) {
    const id = e.currentTarget.dataset.id;
    const order = this.data.orders.find(o => o.id === id);
    // 根据你的项目路由修改为实际点单页路径，并把商品参数带过去
    const payload = encodeURIComponent(JSON.stringify(order.items));
    wx.navigateTo({
      url: `/pages/menu/menu?reorder=${payload}`
    });
  },

  // 下拉刷新（如需联调后端）
  onPullDownRefresh() {
    // 这里调用接口刷新数据
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 500);
  }
});
