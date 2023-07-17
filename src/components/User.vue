<template>
  <div class="item border p-3 text-left">
    <div>{{ source.name }}님 <b-badge class="badge bg-primary" v-show="source.isOwner">방장</b-badge></div>
  </div>
</template>

<script>
export default {
  name: 'user-component',
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
  }
}
</script>
<style>
.item:hover {
  background-color: #f5f5f5;
  cursor: pointer;
}

</style>
