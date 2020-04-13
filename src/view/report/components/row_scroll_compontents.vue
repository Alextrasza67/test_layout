<template>
  <div class="row-scroll-div" :id="`row-scroll-${config.id}`" :style="config.style">
    <div class="scroll-container" :id="`scroll-container-${config.id}`">
      <ul >
        <li v-for="(item, i) in dataList" v-bind:key="i" :style="item.style">{{item.data}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {getData} from "../../../api/reportPreview";

  export default {
    data() {
      return {
        dataList: [
        ],
        newDataList: [
        ],
        animate: false
      }
    },
    props: {
      config: {
        type: Object,
        require: true
      }
    },
    created() {
      this.dataList = this.config.dataList
      if (this.config.autoRefresh) {
        this.autoRefresh(this.config.autoRefreshConfig)
      }
    },
    mounted() {
      setInterval(this.scrollTop, 3000);
    },
    methods: {
      scrollTop() {
        let ul = document.getElementById('scroll-container-' + this.config.id).firstChild
        let height = ul.firstChild.getBoundingClientRect().height
        ul.style = 'transition: all 0.5s;margin-top: -'+height+'px'
        let _this = this
        setTimeout(() => {
          if(_this.newDataList.length <= 0){
            _this.dataList.push(_this.dataList[0])
            _this.dataList.shift()
          }else{
            _this.dataList.push(_this.newDataList[0])
            _this.newDataList.shift()
            _this.dataList.shift()
          }
          ul.style = ''
        }, 500)
      },
      autoRefresh(config) {
        let _this = this
        setInterval(function () {
          getData(config.dataUrl).then(res => {
            _this.newDataList = _this.newDataList.concat(res.data.dataList)
          })
        }, config.timeout)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .row-scroll-div {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;

    .scroll-container {
      width: 100%;
      overflow: hidden;

      ul, li {
        margin: 0px;
      }

    }

  }
</style>