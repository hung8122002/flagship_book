<template>
  <div>
    <div class="detail">
      <div class="detail-left">
        <img :src="item.urlImage" alt="" />
      </div>
      <div class="detail-right">
        <div class="right-title">
          <p class="title">{{ item.name }}</p>
          <div class="info">
            <label for="">Author:</label>
            <label>{{ item.author }}</label>
          </div>
          <div class="info">
            <label for="">Age:</label>
            <label>13+</label>
          </div>
          <div class="info">
            <label for="">Published:</label>
            <label>{{ item.published }}</label>
          </div>
          <div class="info">
            <label for="">Status:</label>
            <label> {{ checkQuantity ? "In Stock" : "Out of stock" }}</label>
          </div>
          <div class="description">
            <label for="">Description:</label>
            <p>
              {{ item.description }}
            </p>
          </div>
        </div>
        <div class="right-contain">
          <div class="price">
            <p>Price: {{ `$${item.price}` }}</p>
          </div>
          <div class="detail-number">
            <span>Quantity</span>
            <v-quantity-input></v-quantity-input>
          </div>
          <div class="detail-btn">
            <router-link @click="buyNow" to="buy-now">
              <v-button
                style="background-color: #498374"
                label="Buy now"
                :disabled="!checkQuantity"
              ></v-button>
            </router-link>
            <a @click="addToCart">
              <v-button
                style="background-color: #498374"
                label="Add to cart"
                :disabled="!checkQuantity"
              ></v-button>
            </a>
            <a @click="addToWishList" style="width: 100%">
              <v-button
                style="background-color: #ddd; color: #000"
                :label="`${wishListText} wishlist`"
              ></v-button>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import api from "../../js/api";
import common from "../../js/common";
export default {
  data() {
    return {
      item: {},
      /**
       * Kiểm tra số lượng
       */
      checkQuantity: false,

      /**
       * wish list text
       */
      wishListText: "",
    };
  },
  computed: {
    ...mapGetters(["isChange", "numberWishList"]),
  },
  watch: {
    isChange() {
      this.updateDetail();
    },

    $route() {
      if (this.$route.params.id) {
        this.updateDetail();
      }
    },

    numberWishList() {
      this.updateWishListText();
    },
  },
  methods: {
    ...mapActions(["updateNumerItem", "updateToast", "updateNumberWishList"]),
    setItem() {
      localStorage.setItem("itemDetail", JSON.stringify(this.item));
    },

    /**
     * Thêm vào cart
     */
    addToCart() {
      var cartList = JSON.parse(localStorage.getItem("cartList") || "[]");
      var listSelectItems = JSON.parse(
        localStorage.getItem("listSelectItems") || "[]"
      );
      var check = cartList.filter((el) => el.id == this.item.id);
      var item = this.item;
      if (!check.length) {
        item.number = 1;
        cartList.push(item);
        this.updateNumerItem(cartList.length);
        listSelectItems.push(item);
      } else {
        const index = cartList.findIndex((item) => item.id == this.item.id);
        cartList[index].number++;
      }
      localStorage.setItem("cartList", JSON.stringify(cartList));
      localStorage.setItem("listSelectItems", JSON.stringify(listSelectItems));
      this.updateToast({
        action: this.resource.action.add,
        status: this.resource.status.success,
        component: this.resource.component.cart,
        number: Math.random(),
      });
    },

    /**
     * Thêm mặt hàng vào wish list
     */
    addToWishList() {
      var wishList = JSON.parse(localStorage.getItem("wishList") || "[]");
      var action = "";
      var item = this.item;
      item.number = 1;
      if (wishList.find((item) => item.id == this.item.id)) {
        wishList = wishList.filter((item) => item.id != this.item.id);
        this.isWishList = false;
        action = this.resource.action.remove;
      } else {
        wishList.push(item);
        this.isWishList = true;
        action = this.resource.action.add;
      }
      this.updateToast({
        action: action,
        status: this.resource.status.success,
        component: this.resource.component.wishList,
        number: Math.random(),
      });
      this.updateWishListText();
      this.$emit("reloadWishList");
      localStorage.setItem("wishList", JSON.stringify(wishList));
      this.updateNumberWishList(wishList.length);
    },

    /**
     * mua ngay
     */
    buyNow() {
      localStorage.setItem("buyNow", JSON.stringify([this.item]));
    },

    /**
     * Cập nhật
     */
    async updateDetail() {
      this.item = await common.method(
        "get",
        api.getWarehouse() + `/${this.$route.params.id}`
      );
      this.checkQuantity = this.item.quantity;
      this.updateWishListText();
      if (!this.item) {
        this.$router.push("/error");
        return;
      }
    },

    updateWishListText() {
      var wishList = JSON.parse(localStorage.getItem("wishList") || "[]");
      if (wishList.find((item) => item.id == this.item.id)) {
        this.wishListText = "remove from";
      } else {
        this.wishListText = "add to";
      }
    },
  },
  created() {
    this.updateDetail();
  },
};
</script>

<style scoped>
@import url(./detail.css);
.detail-btn a {
  width: 48%;
}
</style>