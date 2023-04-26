<template>
  <div class="product-shop">
    <div v-show="isLoading" class="loading">
      <v-progress-circular
        color="#498374"
        indeterminate
        :size="128"
        :width="12"
      ></v-progress-circular>
      <p>Loading... Please wait in few seconds</p>
    </div>
    <div
      @click="filterShow = false"
      v-show="filterShow"
      class="menu-layout"
    ></div>
    <div
      @click="filterShow = !filterShow"
      :class="{ 'show-menu': filterShow }"
      class="menu-close"
    >
      <i class="fa-solid fa-xmark fa-lg"></i>
    </div>
    <div :class="{ 'show-menu': filterShow }" class="product-menu">
      <div class="menu">
        <div class="menu-title"><p>All categories</p></div>
        <div class="menu-contain">
          <router-link to="/product">All Book</router-link>
          <router-link
            :to="`/product/${item}`"
            v-for="(item, index) in listType"
            :key="index"
          >
            {{ item }}</router-link
          >
        </div>
      </div>
      <div class="menu">
        <div class="menu-title"><p>All categories</p></div>
        <div class="menu-contain">
          <label for="a1">
            <input
              @click="selectPrice"
              value="0-10"
              v-model="price"
              name="radio"
              id="a1"
              type="radio"
            />
            <i class="fa"></i>
            Less than $10
          </label>
          <label for="a2">
            <input
              @click="selectPrice"
              value="10-20"
              v-model="price"
              name="radio"
              id="a2"
              type="radio"
            />
            <i class="fa"></i>
            From $10 to $20
          </label>
          <label for="a3">
            <input
              @click="selectPrice"
              value="20-50"
              v-model="price"
              name="radio"
              id="a3"
              type="radio"
            />
            <i class="fa"></i>
            From $20 to $50
          </label>
          <label for="a4">
            <input
              @click="selectPrice"
              value="50-1000"
              v-model="price"
              name="radio"
              id="a4"
              type="radio"
            />
            <i class="fa"></i>
            More than $50
          </label>
        </div>
      </div>
    </div>

    <div class="product-body">
      <div class="product-body-title">
        <p>{{ showAllType || "All Book" }}</p>
        <v-select
          v-model="sort"
          hide-details="auto"
          label="Sort by"
          :items="items"
          item-text="name"
          item-value="last"
          density="compact"
          variant="solo"
          return-object
        ></v-select>
      </div>
      <div class="body-contain">
        <div v-show="isLoadingResult" class="loading-result">
          <div>
            <v-progress-circular
              color="#498374"
              indeterminate
              :size="128"
              :width="12"
            ></v-progress-circular>
            <p>Loading... Please wait in few seconds</p>
          </div>
        </div>
        <img
          style="width: 100%"
          v-show="!allList.length"
          src="https://cdn.dribbble.com/userupload/2905354/file/original-92212c04a044acd88c69bedc56b3dda2.png?compress=1&resize=1504x1128"
          alt=""
        />
        <v-item v-for="(item, key) in allList" :key="key" :item="item"></v-item>
      </div>
      <div class="paging" v-show="allList.length">
        <v-pagination
          v-model="currentPage"
          :length="totalPage"
          :total-visible="7"
        ></v-pagination>
      </div>
      <div class="paging-mobile" v-show="allList.length">
        <v-pagination
          :length="totalPage"
          :total-visible="6"
          density="compact"
        ></v-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import common from "../../js/common";
import api from "../../js/api";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      list: [],
      filterShow: false,
      listType: [],
      search: "",
      type: "",
      price: "",
      currentPage: 1,
      totalPage: 1,
      allList: [],
      showAllType: null,
      sort: { value: 1, title: "Default", sortType: "", sortOrder: "" },
      sortType: "",
      sortOrder: "",
      items: [
        { value: 1, title: "Default", sortType: "", sortOrder: "" },
        {
          value: 2,
          title: "Price: ascending",
          sortType: "price",
          sortOrder: "asc",
        },
        {
          value: 3,
          title: "Price: descending",
          sortType: "price",
          sortOrder: "desc",
        },
        { value: 4, title: "Name: A - Z", sortType: "name", sortOrder: "asc" },
        { value: 5, title: "Name: Z- A", sortType: "name", sortOrder: "desc" },
      ],
      /**
       * hiển thị load
       */
      isLoading: true,

      /**
       * Hiển thị load result
       */
      isLoadingResult: true,
    };
  },
  computed: {
    urlApi() {
      var urlApi =
        api.getBook(this.showAllType, this.currentPage, 12) +
        api.getsearchText(this.search);
      if (this.sort.sortType) {
        urlApi = urlApi + api.getSort(this.sort.sortType, this.sort.sortOrder);
      } else {
        urlApi = urlApi + api.getSort("modifiedDate", "desc");
      }

      if (this.price) {
        return urlApi + api.getSearchPrice(this.price);
      } else {
        return urlApi;
      }
    },
  },
  watch: {
    sort: function () {
      this.currentPage = 1;
    },

    /**
     * Theo dõi sự thay đổi của router
     */
    $route: function () {
      this.currentPage = 1;
      this.handlerRoute();
    },

    /**
     * Theo dõi sự thay đổi của api
     */
    urlApi: function () {
      this.isLoadingResult = true;
      this.allList = [];
      common.method("get", this.urlApi).then((response) => {
        this.allList = response;
      });
      common.getTotalPage("get", this.urlApi).then((response) => {
        this.totalPage = Math.ceil(response / 12);
        this.isLoadingResult = false;
      });
    },
  },

  async created() {
    this.handlerRoute();
    this.isLoading = true;
    const get = await common.method("get", this.urlApi);
    const getListType = await common.method("get", api.getCategory());
    getListType.forEach((element) => {
      this.listType.push(element.type);
    });
    this.allList = get;
    this.isLoading = false;
  },
  methods: {
    ...mapActions(["updateSnackbars"]),
    /**
     * Sắp xếp
     */
    selectPrice(event) {
      this.currentPage = 1;
      const value = event.target.value;
      if (this.price === value) {
        // Nếu radio button đã được chọn, bỏ chọn nó bằng cách đặt giá trị của biến trạng thái là null
        this.price = null;
      } else {
        // Nếu radio button chưa được chọn, đặt giá trị của biến trạng thái là giá trị của radio button đó
        this.price = value;
      }
      const get = common.method("get", this.urlApi);
      get.then((response) => {
        this.allList = response;
      });
    },

    /**
     * xử lý router
     */
    handlerRoute() {
      if (
        this.listType.includes(this.$route.params.text) ||
        !this.$route.params.text
      ) {
        this.showAllType = this.$route.params.text;
      } else {
        this.search = this.$route.params.text;
        this.price = "";
        this.type = "";
        this.showAllType = "";
      }
    },
  },
};
</script>

<style scoped>
@import url(./product.css);
.router-link-active,
.menu-contain a:hover {
  padding-left: 4px !important;
  border-left: 2px solid #498374;
}

.loading-result {
  position: absolute;
  z-index: 2;
  align-items: start;
}

.loading-result div {
  display: flex;
  align-items: center;
}

.router-link-active::before {
  display: none;
}
</style>