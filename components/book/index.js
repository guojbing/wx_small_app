// components/book/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book: {
      type: Object
    },
    showLike: String //控制是否显示右下角喜欢数据
  },

  /**
   * 组件的初始数据
   */
  data: {
    flag: true
  },

  attached() {
    if (this.properties.showLike == 'false') {
      this.setData({
        flag: false
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

    /**
     * 转到书籍详情页
     */
    toBookDetail() {
      const bID = this.properties.book.id
      wx.navigateTo({
        url: `/pages/book-detail/book-detail?bID=${bID}`
      })
    }

  }

})