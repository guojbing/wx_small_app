import classicBeh from '../classic-behavior'

const BackgroundAM = wx.getBackgroundAudioManager()

Component({

  /**
   * 组件之间共用的behavior
   */
  behaviors: [classicBeh],

  /**
   * 组件的属性列表
   */
  properties: {
    audioSrc: String,
    audioName: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playStatus: false,
    playSrc: 'images/player@play.png',
    pauseSrc: 'images/player@pause.png'
  },

  attached() {
    //切换新的期刊,重新加载music组件前,需要判断现在BackgroundAM是否在播放,BackgroundAM的src和当前期刊的src是否一致
    this._isPlay() //修正当前期刊的播放状态图片and当前期刊音乐背景图片旋转状态
    this._watchBackgroundAM() //监听背景音频管理器的状态
  },

  /**
   * 组件的方法列表
   */
  methods: {
    togglePlayStatus() {
      this.setData({
        playStatus: !(this.data.playStatus)
      })
      if (this.data.playStatus) {
        BackgroundAM.src = this.properties.audioSrc
        BackgroundAM.title = this.properties.audioName
      } else {
        BackgroundAM.pause()
      }
    },

    // 修改当前期刊的播放状态图片and当前期刊音乐背景图片旋转状态
    _isPlay() {
      if (BackgroundAM.paused) {
        this.setData({
          playStatus: false
        })
      } else {
        this.setData({
          playStatus: this.properties.audioSrc == BackgroundAM.src
        })
      }
    },

    //监听BackgroundAM的状态
    _watchBackgroundAM() {
      BackgroundAM.onPlay(() => {
        this._isPlay()
      })
      BackgroundAM.onPause(() => {
        this._isPlay()
      })
      BackgroundAM.onStop(() => {
        this._isPlay()
      })
      BackgroundAM.onEnded(() => {
        this._isPlay()
      })
    }

  }
})