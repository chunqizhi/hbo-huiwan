<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">

    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import cfg from "@/apis/nodeServer.js";

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  methods: {
    init() {
      let that = this;
      cfg.init(function(res) {
        that.account = res;
        console.log("当前钱包地址 ：" + res);
        //
        console.log(cfg.getInitreward());
      });
    },
  },
  created() {
    this.init();
  }
}
</script>
