<template>
  <div class="screen">
    <div class="grid_container">
      <div v-for="i in 100" class="item" v-bind:key="i">
        <span>{{i}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    created() {
    },
    mounted() {
    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>
  .screen{
    top: 0px;
    bottom: 0px;
    left: 0;
    right: 0;
    position: absolute;
    background-color: #bbbbbb;

    .grid_container{
      display: grid;
      width: 100%;
      height: 100%;
      grid-template-columns: repeat(10, 10%);
      grid-template-rows: repeat(10, 10%);
      grid-gap: 1px 1px;

      .item{
        text-align: center;
        background-color: #577da3;
        display: flex;
        justify-content: center;
        align-items: center;

        span{
          display: block;
          width: 20px;
          height: 20px;
        }
      }
    }
  }
</style>
