import { createRouter, createWebHistory } from "vue-router";
import vHome from "../view/home/vHome.vue";
import vAbout from "../view/about/vAbout.vue";
import vProduct from "../view/product/vProduct.vue";
import vContact from "../view/contact/vContact.vue";
import vCart from "../view/cart/vCart.vue";
import vBuyNow from "../view/cart/vBuyNow.vue";
import vLogin from "../view/login/logAndRegis.vue";
import vDetail from "../view/detail/vDetail.vue";
import vUser from "../view/user/vUser.vue";
import vVerifyAcc from "../view/user/vVerifyAcc.vue";
import vForgetPass from "../view/user/vForgetPass.vue";
import vError from "../view/error/vError.vue";

const routes = [
  { path: "/", component: vHome },
  { path: "/about", component: vAbout },
  { path: "/product/:text?", component: vProduct },
  { path: "/contact", component: vContact },
  { path: "/cart", component: vCart },
  { path: "/buy-now", component: vBuyNow },
  { path: "/login", component: vLogin },
  { path: "/detail/:id", component: vDetail },
  { path: "/user", component: vUser },
  { path: "/verify/:id", component: vVerifyAcc },
  { path: "/forget/:id?", component: vForgetPass },
  { path: "/:pathMatch(.*)*", component: vError },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
