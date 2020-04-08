import Vue from 'vue'
import VueRouter from 'vue-router'

import menu from '@/view/menu/menu'
import layout from '@/view/test/layout'
import gridLayout from '@/view/test/grid_layout'
import reportByGridDemo from '@/view/test/report_by_grid_demo'
import echarts from '@/view/test/echarts'

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
        path: '/reportByGridDemo',
        component: reportByGridDemo,
        name: 'reportByGridDemo'
    }, {
        path: '/echarts',
        component: echarts,
        name: 'echarts'
    }
]

export default new VueRouter({
    // mode: 'hash',
    // base: process.env.BASE_URL,
    routes
})