import Vue from 'vue'
import VueRouter from 'vue-router'

import menu from '../view/menu/menu'
import layout from '../view/layout/layout'
import gridLayout from '../view/layout/grid_layout'
import reportByGridDemo from '../view/layout/report_by_grid_demo'

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
    }
]

export default new VueRouter({
    // mode: 'hash',
    // base: process.env.BASE_URL,
    routes
})