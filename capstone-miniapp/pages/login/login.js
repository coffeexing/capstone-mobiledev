// pages/login/login.js
const app = getApp();

Page({
  data: {
    account: "",
    password: "",
    showPwd: false,
    agreed: false,
    canSubmit: false,
    submitting: false
  },

  onLoad() {
    const lastAcc = wx.getStorageSync('lastAccount') || '';
    const agreed = !!wx.getStorageSync('agreedProtocol');
    this.setData({ account: lastAcc, agreed }, this.computeCanSubmit);
  },

  onInputAccount(e) {
    this.setData({ account: e.detail.value.trim() }, this.computeCanSubmit);
  },
  onInputPassword(e) {
    this.setData({ password: e.detail.value }, this.computeCanSubmit);
  },
  togglePwd() {
    this.setData({ showPwd: !this.data.showPwd });
  },

  onAgreeChange(e) {
    const agreed = (e.detail.value || []).includes('agree');
    this.setData({ agreed }, this.computeCanSubmit);
    wx.setStorageSync('agreedProtocol', agreed);
  },

  computeCanSubmit() {
    const { account, password, agreed } = this.data;
    const isPhone = /^1\d{10}$/.test(account);
    const isUser = account.length >= 4; // 用户名兜底
    const passOk = password.length >= 6;
    const canSubmit = (isPhone || isUser) && passOk && agreed;
    this.setData({ canSubmit });
  },

  onSubmit() {
    if (!this.data.canSubmit || this.data.submitting) return;
    this.setData({ submitting: true });

    // TODO: 调用后端账号密码登录接口
    // wx.request({ url:'/login', method:'POST', data:{ account, password }, success:..., fail:... })
    // Demo：模拟成功
    setTimeout(() => {
      const masked = this.maskAccount(this.data.account);

      // 全局 & 本地持久化
      app.globalData.isLogin = true;
      app.globalData.maskedPhone = masked;
      app.globalData.vipLevel = app.globalData.vipLevel || '普通会员';

      wx.setStorageSync('isLogin', true);
      wx.setStorageSync('lastAccount', this.data.account);
      wx.setStorageSync('maskedPhone', masked);

      wx.showToast({ title: '登录成功', icon: 'success', duration: 900 });
      setTimeout(() => wx.navigateBack({ delta: 1 }), 900);

      this.setData({ submitting: false });
    }, 600);
  },

  maskAccount(acc) {
    if (/^1\d{10}$/.test(acc)) return acc.slice(0,3) + '******' + acc.slice(-2);
    if (acc.length <= 2) return acc + '**';
    return acc.slice(0,2) + '****';
  }
});

