<template>
  <div class="skill-container pad-2-percent d-flex justify-content-center">
    <b-icon-arrow-left @click="$router.push({name: 'OmokBoard'})" class="back-arrow"></b-icon-arrow-left>
    <div id="omok" ref="omok" class="w-100">
      <b-row>
        <b-col cols="6">
          <div class="container justify-item-right justify-content-center">
            <div class="message">
            </div>
            <div class="winShow winShow1 bg-dark" v-show="whoWin === 1">
              <div class="trophy">
                <div class="text-white">검정색 승리</div>
                <img id="trophyImg" src="../../../assets/images/trophy.png" width="300px" height="300px" alt="">
                <b-button class="mt-3" variant="primary" @click="toWaiting">한판 더 하기</b-button>
              </div>
            </div>
            <div class="winShow winShow2 bg-white" v-show="whoWin === 2">
              <div class="trophy">
                <div class="text-dark">하얀색 승리</div>
                <img id="trophyImg2" src="../../../assets/images/trophy.png" width="300px" height="300px" alt="">
                <b-button variant="primary" @click="toWaiting">대기화면으로</b-button>
              </div>
            </div>
            <canvas ref="canvas" id="canvas" @click="sendDol"></canvas>
          </div>
        </b-col>
        <b-col cols="6" class="d-flex">
          <div class="w-30 d-flex flex-column justify-content-between">
            <div>
              <div class="text-left d-flex flex-column align-items-baseline">
                <div class="border p-1 w-80 text-center d-flex flex-column all-center">
                  <div v-if="myColor === 1" class="text-dark text-center w-100">
                    <img style="border-radius: 50%;" src="../../../assets/images/blackStone.png">
                  </div>
                  <div v-else-if="myColor === 2" class="text-dark text-center w-100">
                    <img style="border-radius: 50%;" src="../../../assets/images/whiteStone.png">
                  </div>
                  <div v-else>
                    <div style="font-size: 2.5vmin;" class="text-center text-white p-2">
                      <b-badge class="badge bg-dark" style="font-size: 2vmin">게임 전</b-badge>
                    </div>
                  </div>
                  <div v-if="myTurn" style="font-size: 2.5vmin;" class="mt-1 p-2">
                    <b-badge class="badge bg-primary" style="font-size: 2vmin">내 차례</b-badge>
                  </div>
                  <div v-else-if="myColor !== 0" style="font-size: 2.5vmin;" class="mt-1 p-2">
                    <b-badge class="badge bg-danger" style="font-size: 2vmin">상대 차례</b-badge>
                  </div>
                </div>
                <div class="border p-1 w-80 text-center d-flex flex-column all-center" v-if="myColor === 0">
                  <span id="start-button" class="d-inline-block" tabindex="0">
                    <b-button :variant="owner ? 'primary' : 'outline-primary'" :style="{pointerEvents: !owner ? 'none': ''}" :disabled="!owner" @click="start">게임 시작하기</b-button>
                  </span>
                  <b-tooltip placement="bottom" :target="!owner ? 'start-button' : ''">방장이 아닙니다.</b-tooltip>
                </div>
              </div>
            </div>
            <div>
              <virtual-list
                  class="user-list"
                  :data-key="'seq'"
                  :data-sources="users"
                  :data-component="userComponent"
              >
              </virtual-list>
            </div>
          </div>
          <div class="w-70">
            <virtual-list
                class="chat-list"
                :data-key="'index'"
                :data-sources.sync="logs"
                :data-component="chatComponent">
            </virtual-list>
            <b-input-group>
              <b-form-input class="w-90" v-model="message" @change="sendMessage" placeholder="채팅창 입니다.">
              </b-form-input>
              <b-input-group-append class="w-10">
                <button @click="emptyMessages" class="w-100 h-100">
                  <b-icon-arrow-clockwise></b-icon-arrow-clockwise>
                </button>
              </b-input-group-append>
            </b-input-group>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import EventBus from "@/eventbus/EventBus";
