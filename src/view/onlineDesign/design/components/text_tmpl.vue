<template>
  <div class="text_tmp">
    <span :style="`${font?('color:'+font.color):''}`">{{content}}</span>
  </div>
</template>

<script>
  export default {
    name: "text_tmpl",
    props: {
      content: {
        type: String,
        require: true
      },
      font: {
        type: Object,
      }
    },
  }
</script>

<style lang="scss" scoped>
.text_tmp{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>