<template>
  <div class="menu-container">
    <ul>
      <li v-for="(item, i) in routes" v-bind:key="i">
        <router-link :to="item.path">{{item.name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import {routes} from '@/router/index'

  export default {
    data() {
      return {
        routes: [],
      }
    },
    created() {
      this.bindRouters()
    },
    mounted() {
    },
    methods: {
      bindRouters() {
        this.routes = routes.slice(1, routes.length)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .menu-container {
    background-color: #ffffff;

    ul {
      width: 200px;
      text-align: left;
    }
  }
</style>
