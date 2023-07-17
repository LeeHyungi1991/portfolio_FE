<template>
  <div id="career">
    <section class="content">
      <div class="title">
        <!--        <span style="margin-right: 3vmin;">*개인 이력 요약*</span>-->
      </div>
      <div class="download">
        <span>
          <button @click="downloadFile($store.getters.getFileServerString('documents/resume.docx'), '이현기_이력서.docx')">📄 상세 이력서 다운로드</button>
        </span>
      </div>
      <div class="sub-title">
        <span>About Career</span>
      </div>
      <div class="contents">
        <vue-simple-markdown class="text-left" :source="markdownCareer"></vue-simple-markdown>
      </div>
      <div class="sub-title">
        <span>About Study</span>
      </div>
      <div class="contents">
        <vue-simple-markdown class="text-left" :source="markdownStudy"></vue-simple-markdown>
      </div>
    </section>
  </div>
</template>

<script>
/* eslint-disable */
import EventBus from "@/eventbus/EventBus";
import axios from "axios";

export default {
  name: "Career",
  data() {
    return {
      markdownCareer: "",
      markdownStudy: "",
    }
  },
  mounted() {
    EventBus.$emit('showHeader');
  },
  methods: {
    downloadFile(uri, name) {
      axios({
        url: uri,
        method: 'GET',
        responseType: 'blob', // important
      }).then(function (response) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', name);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }).catch(function (error) {
      });
    }
  },
  created() {
    const that = this;
    EventBus.$emit('showHeader');
    axios.get(this.$store.getters.getFileServerString('documents/career.md')).then(markdown => {
      that.markdownCareer = markdown.data;
    });
    axios.get(this.$store.getters.getFileServerString('documents/study.md')).then(markdown => {
      that.markdownStudy = markdown.data;
    });
  },
}
</script>

<style scoped>
#career {
  padding-top: 69px;
  overflow-y: scroll;
  height: 100vh;
}

.markdown-body {
  font-size: 2vmin;
}

#career::-webkit-scrollbar-thumb {
  background-color: #002856;
}

#career::-webkit-scrollbar-track {
  background-color: #E0FFFF;
}

#career::-webkit-scrollbar {
  width: 0.3vw;
  background-color: #E0FFFF;
}

#career section.content {
  padding-left: 10%;
  padding-right: 10%;
  padding-bottom: 10%;
}

#career section.content div.title {
  display: flex;
  justify-content: center;
  text-align: left;
  margin-top: 6%;
}

#career section.content div.title span {
  display: inline-block;
  font-size: 4vmin;
  font-weight: bold;
}

#career section.content div.download {
  text-align: right;
}

#career section.content div.download span button {
  background: #002856;
  color: white;
  font-size: 1.5vmin;
  font-weight: bold;
  padding: 1vmin;
  cursor: pointer;
  border: none;
  box-shadow: 1px 1px 1px black;
}

#career section.content div.sub-title {
  text-align: left;
  margin-top: 3%;
  margin-left: 4%;
  border-bottom: 0.5vmin solid black;
}

#career section.content div.sub-title span {
  margin-left: 1%;
  margin-bottom: 1.5vmin;
  display: inline-block;
  font-size: 3vmin;
  font-weight: bolder;
}

#career section.content div.contents {
  padding: 3% 6%;
}

</style>
