<template>
  <div class="text-container" :style="config.style">
    <span>{{config.data}}</span>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
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
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  .text-container {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #bbbbbb;
    display: flex;
    justify-content: center;
    align-items: center;
    align-items: center;
    height: 100%;
    text-align: center;

    span {
    }
  }
</style>
