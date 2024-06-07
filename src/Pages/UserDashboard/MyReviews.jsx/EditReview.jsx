import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSequre";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const EditReview = () => {
  const { register, handleSubmit } = useForm();
  const [startDate, setStartDate] = useState(new Date());
  const axiosSequre = useAxiosSecure();
  const navigate = useNavigate();

  const loader = useLoaderData();
  console.log("review data aaaaaa: ", loader);

  const onSubmit = async (event) => {
    const EditreviewInfo = {
      Rating_point: parseFloat(event.Rating_point),
      Review_comment: event.comment,
      Review_date: startDate,
    };
    const res = await axiosSequre.put(`/review/${loader._id}`, EditreviewInfo);
    console.log(res.data);
    if (res.data.modifiedCount) {
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-16 mt-10 p-16 bg-base-200"
      >
        <h1 className="text-3xl text-center font-semibold">Edit Your Review</h1>
        <h1>{loader.University_name} </h1>
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

export default EditReview;
