<template>
  <article class="ratingsArea" ref="ratings">
    <div class="ratingsArea-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="service">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="service">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="service">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect @select="selectRating" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent" :ratings="ratings"></ratingselect>
      <div class="rating-container">
        <ul>
          <li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType, rating.text)">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar" alt="">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span class="item" v-for="item in rating.recommend">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </article>
</template>

<script type="ecmascript-6">
  import BScroll from 'better-scroll';
  import '../../common/js/filter.js';
  import star from 'components/star/star';
  import ratingselect from 'components/ratingselect/ratingselect';
  import split from 'components/split/split';

  const ALL = 2;
  const ERR_OK = 0;

  export default {
    name:'ratings',
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: true
      };
    },
    created() {
      this.$http.get('/api/ratings').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.ratings = response.data;
          this.$nextTick(() => {
            /*console.log(this.$refs.ratings);*/
            this.scroll = new BScroll(this.$refs.ratings, {
              click: true
            });
          });
        }
      });
    },
    methods: {
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
      star,
      split,
      ratingselect
    }
  };
</script>

<style rel="stylesheet" lang="less" scoped>
  @import "../../common/styles/mixin.less";

  .ratingsArea{
    position: absolute;
    top:348/@r;
    bottom: 0;
    left:0;
    width: 100%;
    overflow: hidden;
    .overview{
      display: flex;
      padding:36/@r 0;
      .overview-left{
        flex: 0 0 275/@r;
        padding: 12/@r 0;
        width: 275/@r;
        border-right: 1px solid rgba(7, 17, 27, 0.1);
        text-align: center;
        .score{
          line-height: 56/@r;
          font-size: 48/@r;
          color: rgb(255, 153, 0);
          margin-bottom: 12/@r;
        }
        .title{
          line-height: 24/@r;
          font-size: 24/@r;
          color:rgb(147, 153, 159);
          margin-bottom: 16/@r;
        }
        .rank{
          line-height: 20/@r;
          font-size: 20/@r;
          color:rgb(7, 17, 27); 
        }
      }
      .overview-right{
        flex: 1;
        padding: 12/@r 0 12/@r 48/@r;
        .score-wrapper{
          margin-bottom: 16/@r;
          font-size: 0;
          .service,
          .star,
          .score{
            display: inline-block;
            vertical-align: top;
          }
          .service{
            font-size: 24/@r;
            color: rgb(7, 17, 27);
            line-height: 36/@r;
          }
          .star{
            margin: 0 24/@r;
          }
          .score{
            font-size: 24/@r;
            color: rgb(255, 153, 0);
            line-height: 36/@r;
          }
        }
        .delivery-wrapper{
          font-size: 0;
          .service{
            font-size: 24/@r;
            color: rgb(7, 17, 27);
            line-height: 36/@r;
            vertical-align: top;
          }
          .delivery{
            font-size: 24/@r;
            color:rgb(147, 153, 159);
            margin-left: 24/@r;
            line-height: 36/@r;
          }
        }
      }
    }
    .rating-container{
      padding: 0 36/@r;
      .rating-item{
        display: flex;
        padding: 36/@r 0;
        .border-1px(rgba(7, 17, 27, 0.1));
        .avatar{
          flex: 0 0 56/@r;
          width: 56/@r;
          margin-right: 24/@r;
          img{
            border-radius: 50%;
          }
        }
        .content{
          position: relative;
          flex: 1;
          .name{
            margin-bottom: 8/@r;
            line-height: 24/@r;
            font-size: 20/@r;
            color:rgb(7, 17, 27);
          }
          .star-wrapper{
            margin-bottom: 12/@r;
            font-size: 0;
            .star,
            .delivery{
              display: inline-block;
              vertical-align: top;
            }
            .star{
              margin-right: 12/@r;   
            }
            .delivery{
              line-height: 24/@r;
              font-size: 20/@r;
              color:rgb(147, 153, 159);
            }
          }
          .text{
            margin-bottom: 16/@r;
            line-height: 36/@r;
            color:rgb(7, 17, 27);
            font-size: 24/@r;
          }
          .recommend{
            line-height: 32/@r;
            font-size: 0;
            .icon-thumb_up,
            .item{
              display: inline-block;
              margin: 0 16/@r 8/@r 0;
              font-size: 18/@r;
            }
            .icon-thumb_up{
              color: rgb(0, 160, 220);
            }
            .item{
              padding: 0 12/@r;
              border:1px solid rgba(7, 17, 27, 0.1);
              border-radius: 1px;
              color: rgb(147, 153, 159);
              background: #fff;
            }
          }
          .time{
            position: absolute;
            top: 0;
            right: 0;
            line-height: 24/@r;
            font-size: 20/@r;
            color: rgb(147, 153, 159);
          }
        }
      }
    }
  }
</style>