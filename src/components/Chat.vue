<template>
  <div class="item border p-3 text-left">
    <div>{{ source.event }} : {{source.data}}</div>
  </div>
</template>

<script>
export default {
  name: 'chat-component',
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
