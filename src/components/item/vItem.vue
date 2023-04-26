<template>
  <router-link @click="setItem" :to="`/detail/${item.id}`">
    <div class="item">
      <div class="item-header">
        <div
          :class="{ isWishList: isWishList }"
          @click.prevent="addToWishList"
          class="wishList-item"
        >
          <m-icon icon="fa-solid fa-heart fa-lg"></m-icon>
        </div>
        <img :src="item.urlImage" alt="" />
        <div class="item-footer">
          <router-link
            :class="{ disable: !checkQuantity }"
            @click="addToCart"
            to=""
          >
            <m-icon icon="fa-solid fa-cart-shopping fa-lg"></m-icon>
          </router-link>
          <router-link
            :class="{ disable: !checkQuantity }"
            @click="buyNow"
            to="buy-now"
          >
            <m-icon icon="fa-regular fa-credit-card fa-lg"></m-icon>
          </router-link>
          <router-link @click="setItem" to="/detail">
            <m-icon icon="fa-solid fa-magnifying-glass fa-lg"></m-icon>
          </router-link>
        </div>
      </div>
      <div class="item-body">
        <p class="body-title">{{ item.name }}</p>
        <p class="body-price">${{ item.price }}</p>
        <p class="body-status">
          {{ checkQuantity ? "In Stock" : "Out of stock" }}
        </p>
      </div>
    </div>
  </router-link>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      isWishList: false,
      /**
       * Kiểm tra số lượng
       */
      checkQuantity: false,
    };
  },
  props: ["item"],
  computed: {
    ...mapGetters(["numberWishList"]),
  },
  watch: {
    numberWishList: function () {
      this.updateStatus();
    },

    item() {
      this.checkQuantity = this.item.quantity;
    },
  },
  async created() {
    this.updateStatus();
    this.checkQuantity = this.item.quantity;
  },
  methods: {
    ...mapActions([
      "updateNumerItem",
      "updateNumberWishList",
      "updateToast",
      "updateChange",
    ]),

    /**
     * thêm mặt hàng vào local storage để hiển thị ở trang chi tiết
     */
    setItem() {
      this.updateChange(this.item.id);
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
      this.$emit("reloadWishList");
      localStorage.setItem("wishList", JSON.stringify(wishList));
      this.updateNumberWishList(wishList.length);
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
     * Thêm mặt hàng mua ngay vào local storage
     */
    buyNow() {
      localStorage.setItem("buyNow", JSON.stringify([this.item]));
    },

    /**
     * Cập nhật trạng thái khi click vào nút add to wish list
     */
    updateStatus() {
      var wishList = JSON.parse(localStorage.getItem("wishList") || "[]");
      if (this.item) {
        if (wishList.find((item) => item.id == this.item.id)) {
          this.isWishList = true;
        } else {
          this.isWishList = false;
        }
      }
    },
  },
};
</script>

<style scoped>
@import url(./item.css);
a {
  max-height: 390px;
  text-decoration: none;
}

p {
  margin-bottom: 4px;
}

.disable {
  opacity: 0.5;
  pointer-events: none;
}
</style>