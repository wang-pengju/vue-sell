<template>
  <article>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}"
          @click="selectMenu(index,$event)">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list" ref="foodList">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontral-wrapper">
                  <cartcontral @add="addFood" :food="food"></cartcontral>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart ref="shopcart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
  </div>
  <food @add="addFood" :food="selectedFood" ref="food"></food>
  </article>
</template>

<script type="ecmascript-6">
  /*https://github.com/ustbhuangyi/better-scroll/tree/master*/
  import BScroll from 'better-scroll';
  import shopcart from 'components/shopcart/shopcart';
  import cartcontral from 'components/cartcontral/cartcontral';
  import food from 'components/food/food';

  const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      };
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
        }
      });
    },
    methods: {
      selectMenu(index, event) {
        if (!event._constructed) {
          return;
        }
        let foodList = this.$refs.foodList;
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      },
      selectFood(food, event) {
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        this.$refs.food.show();
      },
      addFood(target) {
        this._drop(target);
      },
      _drop(target) {
        // 体验优化,异步执行下落动画
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target);
        });
      },
      _initScroll() {
        this.meunScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });

        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        });

        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight() {
        let foodList = this.$refs.foodList;
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      }
    },
    components: {
      shopcart,
      cartcontral,
      food
    }
  }
</script>

<style rel="stylesheet" lang="less" scoped>
  @import "../../common/styles/mixin.less";
  .goods{
    display: flex;
    position: absolute;
    top:347/@r;
    bottom: 92/@r;
    width:100%;
    overflow: hidden;
    .menu-wrapper{
      flex: 0 0 160/@r;
      width: 160/@r;
      background: #f3f5f7;
      .menu-item{
        display: table;
        height: 108/@r;
        width: 112/@r;
        line-height: 28/@r;
        padding: 0 24/@r;
        &:last-child{
          .text{
            .border-none;
          }
        }
        &.current{
          position: relative;
          margin-top: -2/@r;
          z-index: 10;
          background: #fff;
          font-weight: 700;
          .text{
            .border-none;

          }
        }
        .icon{
          display: inline-block;
          vertical-align: top;
          width: 24/@r;
          height: 24/@r;
          margin-right: 4/@r;
          background-size: 24/@r 24/@r;
          background-repeat: no-repeat;
          &.decrease{
            .bg-image('decrease_3');
          }
          &.discount{
            .bg-image('discount_3');
          }
          &.guarantee{
            .bg-image('guarantee_3');
          }
          &.invoice{
            .bg-image('invoice_3');
          }
          &.special{
            .bg-image('special_3');
          }
        }
        .text{
          display: table-cell;
          width: 112/ar;
          vertical-align: middle;
          font-size: 24/@r;
          line-height: 14px;
          .border-1px(rgba(7,17,27,0.1));
        }
      }
    }
    .foods-wrapper{
      flex:1;
      .title{
        padding-left:28/@r;
        height: 52/@r;
        line-height: 52/@r;
        border-left: 4/@r solid #d9dde1;
        font-size: 24/@r;
        color:rgb(147,153,159);
        background: #f3f5f7;
      }
      .food-item{
        display: flex;
        margin: 36/@r;
        padding-bottom: 36/@r;
        .border-1px(rgba(7,17,27,0.1));
        &:last-child{
          .border-none;
          margin-bottom: 0;
        }
        .icon{
          flex:0 0 114/@r;
          margin-right:20/@r;
          img{
            width:114/@r;
            height:114/@r;
          }
        }
        .content{
          flex:1;
          .name{
            margin: 4/@r 0 16/@r 0;
            height: 28/@r;
            line-height: 28/@r;
            font-size: 28/@r;
            color:rgb(7, 17, 27);
          }
          .desc,
          .extra{
            line-height: 20/@r;
            font-size: 20/@r;
            color:rgb(147,153,159);
          }
          .desc{
            line-height: 24/@r;
            margin-bottom: 16/@r;
          }
          .extra{
            .count{
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
            right: 0;
            bottom: 24/@r;
          }
        }
      }
    }
  }
</style>