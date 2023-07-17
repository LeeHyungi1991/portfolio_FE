<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Asap&display=swap');

* {
  margin: 0;
  box-sizing: border-box;
  font-family: "Asap", sans-serif;
}

body {
  background: #42455a;
}

#main {
  box-shadow: 1rem 1rem 1rem 1rem rgb(68 68 68 / 20%);
  width: 75%;
  position: absolute;
  left: 13%;
}

section {
  min-height: 100vh;
}

section .main-container {
  /*margin: 100px;*/
}

section h1 {
  font-size: 3rem;
  margin: 20px;
}

section h2 {
  font-size: 40px;
  text-align: center;
  text-transform: uppercase;
}

section .text-main-container {
  display: flex;
}

.section-title {
  font-size: 10vmin;
}

.section-sub-title {
  font-size: 3vmin;
  color: inherit;
}

@media (max-width: 900px) {
  section h1 {
    font-size: 2rem;
    text-align: center;
  }

  section .text-main-container {
    flex-direction: column;
  }
}

.reveal {
  position: relative;
  transform: translateY(150px);
  opacity: 0;
  transition: 1s all ease;
}

.reveal.active {
  transform: translateY(0);
  opacity: 1;
}

#main .unknown-profile {
  border-radius: 50%;
}

.background-image-url-turing {
  background-image: url('../assets/images/turing-4.jpg');
  background-size: cover;
}

#main {
  overflow-y: hidden;
  height: 100vh;
}

@media screen and (min-width: 601px) {
  .github-image {
    width: 2.5vmin;
    height: 2.5vmin;
  }

  .black-sub-name {
    font-size: 5vmin !important;
  }

  .white-sub-name {
    font-size: 5vmin !important;
  }
}


@media screen and (max-width: 600px) {
  .github-image {
    width: 5vmin;
    height: 5vmin;
  }

  .black-sub-name {
    font-size: 8vmin !important;
  }

  .white-sub-name {
    font-size: 8vmin !important;
  }
}

#main::-webkit-scrollbar-thumb {
  background-color: #E0FFFF;
}

#main::-webkit-scrollbar-track {
  background-color: #002856;
}

#main::-webkit-scrollbar {
  width: 0.3vw;
  background-color: #E0FFFF;
}

