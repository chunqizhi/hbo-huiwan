<template>
  <div class="home">
    <img @click="func" alt="Vue logo" src="../assets/logo.png">

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
    func() {
        cfg.getInitreward();
    }
  },
  created() {
    this.func();
  }
}
</script>
