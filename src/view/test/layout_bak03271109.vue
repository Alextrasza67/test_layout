<template>
  <div class="app-wrapper">
    <div class="menu"></div>
    <div class="main">
      <div class="screen-wrapper"></div>
      <div class="tmpl"></div>
      <div class="view_windows"></div>
      <div class="param"></div>
    </div>
  </div>
</template>

<script>
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
        width: 15%;
        background: #666666;
        height: 100%;
        position: relative;
        float: left;
      }

      .view_windows {
        width: 70%;
        background: #333333;
        height: 100%;
        position: relative;
        float: left;
      }

      .param {
        width: 15%;
        position: relative;
        background: #666666;
        height: 100%;
        float: left;
      }
    }
  }
</style>
