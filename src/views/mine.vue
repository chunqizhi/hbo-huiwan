<template>
  <div style="background-color:#f1f5fe;height:100vh">
     <div
     class="dsp-center"
      style="
        width: 100%;
        height: 300px;
        background-color: #101044;
        color: #fff;

      "
    >
    <div>
        <h2>HBO矿池</h2>
      <p>注意：我们现在仅支持Heco，亲勿转让以太<br />坊主网token</p>
    </div>
      
    </div>
    <div class="plate">
        <div class="dsp-center pr" style="top:-30px">
            <div style="margin-right:10px;height:166px;width:250px;padding:20px 30px;background-color:#fff;border-radius:10px">
                <div>您的余额</div>
                <div style="margin:20px 0">{{initReward}} HBO</div>
                <div style="border-radius:15px;border:1px solid #bfe4c9;padding:3px 0;width:100%">获取所有Token</div>
            </div>
            <div style="height:166px;width:250px;padding:20px 30px;background-color:#fff;border-radius:10px">
                <div>Mdex LP 抵押</div>
                <div>HBO-USDT-LP</div>
                <div style="margin:20px 0">0.0000</div>
                <div style="border-radius:15px;border:1px solid #bfe4c9;padding:3px 0;width:100%" @click="openShow">授权</div>
            </div>
        </div>
    </div>
    <div style="width:100%;height:100%;top:0;left:0" class="pa dsp-center" v-show="openshow">
      <div @click="dowmshow" style="background-color:#000;opacity:0.8;width:100%;height:100%;top:0;left:0" class="pa"></div>
      <div style="background-color:#fff;padding:30px;opacity:1;top:50%;left:50%;transform: translate(-50% -50%);" class="pa">
        <div>付款钱包:</div>
        <div>收款地址:</div>
        <div>矿工费:</div>
        <div>操作名称:</div>
        <div>授权数量:</div>
      </div>
    </div>
  </div>
</template>

<script>

import cfg from "@/apis/nodeServer.js";


export default {
  data(){
    return{
      openshow:false,
      initReward: null
    }
  },
  methods:{
    openShow(){
      this.openshow = !this.openshow;
      this.getauthorization()
    },
    getauthorization(){
      console.log('获取授权')
      
    },
    dowmshow(){
      this.openshow = false;
    },
    init(){
        let that = this;
        cfg.init(function(res){
            cfg.getInitreward(function(res){
                that.initReward = res /1000000000000000000;
            })
        })
    }
  },
  created() {
      this.init();
  }

}
</script>

<style>
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
  justify-content: center;
}
.dsp-around {
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
</style>
