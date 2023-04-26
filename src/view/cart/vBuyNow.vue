<template>
  <div @click="closePanel" class="buy-now">
    <p class="logo">FLagships Books</p>
    <div class="buy-info">
      <div class="buy-btn-mobile">
        <router-link to="/cart">
          <v-button
            style="background-color: #ddd; color: #000"
            label="Back To Cart"
          ></v-button>
        </router-link>
        <v-button
          style="background-color: #498374"
          label="Order Now"
          @click="submit"
        ></v-button>
      </div>
      <div class="buy-center">
        <p>Your address</p>
        <v-text-field
          class="mb-1"
          :rules="[rules.required, rules.emailMatch]"
          ref="email"
          v-model="form.email"
          density="compact"
          label="Email"
          variant="outlined"
        ></v-text-field>
        <v-text-field
          class="mb-1"
          :rules="[rules.required, rules.phoneNumberMatch]"
          ref="phonenumber"
          v-model="form.phonenumber"
          density="compact"
          label="Phone Number"
          variant="outlined"
        ></v-text-field>
        <v-text-field
          class="mb-1"
          :rules="[rules.required, rules.fullNameMatch]"
          ref="fullname"
          v-model="form.fullname"
          density="compact"
          label="Full Name"
          variant="outlined"
        ></v-text-field>
        <v-text-field
          class="mb-1"
          :rules="[rules.required, rules.min]"
          ref="address"
          v-model="form.address"
          density="compact"
          label="Address"
          variant="outlined"
        ></v-text-field>
        <v-textarea
          v-model="form.note"
          label="Note(If any)"
          variant="outlined"
          density="compact"
        ></v-textarea>
      </div>
      <div class="buy-right">
        <!-- ship -->
        <p>shipping method</p>
        <v-expansion-panels
          @click.stop="payPanelShow = ''"
          v-model="shipPanelShow"
        >
          <v-expansion-panel value="free">
            <v-expansion-panel-title :ripple="true">
              Free Delivery
              <template v-slot:actions="{ expanded }">
                <v-icon
                  :color="!expanded ? 'teal' : ''"
                  :icon="
                    expanded
                      ? 'mdi-chevron-up'
                      : shipPanel == 'free'
                      ? 'mdi-check'
                      : 'mdi-check-circle-outline'
                  "
                ></v-icon>
              </template>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <p>- Applies to orders of $25 or more</p>
              <p>- Price: Free</p>
              <p>- Delivery time: 1 week</p>
              <v-card-actions class="p-0">
                <v-spacer></v-spacer>
                <v-btn
                  @click="shipSelect('free')"
                  variant="tonal"
                  color="green"
                  :disabled="total < 25"
                >
                  Select
                </v-btn>
              </v-card-actions>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel value="eco" class="mt-3">
            <v-expansion-panel-title :ripple="true">
              Economical Delivery
              <template v-slot:actions="{ expanded }">
                <v-icon
                  :color="!expanded ? 'teal' : ''"
                  :icon="
                    expanded
                      ? 'mdi-chevron-up'
                      : shipPanel == 'eco'
                      ? 'mdi-check'
                      : 'mdi-check-circle-outline'
                  "
                ></v-icon>
              </template>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <p>- Giao hang tiet kiem will be responsible for shipping</p>
              <p>- Price: $1.5</p>
              <p>- Delivery time: 4-5 days</p>
              <v-card-actions class="p-0">
                <v-spacer></v-spacer>
                <v-btn @click="shipSelect('eco')" variant="tonal" color="green">
                  Select
                </v-btn>
              </v-card-actions>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel value="fast" class="mt-3 mb-4">
            <v-expansion-panel-title :ripple="true">
              Fast Delivery
              <template v-slot:actions="{ expanded }">
                <v-icon
                  :color="!expanded ? 'teal' : ''"
                  :icon="
                    expanded
                      ? 'mdi-chevron-up'
                      : shipPanel == 'fast'
                      ? 'mdi-check'
                      : 'mdi-check-circle-outline'
                  "
                ></v-icon>
              </template>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <p>- Giao hang nhanh will be responsible for shipping</p>
              <p>- Price: $3</p>
              <p>- Delivery time: 1-2 days</p>
              <v-card-actions class="p-0">
                <v-spacer></v-spacer>
                <v-btn
                  @click="shipSelect('fast')"
                  variant="tonal"
                  color="green"
                >
                  Select
                </v-btn>
              </v-card-actions>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>

        <!-- pay -->
        <p>payment method</p>
        <v-expansion-panels
          @click.stop="shipPanelShow = ''"
          v-model="payPanelShow"
        >
          <v-expansion-panel>
            <v-expansion-panel-title value="bank" :ripple="true">
              Cash on delivery
              <template v-slot:actions="{ expanded }">
                <v-icon
                  :color="!expanded ? 'teal' : ''"
                  :icon="
                    expanded
                      ? 'mdi-chevron-up'
                      : payPanel == 'bank'
                      ? 'mdi-check'
                      : 'mdi-check-circle-outline'
                  "
                ></v-icon>
              </template>
            </v-expansion-panel-title>

            <v-expansion-panel-text>
              <p>- You will make payment by cash on delivery</p>
              <v-card-actions class="p-0">
                <v-spacer></v-spacer>
                <v-btn @click="paySelect('bank')" variant="tonal" color="green">
                  Select
                </v-btn>
              </v-card-actions>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel value="cod" class="mt-3">
            <v-expansion-panel-title :ripple="true">
              Bank tranfer
              <template v-slot:actions="{ expanded }">
                <v-icon
                  :color="!expanded ? 'teal' : ''"
                  :icon="
                    expanded
                      ? 'mdi-chevron-up'
                      : payPanel == 'cod'
                      ? 'mdi-check'
                      : 'mdi-check-circle-outline'
                  "
                ></v-icon>
              </template>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <p>- Nguyen Manh Hung</p>
              <p>- MBank</p>
              <p>- 5550108122002</p>
              <v-card-actions class="p-0">
                <v-spacer></v-spacer>
                <v-btn @click="paySelect('cod')" variant="tonal" color="green">
                  Select
                </v-btn>
              </v-card-actions>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
      <div class="buy-left">
        <p>Your order ({{ cartList.length }} product)</p>
        <div class="order-detail">
          <div
            class="buy-now-item"
            style="position: relative"
            v-for="(item, index) in cartList"
            :key="index"
          >
            <div>
              <img :src="item.urlImage" alt="" />
              <p>{{ item.name }}</p>
            </div>
            <p>${{ item.price }}</p>
            <div
              :style="
                stockList[index].quantity
                  ? (stockList[index].quantity - item.number || 1) < 0
                    ? 'background-color: yellow'
                    : ''
                  : 'background-color: red'
              "
            >
              {{
                stockList[index].quantity
                  ? (stockList[index].quantity - item.number || 1) < 0
                    ? "x"
                    : item.number || 1
                  : "0"
              }}
            </div>
          </div>
        </div>
        <div class="order-price">
          <p>
            Order price: <span>{{ `$${total.toFixed(2)}` }}</span>
          </p>
          <p>
            Shipping price: <span>{{ `$${shipFee}` }}</span>
          </p>
        </div>
        <div class="order-buy">
          <p>
            Total: <span>${{ (total + shipFee).toFixed(2) }}</span>
          </p>
          <div>
            <router-link to="/cart">
              <v-button
                style="background-color: #ddd; color: #000"
                label="Back To Cart"
              ></v-button>
            </router-link>
            <v-btn
              @click="submit"
              style="background-color: #498374"
              label="Order Now"
              :loading="snackbar"
            ></v-btn>
          </div>
        </div>
      </div>
    </div>
    <v-snackbar timeout="3000" location="top" v-model="snackbar">
      You must select
      {{ shipPanel ? (payPanel ? "" : "payment method") : "shipping method" }}
      first
      <template v-slot:actions>
        <v-btn color="#498374" variant="text" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-dialog v-model="dialog" :scrim="false" persistent width="auto">
      <v-card
        :color="isSuccess ? (dialogMessage ? 'yellow' : '#498374') : 'primary'"
      >
        <v-card-text v-show="isSuccess">
          <v-icon
            start
            :icon="dialogMessage ? 'mdi-alert' : 'mdi-checkbox-marked-circle'"
          ></v-icon>
          {{ dialogMessage ? dialogMessage : "Order successfully" }}
        </v-card-text>

        <v-card-text v-show="!isSuccess">
          Please stand by
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
  
  <script>
