<template>
  <div class="contact">
    <div class="contact-left">
      <div class="address">
        <p>Contact us</p>
        <div>
          <m-icon icon="fa-solid fa-location-dot fa-lg"></m-icon>
          <p>Address: Unit 302, 23C Tong Dan, Hoan Kiem, Hanoi</p>
        </div>
        <div>
          <m-icon icon="fa-regular fa-clock fa-lg"></m-icon>
          <p>Opening time: 1:30pm - 6pm (Mon - Fri)</p>
        </div>
        <div>
          <m-icon icon="fa-solid fa-mobile-screen fa-lg"></m-icon>
          <p>1234567890</p>
        </div>
        <div>
          <m-icon icon="fa-regular fa-envelope fa-lg"></m-icon>
          <p>tiemsachgacxep@gmail.com</p>
        </div>
      </div>
      <div class="feedback">
        <p>FeedBack</p>
        <v-text-field
          label="Full name"
          variant="outlined"
          density="compact"
          ref="fullname"
          v-model="fullname"
          :rules="[rules.required]"
        ></v-text-field>
        <v-textarea
          label="Message"
          variant="outlined"
          density="compact"
          ref="message"
          v-model="message"
          :rules="[rules.required]"
        ></v-textarea>
      </div>
      <v-btn
        @click="submit"
        :loading="loading"
        class="text-white text-none mb-4"
        color="#498374"
        variant="flat"
      >
        Send now
      </v-btn>
    </div>
    <div class="contact-right">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.0589339994526!2d105.77890581000102!3d21.030327780538624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b355bba1b9%3A0x7a97292385188130!2zMTkgUC4gRHV5IFTDom4sIEThu4tjaCBW4buNbmcgSOG6rXUsIEPhuqd1IEdp4bqleSwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1681274929358!5m2!1svi!2s"
        style="border: 0"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
    <v-snackbar location="top" v-model="snackbar" timeout="2000">
      Send successfully
      <template v-slot:actions>
        <v-btn color="blue" variant="text" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import api from "../../js/api";
import common from "../../js/common";
export default {
  data() {
    return {
      loading: false,
      snackbar: false,
      fullname: "",
      message: "",
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },

  methods: {
    async submit() {
      const fullname = await this.$refs.fullname.validate(true);
      const message = await this.$refs.message.validate(true);
      if (!fullname.length && !message.length) {
        this.loading = true;
        const update = common.method("post", api.getFeedBack(), {
          id: common.uuidv4(),
          fullname: this.fullname,
          message: this.message,
          createdAt: common.getDate()
        });
        if (update) {
          this.loading = false;
          this.snackbar = true;
        }
      }
    },
  },
};
</script>

<style scoped>
@import url(./contact.css);
</style>