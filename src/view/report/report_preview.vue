<template>
  <div class="screen" :style="`background: ${layoutConfig.background}`">

    <div class="grid_container"
         :style="`grid-template-columns: repeat(${layoutConfig.cols},${100/layoutConfig.cols}%);
                grid-template-rows: repeat(${layoutConfig.rows},${100/layoutConfig.rows}%);`">
      <template v-for="(item, i) in layout">
        <div class="grid_item" v-bind:key="i"
             v-if="item.type == 'echarts' || item.type == 'text' || item.type == 'colScroll' || item.type == 'rowScroll'"
             :style="`grid-column-start: span ${item.cols};grid-row-start: span ${item.rows};`">
          <echartsCompontents :config="item.config" v-if="item.type == 'echarts'"
                              v-on:registeEcharts="registeEcharts"></echartsCompontents>
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
  import { registerMap } from "../../api/registeEchartsMap"
  import echartsCompontents from "./components/echarts/echarts_compontents";
  import textCompontents from "./components/text_compontents";
  import lineCompontents from "./components/line_compontents";
  import colScrollCompontents from "./components/col_scroll_compontents";
  import rowScrollCompontents from "./components/row_scroll_compontents";
  // import layoutData from "../../api/demo_data"
  import {getData} from "../../api/reportPreview"

  export default {
    data() {
      return {
        layout: [],
        layoutConfig: {
          cols: 10,
          rows: 10,
          background: 'url(/static/images/background.png)',
        },
        echartsArray: [],
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
      this.initData()
      registerMap()
      this.bindRefreshData()
    },
    mounted() {
      this.refreshWindowsResize();
    },
    methods: {
      initData(){
        getData().then(res => {
          this.layout = res.data
        });
      },
      registeEcharts(item) {
        this.echartsArray.push(item);
      },
      refreshWindowsResize() {
        window.onresize = this.resizeEcharts
      },
      resizeEcharts() {
        this.echartsArray.forEach(item => item.resize())
      },
      bindRefreshData(){
        var _this = this
        setInterval(function () {
          _this.layout[6].config.options.series[0].data[0].value = (Math.random() * 100).toFixed(0) - 0;
          _this.echartsArray[3].setOption(_this.layout[6].config.options, true);
          _this.layout[1].config.newText = (Math.random() * 100).toFixed(0) + _this.layout[1].config.srcText
        },2000);
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

