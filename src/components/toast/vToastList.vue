<template>
  <div class="toast-list">
    <v-toast v-for="item in list" :item="item" :key="item"></v-toast>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      list: [],
    };
  },
  computed: {
    ...mapGetters(["toast"]),
  },
  watch: {
    toast: {
      handler: function () {
        var a = { ...this.toast };
        this.list.push(a);
        setTimeout(() => {
          this.list.pop();
        }, 3500);
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.toast-list {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 5;
}
</style>