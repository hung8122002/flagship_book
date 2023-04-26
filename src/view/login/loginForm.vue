<template>
  <div>
    <p>Login</p>
    <v-text-field
      class="mb-1"
      ref="username"
      @input="existUser = true"
      v-model="form.username"
      density="compact"
      :rules="[rules.required, rules.min, rules.existUser]"
      label="Username"
      variant="outlined"
      counter
    ></v-text-field>
    <v-text-field
      @input="existPassword = true"
      ref="password"
      v-model="form.password"
      :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required, rules.min, rules.existPassword]"
      :type="show1 ? 'text' : 'password'"
      name="input-10-1"
      label="Password"
      density="compact"
      variant="outlined"
      counter
      @click:append-inner="show1 = !show1"
    ></v-text-field>
    <router-link to="forget">Forget password ?</router-link>
    <div style="text-align: end">
      <v-button
        @click="submit"
        style="background-color: #498374"
        label="Login"
      ></v-button>
    </div>
  </div>
</template>
<script>
import api from "../../js/api";
import common from "../../js/common";
import { mapActions } from "vuex";
export default {
  name: "loginFrom",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      existUser: true,
      existPassword: true,
      show1: false,
      show2: true,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        existUser: () => this.existUser || "Username is not exist",
        existPassword: () => this.existPassword || "Password is not correct",
      },
    };
  },
  beforeUnmount() {
    this.updateChange("");
  },
  methods: {
    ...mapActions([
      "updateSnackbars",
      "updateChange",
      "updateNumerItem",
      "updateNumberWishList",
    ]),
    registerShow() {
      this.$emit("registerShow");
    },

    async getDateUser() {
      const cartList = await common.method(
        "get",
        api.getCart() + api.getCartUser(localStorage.getItem("userId"))
      );
      const list = [];
      if (cartList.length) {
        for (let index = 0; index < cartList[0].info.length; index++) {
          const element = cartList[0].info[index];
          const item = await common.method(
            "get",
            api.getApi() + api.getBookById(element.id)
          );
          item[0].number = element.number;
          list.push(item[0]);
        }
        localStorage.setItem("cartList", JSON.stringify(list));
        this.updateNumerItem(list.length);
      }

      const wishList = await common.method(
        "get",
        api.getCart() + api.getCartUser(localStorage.getItem("userId"))
      );
      const list2 = [];
      if (wishList.length) {
        for (let index = 0; index < wishList[0].info.length; index++) {
          const element = wishList[0].info[index];
          const item = await common.method(
            "get",
            api.getApi() + api.getBookById(element.id)
          );
          list2.push(item[0]);
        }
        localStorage.setItem("wishList", JSON.stringify(list2));
        this.updateNumberWishList(list2.length);
      }
    },

    /**
     * Đăng nhập
     */
    async submit() {
      var check = true;
      for (const f of Object.keys(this.form)) {
        const result = await this.$refs[f].validate(true);
        if (result.length) {
          check = false;
        }
      }
      if (check) {
        const get = common.method(
          "get",
          api.getUser() + api.getUserName(this.form.username)
        );
        get.then((result) => {
          if (result.length) {
            if (result[0].status == "verified") {
              if (this.form.password == result[0].password) {
                localStorage.setItem("userId", result[0].id);
                this.updateChange(true);
                this.getDateUser();
                this.$router.push("/");
              } else {
                this.$refs.password.validate(true);
                this.existPassword = false;
              }
            }
            if (result[0].status == "pending") {
              console.log("abc");
              this.updateSnackbars({
                status: true,
                text: "Verify your account first",
              });
              this.$emit("login");
            }
          } else {
            this.$refs.username.validate(true);
            this.existUser = false;
          }
        });
      }
    },
  },
};
</script>
<style scoped>
p {
  font-size: 26px;
  color: #252525;
  margin-bottom: 20px;
  font-weight: bold;
}
</style>