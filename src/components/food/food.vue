<template>
  <div class="food-detail" v-show="isShow" ref="content">
    <div class="food-content">
      <div class="image-header">
        <img :src="food.image">
        <div class="backward">
          <i @click.stop="unshow" class="icon-arrow_lift"></i>
        </div>
      </div>
      <div class="content">
        <h1 class="title">{{food.name}}</h1>
        <div class="detail">
          <span class="sell-count">月售{{food.sellCount}}份</span>
          <span class="rating">好评率{{food.rating}}%</span>
        </div>
        <div class="price">
          <span>￥{{food.price}}</span>
        </div>
        <div class="cartcontrol-wrapper" ref="ctl">
          <cartcontrol v-on:drop-ball="dropBall" class="control" :food="food"></cartcontrol>
        </div>
        <div class="addToCart" @click.stop="addFirst" v-show="!food.count || food.count==0" ref="firstCtl">
          <span>加入购物车</span>
        </div>
      </div>
      <split></split>
      <div class="desc-wrapper">
        <h1 class="title">商品介绍</h1>
        <div class="detail">{{food.info}}</div>
      </div>
      <split></split>
      <div class="rating">
        <h1 class="rating-title">商品评价</h1>
        <div class="ratingselect-wrapper">
          <ratingselect v-on:select-type="handleSelect" :ratings="food.ratings" :desc="desc" :selected-type="rateType"></ratingselect>
        </div>
        <ul class="rating-list">
          <li class="rating-content" v-show="willShow(item.rateType)" v-for="(item, index) in food.ratings" :key="index">
            <div class="time">{{item.rateTime | dateFormater}}</div>
            <div class="text">{{item.text || '此用户没有填写评价'}}</div>
            <div class="user">
              <div class="username">{{item.username}}</div>
              <div class="avatar">
                <img :src="item.avatar">
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import cartcontrol from '../cartcontrol/cartcontrol.vue'
import split from '../split/split.vue'
import ratingselect from '../ratingselect/ratingselect.vue'
import Vue from 'vue'

export default {
  props: {
    food: {
      type: Object
    }
  },
  data () {
    return {
      isShow: false,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      },
      rateType: 2
    }
  },
  methods: {
    show () {
      this.isShow = true
      this.$nextTick(() => {
        if (this.scroll) {
          this.scroll.refresh()
        } else {
          this.scroll = new BScroll(this.$refs.content, {
            click: true
          })
        }
      })
    },
    unshow () {
      console.log('clicked')
      this.isShow = false
    },
    addFirst () {
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      }
      this.$emit('drop-ball', this.$refs.firstCtl)
    },
    willShow (type) {
      return this.rateType === 2 || type === this.rateType
    },
    handleSelect (type) {
      // console.log('handle select')
      this.rateType = type
    },
    dropBall () {
      this.$emit('drop-ball', this.$refs.ctl)
    }
  },
  filters: {
    dateFormater (d) {
      let dt = new Date(d)
      return dt.toLocaleString()
    }
  },
  components: {
    cartcontrol,
    split,
    ratingselect
  }
}
</script>

<style lang="stylus" scoped>
.food-detail
  position fixed
  top 0
  left 0
  width 100%
  bottom 48px
  z-index 30
  background #fff
  transition all 0.5 ease
  .food-content
    .image-header
      position relative
      img
        width 100%
      .backward
        position absolute
        left 10px
        top 10px
        .icon-arrow_lift
          display block
          padding 10px
          color #fff
    .content
      padding 18px 0 0 18px
      height 110px
      position relative
      .title
        margin-bottom 8px
        line-height 14px
        font-size 14px
        font-weight 700
        color RGB(7, 17, 27)
      .detail
        margin-bottom 18px
        height 10px
        line-height 10px
        font-size 10px
        color RGB(147, 153, 159)
        .sell-count
          display inline-block
          margin-right 12px
        .rating
          display inline-block
      .price
        line-height 24px
        height 24px
        padding 10px 0
        font-size 14px
        font-weight 700
        color RGB(240, 20, 20)
      .cartcontrol-wrapper
        position absolute
        right 18px
        bottom 18px
      .addToCart
        position absolute
        right 18px
        bottom 18px
        width 74px
        height 24px
        text-align center
        border-radius 12px
        background RGB(0, 160, 220)
        span
          display inline-block
          line-height 24px
          font-size 10px
          color #fff
    .desc-wrapper
      padding 18px
      .title
        font-size 16px
        font-weight 700
        margin-bottom 12px
      .detail
        padding-left 8px
        font-size 12px
        font-weight 200
        color RGB(77, 85, 93)
        line-height 24px
    .rating
      padding 18px
      .rating-title
        margin-bottom 18px
      .rating-list
        margin-top 20px
        border-top 1px solid RGB(7, 17, 27, 0.1)
        .rating-content
          padding 16px
          position relative
          border-bottom 1px solid RGB(7, 17, 27, 0.1)
          .time
            line-height 12px
            font-size 10px
            color RGB(147, 153, 159)
          .text
            margin-top 6px
            line-height 16px
            font-size 12px
            color RGB(7, 17, 27)
          .user
            position absolute
            right 16px
            top 16px
            .username
              display inline-block
              line-height 24px
              font-size 14px
              vertical-align top
              color RGB(147, 153, 159)
            .avatar
              display inline-block
              margin-left 6px
              img
                width 24px
                height 24px
                border-radius 50%
</style>
