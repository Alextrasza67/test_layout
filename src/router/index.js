import Vue from 'vue'
import VueRouter from 'vue-router'

import menu from '@/view/menu/menu'
import layout from '@/view/test/layout'
import gridLayout from '@/view/test/grid_layout'
import itemInGrid from '@/view/test/item_in_grid_demo'
import echarts from '@/view/test/echarts'
import echartsInGrid from '@/view/test/echarts_in_grid_demo'

Vue.use(VueRouter)

export const routes = [
    {
        path: '/',
        component: menu,
        name: 'home'
    }, {
        path: '/layout',
        component: layout,
        name: 'layout'
    }, {
        path: '/gridLayout',
        component: gridLayout,
        name: 'gridLayout'
    }, {
        path: '/itemInGrid',
        component: itemInGrid,
        name: 'itemInGrid'
    }, {
        path: '/echarts',
        component: echarts,
        name: 'echarts'
    }, {
        path: '/echartsInGrid',
        component: echartsInGrid,
        name: 'echartsInGrid'
    }
]

export default new VueRouter({
    // mode: 'hash',
    // base: process.env.BASE_URL,
    routes
})