<template>
  <div class="echarts-container" :style="config.style">
    <div class="w100 h100" :ref="`echarts_${config.id}`"/>
  </div>
</template>

<script>
  import {getData} from "../../../../api/reportPreview";

  export default {
    data() {
      return {
        myChart: null
      }
    },
    props: {
      config: {
        type: Object,
        require: true
      }
    },
    created() {
      if (this.config.autoRefresh) {
        this.autoRefresh(this.config.autoRefreshConfig)
      }
    },
    mounted() {
      this.initECharts()
    },
    methods: {
      initECharts() {
        this.myChart = this.$echarts.init(this.$refs['echarts_' + this.config.id]);
        this.myChart.setOption(this.config.options, true);
        if (this.config.autoInitData) {
          this.initData(this.config.initDataConfig);
        }
        let _this = this
        this.$emit("registeWindowResizeEvent", function () {
          _this.myChart.resize();
        })
      },
      autoRefresh(config) {
        let _this = this
        setInterval(function () {
          getData(config.dataUrl).then(res => {
            _this.myChart.setOption(res.data)
          })
        }, config.timeout)
      },
      initData(config) {
        let _this = this
        getData(config.dataUrl).then(res => {
          _this.myChart.setOption(res.data)
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
