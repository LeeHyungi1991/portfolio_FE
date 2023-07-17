<template>
  <div id="documents" style="height: 100vh">
    <vuetable ref="vuetable"
              class="vue-table"
              :fields="columns"
              :api-mode="false"
              :data="items"
              :css="css.table"
    ></vuetable>
  </div>
</template>

<script>
import EventBus from "@/eventbus/EventBus";
import Vuetable from 'vuetable-2'
import CssForBootstrap4 from '../components/VuetableCssBootstrap4'
/* eslint-disable */
export default {
  name: "Documents",
  created() {
    EventBus.$emit('showHeader');
  },
  components: {
    Vuetable
  },
  methods: {
    formatBytes(bytes, decimals = 2) {
      if (!+bytes) {
        return '0 Bytes';
      }
      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    }
  },
  data() {
    const that = this;
    return {
      css: CssForBootstrap4,
      items: [
        {
          name: 'resume.txt',
          various: '이력서',
          size: '100000000',
          downloadLink: 'gusrldlqslek@gmail.com'
        },
        {
          name: 'introduceMe.txt',
          various: '자기소개서',
          size: '100000000',
          downloadLink: 'gusrldlqslek@gmail.com'
        }
      ],
      total: 0,
      columns: [
        {
          name: 'name',
          title: '문서명'
        },
        {
          name: 'various',
          title: '종류'
        },
        {
          name: "size",
          title: "용량",
          formatter(value) {
            return that.formatBytes(value);
          }
        },
        {
          name: "downloadLink",
          title: "다운로드",
          formatter(value) {
            return `<button class="btn btn-secondary btn-sm" onclick="window.downloadFile('${value}')">다운로드</button>`
          }
        }
      ],
      actions: []
    }
  }
}
</script>

<style scoped>
#documents {
  padding-top: 69px;
  overflow-y: scroll;
  height: 90vh;
}
#documents .vue-table {
  padding: 100px;
}
</style>
