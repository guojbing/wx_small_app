import HTTP from '../util/http'

class ClassicModel extends HTTP {

    /**
     * 初始化页面
     * @param {Function} callback 
     */
    getLatest(callback) {
        this.request({
            url: 'classic/latest',
            success: (ret) => {
                callback(ret)
                this._setLatestIndex(ret.index)
                this._saveClassicData(ret) //将数据缓存起来
            }
        })
    }

    /**
     * @desc 获取用户喜欢的期刊信息
     * @param {Function} success 回调函数
     */
    getMyFavor(success) {
        const params = {
            url: 'classic/favor',
            success: success
        }
        this.request(params)
    }

    /**
     * @desc 获取指定id和type的期刊数据
     * @param {Number} id 期刊的id
     * @param {Number} type 期刊的类型号 100 200 300 
     * @param {Function} callback 获取数据的回调函数
     */
    getClassicById(id, type, callback) {
        this.request({
            url: `classic/${type}/${id}`,
            success: (ret) => {
                callback(ret)
            }
        })
    }

    /**
     * @desc  获取对应的期刊数据
     * @param {Number} index 参照期刊号
     * @param {String} nextOrPrevious 取值 'next' or 'previous'
     * @param {Function} callback 获取数据后的回调函数
     */
    getClassicData(index, nextOrPrevious, callback) {
        /**
         * 1、在获取数据前, 优先查看缓存中是否有当前期刊的数据;
         * 如果有, 从缓存中读取; (封装了一个函数,接收一个index ,返回从storage中查询到的结果,'' or '数据')
         * 如果没有的话, 再向服务器发送请求,同时将从服务器获取到的数据缓存起来。
         * 2、 这个函数传入的index是参照期刊的index;
         * 需要获取期刊的index值要根据传入的nextOrPrevious的值 +1或者-1
         *  */
        let currentIndex = nextOrPrevious == 'next' ? (index + 1) : (index - 1)
        let classicData = this._isExistClassicData(currentIndex) //从缓存中查询数据

        if (classicData) {
            callback(classicData)
        } else {
            this.request({
                url: `classic/${index}/${nextOrPrevious}`,
                success: (ret) => {
                    this._saveClassicData(ret) //将数据缓存起来
                    callback(ret)
                }
            })
        }

    }

    //判断是否为第一期
    isFirst(index) {
        return index == 1 ? true : false
    }

    //判断是否为最新一期
    isLatest(index) {
        let latestIndex = this._getLatestIndex()
        return index == latestIndex ? true : false
    }

    /**
     * 将获取到的最新一期的index的值, 缓存到storage中
     */
    _setLatestIndex(index) {
        wx.setStorageSync('latestIndex', index)
    }

    /**
     * 从缓存中取出最新一期的index的值
     */
    _getLatestIndex() {
        let latestIndex = wx.getStorageSync('latestIndex')
        return latestIndex
    }

    /**
     * 根据传入的期刊号, 生成需要缓存的期刊数据在storage中的key值
     * @param {Number} index 
     * 目前这个方法未使用.
     */
    _getKey(index) {
        return `classic-${index}`
    }

    /**
     * 根据传入的index值从缓存中查数据
     * return '' or '数据'
     * @param {Number} index 
     */
    _isExistClassicData(index) {
        let key = `classic-${index}` //根据传入的index值生成一个缓存key
        let classicData = wx.getStorageSync(key) //根据key从缓存中查数据
        return classicData
    }

    /**
     * 缓存数据
     * @param {Object} ret 数据对象
     */
    _saveClassicData(ret) {
        let key = `classic-${ret.index}`
        wx.setStorageSync(key, ret)
    }

}

export default ClassicModel