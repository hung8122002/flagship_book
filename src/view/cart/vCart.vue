<template>
  <div class="cart">
    <p>Your shopping cart</p>
    <div class="empty-cart" v-show="!cartList.length">
      <img src="https://iticsystem.com/img/empty-cart.png" alt="" />
      <div style="margin-top: 20px">
        <router-link to="/product">
          <v-button label="shopping now"></v-button>
        </router-link>
      </div>
    </div>

    <div v-show="cartList.length" class="cart-body">
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th style="text-align: start">Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartList" :key="item.id" class="cart-item">
            <td>
              <label :for="item.id">
                <input
                  hidden
                  :id="item.id"
                  v-model="listSelect"
                  :value="item.id"
                  type="checkbox"
                />
                <i class="fa-solid fa-circle-check fa-xl"></i>
              </label>
            </td>
            <td>
              <router-link :to="`/detail/${item.id}`">
                <div class="cart-item-info">
                  <img :src="item.urlImage" alt="" />
                  <div>
                    <p>{{ item.name }}</p>
                    <p>{{ item.author }}</p>
                  </div>
                </div>
              </router-link>
            </td>
            <td>${{ item.price }}</td>
            <td>
              <v-quantity-input v-model="item.number"></v-quantity-input>
            </td>
            <td>${{ (item.price * item.number).toFixed(2) }}</td>
            <td>
              <i
                @click="showDialogRemove(item)"
                style="color: gray"
                class="fa-solid fa-trash fa-lg"
              ></i>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>
              <label @click.prevent="checkAllClick" for="checkAll">
                <input
                  :checked="checkAll"
                  id="checkAll"
                  hidden
                  type="checkbox"
                />
                <i class="fa-solid fa-circle-check fa-xl"></i>
              </label>
            </td>
            <td>Selected: {{ listSelect.length }} products</td>
            <td style="width: 210px">
              <router-link to="/product">
                <v-button
                  style="background-color: #ddd; color: #000"
                  label="Continue Shopping"
                ></v-button>
              </router-link>
            </td>
            <td>
              <v-button
                style="background-color: #498374"
                label="Buy Now"
                @click="buyNow"
              ></v-button>
            </td>
            <td>
              <p>
                Total: <span>{{ `$${total.toFixed(2)}` }}</span>
              </p>
            </td>
            <td>
              <i
                @click="showDialogRemove"
                style="color: gray"
                class="fa-solid fa-trash fa-lg"
              ></i>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>

    <div v-show="cartList.length" class="cart-body-mobile">
      <div>
        <div v-for="item in cartList" :key="item.id" class="cart-item">
          <div class="info-mobile">
            <router-link @click="setItem(item)" to="detail">
              <div class="cart-item-info">
                <img :src="item.urlImage" alt="" />
                <div>
                  <p>{{ item.name }}</p>
                  <p>{{ item.author }}</p>
                  <p>${{ item.price }}</p>
                </div>
              </div>
            </router-link>
          </div>
          <div class="price-mobile">
            <label :for="item.id">
              <input
                hidden
                :id="item.id"
                v-model="listSelect"
                :value="item.id"
                type="checkbox"
              />
              <i class="fa-solid fa-circle-check fa-xl"></i>
            </label>
            <v-quantity-input v-model="item.number"></v-quantity-input>
            <i
              @click="showDialogRemove(item)"
              class="fa-solid fa-trash fa-lg"
            ></i>
          </div>
        </div>
      </div>
      <div class="cart-footer-mobile">
        <router-link to="/product">
          <v-button
            style="background-color: #ddd; color: #000"
            label="Continue Shopping"
          ></v-button>
        </router-link>

        <v-button
          style="background-color: #498374"
          label="Buy Now"
          @click="buyNow"
        ></v-button>
        <p>
          Total: <span>{{ `$${total.toFixed(2)}` }}</span>
        </p>
      </div>
    </div>

    <m-dialog @removeItem="removeItem" v-model="showDialog">
      <div>
        <h3>Confirm delete</h3>
        <hr />
        <p style="margin: 0">
          Delete product: {{ deleteItem.name || `${cartList.length} products` }}
        </p>
      </div>
    </m-dialog>

    <v-snackbar timeout="3000" location="top" v-model="snackbar">
      Nothing to buy, get sothing first
      <template v-slot:actions>
        <v-btn color="#498374" variant="text" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import vButton from "../../components/button/vButton.vue";
