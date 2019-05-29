<template>
  <transition name="fade">
    <div class="toastWrap">
      <div class=" toast">
        <img :src="imgUrl" v-if="imgShow">
        <!--<img src="" v-if="imgShow">-->
        <p>{{ modalTitle }}</p>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    name: 'Toast',
//         props：
//         modalTitle: 默认内容
//         duration:显示时间
    props: {
      modalTitle: {
        type: String,
        default: ''
      },
      duration: {
        type: String,
        default: '2000'
      },
      imgUrl: {
        type: String,
        default: require('./icons/success.png')
      },
      imgShow: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        timer: null
      };
    },
    methods: {
      startTimer(){
        clearTimeout(this.timer);
        this.timer = setTimeout(this.hideToast, this.duration)
      },
      hideToast () {
        this.$emit("toastCancel");
        clearTimeout(this.timer);
      }
    },
    mounted() {
      this.startTimer();
    }
  };
</script>
<style scoped type="text/scss" lang="scss">

  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  /*.slide-fade-enter-active {*/
  /*transition:.3s;*/
  /*}*/
  /*.slide-fade-leave-active {*/
  /*transition: all .3s linear;*/
  /*}*/
  /*.slide-fade-enter, .slide-fade-leave-to {*/
  /*transform: translateY(1rem);*/
  /*opacity: 0;*/
  /*}*/

  /*.bounce-enter-active {*/
  /*animation: bounce-in .5s ease-in-out;*/
  /*}*/

  /*.bounce-leave-active {*/
  /*animation: bounce-in .3s reverse;*/
  /*}*/

  /*@keyframes bounce-in {*/
  /*0% {*/
  /*transform: scale(0);*/
  /*}*/
  /*50% {*/
  /*transform: scale(1.2);*/
  /*}*/
  /*100% {*/
  /*transform: scale(1);*/
  /*}*/
  /*}*/

  //渐隐渐现
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }

  .toastWrap {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 2500;
    background-color: rgba(0, 0, 0, 0.5);
    text-align: center;
    &:before {
      content: '';
      display: inline-block;
      height: 100%;
      vertical-align: middle;
      // margin-right: -0.25em; /* Adjusts for spacing */
    }
    .toast {
        padding:1% 2%;
        display: inline-block;
        vertical-align: middle;
        background-color: #fff;
        border-radius: 6px;
        max-width: 50vw;
        min-width: 20vw;
      img {
        width: 1rem;
        height: 1rem;
        display: block;
        margin: auto;
        margin-bottom: 0.1rem;
      }
      p {
        color: #37bafd !important;
          font-size: 2vh !important;
      }
    }
  }


</style>
