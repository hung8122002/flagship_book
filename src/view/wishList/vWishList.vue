<template>
  <div class="wishlist" @click.self="$emit('closeWishList')">
    <div class="wishList-container">
      <div @click="$emit('closeWishList')">
        <i class="fa-solid fa-xmark fa-lg"></i>
      </div>
      <div class="wishList-top">
        <p>My wish list</p>
      </div>
      <div class="wishList-center">
        <img
          v-show="!wishList.length"
          src="https://i.pinimg.com/736x/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2---page-empty-page.jpg"
          alt=""
        />
        <v-item
          @reloadWishList="removeItem(item)"
          v-for="item in wishList"
          :key="item.id"
          :item="item"
        ></v-item>
      </div>
      <div class="wishList-bottom">
        <v-button
          :isDisabled="wishList.length ? false : true"
          @click="removeAll"
          style="background-color: red"
          label="Remove all"
        ></v-button>
        <v-button
          :isDisabled="wishList.length ? false : true"
          @click="buyAll"
          style="background-color: green"
          label="Buy all"
        ></v-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["numberWishList"],
  name: "wishList",
  data() {
    return {
      wishList: [],
    };
  },
  watch: {
    numberWishList: function () {
      this.wishList = JSON.parse(localStorage.getItem("wishList") || "[]");
    },
  },
  created() {
    this.wishList = JSON.parse(localStorage.getItem("wishList") || "[]");
  },
  methods: {
    ...mapActions(["updateNumerItem", "updateNumberWishList", "updateToast"]),
    /**
     * Xóa mặt hàng khỏi wish list
     * @param item Mặt hàng cần xóa khỏi wish list
     */
    removeItem(item) {
      this.wishList = this.wishList.filter((el) => el.id != item.id);
      localStorage.setItem("wishList", JSON.stringify(this.wishList));
    },

    /**
     * Cho toàn bộ mặt hàng ở wish list vào cart
     */
    buyAll() {
      var cartList = JSON.parse(localStorage.getItem("cartList") || "[]");
      var check = false;
      this.wishList.forEach((element) => {
        if (!cartList.find((el) => element.id == el.id)) {
          cartList.push(element);
          check = true;
        }
      });
      if (check) {
        var listSelectItems = JSON.parse(
          localStorage.getItem("listSelectItems") || "[]"
        );
        listSelectItems = [...listSelectItems, ...this.wishList];
        localStorage.setItem(
          "listSelectItems",
          JSON.stringify(listSelectItems)
        );
        localStorage.setItem("cartList", JSON.stringify(cartList));
        this.updateToast({
          action: this.resource.action.add,
          status: this.resource.status.success,
          component: this.resource.component.cart,
        });
      } else {
        this.updateToast({
          action: this.resource.action.add,
          status: this.resource.status.warning,
          component: this.resource.component.cart,
          error: this.resource.error.isExist,
          number: Math.random(),
        });
      }
    },

    /**
     * Xóa toàn bộ sản phẩm ở wish list
     */
    removeAll() {
      this.wishList = [];
      localStorage.setItem("wishList", JSON.stringify(this.wishList));
      this.updateToast({
        action: this.resource.action.remove,
        status: this.resource.status.success,
        component: this.resource.component.wishList,
        number: Math.random(),
      });
    },
  },
};
</script>

<style scoped>
@import url(./wishList.css);
img {
  width: 100%;
  max-height: 330px;
}
</style>