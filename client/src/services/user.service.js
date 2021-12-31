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

  issueBook(id, data) {
    return axios.put(API_URL + `books/${id}`, data);
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
}

export default new UserService();
