<template>
  <div class="app-wrapper">
    <div class="menu"></div>
    <div class="main">
      <div class="tmpl">
        <p>
          <el-button @click="addElement()" >新建</el-button>
        </p>
        <p class="zoom-config">
          缩放：{{this.scale | formatNum}}
          <el-popover
              style="min-width: 38px; "
              width="38px"
              placement="right"
              trigger="click">
            <el-slider v-model="scale" vertical v-on:input="changeScale"
                       :min="25" :max="95"
                       show-input input-size="mini" height="100px">
            </el-slider>
            <i slot="reference" class="el-icon-zoom-in"></i>
          </el-popover>
        </p>
      </div>
      <div class="view_windows" @mousewheel.ctrl="rollZoom" @mousewheel.meta="rollZoom" >
        <div class="sketchpad">
          <div class="grid" :style="`transform: scale(${scale/100});`">
            <template v-for="(item,i) in list" >
              <div class="drag_item"
                   :style="`background-color: ${item.backgroundColor};
                            left: ${item.left}px; top: ${item.top}px;
                            width: ${item.width}px; height: ${item.height}px;
                            `"
                   v-drag v-bind:key="i" @keyup.delete="deleteItem"></div>
            </template>

          </div>
        </div>
      </div>
      <div class="param">
        <p>
          <el-form :model="curItem" ref="curItem" label-position="right" label-width="50px" >
            <el-form-item label="标题:">
              <el-input v-model="curItem.title" size="small"></el-input>
            </el-form-item>
            <el-form-item label="大小:">
              <el-col :span="11">
                <el-input v-model="curItem.width" size="small"></el-input>
              </el-col>
              <el-col :span="2">-</el-col>
              <el-col :span="11">
                <el-input v-model="curItem.height" size="small"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="位置:">
              <el-col :span="11">
                <el-input v-model="curItem.left" size="small"></el-input>
              </el-col>
              <el-col :span="2">-</el-col>
              <el-col :span="11">
                <el-input v-model="curItem.top" size="small"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="背景:">
              <el-color-picker v-model="curItem.backgroundColor" size="small"></el-color-picker>
            </el-form-item>
          </el-form>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import { bindKeyup } from '../../api/layoutEventBind'
  const element = {
    'index': 0,
    'customStyle':'background-color: #bbbbbb',
    'backgroundColor':'#bbbbbb',
    'left': 0,
    'top': 0,
    'width': 50,
    'height': 50,
    'title': '新建',
  }
  export default {
    data() {
      return {
        scale: 50,
        list:[
          {
            'index':0,
            'customStyle':'background-color: #bbbbbb',
            'backgroundColor':'#bbbbbb',
            'left': 0,
            'top': 0,
            'width': 50,
            'height': 50,
            'title': '测试0',
          },
          {
            'index':1,
            'customStyle':'background-color: #f0c78a',
            'backgroundColor':'#f0c78a',
            'left': 0,
            'top': 0,
            'width': 50,
            'height': 50,
            'title': '测试1',
          },
          {
            'index':2,
            'customStyle':'background-color: #ffffff',
            'backgroundColor':'#ffffff',
            'left': 0,
            'top': 0,
            'width': 50,
            'height': 50,
            'title': '测试2',
          },
        ],
        curItem: {}
      }
    },
    created() {
      this.bindKeyUpEvent()
    },
    mounted() {
      this.initScroll();
    },
    filters: {
      formatNum: function (value) {
        return value.toFixed(2)
      }
    },
    watch: {
    },
    methods: {
      initScroll() {
        let el = document.getElementsByClassName("view_windows")[0]
        el.scrollLeft = (el.scrollWidth - el.offsetWidth) / 2
        this.scale = Math.pow(el.offsetWidth / el.scrollWidth, 2) * 100
        el.scrollTop = (el.scrollHeight - el.offsetHeight) * (1 - this.scale/100) / 2
      },
      rollZoom(event){
        this.scale = Math.max(Math.min(this.scale/100 + event.wheelDelta/500, 0.95), 0.25)*100
        event.preventDefault();
      },
      bindKeyUpEvent(){
        const _this = this
        document.onkeyup = e =>  {
          bindKeyup(e, _this)
        }
      },
      reOrderList(){
        this.list.forEach((item,index)=>{
          item.index = index
        })
      },
      addElement(){
        this.list.push(Object.assign({}, element))
        this.reOrderList()
      },
      changeScale(value){
        this.scale = value.toFixed(2)*1;
      }
    },
    //注册局部组件指令
    directives: {
      drag: function(el, binding, vnode) {
        let dragItem = el //获取当前元素
        const _this = vnode.context
        let _index = vnode.data.key
        dragItem.onmousedown = e => {
          let ctrlOrMetaPress = e.ctrlKey || e.metaKey;
          if(!ctrlOrMetaPress){
            return
          }

          //算出鼠标相对元素的位置
          let disX = e.clientX - dragItem.offsetLeft * _this.scale/100
          let disY = e.clientY - dragItem.offsetTop * _this.scale/100
          document.onmousemove = e => {
            //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置，并限制在绘图区域中
            let left = Math.min(Math.max(e.clientX - disX, 0) / _this.scale*100, 1920 - dragItem.offsetWidth);
            let top = Math.min(Math.max(e.clientY - disY, 0) / _this.scale*100, 1080 - dragItem.offsetHeight);
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
          if(_index < _this.list.length - 1) {
            const oldItem = _this.list[_index]
            _this.list.splice(_index, 1)
            _this.list.splice(_index+1, 0, oldItem)
            _this.reOrderList()
          }
        }
        dragItem.onclick = () => {
          _this.curItem = _this.list[_index]
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

        .zoom-config{
          position: absolute;
          bottom: 0px;
          right: 0px;
          margin: 1px;
          text-align: right;
          color: #ffffff;
        }
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
            background-color: #dddddd;
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
        background-color: #ffffff;
        position: relative;
        height: 100%;
        float: left;
        padding: 5px;
      }
    }
  }
</style>
<style>
  .el-popover{
    min-width: 38px;
  }
</style>
