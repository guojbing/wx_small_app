import HTTP from '../util/http-promise'

class BookModel extends HTTP {

    /**
     * @desc 根据传入的q的值搜索书籍内容
     * @param {Object} Object {q,start=0,summary=0,count=20}
     * @returns {Promise} Promise对象
     */
    searchBook({
        q,
        start = 0,
        summary = 0,
        count = 20
    }) {
        return this.request({
            url: `book/search`,
            data: {
                q,
                start,
                count,
                summary
            }
        })
    }

    /**
     * @desc 获取用户喜欢的书籍的数量
     */
    getLikeBookCount() {
        return this.request({
            url: '/book/favor/count'
        })
    }

    /**
     * @desc 获取所有的热门书籍简要信息
     * @returns {Promise}  返回一个封装有异步请求数据操作的Promise对象
     */
    getHotBook() {
        return this.request({
            url: 'book/hot_list'
        })
    }

    /**
     * @desc 获取对应id值的书籍的详细信息
     * @param {Number} bID 书籍的id值
     * @returns { Promise}  返回一个封装有异步请求数据操作的Promise对象
     */
    getBookDetail(bID) {
        return this.request({
            url: `book/${bID}/detail`
        })
    }

    /**
     * @desc 获取对应id值的书籍的点赞信息
     * @param {Number} bID 书籍的id值
     * @returns { Promise}  返回一个封装有异步请求数据操作的Promise对象
     */
    getBookLikeInfo(bID) {
        return this.request({
            url: `book/${bID}/favor`
        })
    }

    /**
     * @desc 获取对应id值的书籍的书评信息
     * @param {Number} bID 书籍的id值
     * @returns { Promise}  返回一个封装有异步请求数据操作的Promise对象
     */
    getComments(bID) {
        return this.request({
            url: `book/${bID}/short_comment`
        })
    }

    /**
     * @desc 根据id发送新的评论到服务器,
     * @param {Number} bID 
     * @param {String} content 
     */
    postComments(bID, content) {
        return this.request({
            url: `book/add/short_comment`,
            method: 'POST',
            data: {
                book_id: bID,
                content
            }
        })
    }

}

export default BookModel