.snap-0 {
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

.snap-0 section {
  height: 100vh;
}

.snap-1 {
  height: fit-content;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  background: #FFFFFF;
  height: fit-content;
  color: #42455a;
}

.snap-1 section {
  margin-top: 70px;
  height: calc(100% - 70px);
  display: flex;
  width: 100%;
  z-index: 100;
  color: #42455a;
  background: #FFFFFF;
  justify-content: space-evenly;
}

.snap-2 {
  scroll-snap-align: start;
  scroll-snap-stop: always;
  /*display: flex;*/
  /*justify-content: center;*/
  background: white;
  /*padding-top: 2%;*/
}

.snap-2 section {
  margin-top: 70px;
  height: calc(100% - 70px);
  display: flex;
  width: 100%;
  z-index: 100;
  color: #42455a !important;
  justify-content: space-evenly;
  background: white;
}

@media screen and (max-height: 800px) and (min-height: 501px) {
  .snap-3 {
    height: 150vh;
  }
}

@media screen and (min-height: 801px) {
  .snap-3 {
    height: 150vh;
  }
}

.snap-3 {
  scroll-snap-align: start;
  scroll-snap-stop: always;
  color: #42455a;
  background: #FFFFFF;
  height: fit-content;
}

.snap-3 > section {
  min-height: 1300px !important;
}

.snap-4 {
  scroll-snap-align: start;
  scroll-snap-stop: always;
  color: #e0ffff;
  background-color: #002856;
  height: fit-content;
  min-height: 105vh;
}

.snap-4 > section {
  height: fit-content;
}

.y-mandatory {
  scroll-snap-type: y mandatory;
}

.y-proximity {
  scroll-snap-type: y proximity;
}

.personal ul {
  list-style: none;
}

.personal div.personal-image {
  padding: 5%;
}

.personal .name-div .name-list .name-list-item {
}

.personal .name-div .name-list .name-list-item .main-name {
  line-height: 1;
}

.personal .name-div {
}

.personal {
  margin-bottom: 15px;
}

table.info-table {
  font-size: 2vmin;
}

.info-div > table.info-table > tr > .key {
  text-align: center;
  /*font-size: 2vmin;*/
}

.info-div > table.info-table > tr > .value {
  text-align: left;
  /*font-size: 1.6vmin;*/
  padding-left: 3%;
  font-weight: bolder;
}

.info-div {
  display: flex;
  justify-content: start;
  margin-left: 10%;
}

.personal .name-div .name-list .name-list-item span.main-name {
  font-family: NanumBrushScript, serif;
  font-size: 5vmin;
}

.personal .name-div .name-list .name-list-item span.sub-name {
  font-family: QwitcherGrypen, serif;
  font-size: 4vmin;
}

.black-sub-name {
  position: absolute;
  font-family: QwitcherGrypen, serif;
  left: 2.5vmin;
  top: 1.5vmin;
  z-index: 300;
}

.white-sub-name {
  position: absolute;
  font-family: QwitcherGrypen, serif;
  left: 2.5vmin;
  top: 0.7vmin;
  z-index: 300;
  color: white;
}

.skill-image {
  width: 75%;
  height: 13vh;
}

@media screen and (max-width: 650px) {
  .skill-card {
    width: 100% !important;
  }
}

.skill-card {
  height: 70vh;
  width: 40%;
  box-shadow: 1rem 1rem 1rem 1rem rgb(68 68 68 / 20%);
  padding: 1%;
  position: relative;
  margin-bottom: 5%;
  border: none;
}

.skill-card .card-header {
  background: none;
}

.skill-card .card-footer {
  font-weight: bold;
}

.skill-card .card-footer .card-text {
  min-width: 16vw;
  font-size: 0.8vmax;
}

.skill-card .card-scroll {
  overflow-y: auto !important;
  height: 55%;
  position: relative;
}

.card-hover:hover {
  background-color: rgba(0, 0, 0, 0.6);
  color: white !important;
}

.demon-name:hover {
  background-color: rgba(0, 0, 0, 0.6);
  color: white !important;
}

.demon-name {
  font-size: 1.5rem;
  width: 100%;
  height: 100%;
  text-align: left;
  padding: 10%;
}

.smallnav {
  position: absolute;
  top: 10px;
  left: 10px;
}

.smallnav img {
  cursor: pointer;
}

.border-me-red {
  border: 5px solid red;
}

.bg-me-red {
  background-color: red;
}

.border-me-orange {
  border: 5px solid orange;
}

.bg-me-orange {
  background-color: orange;
}

.border-me {
  border: 5px solid #002856;
}

.bg-me {
  background: #002856;
}

.border-me-dark {
  border: 5px solid #212529;
}

.bg-me-dark {
  background: #212529;
}

.border-me-green {
  border: 5px solid green;
}

.bg-me-green {
  background: green;
}

@media screen and (max-width: 400px) {
  .custom-card-body {
    font-size: 1vh !important;
  }

  .custom-card-header {
    font-size: 1.3vh !important;
  }
}

.custom-card-body {
  padding: 5%;
  text-align: left;
  line-height: 2;
  font-family: sans-serif;
  font-size: 2vh;
  font-weight: bolder;
}

.custom-card-header {
  font-weight: bold;
  font-size: 2.3vh;
}

#main .card-component {
  width: 23%;
  cursor: pointer;
  font-weight: bold;
  height: 18vw !important;
  border: none !important;
}
</style>
<style scoped lang="sass">
.candy-stripe
  width: 100%

  ul
    width: 100%
    list-style: none
    padding: 0
    margin: 0
    display: flex
    justify-content: space-between
    background:
      color: #002856

.stripe
  width: 100%
  height: 1rem
  margin: 0
  clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)

  @media (min-width: 900px)
    height: 1.5rem

  &:nth-child(even)
    background:
      color: #f5f5f5
    width: 150%
