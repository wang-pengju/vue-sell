<template>
  <transition name="move">
    <section class="foods" v-show="showFlag" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontral-wrapper">
            <cartcontral @add="addFood" :food="food"></cartcontral>
          </div>
          <transition name="fade">
            <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count===0">
              加入购物车
            </div>
          </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect @select="selectRating" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item border-1px">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" width="12" height="12" :src="rating.avatar">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</transition>
</template>

<script type="ecmascript-6">
  import BScroll from 'better-scroll';
  import Vue from 'vue';
  import cartcontral from 'components/cartcontral/cartcontral';
  import split from 'components/split/split';
  import ratingselect from 'components/ratingselect/ratingselect';
  import '../../common/js/filter.js' //时间格式过滤器

  const ALL = 2;

  export default {
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    methods: {
      show() {
        this.showFlag = true;
        this.selectType = ALL;
        this.onlyContent = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      hide() {
        this.showFlag = false;
      },
      addFirst(event) {
        if (!event._constructed) {
          return;
        }
        this.$emit('add', event.target);
        Vue.set(this.food, 'count', 1);
      },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      },
      addFood(target) {
        this.$emit('add', target);
      },
      selectRating(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      }
    },
    components: {
      cartcontral,
      split,
      ratingselect
    }
  };
</script>

<style rel="stylesheet" lang="less" scoped>
  @import "../../common/styles/mixin.less";
  .foods{
    position: fixed;
    left:0;
    top:0;
    bottom: 96/@r;
    z-index: 30;
    width: 100%;
    background: #fff;
    transform: translate3d(0, 0, 0);
    &.move-enter-active, &.move-leave-active{
      transition: all 0.2s linear;
    }
    &.move-enter, &.move-leave-active{
      transform: translate3d(100%, 0, 0);
    }
    .image-header{
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 100%;
      img{
        position: absolute;
        top:0;
        left:0;
        width:100%;
        height: 100%;
      }
      .back{
        position: absolute;
        top: 20/@r;
        left: 0;
        .icon-arrow_lift{
          display: block;
          padding: 20/@r;
          font-size: 40/@r;
          color: #fff;
        }
      }
    }
    .content{
      position: relative;
      padding:36/@r;
      .title{
        line-height: 28/@r;
        margin-bottom: 16/@r;
        font-size: 28/@r;
        font-weight: 700;
        color: rgb(7, 17, 27);
      }
      .detail{
        margin-bottom: 36/@r;
        line-height: 20/@r;
        height: 20/@r;
        font-size: 0;
        .sell-count,
        .rating{
          font-size: 20/@r;
          color:rgb(147, 153, 159);
        }
        .sell-count{
          margin-right: 24/@r;
        }
      }
      .price{
        font-weight: 700;
        line-height: 48/@r;
        .now{
          margin-right: 16/@r;
          font-size: 28/@r;
          color:rgb(240,20,20);
        }
        .old{
          text-decoration: line-through;
          font-size: 20/@r;
          color:rgb(147,153,159);
        }
      }
      .cartcontral-wrapper{
        position: absolute;
        right: 24/@r;
        bottom: 24/@r;
      }
      .buy{
        position: absolute;
        right: 36/@r;
        bottom: 36/@r;
        z-index: 10;
        height: 48/@r;
        line-height: 48/@r;
        padding:0 24/@r;
        box-sizing: border-box;
        border-radius: 24/@r;
        font-size: 20/@r;
        color:#fff;
        background: rgb(0, 160, 220);
        opacity: 1;
        &.fade-enter-active, &.fade-leave-active{
          transition: all 0.2s;
        }
        &.fade-enter, &.fade-leave-active{
          opacity: 0;
          z-index: -1;
        }
      }
    }
    .info{
      padding:36/@r;
      .title{
        line-height: 28/@r;
        margin-bottom: 12/@r;
        font-size: 28/@r;
        color:rgb(7, 17, 27);
      }
      .text{
        line-height: 48/@r;
        padding:0 16/@r;
        font-size: 24/@r;
        color:rgb(77, 85, 93);
        font-weight: 200;
      }
    }
    .rating{
      padding-top: 36/@r;
      .title{
        line-height: 28/@r;
        margin-left: 36/@r;
        font-size: 28/@r;
        color:rgb(7, 17, 27);
      }
      .rating-wrapper{
        padding:0 36/@r;
        .rating-item{
          position: relative;
          padding: 32/@r 0;
          .border-1px(rgba(7, 17, 27, 0.1));
          .user{
            position: absolute;
            right: 0;
            top: 32/@r;
            line-height: 24/@r;
            font-size: 0;
            .name{
              display: inline-block;
              margin-right: 12/@r;
              vertical-align: top;
              font-size: 20/@r;
              color:rgb(147, 153, 159);
            }
            .avatar{
              border-radius: 50%;
            }
          }
          .time{
            margin-bottom: 12/@r;
            line-height: 24/@r;
            font-size: 20/@r;
            color: rgb(147, 153, 159);
          }
          .text{
            line-height: 32/@r;
            font-size: 24/@r;
            color: rgb(7, 17, 27);
            .icon-thumb_up,
            .icon-thumb_down{
              margin-right: 8/@r;
              line-height: 24/@r;
              font-size: 24/@r;
            }
            .icon-thumb_up{
              color: rgb(0, 160, 220);
            }
            .icon-thumb_down{
              color: rgb(147, 153, 159);
            }
          }
        }
        .no-rating{
          padding: 32/@r 0;
          font-size: 24/@r;
          color:rgb(147, 153, 159);
        }
      }
    }
  }
</style>