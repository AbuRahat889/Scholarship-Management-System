import { useContext } from "react";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Contex/AuthProvaider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSequre";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ApplyScholarship = ({ loader }) => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const axiosSequre = useAxiosSecure();
  const navigate = useNavigate();

  const image_hosting_key = import.meta.env.VITE_IMAGE_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const onSubmit = async (event) => {
    const imageFile = { image: event.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: { "content-type": "multipart/form-data" },
    });

    //send application information in database
    if (res.data.success) {
      const applicationInfo = {
        Scholarship_id: loader._id,
        Applicant_name: user.displayName,
        Applicant_email: user.email,
        date: new Date(),
        University_Name: event.universityname,
        Subject_Category: event.category,
        Scholarship_category: event.scholarship,
        Scholarship_Name: loader.Scholarship_Name,
        Degree: event.degree,
        gender: event.gender,
        phone_number: event.phone,
        SSC_result: parseFloat(event.ssc),
        HSC_result: parseFloat(event.hsc),
        image: res.data.data.display_url,
        Status: "pending",
      };
      console.table(applicationInfo)

      const applyItem = await axiosSequre.post("/application", applicationInfo);
      console.log(applyItem.data);

      if (applyItem.data.insertedId) {
        reset();
        navigate("/dashbord/myapplication");
        Swal.fire({
          title: "Good job!",
          text: "You application has been done!!",
          icon: "success",
        });
      }
    }
  };

  return (
    <div>
      <div className="container mx-auto ">
        <SectionTitle
          subtitle={"Apply Online"}
          titel={"Apply Scholarship"}
        ></SectionTitle>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-16 mt-10 p-16 bg-base-200"
        >
          {/* row 01********************* */}
          <div className="flex gap-6 my-6">
            {/* category */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-semibold">
                  University name*
                </span>
              </div>
              <input
                {...register("universityname")}
                value={loader.University_Name}
                readOnly
                type="text"
                placeholder="University name"
                className="input input-bordered w-full "
              />
            </label>

            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text font-semibold">
                  Scholarship category*
                </span>
              </div>
              <input
                {...register("scholarship")}
                readOnly
                value={loader.Scholarship_category}
                type="text"
                placeholder="Scholarship category"
                className="input input-bordered w-full "
              />
            </label>
          </div>
          {/* row 02********************* */}
          <div className="flex gap-6 my-6">
            {/* category */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-semibold">
                  Subject Category*
                </span>
              </div>
              <select
                defaultValue="default"
                {...register("category")}
                readOnly
                value={loader.Subject_category}
                className="select select-bordered"
              >
                <option disabled value={"default"}>
                  Category
                </option>
                <option value="Engineer">Engineer</option>
                <option value="Doctor">Doctor</option>
                <option value="Agriculture">Agriculture</option>
              </select>
            </label>

            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text font-semibold">Degree*</span>
              </div>
              <select
                defaultValue="default"
                {...register("degree")}
                className="select select-bordered"
              >
                <option disabled value={"default"}>
                  Degree
                </option>
                <option value="Bachelor">Bachelor</option>
                <option value="masters">masters</option>
                <option value="Diploma">Diploma</option>
              </select>
            </label>
          </div>

          {/* row 03********************* */}
          <div className="flex gap-6 my-6">
            {/* category */}
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text font-semibold">Phone*</span>
              </div>
              <input
                {...register("phone")}
                type="number"
                placeholder="Phone number"
                className="input input-bordered w-full "
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-semibold">Gender*</span>
              </div>
              <select
                defaultValue="default"
                {...register("gender")}
                className="select select-bordered"
              >
                <option disabled value={"default"}>
                  Gender
                </option>
                <option value="Mail">Mail</option>
                <option value="Femail">Femail</option>
              </select>
            </label>
          </div>

          {/* row 04********************* */}
          <div className="flex gap-6 my-6">
            {/* category */}
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text font-semibold">SSC result*</span>
              </div>
              <input
                {...register("ssc")}
                type="text"
                placeholder="Phone number"
                className="input input-bordered w-full "
              />
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text font-semibold">HSC result*</span>
              </div>
              <input
                {...register("hsc")}
                type="text"
                placeholder="Phone number"
                className="input input-bordered w-full "
              />
            </label>
          </div>

          {/* upload photo */}
          <div className="label">
            <span className="label-text font-semibold">Upload photo</span>
          </div>
          <input
            {...register("image")}
            type="file"
            className="file-input file-input-bordered file-input-info w-full max-w-xs my-6"
          />

          <div>
            <button className="btn bg-orange-400 font-semibold text-lg ">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyScholarship;
