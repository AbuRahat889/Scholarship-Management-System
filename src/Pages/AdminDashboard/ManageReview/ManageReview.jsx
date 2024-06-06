import { useQuery } from "@tanstack/react-query";
import ReviewCard from "../../../Components/Card/ReviewCard";
import useAxiosSecure from "../../../Hooks/useAxiosSequre";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const ManageReview = () => {
  const axiosSequre = useAxiosSecure();
  const { refetch, data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSequre.get("/reviews");
      return res.data;
    },
  });
  return (
    //
    <div className="mt-14">
      <SectionTitle
      subtitle={'reviews'}
      titel={'All Reviews'}
      ></SectionTitle>
       <div className="divider px-44"></div>
      <div className="grid grid-cols-3 gap-4 mt-5 p-10">
        {reviews.map((item) => (
          <ReviewCard key={item._id} item={item} refetch={refetch}></ReviewCard>
        ))}
      </div>
    </div>
  );
};

export default ManageReview;
