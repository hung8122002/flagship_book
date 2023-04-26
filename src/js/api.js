const api = {
  getApi() {
    return "http://localhost:3000/book";
  },

  getWishlist() {
    return "http://localhost:3000/wishlist";
  },

  getCategory() {
    return "http://localhost:3000/category";
  },

  getFeedBack() {
    return "http://localhost:3000/feedback";
  },

  getUser() {
    return "http://localhost:3000/user";
  },

  getWarehouse() {
    return "http://localhost:3000/warehouse";
  },

  getByBookId(bookId) {
    return `?bookId=${bookId}`;
  },

  getOrder() {
    return "http://localhost:3000/order";
  },

  getCart() {
    return "http://localhost:3000/cart";
  },

  getCartUser(user) {
    return `?userId=${user}`;
  },

  getUserName(username) {
    return `?username=${username}`;
  },

  getEmail(email) {
    return `?email=${email}`;
  },

  getBook(type, currentPage, limit) {
    return `${this.getApi()}?type_like=${type}&_page=${currentPage}&_limit=${limit}`;
  },

  getBookById(id) {
    return `?id=${id}`;
  },

  getSearchPrice(price) {
    const split = price.split("-");
    return `&price_gte=${split[0]}&price_lte=${split[1]}`;
  },

  getsearchText(text) {
    return `&q=${text}`;
  },

  getSort(type = "", order = "") {
    return `&_sort=${type}&_order=${order}`;
  },
};

export default api;
