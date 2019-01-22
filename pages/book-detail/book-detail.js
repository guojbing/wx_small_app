import BookModel from '../../models/book'
import LikeModel from '../../models/like'
const bookModel = new BookModel()
const likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    posting: false,
    book: {},
    comments: [],
    likeStatus: false,
    likeCount: 0,
    flag: false, //是否显示 '无评论' 提示信息.
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.showLoading() //显示加载数据loading

    const bID = options.bID
    const book = bookModel.getBookDetail(bID)
    const bookLikeInfo = bookModel.getBookLikeInfo(bID)
    const comments = bookModel.getComments(bID)

    Promise.all([book, bookLikeInfo, comments])
      .then(ret => {
        this.setData({
          book: ret[0],
          likeStatus: ret[1].like_status,
          likeCount: ret[1].fav_nums,
          flag: ret[2].comments.length == 0, //默认应该是不显示 '没有短评信息' 这个text标签,只有当comments数据请求回来后,判断确实没有评论数据,再让 '没有短评信息' 这个text标签显示出来
          comments: ret[2].comments
        })
        wx.hideLoading() //隐藏数据加载的Loading图标
      })
  },

  onLike(event) {
    const behavior = event.detail.behavior
    likeModel.like(behavior, this.data.book.id, 400)

    //根据子组件的状态,实时更新组件的显示数据
    this.setData({
      likeStatus: behavior == 'like' && true,
      likeCount: behavior == 'like' ? (this.data.likeCount + 1) : (this.data.likeCount - 1)
    })
  },

  onShowPostContainer() {
    this.setData({
      posting: true
    })
  },

  onPostComment(event) {
    const content = event.detail.content || event.detail.value

    if (content.length > 12) {
      wx.showToast({
        title: '评论字数应该少于12个',
        icon: 'none'
      })
      return
    }

    if (!content) {
      wx.showToast({
        title: '评论内容不能为空',
        icon: 'none'
      })
      return
    }

    bookModel.postComments(this.data.book.id, content)
      .then(ret => {
        wx.showToast({
          title: '评论发表成功',
          icon: 'none'
        })

        const comment = {
          content,
          nums: 1
        }
        this.data.comments.unshift(comment)

        this.setData({
          comments: this.data.comments,
          posting: false
        })
      })

  },

  onCancel() {
    this.setData({
      posting: false
    })
  },

  //监听子组件的自定义事件 cancelShow ,该自定义事件触发时 onCancelShow 函数执行
  onCancelShow(event) {
    this.setData({
      posting: false
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