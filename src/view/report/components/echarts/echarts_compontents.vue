<template>
  <div class="echarts-container" :style="config.style">
    <div :id="`echarts_${config.id}`" class="w100 h100"/>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    props: {
      config: {
        type: Object,
        require: true
      }
    },
    created() {
    },
    mounted() {
      this.initECharts()
    },
    methods: {
      initECharts() {
        var myChart = this.$echarts.init(document.getElementById('echarts_' + this.config.id));
        myChart.setOption(this.config.options,true);
        this.$emit("registeWindowResizeEvent", function () {
          myChart.resize();
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .echarts-container {
    position: absolute;
    width: 98%;
    height: 98%;
    margin: auto;

    .w100 {
      width: 100%;
    }

    .h100 {
      height: 100%;
    }
  }
</style>
