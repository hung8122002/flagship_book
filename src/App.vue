<template>
  <div>
    <v-header></v-header>
    <router-view></router-view>
    <v-toast-list></v-toast-list>
    <a href="#" class="to-top">
      <i class="fa-solid fa-arrow-up fa-lg"></i>
    </a>
    <v-footer></v-footer>
  </div>
</template>

<script>
export default {
  name: "App",
  computed: {
  },
  watch: {
    isLoading() {
      console.log(this.isLoading);
    },
  },
};
</script>

<style scoped>
@import url(./css/style.css);
.to-top {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #498374;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 20px;
  right: 20px;
  font-size: 20px;
  z-index: 3;
}

.to-top i {
  color: #fff;
}
</style>
