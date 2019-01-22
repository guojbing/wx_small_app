import BookModel from '../../models/book'
import ClassicModel from '../../models/classic'
const bookModel = new BookModel()
const classicModel = new ClassicModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false, //用户是否授权
    userInfo: null, //用户授权后获取的用户信息
    bookCount: 0, //用户喜欢的书籍数
    classics: null, //用户所有喜欢的期刊的数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthorized()
    this.getLikeBookCount()
    this.getLikeClaccicInfo()
  },

  /**
   * 获取用户所有喜欢的期刊的数据
   */
  getLikeClaccicInfo() {
    classicModel.getMyFavor(ret => {
      this.setData({
        classics: ret
      })
    })
  },

  /**
   * @desc 获取用户授权信息
   */
  userAuthorized() {
    wx.getSetting({ //wx.getSetting() 可以获取用户当前的授权状态
      success: data => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              this.setData({
                userInfo: data.userInfo,
                authorized: true,
              })
            }
          })
        }
      }
    })
  },

  /**
   * @desc 获取用户喜欢的书籍的数量
   */
  getLikeBookCount() {
    bookModel.getLikeBookCount()
      .then(ret => {
        this.setData({
          bookCount: ret.count
        })
      })
  },

  onGetUserInfo(e) {
    const userInfo = e.detail.userInfo
    if (userInfo) {
      this.setData({
        authorized: true,
        userInfo,
      })
    }
  },

  onJumpToDetail(e) {
    const cid = e.detail.cid
    const type = e.detail.type
    wx.navigateTo({
      url: `/pages/classic-detail/classic-detail?cid=${cid}&type=${type}`
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})