import { mapActions } from "vuex";
import api from "../../js/api";
import common from "../../js/common";
export default {
  data() {
    return {
      rules: {
        required: (value) => !!value || "Required",
        min: (value) => value.length >= 8 || "Min 8 characters",
        emailMatch: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail";
        },
        fullNameMatch: (value) => {
          const pattern = /^[\p{Lu}\p{Ll} ]{2,50}$/u;
          return pattern.test(value) || "Invalid name";
        },
        phoneNumberMatch: (value) => {
          const pattern = /^[0-9]{10}$/;
          return pattern.test(value) || "Invalid phone number";
        },
      },
      form: {
        email: "",
        phonenumber: "",
        fullname: "",
        address: "",
        note: "",
      },
      password: "Password",
      /**
       * Ẩn hiện thông tin vận chuyển
       */
      shipPanelShow: "",

      /**
       * Lưu thông tin vận chuyển
       */
      shipPanel: "",

      /**
       * Ẩn hiện cách thanh toán
       */
      payPanelShow: "",

      /**
       * Lưu cách thanh toán
       */
      payPanel: "",

      /**
       * Ẩn hiện snackbar
       */
      snackbar: false,

      /**
       * Ẩn hiện dialog
       */
      dialog: false,

      /**
       * Thông báo thành công
       */
      isSuccess: false,

      /**
       * danh sách mua hàng
       */
      cartList: null,

      /**
       * phí giao hàng
       */
      shipFee: 0,

      /**
       * Tổng tiền hàng
       */
      total: 0,

      /**
       * Thông điệp trong dialog
       */
      dialogMessage: "",

      /**
       * Kho hàng
       */
      stockList: [],
    };
  },
  watch: {
    isSuccess() {
      setTimeout(() => {
        this.dialog = false;
        this.isSuccess = false;
      }, 2000);
    },
    shipPanel() {
      this.shipFee = 0;
      if (this.shipPanel == "eco") {
        this.shipFee = 1.5;
      }
      if (this.shipPanel == "fast") {
        this.shipFee = 3;
      }
      this.totalOrder += this.shipFee;
    },
  },
  methods: {
    ...mapActions(["updateSnackbars"]),
    /**
     * Đóng panel khi click ra ngoài
     */
    closePanel() {
      this.shipPanelShow = "";
      this.payPanelShow = "";
    },

    /**
     * Mua hàng
     */
    async submit() {
      this.dialogMessage = "";
      this.snackbar = false;
      var check = true;
      this.dialog = false;
      for (const f of Object.keys(this.form)) {
        if (f != "note") {
          const result = await this.$refs[f].validate(true);
          if (result.length) {
            check = false;
          }
        }
      }
      if (!this.payPanel || !this.shipPanel) {
        this.snackbar = true;
        check = false;
      }

      // sau khi kiểm tra thông tin người dùng nhập thành công
      this.dialog = check;
      var orderList = [];
      var text = [];
      for (let index = 0; index < this.cartList.length; index++) {
        const el = this.cartList[index];
        const get = await common.method("get", api.getApi() + `/${el.id}`);
        if (!get) {
          this.dialogMessage =
            "Your order contains products that are has been deleted, back to cart to check the order";
          this.isSuccess = true;
          return;
        }
        orderList.push({
          id: el.id,
          name: el.name,
          number: el.number,
        });
      }

      // kiểm tra số lượng sản phẩm xem có còn không
      for (var i = 0; i < this.stockList.length; i++) {
        if (this.stockList[i].quantity) {
          if (this.stockList[i].quantity - orderList[i].number < 0) {
            check = false;
            this.isSuccess = true;
            text.push(orderList[i].name);
            this.dialogMessage = `Your order: ${[
              ...text,
            ]} that exceed the quantity in stock`;
          }
        } else {
          check = false;
          this.dialogMessage =
            "Your order contains products that are out of stock";
          this.isSuccess = true;
        }
      }

      // Cập nhật api
      if (check) {
        console.log({
          id: common.uuidv4(),
          userId: localStorage.getItem("userId"),
          info: this.form,
          order: orderList,
          ship: this.shipPanel,
          pay: this.payPanel,
          total: parseInt((this.total + this.shipFee).toFixed(2)),
          status: "pending",
          createdAt: common.getDate(),
          modifiedAt: common.getDate(),
        });
        const order = await common.method("post", api.getOrder(), {
          id: common.uuidv4(),
          userId: localStorage.getItem("userId"),
          info: this.form,
          order: orderList,
          ship: this.shipPanel,
          pay: this.payPanel,
          total: parseInt((this.total + this.shipFee).toFixed(2)),
          status: "pending",
          createdAt: common.getDate(),
          modifiedAt: common.getDate(),
        });
        if (order) {
          var check2 = true;
          for (var j = 0; j < this.stockList.length; j++) {
            this.stockList[j].quantity =
              this.stockList[j].quantity - orderList[j].number;
            this.stockList[j].sold =
              this.stockList[j].sold + orderList[j].number;
            const updateQuantity = await common.method(
              "put",
              api.getWarehouse() + `/${orderList[j].id}`,
              this.stockList[j]
            );
            check2 = updateQuantity;
          }
          if (check2) {
            this.isSuccess = true;
          }
        }
      }
    },

    /**
     * chọn cách vận chuyển
     * @param item cách vận chuyển
     */
    shipSelect(item) {
      this.shipPanelShow = "";
      this.shipPanel = item;
    },

    paySelect(item) {
      this.payPanelShow = "";
      this.payPanel = item;
    },
  },
  async created() {
    this.updateSnackbars({ status: false });
    this.cartList = JSON.parse(localStorage.getItem("buyNow" || "{}"));
    if (!this.cartList) {
      this.cartList = JSON.parse(
        localStorage.getItem("listSelectItems" || "{}")
      );
    }
    if (!this.cartList.length) {
      this.updateSnackbars({ status: true });
      this.$router.push("/cart");
      return;
    }
    const get = await common.method(
      "get",
      api.getUser() + `/${localStorage.getItem("userId")}`
    );
    for (const f of Object.keys(this.form)) {
      this.form[f] = get[f];
    }

    for (var i = 0; i < this.cartList.length; i++) {
      const checkQuantity = await common.method(
        "get",
        api.getWarehouse() + `/${this.cartList[i].id}`
      );
      this.stockList.push(checkQuantity);
    }
    this.cartList.forEach((element) => {
      this.total += element.price * element.number;
    });
  },
  unmounted() {
    localStorage.removeItem("buyNow");
    this.updateSnackbars({ status: false, text: "Sign in to buy your order" });
  },
};
</script>
  
  <style scoped>
@import url(buyNow.css);
</style>