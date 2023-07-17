<template>
  <div id="login" class="vh-100 vw-100 all-center">
    <div ref="screen" class="animation-screen d-flex justify-content-center align-items-center" v-if="showAnimation">
      <div class="w-100 d-grid justify-content-center">
        <div class="mb-5">
          <div>
            <div style="display: flex; justify-content: center; align-items: center; width: 100%; height: fit-content;">
              <div>
                <div class="steamers" style="display: flex; justify-content: space-evenly; margin-bottom: 5px; position: relative;">
                  <div class="test">
                    <div class="steam">
                      <div class="one"></div>
                      <div class="two"></div>
                    </div>
                    <div class="steam-2">
                      <div class="one"></div>
                      <div class="two"></div>
                    </div>
                    <div class="steam-3">
                      <div class="one"></div>
                      <div class="two"></div>
                    </div>
                  </div>
                </div>
                <div class="cup">
                  <img class="cup-icon" src="https://fileserver.tranquil-worker.com/documents/tranquil-icon.jpg">
                </div>
              </div>
              <div>
                <div style="height: 100px;"></div>
                <div class="grab">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="width: fit-content; height: 15vh; min-height: fit-content;">
          <div ref="type1">
            <h1 style="font-weight: bold;">어서오게, 낮선이여...</h1>
          </div>
          <div ref="type2">
            <h1 style="font-weight: bold;" class="d-none">여기는 개인 연습용 사이트라네.</h1>
          </div>
        </div>
      </div>
    </div>
    <section class="login-section">
<!--      <div class="picture-div vertical-center-by-flex-column">-->
<!--        <img src="../assets/images/one.jpg" class="login-banner">-->
<!--      </div>-->
      <div class="text-div vertical-center-by-flex-column align-items-center pos-relative w-100">
<!--           style="background: rgb(0 0 0 / 2%);">-->
        <div class="black-sub-name">Tranquil Worker</div>
<!--        <div class="personal-image">-->
<!--          <img src="../assets/images/tranquil-icon.jpg" class="unknown-profile">-->
<!--        </div>-->
        <div class="main-name-div mb-5">
          <span class="main-name">개발 연습용</span>
          <span class="main-name">포트폴리오 사이트</span>
        </div>
        <div class="login-div mt-5">
<!--          <div>-->
<!--            <input ref="account" type="text" placeholder="아이디" v-model="account" v-on:keyup.enter="focusPassword">-->
<!--          </div>-->
<!--          <div>-->
<!--            <input ref="password" type="password" placeholder="패스워드" v-model="password"-->
<!--                   v-on:keyup.enter="login(account, password)">-->
<!--          </div>-->
<!--          <div>-->
<!--            <button class="login-button" @click="login(account, password)">로그인</button>-->
<!--          </div>-->
          <div class="d-flex justify-content-center">
            <div ref="signin" id="signin" class="signin hover">
            </div>
          </div>
        </div>
        <div class="login-message">
          <span v-text="loginMessage"></span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {mixin} from "@/mixin/mixin";
