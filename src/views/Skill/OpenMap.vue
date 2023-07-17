<style scoped>
#openMap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}

#openMap div.map-section {
  width: 55%;
  height: 100%;
  padding: 2%;
}

#openMap div.table-section {
  width: 40%;
  height: 100%;
}

#openMap div.overlay-content {
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid #000;
  padding: 5px;
}

#openMap .table-section .virtual-list {
  overflow: auto;
  width: 100%;
}

#openMap .table-section .save-slot {
  width: 60%;
  height: 90%;
}

#openMap .table-section .save-slot * {
  font-size: 1.5vmin !important;
}

#openMap .table-section .location-button:hover {
  background-color: #f2f2f2;
}

#openMap .table-section .location-button {
  background-color: #fff;
  background-image: url("https://fileserver.tranquil-worker.com/images/current_location.png");
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
}

#openMap .layer-modal {
  position: absolute;
  width: 400px;
  height: 500px;
  z-index: 1000;
  right: 1%;
}

#openMap .latLonInput {
  position: absolute;
  height: 18vh;
  width: 15vw;
}
</style>

<template>
  <div class="skill-container pad-2-percent d-flex justify-content-center">
    <loading :active="isLoading" :is-full-page="fullPage"/>
    <b-icon-arrow-left @click="$router.push({name: 'Skill'})" class="back-arrow"></b-icon-arrow-left>
    <div id="openMap">
      <div class="map-section">
        <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true" @singleclick="singleclickMap"
                @pointerdrag="dragging = true"
                @moveend="onDragEnd" data-projection="EPSG:4326" style="height: 90%;">
          <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>
          <vl-interaction-select :features.sync="selectedFeatures" @select="clickIcon"></vl-interaction-select>
          <vl-geoloc @update:position="onCenterChanged">
            <template #default="geoloc">
              <vl-feature v-if="geoloc && geoloc.position" id="position-feature-center">
                <vl-geom-point :coordinates="geoloc.position"></vl-geom-point>
                <vl-style>
                  <vl-style-icon src="https://fileserver.tranquil-worker.com/documents/tranquil-icon.jpg" :scale="0.05"
                                 :anchor="[0.5, 1]" @click="clickIcon"></vl-style-icon>
                </vl-style>
              </vl-feature>
            </template>
          </vl-geoloc>
          <vl-layer-vector>
            <template v-for="(position, index) in positions">
              <vl-feature :key="`f-${index}`">
                <vl-geom-point :coordinates="[position.yaxis, position.xaxis]"></vl-geom-point>
                <vl-style>
                  <vl-style-icon src="https://fileserver.tranquil-worker.com/images/marker.png" :scale="0.1"
                                 :anchor="[0.5, 1]" @select="clickIcon"></vl-style-icon>
                </vl-style>
              </vl-feature>
              <vl-overlay v-show="position.on" v-if="position" :scale="0.3"
                          :position="[position.yaxis - 0.005, position.xaxis + 0.003]"
                          :key="`o-${index}`">
                <template>
                  <div class="overlay-content">
                    <!--                  <div style="width: 200px;">-->
                    <!--                    <b-card-img :src="$store.getters.getFileServerString(position.imagePath)" class="mb-2"></b-card-img>-->
                    <!--                  </div>-->
                    <div>{{ position.name }}</div>
                    <div>{{ `${position.yaxis}, ${position.xaxis}` }}</div>
                    <div style="width: 250px;">{{ position.address }}</div>
                  </div>
                </template>
              </vl-overlay>
            </template>
          </vl-layer-vector>
          <vl-layer-tile id="osm">
            <vl-source-osm></vl-source-osm>
          </vl-layer-tile>
        </vl-map>
        <div style="padding: 1%; height: 10%;" class="border d-flex all-center">
          현재 위치: {{ center }}<br>
        </div>
      </div>
      <div class="table-section all-center">
        <div class="d-flex h-90 w-100 mb-1 flex-column p-3 border">
          <b-input-group>
            <b-input-group-prepend style="width: 10%;">
              <button class="location-button" @click="moveToMyLocation"></button>
            </b-input-group-prepend>
            <b-form-input class="w-75" placeholder="위치명 검색" v-model="keyword" @keyup.enter="search"></b-form-input>
          </b-input-group>
          <virtual-list
              ref="virtualList"
              class="virtual-list"
              v-on:tobottom="loadMore"
              :keeps="pageObject.pageable.pageSize"
              :data-key="'seq'"
              :data-sources.sync="positions"
              :data-component="itemComponent">
            <div slot="footer" class="spinner-border text-primary">
              <span class="sr-only">Loading...</span>
            </div>
          </virtual-list>
        </div>
        <div class="save-slot border p-3 text-left mb-1 d-flex justify-content-between flex-column">
          <b-table-simple borderless>
            <b-tbody>
              <b-tr>
                <b-td class="text-right">
                  <button @click="clearInputs">비우기</button>
                </b-td>
              </b-tr>
              <b-tr>
                <b-td>
                  위치명
                  <b-form-input v-model="saveName"></b-form-input>
                </b-td>
              </b-tr>
              <b-tr>
                <b-td v-click-outside="closeCoordInput">
                  좌표(지도 클릭 혹은 입력 후 엔터)
                  <b-form-input v-model="coordinate" class="hover cursor-pointer"
                                @click="openCoordinateInput = true;"></b-form-input>
                  <div class="latLonInput border bg-white text-center p-3" v-show="openCoordinateInput">
                    <b-form-input v-model="lat" placeholder="위도(lat)" class="w-90 d-inline-block"></b-form-input>
                    <b-form-input v-model="lon" placeholder="경도(lon)" class="w-90 d-inline-block mt-2"></b-form-input>
                    <b-button size="sm mt-3 w-100" @click="reverseLatLon">변환</b-button>
                  </div>
                </b-td>
              </b-tr>
              <b-tr>
                <b-td @click="openAddressModal" v-click-outside="closeLayer">
                  주소
                  <b-form-input class="hover cursor-pointer" placeholder="클릭하여 주소 불러오기" v-model="saveAddress"
                                readonly></b-form-input>
                  <div ref="layer" class="layer-modal border" v-show="showLayer"></div>
                </b-td>
              </b-tr>
              <b-tr>
                <b-td>
                  설명
                  <b-form-textarea v-model="saveDetails"></b-form-textarea>
                </b-td>
              </b-tr>
              <b-tr>
                <b-td>
                  썸네일 업로드
                  <b-input-group class="border">
                    <b-form-file id="file" ref="saveFile" v-model="saveFile" :no-drop-placeholder="true" @change="preview" plain class="w-85 d-none"></b-form-file>
                    <button class="w-85" @click="$refs.saveFile.$el.click()">파일선택</button>
                    <b-input-group-append class="w-15">
                      <b-button-close class="w-100 p-0 h-100"
                                      @click="saveFile = undefined; previewUrl = undefined;"></b-button-close>
                    </b-input-group-append>
                  </b-input-group>
                </b-td>
              </b-tr>
              <b-tr>
                <b-td>
                  <b-card-img :src="previewUrl" class="mb-2"></b-card-img>
                </b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
          <b-button variant="primary" class="w-100" @click="save">저장</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Item from '../../components/Item'
