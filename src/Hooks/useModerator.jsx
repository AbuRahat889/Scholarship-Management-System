import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Contex/AuthProvaider";
import useAxiosSecure from "./useAxiosSequre";

const useModerator = () => {
  const { user } = useContext(AuthContext);
  const axiosSequre = useAxiosSecure();
  const { data: isModerator, isPending: isModeratorLoading } = useQuery({
    queryKey: [user?.email, "isModerator"],
    queryFn: async () => {
      const res = await axiosSequre.get(`/users/moderator/${user.email}`);
      return res.data?.moderator;
    },
  });
  return [isModerator, isModeratorLoading];
};

export default useModerator;
