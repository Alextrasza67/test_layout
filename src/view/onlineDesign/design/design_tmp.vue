<template>
  <div class="app-wrapper">
    <div class="header">
      <div class="title">
        <span class="pointer" @dblclick="tiggleValue('titleEdit')" v-if="!titleEdit">{{setting.title?setting.title:'请输入标题'}}</span>
        <el-input v-model="setting.title" v-if="titleEdit" size="small" @blur="tiggleValue('titleEdit')"></el-input>
      </div>
      <div class="menu">
        <el-dropdown trigger="click" class="menu_item" :hide-on-click="false">
          <span class="el-dropdown-link">
            页面
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-popover
                placement="right"
                trigger="hover">
              <el-dropdown-item icon="">1920×1080</el-dropdown-item>
              <el-dropdown-item icon="">1024*768</el-dropdown-item>
              <el-dropdown-item icon="" slot="reference">大小 <i class="el-icon-caret-right"></i></el-dropdown-item>
            </el-popover>
            <el-popover
                placement="right"
                trigger="hover">
              <el-dropdown-item icon="">2px</el-dropdown-item>
              <el-dropdown-item icon="">5px</el-dropdown-item>
              <el-dropdown-item icon="">8px</el-dropdown-item>
              <el-dropdown-item icon="">10px</el-dropdown-item>
              <el-dropdown-item icon="" slot="reference">页边距 <i class="el-icon-caret-right"></i></el-dropdown-item>
            </el-popover>
            <el-popover
                placement="right"
                trigger="hover">
              <el-dropdown-item icon="">10×10</el-dropdown-item>
              <el-dropdown-item icon="">50×50</el-dropdown-item>
              <el-dropdown-item icon="">100×100</el-dropdown-item>
              <el-dropdown-item icon="" slot="reference">grid <i class="el-icon-caret-right"></i></el-dropdown-item>
            </el-popover>
            <el-popover
                placement="right"
                trigger="hover">
              <el-color-picker size="small"></el-color-picker>
              <el-dropdown-item icon="" slot="reference">背景 <i class="el-icon-caret-right"></i></el-dropdown-item>
            </el-popover>
          </el-dropdown-menu>
        </el-dropdown>

        <el-dropdown trigger="click" class="menu_item" :hide-on-click="false">
          <span class="el-dropdown-link">
            排列
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="" :disabled="curItem.empty">上移一层</el-dropdown-item>
            <el-dropdown-item icon="" :disabled="curItem.empty">下移一层</el-dropdown-item>
            <el-dropdown-item icon="" :disabled="curItem.empty">置于顶层</el-dropdown-item>
            <el-dropdown-item icon="" :disabled="curItem.empty">置于底层</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="shortcut">
        <i class="iconfont icon-bold pointer"></i>
        <i class="iconfont icon-italic pointer"></i>
        <i class="iconfont icon-underline pointer"></i>
        <el-popover
              placement="bottom"
              trigger="click" :disabled="curItem.empty">
          <el-color-picker size="small" v-model="curItem.font.color"></el-color-picker>
          <i class="iconfont icon-font-colors pointer" :style="`${curItem.font?('color:'+curItem.font.color):''}`" slot="reference"></i>
        </el-popover>
        <i class="iconfont icon-font-size pointer"></i>
      </div>
    </div>
    <div class="main">
      <div class="tmpl">
        <div class="tmpl_list">
          <el-button @click="addElement()" class="tmpl_item" style="grid-column-start: span 2; margin-bottom: 10px">新建</el-button>
          <el-button @click="addElement('echarts')" class="tmpl_item">echarts</el-button>
          <el-button @click="addElement('text')" class="tmpl_item">text</el-button>
          <el-button @click="addElement('colScroll')" class="tmpl_item">colScroll</el-button>
          <el-button @click="addElement('rowScroll')" class="tmpl_item">rowScroll</el-button>
          <el-button @click="addElement('line')" class="tmpl_item">line</el-button>
        </div>
        <div class="zoom-config">
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
        </div>
      </div>
      <div class="view_windows" @mousewheel.ctrl="rollZoom" @mousewheel.meta="rollZoom" >
        <div class="sketchpad">
          <div class="grid" :style="`transform: scale(${scale/100});`">
            <div class="grid_container fixed">
              <div v-for="i in 2500" class="grid_item" v-bind:key="i">
              </div>
            </div>
            <template v-for="(item,i) in list" >
              <div class="drag_item"
                   :style="`background-color: ${item.backgroundColor};
                            left: ${item.left}px; top: ${item.top}px;
                            width: ${item.width}; height: ${item.height};
                            `"
                   v-drag v-bind:key="i">
                <iconTmpl :url="item.iconUrl" v-if="item.type == 'echarts'"></iconTmpl>
                <textTmpl :content="item.data" :font="item.font" v-if="item.type == 'text'"></textTmpl>
                <textTmpl :content="item.data" v-if="item.type == 'colScroll'"></textTmpl>
                <textTmpl :content="item.data" v-if="item.type == 'rowScroll'"></textTmpl>
              </div>
            </template>

          </div>
        </div>
      </div>
      <div class="param">
        <div v-if="Object.keys(curItem).length != 0">
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
            <el-button @click="openDrawer">详细配置</el-button>
          </el-form>
        </div>
      </div>
    </div>


    <el-drawer
        title="参数配置"
        :visible.sync="paramDrawer"
        direction="rtl"
        ref="drawer"
    >
      <div style="width: 100%;height: 100%">
        <el-form :model="curItem" ref="curItem" label-position="right" label-width="50px" v-if="curItem.type == 'text'">
          <el-form-item label="文本:">
            <el-input v-model="curItem.data" size="small"></el-input>
          </el-form-item>
        </el-form>
        <div class="">
          <el-button @click="paramDrawer = false">关 闭</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
  import iconTmpl from "./components/icon_tmpl";
  import textTmpl from "./components/text_tmpl";
  import { bindKeyup } from '../../../api/layoutEventBind'
  const element = {
    'index': 0,
    'customStyle':'background-color: #bbbbbb',
    'backgroundColor':'#bbbbbb',
    'left': 0,
    'top': 0,
    'width': '50px',
    'height': '50px',
    'title': '新建',
  }
  const curItem = {
    empty: true,
    font:{
      color: '#000000'
    }
  }
  export default {
    components:{
      iconTmpl,
      textTmpl,
    },
    data() {
      return {
        scale: 50,
        setting: {
          title: '',
          width: '',
          height: '',
          top: '',
          bottom: '',
          left: '',
          right: '',
          background:{
            type: '',
          },
          padding:  '',
          grid: {
            col: '',
            row: '',
          }
        },
        list:[
          {
            "index":0,
            "customStyle":"background-color: #bbbbbb",
            "backgroundColor":"#bbbbbb",
            "left":887.6901340222831,
            "top":80.8527369610851,
            "width":"150px",
            "height":"50px",
            "title":"新建",
            "type":"text",
            "id":"ele_rzq0at",
            "data":"adfasdfas ",
            "font":{
              "color":"red"
            }
          },
          {
            "index":1,
            "customStyle":"background-color: #bbbbbb",
            "backgroundColor":"#E00A0A",
            "left":0,
            "top":187.37671564669787,
            "width":"100%",
            "height":"2px",
            "title":"新建",
            "type":"line",
            "id":"ele_etzver"
          },
          {
            "index":2,
            "customStyle":"background-color: #bbbbbb",
            "backgroundColor":"#bbbbbb",
            "left":"390",
            "top":"210",
            "width":"1100px",
            "height":"870px",
            "title":"新建",
            "type":"echarts",
            "id":"ele_nxcwi3",
            "iconUrl":"/static/images/echarts.jpg"
          },
          {
            "index":3,
            "customStyle":"background-color: #bbbbbb",
            "backgroundColor":"#bbbbbb",
            "left":"20",
            "top":"210",
            "width":"350px",
            "height":"450px",
            "title":"新建",
            "type":"colScroll",
            "id":"ele_j593lv"
          },
          {
            "index":4,
            "customStyle":"background-color: #bbbbbb",
            "backgroundColor":"#bbbbbb",
            "left":"1510",
            "top":"210",
            "width":"400px",
            "height":"350px",
            "title":"新建",
            "type":"echarts",
            "id":"ele_s8oslh",
            "iconUrl":"/static/images/echarts.jpg"
          },
          {
            "index":5,
            "customStyle":"background-color: #bbbbbb",
            "backgroundColor":"#bbbbbb",
            "left":"20",
            "top":"680",
            "width":"350px",
            "height":"400px",
            "title":"新建",
            "type":"echarts",
            "id":"ele_4fkoo2",
            "iconUrl":"/static/images/echarts.jpg"
          },
          {
            "index":6,
            "customStyle":"background-color: #bbbbbb",
            "backgroundColor":"#bbbbbb",
            "left":"1510",
            "top":"580",
            "width":"400px",
            "height":"350px",
            "title":"新建",
            "type":"echarts",
            "id":"ele_bk7l85",
            "iconUrl":"/static/images/echarts.jpg"
          },
          {
            "index":7,
            "customStyle":"background-color: #bbbbbb",
            "backgroundColor":"#bbbbbb",
            "left":"1510",
            "top":"970",
            "width":"400px",
            "height":"100px",
            "title":"新建",
            "type":"colScroll",
            "id":"ele_3cudfh"
          }
        ],
        curItem: {},
        paramDrawer: false,
        titleEdit: false,
      }
    },
    created() {
      this.bindKeyUpEvent()
      this.resetCurItem()
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
      addElement(type){
        let newObject = Object.assign({}, element)
        if(type != undefined){
          newObject.type = type
        }
        newObject.id = 'ele_'+Math.random().toString(36).substr(3,6);
        if(type == 'echarts'){
          newObject.iconUrl = '/static/images/echarts.jpg'
        }
        console.log(newObject)
        this.list.push(newObject)
        this.reOrderList()
        this.curItem = newObject
      },
      changeScale(value){
        this.scale = value.toFixed(2)*1;
      },
      openDrawer(){
        this.paramDrawer = true
      },
      tiggleValue(key){
        console.log(key, this._data[key])
        this._data[key] = !this._data[key]
      },
      resetCurItem(){
        this.curItem = curItem;
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

    .header {
      width: 100%;
      background: #fbfbfb;
      position: relative;
      height: 90px;
      display: flex;
      flex-direction: column;
      padding: 8px 5px 2px 5px;
      border-bottom: solid 1px #dddddd;

      .title{
        height: 30px;
        width: 50%;
        min-width: 100px;
        display: flex;
        justify-content: flex-start;

        span{
          display: inline-block;
          min-width: 100px;
          text-align: left;
          padding-left: 15px;
          height: 32px;
          line-height: 32px;
          font-weight: bold;
        }
      }

      .menu{
        height: 30px;
        width: 100%;
        min-width: 200px;
        display: flex;
        padding-left: 20px;
        border-bottom: solid 1px #dddddd;

        .menu_item{
          display: flex;
          align-items: flex-end;
          margin-left: 10px;
        }

        .el-dropdown-link {
          cursor: pointer;
          color: #409EFF;
        }
      }

      .shortcut{
        height: 30px;
        width: 100%;
        min-width: 200px;
        display: flex;
        align-items: flex-end;
        padding-left: 30px;

        i{
          font-size: 24px;
          position: relative;
          top: 3px;
        }
      }
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
        height: calc(100% - 10px);
        position: relative;
        float: left;
        padding: 5px;

        .tmpl_list {
          display: grid;
          grid-template-columns: 50% 50%;
          grid-gap: 1px;
          justify-content: center;
          align-items: center;

          .tmpl_item {
            margin-left: 0px !important;

          }
        }

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

            .grid_container {
              position: absolute;
              display: grid;
              width: 100%;
              height: 100%;
              grid-template-columns: repeat(50, calc(2% - 1px));
              grid-template-rows: repeat(50, calc(2% - 1px));
              grid-gap: 1px;
              background-color: #ffffff;

              .grid_item {
                background-color: #cccccc;
                text-align: center;
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                width: 100%;
                height: 100%;

              }
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

  .pointer{
    cursor: pointer;
  }
</style>
<style>
  .el-popover{
    min-width: 38px;
  }
  .el-popper[x-placement^=bottom]{
    margin-top: 0px !important;
  }
</style>