import VirtualList from '../../components/customVirtualScrollList'
import axios from "axios";
import EventBus from "@/eventbus/EventBus";
import vClickOutside from 'v-click-outside'
import Loading from "vue-loading-overlay";

export default {
  name: "OpenMap",
  koreanName: "오픈 맵 API",
  image: require("@/assets/images/open-map.png"),
  directives: {
    clickOutside: vClickOutside.directive
  },
  data() {
    return {
      dragging: false,
      itemComponent: Item,
      zoom: 15,
      currentCenter: [0, 0],
      center: [0, 0],
      rotation: 0,
      positions: [],
      selectedFeatures: [],
      coordinate: undefined,
      saveName: undefined,
      saveDetails: undefined,
      saveAddress: undefined,
      saveSeq: null,
      saveFile: undefined,
      keyword: '',
      previewUrl: undefined,
      showLayer: false,
      isLoading: false,
      fullPage: true,
      openCoordinateInput: false,
      lat: '',
      lon: '',
      pageObject: {
        pageable: {
          pageSize: 3
        }
      }
    }
  },
  mounted() {
    EventBus.$emit("showHeader");
    this.load();
    EventBus.$on('load', this.load);
    EventBus.$on('overlayOn', this.overlayOn);
    EventBus.$on('moveTo', this.moveTo);
    EventBus.$on('fillInputs', this.fillInputs);
  },
  components: {
    VirtualList,
    Loading
  },
  props: {
    isOpen: Boolean
  },
  watch: {
    coordinate: function (val) {
      const [lon, lat] = val.split(',');
      this.lat = lat.trim();
      this.lon = lon.trim();
    },
  },
  methods: {
    reverseLatLon() {
      this.coordinate = `${this.lat}, ${this.lon}`;
      this.coordinateToAddress(parseFloat(this.lat), parseFloat(this.lon));
      this.openCoordinateInput = false;
    },
    closeCoordInput() {
      this.openCoordinateInput = false;
    },
    onDragEnd() {
      if (this.dragging) {
        this.dragging = false;
        this.$refs.virtualList.scrollToOffset(0);
        this.load();
      }
    },
    closeLayer() {
      this.showLayer = false;
    },
    openAddressModal() {
      const that = this;
      new window.daum.Postcode({
            oncomplete: function (data) {
              axios.get("https://nominatim.openstreetmap.org/search", {
                params: {
                  q: data.address,
                  format: "json",
                  limit: 1
                }
              }).then(res => {
                that.saveAddress = data.address;
                that.coordinate = `${res.data[0].lon}, ${res.data[0].lat}`;
                that.showLayer = false;
              })
            },
            width: '100%',
            height: '100%',
            maxSuggestItems: 5
          },
      ).embed(this.$refs.layer);
      this.showLayer = true;
    },
    preview(e) {
      this.previewUrl = URL.createObjectURL(e.target.files[0]);
    },
    clearInputs() {
      this.saveName = '';
      this.saveDetails = '';
      this.saveAddress = '';
      this.coordinate = '';
      this.saveFile = undefined;
      this.previewUrl = undefined;
    },
    fillInputs(position) {
      const that = this;
      this.saveSeq = position.seq;
      this.saveName = position.name;
      this.saveDetails = position.details;
      this.saveAddress = position.address;
      this.coordinate = `${position.yaxis}, ${position.xaxis}`;
      axios.get(`${this.$store.getters.getFileServerString(position.imagePath)}`, {
        responseType: 'blob'
      }).then(response => {
        that.saveFile = new File([response.data], position.imagePath.split("mapImages/")[1], {type: response.data.type});
      }).finally(() => {
        that.previewUrl = `${this.$store.getters.getFileServerString(position.imagePath)}`;
      });
    },
    moveTo(x, y) {
      this.center = [y, x];
    },
    moveToMyLocation() {
      this.positions.forEach(position => {
        position.on = false;
      });
      this.center = this.currentCenter;
    },
    overlayOn(seq) {
      this.positions.forEach(position => {
        position.on = position.seq === seq;
      });
    },
    save() {
      const that = this;
      that.isLoading = false;
      if (!this.coordinate) {
        alert('좌표를 선택해주세요.');
        return;
      }
      const position = this.coordinate.split(',').map(v => parseFloat(v));
      const url = this.$store.getters.getApiString('api/v2/post/location/save');
      const formData = new FormData();

      if (this.saveSeq) {
        formData.append('seq', this.saveSeq);
      }
      formData.append('name', this.saveName ? this.saveName : '');
      formData.append('details', this.saveDetails ? this.saveDetails : '');
      formData.append('address', this.saveAddress ? this.saveAddress : '');
      formData.append('xAxis', position[1] ? position[1] : '');
      formData.append('yAxis', position[0] ? position[0] : '');
      formData.append('file', this.saveFile ? this.saveFile : null);

      this.$axiosPostWithAuth(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        if (res.data.data) {
          that.load();
        } else {
          alert('저장에 실패했습니다. 원인: ' + res.data.error);
        }
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        // that.isLoading = false;
      });
    },
    load() {
      const that = this;
      this.searchUtil(this.center[1], this.center[0], '', 0, that.pageObject.pageable.pageSize).then(res => {
        // console.log(res.data.data);
        that.pageObject = res.data.data;
        that.positions = that.pageObject.content;
      });
    },
    search() {
      const that = this;
      this.searchUtil(this.center[1], this.center[0], this.keyword, 0, that.pageObject.pageable.pageSize).then(res => {
        that.pageObject = res.data.data;
        that.positions = that.pageObject.content;
      }).finally(() => {
        if (that.positions.length > 0 && that.keyword !== '') {
          that.overlayOn(that.positions[0].seq);
          that.moveTo(that.positions[0].xaxis, that.positions[0].yaxis);
        }
      });
    },
    loadMore() {
      const that = this;
      this.searchUtil(this.center[1], this.center[0], this.keyword, that.pageObject.pageable.pageNumber + 1, that.pageObject.pageable.pageSize).then(res => {
        // console.log(res.data.data);
        that.pageObject = res.data.data;
        that.positions = that.positions.concat(that.pageObject.content);
      });
    },
    searchUtil(x, y, keyword, page, size) {
      if (keyword === '') {
        keyword = '';
      }
      return this.$axiosGetWithAuth(this.$store.getters.getApiStringWithQuery("api/v2/get/locations", {
        x: x,
        y: y,
        page: page,
        size: size,
        keyword: keyword
      }));
    },
    onCenterChanged(e) {
      this.currentCenter = e;
      this.center = e;
      this.load();
    },
    enterCoordinateInput() {
      const xy = this.coordinate.split(',').map(v => parseFloat(v));
      this.coordinateToAddress(xy[0], xy[1]);
    },
    singleclickMap(event) {
      for (let i = 0; i < this.positions.length; i++) {
        this.positions[i].on = false;
      }
      this.coordinate = event.coordinate.toString();
      this.saveName = undefined;
      this.saveFile = undefined;
      this.saveDetails = undefined;
      this.previewUrl = undefined;
      this.coordinateToAddress(event.coordinate[1], event.coordinate[0]);
    },
    coordinateToAddress(x, y) {
      const that = this;
      axios.get(
          'https://nominatim.openstreetmap.org/reverse',
          {
            params: {
              format: 'json',
              lon: y,
              lat: x
            }
          }).then((res) => {
        const address = res.data.address;
        that.saveAddress = address.country + ' ' + address.city + ' ';
        if (address.town) {
          that.saveAddress += address.town + ' ';
        }
        if (address.suburb) {
          that.saveAddress += ' ' + address.suburb;
        }
        if (address.residential) {
          that.saveAddress += ' ' + address.residential;
        }
        if (address.building) {
          that.saveAddress += ' ' + address.building;
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    reverseAddress(display_name) {
      const address = display_name.split(',');
      for (let i = 0; i < address.length / 2; i++) {
        const temp = address[i];
        address[i] = address[address.length - i - 1].trim();
        address[address.length - i - 1] = temp.trim();
      }
      return address.join(' ');
    },
    checkSame(x1, y1, x2, y2) {
      return Math.ceil(x1 * 1000) === Math.ceil(x2 * 1000) && Math.ceil(y1 * 1000) === Math.ceil(y2 * 1000);
    },
    clickIcon(event) {
      if (!event.json) {
        return;
      }
      if (event.feature.id_ === 'position-feature-center') {
        this.moveToMyLocation();
        return;
      }
      for (let i = 0; i < this.positions.length; i++) {
        if (this.checkSame(this.positions[i].xaxis, this.positions[i].yaxis, event.json.geometry.coordinates[1], event.json.geometry.coordinates[0])) {
          this.positions[i].on = true;
          this.moveTo(this.positions[i].xaxis, this.positions[i].yaxis);
          break;
        }
      }
    }
  }
}
</script>
