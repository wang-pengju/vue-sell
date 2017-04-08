<template>
  <article class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <span class="icon-favorite" :class="{'active':favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-1px">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item border-1px" v-for="(item,index) in seller.supports">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title border-1px">商家信息</h1>
        <ul>
          <li class="info-item" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-1px">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item border-1px" v-for="(item,index) in seller.supports">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
    </div>
  </article>
</template>

<script type="ecmascript-6">
  import BScroll from 'better-scroll';
  import star from 'components/star/star';
  import split from 'components/split/split';
  import {saveToLocal, loadFromLocal} from 'common/js/store';
  export default {
    name:'seller',
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        favorite: (() => {
          return loadFromLocal(this.seller.id, 'favorite', false);
        })()
      };
    },
    computed: {
      favoriteText() {
        return this.favorite ? '已收藏' : '收藏';
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    watch: {
      seller() {
        this.$nextTick(() => {
          this._initScroll();
          this._initPics();
        });
      }
    },
    mounted() {
      this.$nextTick(() => {
        this._initScroll();
        this._initPics();
      });
    },
    methods: {
      toggleFavorite(event) {
        if (!event._constructed) {
          return;
        }
        this.favorite = !this.favorite;
        saveToLocal(this.seller.id, 'favorite', this.favorite);
      },
      _initScroll() {
        console.log(this.seller);
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.seller, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      },
      _initPics() {
        if (this.seller.pics) {
          let picWidth = 120;
          let margin = 6;
          let width = (picWidth + margin) * this.seller.pics.length - margin;
          this.$refs.picList.style.width = width + 'px';
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.picWrapper, {
                scrollX: true,
                eventPassthrough: 'vertical'
              });
            } else {
              this.picScroll.refresh();
            }
          });
        }
      }
    },
    data() {
      return {
        favorite: (() => {
          return loadFromLocal(this.seller.id, 'favorite', false);
        })()
      };
    },
    computed: {
      favoriteText() {
        return this.favorite ? '已收藏' : '收藏';
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    mounted() {
      this.$nextTick(() => {
        this._initScroll();
        this._initPics();
      });
    },
    methods: {
      toggleFavorite(event) {
        if (!event._constructed) {
          return;
        }
        this.favorite = !this.favorite;
        saveToLocal(this.seller.id, 'favorite', this.favorite);
      },
      _initScroll() {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.seller, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      },
      _initPics() {
        if (this.seller.pics) {
          let picWidth = 120;
          let margin = 6;
          let width = (picWidth + margin) * this.seller.pics.length - margin;
          this.$refs.picList.style.width = width + 'px';
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.picWrapper, {
                scrollX: true,
                eventPassthrough: 'vertical'
              });
            } else {
              this.picScroll.refresh();
            }
          });
        }
      }
    },
    watch: {
      'seller'() {
        this.$nextTick(() => {
          this._initScroll();
          this._initPics();
        });
      }
    },
    components: {
      star,
      split
    }
  }
</script>

