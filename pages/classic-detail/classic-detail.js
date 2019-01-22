// pages/classic/classic.js
import ClassicModel from '../../models/classic'
import LikeModel from '../../models/like'

let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData: '',
    classicData: null,
    first: false,
    latest: true,
    likeStatus: 0,
    likeCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const cid = options.cid
    const type = options.type
    this._updateClassicData(cid, type)
  },

  //监听Like组件事件
  onLike: function (event) {
    let behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classicData.id, this.data.classicData.type)
  },



  //封装私有函数,用于从服务器获取数据,然后更新data字段里面的数据
  _updateClassicData(cid, type) {
    classicModel.getClassicById(cid, type, ret => {
      this._getLikeStatusAndCount(ret.id, ret.type, (likeData) => {
        this.setData({
          classicData: ret,
          likeStatus: likeData.like_status,
          likeCount: likeData.fav_nums
        })
      })
    })
  },


  _getLikeStatusAndCount(artID, category, callback) {
    likeModel.getLikeStatusAndCount(artID, category, (ret) => {
      callback(ret)
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