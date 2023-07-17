<template>
  <div id="side-bar-component">
    <div id="menu" ref="menu" class="moveInit sidebar" style=" font-size: 1vw; height: 100%">
      <aside class="menu-aside">
        <div class="up-menu">
          <div style="text-align: left; padding-right: 3%;">
            <button class="back" @click="open" v-if="arrow">
              <font-awesome-icon icon="long-arrow-alt-right" size="lg"></font-awesome-icon>
            </button>
          </div>
          <nav class="nav">
            <button class="nav-link" @click="goTo('Main')">
              <div>메인 페이지</div>
            </button>
          </nav>
          <nav class="nav">
            <button class="nav-link" @click="goTo('Career')">
              <div>이력서</div>
            </button>
          </nav>
          <nav class="nav">
            <button class="nav-link" @click="goTo('Skill')">
              <div>기술 시연</div>
            </button>
          </nav>
          <nav class="nav">
            <button class="nav-link" @click="closeMenuAndLogOut">
              <div>로그아웃</div>
            </button>
          </nav>
        </div>
        <div class="bottom-menu">
        </div>
      </aside>
    </div>
    <div ref="header" v-if="show === undefined ? false : !show" class="toggle-parent"
         :class="{'bg': bgOn === true, 'notBg': bgOn === false, 'init': bgOn === undefined, 'vertical-center-by-flex-column': show === undefined ? false : !show}">
      <div class="sub-name" @click="goTo('Main')">Tranquil Worker</div>
    </div>
    <button @click="open" class="toggle-button" :class="{'black': !bgOn, 'white': bgOn}" v-show="!show">☰</button>
  </div>
</template>

<script>
/* eslint-disable */
import {mixin} from "@/mixin/mixin";
import EventBus from "@/eventbus/EventBus";

export default {
  name: "SideBar",
  created() {
    EventBus.$on('logout', this.closeMenuAndLogOut);
  },
  mixins: [mixin],
  props: {
    arrow: Boolean,
    show: Boolean,
    bgOn: {
      default() {
        return undefined;
      },
      type: Boolean
    }
  },
  data() {
    return {}
  },
  watch: {
    arrow(arrow) {
      if (!arrow) {
        this.show = true;
      }
    }
  },
  computed: {},
  methods: {
    closeMenuAndLogOut() {
      this.close();
      this.bgOn = undefined;
      const menu = this.$refs.menu;
      menu.classList.remove('moveIn');
      menu.classList.add('moveInit');
      this.logout();
    },
    outTo(where) {
      window.location = where;
    },
    goTo(to) {
      this.close();
      if (to === this.$route.name) {
        return;
      }
      this.$router.push({name: to});
    },
    open() {
      const that = this;
      const menu = this.$refs.menu;
      if (!this.bgOn) {
        this.$emit('update:bgOn', undefined);
      }
      if (this.show) {
        menu.classList.add('moveIn');
        menu.classList.remove('moveOut');
      } else {
        menu.classList.add('moveOut');
        menu.classList.remove('moveIn');
      }
      that.$emit('changeShow');
    },
    close() {
      const menu = this.$refs.menu;
      if (!this.bgOn) {
        this.$emit('update:bgOn', undefined);
      }
      if (this.show) {
        menu.classList.add('moveIn');
        menu.classList.remove('moveOut');
        this.$emit('open');
      }
    }
  },
  mounted() {
  }
}
</script>

<style scoped lang="scss">
.nav-link div {
  font-size: 1vw;
}
.up-menu {
  border-radius: 10%;
  padding: 3%;
  background-color: rgba(255, 255, 255, 0.5);
}
.side-bar-component {
  width: 75%;
  left: 13%;
  position: absolute;
}
.toggle-parent {
  position: relative !important;
}
.toggle-button {
  right: 30px !important;
  left: unset !important;
  position: absolute !important;
  top: 0px;
}
.menu-aside {
  display: grid;
  align-items: stretch;
  height: 100%;
  grid-template-rows: 9fr 1fr;
}
div.sub-name:hover {
  color: black;
}
div.sub-name {
  cursor: pointer;
  position: fixed;
  font-family: QwitcherGrypen, serif;
  font-size: 5vmin;
}

.toggle-parent {
  //background-color: #ffffff !important;
  //color: #0f141a;
  //color: #ffffff;
  background-color: rgba(0, 40, 86, 1);
  animation-duration: 100ms;
  width: 100%;
  position: fixed;
  height: 70px;
  z-index: 100;
  border: none;
  padding-left: 2.5vmin;
  text-align: left;
  opacity: 0;
}

@keyframes fadeout {
  to {
    opacity: 0;
  }
  from {
    opacity: 1;
  }
}

@keyframes fadein {
  to {
    opacity: 1;
  }
  from {
    opacity: 0;
  }
}

