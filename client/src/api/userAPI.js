import axiosClient from "./axiosClient";

const userAPI = {
  login: (userInfo) => {
    const url = "/user-login";

    return axiosClient.post(url, userInfo);
  },
  register: userInfo => {
    const url = "/user-signup";

    return axiosClient.post(url, userInfo);
  },
  checkUser: (email) => {
    const url = `user/${email}`;

    return axiosClient.get(url);
  },
  getUsers: () => {
    const url = 'user';

    return axiosClient.get(url);
  },
  getAllUsers: () => {
    const url = 'alluser';

    return axiosClient.get(url);
  },
  getUserWithId: (id) => {
    const url = `user/index/${id}`;

    return axiosClient.get(url);
  },
  getUserBaseOnId: (id) => {
    const url = `user/detail/${id}`;

    return axiosClient.get(url);
  },
  createUser: newUser => {
    const url = `/user`;

    return axiosClient.post(url, newUser);
  },
  updateUser: userDetail => {
    const url = `/user/update/${userDetail.id}`;

    return axiosClient.put(url, userDetail);
  },
  deleteUser: id => {
    const url = `/user/delete/${id}`;

    return axiosClient.delete(url);
  },
};

export default userAPI;