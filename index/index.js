// clock/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canvas: {
      w: 400,
      h: 400,
    },
    x: 0,
    y: 0,
    r: 0,
    fontsize: 14,
    s: null,
    m: null,
    h: null,
    day: null,
    mon: null,
    year: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.createSelectorQuery()
    .select('#canvas')
    .fields({
      node: true,
      size: true,
    })
    .exec(this.init.bind(this))
  },
  init(res) {
    const canvas = res[0].node
    const ctx = canvas.getContext('2d')
    const dpr = wx.getWindowInfo().pixelRatio
    canvas.width = this.data.canvas.w * dpr
    canvas.height = this.data.canvas.h * dpr
    this.x = this.data.canvas.w / 2
    this.y = this.data.canvas.h / 2
    this.r = this.data.canvas.w / 2 * 0.8
    ctx.scale(dpr, dpr)
    ctx.translate(this.x, this.y)

    const renderLoop = () => {
      this.render(ctx)
      canvas.requestAnimationFrame(renderLoop)
    }
    canvas.requestAnimationFrame(renderLoop)
  },

  render(ctx) {
    let tm = new Date()
    if (this.s !== tm.getSeconds()) {
      console.log(tm.toLocaleTimeString())
      this.s = tm.getSeconds()
      this.m = tm.getMinutes()
      this.h = tm.getHours()
      this.day = tm.getDate()
      this.mon = tm.getMonth() + 1
      this.year = tm.getFullYear()

      this.clearCanvas(ctx)

      this.drawPlate(ctx) //画表盘
      this.drawSecondHand(ctx)
      this.drawMinuteHand(ctx)
      this.drawHourHand(ctx)

      ctx.beginPath()
      ctx.arc(0, 0, 5, 0, Math.PI * 2)
      ctx.fillStyle = 'green'
      ctx.fill()
    }
  },

  //清空画布
  clearCanvas(ctx) {
    ctx.translate(-this.x, -this.y)
    ctx.clearRect(0, 0, this.data.canvas.w, this.data.canvas.h)
    ctx.translate(this.x, this.y)
  },

  drawPlate(ctx, color) {
    ctx.beginPath()
    ctx.arc(0, 0, this.r, 0, Math.PI * 2)
    ctx.fillStyle = "black"
    ctx.strokeStyle = 'black'
    // ctx.fill()
    ctx.stroke()
    ctx.closePath()
    
    // ctx.beginPath()
    // ctx.arc(0, 0, this.r - 5, 0, Math.PI * 2)
    // ctx.fillStyle = "white"
    // ctx.strokeStyle = 'white'
    // ctx.fill()
    // ctx.stroke()
    // ctx.closePath()

    //画秒刻度
    ctx.restore()
    for (let i = 0; i < 300; i ++) {
      ctx.fillStyle = 'gray'
      ctx.fillRect(this.r - 6, -0.3, 5, 0.6)
      ctx.rotate(Math.PI / 150)
    }

    //画分刻度
    ctx.restore()
    for (let i = 0; i < 60; i ++) {
      ctx.fillStyle = 'gray'
      ctx.fillRect(this.r - 11, -1, 10, 2)
      ctx.rotate(Math.PI / 30)
    }

    //画时刻度
    ctx.restore()
    let radia = 0
    for (let i = 1; i <= 12; i ++) {
      //画刻度
      radia = Math.PI / 6 * (i - 3)
      ctx.rotate(radia)
      ctx.fillStyle = 'black'
      ctx.fillRect(this.r - 21, -2, 20, 4)
      ctx.rotate(-radia)

      //画文字
      let x = Math.cos((i - 3) * 30 *  Math.PI / 180) * (this.r - 40) 
      let y = Math.sin((i - 3) * 30 *  Math.PI / 180 ) * (this.r - 40)
      ctx.font="10px"
      ctx.textAlign="center"
      ctx.strokeText(i, x, y + 3, 10)
    }

    //写日期
    let txt = this.mon + '月' + this.day + '日'
    radia = 90 * Math.PI / 180
    ctx.fillStyle="gray"
    ctx.strokeText(txt, 0, -40, 40)
  },

  drawSecondHand(ctx) {
    let radia = (this.s * 6 - 90) * Math.PI / 180
    ctx.rotate(radia)
    ctx.fillStyle = 'green'
    ctx.fillRect(0, -1, this.r * 0.8, 2)
    ctx.rotate(-radia)
  },
  drawMinuteHand(ctx) {
    let radia = ((this.m * 60 + this.s) * 0.1 - 90) * Math.PI / 180
    ctx.rotate(radia)
    ctx.fillStyle = 'green'
    ctx.fillRect(0, -1.5, this.r * 0.6, 3)
    ctx.rotate(-radia)
  },
  drawHourHand(ctx) {
    let radia = ((this.h * 3600 + this.m * 60 + this.s) * 360/43200 - 90) * Math.PI / 180
    ctx.rotate(radia)
    ctx.fillStyle = 'green'
    ctx.fillRect(0, -2.5, this.r * 0.3, 5)
    ctx.rotate(-radia)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})