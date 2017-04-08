<template>
  <section class="ratingselect">
    <div class="rating-type border-1px">
      <span @click="select(2,$event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<i class="count">{{ratings.length}}</i></span>
      <span @click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<i class="count">{{positives.length}}</i></span>
      <span @click="select(1,$event)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<i class="count">{{negatives.length}}</i></span>
    </div>
    <div @click="toggleContent" class="switch" :class="{'on':onlyContent}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </section>
</template>

<script type="ecmascript-6">
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;

  export default {
    props: {
      ratings: {
        type: Array,
        default() {
          return [];
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
    },
    computed: {
      positives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        });
      },
      negatives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        });
      }
    },
    methods: {
      select(type, event) {
        if (!event._constructed) {
          return;
        }
        this.$emit('select', type);
      },
      toggleContent(event) {
        if (!event._constructed) {
          return;
        }
        this.$emit('toggle');
      }
    }
  };
</script>

<style rel="stylesheet" lang="less" scoped>
  @import "../../common/styles/mixin.less";
  .ratingselect{
    .rating-type{
      padding:36/@r 0;
      margin: 0 36/@r;
      font-size: 0;
      .border-1px(rgba(7, 17, 27, 0.1));
      .block{
        display: inline-block;
        padding: 16/@r 24/@r;
        margin-right: 16/@r;
        border-radius: 2/@r;
        color:rgb(77, 85, 93);
        font-size: 24/@r;
        line-height: 32/@r;
        &.active{
          color: #fff;
        }
        &.positive{
          background: rgba(0, 160, 220, 0.2);
          &.active{
            background: rgb(0, 160, 220);
          }
        }
        &.negative{
          background: rgba(77, 85, 93, 0.2);
          &.active{
            background: rgb(77, 85, 93);
          }
        }
        .count{
          font-style: normal;
          font-size: 16/@r;
          margin-left: 4/@r;
        }
      }
    }
    .switch{
      padding: 24/@r 36/@r;
      line-height: 48/@r;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      color:rgb(147, 153, 159);
      font-size: 0;
      &.on{
        .icon-check_circle{
          color: #00c850;
        }
      }
      span{
        display: inline-block;
        vertical-align: top;
      }
      .icon-check_circle{
        margin-right: 8/@r;
        font-size: 48/@r;
      }
      .text{
        font-size: 24/@r;
      }
    }
  }
</style>