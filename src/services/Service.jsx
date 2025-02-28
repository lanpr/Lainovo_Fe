import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
});
instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    const accessToken = sessionStorage.getItem("accessToken");

    if (token || accessToken) {
      config.headers.Authorization = `bearer ${token ? token : accessToken}`;
    }
    config.headers["Content-Type"] = "application/json";

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = sessionStorage.getItem("refreshToken");
      const res = await axios.post("http://localhost:8080/api/v1/customers/refreshtoken", {
        refreshToken,
      });
      if (res.status === 201) {
        // Lưu accessToken mới vào sessionStorage
        sessionStorage.setItem("accessToken", res.data.accessToken);
        // Cập nhật Authorization header
        originalRequest.headers.Authorization = `bearer ${res.data.accessToken}`;
        // Gửi lại yêu cầu gốc với accessToken mới
        return instance(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);
export default instance;

const fetchAllPublications = () => {
  return instance.get("/api/v1/publications/all");
};
const fetchAllProduct = () => {
  return instance.get("/api/products");
};
const fetchProductById = (productId) => {
  return instance.get(`/api/v1/publications/${productId}`);
};
const fetchCart = () => {
  return instance.get("/api/cart");
};
const fetchAddToCart = () => {
  return instance.post("/api/cart");
};
const fetchCartById = (orderItem) => {
  return instance.get(`/api/cart/${orderItem}`);
};

const fetchUpdateCart = (orderId, order) => {
  return instance.put(`/api/cart/${orderId}`, order);
};
const fetchDeleteCart = (orderId, order) => {
  return instance.delete(`/api/cart/${orderId}`, order);
};

const loginApi = (data) => {
  return instance.post("/api/v1/auth/login", data);
};
const logoutApi = () => {
  return instance.patch("/api/v1/auth/logout");
};
const registerApi = (data) => {
  return instance.post("/api/v1/auth/register", data);
};
const verifyOtp = (data) => {
  return instance.post("/api/v1/auth/verify", data);
};
const forgotPasswordApi = (email) => {
  return instance.post("/api/v1/customer/forgotPassword", email);
};
const verifyResetPasswordCode = (code) => {
  console.log(typeof code);
  return instance.post(
    "/api/v1/customer/passwordResetCode",
    {},
    {
      params: { code: code },
    }
  );
};
const newPasswordApi = (data) => {
  return instance.post("/api/v1/customer/passwordResetNewPassword", data);
};
const fetchPublicationContentPagingate = (page, genreId) => {
  const params = {
    page: page,
  };
  if (genreId) {
    params.genreId = genreId;
  }
  return instance.get("/api/v1/publications/pagination", { params });
};
const fetchNewPublications = () => {
  return instance.get("/api/v1/publications/new-arrivals");
};
const fetchHotPublications = () => {
  return instance.get("/api/v1/publications/best-sellers");
};
const fetchAllGenre = () => {
  return instance.get("/api/v1/genre/all");
};
const fetchPublictionsFromGenre = (genreID) => {
  return instance.get(`/api/v1/genre/${genreID}`);
};
const fetchPublicationsDetailsInformation = (id) => {
  return instance.get(`/api/v1/publications/id/${id}`);
};
const fetchPublicationsBySearch = (name) => {
  return instance.get(`api/v1/publications/search/${name}`);
};
const loginAdmin = (data) => {
  return instance.post("/api/v1/admin/login", data);
};

const fetchUpdateAddress = (address, phoneNumber) => {
  return instance.put("/api/v1/customer/address", {
    address,
    phoneNumber,
  });
};

const fetchCreateAddress = (address, phoneNumber) => {
  return instance.post("/api/v1/customer/address", {
    address,
    phoneNumber,
  });
};

const fetchUserInfo = () => {
  return instance.get("/api/v1/customer/info");
};

const fetchUserAddress = () => {
  return instance.get("/api/v1/customer/address");
};

const fetchChangePassword = (password, newPassword, confirmPassword) => {
  return instance.patch("/api/v1/customer/change-password", {
    password,
    newPassword,
    confirmPassword,
  });
};
const fetchPublicationsByAuthor = (authorName) => {
  return instance.get("/api/v1/publications/author/name", {
    params: {
      author: authorName,
    },
  });
};

const fetchHistory = (customerId) => {
  return instance.get(`/api/v1/order/getOrder/${customerId}`);
};

const createOrder = () => {
  return instance.post();
};

const logoutAdmin = () => {
  return instance.patch("/api/v1/admin/logout");
};
const fetchAllEmployees = () => {
  return instance.get("/api/v1/employee/all");
};

const fetchEmployeesWithAccountName = (accountName) => {
  return instance.get(`/api/v1/employee/search/${accountName}`);
};

const fetchCreateEmployees = (employeeData) => {
  return instance.post("/api/v1/employee/create", employeeData);
};

const fetchUpdateEmployees = (employee) => {
  return instance.put(
    `/api/v1/employee/update/${employee.accountName}`,
    employee
  );
};

const fetchDeleteEmployees = (accountName) => {
  return instance.delete(`/api/v1/employee/delete/${accountName}`);
};

const fetchAllCustomers = () => {
  return instance.get("/api/v1/customer/all");
};

const fetchUpdateStatusCustomers = (customer) => {
  return instance.put(
    `/api/v1/customer/updateStatusCustomer/${customer.customerId}`,
    customer
  );
};

const fetchCustomersWithCustomerId = (customerId) => {
  return instance.get(`/api/v1/customer/search/${customerId}`);
};

const fetchCustomersWithEmail = (email) => {
  return instance.get(`/api/v1/customer/search/${email}`);
};

export {
  loginAdmin,
  fetchPublicationsBySearch,
  verifyResetPasswordCode,
  fetchPublictionsFromGenre,
  fetchPublicationsDetailsInformation,
  fetchAllGenre,
  fetchHotPublications,
  fetchNewPublications,
  fetchAllPublications,
  fetchPublicationContentPagingate,
  fetchPublicationsByAuthor,
  fetchAllProduct,
  fetchProductById,
  fetchCart,
  fetchCartById,
  fetchAddToCart,
  fetchUpdateCart,
  fetchDeleteCart,
  loginApi,
  registerApi,
  verifyOtp,
  forgotPasswordApi,
  newPasswordApi,
  fetchUpdateAddress,
  fetchCreateAddress,
  fetchUserInfo,
  fetchUserAddress,
  fetchChangePassword,
  fetchHistory,
  logoutApi,
  logoutAdmin,
  fetchAllEmployees,
  fetchEmployeesWithAccountName,
  fetchCreateEmployees,
  fetchUpdateEmployees,
  fetchDeleteEmployees,
  fetchAllCustomers,
  fetchUpdateStatusCustomers,
  fetchCustomersWithCustomerId,
  fetchCustomersWithEmail,
};
