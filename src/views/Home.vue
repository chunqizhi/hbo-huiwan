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
  data() {
    return {
      account: "",
    }
  },
  methods: {
    init() {
      let that = this;
      cfg.init(function(res) {
        that.account = res;
        console.log("当前钱包地址 ：" + res);
        //
        console.log(cfg.getInitreward(function(res) {
            console.log("当前奖励数量：" + res);
       }));
        //
        console.log(cfg.getTotalSupply(function(res) {
            console.log("当前池子 lp 总量：" + res);
        }));
        //
        console.log(cfg.getEarned(res, function(res) {
            console.log("地址：" + this.account + " 的收益数量：" + res);
        }));
      });
    },
  },
  created() {
    this.init();
  }
}
</script>
