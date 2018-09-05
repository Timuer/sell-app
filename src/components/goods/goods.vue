<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menu">
            <ul>
               <li class="menu-item" v-for="(item, index) in goods" :class="{'current': currentIndex === index}" :key="index">
                   <span class="content">
                       <span class="icon" v-if="item.type>0" :class="classMap[item.type]"></span>
                       <span class="text">{{item.name}}</span>
                   </span>
               </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foods">
            <ul>
                <li class="food-list food-list-hook" v-for="(item, index) in goods" :key="index">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li @click="clickFood(food)" class="food-item" v-for="(food, index) in item.foods" :key="index">
                            <div class="icon">
                                <img width="47" height="47" :src="food.icon" alt="">
                            </div>
                            <div class="content">
                                <h2 class="name">
                                    {{food.name}}
                                </h2>
                                <div class="description">{{food.description}}</div>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}份</span>
                                    <span class="rating">好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">￥{{food.price}}</div>
                            </div>
                            <div class="cartcontrol-wrapper">
                              <cartcontrol v-on:drop-ball="dropBall" :food="food"></cartcontrol>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <food v-on:drop-ball="dropBall" :food="clickedFood" ref="food"></food>
        <shopcart ref="cart" :food-selected="foodSelected" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
    </div>
</template>

<script>
    import {ajax} from '../../common/js/utils.js'
    import BScroll from 'better-scroll'
    import shopcart from '../shopcart/shopcart.vue'
    import cartcontrol from '../cartcontrol/cartcontrol.vue'
    import food from '../food/food.vue'

    export default {
        data () {
            return {
                goods: [],
                seller: [],
                heights: [],
                posY: 0,
                clickedFood: {}
            }
        },
        created: function () {
            ajax('GET', '/data.json', null, (responseText) => {
              let obj = JSON.parse(responseText)
              this.goods = obj.goods
              this.seller = obj.seller
              this.$nextTick(() => {
                this._initScroll()
                this._calcHeights()
                this.foodsScroll.on('scroll', (pos) => {
                  this.posY = Math.abs(Math.round(pos.y))
                })
              })
            })
            this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
        },
        computed: {
          currentIndex () {
            let y = this.posY
            let len = this.heights.length
            for (let i = 0; i < len; i++) {
              const h1 = this.heights[i]
              const h2 = this.heights[i + 1]
              if (!h2 || (y > h1 && y < h2)) {
                return i
              }
            }
          },
          foodSelected () {
            let selected = []
            this.goods.forEach((good) => {
              good.foods.forEach((food) => {
                if (food.count && food.count > 0) {
                  selected.push(food)
                }
              })
            })
            return selected
          }
        },
        methods: {
          _initScroll () {
            this.menuScroll = new BScroll(this.$refs.menu, {
              click: true
            })
            this.foodsScroll = new BScroll(this.$refs.foods, {
              click: true,
              probeType: 3
            })
          },
          _calcHeights () {
            let foodList = this.$refs.foods.getElementsByClassName('food-list-hook')
            let height = 0
            this.heights.push(height)
            for (let i = 0; i < foodList.length; i++) {
              const element = foodList[i]
              height += element.clientHeight
              this.heights.push(height)
            }
          },
          clickFood (food) {
            this.clickedFood = food
            this.$refs.food.show()
          },
          dropBall (target) {
            console.log('dropball')
            this.$refs.cart.drop(target)
          }
        },
        components: {
          'shopcart': shopcart,
          'cartcontrol': cartcontrol,
          'food': food
        }
    }
</script>

<style lang="stylus">
    @import "../../common/stylus/mixin.styl"
    .goods
        position: absolute
        display: flex
        top: 174px
        bottom: 58px
        width: 100%
        overflow: hidden
        .menu-wrapper
            flex: 0 0 80px
            background-color: #f3f5f7
            .menu-item
                height: 54px
                width: 56px
                display: table
                padding: 0 12px
                border-1px(rgba(7, 17, 27, 0.1))
                &.current
                  background: #fff
                  font-weight: 700
                .content
                    line-height: 14px
                    display: table-cell
                    vertical-align: middle
                    .icon
                        display: inline-block
                        width: 12px
                        height: 12px
                        vertical-align: top
                        background-size: 12px 12px
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
                        vertical-align: top
                        font-size: 12px
        .foods-wrapper
            flex: 1
            .title
                height: 26px
                line-height: 26px
                padding-left: 14px
                font-size: 12px
                border-left: 2px solid #d9dde1
                color: rgb(147, 153, 169)
                background: #f3f5f7
            .food-item
                display: flex
                padding: 18px
                position relative
                .icon
                    flex: 0 0 47px
                    margin-right: 10px
                .content
                  .name
                      margin: 2px 0px 8px 0px
                      font-size: 14px
                      font-weight: bold
                      height: 14px
                      line-height: 14px
                      color: rgb(7, 17, 27)
                  .description
                      margin-bottom: 8px
                      font-size: 10px
                      color: rgb(147, 153, 159)
                      line-height: 10px
                  .extra
                      font-size: 10px
                      color: rgb(147, 153, 159)
                      line-height: 10px
                      .count
                              margin-right: 12px
                  .price
                      color: red
                      font-size: 14px
                      font-weight: 700
                      line-height: 24px
                .cartcontrol-wrapper
                  position absolute
                  height 24px
                  right 18px
                  bottom 20px
</style>
