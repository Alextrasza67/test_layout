<template>
  <div class="icon_tmp">
    <img :src="url" class="icon_img"  ondragstart="return false"/>
  </div>
</template>

<script>
  export default {
    name: "icon_tmpl",
    props: {
      url: {
        type: String,
        require: true
      }
    },
  }
</script>

<style lang="scss" scoped>
.icon_tmp{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;

  .icon_img{
    width: 100%;
    height: 100%;
  }
}
</style>