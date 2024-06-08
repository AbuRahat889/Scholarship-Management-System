import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Contex/AuthProvaider";
import useAxiosSecure from "./useAxiosSequre";


const UseAdmin = () => {
  const { user } = useContext(AuthContext);
  const axiosSequre = useAxiosSecure();
  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    queryFn: async () => {
      const res = await axiosSequre.get(`/users/admin/${user.email}`);
      // console.log('test admin : : : ', res.data);
      return res.data?.admin;
    },
  });
  return [isAdmin, isAdminLoading];
};

export default UseAdmin;
