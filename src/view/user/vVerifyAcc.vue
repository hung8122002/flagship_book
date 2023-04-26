<template>
  <div></div>
</template>

<script>
import { mapActions } from "vuex";
import api from "../../js/api";
import common from "../../js/common";
export default {
  methods: {
    ...mapActions(["updateSnackbars"]),
  },
  async created() {
    if (localStorage.getItem("userId")) {
      this.$router.push("/user");
      return;
    }
    const get = await common.method(
      "get",
      api.getUser() + `/${this.$route.params.id}`
    );
    if (get) {
      get.status = "verified";
      const verify = await common.method(
        "put",
        api.getUser() + `/${this.$route.params.id}`,
        get
      );
      if (verify) {
        this.updateSnackbars({
          status: true,
          text: "Verified successfully, now you can login",
        });
      }
    }
    this.$router.push("/login");
  },
};
</script>

<style>
</style>