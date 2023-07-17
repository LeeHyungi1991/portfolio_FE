<template>
  <div class="skill-container pad-2-percent d-flex justify-content-center">
    <loading :active="isLoading" :is-full-page="fullPage"/>
    <b-row class="w-90 border" style="padding: 2%;">
      <b-col cols="4">
        <div class="h-100 d-flex text-left justify-content-start flex-column">
          <b-icon-arrow-left @click="$router.push({name: 'Skill'})" class="back-arrow"></b-icon-arrow-left>
          <b-form-group label-for="url" class="mag-top-30px">
            <template #label>
              <span style="font-size: 2vmin;">URL 예시) <input value="https://www.naver.com" readonly></span>
            </template>
            <b-form-input placeholder="Protocol을 포함한 Full URL을 입력해주세요" id="url" v-model="url"></b-form-input>
          </b-form-group>
          <b-form-group label-for="selector" style="margin-top: 1%;">
            <template #label>
              <span style="font-size: 2vmin;">CSS Selector Or XPath 예시) <input value="//div//img" readonly></span>
            </template>
            <b-form-textarea style="height: 50vh !important;" placeholder="CSS Selector 혹은 XPath 문법을 입력해주세요." id="selector"
                             v-model="selector"></b-form-textarea>
          </b-form-group>
          <b-button variant="primary" @click="scrape" size="lg" style="margin-top: 3%;">스크랩</b-button>
        </div>
      </b-col>
      <b-col cols="4">
        스크랩 결과
        <b-form-textarea class="h-90" v-model="result" rows="10" readonly></b-form-textarea>
      </b-col>
      <b-col cols="4">
        렌더링 된 화면
        <iframe class="h-90 d-block w-100 border overflow-y-scroll" ref="iframe"></iframe>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import EventBus from "@/eventbus/EventBus";
/* eslint-disable */
export default {
  name: "Scraper",
  koreanName: "웹 스크래핑",
  image: require("@/assets/images/scrap.png"),
  data() {
    return {
      isLoading: false,
      fullPage: true,
      url: "",
      selector: "",
      result: ""
    }
  },
  components: {
    Loading
  },
  mounted() {
    EventBus.$emit("showHeader");
  },
  methods: {
    scrape() {
      const that = this;
      this.isLoading = true;
      this.$axiosPostWithAuth(this.$store.getters.getApiString("api/v2/post/scrap"), {
        url: that.url,
        selector: that.selector
      }).then(res => {
        if (res.data.success) {
          that.result = res.data.data;
          const iframe = that.$refs.iframe;
          const iframedoc = iframe.contentDocument || iframe.contentWindow.document;
          iframedoc.body.innerHTML = res.data.data;
        } else {
          if (res.data.error.includes("The supplied URL")) {
            alert("올바른 URL을 입력해주세요.");
          }
        }
        that.result = res.data.data;
      }).catch(err => {
        console.log(err);
      }).finally(() => {
        that.isLoading = false;
      });
    }
  }
}
</script>

<style scoped>

</style>
