import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "test/all");
  }

  getAllBooks() {
    return axios.get(API_URL + "books");
  }

  getBook(id) {
    return axios.get(API_URL + `books/${id}`);
  }

  getAvailableBooks() {
    return axios.get(API_URL + "books?isIssue=false", {
      headers: authHeader(),
    });
  }

  getReturnBooks() {
    return axios.get(API_URL + "books?isIssue=true");
  }

  getUserReturnBooks(id) {
    return axios.get(API_URL + `books/user/Books/${id}`);
  }

  updateBook(id, data) {
    return axios.put(API_URL + `books/${id}`, data);
  }

  issueBook(id, data) {
    return axios.put(API_URL + `books/issue/${id}`, data);
  }

  returnBook(id, data) {
    return axios.put(API_URL + `books/return/${id}`, data);
  }

  getAdminBoard() {
    return axios.get(API_URL + "test/admin", { headers: authHeader() });
  }

  createBook(data) {
    return axios.post(API_URL + "books", data);
  }

  deleteBook(id) {
    return axios.delete(API_URL + `books/${id}`);
  }

  getUserBooks() {
    return axios.get(API_URL + "books/users/Books");
  }

  getUsers() {
    return axios.get(API_URL + "users");
  }

  getUser(id) {
    return axios.get(API_URL + `user/${id}`);
  }
}

export default new UserService();
