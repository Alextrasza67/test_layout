<template>
  <div class="col-scroll-div" id="PackagingShell">
    <div class="scroll-container" id="viewBox">
      <span class="scroll-text">{{text}}</span>
      <span class="scroll-transcript" id="transcript1"></span>
      <span class="scroll-transcript" id="transcript2"></span>
    </div>
    <div class="hide-container" id="hide">
      <span class="scroll-text">{{text}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "col_scroll",
    data() {
      return {
        text: '这是一个测试跑马灯这是一个测试跑马灯这是一个测试跑马灯这是一个测试跑马灯这是一个测试跑马灯',
        space: 50,
        hasRefresh: false,
        newText: '',
        interval: null,
        // 设置初始位移距离
        distance: 0
      }
    },
    created() {
    },
    mounted() {
      this.move();
      this.refreshDate();
    },
    methods: {
      refreshDate(){
        let _this = this
        setInterval(function () {
          if(!_this.hasRefresh){
            _this.newText = (Math.random() * 100).toFixed(0)+'这是一个测试跑马灯这是一个测试跑马灯这是一个测试跑马灯这是一个测试跑马灯这是一个测试跑马灯'
          }
        }, 3000);
      },
      resetTranscript(id, text) {
        // 内容超长,则获取抄本元素
        var transcript = document.getElementById(id)
        // 抄本元素内容填充
        transcript.innerText = text
        // 设定抄本和主题之间的间距
        transcript.style.marginLeft = this.space+'px'
      },
      move() {
        // 首先获取整个内容的宽度,(展示内容会超出隐藏,无法通过获取盒子宽度取到实际的内容宽度)
        // 所以专门造了一个 div 块来放内容,隐藏起来 (无法用根据字体内容来计算宽度的方法,存在误差,当内容较多
        // 的时候误差会相对较大)
        let width = document.getElementById('hide').firstChild.getBoundingClientRect().width
        // 获取展示块盒模型宽度
        let BoxWidth = document.getElementById('PackagingShell').offsetWidth
        // 获取内容展示宽
        let viewBox = document.getElementById('viewBox')
        // 判断内容是否超长
        if ((BoxWidth - width) < 0) {
          this.resetTranscript('transcript1', this.text);
          this.resetTranscript('transcript2', this.text);
        } else {
          // 没有超长则return,不做任何操作
          return
        }
        // 移动函数,通过定时器实现
        let _this = this
        this.interval = setInterval(function () {
          // 位移内用记录是是递减,此处的 1 控制移动变量 s
          _this.distance = _this.distance - 1
          // 判断是否整个内容移动完
          if (-_this.distance >= (2 * width + _this.space)) {
            // 若移动完,则重新设定位移值,此处赋值200是正好把 上面设置的块间距  200px 也加入移动范围,实现移动完无缝跳转
            _this.distance = _this.space
            _this.text = _this.newText
            _this.hasRefresh = false
            clearInterval(_this.interval)
            _this.move()
          }
          if(!_this.hasRefresh && -_this.distance>=width){
            _this.hasRefresh = true
            _this.resetTranscript('transcript2', _this.newText);
          }
          // 实时设置位移距离
          viewBox.style.transform = 'translateX(' + _this.distance + 'px)'
        }, 27) // 移动时间间隔t   s和t 共同决定移动速度
      },

    }
  }
</script>

<style lang="scss" scoped>
  .col-scroll-div {
    width: 50%;
    margin: 25% auto;
    overflow: hidden;

    .scroll-container {
      width: 100%;
      font-size: 24px;
      font-weight: bolder;
      color: #000000;
      white-space: nowrap;
    }

    .hide-container {
      width: 0px;
      overflow: hidden;
      font-size: 24px;
      font-weight: bolder;
      color: #000000;
      white-space: nowrap;
    }
  }
</style>