</style>
<template>
  <!--  class="y-mandatory"-->
  <div id="main" ref="main" @scroll.prevent="handleScroll" class="overflow-y-scroll overflow-x-hidden">
    <loading :active="isLoading" :is-full-page="fullPage" :opacity="0">
      <b-spinner label="Spinning"></b-spinner>
    </loading>
    <section class="snap-0" ref="snap-0" :style="transition1">
      <section class="d-flex pos-relative">
        <div class="white-sub-name">Tranquil Worker</div>
        <div style="z-index: 1000;" class="white pos-absolute vertical-space-around-by-flex-column h-100 w-100">
          <div class="personal w-100 pad-25-percent pad-top-bottom-0-percent">
            <div class="personal-image">
<!--              <img src="../assets/images/tranquil-icon.jpg" class="w-100 unknown-profile">-->
            </div>
            <div class="name-div">
              <ul class="name-list p-0">
                <li class="name-list-item">
                  <span class="main-name">아아.. 이것은 바로 여백의 미..</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="info-div w-90">
            <table class="info-table">
              <tr>
                <th class="key">📛</th>
                <td class="value" v-text="personalInfo.name"></td>
              </tr>
<!--              <tr>-->
<!--                <th class="key">📱</th>-->
<!--                <td class="value" v-text="personalInfo.phone"></td>-->
<!--              </tr>-->
              <tr>
                <th class="key">📧</th>
                <td class="value" v-text="personalInfo.email"></td>
              </tr>
              <tr>
                <th class="key"><img src="../assets/images/4601_github.png" class="github-image"
                                     alt="github"></th>
                <td class="value"><a href="https://github.com/LeeHyungi1991" v-text="personalInfo.github"></a></td>
              </tr>
            </table>
          </div>
        </div>
        <div class="h-100 w-100 bg-dark">
          <div class="bg-black">
            <!--            <img src="../assets/images/two.jpg" class="w-100 vh-100">-->
          </div>
          <!--          <VueSlickCarousel :arrows="true" :dots="true" :infinite="true" :slidesToShow="1" :slidesToScroll="1"-->
          <!--                            :autoplay="true" :autoplaySpeed="3000" :speed="3000">-->
          <!--            <div>-->
          <!--              <img :src="$store.getters.getFileServerString('images/mainTop/one.jpg')" class="w-100 vh-100">-->
          <!--            </div>-->
          <!--            <div>-->
          <!--              <img :src="$store.getters.getFileServerString('images/mainTop/two.jpg')" class="w-100 vh-100">-->
          <!--            </div>-->
          <!--            <div>-->
          <!--              <img :src="$store.getters.getFileServerString('images/mainTop/three.jpg')" class="w-100 vh-100">-->
          <!--            </div>-->
          <!--            <div>-->
          <!--              <img src="../assets/images/one.jpg" class="w-100 vh-100">-->
          <!--            </div>-->
          <!--            <div>-->
          <!--              <img src="../assets/images/two.jpg" class="w-100 vh-100">-->
          <!--            </div>-->
          <!--            <div>-->
          <!--              <img src="../assets/images/three.jpg" class="w-100 vh-100">-->
          <!--            </div>-->
          <!--          </VueSlickCarousel>-->
        </div>
      </section>
    </section>
