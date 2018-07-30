<template>
    <div class="star" :class="starType">
        <span class="star-item" v-for="(starClass, index) in starClasses" :class="starClass" :key="index"></span>
    </div>
</template>

<script>
    export default {
        props: {
            size: Number,
            score: Number
        },
        computed: {
            starType: function () {
                return 'star-' + this.size
            },
            starClasses: function () {
                let result = []
                let onStars = Math.floor(this.score)
                let halfStars = this.score - onStars >= 0.5 ? 1 : 0
                let offStars = this.score - onStars - halfStars
                for (let i = 0; i < onStars; i++) {
                    result.push('on')
                }
                for (let i = 0; i < halfStars; i++) {
                    result.push('half')
                }
                for (let i = 0; i < offStars; i++) {
                    result.push('off')
                }
                return result
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.star
    .star-item
        display: inline-block
        background-repeat: no-repeat
    &.star-48
        .star-item
            width: 20px
            height: 20px
            margin-right: 22px
            background-size: 20px 20px
            &:last-child
                margin-right: 0
            &.on
                bg-image('star48_on')
            &.half
                bg-image('star48_half')
            &.off
                bg-image('star48_off')
    &.star-36
        .star-item
            width: 15px
            height: 15px
            margin-right: 6px
            background-size: 15px 15px
            &:last-child
                margin-right: 0
            &.on
                bg-image('star36_on')
            &.half
                bg-image('star36_half')
            &.off
                bg-image('star36_off')
    &.star-24
        .star-item
            width: 10px
            height: 10px
            margin-right: 3px
            background-size: 10px 10px
            &:last-child
                margin-right: 0
            &.on
                bg-image('star24_on')
            &.half
                bg-image('star24_half')
            &.off
                bg-image('star24_off')

</style>
