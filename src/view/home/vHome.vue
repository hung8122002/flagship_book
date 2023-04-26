<template>
  <div class="home">
    <div v-show="isLoading" class="loading">
      <v-progress-circular
        color="#498374"
        indeterminate
        :size="128"
        :width="12"
      ></v-progress-circular>
      <p>Loading... Please wait in few seconds</p>
    </div>
    <v-carousel></v-carousel>
    <!-- pc -->
    <div class="home-contain">
      <div class="home-type">
        <div>
          <a><i class="fa-solid fa-mars fa-xl"></i></a>
          <p>Boy</p>
        </div>
        <div>
          <a><i class="fa-solid fa-venus fa-lg"></i></a>
          <p>Girl</p>
        </div>
        <div>
          <a><i class="fa-solid fa-not-equal fa-lg"></i></a>
          <p>Other</p>
        </div>
      </div>
      <div class="home-contain-first">
        <p class="contain-title">New releases</p>
        <div class="contain-main">
          <v-item
            v-for="(item, index) in bookList"
            :item="item"
            :key="index"
            showFooter="true"
          ></v-item>
        </div>
        <div class="home-contain-mobile">
          <v-carousel-multi
            idCarousel="carousel1"
            :data="bookList"
          ></v-carousel-multi>
        </div>
      </div>
      <div class="home-contain-first">
        <p class="contain-title">Best seller</p>
        <div class="contain-main">
          <v-item
            v-for="(item, index) in bookList"
            :item="item"
            :key="index"
            showFooter="true"
          ></v-item>
        </div>
        <div class="home-contain-mobile">
          <v-carousel-multi
            idCarousel="carousel2"
            :data="bookList"
          ></v-carousel-multi>
        </div>
      </div>

      <div class="home-banner">
        <img
          src="https://dispatch.barnesandnoble.com/content/dam/ccr/homepage/daily/2023/03/31/26258_BB_C_OMP_03-31.jpg"
          alt=""
        />
      </div>
      <div class="home-contain-first">
        <p class="contain-title">Favorite Action of the Year So Far</p>
        <v-carousel-multi
          idCarousel="carouselA"
          :data="bookList"
        ></v-carousel-multi>
      </div>
      <div class="home-contain-first">
        <p class="contain-title">Inspirational Reads</p>
        <v-carousel-multi
          idCarousel="carouselB"
          :data="bookList"
        ></v-carousel-multi>
      </div>
      <div class="home-banner">
        <img
          src="https://bizweb.dktcdn.net/100/364/248/themes/736344/assets/banner.jpg?1662692547105"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import common from "../../js/common";
import api from "../../js/api";
export default {
  name: "vHome",
  data() {
    return {
      /**
       * Danh sách các quyển sách
       */
      bookList: [],

      /**
       * hiển thị load
       */
      isLoading: true,
    };
  },
  methods: {
    ...mapActions(["updateNumerItem", "updateNumberWishList"]),
  },
  async created() {
    this.isLoading = true;
    const get = await common.method(
      "get",
      api.getWarehouse() + `?_page=1&_limit=10`
    );
    this.bookList = get;
    this.isLoading = false;
  },
};
</script>

<style scoped>
@import url(./home.css);
</style>