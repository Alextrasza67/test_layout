<template>
    <div class="echarts-container">
        <div :id="`echarts_${echartId}`" class="w100 h100"/>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        props: {
            echartId:{
                type: String,
                require:true
            }
        },
        created() {
        },
        mounted() {
            this.initECharts()
        },
        methods: {
            initECharts() {
                var myChart = this.$echarts.init(document.getElementById('echarts_'+this.echartId));
                myChart.setOption({
                    title: {
                        text: 'ECharts '+this.echartId
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
                this.$emit("registeEcharts",myChart)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .echarts-container {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #bbbbbb;

        #echarts_test_div{
            width: 100%;
            height: 100%;
        }

        .w100{
            width: 100%;
        }
        .h100{
            height: 100%;
        }
    }
</style>
