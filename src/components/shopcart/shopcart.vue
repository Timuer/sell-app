<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight': totalPrice>0}">
              <span class="icon-shopping_cart"></span>
          </div>
          <div class="count" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight': totalPrice>0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <button :class="{'highlight': isEnough}">{{desc}}</button>
      </div>
    </div>
    <transition-group
      name="drop"
      @before-enter="beforeBallEnter"
      @enter="ballEnter"
      @after-enter="afterEnter"
    >
      <div class="ball-container" v-for="(ball, index) in balls" :key="index" v-show="ball.show">
        <div class="ball"></div>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropedBalls: []
    }
  },
  props: {
    foodSelected: {
      type: Array,
      default () {
        return [
          {
            price: 20,
            count: 2
          }
        ]
      }
    },
    minPrice: {
      type: Number,
      default: 0
    },
    deliveryPrice: {
      type: Number,
      default: 0
    }
  },
  computed: {
    totalCount () {
      let count = 0
      this.foodSelected.forEach((food) => {
        count += food.count
      })
      return count
    },
    totalPrice () {
      let price = 0
      this.foodSelected.forEach((food) => {
        let sum = food.price * food.count
        price += sum
      })
      return price
    },
    desc () {
      if (this.totalPrice === 0) {
        return `最低￥${this.minPrice}起送`
      }
      let diff = this.minPrice - this.totalPrice
      if (diff > 0) {
        return `还差￥${diff}起送`
      } else {
        return '去结算'
      }
    },
    isEnough () {
      return this.minPrice - this.totalPrice <= 0
    }
  },
  methods: {
    drop (target) {
      // 小球最终落入的篮子的偏移量
      var BALL_LEFT = 35
      var BALL_BOTTOM = 24
      var rect = target.getBoundingClientRect()
      // 计算小球最终状态与初始状态的水平和垂直距离
      var horizontal = rect.left - BALL_LEFT
      var vertical = window.innerHeight - BALL_BOTTOM - rect.top
      let len = this.balls.length
      for (let i = 0; i < len; i++) {
        if (!this.balls[i].show) {
          let ball = this.balls[i]
          ball.show = true
          ball.horizontal = horizontal
          ball.vertical = vertical
          this.currBall = ball
          this.dropedBalls.push(ball)
          return
        }
      }
    },
    // 根据一个已知坐标点（小球最终坐标）和对称轴（小球初始坐标x向左偏移20）得出抛物线方程
    getFunc (x1, y1) {
      let a = y1 / (Math.pow(x1 + 20, 2) - 400)
      return (x) => {
        return a * Math.pow(x + 20, 2) - 400 * a
      }
    },
    beforeBallEnter (el) {
      let b = this.currBall
      el.style.display = ''
      el.style.transform = `translate3d(${b.horizontal}px, ${-b.vertical}px, 0)`
    },
    ballEnter (el, done) {
      let b = this.currBall
      let w = b.horizontal
      let h = b.vertical
      let f = this.getFunc(-w, -h)
      let x = 0
      let y = 0
      let translateX = w
      let translateY = -h
      let interval = setInterval(() => {
        if (translateX > 0 && translateY < 0) {
          el.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`
          x -= 20
          y = f(x)
          // 坐标转换
          translateX = w + x
          translateY = -(y + h)
        } else {
          clearInterval(interval)
          done()
        }
      }, 20)
    },
    afterEnter (el) {
      let b = this.dropedBalls.shift()
      if (b) {
        b.show = false
      }
      el.style.display = 'none'
    }
  }
}
</script>

<style lang="stylus" scoped>
.shopcart
  position fixed
  left 0px
  bottom 0px
  height 48px
  width 100%
  z-index 50
  background RGB(20, 29, 39)
  color RGB(128, 133, 138)
  font-size 0px
  .content
    display flex
    .content-left
      flex 1
      position relative
      .logo-wrapper
        width 48px
        height 48px
        position absolute
        top -10px
        left 12px
        padding: 6px
        border-radius 50%
        background RGB(20, 29, 39)
        .count
          position absolute
          top 0px
          right 0px
          width 24px
          font-size 10px
          height 16px
          line-height 16px
          border-radius 10px
          text-align center
          color #fff
          background RGB(240, 20, 20)
        .logo
          width 100%
          height 100%
          text-align center
          line-height 48px
          border-radius 50%
          background RGB(43, 52, 60)
          &.highlight
            color #fff
            background RGB(0, 160, 220)
          .icon-shopping_cart
            position absolute
            top 50%
            left 50%
            transform translate(-50%, -50%)
            font-size 30px
      .price
        display inline-block
        margin 0 12px 0 80px
        line-height 48px
        font-size 20px
        &.highlight
          color #fff
      .desc
        display inline-block
        margin-left 12px
        line-height 48px
        font-size 12px
    .content-right
      flex 0 0 105px
      button
        width 100%
        height 100%
        font-size 12px
        border none
        color RGB(255, 255, 255, 0.4)
        background RGB(43, 51, 59)
        &.highlight
          color #fff
          background RGB(17, 151, 77)
  .ball-container
    position fixed
    width 15px
    height 15px
    bottom 24px
    left 35px
    z-index 200
    .ball
      width 15px
      height 15px
      background RGB(241, 17, 23)
      border-radius 50%
</style>
