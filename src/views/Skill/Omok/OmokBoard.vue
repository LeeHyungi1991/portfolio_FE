<template>
  <div class="skill-container pad-2-percent d-flex justify-content-center overflow-y-auto">
    <custom-modal :toggle.sync="toggle">
      <div class="h-100 d-flex all-center" style="min-height: 21vh;">
        <div class="w-70 text-left">
          <div style="font-size: 1.5rem; margin-bottom: 2%;">- 게임방 제목 입력</div>
          <b-form-input style="font-size: 1.5rem;" class="w-100" placeholder="생성할 게임방 제목을 입력후 엔터를 눌러주세요"
                        v-model="roomName"
                        @keyup.enter="makeRoom"></b-form-input>
        </div>
      </div>
      <div class="d-flex justify-content-end p-4">
        <b-button variant="primary" @click="makeRoom">생성</b-button>
        <b-button variant="danger" @click="closeModal" class="mag-left-1-percent">닫기</b-button>
      </div>
    </custom-modal>
    <b-icon-arrow-left @click="$router.push({name: 'Skill'})" class="back-arrow"></b-icon-arrow-left>
    <div id="omok-board" class="w-80 d-flex justify-content-between flex-column align-items-center border vh-80">
      <b-table-simple table-class="m-0 h-100" bordered>
        <b-thead>
          <b-tr>
            <b-td>게임방 제목</b-td>
            <b-td class="w-15">게임방 상태</b-td>
            <b-td class="w-10">인원수</b-td>
            <b-td class="w-20">
              <b-button size="sm" variant="outline-success" class="room-refresh">
                <b-icon-arrow-clockwise></b-icon-arrow-clockwise>
              </b-button>
              <b-button size="sm" variant="outline-primary" class="room-maker mag-left-5-percent" @click="toggleModal">
                게임방 생성
              </b-button>
            </b-td>
          </b-tr>
        </b-thead>
        <b-tbody v-if="rooms.length > 0">
          <b-tr v-for="room in rooms" :key="room.roomNumber" class="border-bottom">
            <b-td>{{ room.roomName }}</b-td>
            <b-td>{{ room.roomStatus }}</b-td>
            <b-td>{{ room.roomCount }}/{{ room.roomSize }}</b-td>
            <b-td class="h-10">
              <b-button variant="primary" class="room-button" @click="enterRoom(room)">입장</b-button>
            </b-td>
          </b-tr>
          <b-tr>
          </b-tr>
        </b-tbody>
        <b-tbody v-else>
          <b-tr>
            <b-td colspan="4" class="text-center vh-65 border-0">게임방이 없습니다.</b-td>
          </b-tr>
        </b-tbody>
        <b-tfoot>
          <b-tr rowspan="2">
            <b-td colspan="4" class="border-0">
              <div class="d-flex justify-content-center align-items-center asdasd">
                <b-pagination v-model="page" :total-rows="rooms.length" :per-page="10" @change="load"></b-pagination>
              </div>
            </b-td>
          </b-tr>
        </b-tfoot>
      </b-table-simple>
    </div>
  </div>
</template>

<script>
import CustomModal from "@/components/CustomModal";
import EventBus from "@/eventbus/EventBus";
import store from "@/store";

export default {
  name: "OmokBoard",
  koreanName: "웹소켓 오목",
  image: require("@/assets/images/omok.png"),
  components: {
    CustomModal
  },
  data() {
    return {
      page: 1,
      rooms: [],
      toggle: false,
      roomName: "",
      socket: undefined,
      status: "disconnected"
    }
  },
  mounted() {
    EventBus.$emit("showHeader");
    this.connect();
  },
  methods: {
    sendSomething(obj) {
      this.socket.send(JSON.stringify(obj));
    },
    connect() {
      if (this.socket === undefined || this.socket.CLOSED) {
        const that = this;
        this.socket = new WebSocket(this.$store.getters.getWebsocketApi("/ws/board?token=") + window.localStorage.getItem("access-token"));
        // this.socket = new WebSocket(this.$store.getters.getWebsocketApi("/ws/board?token=") + store.getters.getAccessToken);
        this.socket.onopen = function (response) {
          that.status = "connected";
          that.socket.onmessage = ({data}) => {
            that.rooms = JSON.parse(data);
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
    toggleModal() {
      this.toggle = true;
    },
    closeModal() {
      this.toggle = false;
    },
    enterRoom(room) {
      if (room.roomSize > room.roomCount) {
        this.$router.push({name: "Omok", params: {roomNumber: room.roomNumber, roomName: room.roomName}});
      } else {
        alert("선택하신 방의 인원이 가득 찼습니다.");
      }
    },
    makeRoom() {
      const that = this;
      const roomNumber = new Date().getTime();
      this.$router.push({name: 'Omok', params: {roomNumber: roomNumber, roomName: that.roomName}});
    },
    load() {
      const that = this;
      this.$axiosGetWithAuth(this.$store.getters.getApiString("api/v2/get/omok/rooms"), {}).then((response) => {
        that.rooms = response.data.data;
      });
    }
  }
}
</script>

<style scoped>
#omok-board{
  border-color: black !important;
  border-width: 1px !important;
  border-top: none !important;
  border-bottom: none !important;
}
#omok-board table {
  border-color: black !important;
  border-width: 0px !important;
}
#omok-board tr td {
  border-color: black !important;
  border-width: 1px;
  vertical-align: middle !important;
  font-size: 2.5vmin;
  font-weight: 900;
}
#omok-board tr td:nth-child(1) {
  border-left: none !important;
}

#omok-board tr td:nth-child(4) {
  border-right: none !important;
}

#omok-board thead tr td {
  border-top: none !important;
  border-bottom: none !important;
}
#omok-board tbody tr td {
  border-top: none !important;
}

/*#omok-board * {*/
/*  border-color: black;*/
/*}*/
.room-refresh {
  top: 2%;
  left: 85%;
  font-size: 1.2vw;
}

.room-maker {
  top: 2%;
  left: 90%;
  font-size: 1.2vw;
}

.room-button {
  width: 100%;
  height: 100%;
  font-size: 2vmin;
  font-weight: 900;
}
.asdasd ul{
  margin-bottom: 0;
  padding: 0.5%;
}
</style>
