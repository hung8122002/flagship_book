<template>
  <div @scroll="test" :class="{ 'show-header': showHeader }" id="header">
    <!-- header top -->
    <div class="header-top">
      <!-- header top left -->
      <div class="header-top-left">
        <router-link :to="isLogin ? '/user' : '/login'">
          <a>My account</a>
          <i class="fa-solid fa-user fa-lg"></i>
        </router-link>
        <a style="cursor: pointer" @click="showWishList = true">
          <a>My wishlist</a>
          <i class="fa-solid fa-heart fa-lg"></i>
        </a>
      </div>
      <!-- header top right -->
      <div class="header-top-right">
        <router-link to="/">home</router-link>
        <router-link
          :class="{ chosen: chosenItem == 'about' }"
          @click="choseItem('about')"
          to="/about"
          >about</router-link
        >
        <router-link class="product" to="/product">
          product
          <div class="product-list">
            <div class="product-item">
              <a>Boy</a>
              <router-link to="/product/adventure">adventure</router-link>
              <router-link to="/product/action">action</router-link>
              <router-link to="/product/fantasy">fantasy</router-link>
            </div>
            <div class="product-item">
              <a>Girl</a>
              <router-link to="/product/romance">romance</router-link>
              <router-link to="/product/beauty">beauty</router-link>
              <router-link to="/product/cook">cook</router-link>
            </div>
            <div class="product-item">
              <a>All</a>
              <router-link to="/product/comedy">comedy</router-link>
              <router-link to="/product/horror">horror</router-link>
              <router-link to="/product/economic">economic</router-link>
              <router-link to="/product/motivation">motivation</router-link>
            </div>
          </div>
        </router-link>
        <router-link to="/contact">contact</router-link>
      </div>
    </div>
    <!-- header bottom -->
    <div class="header-bottom">
      <a href="#" @click="showNavMobile = true" class="nav-mobile"
        ><i class="fa-solid fa-bars fa-lg"></i
      ></a>
      <div class="header-left">
        <router-link to="/">Flagship Books</router-link>
      </div>
      <div class="search">
        <input @input="search" v-model="searchText" type="text" />
        <a>
          <i class="fa-solid fa-magnifying-glass fa-lg"></i>
        </a>
        <div v-show="searchResult" class="search-result">
          <router-link
            v-show="searchResult || searchResult.length"
            class="search-item"
            v-for="item in searchResult"
            :key="item.id"
            :to="`/detail/${item.id}`"
          >
            <div>
              <img :src="item.urlImage" alt="" />
            </div>
            <div>
              <p>{{ item.name }}</p>
            </div>
            <div>
              <p>${{ item.price }}</p>
            </div>
          </router-link>
          <i v-show="!searchResult || !searchResult.length"
            >No result, please try again</i
          >
        </div>
      </div>
      <div class="header-right">
        <router-link style="position: relative" to="/cart">
          <i style="position: relative" class="fa-solid fa-cart-shopping fa-lg">
            <div v-show="numberItem" class="number-item">{{ numberItem }}</div>
          </i></router-link
        >
      </div>
    </div>
    <!-- header mobile -->
    <div class="header-mobile" v-show="showNavMobile">
      <a @click.stop="showNavMobile = false" href="#"
        ><i class="fa-solid fa-xmark fa-lg"></i
      ></a>
      <div class="header-right">
        <router-link
          @click="
            showNavMobile = false;
            showWishList = true;
          "
          to=""
        >
          <i class="fa-solid fa-heart fa-lg"></i>
        </router-link>
        <router-link @click.stop="showNavMobile = false" to="/cart"
          ><i class="fa-solid fa-cart-shopping fa-lg"></i
        ></router-link>
        <router-link @click.stop="showNavMobile = false" to="/login"
          ><i class="fa-solid fa-user fa-lg"></i
        ></router-link>
      </div>
      <div class="search">
        <input type="text" />
        <a @click.stop="showSearch = false" href="#"
          ><i class="fa-solid fa-magnifying-glass fa-lg"></i
        ></a>
      </div>
      <div class="header-center">
        <router-link @click="showNavMobile = false" to="/">home</router-link>
        <router-link @click="showNavMobile = false" to="/about"
          >about</router-link
        >
        <router-link
          @click="showNavMobile = false"
          style="position: relative"
          class="product"
          to="/product"
        >
          product
          <a
            href="#"
            @click.stop="showList = !showList"
            style="position: absolute; top: 16px; right: 0"
            ><i class="fa-solid fa-chevron-down fa-lg"></i
          ></a>
          <div class="product-list-mobile" v-show="showList">
            <router-link class="boy" to="#">
              <p>Boy</p>
              <a
                href="#"
                @click.stop="showListBoy = !showListBoy"
                style="position: absolute; top: 4px; right: 0"
                ><i class="fa-solid fa-chevron-down fa-lg"></i
              ></a>
              <div class="list-mobile" v-show="showListBoy">
                <router-link to="#">adventure</router-link>
                <router-link to="#">action</router-link>
                <router-link to="#">fantasy</router-link>
              </div>
            </router-link>
            <router-link class="girl" to="#">
              <p>Girl</p>
              <a
                href="#"
                @click.stop="showListGirl = !showListGirl"
                style="position: absolute; top: 4px; right: 0"
                ><i class="fa-solid fa-chevron-down fa-lg"></i
              ></a>
              <div class="list-mobile" v-show="showListGirl">
                <router-link to="#">romance</router-link>
                <router-link to="#">beauty</router-link>
                <router-link to="#">cook</router-link>
              </div>
            </router-link>
            <router-link class="all" to="#">
              <p>All</p>
              <a
                href="#"
                @click.stop="showListAll = !showListAll"
                style="position: absolute; top: 4px; right: 0"
                ><i class="fa-solid fa-chevron-down fa-lg"></i
              ></a>
              <div class="list-mobile" v-show="showListAll">
                <router-link to="#">comedy</router-link>
                <router-link to="#">horror</router-link>
                <router-link to="#">economic</router-link>
                <router-link to="#">motivation</router-link>
              </div>
            </router-link>
          </div>
        </router-link>
        <router-link to="/contact">contact</router-link>
      </div>
    </div>
    <!-- wish list -->
    <v-wish-list
      :numberWishList="numberWishList"
      @closeWishList="showWishList = false"
      :class="{ showWishList: showWishList }"
    ></v-wish-list>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import api from "../../js/api";
