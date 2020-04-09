<template>
  <div class="row-scroll-div">
    <div class="scroll-container">
      <ul :class="{transition:animate}">
        <li v-for="(item, i) in dataList" v-bind:key="i">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "row_scroll",
    data() {
      return {
        dataList: [
          "1. 测试测试123123",
          "2. 测试测试123123",
          "3. 测试测试123123",
          "4. 测试测试123123",
          "5. 测试测试123123",
          "6. 测试测试123123",
        ],
        animate: false
      }
    },
    created() {
    },
    mounted() {
      setInterval(this.scrollTop, 3000);
    },
    methods: {
      scrollTop() {
        this.animate = true
        setTimeout(() => {
          this.dataList.push(this.dataList[0])
          this.dataList.shift()
          this.animate = false
        }, 500)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .row-scroll-div {
    width: 300px;
    margin: 0 auto;
    overflow: hidden;

    .scroll-container {
      width: 100%;
      font-size: 24px;
      color: #000000;
      white-space: nowrap;
      height: 68px;
      overflow: hidden;

      ul, li {
        margin: 0px;
      }

      .transition{
        transition: all 0.5s;
        margin-top: -34px
      }
    }

  }
</style>