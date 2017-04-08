<template>
  <header>
    <div class="content-wrapper">
      <div class="avator">
        <img :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="discription">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar">
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-wraper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item,index) in seller.supports">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </header><!-- header end-->
</template>

<script type="ecmascript-6">
  import star from 'components/star/star';
  export default {
    name: 'header',
    props: {
      seller:{
        type: Object
      }
    },
    data() {
      return {
        detailShow: false
      }
    },
    methods: {
      showDetail() {
        this.detailShow = true;
      },
      hideDetail() {
        this.detailShow = false;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components: {
      star
    }
  }
</script>

<style lang="less" rel="stylesheet" scoped>
  @import "../../common/styles/mixin.less";
  header{
    color: #fff;
    position: relative;
    overflow: hidden;
    background: rgba(7, 17, 27, 0.5);
    .content-wrapper{
      position: relative;
      padding: 48/@r 24/@r 36/@r 48/@r;
      font-size: 0;
      .avator,
      .content{
        display: inline-block;
      }
      .avator{
        vertical-align: top;
        img{
          width:128/@r;
          height:128/@r;
          border-radius: 4/@r;
        }
      }
      .content{
        margin-left: 32/@r;
        .title{
          margin:4/@r 0 16/@r 0;
          .brand{
            display: inline-block;
            vertical-align: top;
            width: 60/@r;
            height: 38/@r;
            .bg-image(brand);
            background-size: 60/@r 36/@r;
            background-repeat: no-repeat;
          }
          .name{
            margin-left: 12/@r;
            font-size: 32/@r;
            line-height: 32/@r;
            font-weight: bold;
          }
        }
        .discription{
          margin-bottom: 20/@r;
          font-size: 24/@r;
          line-height: 24/@r;
        }
        .support{
          .icon{
            display: inline-block;
            vertical-align: top;
            width:24/@r;
            height:24/@r;
            margin-right: 8/@r;
            background-size: 24/@r 24/@r;
            background-repeat: no-repeat;
            &.decrease{
              .bg-image(decrease_1);
            }
            &.discount{
              .bg-image(discount_1);
            }
            &.guarantee{
              .bg-image(guarantee_1);
            }
            &.invoice{
              .bg-image(invoice_1);
            }
            &.special{
              .bg-image(special_1);
            }
          }
          .text{
            line-height: 24/@r;
            font-size: 20/@r; 
          }
        }
      }
      .support-count{
        position: absolute;
        right: 24/@r;
        bottom: 36/@r;
        padding: 0 16/@r;
        line-height: 24/@r;
        border-radius: 28/@r;
        background: rgba(0, 0, 0, 0.2);
        text-align: center;
        .count,
        .icon-keyboard_arrow_right{
          font-size: 20/@r;
        }
        .icon-keyboard_arrow_right{
          margin-left: 4/@r;
          line-height: 48/@r;
        }
      }
    }
    .bulletin-wrapper{
      position: relative;
      height: 56/@r;
      line-height: 56/@r;
      padding: 0 44/@r 0 24/@r;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      background: rgba(7, 17, 27, 0.2);
      .bulletin-title{
        vertical-align: top;
        display: inline-block;
        margin-top: 14/@r;
        width:44/@r;
        height: 24/@r;
        .bg-image(bulletin);
        background-size: 44/@r 24/@r;
        background-repeat: no-repeat;
      }
      .bulletin-text{
        vertical-align: top;
        margin:0 8/@r;
        font-size: 20/@r;
      }
      .icon-keyboard_arrow_right{
        position: absolute;
        font-size: 20/@r;
        top:16/@r;
        right: 24/@r;
      }
    }
    .background{
      position: absolute;
      top:0;
      left:0;
      width: 100%;
      height: 100%;
      z-index: -1;
      filter:blur(10/@r);
      img{
        width: 100%;
        height: 100%;
      }
    }
    .detail{
      position: fixed;
      z-index: 100;
      top:0;
      left:0;
      width: 100%;
      height: 100%;
      overflow: auto;
      backdrop-filter: blur(10/@r);
      opacity: 1;
      background: rgba(7, 17, 27, 0.8);
      &.fade-enter-active,
      &.fade-leave-active{
        transition: all 1s;
      }
      &.fade-enter,
      &.fade-leave-active{
        opacity: 0;
        background: rgba(7, 17, 27, 0);
      }
      .detail-wraper{
        width: 100%;
        min-height: 100%;
        .detail-main{
          margin-top: 128/@r;
          padding-bottom: 128/@r;
          .name{
            line-height: 32/@r;
            text-align: center;
            font-size: 32/@r;
            font-weight: 700;
          }
          .star-wrapper{
            margin-top:36/@r;
            padding: 4/@r 0;
            text-align: center;
          }
          .title{
            display: flex;
            width:80%;
            margin:56/@r auto 48/@r auto;
            .line{
              flex:1;
              position: relative;
              top:-12/@r;
              border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            }
            .text{
              padding: 0 24/@r;
              font-weight: 700;
              font-size: 28/@r;
            }
          }
          .supports{
            width: 80%;
            margin:0 auto;
            .support-item{
              padding:0 24/@r;
              margin-bottom: 24/@r;
              font-size: 0;
              &:last-child{
                margin-bottom: 0;
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
                  .bg-image(decrease_2);
                }
                &.discount{
                  .bg-image(discount_2);
                }
                &.guarantee{
                  .bg-image(guarantee_2);
                }
                &.invoice{
                  .bg-image(invoice_2);
                }
                &.special{
                  .bg-image(special_2);
                }
              }
              .text{
                line-height: 32/@r;
                font-size: 24/@r;
              }
            }
          }
          .bulletin{
            width: 80%;
            margin:0 auto;
            .content{
              padding:0 24/@r;
              line-height: 48/@r;
              font-size: 24/@r;
            }
          }
        }
      }
      .detail-close{
        position: relative;
        width: 64/@r;
        height: 64/@r;
        margin:-128/@r auto 0 auto;
        clear: both;
        font-size: 64/@r;
      }
    }
  } 
</style>