import EventBus from "@/eventbus/EventBus";
/* eslint-disable */
export default {
  name: "Login",
  mixins: [mixin],
  created() {
    EventBus.$on('writeLoginStatus', this.writeLoginStatus);
    EventBus.$on('inputEmpty', this.inputEmpty);
  },
  mounted() {
    const that = this;
    this.$refs.type1.classList.add('typewriter');
    setTimeout(function () {
      that.$refs.type1.classList.remove('typewriter');
      that.$refs.type2.children.item(0).classList.remove('d-none');
      that.$refs.type2.classList.add('typewriter');
    }, 2000);
    setTimeout(() => {
      that.$refs.screen.classList.add('fade-out');
      setTimeout(() => {
        that.showAnimation = false;
      }, 1500);
    }, 4500);
    const options = {
      client_id: '283651081912-bj731vvit312js42q5vjd32k90nv50fk.apps.googleusercontent.com', // required
      auto_select: false, // optional
      cancel_on_tap_outside: false, // optional
    };
    that.googleOneTap(options, (response) => {
      that.loginByGoogle(response);
    });
  },
  data() {
    return {
      account: '',
      password: '',
      loginMessage: '',
      showAnimation: true,
    }
  },
  methods: {
    googleOneTap(
        {
          client_id,
          auto_select = false,
          cancel_on_tap_outside = false,
          context = "signin",
          ...otherOptions
        },
        callback
    ) {
      const that = this;
      if (!client_id) {
        throw new Error("client_id is required");
      }

      if (typeof window !== "undefined" && window.document) {
        const contextValue = ["signin", "signup", "use"].includes(context) ? context : "signin";
        const googleScript = document.createElement("script");
        googleScript.src = "https://accounts.google.com/gsi/client";
        googleScript.async = true;
        googleScript.defer = true;
        document.head.appendChild(googleScript);
        const renderButton = function () {
          window.google.accounts.id.initialize({
            client_id: client_id,
            callback: callback,
            auto_select: auto_select,
            cancel_on_tap_outside: cancel_on_tap_outside,
            context: contextValue,
            ...otherOptions,
          });
          window.google.accounts.id.renderButton(that.$refs.signin, {theme: "outline", size: "large"});
        }
        if (window.google) {
          renderButton();
        } else {
          googleScript.onload = renderButton;
        }
      }
    },
    focusAccount(e) {
      if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'BUTTON') {
        this.$refs.account.focus();
      }
    },
    focusPassword() {
      this.$refs.password.focus();
    },
    inputEmpty() {
      this.account = '';
      this.password = '';
    },
    writeLoginStatus(text) {
      this.loginMessage = text;
    },
    copy(text) {
      navigator.clipboard.writeText(text);
    }
  }
}
</script>

<style scoped>
#login {

}

#login .guide-message {
  position: absolute;
  z-index: 1000;
  background: black;
  color: white;
  left: 0%;
  top: 0%;
  font-size: 1.8vmin;
  text-align: left;
  font-weight: bolder;
  padding: 1%;
}

#login .animation-screen {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 40, 86, 1);
  z-index: 1000;
  color: white;
}

.fade-out {
  animation: fadeout 3s;
  -moz-animation: fadeout 3s; /* Firefox */
  -webkit-animation: fadeout 3s; /* Safari and Chrome */
  -o-animation: fadeout 3s; /* Opera */
  animation-fill-mode: forwards;
}

#login .login-section {
  background: white;
  display: flex;
  /*width: 100%;*/
  justify-content: space-evenly;
  /*height: 100vh;*/
  border-radius: 1%;
  width: 30%;
  height: 80vh;
  box-shadow: 1px 1px 1px 1px black;
  /*box-shadow: 0 1px 1px rgb(0 0 0 / 13%);*/
}

#login .login-section .black-sub-name {
  position: absolute;
  top: 1%;
  right: 3%;
  font-family: QwitcherGrypen, serif;
  font-size: 4vmin;
}

@media (max-width: 950px) {
  #login .login-section .picture-div {
    width: 0;
  }

  #login .login-section .text-div {
    width: 100%;
  }

  #login .login-section {
    height: fit-content !important;
  }
}

/*@media (min-width: 951px) {
  #login .login-section .picture-div {
    width: 65%;
  }

  #login .login-section .text-div {
    width: 35%;
  }
}*/

#login .login-section .login-banner {
  height: 100%;
  width: 100%;
  border-radius: 1% 0 0 1%;
}

#login .unknown-profile {
  border-radius: 50%;
  width: 22vmin;
}

#login .login-section .login-div {
  display: grid;
  //width: 60%;
  //grid-template-rows: 3fr 3fr 3fr 2fr;
}

#login .login-section .login-div .signin {
  height: 44px !important;
}

@media screen and (max-width: 600px) {
  #login .login-section .login-div input {
    font-size: 4vmin !important;
  }

  #login .unknown-profile {
    width: 30vmin !important;
  }
  #login {
    overflow-y: auto;
  }
  #login .login-section .login-div {
    width: 70% !important;
    grid-template-rows: 2fr 3fr 3fr 2fr !important;
  }
}

