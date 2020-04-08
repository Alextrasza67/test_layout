<template>
  <div class="screen" :style="`background: ${layoutConfig.background}`">

    <div class="grid_container"
         :style="`grid-template-columns: repeat(${layoutConfig.cols},${100/layoutConfig.cols}%);
                grid-template-rows: repeat(${layoutConfig.rows},${100/layoutConfig.rows}%);`">
      <template v-for="(item, i) in layout">
        <div class="grid_item" v-bind:key="i"
             v-if="item.type == 'echarts' || item.type == 'text'"
             :style="`grid-column-start: span ${item.cols};grid-row-start: span ${item.rows};`">
          <echartsCompontents :config="item.config" v-if="item.type == 'echarts'"
                              v-on:registeEcharts="registeEcharts"></echartsCompontents>
          <textCompontents :config="item.config" v-if="item.type == 'text'"></textCompontents>
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
  import layoutData from "../../api/demo_data"

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
      lineCompontents
    },
    created() {
      this.layout = layoutData
      registerMap()
    },
    mounted() {
      this.refreshWindowsResize();
    },
    methods: {
      registeEcharts(item) {
        this.echartsArray.push(item);
      },
      refreshWindowsResize() {
        window.onresize = this.resizeEcharts
      },
      resizeEcharts() {
        this.echartsArray.forEach(item => item.resize())
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

