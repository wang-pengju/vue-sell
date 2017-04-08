<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <aside class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </aside>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script type="ecmascript-6">
  import {urlParse} from 'common/js/util';
  import header from './components/header/header.vue'
  const ERR_OK=0;
  export default {
    name: 'app',
    components: {
      'v-header': header
    },
    data() {
      return{
        seller:{
          id: (() => {
            let queryParam = urlParse();
            /*console.log(queryParam);*/
            return queryParam.id;
          })()
        }
      }
    },
    created() {
      this.$http.get('/api/seller?id='+this.seller.id).then((response) => {
        response = response.body;
        //console.log(response);
        if(response.errno === ERR_OK){
          this.seller=Object.assign({},this.seller,response.data);
          //console.log(this.seller);
          //console.log(this.seller.id);
        }
      })
    }
  }
</script>

<style lang="less">
  @import "./common/styles/mixin.less";
  @r:50rem;
  #app {
    .tab{
      display: flex;
      width:100%;
      height:80/@r;
      line-height: 80/@r;
      .border-1px(rgba(7, 17, 27, 0.1));
      .tab-item{
        flex:1;
        text-align: center;
        &>a{
          display: block;
          color:rgb(77, 85, 93);
          font-size: 36/@r;
          &.active{
            color: rgb(240, 20, 20);
          }
        }
      }
    }
  }
</style>