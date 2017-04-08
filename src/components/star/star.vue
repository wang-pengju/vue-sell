<template>
  <div class="star" :class="starType">
    <!-- <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span> -->
    <span v-for="(itemClass,index) in itemClasses" :class="itemClass" class="star-item" key="index"></span>
  </div>
</template>

<script type="ecmascript-6">
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';
  
  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType() {
        return 'star-'+this.size;
      },
      itemClasses() {
        let result = [];
        let score = Math.floor(this.score * 2) / 2;
        let hasDecimal = score % 1 !== 0;
        let integer = Math.floor(score);
        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON);
        }
        if (hasDecimal) {
          result.push(CLS_HALF);
        }
        while (result.length < LENGTH) {
          result.push(CLS_OFF);
        }
        return result;
      }
    }
  }
</script>

<style rel="stylesheet" lang="less">
/* @import "../../common/styles/mixin.less"; */
   .bg-image(@url){
    background-image: url("@{url}@2x.png");
    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3){
      background-image: url("@{url}@3x.png");
    }
  }; 
  @r:50rem;
  .star{
    font-size: 0;
    &.star-48{
      .star-item{
        width: 40/@r;
        height: 40/@r;
        margin-right:44/@r;
        background-size: 40/@r 40/@r;
        &:last-child{
          margin-right: 0;
        }
        &.on{
          .bg-image(star48_on);
        }
        &.half{
          .bg-image(star48_half);
        }
        &.off{
          .bg-image(star48_off);
        }
      }     
    }
    &.star-36{
      .star-item{
        width: 30/@r;
        height: 30/@r;
        margin-right:12/@r;
        background-size: 30/@r 30/@r;
        &:last-child{
          margin-right: 0;
        }
        &.on{
          .bg-image(star36_on);
        }
        &.half{
          .bg-image(star36_half);
        }
        &.off{
          .bg-image(star36_off);
        }
      } 
    }
    &.star-24{
      .star-item{
        width: 20/@r;
        height: 20/@r;
        margin-right:6/@r;
        background-size: 20/@r 20/@r;
        &:last-child{
          margin-right: 0;
        }
        &.on{
          .bg-image(star24_on);
        }
        &.half{
          .bg-image(star24_half);
        }
        &.off{
          .bg-image(star24_off);
        }
      } 
    }
    .star-item{
      display: inline-block;
      background-repeat: no-repeat;
    }
  }
</style>