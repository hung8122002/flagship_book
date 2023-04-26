const state = {
  numberItem: JSON.parse(localStorage.getItem("cartList" || "[]"))
    ? JSON.parse(localStorage.getItem("cartList" || "[]")).length
    : 0,
  numberWishList: JSON.parse(localStorage.getItem("wishList" || "[]"))
    ? JSON.parse(localStorage.getItem("wishList" || "[]")).length
    : 0,
  toast: {
    action: "",
    status: "",
    component: "",
    error: "",
    number: "",
  },
  isChange: "",
  showSnackbars: {
    status: false,
    text: "",
  },
};
export default state;
