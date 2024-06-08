import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://scholarship-management-system-server.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
