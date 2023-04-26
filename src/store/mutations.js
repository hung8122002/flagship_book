const mutations = {
  setNumberItem(state, numberItem) {
    state.numberItem = numberItem;
  },
  setNumberWishList(state, numberWishList) {
    state.numberWishList = numberWishList;
  },
  setToast(state, toast) {
    state.toast.action = toast.action;
    state.toast.status = toast.status;
    state.toast.component = toast.component;
    if (toast.error) {
      state.toast.error = toast.error;
    } else {
      state.toast.error = "";
    }
    if (toast.number) {
      state.toast.number = toast.number;
    } else {
      state.toast.number = "";
    }
  },
  setChange(state, isChange) {
    state.isChange = isChange;
  },
  setSnackbars(state, snackbars) {
    state.showSnackbars.status = snackbars.status;
    state.showSnackbars.text = snackbars.text || "";
  },
};
export default mutations;
