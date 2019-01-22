// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: {
      type: Boolean
    },
    count: {
      type: Number
    },
    readOnly: {
      type: Boolean
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesImg: 'images/like.png',
    noImg: 'images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike: function (event) {
      if (this.properties.readOnly) {
        return
      }
      let like = this.properties.like
      let count = this.properties.count
      count = like ? count - 1 : count + 1
      this.setData({
        like: !like,
        count
      })

      //获取组件的状态,如果like为true ,组件为'点击喜欢',否则为'取消喜欢'
      let behavior = this.properties.like ? 'like' : 'cancel'
      //激活组件自定义事件
      this.triggerEvent('like', {
        behavior
      }, {})
    }
  }
})