<template>
  <div class="screen" :style="`background: ${layoutConfig.background}`">

    <div class="grid_container"
         :style="`grid-template-columns: repeat(${layoutConfig.cols},${100/layoutConfig.cols}%);
                grid-template-rows: repeat(${layoutConfig.rows},${100/layoutConfig.rows}%);`">
      <div v-for="(item, i) in layout" class="grid_item" v-bind:key="i"
           :style="`grid-column-start: span ${item.cols};grid-row-start: span ${item.rows};`">
        <echartsCompontents :config="item.config" v-if="item.type == 'echarts'"
                            v-on:registeEcharts="registeEcharts"></echartsCompontents>
        <textCompontents :config="item.config" v-if="item.type == 'text'"></textCompontents>
      </div>
    </div>

  </div>
</template>

<script>
  import echartsCompontents from "./components/echarts/echarts_compontents";
  import textCompontents from "./components/text_compontents";
  import layoutData from "../../api/demo_data"

  export default {
    data() {
      return {
        layout: [],
        layoutConfig: {
          cols: 10,
          rows: 10,
          background: '#bbbbbb',
        },
        echartsArray: [],
      }
    },
    components: {
      echartsCompontents,
      textCompontents
    },
    created() {
      this.layout = layoutData
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

      .grid_item {
        text-align: center;
        background-color: #577da3;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 100%;
        height: 100%;

      }

    }

  }
</style>

