<template>
  <div class="screen">

    <div class="grid_container fixed">
      <div v-for="i in 100" class="item" v-bind:key="i">
        <span>{{i}}</span>
      </div>
    </div>

    <div class="grid_container">
      <div v-for="(item, i) in layout" :class="`item transparent color-${i%6}`" v-bind:key="i"
           :style="`grid-column-start: span ${item.cols};grid-row-start: span ${item.rows};`">
        <span class="bold">{{i}}</span>
      </div>
    </div>

    <div class="fixed line_container">
      <div class="line1"></div>
      <div class="line2"></div>
      <div class="line3"></div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        layout: [
          {cols: 2, rows: 2},
          {cols: 1, rows: 1},
          {cols: 7, rows: 2},
          {cols: 1, rows: 2},
          {cols: 2, rows: 1},
          {cols: 1, rows: 2},
          {cols: 3, rows: 2},
          {cols: 3, rows: 2},
          {cols: 3, rows: 1},
          {cols: 3, rows: 6},
          {cols: 3, rows: 2},
          {cols: 2, rows: 1},
          {cols: 2, rows: 1},
          {cols: 2, rows: 1},
          {cols: 2, rows: 1},
          {cols: 4, rows: 4},
          {cols: 3, rows: 4},
        ]
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>
  .fixed{
    position: fixed
  }

  .screen{
    top: 0px;
    bottom: 0px;
    left: 0;
    right: 0;
    position: absolute;
    background-color: #bbbbbb;

    .grid_container{
      display: grid;
      width: 100%;
      height: 100%;
      grid-template-columns: repeat(10, calc(10% - 1px));
      grid-template-rows: repeat(10, calc(10% - 1px));
      grid-gap: 1px;

      .item{
        text-align: center;
        background-color: #577da3;
        display: flex;
        justify-content: center;
        align-items: center;

        span{
          display: block;
          width: 20px;
          height: 20px;
        }
      }

      .transparent{
        opacity: 0.5;
      }
      .yellow{
        background-color: yellow;
      }
      .red{
        background-color: red;
      }
      .bold{
        color: #000000;
        opacity: 1;
      }
      .color-0{
        background-color: yellow;
      }
      .color-1{
        background-color: red;
      }
      .color-2{
        background-color: green;
      }
      .color-3{
        background-color: #ff49e0;
      }
      .color-4{
        background-color: #1affc7;
      }
      .color-5{
        background-color: #ffffff;
      }
    }

    .line_container{
      width: 100%;
      height: 100%;
      top: 0px;

      .line1{
        width: 100%;
        height: 4px;
        background-color: #000;
        position: relative;
        top: calc(100% * 0.2 - 2px);
      }

      .line2{
        position: absolute;
        background-color: #000;
        top: calc(100% * 0.4 - 2px);
        left: 0px;
        right: 0px;
        bottom: calc(100% * 0.6 - 2px);
      }

      .line3{
        position: absolute;
        background-color: #000;
        top: calc(100% * 0.6);
        left: calc(100% * 0.2 - 2px);
        right: calc(100% * 0.8 - 2px);
        bottom: 0px;
      }

    }
  }
</style>
