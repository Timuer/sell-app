<template>
  <div class="rating-type">
    <div class="all" @click.stop="select(2)" :class="{'active': type===2}">
      <span class="text">{{desc.all}}</span>
      <span class="count">{{ratings.length}}</span>
    </div>
    <div class="positive" @click.stop="select(0)" :class="{'active': type===0}">
      <span class="text">{{desc.positive}}</span>
      <span class="count">{{positives.length}}</span>
    </div>
    <div class="negative" @click.stop="select(1)" :class="{'active': type===1}">
      <span class="text">{{desc.negative}}</span>
      <span class="count">{{negatives.length}}</span>
    </div>
  </div>
</template>

<script>
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2

export default {
  props: {
    ratings: {
      type: Array,
      default () {
        return []
      }
    },
    selectedType: {
      type: Number,
      default () {
        return ALL
      }
    },
    desc: {
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  },
  data () {
    return {
      type: this.selectedType
    }
  },
  computed: {
    positives () {
      return this.ratings.filter((r) => {
        return r.rateType === POSITIVE
      })
    },
    negatives () {
      return this.ratings.filter((r) => {
        return r.rateType === NEGATIVE
      })
    }
  },
  methods: {
    select (type) {
      this.type = type
      this.$emit('select-type', type)
    }
  }
}
</script>

<style lang="stylus" scoped>
.rating-type
  .all
    display inline-block
    padding 8px 12px
    margin-right 8px
    border-radius 6px
    color RGB(77, 85, 93)
    background RGB(0, 160, 220, 0.2)
    .text
      display inline-block
      font-size 13px
      line-height 13px
      height 13px
      margin-right 5px
    .count
      display inline-block
      font-size 10px
      line-height 10px
      height 10px
    &.active
      color #fff
      background RGB(0, 160, 220)
  .positive
    display inline-block
    padding 8px 12px
    margin-right 8px
    border-radius 6px
    color RGB(77, 85, 93)
    background RGB(0, 160, 220, 0.2)
    .text
      display inline-block
      font-size 13px
      line-height 13px
      height 13px
      margin-right 5px
    .count
      display inline-block
      font-size 10px
      line-height 10px
      height 10px
    &.active
      color #fff
      background RGB(0, 160, 220)
  .negative
    display inline-block
    padding 8px 12px
    margin-right 8px
    border-radius 6px
    color RGB(77, 85, 93)
    background RGB(77, 85, 93, 0.2)
    .text
      display inline-block
      font-size 13px
      line-height 13px
      height 13px
      margin-right 5px
    .count
      display inline-block
      font-size 10px
      line-height 10px
      height 10px
    &.active
      color #fff
      background RGB(77, 85, 93)
</style>
