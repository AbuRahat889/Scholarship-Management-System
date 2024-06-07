import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Contex/AuthProvaider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSequre";
import Swal from "sweetalert2";

const AddReviews = () => {
  const { register, handleSubmit, reset } = useForm();
  const [startDate, setStartDate] = useState(new Date());
  const loader = useLoaderData();
  const { user } = useContext(AuthContext);
  const axiosSequre = useAxiosSecure();
  const navigate = useNavigate();

  // console.log("this is loader info bbbbbbbbbbbbbb: ", loader);

  const onSubmit = async (event) => {
    const reviewInfo = {
      University_name: loader.University_Name,
      Scholarship_name: loader.Scholarship_Name,
      Scholarship_category: loader.Scholarship_category,
      Reviewer_name: user.displayName,
      Reviewer_image: user.photoURL,
      Reviewer_email: user.email,

      Rating_point: parseFloat(event.Rating_point),
      Review_comment: event.comment,
      Review_date: startDate,
    };
    console.table(reviewInfo);

    const res = await axiosSequre.post(`/review`, reviewInfo);
    console.log(res.data);
    if (res.data.insertedId) {
      navigate("/dashbord/myreviews");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your Review Added Successfully!!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div>
      {/*   Rating_point
            Review_comment
            Review_date

            University_name
            Scholarship name
            University_id
            Reviewer_name
            Reviewer_image 
            Reviewer_email*/}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-16 mt-10 p-16 bg-base-200"
      >
        <h1 className="text-3xl text-center font-semibold">Add Your Review</h1>
        {/* row 01********************* */}
        <div className="flex gap-6 my-6">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-semibold">
                Give your Rating point*
              </span>
            </div>
            <input
              {...register("Rating_point")}
              type="text"
              placeholder="rating point"
              className="input input-bordered w-full "
            />
          </label>

          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text font-semibold">Review Date*</span>
            </div>
            <DatePicker
              {...register("date")}
              className="input input-bordered w-full "
              readOnly
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </label>
        </div>

        {/* row 04********************* */}
        <div className="flex gap-6 my-6">
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text font-semibold">Your Comment*</span>
            </div>
            <label className="form-control">
              <textarea
                {...register("comment")}
                className="textarea textarea-bordered h-24"
                placeholder="your comment"
              ></textarea>
            </label>
          </label>
        </div>

        <div>
          <button className="btn bg-orange-400 font-semibold text-lg ">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReviews;