import common from "../../js/common";
export default {
  methods: {
    choseItem() {
      this.isLogin = localStorage.getItem("userId");
      this.showNavMobile = false;
    },

    /**
     * Tìm kiếm
     */
    search() {
      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(() => {
        if (this.searchText) {
          const get = common.method(
            "get",
            api.getApi() + `?q=${this.searchText}&_limit=10&_page=1`
          );
          get.then((res) => {
            this.searchResult = res;
          });
        } else {
          this.searchResult = null;
        }
      }, 1000);
    },
  },
  watch: {
    isChange() {
      this.isLogin = localStorage.getItem("userId");
    },
  },
  created() {
    var prevScrollpos = window.pageYOffset;
    window.addEventListener("scroll", () => {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        this.showHeader = false;
      } else {
        this.showHeader = true;
      }
      prevScrollpos = currentScrollPos;
    });
  },
  data() {
    return {
      chosenItem: "",
      showSearch: false,
      showNavMobile: false,
      showList: false,
      showListBoy: false,
      showListGirl: false,
      showListAll: false,
      /**
       * ẩn hiện wish list
       */
      showWishList: false,

      /**
       * v-model với cái search
       */
      searchText: "",

      /**
       * ẩn hiện header
       */
      showHeader: false,

      /**
       * Kiểm tra đăng nhập
       */
      isLogin: localStorage.getItem("userId"),

      /**
       * kết quả tìm kiếm
       */
      searchResult: null,
    };
  },
  computed: {
    ...mapGetters(["numberItem", "numberWishList", "isLoading", "isChange"]),
  },
};
</script>
<style>
@import url(./header.css);
</style>