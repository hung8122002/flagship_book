import { createApp } from "vue";
import App from "./App.vue";
import vButton from "./components/button/vButton.vue";
import vInput from "./components/input/vInput.vue";
import mIcon from "./components/icon/mIcon.vue";
import vCarousel from "./components/carousel/vCarousel.vue";
import vCarouselMulti from "./components/carousel/vCarouselMulti.vue";
import vToast from "./components/toast/vToast.vue";
import vItem from "./components/item/vItem.vue";
import vQuantityInput from "./components/quantityInput/vQuantityInput.vue";
import vToastList from "./components/toast/vToastList.vue";
import vCombobox from "./components/combobox/vCombobox.vue";
import mDialog from "./components/dialog/mDialog.vue";
import vHeader from "./view/layout/TheHeader.vue";
import vFooter from "./view/layout/TheFooter.vue";
import vWishList from "./view/wishList/vWishList.vue";
import router from "./router";
import i18n from "./language/i18n";
import VueI18n from "vue-i18n";
import bootstrap from "bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import resource from "./js/resource";
import { createStore } from "vuex";
import main from "./store/main";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

const store = createStore(main);
const app = createApp(App);
app.use(store);
app.use(router);
app.use(bootstrap);
app.use(vuetify);
app.use(i18n);
app.use(VueI18n)
app.component("vButton", vButton);
app.component("vInput", vInput);
app.component("mIcon", mIcon);
app.component("vHeader", vHeader);
app.component("vFooter", vFooter);
app.component("vCarousel", vCarousel);
app.component("vCarouselMulti", vCarouselMulti);
app.component("vItem", vItem);
app.component("mDialog", mDialog);
app.component("vQuantityInput", vQuantityInput);
app.component("vWishList", vWishList);
app.component("vToastList", vToastList);
app.component("vToast", vToast);
app.component("vCombobox", vCombobox);
app.config.globalProperties.axios = axios;
app.config.globalProperties.resource = resource;
app.mount("#app");
