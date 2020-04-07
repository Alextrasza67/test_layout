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
import {routes} from '../../router/index'
export default {
    data() {
        return {
            routes: routes,
        }
    },
    comments:{
    },
    created() {
        console.log(routes)
    },
    mounted() {
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
    .menu-container{
        background-color: #ffffff;

        ul{
            width: 200px;
            text-align: left;
        }
    }
</style>
