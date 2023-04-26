<template>
  <div>
    <p style="text-align: start">Register</p>
    <v-text-field
      @input="existUsername = false"
      class="mb-1"
      ref="username"
      v-model="form.username"
      counter
      density="compact"
      :rules="[rules.required, rules.min, rules.existUsername]"
      label="Username"
      variant="outlined"
    ></v-text-field>
    <v-text-field
      @input="existEmail = false"
      class="mb-1"
      ref="email"
      v-model="form.email"
      counter
      density="compact"
      :rules="[rules.required, rules.min, rules.emailMatch, rules.existEmail]"
      label="Email"
      variant="outlined"
    ></v-text-field>
    <v-text-field
      class="mb-1"
      ref="password"
      v-model="form.password"
      counter
      :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required, rules.min]"
      :type="show1 ? 'text' : 'password'"
      name="input-10-1"
      label="Password"
      density="compact"
      variant="outlined"
      @click:append-inner="show1 = !show1"
    ></v-text-field>
    <v-text-field
      ref="cfPassword"
      v-model="form.cfPassword"
      counter
      :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required, rules.min, rules.cfPassword]"
      :type="show2 ? 'text' : 'password'"
      name="input-10-1"
      label="Confirm Password"
      density="compact"
      variant="outlined"
      @click:append-inner="show2 = !show2"
    ></v-text-field>
    <div style="text-align: end">
      <v-btn
        @click="submit"
        :disabled="loading"
        :loading="loading"
        class="text-white"
        color="#498374"
        variant="flat"
      >
        Register
      </v-btn>
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
      error: [],
      form: {
        username: "",
        email: "",
        password: "",
        cfPassword: "",
      },
      show1: false,
      show2: true,

      /**
       * loading button
       */
      loading: false,

      /**
       * kiểm tra username đã tồn tại chưa
       */
      existUsername: false,

      /**
       * kiểm tra username đã tồn tại chưa
       */
      existEmail: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (value) => value.length >= 8 || "Min 8 characters",
        emailMatch: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
        cfPassword: (value) =>
          value == this.form.password || "Confirm Password failed",
        existUsername: () => !this.existUsername || "Username already in use",
        existEmail: () => !this.existEmail || "Email already in use",
      },
    };
  },
  methods: {
    ...mapActions(["updateSnackbars"]),
    registerShow() {
      this.$emit("registerShow");
    },

    /**
     * Đăng kí
     */
    async submit() {
      var valid = true;
      var check = true;
      for (const f of Object.keys(this.form)) {
        const result = await this.$refs[f].validate(true);
        if (result.length) {
          check = false;
        }
      }
      if (check) {
        this.loading = true;
        const getUsername = await common.method(
          "get",
          api.getUser() + api.getUserName(this.form.username)
        );
        const getEmail = await common.method(
          "get",
          api.getUser() + api.getEmail(this.form.email)
        );
        this.loading = false;
        if (getUsername.length) {
          valid = false;
          this.existUsername = true;
          this.$refs.username.validate(true);
        }
        if (getEmail.length) {
          valid = false;
          this.existEmail = true;
          this.$refs.email.validate(true);
        }
        const id = common.uuidv4();
        if (valid) {
          const addUsername = await common.method("post", api.getUser(), {
            id,
            username: this.form.username,
            email: this.form.email,
            password: this.form.password,
            status: "pending",
            createdAt: common.getDate(),
          });
          if (addUsername) {
            common.sendMail({
              action: "verify your account",
              link: `http://localhost:8080/verify/${id}`,
              email_to: this.form.email,
            });
            this.updateSnackbars({
              status: true,
              text: "Check your email to verify account",
            });
            this.$emit("registerSuccess");
          }
        }
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