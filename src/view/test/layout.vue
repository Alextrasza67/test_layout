<template>
  <div class="app-wrapper">
    <div class="menu"></div>
    <div class="main">
      <div class="tmpl"></div>
      <div class="view_windows">
        <div class="sketchpad">
          <div class="grid">

            <div class="drag_item item1" v-drag></div>
            <div class="drag_item item2" v-drag></div>

          </div>
        </div>
      </div>
      <div class="param"></div>
    </div>
  </div>
</template>

<script>
  export default {
    created() {
    },
    mounted() {
      this.initScroll();
    },
    methods: {
      initScroll() {
        document.getElementsByClassName("view_windows")[0].scrollTop = 250
        document.getElementsByClassName("view_windows")[0].scrollLeft = 440
      }
    },
    //注册局部组件指令
    directives: {
      drag: function(el) {
        let dragBox = el; //获取当前元素
        dragBox.onmousedown = e => {
          //算出鼠标相对元素的位置
          let disX = e.clientX - dragBox.offsetLeft/2;
          let disY = e.clientY - dragBox.offsetTop/2;
          console.log(e.clientX,dragBox.offsetLeft,e.clientY,dragBox.offsetTop)
          document.onmousemove = e => {
            //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
            let left = e.clientX - disX;
            let top = e.clientY - disY;
            //移动当前元素
            dragBox.style.left = left*2 + "px";
            dragBox.style.top = top*2 + "px";
          };
          document.onmouseup = e => {
            console.log(e.clientX,dragBox.offsetLeft,e.clientY,dragBox.offsetTop)
            //鼠标弹起来的时候不再移动
            document.onmousemove = null;
            //预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）
            document.onmouseup = null;
          };
        };
      }
    }
  }
</script>

<style lang="scss" scoped>
  .app-wrapper {
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    height: 100%;
    display: flex;
    flex-direction: column;
    color: #2c3e50;
    background: #666666;

    .menu {
      width: 100%;
      background: #bbbbbb;
      position: relative;
      height: 100px;
      display: flex;
    }

    .main {
      position: relative;
      display: flex;
      -webkit-box-pack: justify;
      justify-content: space-between;
      flex: 1 1 0%;
      overflow: hidden;

      .screen-wrapper {
        position: fixed;
        top: 100px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        display: flex;
        background: #000000;
      }

      .tmpl {
        width: 200px;
        background: #666666;
        height: 100%;
        position: relative;
        float: left;
      }

      .view_windows {
        width: calc(100% - 400px);
        background: #333333;
        height: 100%;
        position: relative;
        float: left;
        overflow: auto;

        .sketchpad {
          position: absolute;
          width: 1920px;
          height: 1080px;
          min-width: 1920px;
          min-height: 1080px;
          transform: matrix(1, 0, 0, 1, 0, 0);

          .grid {
            transform: scale(0.5);
            background-color: #ff44cc;
            position: relative;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;

            .drag_item{
              width: 50px;
              height: 50px;
              position: absolute;
            }

            .item1{
              background-color: #bbbbbb;
            }
            .item2{
              background-color: #f0c78a;
            }
          }
        }
      }

      .param {
        width: 200px;
        position: relative;
        background: #666666;
        height: 100%;
        float: left;
      }
    }
  }
</style>
