import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSequre";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Feedback = ({ modal }) => {
  const { register, handleSubmit } = useForm();
  const axiosSequre = useAxiosSecure();
  const Navigate = useNavigate();

  const onSubmit = async (event) => {
    // console.log("feedback id", event._id);
    const feedbackInfo = {
      Feedback: event.feedback,
    };

    const addFeedback = await axiosSequre.patch(
      `application/${modal._id}`,
      feedbackInfo
    );
    if (addFeedback.data.modifiedCount > 0) {
      Swal.fire({
        title: "Good job!",
        text: "You Give Feedback Successfully!!",
        icon: "success",
      });
      Navigate("/dashbord/allAppliedScholarship");
    }
  };
  return (
    <div>
      <h1 className="text-3xl text-center">Give Your Feebdack</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* row 01********************* */}
        <div className=" my-6">
          <label className="form-control w-full">
            <textarea
              {...register("feedback")}
              className="textarea textarea-bordered mt-2 w-full"
              placeholder="your feedback"
            ></textarea>
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

export default Feedback;
