<template>
  <div id="app">
    <gridLayout/>
    <layout style="display: none"/>
  </div>
</template>

<script>
import layout from './view/layout/layout'
import gridLayout from './view/layout/grid_layout'

export default {
  name: 'app',
  components: {
    layout,
    gridLayout
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #666666;
}
html,body {
  overflow: hidden;
  height: 100%;
}
</style>
