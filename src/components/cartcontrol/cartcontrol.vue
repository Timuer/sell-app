<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" @click.stop="decreaseFood" v-show="food.count>0">
        <div class="icon-remove_circle_outline"></div>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-increase" @click.stop="addFood" ref="increase">
      <span class="icon-add_circle"></span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addFood () {
      if (this.food.count) {
        this.food.count += 1
      } else {
        Vue.set(this.food, 'count', 1)
      }
      this.$emit('drop-ball', this.$refs.increase)
    },
    decreaseFood () {
      this.food.count -= 1
    }
  }
}
</script>

<style lang="stylus" scoped>
.cartcontrol
  height 24px
  .cart-decrease
    display inline-block
    font-size 24px
    line-height 24px
    transform translateX(0)
    color RGB(0, 160, 220)
    &.move-enter
      opacity 0
      transform translateX(48px)
    &.move-leave-to
      opacity 0
      transform translateX(24px)
    &.move-enter-active
      transition all .3s ease
    &.move-leave-active
      transition all .3s ease
  .cart-count
    display inline-block
    width 24px
    height 24px
    line-height 30px
    text-align center
    vertical-align top
    font-size 10px
    color RGB(147, 153, 159)
  .cart-increase
    display inline-block
    font-size 24px
    line-height 24px
    color RGB(0, 160, 220)
</style>
