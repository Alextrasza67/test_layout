<template>
  <div class="" :style="style"></div>
</template>

<script>
  export default {
    data() {
      return {
        style: ""
      }
    },
    props: {
      config: {
        type: Object,
        require: true
      }
    },
    created() {
      this.style="position: absolute;\n" +
        "background-color: "+this.config.color+";\n" +
        "top: "+this.config.top+";\n" +
        "left: "+this.config.left+";\n" +
        "right: "+this.config.right+";\n" +
        "bottom: "+this.config.bottom+";"
    },
    mounted() {
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
</style>
