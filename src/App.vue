<template>
    <div id="app">
        <v-header class="header" :seller="seller"></v-header>
        <div class='tab'>
            <div class='tab-item' v-for='t in tabs' v-bind:key="t.id">
                <router-link v-bind:to='t.path'>{{ t.title }}</router-link>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import header from './components/header/header.vue'
import {ajax} from './common/js/utils.js'

export default {
    data: function () {
        return {
            seller: {},
            tabs: [
                {id: 0, title: '商品', path: '/goods'},
                {id: 1, title: '评论', path: '/comments'},
                {id: 2, title: '商家', path: '/stores'}
            ]
        }
    },
    created () {
        let self = this
        ajax('GET', '/data.json', null, function (responseText) {
            let obj = JSON.parse(responseText)
            self.seller = obj.seller
        })
    },
    components: {
        'v-header': header
    }
}
</script>

<style lang="stylus">
@import "common/stylus/mixin.styl"

#app
    .tab
        display: flex
        width: 100%
        height: 40px
        line-height: 40px
        border-1px(rgba(7, 17, 27, 0.1))
        .tab-item
            flex: 1
            text-align: center
            & a
                display: block
                text-decoration: none
                font-size: 14px
                color: rgb(77, 85, 93)
                &.active
                    color: rgb(240, 20, 20)

</style>
