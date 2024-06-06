import { useQuery } from "@tanstack/react-query";
import ManageScholarship from "../../../Components/ManageScholarships/ManageScholarship";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const ManageScholarships = () => {
  const axiosPublic = useAxiosPublic();

  const { refetch, data: scholarship = [] } = useQuery({
    queryKey: ["scholarship"],
    queryFn: async () => {
      const res = await axiosPublic.get("/scholarship");
      return res.data;
    },
  });
  return (
    <div className="mt-10">
      <ManageScholarship
        refetch={refetch}
        scholarship={scholarship}
      ></ManageScholarship>
    </div>
  );
};

export default ManageScholarships;