import api from "../../js/api";
import common from "../../js/common";
export default {
  components: { vButton },
  data() {
    return {
      snackbar: false,

      /**
       * Check all
       */
      checkAll: false,

      /**
       * Mặt hàng cần xóa
       */
      deleteItem: "",

      /**
       * ẩn hiện thông tin thanh toán
       */
      showDialog: false,

      /**
       * danh sách mua hàng
       */
      cartList: null,

      /**
       * Tổng tiền
       */
      total: 0,

      /**
       * v-model với cái check, chọn item
       */
      listSelect: [],

      /**
       * v-model với cái số lượng
       */
      number: 0,
    };
  },
  watch: {
    listSelect: function () {
      this.checkAll = this.listSelect.length == this.cartList.length;
      this.total = 0;
      var get = [];
      this.cartList.forEach((el) => {
        if (this.listSelect.includes(el.id)) {
          this.total += el.price * el.number;
          get.push(el);
        }
      });
      localStorage.setItem("listSelectItems", JSON.stringify(get));
    },

    cartList: {
      handler() {
        this.total = 0;
        this.cartList.forEach((el) => {
          if (this.listSelect.find((element) => el.id == element)) {
            this.total += el.price * el.number;
          }
        });
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters(["showSnackbars"]),
  },
  methods: {
    ...mapActions(["updateNumerItem", "updateToast", "updateSnackbars"]),
    /**
     * Xử lý nút chọn tất cả
     */
    checkAllClick() {
      this.checkAll = !this.checkAll;
      this.listSelect = [];
      if (this.checkAll) {
        this.cartList.forEach((el) => {
          this.listSelect.push(el.id);
        });
      }
    },

    /**
     * hiện dialog xác nhận xóa
     * @param item mặt hàng cần xóa
     */
    showDialogRemove(item) {
      this.deleteItem = item;
      this.showDialog = true;
    },

    /**
     * Xóa mặt hàng khỏi cart
     * @param item mặt hàng muốn xóa
     */
    removeItem() {
      if (this.deleteItem.id) {
        this.cartList = this.cartList.filter(
          (el) => el.id != this.deleteItem.id
        );
        this.listSelect = this.listSelect.filter(
          (el) => el != this.deleteItem.id
        );
      } else {
        this.cartList = [];
      }
      this.updateNumerItem(this.cartList.length);
      localStorage.setItem("cartList", JSON.stringify(this.cartList));
      this.updateToast({
        action: this.resource.action.remove,
        status: this.resource.status.success,
        component: this.resource.component.cart,
        number: Math.random(),
      });
    },

    buyNow() {
      if (!localStorage.getItem("userId")) {
        this.updateSnackbars({
          status: true,
          text: "Sign in to buy your order",
        });
        console.log(this.showSnackbars.status);
        this.$router.push("/login");
        return;
      }
      this.$router.push("/buy-now");
    },
  },
  async created() {
    this.snackbar = this.showSnackbars.status;
    this.cartList = JSON.parse(localStorage.getItem("cartList" || "[]")) || [];
    for (var i = 0; i < this.cartList.length; i++) {
      const get = await common.method(
        "get",
        api.getApi() + `/${this.cartList[i].id}`
      );
      if (!get) {
        this.cartList = this.cartList.filter(
          (el) => el.id != this.cartList[i].id
        );
      }
    }
  },
  beforeUnmount() {
    if (localStorage.getItem("userId")) {
      this.updateSnackbars({
        status: false,
      });
    }
  },
  unmounted() {
    localStorage.setItem("cartList", JSON.stringify(this.cartList));
    localStorage.setItem("listSelectItems", "[]");
  },
};
</script>

<style scoped>
@import url(./cart.css);
.cart-footer-mobile button {
  width: 100%;
}
i {
  cursor: pointer;
  color: gray;
}
</style>