<!--    <section class="snap-2 " ref="snap-2" :style="transition3">-->
<!--      &lt;!&ndash;      <div class="candy-stripe">&ndash;&gt;-->
<!--      &lt;!&ndash;        <ul>&ndash;&gt;-->
<!--      &lt;!&ndash;          <li class="stripe"></li>&ndash;&gt;-->
<!--      &lt;!&ndash;          <li class="stripe"></li>&ndash;&gt;-->
<!--      &lt;!&ndash;          <li class="stripe"></li>&ndash;&gt;-->
<!--      &lt;!&ndash;          <li class="stripe"></li>&ndash;&gt;-->
<!--      &lt;!&ndash;          <li class="stripe"></li>&ndash;&gt;-->
<!--      &lt;!&ndash;          <li class="stripe"></li>&ndash;&gt;-->
<!--      &lt;!&ndash;          <li class="stripe"></li>&ndash;&gt;-->
<!--      &lt;!&ndash;          <li class="stripe"></li>&ndash;&gt;-->
<!--      &lt;!&ndash;          <li class="stripe"></li>&ndash;&gt;-->
<!--      &lt;!&ndash;        </ul>&ndash;&gt;-->
<!--      &lt;!&ndash;      </div>&ndash;&gt;-->
<!--      <section>-->
<!--        <div class="main-main-container reveal w-100">-->
<!--          <div class="section-title">Skills</div>-->
<!--          <div-->
<!--              class="d-flex align-items-baseline pad-2-percent justify-content-evenly w-100 overflow-x-auto flex-wrap mt-5">-->
<!--            <b-card-->
<!--                img-alt="Image"-->
<!--                img-top-->
<!--                tag="article"-->
<!--                class="pad-1-percent skill-card"-->
<!--                body-class="h-100"-->
<!--            >-->
<!--              <b-card-header>-->
<!--                <b-card-title>-->
<!--                  Front-Layer-->
<!--                </b-card-title>-->
<!--              </b-card-header>-->
<!--              <b-card-body>-->
<!--                <div class="h-50 d-flex justify-content-start flex-center">-->
<!--                  <b-card-img class="skill-image w-40"-->
<!--                              src="https://fileserver.tranquil-worker.com/images/frontends.PNG"></b-card-img>-->
<!--                </div>-->
<!--              </b-card-body>-->
<!--              <b-card-footer class="card-scroll">-->
<!--                <b-card-text class="text-left">-->
<!--                  백엔드 영역이 커리어 주경력이라고 생각하지만<br>-->
<!--                  웹 개발자로서 자신을 표현하기 위해<br>-->
<!--                  간단한 프론트 레이어단 기술들을 익혀놨습니다.<br>-->
<!--                  필요에 따라 다른 프레임워크도<br>-->
<!--                  학습하여 사용할 수 있습니다.-->
<!--                </b-card-text>-->
<!--              </b-card-footer>-->
<!--            </b-card>-->
<!--            <b-card-->
<!--                img-alt="Image"-->
<!--                img-top-->
<!--                tag="article"-->
<!--                class="pad-1-percent skill-card"-->
<!--                body-class="h-100"-->
<!--            >-->
<!--              <b-card-header>-->
<!--                <b-card-title>-->
<!--                  BackEnd-Layer-->
<!--                </b-card-title>-->
<!--              </b-card-header>-->
<!--              <b-card-body>-->
<!--                <div class="d-flex justify-content-start flex-center">-->
<!--                  <b-card-img class="skill-image"-->
<!--                              src="https://fileserver.tranquil-worker.com/images/backends.PNG"></b-card-img>-->
<!--                </div>-->
<!--              </b-card-body>-->
<!--              <b-card-footer class="card-scroll">-->
<!--                <b-card-text class="text-left">-->
<!--                  주 경력이 되는 백엔드 개발 분야입니다.-->
<!--                  <br>-->
<!--                  언어는 Java를 주로 사용하며 주로 Spring Framework를 기반으로 <br>-->
<!--                  웹 API 환경을 구축하는 업무를 자주 했습니다.<br>-->
<!--                  데이터 베이스의 경우에는 관계형 데이터 베이스는 Postgresql를,<br>-->
<!--                  대용량 적재용 데이터 베이스는 MongoDB를,<br>-->
<!--                  대용량 검색용 데이터 베이스는 ElasticSearch를 주로 사용하였습니다 <br>-->
<!--                  또한 상단의 이미지에 있는 기술들은 전부 <br>-->
<!--                  비즈니스 레벨에서 한번씩은 사용한 적 있는 기술들입니다.<br>-->
<!--                  그리고 필요에 따라 다른 언어나 프레임워크도<br>-->
<!--                  학습하여 사용할 수 있습니다.-->
<!--                </b-card-text>-->
<!--              </b-card-footer>-->
<!--            </b-card>-->
<!--            <b-card-->
<!--                img-alt="Image"-->
<!--                img-top-->
<!--                tag="article"-->
<!--                class="pad-1-percent skill-card"-->
<!--                body-class="h-100"-->
<!--            >-->
<!--              <b-card-header>-->
<!--                <b-card-title>-->
<!--                  Deploy-Environment-->
<!--                </b-card-title>-->
<!--              </b-card-header>-->
<!--              <b-card-body>-->
<!--                <div class="d-flex justify-content-start flex-center">-->
<!--                  <b-card-img class="skill-image"-->
<!--                              src="https://fileserver.tranquil-worker.com/images/deploys.PNG"></b-card-img>-->
<!--                </div>-->
<!--              </b-card-body>-->
<!--              <b-card-footer class="card-scroll">-->
<!--                <b-card-text class="text-left pad-2-percent">-->
<!--                  배포는 주로 웹서버 기반 환경을 다루었는데, 클라우드 환경으로는 AWS나 코노하라는 클라우드 서비스를<br>-->
<!--                  주로 사용하였지만 IDC에 들어가 있는 서버를 다루기도 하였습니다.<br><br>-->
<!--                  배포 환경의 운영체제는 주로 리눅스, 윈도우 서버이며 이에 따라 필요한 Batch, Shell, PowerShell 스크립트 작성이 가능합니다. <br>-->
<!--                  다만 Docker나 Kubernetes와 같은 컨테이너 기반의 배포 환경은 솔직하게 말하자면 경험이 없습니다.<br>-->
<!--                  이 부분이 개인적으로 아쉬워서 최근 이러한 환경을 현재 학습중에 있습니다.<br><br>-->
<!--                  웹서버의 경우엔 Apache, Nginx를 주로 사용하였으며 이에 따라 필요한 설정들을 할 수 있습니다.<br>-->
<!--                  또한 웹서버의 경우에는 SSL 인증서 발급 및 설정을 할 수 있습니다.<br><br>-->
<!--                  분산 컴퓨팅 방식인 Hadoop 환경을 회사 내에 직접 구축한 업무 경험 및<br>-->
<!--                  Jenkins를 활용하여 배포 자동화를 수행한 업무 경험이 있습니다.<br>-->
<!--                </b-card-text>-->
<!--              </b-card-footer>-->
<!--            </b-card>-->
<!--            <b-card-->
<!--                img-alt="Image"-->
<!--                img-top-->
<!--                tag="article"-->
<!--                class="pad-1-percent skill-card"-->
<!--                body-class="h-100"-->
<!--            >-->
<!--              <b-card-header>-->
<!--                <b-card-title>-->
<!--                  Version-Control & Co-operation-->
<!--                </b-card-title>-->
<!--              </b-card-header>-->
<!--              <b-card-body>-->
<!--                <div class="h-50 d-flex justify-content-start flex-center">-->
<!--                  <b-card-img class="skill-image h-50"-->
<!--                              src="https://fileserver.tranquil-worker.com/images/coop.PNG"></b-card-img>-->
<!--                </div>-->
<!--              </b-card-body>-->
<!--              <b-card-footer class="card-scroll">-->
<!--                <b-card-text class="text-left">-->
<!--                  협업을 해야 하거나 버전 컨트롤이 필요할 경우<br>-->
<!--                  Git을 사용하였으며,<br>-->
<!--                  주로 IDE 내장 기능을 활용하여 자주 사용하나<br>-->
<!--                  기본적인 명령어들은 숙지해두고 있는 편입니다.<br>-->
<!--                  3달 정도 슬랙과 노션을 활용하는 팀에서 일했던 경험이 있습니다.<br>-->
<!--                </b-card-text>-->
<!--              </b-card-footer>-->
<!--            </b-card>-->
<!--            <b-card-->
<!--                img-alt="Image"-->
<!--                img-top-->
<!--                tag="article"-->
<!--                class="pad-1-percent skill-card"-->
<!--                body-class="h-100"-->
<!--            >-->
<!--              <b-card-header>-->
<!--                <b-card-title>-->
<!--                  Dev-Tools & IDE-->
<!--                </b-card-title>-->
<!--              </b-card-header>-->
<!--              <b-card-body>-->
<!--                <div class="h-50 d-flex justify-content-start flex-center">-->
<!--                  <b-card-img class="skill-image h-50"-->
<!--                              src="https://fileserver.tranquil-worker.com/images/dev-tools.PNG"></b-card-img>-->
<!--                </div>-->
<!--              </b-card-body>-->
<!--              <b-card-footer class="card-scroll">-->
<!--                <b-card-text class="text-left">-->
<!--                  IDE는 전반적으로 JetBrain사 제품을 선호하여<br>-->
<!--                  개인적으로 풀 라이선스를 등록하여 사용하고 있습니다.<br>-->
<!--                  물론 VsCode 또한 업무상 사용할 일이 많았는데 괜찮게 쓴 걸로 기억을 합니다.<br>-->
<!--                  요즘은 Copilot을 IDE와 연동하여 써보고 있는데,<br>-->
<!--                  굉장히 파워풀 한 것 같습니다.<br>-->
<!--                  개인 소스 및 에셋 스토리지는 One Drive을 사용하고 있습니다.<br>-->
<!--                  개인 업무 관리는 간단하게 Google TaskBoard를 사용하고 있습니다.<br>-->
<!--                  Copilot은 해당 포트폴리오의 제작에도 사용되었습니다.<br>-->
<!--                </b-card-text>-->
<!--              </b-card-footer>-->
<!--            </b-card>-->
<!--          </div>-->
<!--        </div>-->
<!--      </section>-->
<!--    </section>-->
    <!--    <section class="snap-3 " ref="snap-3" :style="transition4">-->
    <!--      <section>-->
    <!--        <div class="main-container reveal">-->
    <!--          <div v-if="components" class="skill-container pad-2-percent d-flex justify-content-center">-->
    <!--            <div>-->
    <!--              <div class="section-title">Timeline</div>-->
    <!--              <div class="mt-5">-->
    <!--              </div>-->
    <!--              <template>-->
    <!--                <vue-timeline-update-->
    <!--                    :date="new Date('2015-01-26')"-->
    <!--                    title="군 입대"-->
    <!--                    description="군 복무 시작"-->
    <!--                    icon="code"-->
    <!--                    theme="light"-->
    <!--                />-->
    <!--                <vue-timeline-update-->
    <!--                    :date="new Date('2016-9-27')"-->
    <!--                    title="군 전역"-->
    <!--                    description="군 복무 종료"-->
    <!--                    icon="code"-->
    <!--                    color="green"-->
    <!--                    theme="light"-->
    <!--                />-->
    <!--                <vue-timeline-update-->
    <!--                    :date="new Date('2020-11-18')"-->
    <!--                    title="E2ON 근무 (1년 6개월)"-->
    <!--                    description="AI 데이터 회사 E2ON에서 <br>시작된 개발자 커리어"-->
    <!--                    thumbnail="https://fileserver.tranquil-worker.com/images/timeline/e2on-icon.jfif"-->
    <!--                    icon="code"-->
    <!--                    theme="light"-->
    <!--                />-->
    <!--                <vue-timeline-update-->
    <!--                    :date="new Date('2022-06-01')"-->
    <!--                    title="ABLY 스크래핑 아르바이트 (3개월)"-->
    <!--                    description="(주)ABLY에서 <br>입점몰 제품 정보 스크래핑 아르바이트를 시작"-->
    <!--                    thumbnail="https://fileserver.tranquil-worker.com/images/timeline/ably-icon.png"-->
    <!--                    icon="code"-->
    <!--                    theme="light"-->
    <!--                />-->
    <!--              </template>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </section>-->
    <!--    </section>-->
    <section class="snap-4" ref="snap-4" :style="transition5">
      <section>
        <div class="main-container reveal">
          <div v-if="components" class="skill-container pad-2-percent" style="top: 70px;">
            <div class="section-title">Demonstrations</div>
            <div class="section-sub-title">간단한 기술 시연을 구현해놓았습니다.</div>
            <div class="d-flex w-100 h-60 justify-content-evenly align-items-center flex-wrap overflow-y-auto mt-5">
              <b-card @click="$router.push({name: component.name})"
                      class="h-100 card-component card-hover text-dark box-shadow p-0"
                      body-class="h-100 p-0"
                      v-for="component in components"
                      :key="component.name">
                <div class="mb-2 pos-absolute demon-name" style="font-size: 1.3rem">{{ component.koreanName }}</div>
                <b-card-img :src="component.image" class="h-100" :alt="component.koreanName"></b-card-img>
              </b-card>
            </div>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script>

