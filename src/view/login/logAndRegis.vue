<template>
  <div class="login-container">
    <v-card>
      <v-tabs v-model="tab" fixed-tabs bg-color="#498374">
        <v-tab class="text-white" value="one">Have account</v-tab>
        <v-tab class="text-white" value="two">Don't have account</v-tab>
      </v-tabs>
      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="one">
            <loginForm @login="snackbar = true"></loginForm>
          </v-window-item>
          <v-window-item value="two">
            <registerForm @registerSuccess="showSuccess"></registerForm>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
    <v-snackbar timeout="3000" location="top" v-model="snackbar">
      {{ showSnackbars.text }}
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
import loginForm from "./loginForm.vue";
import registerForm from "./registerForm.vue";
export default {
  name: "v-icon",
  props: ["icon"],
  components: { loginForm, registerForm },
  methods: {
    ...mapActions(["updateSnackbars"]),
    checkShow() {
      if (this.showLogin) {
        this.showLogin = false;
        this.showRegister = true;
      } else {
        this.showLogin = true;
        this.showRegister = false;
      }
    },

    /**
     * Hiện ra thông báo đăng kí thành công
     */
    showSuccess() {
      this.tab = "one";
      this.snackbar = true;
    },
  },
  computed: {
    ...mapGetters(["showSnackbars"]),
  },
  data() {
    return {
      snackbar: false,
      showLogin: true,
      showRegister: false,
      tab: null,
    };
  },
  created() {
    this.snackbar = this.showSnackbars.status;
    if (localStorage.getItem("userId")) {
      this.$router.push("/user");
    }
  },
  beforeUnmount() {
    this.updateSnackbars({
      status: false,
    });
  },
};
</script>
<style scoped>
.login-container {
  margin-top: 140px;
  padding: 20px 400px;
}

@media only screen and (max-width: 740px) {
  .login-container {
    margin-top: 70px;
    padding: 20px;
  }
}
</style>