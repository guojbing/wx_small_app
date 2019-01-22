import httpConfig from '../config'

const tips = {
    1: '抱歉，出现了一个错误',
    1005: 'appkey无效，请前往www.7yue.pro申请',
    3000: '期刊不存在'
}

class HTTP {

    /**
     * 封装一个request方法, 用于向服务器发送请求(需要传递一个对象, 包含url、 data)
     * @param {url、[method]、[data]、success回调函数} params 
     */
    request(params) {
        if (!params.method) {
            params.method = 'GET'
        }
        wx.request({
            url: httpConfig.api_base_url + params.url,
            method: params.method,
            data: params.data,
            header: {
                'content-type': 'application/json',
                appkey: httpConfig.appkey
            },
            success: ret => {
                let statusCode = ret.statusCode.toString()
                if (statusCode.startsWith('2')) {
                    params.success && params.success(ret.data)
                } else {
                    let error_code = ret.data.error_code
                    this._show_error(error_code)
                }
            },
            fail: err => {
                this._show_error(1)
            }
        })
    }

    //私有的错误服务器没有响应正常数据的方法,根据服务器反馈回来的data中的error_code码来判断具体的错误信息
    _show_error(error_code) {
        if (!error_code) {
            error_code = 1
        }
        wx.showToast({
            title: tips[error_code] ? tips[error_code] : tips[1],
            icon: 'none',
            duration: 2000
        })
    }
}

export default HTTP