import Chat from "@/components/Chat";
import User from "@/components/User";
import store from "@/store";
/* eslint-disable */
export default {
  name: "Omok",
  props: {
    roomNumber: {
      type: Number,
      default: 0
    },
    roomName: {
      type: String,
      default: "즐거운 오목 한판해요!"
    }
  },
  created() {
    if (this.roomNumber === 0) {
      this.$router.push({name: 'OmokBoard'});
      return;
    }
    window.addEventListener('beforeunload', this.reloadHandler);
  },
  mounted: function () {
    EventBus.$emit("showHeader");
    this.connect();
    this.init();
  },
  beforeDestroy() {
    this.disconnect();
    window.removeEventListener('beforeunload', this.reloadHandler);
  },
  data() {
    return {
      userComponent: User,
      users: [],
      chatComponent: Chat,
      whoWin: 0,
      socket: undefined,
      message: "",
      logs: [],
      status: "disconnected",
      canvas: undefined,
      ctx: undefined,
      margin: undefined,
      cw: undefined,
      ch: undefined,
      row: 18,
      rowSize: undefined,
      dolSize: 13,
      count: 0,
      msg: "",
      btn1: "",
      btn2: "",
      checkDirection: [],
      board: [],
      history: [],
      blackWinScreen: undefined,
      whiteWinScreen: undefined,
      myColor: 0,
      myTurn: false,
      owner: false
    };
  },
  methods: {
    reloadHandler(event) {
      event.returnValue = '새로고침하면 게임방을 나가게 됩니다. 정말 새로고침 하시겠습니까?';
    },
    emptyMessages() {
      this.logs = [];
    },
    start() {
      this.sendSomething({
        type: "start",
      });
    },
    toWaiting() {
      this.init();
    },
    init() {
      const canvas = this.$refs.canvas;
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
      this.margin = 30;
      const length = canvas.clientHeight - this.margin * 2;
      this.cw = canvas.width = canvas.height = length + this.margin * 2;
      this.ch = canvas.width = canvas.height = length + this.margin * 2;
      this.row = 18; // 바둑판 선 개수
      this.rowSize = length / this.row; // 바둑판 한 칸의 너비
      this.dolSize = 13; // 바둑돌 크기
      this.count = 0;
      this.msg = document.querySelector(".message");
      this.btn1 = document.querySelector("#reload");
      this.btn2 = document.querySelector("#withdraw");
      this.board = new Array(Math.pow(this.row + 1, 2)).fill(-1); // 144개의 배열을 생성해서 -1로 채움
      this.history = [];
      this.checkDirection = [
        [1, -1],
        [1, 0],
        [1, 1],
        [0, 1],
        [-1, 1],
        [-1, 0],
        [-1, -1],
        [0, -1]
      ];
      this.blackWinScreen = document.querySelector(".winShow1");
      this.whiteWinScreen = document.querySelector(".winShow2");
      this.whoWin = 0;
      this.myColor = 0;
      this.myTurn = false;
      this.draw();
    },
    log: function (param) {
      console.log(param);
    },
    connect() {
      if (this.socket === undefined || this.socket.CLOSED) {
        const that = this;
        this.socket = new WebSocket(this.$store.getters.getWebsocketApi("/ws/chat?token=") + window.localStorage.getItem("access-token") + "&roomNumber=" + this.roomNumber + "&roomName=" + this.roomName);
        // this.socket = new WebSocket(this.$store.getters.getWebsocketApi("/ws/chat?token=") + store.getters.getAccessToken + "&roomNumber=" + this.roomNumber + "&roomName=" + this.roomName);
        this.socket.onopen = function (response) {
          that.status = "connected";
          that.socket.onmessage = ({data}) => {
            const obj = JSON.parse(data);
            const message = obj.message;
            const name = obj.name;
            switch (obj.type) {
              case "warn": {
                that.logs.push({
                  data: message,
                  event: name,
                  index: new Date().getTime()
                });
                break;
              }
              case "chat": {
                that.logs.push({
                  data: message,
                  event: name,
                  index: new Date().getTime()
                });
                that.owner = obj.owner;
                break;
              }
              case "end": {
                that.logs.push({
                  data: message,
                  event: name,
                  index: new Date().getTime()
                });
                that.owner = obj.owner;
                break;
              }
              case "exit": {
                that.init();
                that.logs.push({
                  data: message,
                  event: name,
                  index: new Date().getTime()
                });
                that.owner = obj.owner;
                break;
              }
              case "start": {
                that.logs.push({
                  data: message,
                  event: name,
                  index: new Date().getTime()
                });
                that.init();
                that.myColor = obj.myColor;
                that.myTurn = obj.myTurn;
                that.owner = obj.owner;
                break;
              }
              case "omok": {
                const dataArray = message.split(",");
                const x = Number(dataArray[0].trim());
                const y = Number(dataArray[1].trim());
                if (that.board[that.xyToIndex(x, y)] === -1) {
                  that.count % 2 === 0
                      ? (that.board[that.xyToIndex(x, y)] = 1)
                      : (that.board[that.xyToIndex(x, y)] = 2);
                  that.count++;
                  that.drawCircle(x, y);
                  that.myTurn = obj.myTurn;
                  that.owner = obj.owner;
                }
                break;
              }
            }
            if (obj.users) {
              that.users = obj.users;
            }
          };
        };
      }
    },
    disconnect() {
      if (this.socket !== undefined && this.socket.OPEN) {
        this.socket.close();
        this.status = "disconnected";
        this.logs = [];
      }
    },
    sendSomething(obj) {
      this.socket.send(JSON.stringify(obj));
    },
    checkThreeThree(x, y) {
      let count = 0;
      const myColor = this.myColor;
      const enemyColor = this.myColor === 1 ? 2 : 1;
      for (let i = 0; i < 4; i++) {
        const dx = this.checkDirection[i][0];
        const dy = this.checkDirection[i][1];
        const myArray = [];
        const enemyArray = [];
        for (let j = 0; j < 3; j++) {
          const nxPlus = x + dx * (j + 1);
          const nyPlus = y + dy * (j + 1);
          const nxMinus = x - dx * (j + 1);
          const nyMinus = y - dy * (j + 1);
          if (nxPlus < 0 || nxPlus > this.row || nyPlus < 0 || nyPlus > this.row) {
            break;
          }
          if (this.board[this.xyToIndex(nxPlus, nyPlus)] === myColor) {
            myArray.push([nxPlus, nyPlus, (j + 1)]);
          } else if (this.board[this.xyToIndex(nxPlus, nyPlus)] === enemyColor) {
            enemyArray.push([nxPlus, nyPlus, (j + 1)]);
          }
          if (this.board[this.xyToIndex(nxMinus, nyMinus)] === myColor) {
            myArray.push([nxMinus, nyMinus, -(j + 1)]);
          } else if (this.board[this.xyToIndex(nxMinus, nyMinus)] === enemyColor) {
            enemyArray.push([nxMinus, nyMinus, -(j + 1)]);
          }
        }
        if (myArray.length === 2 && (enemyArray.length === 0 || (enemyArray.length === 1 && Math.abs(enemyArray[0][2]) !== 1) && Math.abs(myArray[0][2] - myArray[1][2]) < 4)) {
          if (enemyArray.length === 0) {
            count++;
            continue;
          }
          const one = myArray[0];
          const two = myArray[1];
          const enemy = enemyArray[0];
          if (enemy[2] + 1 === one[2] || enemy[2] - 1 === one[2] || enemy[2] + 1 === two[2] || enemy[2] - 1 === two[2]) {
            continue;
          }
          const px = x + dx * 4;
          const py = y + dy * 4;
          const mx = x - dx * 4;
          const my = y - dy * 4;
          if (px < this.row && py < this.row && this.board[this.xyToIndex(px, py)] === enemyColor) {
            if (one[2] === 3 || two[2] === 3) {
              continue;
            }
          }
          if (mx >= 0 && my >= 0 && this.board[this.xyToIndex(mx, my)] === enemyColor) {
            if (one[2] === -3 || two[2] === -3) {
              continue;
            }
          }
          count++;
        }
      }
      return count >= 2;
    },
    sendDol(e) {
      const x = Math.round(Math.abs(e.offsetX - this.margin) / this.rowSize);
      const y = Math.round(Math.abs(e.offsetY - this.margin) / this.rowSize);
      const xy = x.toString() + "," + y.toString();
      if (this.board[this.xyToIndex(x, y)] !== -1) {
        this.logs.push({
          data: "이미 돌이 놓여진 자리입니다.",
          event: "system",
          index: new Date().getTime()
        });
        return;
      }
      if (this.checkThreeThree(x, y)) {
        this.logs.push({
          data: "삼삼금지입니다.",
          event: "system",
          index: new Date().getTime()
        });
        return;
      }
      const obj = {
        type: "omok",
        message: xy,
        index: new Date().getTime()
      }
      this.sendSomething(obj);
    },
    sendMessage() {
      const that = this;
      const obj = {
        type: "chat",
        message: that.message
      };
      this.sendSomething(obj);
      this.message = "";
    },
    winShow(x) {
      const that = this;
      switch (x) {
        case 1:
          // 음악이 재생되도록 약간의 시차를 두고 화면 표시
          setTimeout(() => {
            that.whoWin = 1;
            const troImg = document.querySelector("#trophyImg");
            troImg.style.animationName = "trophy";
            that.sendSomething({
              type: "end",
              message: "게임이 종료되었습니다."
            });
          }, 300);
          break;
        case 2:
          // 음악이 재생되도록 약간의 시차를 두고 화면 표시
          setTimeout(() => {
            that.whoWin = 2;
            const troImg = document.querySelector("#trophyImg2");
            troImg.style.animationName = "trophy";
            that.sendSomething({
              type: "end",
              message: "게임이 종료되었습니다."
            });
          }, 300);
          break;
      }
    },
    indexToXy(i) {
      const w = Math.sqrt(this.board.length);
      const x = i % w;
      const y = Math.floor(i / w);
      return [x, y];
    },
    xyToIndex(x, y) {
      return x + y * (this.row + 1);
    },
    drawCircle(x, y) {
      this.draw();
      this.drawRect(x, y);
      const indexToXy = this.indexToXy;
      const xyToIndex = this.xyToIndex;
      const board = this.board;
      const ctx = this.ctx;
      const rowSize = this.rowSize;
      const dolSize = this.dolSize;
      const margin = this.margin;
      for (let i = 0; i < this.board.length; i++) {
        // 모든 눈금의 돌의 유무,색깔 알아내기
        const a = indexToXy(i)[0];
        const b = indexToXy(i)[1];

        if (board[xyToIndex(a, b)] === 1) {
          ctx.fillStyle = "black";
          ctx.beginPath();
          ctx.arc(
              a * rowSize + margin,
              b * rowSize + margin,
              dolSize,
              0,
              Math.PI * 2
          );
          ctx.fill();
        }
        if (board[xyToIndex(a, b)] === 2) {
          ctx.fillStyle = "white";
          ctx.beginPath();
          ctx.arc(
              a * rowSize + margin,
              b * rowSize + margin,
              dolSize,
              0,
              Math.PI * 2
          );
          ctx.fill();
        }
      }

      this.checkWin(x, y); // 돌이 5개 연속 놓였는지 확인 함수 실행

      const boardCopy = Object.assign([], board);
      this.history.push(boardCopy);
    },
    checkWin(x, y) {
      const thisColor = this.board[this.xyToIndex(x, y)]; // 마지막 둔 돌의 색깔이 1(흑),2(백)인지...
      // 가로,세로와 대각선 두 방향, 총 네 방향 체크
      for (let k = 0; k < 4; k++) {
        let winBlack = 1;
        let winWhite = 1;
        // 놓여진 돌의 양쪽 방향으로
        for (let j = 0; j < 2; j++) {
          // 5개씩의 돌의 색깔을 확인
          for (let i = 1; i < 5; i++) {
            const a = x + this.checkDirection[k + 4 * j][0] * i;
            const b = y + this.checkDirection[k + 4 * j][1] * i;
            if (this.board[this.xyToIndex(a, b)] === thisColor) {
              // 색깔에 따라서 흑,백의 숫자를 하나씩 증가
              switch (thisColor) {
                case 1:
                  winBlack++;
                  break;
                case 2:
                  winWhite++;
                  break;
              }
            } else {
              break;
            }
          }
        }
        if (winBlack === 5) {
          this.winShow(1);
        }
        if (winWhite === 5) {
          this.winShow(2);
        }
      }
    },
    drawRect(x, y) {
      const ctx = this.ctx;
      const rowSize = this.rowSize;
      const w = rowSize / 2;
      const margin = this.margin;
      ctx.strokeStyle = "red";
      ctx.lineWidth = 3;
      ctx.strokeRect(
          x * rowSize + margin - w,
          y * rowSize + margin - w,
          w + rowSize / 2,
          w + rowSize / 2
      );
    },
    draw() {
      const ctx = this.ctx;
      const row = this.row;
      const cw = this.cw;
      const ch = this.ch;
      const margin = this.margin;
      const rowSize = this.rowSize;
      const dolSize = this.dolSize;

      ctx.fillStyle = "#e38d00";
      ctx.fillRect(0, 0, cw, ch);
      for (let x = 0; x < row; x++) {
        for (let y = 0; y < row; y++) {
          const w = (cw - margin * 2) / row;
          ctx.strokeStyle = "black";
          ctx.lineWidth = 1;
          ctx.strokeRect(w * x + margin, w * y + margin, w, w);
        }
      }

      // 화점에 점 찍기
      for (let a = 0; a < 3; a++) {
        for (let b = 0; b < 3; b++) {
          ctx.fillStyle = "black";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(
              (3 + a) * rowSize + margin + a * 5 * rowSize,
              (3 + b) * rowSize + margin + b * 5 * rowSize,
              dolSize / 3,
              0,
              Math.PI * 2
          );
          ctx.fill();
        }
      }
    }
  }
}
</script>

