<template>
  <div class="screen" :style="layoutConfig.style">

    <div class="grid_container"
         :style="`grid-template-columns: repeat(${layoutConfig.cols},${100/layoutConfig.cols}%);
                grid-template-rows: repeat(${layoutConfig.rows},${100/layoutConfig.rows}%);`">
      <template v-for="(item, i) in layout">
        <div class="grid_item" v-bind:key="i"
             v-if="item.type != 'line'"
             :style="`grid-column-start: span ${item.cols};grid-row-start: span ${item.rows};`">
          <echartsCompontents :config="item.config" v-if="item.type == 'echarts'"
                              v-on:registeWindowResizeEvent="registeWindowResizeEvent"></echartsCompontents>
          <textCompontents :config="item.config" v-if="item.type == 'text'"></textCompontents>
          <colScrollCompontents :config="item.config" v-if="item.type == 'colScroll'"></colScrollCompontents>
          <rowScrollCompontents :config="item.config" v-if="item.type == 'rowScroll'"></rowScrollCompontents>
        </div>
        <lineCompontents v-bind:key="i" :config="item.config" v-if="item.type == 'line'"></lineCompontents>
      </template>
    </div>

  </div>
</template>

<script>
  //TODO components import need update to auto registe
  import echartsCompontents from "./components/echarts/echarts_compontents";
  import textCompontents from "./components/text_compontents";
  import lineCompontents from "./components/line_compontents";
  import colScrollCompontents from "./components/col_scroll_compontents";
  import rowScrollCompontents from "./components/row_scroll_compontents";

  import {registerMap} from "../../api/registeEchartsMap"
  import {getData} from "../../api/reportPreview"

  export default {
    data() {
      return {
        layout: [],
        layoutConfig: {
          cols: 10,
          rows: 10,
        },
        windowResizeEvent: [],
      }
    },
    components: {
      echartsCompontents,
      textCompontents,
      lineCompontents,
      colScrollCompontents,
      rowScrollCompontents
    },
    created() {
      this.initConfig()
      console.log(this.layoutConfig.style)
      this.initData()
      registerMap()
      this.bindRefreshData()
    },
    mounted() {
      this.refreshWindowsResize();
    },
    methods: {
      initConfig(){
        getData('/static/js/demo_config.json').then(res => {
          this.layoutConfig = res.data.layoutConfig
        });
      },
      initData() {
        getData('/static/js/demo_data.json').then(res => {
          this.layout = res.data
        });
      },
      refreshWindowsResize() {
        window.onresize = this.onWindowResize
      },
      onWindowResize() {
        this.windowResizeEvent.forEach(func => {
          func()
        })
      },
      registeWindowResizeEvent(event) {
        if ((typeof event) == "function") {
          this.windowResizeEvent.push(event)
        } else {
          console.error("registe window resize event need a function")
        }
      },
      bindRefreshData() {
        // var _this = this
        // setInterval(function () {
        //   _this.layout[6].config.options.series[0].data[0].value = (Math.random() * 100).toFixed(0) - 0;
        //   _this.echartsArray[3].setOption(_this.layout[6].config.options, true);
        //   _this.layout[1].config.newText = (Math.random() * 100).toFixed(0) + _this.layout[1].config.srcText
        // },2000);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .fixed {
    position: fixed
  }

  .screen {
    top: 0px;
    bottom: 0px;
    left: 0;
    right: 0;
    position: absolute;

    .grid_container {
      display: grid;
      width: 100%;
      height: 100%;
      place-self: center center;

      .grid_item {
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 100%;
        height: 100%;
        padding: 1px;

      }

    }

  }
</style>

