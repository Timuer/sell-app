<template>
  <div class="comment-wrapper" ref="cmt">
    <div class="comment">
      <div class="overview">
        <div class="overview-left">
          <div class="score-detail">
            <div class="score">{{seller.score}}</div>
            <div class="score-type">综合评分</div>
            <div class="score-desc">高于周边商家{{seller.rankrate}}%</div>
          </div>
        </div>
        <div class="overview-right">
          <div class="score-star">
            <div class="score-wrapper">
              <div class="title">服务态度</div>
              <star class="stars" :size="36" :score="seller.serviceScore"></star>
              <div class="score">{{seller.serviceScore}}</div>
            </div>
            <div class="score-wrapper">
              <div class="title">商品评分</div>
              <star class="stars" :size="36" :score="seller.foodScore"></star>
              <div class="score">{{seller.foodScore}}</div>
            </div>
            <div class="delivery-wrapper">
              <div class="title">送达时间</div>
              <div class="time">{{seller.deliveryTime}}分钟</div>
            </div>
          </div>
        </div>
      </div>
      <split></split>
      <div class="ratingselect-wrapper">
        <ratingselect :ratings="ratings" v-on:select-type="handleSelect" :selected-type="rateType"></ratingselect>
      </div>
      <div class="ratings-wrapper">
        <ul class="ratings-content">
          <li class="rating-item" v-show="willShow(item.rateType)" v-for="(item, index) in ratings" :key="index">
            <div class="rating-avatar">
              <img :src="item.avatar">
            </div>
            <div class="rating-detail">
              <div class="rating-username">{{item.username}}</div>
              <div class="rating-star-wrapper">
                <star class="rating-stars" :size="24" :score="item.score"></star>
                <div class="delivery-time" v-show="item.deliveryTime">{{item.deliveryTime}}分钟送达</div>
              </div>
              <div class="rating-text">{{item.text || '此用户没有评价'}}</div>
              <div class="rating-recommends">
                <span v-for="(r, i) in item.recommend" :key="i">
                  {{r}}
                </span>
              </div>
              <div class="rating-time">
                {{item.rateTime | dateFormater}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="ecmascript-6">
import BScroll from 'better-scroll'
import {ajax} from '../../common/js/utils.js'
import star from '../star/star.vue'
import split from '../split/split.vue'
import ratingselect from '../ratingselect/ratingselect.vue'

const ALL = 2

export default {
  data () {
    return {
      goods: [],
      seller: [],
      ratings: [],
      rateType: ALL
    }
  },
  created: function () {
    ajax('GET', '/data.json', null, (responseText) => {
      let obj = JSON.parse(responseText)
      this.goods = obj.goods
      this.seller = obj.seller
      this.ratings = obj.ratings
      this.$nextTick(() => {
        this._initScroll()
      })
    })
  },
  filters: {
    dateFormater (d) {
      let dt = new Date(d)
      return dt.toLocaleString()
    }
  },
  methods: {
    _initScroll () {
      console.log('inited')
      this.scroll = new BScroll(this.$refs.cmt, {
        click: true
      })
    },
    handleSelect (type) {
      this.rateType = type
    },
    willShow (type) {
      return this.rateType === 2 || type === this.rateType
    }
  },
  components: {
    star,
    split,
    ratingselect
  }
}
</script>

<style lang="stylus">
.comment-wrapper
  position: absolute
  top: 174px
  bottom: 0
  letf 0
  width: 100%
  overflow: hidden
  .overview
    display flex
    .overview-left
      flex 1
      padding 18px 0
      .score-detail
        text-align center
        border-right 1px solid RGB(7, 17, 27, 0.1)
        .score
          font-size 24px
          line-height 28px
          color RGB(255, 153, 0)
          margin-bottom 6px
        .score-type
          font-size 12px
          line-height 12px
          color RGB(7, 17, 27)
          margin-bottom 8px
        .score-desc
          font-size 10px
          line-height 10px
          color RGB(147, 153, 159)
          margin-bottom 6px
    .overview-right
      flex 2
      padding 18px 0
      .score-star
        padding 0 24px
        .score-wrapper
          margin-bottom 8px
          .title
            display inline-block
            font-size 16px
            font-weight 700
            vertical-align top
          .stars
            display inline-block
            margin-left 12px
            vertical-align top
          .score
            display inline-block
            font-size 16px
            color RGB(255, 153, 0)
            margin-left 12px
        .delivery-wrapper
          .title
            display inline-block
            font-size 16px
            font-weight 700
            vertical-align top
          .time
            display inline-block
            margin-left 12px
            vertical-align top
            color RGB(147, 153, 159)
  .ratingselect-wrapper
    padding 18px
    border-bottom 1px solid RGB(7, 17, 27, 0.2)
  .ratings-wrapper
    padding 0 18px
    .ratings-content
      .rating-item
        display flex
        position relative
        padding 18px 0
        border-bottom 1px solid RGB(7, 17, 27, 0.1)
        .rating-avatar
          flex 0 0 58px
          img
            width 36px
            height 36px
            border-radius 50%
        .rating-detail
          flex 1
          .rating-username
            font-size 10px
            color RGB(7, 17, 27)
            line-height 12px
            margin-bottom 4px
          .rating-star-wrapper
            .rating-stars
              display inline-block
              margin-top 4px
            .delivery-time
              display inline-block
              font-size 10px
              font-weight 200
              color RGB(147, 153, 159)
              line-height 12px
              margin-top 4px
              margin-left 6px
          .rating-text
            font-size 12px
            color RGB(7, 17, 27)
            line-height 18px
            margin-bottom 6px
            margin-top 6px
          .rating-recommends
            span
              display inline-block
              padding 6px
              margin 8px 8px 0 0
              border 1px solid RGBA(7, 17, 27, 0.1)
              border-radius 2px
              font-size 9px
              color RGB(147, 153, 159)
              line-height 16px
          .rating-time
            position absolute
            right 18px
            top 18px
            font-size 10px
            font-weight 200
            color RGB(147, 153, 159)
            line-height 12px
</style>
