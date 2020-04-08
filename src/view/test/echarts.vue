<template>
    <div class="echarts-container">
        <div id="echarts_test_div"/>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        comments: {},
        created() {
        },
        mounted() {
            this.initECharts()
        },
        methods: {
            initECharts() {
                var myChart = this.$echarts.init(document.getElementById('echarts_test_div'));
                myChart.setOption({
                    title: {
                        text: 'ECharts 入门示例'
                    },
                    tooltip: {},
                    xAxis: {
                        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                });
                window.onresize = myChart.resize;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .echarts-container {
        top: 0px;
        bottom: 0px;
        left: 0;
        right: 0;
        position: absolute;
        background-color: #bbbbbb;

        #echarts_test_div{
          width: 100%;
          height: 100%;
        }
    }
</style>
