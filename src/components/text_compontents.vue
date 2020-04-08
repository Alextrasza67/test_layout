<template>
  <div class="text-container">
      <span>{{data}}</span>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    props: {
      data: {
        type: String,
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
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    align-items: center;
    height: 100%;

    span{
      font-size: 24px;
    }
  }
</style>
