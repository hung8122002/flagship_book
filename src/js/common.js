import axios from "axios";
import emailjs from "@emailjs/browser";
const common = {
  /**
   * Lấy dữ liệu từ api
   * @param method Phương thức
   * @param api url api
   * @returns
   */
  async method(method, api, data = "") {
    try {
      const response = await axios[method](api, data);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        // Xử lý lỗi tại đây
        return null;
      }
    } catch (error) {
      return null;
    }
  },

  /**
   * Lấy tổng số bản ghi
   * @param method Phương thức
   * @param api url api
   * @returns
   */
  async getTotalPage(method, api) {
    try {
      const response = await axios[method](api);
      return response.headers.get("X-Total-Count");
    } catch (error) {
      console.error(error);
    }
  },

  /**
   * Tính toán khoảng trang
   * @param currentPage trang hiện tại
   * @param totalPage Tổng số trang
   * @returns
   */
  rangePage(currentPage, totalPage) {
    var rangePage = [];
    var startPage = currentPage - 2;
    var endPage = currentPage + 2;
    if (startPage < 1) {
      (startPage = 1), (endPage = 5);
    }
    if (endPage > totalPage) {
      endPage = totalPage;
    }
    if (totalPage > 5 && startPage > totalPage - 4) {
      startPage = totalPage - 4;
    }
    for (var i = startPage; i <= endPage; i++) {
      rangePage.push(i);
    }
    return rangePage;
  },

  /**
   * Kiểm tra tính hợp lệ của chuỗi
   * @param type chuỗi cần kiểm tra
   * @param text tên chuỗi đó
   * @returns
   */
  checkText(type, text) {
    if (!type || type.trim().length === 0) {
      return `${text} is null or empty`;
    }
    if (type.length < 6 || type.length > 20) {
      return `${text} must must be between 6-20 characterss`;
    }
  },

  /**
   * Kiểm ta định dạng email
   * @param {*} email : email
   * @returns
   */
  checkEmail(email) {
    if (!email || email.trim().length === 0) {
      return "Email is null or empty";
    }
    var emailRegex = /^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!emailRegex.test(email)) {
      return "Email is not valid";
    }
  },

  /**
   * Tạo guid
   * @returns
   */
  uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  },

  /**
   * Lấy thời gian thực
   */
  getDate() {
    return new Date().toISOString();
  },

  formatDate(isoDate) {
    const dateObj = new Date(isoDate);
    const day = dateObj.getDate().toString().padStart(2, "0");
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObj.getFullYear().toString();
    return `${day}/${month}/${year}`;
  },

  async sendMail(data) {
    try {
      const response = await emailjs.send(
        "service_loc3unt",
        "template_1rk04cj",
        data,
        "OGelSTdsy78-xbkJy"
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
};

export default common;
