<template>
  <div class="app-wrapper">
    <div class="menu"></div>
    <div class="main">
      <div class="tmpl"></div>
      <div class="view_windows">
        <div class="sketchpad">
          <div class="grid">

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