<style rel="stylesheet" lang="less" scoped>
  @import "../../common/styles/mixin.less";

  .seller{
    position: absolute;
    top: 348/@r;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .overview{
      position: relative;
      padding: 36/@r;
      .title{
        margin-bottom: 16/@r;
        line-height: 28/@r;
        color: rgb(7, 17, 27);
        font-size: 28/@r;
      }
      .desc{
        padding-bottom: 36/@r;
        font-size: 0;
        .border-1px(rgba(7, 17, 27, 0.1));
        .star{
          display: inline-block;
          margin-right: 16/@r;
          vertical-align: top;
        }
        .text{
          margin-right: 24/@r;
          display: inline-block;
          vertical-align: top;
          line-height: 36/@r;
          font-size: 20/@r;
          color: rgb(77, 85, 93);
        }
      }
      .remark{
        display: flex;
        padding: 36/@r 0;
        .block{
          flex: 1;
          text-align: center;
          border-right: 1px solid rgba(7, 17, 27, 0.1);
          &:last-child{
            border: none;
          }
          h2{
            margin-bottom: 8/@r;
            line-height: 20/@r;
            font-size: 20/@r;
            line-height: 20/@r;
            color: rgb(147, 153, 159);
          }
          .content{
            line-height: 48/@r;
            font-size: 20/@r;
            color: rgb(7, 17, 27);
            .stress{
              font-size: 48/@r;
            }
          }
        }
      }
      .favorite{
        position: absolute;
        width: 100/@r;
        right: 22/@r;
        top: 36/@r;
        text-align: center;
        .icon-favorite{
          display: block;
          margin-bottom: 8/@r;
          line-height: 48/@r;
          font-size: 48/@r;
          color: #d4d6d9;
          &.active{
            color: rgb(240, 20, 20);
          }
        }
        .text{
          line-height: 20/@r;
          font-size: 20/@r;
          color: rgb(77, 85, 93);
        }
      }
    }
    .bulletin{
      padding: 36/@r 36/@r 0 36/@r;
      .title{
        margin-bottom: 16/@r;
        line-height:28/@r;
        color: rgb(7, 17, 27);
        font-size: 28/@r;
      }
      .content-wrapper{
        padding: 0 24/@r 32/@r 24/@r;
        .border-1px(rgba(7, 17, 27, 0.1));
        .content{
          line-height: 48/@r;
          font-size: 24/@r;
          color: rgb(240, 20, 20);
        }
      }
      .supports{
        .support-item{
          padding: 32/@r 24/@r;
          .border-1px(rgba(7, 17, 27, 0.1));
          font-size: 0;
          &:last-child{
            .border-none;
          }
        }
        .icon{
          display: inline-block;
          width: 32/@r;
          height: 32/@r;
          vertical-align: top;
          margin-right: 12/@r;
          background-size: 32/@r 32/@r;
          background-repeat: no-repeat;
          &.decrease{
            .bg-image('decrease_4');
          }
          &.discount{
            .bg-image('discount_4');
          }
          &.guarantee{
            .bg-image('guarantee_4');
          }
          &.invoice{
            .bg-image('invoice_4');
          }
          &.special{
            .bg-image('special_4');
          }
        }
        .text{
          line-height: 32/@r;
          font-size: 24/@r;
          font-weight: 200;
          color:rgb(7 ,17 ,27);
        }
      }
    }
    .pics{
      padding: 36/@r;
      .title{
        margin-bottom: 24/@r;
        line-height:28/@r;
        color: rgb(7, 17, 27);
        font-size: 28/@r;
      }
      .pic-wrapper{
        width:100%;
        overflow: hidden;
        white-space: nowrap;
        .pic-list{
          font-size: 0;
          .pic-item{
            display: inline-block;
            margin-right: 12/@r;
            width: 240/@r;
            height: 180/@r;
            &:last-child{
              margin: 0;
            }
            img{
              width: 100%;
              height: 100%;
            }
          }
        }

      }
    }
    .info{
      padding: 36/@r 36/@r 0;
      color: rgb(7, 17, 27);
      .title{
        padding-bottom: 24/@r;
        line-height:28/@r;
        font-size: 28/@r;
        .border-1px(rgba(7, 17, 27, 0.1));
      }
      .info-item{
        padding: 32/@r 24/@r;
        line-height: 32/@r;
        .border-1px(rgba(7, 17, 27, 0.1));
        font-size: 24/@r;
        &:last-child{
          .border-none;
        }
      }
    }
    .bulletin{
      padding: 36/@r 36/@r 0 36/@r;
      .title{
        margin-bottom: 16/@r;
        line-height: 28/@r;
        color: rgb(7, 17, 27);
        font-size: 28/@r;
      }
      .content-wrapper{
        padding: 0 24/@r 32/@r 24/@r;
        .border-1px(rgba(7, 17, 27, 0.1));
        .content{
          line-height: 48/@r;
          font-weight: 200;
          font-size: 24/@r;
          color: rgb(240, 20, 20);
        }
      }
      .supports{
        .support-item{
          padding: 32/@r 24/@r;
          .border-1px(rgba(7, 17, 27, 0.1));
          font-size: 0;
        }
        .icon{
          display: inline-block;
          width: 32/@r;
          height: 32/@r;
          vertical-align: top;
          margin-right: 12/@r;
          background-size: 32/@r 32/@r;
          background-repeat: no-repeat;
          &.decrease{
            .bg-image('decrease_4');
          }
          &.discount{
            .bg-image('discount_4');
          }
          &.guarantee{
            .bg-image('guarantee_4');
          }
          &.invoice{
            .bg-image('invoice_4');
          }
          &.special{
            .bg-image('special_4');
          }
        }
        .text{
          line-height: 32/@r;
          font-size: 24/@r;
          font-weight: 200;
          color: rgb(7, 17, 27);
        }
      }
    }
  }
</style>