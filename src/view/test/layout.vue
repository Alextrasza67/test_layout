<template>
  <div class="app-wrapper">
    <div class="menu"></div>
    <div class="main">
      <div class="tmpl"></div>
      <div class="view_windows" @mousewheel.ctrl="rollZoom" @mousewheel.meta="rollZoom" >
        <div class="sketchpad">
          <div class="grid" :style="`transform: scale(${scale});`">
            <template v-for="(item,i) in list" >
              <div class="drag_item" :style="`${item.customStyle}; left: ${item.left}px; top: ${item.top}px; `" v-drag v-bind:key="i"></div>
            </template>

          </div>
        </div>
      </div>
      <div class="param"></div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        'scale': 0.5,
        'list':[
          {
            'index':0,
            'customStyle':'background-color: #bbbbbb',
            'left': 0,
            'top': 0,
          },
          {
            'index':1,
            'customStyle':'background-color: #f0c78a',
            'left': 0,
            'top': 0,
          },
        ]
      }
    },
    created() {
    },
    mounted() {
      this.initScroll();
    },
    methods: {
      initScroll() {
        let el = document.getElementsByClassName("view_windows")[0]
        el.scrollLeft = (el.scrollWidth - el.offsetWidth) / 2
        this.scale = Math.pow(el.offsetWidth / el.scrollWidth, 2)
        el.scrollTop = (el.scrollHeight - el.offsetHeight) * (1 - this.scale) / 2
      },
      rollZoom(event){
        this.scale = Math.max(Math.min(this.scale + event.wheelDelta/500, 0.95), 0.25)
        event.preventDefault();
      }
    },
    //注册局部组件指令
    directives: {
      drag: function(el, binding, vnode) {
        let dragItem = el //获取当前元素
        const _this = vnode.context
        let _index = vnode.data.key
        dragItem.onmousedown = e => {
          //算出鼠标相对元素的位置
          let disX = e.clientX - dragItem.offsetLeft * _this.scale
          let disY = e.clientY - dragItem.offsetTop * _this.scale
          document.onmousemove = e => {
            //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
            let left = Math.min(Math.max(e.clientX - disX, 0) / _this.scale, 1920 - dragItem.offsetWidth);
            let top = Math.min(Math.max(e.clientY - disY, 0) / _this.scale, 1080 - dragItem.offsetHeight);
            //移动当前元素
            _this.list[_index].left = left
            _this.list[_index].top = top
          };
          document.onmouseup = () => {
            //鼠标弹起来的时候不再移动
            document.onmousemove = null;
            //预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）
            document.onmouseup = null;
          };
        };
        dragItem.ondblclick = () => {
          let index = vnode.data.key
          if(index < _this.list.length - 1) {
            const oldItem = _this.list[index]
            _this.list.splice(index, 1)
            _this.list.splice(index+1, 0, oldItem)
          }
        }
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
