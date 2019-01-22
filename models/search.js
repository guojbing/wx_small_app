import HTTP from '../util/http-promise'
class Search extends HTTP {

    key = 'historySearch'
    maxLength = 10

    /**
     * @returns {Promise} Promise对象
     * @desc 获取热搜关键字
     */
    getHotSearch() {
        return this.request({
            url: `book/hot_keyword`
        })
    }

    /**
     * @returns {Array} Array 历史搜索数据
     * @desc 从缓存中读取历史搜索记录
     */
    getHistorySearch() {
        const arr = wx.getStorageSync(this.key)
        if (!arr) {
            return []
        }
        return arr
    }

    saveToStorage(keyword) {
        let arr = this.getHistorySearch()
        const flag = arr.includes(keyword)
        if (!flag) {    //如果flag为false ,表示没有,需要存入缓存
            if (arr.length >= this.maxLength) { //如果数组长度>=10,应该删除数组的最后一个值
                arr.pop()
            }
            arr.unshift(keyword)
            wx.setStorageSync(this.key, arr)
        }
    }

}

export default Search