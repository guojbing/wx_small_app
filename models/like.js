import HTTP from '../util/http'

class LikeModel extends HTTP {

    //点赞操作
    like(behavior, artID, category) {
        let url = behavior == 'like' ? 'like' : 'like/cancel'
        this.request({
            url,
            method: 'POST',
            data: {
                art_id: artID,
                type: category
            }
        })
    }

    /**
     * 获取点赞的状态和点赞数
     * @param {Int} artID      
     * @param {Int} category   
     * @param {Function} callback 
     */
    getLikeStatusAndCount(artID, category, callback) {
        this.request({
            url: `classic/${category}/${artID}/favor`,
            success: (ret) => {
                callback(ret)
            }
        })
    }
}

export default LikeModel