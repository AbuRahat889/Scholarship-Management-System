import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllScholarship = () => {
  const axiosPublic = useAxiosPublic();

  const { data: scholarship = [] } = useQuery({
    queryKey: ["scholarship"],
    queryFn: async () => {
      const res = await axiosPublic.get("/scholarship");
      return res.data;
    },
  });

  //   console.log(scholarship.length);
  return scholarship;
};

export default useAllScholarship;
