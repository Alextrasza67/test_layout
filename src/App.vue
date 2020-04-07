<template>
  <div id="app">
    <component :is="component_is"/>
  </div>
</template>

<script>
import layout from './view/layout/layout'
import gridLayout from './view/layout/grid_layout'
import reportByGridDemo from './view/layout/report_by_grid_demo'

export default {
  name: 'app',
  components: {
    layout,
    gridLayout,
    reportByGridDemo
  },
  data(){
    return {
      "component_is":"reportByGridDemo"
    }
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
