<template>
  <div class="col-scroll-div" :id="`col-scroll-${config.id}`" :style="config.style">
    <div class="scroll-container" :id="`col-scroll-container-${config.id}`">
      <span class="scroll-text">{{scrollConfig.text}}</span>
      <span class="scroll-transcript" :id="`transcript2-${config.id}`"></span>
      <span class="scroll-transcript" :id="`transcript3-${config.id}`"></span>
    </div>
    <div class="hide-container" :id="`col-scroll-hide-${config.id}`">
      <span class="scroll-text">{{scrollConfig.text}}</span>
    </div>
  </div>
</template>

<script>
  import {getData} from "../../../api/reportPreview"

  const defaultConfig = {
    text: '',
    space: 50,
    newText: null,
  }
  export default {
    data() {
      return {
        scrollConfig: null,
        refreshing: false,
        interval: null,
        // 设置初始位移距离
        distance: 0
      }
    },
    props: {
      config: {
        type: Object,
        require: true
      }
    },
    created() {
      this.scrollConfig = Object.assign(defaultConfig, this.config)
      if (this.scrollConfig.autoRefresh) {
        this.autoRefresh(this.scrollConfig.autoRefreshConfig)
      }
    },
    mounted() {
      this.move();
    },
    watch: {
      config: {
        deep: true,
        handler(newValue) {
          if (!this.refreshing) {
            this.scrollConfig.newText = newValue.newText
          }
        }
      }
    },
    methods: {
      resetTranscript(id, text) {
        // 内容超长,则获取抄本元素
        var transcript = document.getElementById(id)
        // 抄本元素内容填充
        transcript.innerText = text
        // 设定抄本和主题之间的间距
        transcript.style.marginLeft = this.scrollConfig.space + 'px'
      },
      move() {
        let textWidth = document.getElementById('col-scroll-hide-' + this.config.id).firstChild.getBoundingClientRect().width
        let viewerWidth = document.getElementById('col-scroll-container-' + this.config.id).offsetWidth
        let viewBox = document.getElementById('col-scroll-container-' + this.config.id)
        // 判断内容是否超长
        if ((viewerWidth - textWidth) < 0) {
          this.resetTranscript('transcript2-' + this.config.id, this.scrollConfig.text);
          this.resetTranscript('transcript3-' + this.config.id, this.scrollConfig.text);
        } else {
          // 没有超长则return,不做任何操作
          return
        }
        // 移动函数,通过定时器实现
        let _this = this
        this.interval = setInterval(function () {
          // 位移内用记录是是递减,此处的 1 控制移动变量 s
          _this.distance = _this.distance - 1

          if (_this.refreshing || _this.scrollConfig.newText != null) {
            // 内容需要刷新
            if (_this.refreshing && -_this.distance >= (2 * textWidth + _this.scrollConfig.space)) {
              _this.scrollConfig.text = _this.scrollConfig.newText
              _this.scrollConfig.newText = null
              _this.refreshing = false
              clearInterval(_this.interval)
              _this.move()
            } else if (!_this.refreshing && -_this.distance >= textWidth
                && -_this.distance <= (2 * (textWidth + _this.scrollConfig.space) - viewerWidth) ) {
              _this.refreshing = true
              _this.resetTranscript('transcript3-' + _this.config.id, _this.scrollConfig.newText);
            }
          }

          if (-_this.distance >= (2 * textWidth + _this.scrollConfig.space)) {
            // 若移动完,则重新设定位移值,实现移动完无缝跳转
            _this.distance = _this.scrollConfig.space
          }

          // 实时设置位移距离
          viewBox.style.transform = 'translateX(' + _this.distance + 'px)'
        }, 27)
      },
      autoRefresh(config) {
        let _this = this
        setInterval(function () {
          if (!_this.refreshing) {
            getData(config.dataUrl).then(res => {
              if (res.data.data != null && res.data.data != ''
                && res.data.data != _this.scrollConfig.text) {
                _this.scrollConfig.newText = res.data.data
              }
            })
          }
        }, config.timeout)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .col-scroll-div {
    width: 100%;
    margin: 25% auto;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    .scroll-container {
      width: 100%;
      white-space: nowrap;
    }

    .hide-container {
      width: 0px;
      overflow: hidden;
      white-space: nowrap;
    }
  }
</style>