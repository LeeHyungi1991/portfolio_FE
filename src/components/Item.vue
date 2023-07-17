<template>
  <div class="item border p-3 text-left" @click="selectLocation($event, source)">
    <div>
      <b-card-img v-if="source.imagePath" :src="$store.getters.getFileServerString(source.imagePath)" class="mb-2"></b-card-img>
    </div>
    <div>위치명 : {{ source.name }}</div>
    <div>주소 : {{ source.address }}</div>
    <div>좌표 : {{`${source.yaxis}, ${source.xaxis}`}}</div>
    <div>설명 : {{ source.details }}</div>
    <div>작성자 : {{source.userName}}</div>
    <div>작성일 : {{toDateTimeString(source.createAt)}}</div>
    <div class="text-right">
      <b-button class="btn btn-danger" size="sm" @click="deleteLocation(source)">삭제</b-button>
    </div>
  </div>
</template>

<script>
import EventBus from "@/eventbus/EventBus";

export default {
  name: 'item-component',
  props: {
    index: { // index of current item
      type: Number
    },
    source: { // here is: {uid: 'unique_1', text: 'abc'}
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    selectLocation(event, source) {
      if (event.target.tagName === 'BUTTON') {
        return;
      }
      EventBus.$emit('fillInputs', source);
      EventBus.$emit('overlayOn', source.seq);
      EventBus.$emit('moveTo', source.xaxis, source.yaxis);
    },
    deleteLocation(source) {
      this.$axiosPostWithAuth(this.$store.getters.getApiString('api/v2/post/location/delete'), {seq: source.seq}).then((res) => {
        if (res.data.data) {
          alert('삭제되었습니다.');
          EventBus.$emit('load');
        } else {
          alert('삭제에 실패했습니다. 원인: ' + res.data.error);
        }
      }).finally(() => {
        EventBus.$emit('load');
      });
    },
    toDateTimeString(dateTime) {
      return new Date(dateTime).toLocaleString();
    },
  }
}
</script>
<style>
.item:hover {
  background-color: #f5f5f5;
  cursor: pointer;
}

</style>
