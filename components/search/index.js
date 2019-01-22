import SearchModel from '../../models/search'
import BookModel from '../../models/book'
const searchModel = new SearchModel()
const bookModel = new BookModel()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    noneResult: false, //判定是否有搜索到数据,以此来控制'没有搜索到书籍'文本的显示
    searching: false, //控制是否展示 真实搜索框
    hotSearch: [],
    historySearch: [],
    booksData: [],
    keyword: '',
    isLoading: true, //控制是否可以继续向服务器发送请求数据报文 ,true 可以,false 不可以
  },

  /**
   * 组件的生命周期函数
   */
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
      searchModel.getHotSearch().then(ret => {
        this.setData({
          historySearch: searchModel.getHistorySearch(),
          hotSearch: ret.hot,
        })
      })
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //页面触底时触发这个函数,加载更多数据
    loadMore() {
      if (!this.data.keyword) {
        return
      }
      if (!this.data.isLoading) { //锁🔒 根据这个isLoadind的值判定是否可以继续向服务器发送请求加载数据.
        return
      }
      wx.showLoading()
      const length = this.data.booksData.length
      bookModel.searchBook({
        start: length,
        q: this.data.keyword,
        summary: 1 //0详细版, 1精简版
      }).then(ret => {
        //判断是否有搜到数据
        if (ret.count > 0) {
          this.setData({
            booksData: this.data.booksData.concat(ret.books)
          })
          if (this.data.booksData.length >= ret.total) {
            this.data.isLoading = false //当booksData.length长度超过了服务器发回来的ret.total时,说明服务器已经没有数据可加载了,此时需要将锁🔒关闭,使得用户继续触发页面触底事件时不会向服务器发送无效请求.
          }
        }
        wx.hideLoading()
      })
    },
    onCancel(e) {
      this.triggerEvent('cancelSearch', {}, {})
    },

    onConfirm(e) {

      const keyword = (e.detail.value || e.detail.content).trim() //加trim()方法的目的是删除keyword首尾空格
      if (!keyword) {
        return
      }

      //显示加载数据loading
      wx.showLoading()

      this.setData({
        noneResult: false, //搜索数据之前,需要将'没有搜索到书籍'的文本提示消除掉
        searching: true,
        keyword
      })

      //根据keyword向服务器发送搜索请求,获取数据
      bookModel.searchBook({
        q: keyword,
        summary: 1 //0详细版, 1精简版
      }).then(ret => {
        wx.hideLoading()
        //判断是否有搜到数据
        if (ret.count > 0) {
          this.setData({
            booksData: ret.books
          })

          //更新search组件上的 历史搜索 记录
          const index = this.data.historySearch.indexOf(keyword)
          if (index == -1) {
            this.data.historySearch.unshift(keyword)
            this.setData({
              historySearch: this.data.historySearch
            })
          } else if (index > 0) {
            //将已经存在的元素切割出来 ,然后将切割出来的元素(以Array形式存放)和原来被切割后的数组 拼接起来
            const newArr = this.data.historySearch.splice(index, 1).concat(this.data.historySearch)
            this.setData({
              historySearch: newArr
            })
          }

          //将此次搜索用到的keyword保存到缓存中
          searchModel.saveToStorage(keyword)
        } else {
          this.setData({
            noneResult: true
          })
          // wx.showToast({
          //   title: '没有查询到数据',
          //   image: '/components/search/images/no.png'
          // })
        }
      })


    },
    onDelete(e) {
      //初始化真实搜索框页面
      this.setData({
        noneResult: false, //没有搜索到书籍的提示框隐藏起来
        keyword: '',
        booksData: [],
        searching: false,
        isLoading: true, //当取消当前搜索时,需要将锁打开.
      })
    },
  }
})