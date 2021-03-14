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
        // 查询 huiwanUsdtLoop 池子初始奖励数量 57600000000000000000000
        cfg.getInitreward(function(res) {
            console.log("当前奖励数量：" + res);
        });
        // 查询项目方 huiwanUsdtLoop 池子里面的 lp 总数量
        cfg.getTotalSupply(function(res) {
            console.log("当前池子 lp 总量：" + res);
        });
        // 查询某个用户在 huiwanUsdtLoop 池子中的当前收益
        cfg.getEarned(res, function(res) {
            console.log("地址：" + that.account + " 的收益数量：" + res);
        });
        // 查询 mdex 中配对合约拥有 huiwanToken 的数量
        cfg.getBalanceFromHuiwanTokenContract("0x9Df49c31ac2C9C82cCEa6315F4F90eeae83A4182", function(res) {
            console.log("mdex 中配对合约拥有 huiwanToken 数量：" + res);
        });
        // 查询 mdex 中配对合约拥有 usdtToken 的数量
        cfg.getBalanceFromUsdtTokenContract("0x9Df49c31ac2C9C82cCEa6315F4F90eeae83A4182", function(res) {
            console.log("mdex 中配对合约拥有 usdtToken 数量：" + res);
            });
      });
    },
  },
  created() {
    this.init();
  }
}
</script>
