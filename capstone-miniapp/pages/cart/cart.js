// pages/cart/cart.js
Page({
  data: {
    currentCategory: 1,
    categories: [
      { id: 1, name: '冬季养生' },
      { id: 2, name: '缤纷果茶' },
      { id: 3, name: '冰凉一夏' }
    ],
    products: {
      1: [
        { id: 101, name: '乌龙茶', price: '5.00', image: '/assets/goods/tea/1.jpg', detail: '这个乌龙茶很好喝！', quantity: 0 },
        { id: 102, name: '龙井茶', price: '7.00', image: '/assets/goods/tea/2.jpg', detail: '这个龙井茶很好喝！', quantity: 0 },
        { id: 103, name: '普洱茶', price: '9.00', image: '/assets/goods/tea/3.jpg', detail: '这个普洱茶很好喝！', quantity: 0 }
      ],
      2: [
        { id: 201, name: '奶茶', price: '8.00', image: '/assets/goods/fruit/1.jpg', detail: '这个奶茶很好喝！', quantity: 0 },
        { id: 202, name: '奶盖', price: '15.00', image: '/assets/goods/fruit/2.jpg', detail: '这个奶盖很划算！', quantity: 0 }
      ],
      3: [
        { id: 301, name: '饮品1', price: '15.00', image: '/assets/goods/ice/1.jpg', detail: '这个饮品1很好喝！', quantity: 0 },
        { id: 302, name: '饮品2', price: '25.00', image: '/assets/goods/ice/2.jpg', detail: '这个饮品2很划算！', quantity: 0 },
        { id: 303, name: '饮品3', price: '35.00', image: '/assets/goods/ice/3.jpg', detail: '这个饮品3很好喝！', quantity: 0 },
        { id: 304, name: '饮品4', price: '18.00', image: '/assets/goods/ice/4.jpg', detail: '这个饮品4很划算！', quantity: 0 },
      ]
    },
    currentProducts: [],
    cart: {},
    cartTotalAmount: '0.0',
    cartTotalQuantity: 0,
    cartItems: [],
    showCartModal: false
  },

  onLoad() {
    const id = this.data.currentCategory;
    this.setData({
      currentProducts: this.data.products[id] || []
    });
  },

  switchCategory(e) {
    const id = e.currentTarget.dataset.id;
    this.setData({
      currentCategory: id,
      currentProducts: this.data.products[id] || []
    });
  },

  increaseQuantity(e) {
    const productId = e.currentTarget.dataset.id;
    this.updateQuantity(productId, 1);
  },

  decreaseQuantity(e) {
    const productId = e.currentTarget.dataset.id;
    this.updateQuantity(productId, -1);
  },

  updateQuantity(productId, change) {
    const products = JSON.parse(JSON.stringify(this.data.products));
    const cart = JSON.parse(JSON.stringify(this.data.cart));
    let targetProduct = null;
    let categoryId = null;
    let productIndex = -1;
    for (let catId in products) {
      const index = products[catId].findIndex(item => item.id === productId);
      if (index !== -1) {
        targetProduct = products[catId][index];
        categoryId = catId;
        productIndex = index;
        break;
      }
    }
    if (!targetProduct) 
      return;
    const newQuantity = (targetProduct.quantity || 0) + change;
    if (newQuantity < 0) 
      return;
    products[categoryId][productIndex].quantity = newQuantity;
    if (newQuantity > 0) {
      cart[productId] = {
        ...targetProduct,
        quantity: newQuantity
      };
    } else {
      delete cart[productId];
    }
    this.setData({
      products: products,
      currentProducts: products[this.data.currentCategory],
      cart: cart
    });
    this.updateCartDisplay();
  },

  updateCartDisplay() {
    const cart = this.data.cart;
    let totalAmount = 0;
    let totalQuantity = 0;
    const cartItems = [];
    Object.values(cart).forEach(item => {
      totalAmount += parseFloat(item.price) * item.quantity;
      totalQuantity += item.quantity;
      cartItems.push(item);
    });
    this.setData({
      cartTotalAmount: totalAmount.toFixed(1),
      cartTotalQuantity: totalQuantity,
      cartItems: cartItems
    });
    if (totalQuantity === 0 && this.data.showCartModal) {
      this.setData({
        showCartModal: false
      });
    }
  },

  toggleCartModal() {
    this.setData({
      showCartModal: !this.data.showCartModal
    });
  },

  hideCartModal() {
    this.setData({
      showCartModal: false
    });
  },

  clearCart() {
    const products = JSON.parse(JSON.stringify(this.data.products));
    for (let catId in products) {
      products[catId].forEach(product => {
        product.quantity = 0;
      });
    }
    this.setData({
      products: products,
      currentProducts: products[this.data.currentCategory],
      cart: {},
      cartTotalAmount: '0.0',
      cartTotalQuantity: 0,
      cartItems: [],
      showCartModal: false
    });
  }
});