import EventBus from "@/eventbus/EventBus";
import {mixin} from "@/mixin/mixin";
import axios from "axios";
import OpenMap from "@/views/Skill/OpenMap";
import OmokBoard from "@/views/Skill/Omok/OmokBoard";
import Mail from "@/views/Skill/Mail";
import Scraper from "@/views/Skill/Scraper";
// import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import Loading from "vue-loading-overlay";
import store from "@/store";
/* eslint-disable */
export default {
  name: "Main",
  mixins: [mixin],
  components: {
    // VueSlickCarousel,
    Loading
  },
  created() {
    const that = this;
    axios.get(this.$store.getters.getApiString("api/v1/personal-info"), {
      headers: {
        "Authorization": "Bearer " + window.localStorage.getItem("access-token")
        // "Authorization": "Bearer " + store.getters.getAccessToken
      }
    }).then(response => {
      that.personalInfo = response.data.data;
    });
  },
  mounted() {
    this.isLoading = false;
    document.querySelector('#side-bar-component').classList.add("side-bar-component");
    if (!window.mobileCheck()) {
      document.querySelector('#side-bar-component').querySelector('#menu').classList.add("for-main");
    }
    EventBus.$emit('hideHeader');
  },
  beforeDestroy() {
    document.querySelector('#side-bar-component').querySelector('#menu').classList.remove("for-main");
    document.querySelector('#side-bar-component').classList.remove("side-bar-component");
  },
  data() {
    return {
      isLoading: true,
      fullPage: true,
      components: [OpenMap, OmokBoard, Mail, Scraper],
      personalInfo: {
        name: '',
        phone: '',
        email: '',
        github: ''
      },
      flag1: 0,
      flag2: 0,
      flag3: 0,
      flag4: 0,
      flag5: 0,
      flagOfChildSection2: 0,
      lastScrollTop: 0
    }
  },
  computed: {
    transition1() {
      return {
        transform: 'translateY(' + this.flag1 + 'px)',
      };
    },
    transition2() {
      return {
        transform: 'translateY(' + this.flag2 + 'px)',
      };
    },
    transitionChild2() {
      return {
        transform: 'translateY(' + this.flagOfChildSection2 + 'px)',
      };
    },
    transition3() {
      return {
        transform: 'translateY(' + this.flag3 + 'px)',
      };
    },
    transition4() {
      return {
        transform: 'translateY(' + this.flag4 + 'px)',
      };
    },
    transition5() {
      return {
        transform: 'translateY(' + this.flag5 + 'px)',
      };
    }
  },
  methods: {
    toggleHeader(e) {
      const that = this;
      const windowHeight = that.$refs.main.clientHeight * 0.5;
      let windowScrollY = that.$refs.main.scrollTop;
      if (windowHeight > windowScrollY + 1) {
        that.hideHeader();
      } else {
        that.showHeader();
      }
    },
    handleFlag(i, value) {
      switch (i + 1) {
        case 1: {
          this.flag1 = value;
          break;
        }
        case 2: {
          this.flag2 = value;
          break;
        }
        case 3: {
          this.flag3 = value;
          break;
        }
        case 4: {
          this.flag4 = value;
          break;
        }
        case 5: {
          this.flag5 = value;
          break;
        }
      }
    },
    handleScroll(e) {
      const that = this;
      const st = e.target.scrollY || e.target.scrollTop;
      const upScroll = st <= this.lastScrollTop;
      that.reveal(e, upScroll);
      const eachHeight = e.target.scrollTop % e.target.clientHeight;
      const clientWidth = e.target.clientWidth;
      if (clientWidth > 600) {
        this.handleFlag(0, eachHeight);
      }
      this.lastScrollTop = st <= 0 ? 0 : st;
      setTimeout(function () {
        that.toggleHeader(e);
      }, 240);
    },
    showHeader() {
      EventBus.$emit('showHeader');
    },
    hideHeader() {
      EventBus.$emit('hideHeader');
    },
    reveal(e, upScroll) {
      const that = this;
      const reveals = document.querySelectorAll(".reveal");
      for (let i = 0; i < reveals.length; i++) {
        // reveals[i].classList.add("active");
        const windowHeight = that.$refs.main.clientHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        if (upScroll) {
          reveals[i].classList.add("active");
          continue;
        }
        let elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add("active");
        } else {
          reveals[i].classList.remove("active");
        }
      }
    }
  }
}
</script>