#login .login-section .login-div input {
  border: none;
  border-bottom: 1px solid #002856;
  background-color: rgb(0 0 0 / 0%);
  font-size: 2vmin;
  line-height: 2.5;
}

#login .login-section .login-div input:focus {
  outline: none;
  border-bottom: 1px solid aqua;
}

#login .login-section .login-div .login-button:hover {
  background-color: #E0FFFF;
  color: black;
}

#login .login-section .login-message {
  margin-top: 15px;
  font-weight: bolder;
  color: red;
}

#login .login-section .login-div .login-button {
  height: 44px;
  border: none;
  padding: 1vh;
  width: 200px;
  color: white;
  font-weight: bold;
  background-color: #002856;
}

#login .login-section .login-div .google-login-button:hover {
  background-image: url('../assets/images/btn_google_signin_dark_focus_web@2x.png');
}

#login .login-section .login-div .google-login-button {
  height: 48px;
  border: none;
  padding: 1vh;
  width: 200px;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url('../assets/images/btn_google_signin_light_focus_web@2x.png');
}

#login .personal-image {
  margin-bottom: 2%;
}

#login .main-name-div {
  display: flex;
  flex-direction: column;
}

#login .main-name-div .main-name {
  font-family: NanumBrushScript, serif;
  font-size: 5vmin;
}

#login .personal-image img {
  border-radius: 10%;
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: orange; }
}
.typewriter h1 {
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: .15em solid orange; /* The typwriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  letter-spacing: .15em; /* Adjust as needed */
  animation:
      typing 2s steps(40, end),
      blink-caret .75s step-end infinite;
}

.cup {
  width: 90px;
  height: 90px;
  border-radius: 0 0 23px 23px;
  background: #FFFFFF;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.grab {
  width: 20px;
  height: 30px;
  border-radius: 0 20px 20px 0;
  background: none;
  border-right: 10px solid #FFFFFF;
  border-top: 10px solid #FFFFFF;
  border-bottom: 10px solid #FFFFFF;
  position: relative;
}
.cup-icon{
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.test {
  position: relative;
  width:100%;
  height: 100px;
  overflow: hidden;
  opacity:0.5;
}

.steam {
  position: absolute;
  top:100px;
  animation: steam 1s linear infinite;
}

.steam-2 {
  position: absolute;
  top:100px;
  left:30%;
  animation: steam 1s linear infinite;
}

.steam-3 {
  position: absolute;
  top:100px;
  left:60%;
  animation: steam 1s linear infinite;
}

.one {
  position: absolute;
}

.two {
  position: absolute;
}

.steam:before, .one:before, .two:before, .steam-2:before, .steam-3:before {
  content:"";
  position: absolute;
  border-left: 7px solid #FFFFFF;
  border-top: 7px solid #FFFFFF;
  width:30px;
  height: 30px;
  border-top-left-radius:100%;
  transform: rotate(-40deg);
  box-sizing: unset !important;
}

.one:before {
  top:-93px;
  left:0;
}

.two:before {
  top:-185px;
  left:1.2px;
}

.steam:after, .one:after, .two:after, .steam-2:after, .steam-3:after {
  content:"";
  position: absolute;
  border-right: 7px solid #FFFFFF;
  border-top: 7px solid #FFFFFF;
  width:30px;
  height: 30px;
  border-top-right-radius:100%;
  transform: rotate(40deg);
  box-sizing: unset !important;
}

.steam:after {
  top:-46.5px;
  left:4px;
}

.one:after {
  top: -139.5px;
  left:4px;
}

.two:after {
  top:-231px;
  left:4.7px;
}

.steam-2:after {
  top:-46.5px;
  left:4.5px;
}

.steam-3:after {
  top:-46.5px;
  left:4.5px;
}
@keyframes steam {
  0% {transform: translateY(100px);}
  100% {transform: translateY(7px);}
}

</style>
