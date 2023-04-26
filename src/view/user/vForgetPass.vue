<template>
  <div class="forget">
    <v-snackbar timeout="3000" location="top" v-model="snackbar">
      Check your email to reset your password
      <template v-slot:actions>
        <v-btn color="#498374" variant="text" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <h5>Change password</h5>
    <div v-show="get">
      <v-text-field
        ref="newPassword"
        v-model="password.newPassword"
        :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="New password"
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
        label="Confirm password"
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
          Change password
        </v-btn>
      </div>
    </div>
    <div v-show="!get">
      <v-text-field
        ref="email"
        v-model="email"
        :rules="[rules.emailMatch, rules.existEmail]"
        name="input-10-1"
        label="Email"
        density="compact"
        variant="outlined"
        counter
        @click:append="show1 = !show1"
      ></v-text-field>
      <div style="text-align: end">
        <v-btn
          @click="sendEmail"
          :disabled="dialog"
          :loading="dialog"
          class="text-white"
          color="#498374"
          variant="flat"
        >
          Send mail
        </v-btn>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { mapActions } from "vuex";
import api from "../../js/api";
import common from "../../js/common";
export default {
  data() {
    return {
      snackbar: false,
      email: null,
      get: null,
      show1: false,
      dialog: false,
      password: {
        newPassword: "",
        cfPassword: "",
      },
      /**
       * kiểm tra username đã tồn tại chưa
       */
      existEmail: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (value) => !value || value.length >= 8 || "Min 8 characters",
        cfPassword: (value) =>
          this.password.newPassword == value || "Confirm Password failed",
        emailMatch: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
        existEmail: () => !this.existEmail || "Email is not exist",
      },
    };
  },
  methods: {
    ...mapActions(["updateSnackbars"]),
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
          api.getUser() + `/${this.$route.params.id}`,
          this.get
        );
        if (update) {
          this.updateSnackbars({
            status: true,
            text: "Change password successfully, now you can login",
          });
          this.$router.push("/login");
        }
      }
    },

    async sendEmail() {
      const result = await this.$refs.email.validate(true);
      if (!result.length) {
        const getEmail = await common.method(
          "get",
          api.getUser() + api.getEmail(this.email)
        );
        if (getEmail.length) {
          const check = common.sendMail({
            action: "Reset your password",
            link: `http://localhost:8080/forget/${getEmail[0].id}`,
            email_to: this.email,
          });
          if (check) {
            this.snackbar = true;
          }
        } else {
          this.existEmail = true;
          this.$refs.email.validate(true);
        }
      }
    },
  },
  async created() {
    if (localStorage.getItem("userId")) {
      this.$router.push("/user");
      return;
    }
    if (this.$route.params.id) {
      this.get = await common.method(
        "get",
        api.getUser() + `/${this.$route.params.id}`
      );
    }
  },
};
</script>
  
  <style scoped>
.forget {
  margin-top: 130px;
  padding: 30px 400px;
}

@media only screen and (max-width: 740px) {
  .forget {
    margin-top: 70px;
    padding: 30px;
  }
}
</style>