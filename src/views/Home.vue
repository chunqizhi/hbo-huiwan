<template>
  <div class="home">
    <div class="hello" style="background-color: #f1f5fe; height: 100vh">
    <div
      style="
        width: 100%;
        height: 300px;
        background-color: #101044;
        color: #fff;
        line-height: 300px;
      "
    >
      通过质押HSwap LP1231321231231321321231
    </div>
    <div class="plate pr">
        <div class="pa total" >锁定总值0.00 USDT</div>
      <div class="dsp-center" style="padding: 40px 200px">
        <div style="background-color: #fff; padding: 20px 40px; border-radius: 10px">
          <div>HBO-USDT_LP</div>
          <div style="font-size: 12px; margin-top: 10px">
            赚取{{initReward}}HBO(每天)
          </div>
          <div style="font-size: 12px; margin-bottom: 10px">
            赚取{{monthReward}}HBO(每月)
          </div>
          <div style="font-size: 12px; margin: 20px 0">{{totalSupply}} USDT</div>
          <div
            style="
              font-size: 12px;
              margin-bottom: 10px;
              padding: 5px 10px;
              border: 1px solid #2d58cb;
              background-color: #2d58cb;
              color: #fff;
              border-radius: 15px;
            "
            class="dsp-between"
          >
            <span>APY</span>
            <span>0%</span>
          </div>
          <div
            style="
              border: 1px solid #85ca98;
              border-radius: 15px;
              padding: 3px 0;
            "
            @click="$router.push({ path: '/mine' })"
          >
            选择
          </div>
        </div>
        <div style="background-color: #fff; padding: 20px 40px; border-radius: 10px">
          <div>HBO-USDT_LP</div>
          <div style="font-size: 12px; margin-top: 10px">
            赚取0.0000 HBO(每天)
          </div>
          <div style="font-size: 12px; margin-bottom: 10px">
            赚取0.0000 HBO(每天)
          </div>
          <div style="font-size: 12px; margin: 20px 0">0.00 USDT</div>
          <div
            style="
              font-size: 12px;
              margin-bottom: 10px;
              padding: 5px 10px;
              border: 1px solid #2d58cb;
              background-color: #2d58cb;
              color: #fff;
              border-radius: 15px;
            "
            class="dsp-between"
          >
            <span>APY</span>
            <span>0%</span>
          </div>
          <div
            style="
              border: 1px solid #85ca98;
              border-radius: 15px;
              padding: 3px 0;
            "
          >
            选择
          </div>
        </div>
        <div style="background-color: #fff; padding: 20px 40px; border-radius: 10px">
          <div>HBO-USDT_LP</div>
          <div style="font-size: 12px; margin-top: 10px">
            赚取0.0000 HBO(每天)
          </div>
          <div style="font-size: 12px; margin-bottom: 10px">
            赚取0.0000 HBO(每天)
          </div>
          <div style="font-size: 12px; margin: 20px 0">0.00 USDT</div>
          <div
            style="
              font-size: 12px;
              margin-bottom: 10px;
              padding: 5px 10px;
              border: 1px solid #2d58cb;
              background-color: #2d58cb;
              color: #fff;
              border-radius: 15px;
            "
            class="dsp-between"
          >
            <span>APY</span>
            <span>0%</span>
          </div>
          <div
            style="
              border: 1px solid #85ca98;
              border-radius: 15px;
              padding: 3px 0;
            "
          >
            选择
          </div>
        </div>
      </div>
    </div>
  </div>
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
      totalSupply: "",
      initReward: "",
      monthReward: ""
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
            that.initReward = res / 1000000000000000000;
            that.monthReward = that.initReward * 30 ;
        });
        // 查询项目方 huiwanUsdtLoop 池子里面的 lp 总数量
        cfg.getTotalSupply(function(res) {
            console.log("当前池子 lp 总量：" + res);
            that.totalSupply = res / 1000000000000000000;
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
        // 授权 huiwanUsdtLoop 池子合约可以帮我在 mdex 配对合约花费我的 100000000 个 lp 份额
        cfg.approveHuiwanUsdtLoopAddr(function(res) {
            console.log("授权 huiwanUsdtLoop 池子合约可以帮我在 mdex 配对合约花费我的 100000000 个 lp 份额: " + res);
        });
      });
    },
  },
  created() {
    this.init();
  }
}
</script>
<style scoped>
.plate {
  width: 1200px;
  margin: 0 auto;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.dsp-center {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.dsp-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.pr{
    position: relative;
}
.pa{
    position: absolute;
}
.total{
    left: 50%;
    top: -32px;
    transform: translateX(-50%);
    background-color: #66be7f;
    color:#fff;
    padding: 20px;
    border-radius:6px
}
</style>