<style scoped>
#omok {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2%;
}

.container {
  display: grid;
  /* border : 4px solid red; */
  grid-template-columns: 200px 200px 300px;
  grid-template-areas:
    "message message button"
    "canvas canvas canvas";
}

canvas {
  grid-area: canvas;
  /* position: absolute; */
  margin-left: 1.8vw;
  top: 5vh;
  z-index: 1;
  height: 75vh;
}

.buttons {
  grid-area: button;
  height: 30px;
  align-self: center;
  /* border : 2px solid purple; */
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "withdraw restart";
}

.trophy {
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

#trophyImg {
  /* border : 1px solid red; */
  /* animation-name: trophy; */
  animation-timing-function: linear;
  animation-duration: 2s;
  /* animation-iteration-count: infinite; */
}

#trophyImg2 {
  /* border : 1px solid red; */
  /* animation-name: trophy; */
  animation-timing-function: linear;
  animation-duration: 2s;
  /* animation-iteration-count: infinite; */
}
.user-list {
  height: 30vh;
  width: 85%;
  border: 1px solid;
}
.chat-list {
  height: 71.3vh;
  overflow-y: scroll;
  border: 1px solid;
}

.winShow {
  z-index: 2;
  position: absolute;
  /* z-index: -1; */
  left: 23.5vw;
  top: 3vh;
  width: 75vh;
  height: 75vh;
  text-align: center;
  padding-top: 50px;
  vertical-align: middle;
  font-size: 70px;
  font-weight: bolder;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  animation-name: blink;
  animation-timing-function: linear;
  animation-duration: 2s;
  animation-iteration-count: infinite;
}

@keyframes blink {
  0% {
    opacity: 0.6;
  }
  20% {
    opacity: 0.8;
  }
  40% {
    opacity: 0.6;
  }
  60% {
    opacity: 0.8;
  }
  80% {
    opacity: 0.6;
  }
  100% {
    opacity: 0.8;
  }
}

@keyframes trophy {
  0% {
    width: 30px;
    height: 30px;
  }
  80% {
    width: 300px;
    height: 300px;
  }
  100% {
    width: 30px;
    height: 30px;
  }
}
</style>
