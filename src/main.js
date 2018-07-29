import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import goods from './components/goods/goods.vue'
import comments from './components/comments/comments.vue'
import stores from './components/stores/stores.vue'

import './common/stylus/index.styl'

Vue.use(VueRouter)

const routes = [
    {path: '/goods', component: goods},
    {path: '/comments', component: comments},
    {path: '/stores', component: stores}
]

const router = new VueRouter({
    routes,
    linkActiveClass: 'active'
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