.toggle-parent.init {
  color: rgba(0, 40, 86, 1) !important;
  opacity: 0;
}
.toggle-parent.bg {
  color: #ffffff;
  animation-name: fadein;
  animation-duration: 1s;
  opacity: 1;
}

@media (min-width: 600px) {
  .black {
    color: white !important;
  }
}

.toggle-parent.notBg {
  color: rgba(0, 40, 86, 1) !important;
  animation-name: fadeout;
  animation-duration: 1s;
  opacity: 0;
  display: none !important;
}

@keyframes slidedown {
  from {
    top: -11%;
  }
  to {
    top: 0;
  }
}

@keyframes slideup {
  from {
    top: 0;
  }
  to {
    top: -11%;
  }
}

:root {
  --c-sidebar: #ffffff;
  --c-default: #0f141a;
  --c-active: #1DA1F2;
  --c-hover: #ebf5fe;
}

.toggle-button {
  position: fixed;
  font-size: xxx-large;
  color: #ffffff;
  cursor: pointer;
  background: none;
  border: none;
  z-index: 100;
  left: 95%;
}

@media screen and (max-width: 290px) {
  .toggle-button {
    left: 80%;
    font-size: xx-large;
  }
}

@media screen and (min-width: 291px) and (max-width: 390px) {
  .toggle-button {
    left: 86%;
    font-size: xx-large;
  }
}

@media screen and (min-width: 390px) and (max-width: 600px) {
  .toggle-button {
    left: 88%;
  }
}

@media screen and (min-width: 601px) and (max-width: 800px) {
  .toggle-button {
    left: 91%;
  }
}

@media screen and (min-width: 801px) and (max-width: 900px) {
  .toggle-button {
    left: 92%;
  }
}

@media screen and (min-width: 901px) and (max-width: 1000px) {
  .toggle-button {
    left: 93%;
  }
}

@media screen and (min-width: 1001px) and (max-width: 1100px) {
  .toggle-button {
    left: 94%;
  }
}

@media screen and (max-width: 400px) {
  .sidebar {
    position: fixed;
  }
  .moveOut {
    left: 50%;
    animation-duration: 100ms;
    animation-name: slidein;
    animation-fill-mode: forwards;
  }
  @keyframes slideout {
    to {
      left: 100%;
    }
    from {
      left: 50%;
    }
  }

  @keyframes slidein {
    from {
      left: 100%;
    }
    to {
      left: 50%;
    }
  }
  .sidebar {
    width: 50%;
  }
}

@media screen and (min-width: 401px) and (max-width: 900px) {
  .moveOut {
    left: 75%;
    animation-duration: 100ms;
    animation-name: slidein;
    animation-fill-mode: forwards;
  }
  .sidebar {
    position: fixed;
  }
  @keyframes slideout {
    to {
      left: 90%;
    }
    from {
      left: 75%;
    }
  }

  @keyframes slidein {
    from {
      left: 90%;
    }
    to {
      left: 75%;
    }
  }
  .sidebar {
    width: 25%;
  }
}

@media screen and (min-width: 901px) {
  .moveOut {
    left: 85%;
    animation-duration: 100ms;
    animation-name: slidein;
    animation-fill-mode: forwards;
  }
  @keyframes slideout {
    to {
      left: 90%;
    }
    from {
      left: 85%;
    }
  }

  @keyframes slidein {
    from {
      left: 90%;
    }
    to {
      left: 85%;
    }
  }
  .sidebar {
    width: 15%;
  }
}

.sidebar {
  position: fixed;
  z-index: 1000;
  background-color: white;
}

.for-main {
  position: absolute;
  background: none !important;
}
.moveIn {
  left: 100%;
  animation-duration: 100ms;
  animation-name: slideout;
  animation-fill-mode: backwards;
  //display: none;
}
#side-bar-component {
  height: 70px;
}
.moveInit {
  left: 115%;
}

aside {
  width: 90%;
  border-radius: 24px;
  background: var(--c-sidebar);
  padding: 5%;

  nav {
    animation-duration: 1s;
    animation-name: diplay;
    display: grid;

    button {
      --c-color: var(--c-default);
      --c-background: var(--c-sidebar);
      --icon-fill: var(--c-background);
      -webkit-tap-highlight-color: transparent;
      -webkit-appearance: none;
      outline: none;
      background: none;
      border: none;
      padding: 10%;
      margin: 0;
      font-family: "Asap", sans-serif;
      font-size: 2vmin;
      line-height: 24px;
      font-weight: bold;
      text-align: left;
      display: block;
      cursor: pointer;
      position: relative;
      color: var(--c-color);
    }

    button:hover {
      border-radius: 24px;
      background-color: #ebf5fe;
    }
  }
}

.back {
  background: none;
  border: none;
  cursor: pointer;
  font-size: xx-large;
  width: 100%;
  text-align: left;
}

</style>
