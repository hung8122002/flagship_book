const api = {
  getApi() {
    return "http://api-five-lemon.vercel.app/book";
  },

  getWishlist() {
    return "http://api-five-lemon.vercel.app/wishlist";
  },

  getCategory() {
    return "http://api-five-lemon.vercel.app/category";
  },

  getFeedBack() {
    return "http://api-five-lemon.vercel.app/feedback";
  },

  getUser() {
    return "http://api-five-lemon.vercel.app/user";
  },

  getWarehouse() {
    return "http://api-five-lemon.vercel.app/warehouse";
  },

  getByBookId(bookId) {
    return `?bookId=${bookId}`;
  },

  getOrder() {
    return "http://api-five-lemon.vercel.app/order";
  },

  getCart() {
    return "http://api-five-lemon.vercel.app/cart";
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
