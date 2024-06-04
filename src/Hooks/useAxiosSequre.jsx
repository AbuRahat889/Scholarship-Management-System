import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Contex/AuthProvaider";

const axiosSequre = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext);

  //interceptors request
  axiosSequre.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  //interceptors response
  axiosSequre.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response.status;
      
      if (status == 401 || status == 403) {
        await logOut();
        navigate("/signin");
      }
      return Promise.reject(error);
    }
  );
  return axiosSequre;
};

export default useAxiosSecure;
