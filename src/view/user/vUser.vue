<template>
  <div class="user">
    <div v-show="isLoading" class="loading">
      <v-progress-circular
        color="#498374"
        indeterminate
        :size="128"
        :width="12"
      ></v-progress-circular>
      <p>{{ $t("loading") }}</p>
    </div>
    <v-card>
      <v-toolbar class="text-white" color="#498374">
        <v-toolbar-title>{{ $t("account.tab1.user-info") }}</v-toolbar-title>
      </v-toolbar>
      <div class="d-flex flex-row">
        <v-tabs v-model="tab" direction="vertical" color="#498374">
          <v-tab value="option-1">
            <v-icon start> mdi-account </v-icon>
            {{ $t("account.tab1.title") }}
          </v-tab>
          <v-tab value="option-2">
            <v-icon start> mdi-cube-scan </v-icon>
            {{ $t("account.tab2.title") }}
          </v-tab>
          <v-tab value="option-3">
            <v-icon start> mdi-history </v-icon>
            {{ $t("account.tab4.title") }}
          </v-tab>
          <v-tab value="option-4">
            <v-icon start> mdi-cog </v-icon>
            {{ $t("account.tab3.title") }}
          </v-tab>
        </v-tabs>
        <v-window v-model="tab">
          <v-window-item value="option-1">
            <v-card flat>
              <v-card-text>
                <div>
                  <h5>{{ $t("account.tab1.user-info") }}</h5>
                  <v-text-field
                    class="mb-1"
                    ref="username"
                    v-model="form.username"
                    density="compact"
                    :label="$t('user.user-name')"
                    variant="outlined"
                    counter
                    disabled
                  ></v-text-field>
                  <v-text-field
                    class="mb-1"
                    ref="fullname"
                    v-model="form.fullname"
                    density="compact"
                    :rules="[rules.min, rules.fullNameMatch]"
                    :label="$t('user.fullname')"
                    variant="outlined"
                    counter
                  ></v-text-field>
                  <v-text-field
                    class="mb-1"
                    ref="email"
                    v-model="form.email"
                    density="compact"
                    :rules="[rules.required, rules.emailMatch]"
                    :label="$t('user.email')"
                    variant="outlined"
                    counter
                  ></v-text-field>
                  <v-text-field
                    class="mb-1"
                    ref="phonenumber"
                    v-model="form.phonenumber"
                    density="compact"
                    :rules="[rules.phoneNumberMatch]"
                    :label="$t('user.phone-number')"
                    variant="outlined"
                    counter
                  ></v-text-field>
                  <v-text-field
                    class="mb-1"
                    ref="address"
                    v-model="form.address"
                    density="compact"
                    :rules="[rules.min]"
                    :label="$t('user.address')"
                    variant="outlined"
                    counter
                  ></v-text-field>
                  <div style="text-align: end">
                    <v-btn
                      @click="submit"
                      :disabled="dialog"
                      :loading="dialog"
                      class="text-white"
                      color="#498374"
                      variant="flat"
                    >
                      {{ $t("action.save") }}
                    </v-btn>
                  </div>

                  <h5>{{ $t("user.change-password") }}</h5>
                  <v-text-field
                    ref="oldPassword"
                    v-model="password.oldPassword"
                    :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min, rules.correctPassword]"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-1"
                    :label="$t('user.old-password')"
                    density="compact"
                    variant="outlined"
                    counter
                    @click:append="show1 = !show1"
                  ></v-text-field>
                  <v-text-field
                    ref="newPassword"
                    v-model="password.newPassword"
                    :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-1"
                    :label="$t('user.new-password')"
                    density="compact"
                    variant="outlined"
                    counter
                    @click:append="show1 = !show1"
                  ></v-text-field>
                  <v-text-field
                    ref="cfPassword"
                    v-model="password.cfPassword"
                    :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min, rules.cfPassword]"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-1"
                    :label="$t('user.new-password-confirm')"
                    density="compact"
                    variant="outlined"
                    counter
                    @click:append="show1 = !show1"
                  ></v-text-field>
                  <div style="text-align: end">
                    <v-btn
                      @click="changePassword"
                      :disabled="dialog"
                      :loading="dialog"
                      class="text-white"
                      color="#498374"
                      variant="flat"
                    >
                      {{ $t("user.change-password") }}
                    </v-btn>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-window-item>
          <v-window-item value="option-2">
            <v-card flat>
              <v-card-text>
                <img
                  v-show="!buyingList.length"
                  style="width: 100%"
                  src="https://cdn.dribbble.com/users/9620200/screenshots/17987839/illustration_ui-03_4x.jpg"
                  alt=""
                />
                <div v-show="buyingList.length" class="cart-body">
                  <table>
                    <thead>
                      <tr>
                        <th>{{ $t("account.tab2.view") }}</th>
                        <th>{{ $t("account.tab2.date") }}</th>
                        <th>{{ $t("user.address") }}</th>
                        <th>{{ $t("order.total") }}</th>
                        <th>{{ $t("account.tab2.status") }}</th>
                        <th>{{ $t("action.delete") }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="item in buyingList"
                        :key="item.id"
                        class="cart-item"
                      >
                        <td>
                          <v-icon
                            @click.prevent="
                              orderDetail = item;
                              showFooter = false;
                              showDialog = true;
                            "
                            icon="mdi-eye"
                          ></v-icon>
                        </td>
                        <td>
                          {{ formatDate(item.createdAt) }}
                        </td>
                        <td>{{ item.info.address }}</td>
                        <td>${{ item.total }}</td>
                        <td>
                          {{ item.status }}
                        </td>
                        <td>
                          <v-icon
                            @click.prevent="
                              showFooter = true;
                              showDialog = true;
                            "
                            icon="mdi-delete"
                          ></v-icon>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </v-card-text>
            </v-card>
          </v-window-item>
          <v-window-item value="option-3">
            <v-card flat>
              <v-card-text>
                <img
                  v-show="!historyList.length"
                  style="width: 100%"
                  src="https://cdn.dribbble.com/users/9620200/screenshots/17987839/illustration_ui-03_4x.jpg"
                  alt=""
                />
                <div v-show="historyList.length" class="cart-body">
                  <table>
                    <thead>
                      <tr>
                        <th>{{ $t("account.tab2.view") }}</th>
                        <th>{{ $t("account.tab4.date") }}</th>
                        <th>{{ $t("user.address") }}</th>
                        <th>{{ $t("order.total") }}</th>
                        <th>{{ $t("account.tab2.status") }}</th>
                        <th>{{ $t("action.delete") }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="item in historyList"
                        :key="item.id"
                        class="cart-item"
                      >
                        <td>
                          <v-icon
                            @click.prevent="
                              orderDetail = item;
                              showFooter = false;
                              showDialog = true;
                            "
                            icon="mdi-eye"
                          ></v-icon>
                        </td>
                        <td>
                          {{ formatDate(item.modifiedAt) }}
                        </td>
                        <td>{{ item.info.address }}</td>
                        <td>${{ item.total }}</td>
                        <td>
                          {{ item.status }}
                        </td>
                        <td>
                          <v-icon
                            @click.prevent="
                              showFooter = true;
                              showDialog = true;
                            "
                            icon="mdi-delete"
                          ></v-icon>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </v-card-text>
            </v-card>
          </v-window-item>
          <v-window-item value="option-4">
            <v-card flat>
              <v-card-text>
                <div>
                  <h6>{{ $t("account.tab3.language") }}</h6>
                  <v-select
                    class="mb-4"
                    v-model="lang"
                    hide-details="auto"
                    :label="
                      $t('action.select') + ' ' + $t('account.tab3.language')
                    "
                    :items="langItem"
                    item-text="name"
                    item-value="last"
                    density="compact"
                    variant="solo"
                    return-object
                  ></v-select>
                </div>
                <m-dialog
                  @removeItem="deleteAccount"
                  v-model="showDeleteAccount"
                >
                  <div>
                    <h3>
                      {{ $t("action.delete") }} {{ $t("account.tab1.title") }}
                    </h3>
                    <hr />
                    <p>
                      {{ $t("account.tab3.delete") }}
                    </p>
                  </div>
                </m-dialog>
                <v-button
                  class="mr-4"
                  @click="logout"
                  :label="$t('account.tab3.logout')"
                ></v-button>
                <v-button
                  @click="showDeleteAccount = true"
                  :label="$t('action.delete') + ' ' + $t('account.tab1.title')"
                ></v-button>
              </v-card-text>
            </v-card>
          </v-window-item>
        </v-window>
      </div>
    </v-card>
    <v-dialog v-model="dialog" :scrim="false" persistent width="auto">
      <v-card
        :color="isSuccess ? (dialogText ? 'yellow' : '#498374') : 'primary'"
      >
        <v-card-text v-show="isSuccess">
          {{
            dialogText ? dialogText : $t("action.save") + $t("status.success")
          }}
          <v-icon end icon="mdi-checkbox-marked-circle"></v-icon>
        </v-card-text>

        <v-card-text v-show="!isSuccess">
          {{ $t("loading") }}
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <m-dialog
      @removeItem="deleteOrder"
      :showFooter="!showFooter"
      v-model="showDialog"
    >
      <div v-show="!showFooter">
        <h3>{{ $t("account.tab2.title") }}</h3>
        <hr />
        <ul>
          <li>
            {{ $t("user.fullname") }} :
            {{ orderDetail.info.fullname }}
          </li>
          <li>{{ $t("user.email") }} : {{ orderDetail.info.email }}</li>
          <li>
            {{ $t("user.address") }} :
            {{ orderDetail.info.address }}
          </li>
          <li>
            {{ $t("user.phone-number") }} :
            {{ orderDetail.info.phonenumber }}
          </li>
          <li>{{ $t("order.ship") }} : {{ orderDetail.ship }}</li>
          <li>{{ $t("order.pay") }} : {{ orderDetail.pay }}</li>
          <li>{{ $t("order.price") }} : ${{ orderDetail.total }}</li>
          <li>
            {{ $t("account.tab2.title") }}:
            <ul>
              <li
                @click="itemDetail(item)"
                style="cursor: pointer; color: blue"
                v-for="item in orderDetail.order"
                :key="item.id"
              >
                - {{ item.name }} : {{ item.number }}
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div v-show="showFooter">
        <h3>{{ $t("action.confirm") }} {{ $t("action.delete") }}</h3>
        <hr />
        <p style="margin: 0">
          {{ $t("action.delete") }} {{ $t("account.tab2.title") }}
        </p>
      </div>
    </m-dialog>
  </div>
</template>

<script>
import api from "../../js/api";
import common from "../../js/common";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      /**
       * Ẩn hiện dialog
       */
      dialog: false,
      /**
       * Thông báo thành công
       */
      isSuccess: false,

      /**
       * Danh sách mua hàng
       */
      orderList: null,

      /**
       * Danh sách hàng chưa giao
       */
      buyingList: null,

      /**
       * Danh sách hàng đã giao
       */
      historyList: null,

      /**
       * ẩn hiện thông tin thanh toán
       */
      showDialog: false,

      /**
       * chi tiết đơn hàng
       */
      orderDetail: null,

      /**
       * show footer dialog
       */
      showFooter: false,

      /**
       * hiện dialog xóa tài khoản
       */
      showDeleteAccount: false,

      /**
       * Nội dung dialog
       */
      dialogText: null,

      lang: this.$t("language.en"),
      langItem: [
        {
          title: this.$t("language.en"),
          value: "en",
        },
        {
          title: this.$t("language.vn"),
          value: "vn",
        },
      ],
      get: null,
      isLoading: true,
      tab: "option-1",
      form: {
        username: "",
        fullname: "",
        email: "",
        phonenumber: "",
        address: "",
      },
      password: {
        oldPassword: "",
        newPassword: "",
        cfPassword: "",
      },
      show1: false,
      show2: true,
      rules: {
        required: (value) => !!value || "Required.",
        min: (value) => !value || value.length >= 8 || "Min 8 characters",
        emailMatch: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return !value || pattern.test(value) || "Invalid e-mail.";
        },
        fullNameMatch: (value) => {
          const pattern = /^[\p{Lu}\p{Ll} ]{2,50}$/u;
          return !value || pattern.test(value) || "Invalid name";
        },
        phoneNumberMatch: (value) => {
          const pattern = /^[0-9]{10}$/;
          return !value || pattern.test(value) || "Invalid phone number";
        },
        cfPassword: (value) =>
          this.password.newPassword == value || "Confirm Password failed",
        correctPassword: (value) =>
          this.get.password == value || "Password is incorrect",
      },
    };
  },
  watch: {
    lang() {
      this.$i18n.locale = this.lang.value;
    },
    isSuccess() {
      setTimeout(() => {
        this.dialog = false;
        this.isSuccess = false;
        this.dialogText = "";
      }, 1000);
    },
  },
  methods: {
    /**
     * Cập nhập giở hàng khi đăng xuất, có thì sửa không có thì thêm
     */
    async updateCart() {
      var cartList = JSON.parse(localStorage.getItem("cartList" || "{}"));
      var get = [];
      var cart = null;
      if (cartList) {
        cartList.forEach((element) => {
          get.push({
            id: element.id,
            number: element.number,
          });
        });
        const check = await common.method(
          "get",
          api.getCart() + api.getCartUser(localStorage.getItem("userId"))
        );
        if (check.length) {
          cart = await common.method("put", api.getCart() + `/${check[0].id}`, {
            id: check[0].id,
            userId: check[0].userId,
            info: get,
            createdAt: common.getDate(),
          });
        } else {
          cart = await common.method("post", api.getCart(), {
            id: common.uuidv4(),
            userId: localStorage.getItem("userId"),
            info: get,
            createdAt: common.getDate(),
          });
        }
      }
      if (cart) {
        localStorage.removeItem("cartList");
        this.updateNumerItem(0);
      }
    },

    /**
     * Cập nhập wishlist khi đăng xuất, có thì sửa không có thì thêm
     */
    async updateWishList() {
      var wishList = JSON.parse(localStorage.getItem("wishList" || "{}"));
      var getWish = [];
      var wish = null;

      if (wishList) {
        wishList.forEach((element) => {
          getWish.push({
            id: element.id,
          });
        });
        const check2 = await common.method(
          "get",
          api.getWishlist() + api.getCartUser(localStorage.getItem("userId"))
        );

        if (check2.length) {
          wish = await common.method(
            "put",
            api.getWishlist() + `/${check2[0].id}`,
            {
              id: check2[0].id,
              userId: check2[0].userId,
              info: getWish,
              createdAt: common.getDate(),
            }
          );
        } else {
          wish = await common.method("post", api.getWishlist(), {
            id: common.uuidv4(),
            userId: localStorage.getItem("userId"),
            info: getWish,
            createdAt: common.getDate(),
          });
        }
      }
      if (wish) {
        localStorage.removeItem("wishList");
        this.updateNumberWishList(0);
      }
    },
    ...mapActions([
      "updateSnackbars",
      "updateNumerItem",
      "updateNumberWishList",
      "updateChange",
    ]),
    async logout() {
      this.updateCart();
      this.updateWishList();
      localStorage.removeItem("userId");
      this.updateChange(true);
      this.$router.push("/login");
    },

    async submit() {
      this.dialog = false;
      var check = true;
      for (const f of Object.keys(this.form)) {
        const result = await this.$refs[f].validate(true);
        if (result.length) {
          check = false;
        }
      }
      if (check) {
        const update = await common.method(
          "put",
          api.getUser() + `/${localStorage.getItem("userId")}`,
          {
            id: localStorage.getItem("userId"),
            username: this.get.username,
            email: this.form.email,
            address: this.form.address,
            phonenumber: this.form.phonenumber,
            fullname: this.form.fullname,
            password: this.get.password,
            createdAt: this.get.createdAt,
            modifieddAt: common.getDate(),
          }
        );
        if (update) {
          this.isSuccess = true;
          this.dialog = check;
        }
      }
    },

    async changePassword() {
      var check = true;
      for (const f of Object.keys(this.password)) {
        const result = await this.$refs[f].validate(true);
        if (result.length) {
          check = false;
        }
      }
      if (check) {
        this.get.password = this.password.newPassword;
        this.get.modifieddAt = common.getDate();
        const update = await common.method(
          "put",
          api.getUser() + `/${localStorage.getItem("userId")}`,
          this.get
        );
        if (update) {
          this.isSuccess = true;
          this.dialog = check;
        }
      }
    },

    /**
     * Xem sản phẩm chi tiết
     */
    async itemDetail(item) {
      const get = await common.method(
        "get",
        api.getApi() + api.getBookById(item.id)
      );
      localStorage.setItem("itemDetail", JSON.stringify(get[0]));
      this.$router.push("detail");
    },

    /**
     * Xóa sản phẩm
     */
    async deleteOrder() {
      const check = await common.method(
        "get",
        api.getOrder() + `/${this.orderDetail.id}`
      );
      if (check.status == "pending" || check.status == "accepted") {
        const get = await common.method(
          "delete",
          api.getOrder() + `/${this.orderDetail.id}`
        );
        if (get) {
          this.isSuccess = true;
          this.dialog = true;
        }
        this.orderList = this.orderList.filter(
          (el) => el.id != this.orderDetail.id
        );
      } else {
        this.isSuccess = true;
        this.dialogText = "Orders in progress, cannot be deleted";
        this.dialog = true;
      }
    },

    /**
     * Xóa tài khoản
     */
    async deleteAccount() {
      const get = await common.method(
        "delete",
        api.getUser() + `/${localStorage.getItem("userId")}`
      );
      if (get) {
        localStorage.removeItem("userId");
        localStorage.removeItem("cartList");
        localStorage.removeItem("wishList");
        this.$router.push("login");
      }
    },

    formatDate(date) {
      return common.formatDate(date);
    },
  },
  async created() {
    if (localStorage.getItem("userId")) {
      this.get = await common.method(
        "get",
        api.getUser() + `/${localStorage.getItem("userId")}`
      );
      for (const f of Object.keys(this.form)) {
        this.form[f] = this.get[f];
      }
      this.orderList = await common.method(
        "get",
        api.getOrder() +
          api.getCartUser(this.get.id) +
          api.getSort("modifiedAt", "desc")
      );
      this.historyList = this.orderList.filter(
        (el) => el.status == "delivered"
      );

      this.buyingList = this.orderList.filter((el) => el.status != "delivered");

      this.isLoading = false;
    } else {
      this.updateSnackbars({
        status: true,
        text: "You must login first",
      });
      this.$router.push("/login");
    }
  },
  beforeUnmount() {
    this.updateChange("");
  },
};
</script>

<style scoped>
@import url(./user.css);
.v-window.v-theme--light {
  flex: 1;
}

ul {
  list-style: none;
}
</style>