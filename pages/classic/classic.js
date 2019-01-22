// pages/classic/classic.js
import ClassicModel from '../..//models/classic'
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
    classicModel.getLatest(data => {
      this.setData({
        classicData: data,
        likeStatus: data.like_status,
        likeCount: data.fav_nums
      })
    })

  },

  //监听Like组件事件
  onLike: function (event) {
    let behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classicData.id, this.data.classicData.type)
  },

  //监听navi组件的自定义事件(left和right)
  onNext: function (event) {
    this._updateClassicData('next')
  },
  onPrevious: function (event) {
    this._updateClassicData('previous')
  },

  //封装私有函数,用于从服务器获取数据,然后更新data字段里面的数据
  _updateClassicData(nextOrPrevious) {
    classicModel.getClassicData(this.data.classicData.index, nextOrPrevious, (ret) => {
      this._getLikeStatusAndCount(ret.id, ret.type, (likeData) => {
        this.setData({
          classicData: ret,
          latest: classicModel.isLatest(ret.index),
          first: classicModel.isFirst(ret.index),
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