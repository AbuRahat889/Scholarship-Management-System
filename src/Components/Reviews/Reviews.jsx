import { Swiper, SwiperSlide } from "swiper/react";
import { FaQuoteLeft } from "react-icons/fa";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Reviews = () => {
  const axiosPublic = useAxiosPublic();
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = axiosPublic.get(`/reviews`);
      return (await res).data;
    },
  });
  //   const {
  //     Rating_point,
  //     Review_comment,
  //     Review_date,
  //     University_name,
  //     University_id,
  //     Reviewer_name,
  //     Reviewer_image,
  //     Reviewer_email,
  //   } = item || {};
  return (
    <div className="my-20  max-w-screen-xl mx-auto">
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper px-10"
        loop={true}
      >
        {reviews.map((item) => (
          <SwiperSlide key={item._id}>
            <div className="px-32 flex flex-col justify-center items-center mt-10 ">
              <div>
                <div className="avatar items-center">
                  <div className="w-12 rounded-full mr-2">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                  <h1 className="text-xl font-semibold">
                    {item.Reviewer_name} <br />
                    <span className="text-lg">{item.University_name}</span>
                  </h1>
                </div>
              </div>
              <Rating
                className="my-4"
                style={{ maxWidth: 180 }}
                value={item.Rating_point}
                readOnly
              />
              <p className="text-xl text-center text-balance">
                {item.Review_comment}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
