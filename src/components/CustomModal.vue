<template>
  <div ref="modal" class="custom-modal" v-show="toggleModal">
    <div class="modal-content w-40">
      <div class="custom-modal-header">
        <span class="close" @click="close">&times;</span>
      </div>
      <div style="width: 100%; min-height: 30vh;">
        <slot></slot>
      </div>
      <div class="custom-modal-footer">
        <slot name="footer">
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomModal",
  props: {
    toggle: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.modal = this.$refs.modal;
    const that = this;
    window.onclick = (event) => {
      if (event.target === that.modal) {
        that.close();
      }
    }
  },
  watch: {
    toggle: function (val) {
      this.toggleModal = val;
    }
  },
  data() {
    return {
      modal: undefined,
      toggleModal: false
    }
  },
  methods: {
    close() {
      if (this.toggleModal) {
        this.$emit("onClose");
        this.$emit('update:toggle', false);
      }
    }
  }
}
</script>

<style scoped>

.custom-modal {
  /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1000; /* Sit on top */
  left: 0;
  top: 15%;
  width: 100%;
  height: 100%;
  overflow: auto; /* Enable scroll if needed */
  /*background-color: rgb(0,0,0); !* Fallback color *!*/
  /*background-color: rgba(0,0,0,0.4); !* Black w/ opacity *!*/
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
  color: white;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
.custom-modal-header {
  padding: 2px 16px;
  background-color: #5cb85c;
  color: white;
}

/* Modal Body */
.modal-body {padding: 2px 16px;}

/* Modal Footer */
.custom-modal-footer {
  padding: 2px 16px;
}

/* Modal Content */
.modal-content {
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  border: 1px solid #888;
  width: 80%;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  animation-name: animatetop;
  animation-duration: 0.4s
}

/* Add Animation */
@keyframes animatetop {
  from {top: -30vh; opacity: 0}
  to {top: 0; opacity: 1}
}
</style>
