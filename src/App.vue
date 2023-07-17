<template>
  <div id="app">
    <side-bar ref="sidebar" :show="show" @changeShow="open" @open="open" :arrow="true" :bgOn.sync="bgOn" v-show="$route.name !== 'Login'"
              v-click-outside="passiveClose"/>
    <router-view/>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar";
import EventBus from "@/eventbus/EventBus";
import ClickOutside from 'vue-click-outside'
import {mixin} from "@/mixin/mixin";

export default {
  name: 'App',
  mixins: [mixin],
  created() {
    EventBus.$on('showHeader', this.showHeader);
    EventBus.$on('hideHeader', this.hideHeader);
  },
  components: {SideBar},
  directives: {
    ClickOutside
  },
  methods: {
    open: function () {
      this.show = !this.show;
    },
    passiveClose() {
      this.$refs.sidebar.close();
    },
    showHeader() {
      if (!this.bgOn) {
        if (this.show === undefined) {
          this.show = false;
        }
        this.bgOn = true;
      }
    },
    hideHeader() {
      if (this.bgOn) {
        if (this.show === undefined) {
          this.show = false;
        }
        this.bgOn = false;
      }
    }
  },
  data() {
    return {
      bgOn: undefined,
      show: undefined
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
<style>
body {
  overflow: hidden;
}

body::-webkit-scrollbar-thumb {
  background-color: #E0FFFF;
}

body::-webkit-scrollbar-track {
  background-color: #002856;
}

body::-webkit-scrollbar {
  width: 0.5vw;
  background-color: #E0FFFF;
}
</style>

