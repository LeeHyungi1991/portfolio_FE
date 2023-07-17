<template>
  <div class="skill-container pad-2-percent d-flex justify-content-center">
    <b-icon-arrow-left @click="$router.push({name: 'Skill'})" class="back-arrow"></b-icon-arrow-left>
    <loading :active="isLoading" :is-full-page="fullPage" :opacity="0">
      메일 전송 중..
      <b-spinner label="Spinning"></b-spinner>
    </loading>
    <div id="mail" class="w-80 p-5 border">
      <div class="h-100">
        <div class="d-flex justify-content-between align-items-center">
          <div class="w-30 h-100 text-left" style="font-size: 2vmin; font-weight: 600;">From
            <b-badge class="badge bg-secondary">gusrldlqslek@gmail.com</b-badge>
          </div>
          <div class="w-10 h-100 text-center" style="font-size: 2vmin; font-weight: 1000;">
            <b-icon-arrow-right></b-icon-arrow-right>
          </div>
          <div class="w-30 h-100 text-left" style="font-size: 2vmin; font-weight: 600;">To
            <b-badge class="badge bg-primary">{{ $store.getters.getUser.email }}</b-badge>
          </div>
          <div class="w-100 h-100 d-flex justify-content-end align-items-center">
            <b-button variant="primary" size="sm" class="w-25" @click="sendMail">메일 보내기</b-button>
          </div>
        </div>
        <div class="file-agent">
          <div class="d-flex justify-content-center align-items-center h-100">
            <label for="attach"
                   class="h-100 w-100 border hover cursor-pointer d-flex justify-content-center align-items-center overflow-x-auto"
                   contenteditable="true" data-text="이곳을 누르거나 파일을 드래그하여 첨부해보세요.">
              <div v-if="files.length > 0" class="d-flex justify-content-start w-100 h-100">
                <div class="w-15 h-100" v-for="(file, index) in files" :key="new Date().getTime() + '-' + file.name"
                     :style="{backgroundImage: `url(${ifImageReturnImageUrl(file)}`}" style="background-size: cover;">
                  <div class="border h-100 d-flex flex-column p-2 text-dark" style="font-weight: 600;">
                    <div class="d-flex justify-content-end">
                      <b-badge class="badge bg-danger" @click="removeFile($event, index)">X</b-badge>
                    </div>
                    <div><span class="bg-dark text-white">{{ file.name }}</span></div>
                    <div><span class="bg-dark text-white">{{ convertByteToVariousByte(file.size) }}</span></div>
                    <div><span
                        class="bg-dark text-white">{{ toContentType(file.name.substring(file.name.indexOf('.') + 1)) }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-10">
                <b-button variant="danger" style="font-size: 3vmin;" @click="removeAll"
                          v-show="files && files.length > 0">X
                </b-button>
              </div>
            </label>
            <input ref="files" id="attach" type="file" class="d-none" @change="inputFile" multiple>
          </div>
        </div>
        <div class="h-5 w-100 d-inline-flex align-items-center" style="margin-top: 1%;">
          <b-input placeholder="메일 제목을 입력해주세요" v-model="subject"></b-input>
        </div>
        <editor
            placeholder="내용을 입력해주세요."
            ref="editor"
            :initialValue="editorText"
            :options="editorOptions"
            class="h-65 editor"
            initialEditType="wysiwyg"
            previewStyle="vertical"
        />
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from "@/eventbus/EventBus";
import '@toast-ui/editor/dist/toastui-editor.css';
import {Editor} from '@toast-ui/vue-editor';
import Loading from "vue-loading-overlay";
/* eslint-disable */
export default {
  name: "Mail",
  koreanName: "메일 서비스",
  image: require("@/assets/images/mail.png"),
  mounted() {
    EventBus.$emit("showHeader");
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      files: [],
      editorText: '',
      editorOptions: {
        hideModeSwitch: true
      },
      uploadPercentage: 0,
      subject: '',
    };
  },
  methods: {
    removeFile(e, index) {
      e.preventDefault();
      this.files.splice(index, 1);
    },
    removeAll(e) {
      e.preventDefault();
      this.files = [];
    },
    ifImageReturnImageUrl(file) {
      const ext = file.name.substring(file.name.indexOf('.') + 1);
      const set = new Set(['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg', 'ico', 'tiff', 'tif', 'jfif']);
      if (set.has(ext)) {
        return URL.createObjectURL(file);
      }
      const filesSrverString = this.$store.getters.getFileServerString("images/");
      switch (ext) {
        case 'txt':
          return filesSrverString + 'text-icon.png';
        case 'html':
          return filesSrverString + 'html-icon.png';
        case 'pdf':
          return filesSrverString + 'pdf-icon.jfif';
        case 'doc':
        case 'docx':
          return filesSrverString + 'word-icon.png';
        case 'xls':
        case 'xlsx':
          return filesSrverString + 'excel-icon.png';
        case 'ppt':
        case 'pptx':
          return filesSrverString + 'ppt-icon.png';
        case 'zip':
        case 'rar':
        case '7z':
          return filesSrverString + 'forbidden-icon.png';
        case 'md':
          return filesSrverString + 'markdown-icon.png';
        default:
          return filesSrverString + 'file-icon.png';
      }
    },
    toContentType(type) {
      switch (type) {
        case 'txt':
          return 'text/plain';
        case 'html':
          return 'text/html';
        case 'jpg':
        case 'jpeg':
          return 'image/jpeg';
        case 'png':
          return 'image/png';
        case 'gif':
          return 'image/gif';
        case 'pdf':
          return 'application/pdf';
        case 'doc':
        case 'docx':
          return 'application/msword';
        case 'xls':
        case 'xlsx':
          return 'application/vnd.ms-excel';
        case 'ppt':
        case 'pptx':
          return 'application/vnd.ms-powerpoint';
        case 'zip':
        case 'rar':
          return 'application/zip';
        default:
          return 'application/octet-stream';
      }
    },
    convertByteToVariousByte(fileSize) {
      fileSize = parseInt(fileSize);
      const array = ['B', 'KB', 'MB', 'GB', 'TB'];
      const temp = fileSize;
      if (fileSize < 1024) {
        return fileSize + array[0];
      }
      let index = -1;
      while (fileSize > 1) {
        index++;
        fileSize /= 1024;
      }
      return (temp / Math.pow(1024, index)).toFixed(2) + array[index];
    },
    inputFile(e) {
      for (let i = 0; i < this.$refs.files.files.length; i++) {
        const ext = this.$refs.files.files[i].name.substring(this.$refs.files.files[i].name.indexOf('.') + 1);
        if (ext === 'zip' || ext === 'rar') {
          alert(this.$refs.files.files[i].name + ' ==> 압축파일은 업로드 할 수 없습니다.');
          return;
        }
        if (ext === 'exe') {
          alert(this.$refs.files.files[i].name + ' ==> 실행파일은 업로드 할 수 없습니다.');
          return;
        }
        this.files.push(this.$refs.files.files[i]);
      }
    },
    inputFilter(e) {
      console.log(e);
      console.log(this.files);
    },
    sendMail() {
      const html = this.$refs.editor.invoke('getHTML');
      const url = this.$store.getters.getApiString('api/v2/post/mail/send-mail');
      const formData = new FormData();
      const that = this;
      formData.append('message', html);
      formData.append('subject', this.subject);
      for (let i = 0; i < this.files.length; i++) {
        formData.append('files[]', this.files[i]);
      }
      this.isLoading = true;
      this.$axiosPostWithAuth(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: function (progressEvent) {
          that.uploadPercentage = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        }.bind(this)
      }).then((res) => {
        if (res.data.data) {
          alert('메일을 성공적으로 보냈습니다.');
        } else {
          alert('메일 전송에 실패했습니다. 원인: ' + res.data.error);
        }
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        that.isLoading = false;
        that.files = [];
        that.subject = '';
        that.$refs.editor.invoke('setMarkdown', '');
        that.uploadPercentage = 0;
      });
    }
  },
  components: {
    editor: Editor,
    Loading
  }
}
</script>

<style scoped>
.click-here-upload {
  height: 3vh !important;
}

.file-agent {
  height: 13vh;
  margin-top: 1%;
}

.editor {
  margin-top: 1%;
}
</style>
