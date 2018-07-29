<template>
    <div class="header">
        <div class="content-wrapper" v-if="seller">
            <div class="avatar">
                <img width="64" height="64" :src="seller.avatar" alt="">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}} / {{seller.deliveryTime}}分钟送达
                </div>
                <div class="supports" v-if="seller.supports">
                    <span class="icon" :class="type"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div class="support-count">
                <span class="count">5个</span>
                <span class="icon-keyboard_arrow_right"></span>
            </div>
        </div>
        <div class="bulletin-wrapper">
            <span class="bulletin-title"></span>
            <span class="bulletin-text">{{seller.bulletin}}</span>
            <span class="icon-keyboard_arrow_right"></span>
        </div>
        <div class="background">
            <img :src="seller.avatar" width="100%" height="100%">
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            seller: Object
        },
        created () {
            this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
        },
        computed: {
            type () {
                return this.classMap[this.seller.supports[0].type]
            }
        }
    }
</script>

<style lang='stylus'>
    @import "../../common/stylus/mixin.styl"
    .header
        position: relative
        color: #fff
        background: rgba(7, 17, 27, 0.5)
        .content-wrapper
            position: relative
            padding: 24px 12px 18px 24px
            .avatar
                display: inline-block
                vertical-align: top
                img
                    border-radius: 2px
            .content
                display: inline-block
                margin-left: 16px
                .title
                    margin: 2px 0px 8px 0px
                    .brand
                        vertical-align: top
                        display: inline-block
                        width: 30px
                        height: 18px
                        bg-image('brand')
                        background-size: 30px 18px
                        background-repeat: no-repeat
                    .name
                        margin-left: 6px
                        font-size: 16px
                        font-weight: bold
                        line-height: 18px
                .description
                    margin-top: 8px
                    font-size: 12px
                    font-weight: 200
                    line-height: 12px
                .supports
                    margin-top: 10px
                    font-size: 10px
                    font-weight: 200
                    line-height: 12px
                    .icon
                        display: inline-block
                        vertical-align: top
                        width: 12px
                        height: 12px
                        margin-right: 4px
                        background-size: 12px 12px
                        background-repeat: no-repeat
                        &.decrease
                            bg-image('decrease_1')
                        &.discount
                            bg-image('discount_1')
                        &.guarantee
                            bg-image('guarantee_1')
                        &.invoice
                            bg-image('invoice_1')
                        &.special
                            bg-image('special_1')
                    .text
                        font-size: 10px
                        line-height: 12px
                        font-weight: 200

            .support-count
                position: absolute
                height: 24px
                line-height: 24px
                right: 12px
                bottom: 18px
                padding: 0 8px
                border-radius: 14px
                .count
                    vertical-align: top
                    font-size: 10px
                    font-weight: 200px
                    margin-right: 2px
        .bulletin-wrapper
            position: relative
            height: 28px
            line-height: 28px
            padding: 0 22px
            background-color: rgb(7, 17, 27, 0.2)
            white-space: nowrap
            overflow: hidden
            text-overflow: ellipsis
            .bulletin-title
                display: inline-block
                vertical-align: top
                margin-top: 8px
                width: 22px
                height: 12px
                bg-image('bulletin')
                background-size: 22px 12px
                background-repeat: no-repeat
            .bulletin-text
                vertical-align: top
                margin: 0 4px
                font-size: 10px
                font-weight: 200
            .icon-keyboard_arrow_right
                position: absolute
                font-size: 10px
                right: 12px
                top: 10px
        .background
            position: absolute
            top: 0
            left: 0
            width: 100%
            height: 100%
            z-index: -1
            filter: blur(10px)
</style>
