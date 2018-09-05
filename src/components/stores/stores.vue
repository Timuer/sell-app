<template>
    <div class="store-wrapper" ref="store">
        <div class="store-content">
          <div class="overview">
            <h1 class="store-name">{{seller.name}}</h1>
            <star class="store-star" :size="36" :score="seller.score"></star>
            <span class="rate-count">({{seller.ratingCount}})</span>
            <span class="sell-count">月售{{seller.sellCount}}单</span>
            <ul class="info">
              <li>
                <div class="title">起送价</div>
                <div class="content">
                  <span class="num">{{seller.minPrice}}</span>
                  <span class="suffix">元</span>
                </div>
              </li>
              <li>
                <div class="title">商家配送</div>
                <div class="content">
                  <span class="num">{{seller.deliveryPrice}}</span>
                  <span class="suffix">元</span>
                </div>
              </li>
              <li>
                <div class="title">平均配送时间</div>
                <div class="content">
                  <span class="num">{{seller.deliveryTime}}</span>
                  <span class="suffix">分钟</span>
                </div>
              </li>
            </ul>
            <div class="favorite">
              <span class="icon-favorite" :class="{'active':isFavorite}" @click="toggleFavorite"></span>
              <span class="favorite-text">{{favorite}}</span>
            </div>
          </div>
          <split></split>
          <div class="bulletin-wrapper">
            <div class="bulletin-content">
              <h1 class="bulletin-title">公告与活动</h1>
              <p class="bulletin-text">{{seller.bulletin}}</p>
            </div>
            <ul class="supports" v-if="seller.supports">
                <li class="support-item" v-for="(support, index) in seller.supports" :key="index">
                    <i class="icon" :class="classMap[support.type]"></i>
                    <span class="text">{{support.description}}</span>
                </li>
            </ul>
          </div>
          <split></split>
          <h1 class="pic-title">商家实景</h1>
          <div class="store-pics" ref="imgs">
            <ul class="pic-list" ref="imgList">
              <li class="pic-item" v-for="(pic, index) in seller.pics" :key="index">
                <img :src="pic">
              </li>
            </ul>
          </div>
          <div class="infos-wrapper">
            <h1 class="infos-title">商家信息</h1>
            <ul class="infos">
              <li class="info" v-for="(item, index) in seller.infos" :key="index">{{item}}</li>
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
export default {
  data () {
    return {
      seller: {},
      isFavorite: false
    }
  },
  computed: {
    favorite () {
      return this.isFavorite ? '已收藏' : '收藏'
    }
  },
  created () {
    ajax('GET', '/data.json', null, (responseText) => {
      let obj = JSON.parse(responseText)
      this.seller = obj.seller
      this.$nextTick(() => {
        this._initImgListScroll(this.seller.pics)
      })
    })
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
  },
  watch: {
    // 监测seller，当被ajax传入的数据初始化后会触发
    seller () {
      console.log('watched')
      this._initContentScroll()
    }
  },
  methods: {
    _initContentScroll () {
      if (!this.contentScroll) {
        this.contentScroll = new BScroll(this.$refs.store, {
          click: true
        })
      } else {
        this.contentScroll.refresh()
      }
    },
    _initImgListScroll (imgList) {
      let w = this.calcImgListwWidth(imgList)
      this.$refs.imgList.style.width = w + 'px'
      this.$nextTick(() => {
        this.imgScroll = new BScroll(this.$refs.imgs, {
          scrollX: true,
          eventPassthrough: 'vertical'
        })
      })
    },
    calcImgListwWidth (imgList) {
      const WIDTH = 120
      const MARGIN = 6
      let width = 0
      for (let i = 0; i < imgList.length; i++) {
        width += WIDTH + MARGIN
      }
      return width
    },
    toggleFavorite () {
      this.isFavorite = !this.isFavorite
    }
  },
  components: {
    star,
    split
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
.store-wrapper
  position: absolute
  top: 174px
  bottom: 0
  letf 0
  width: 100%
  overflow: hidden
  .overview
    padding 18px
    position relative
    .store-name
      font-size 14px
      color RGB(7, 17, 27)
      line-height 14px
      margin-bottom 8px
      font-weight 700
    .store-star
      display inline-block
      margin-right 8px
      vertical-align top
    .rate-count
      display inline-block
      vertical-align top
      padding-top 2px
      margin-right 12px
      font-size 12px
      line-height 12px
      color RGB(77, 85, 93)
    .sell-count
      display inline-block
      vertical-align top
      padding-top 2px
      font-size 12px
      line-height 12px
      color RGB(77, 85, 93)
    .info
      margin-top 18px
      padding-top 18px
      border-top 1px solid RGBA(7, 17, 27, 0.1)
      display flex
      li
        flex 1
        border-right 1px solid RGBA(7, 17, 27, 0.1)
        &:last-child
          border-right none
        .title
          font-size 10px
          color RGB(147, 153, 159)
          line-height 10px
          text-align center
        .content
          text-align center
          color RGB(7, 17, 27)
          margin-top 4px
          .num
            font-size 24px
            font-weight 400
            line-height 24px
          .suffix
            font-size 10px
            font-weight 200
    .favorite
      position absolute
      right 18px
      top 18px
      width 50px
      text-align center
      .icon-favorite
        font-size 24px
        line-height 24px
        display block
        margin-bottom 4px
        &.active
          color RGB(240, 20, 20)
      .favorite-text
        display block
        font-size 10px
        color RGB(77, 85, 93)
        line-height 10px
  .bulletin-wrapper
    padding 18px
    .bulletin-content
      .bulletin-title
        font-size 14px
        font-weight 600
      .bulletin-text
        font-size 12px
        font-weight 200
        color RGB(240, 20, 20)
        line-height 24px
        padding 8px 12px 16px 12px
    .supports
      font-size: 10px
      font-weight: 200
      line-height: 12px
      .support-item
        padding 16px 12px
        border-top 1px solid RGBA(7, 17, 27, 0.1)
        &:last-child
          padding-bottom 0
        .icon
            display: inline-block
            vertical-align: top
            width: 16px
            height: 16px
            margin-right: 6px
            background-size: 16px 16px
            background-repeat: no-repeat
            &.decrease
                bg-image('decrease_3')
            &.discount
                bg-image('discount_3')
            &.guarantee
                bg-image('guarantee_3')
            &.invoice
                bg-image('invoice_3')
            &.special
                bg-image('special_3')
        .text
          display inline-block
          font-size: 12px
          line-height: 16px
          font-weight: 200
  .pic-title
    font-size 16px
    font-weight 600px
    margin 18px 0 12px 18px
  .store-pics
    margin 0 0 18px 18px
    height 90px
    width 100%
    white-space nowrap
    overflow hidden
    .pic-list
      font-size 0
      .pic-item
        display inline-block
        margin-right 6px
        img
          width 120px
          height 90px
  .infos-wrapper
    .infos-title
      font-size 16px
      font-weight 600px
      margin 18px 0 12px 18px
    .infos
      margin 0 18px
      .info
        padding 16px 12px
        font-size 12px
        line-height 16px
        font-weight 200
        border-top 1px solid RGBA(7, 17, 27, 0.1)
        color RGB(7, 17, 27)
</style>
