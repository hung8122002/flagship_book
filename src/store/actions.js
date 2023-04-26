const actions = {
  updateNumerItem(context, value) {
    context.commit("setNumberItem", value);
  },
  updateNumberWishList(context, value) {
    context.commit("setNumberWishList", value);
  },
  updateToast(context, value) {
    context.commit("setToast", value);
  },
  updateChange(context, value) {
    context.commit("setChange", value);
  },
  updateSnackbars(context, value) {
    context.commit("setSnackbars", value);
  },
};
export default actions;
