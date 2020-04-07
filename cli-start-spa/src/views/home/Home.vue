<template>
  <div class="home">
    <img class="img" alt="Vue logo" src="../../assets/img/home/logo.png">
    <div class="test">花擦勒！</div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>

// import config from '@/config/gateway.config'
// import { initAsyn } from '@/utils/loadJs'
// import $ from 'zepto'
// console.log($)
// console.log(config)

import { listPage } from '@/api/pages/home/home'

// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data () {
    return {

    }
  },
  created () {
    // initAsyn(['moment' 'eruda'], () => {
    //   console.log(moment)
    //   console.log(456)
    // })
    // console.log(123)
    //
    // console.log($)

    listPage().then((data) => {
      console.log(data)
    })
  }
}
</script>

<style lang="scss" scoped>
  .home {
    color: #ccc;

    .img {
      width: 400px;
      height: 400px;
    }

    .test {
      width: 100%;
      height: 200px;
      @include font-all(20px, $color-font);

      transform: scale(2);
    }
  }


</style>
