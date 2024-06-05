import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSequre";

const Update = () => {
  const application = useLoaderData();
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSequre = useAxiosSecure();
  const navigate = useNavigate();

  //hosting img in imageBB
  const image_hosting_key = import.meta.env.VITE_IMAGE_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const onSubmit = async (event) => {
    //uploading image
    const imageFile = { image: event.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: { "content-type": "multipart/form-data" },
    });

    //update application information in database
    if (res.data.success) {
      const applicationInfo = {
        date: new Date(),
        Degree: event.degree,
        gender: event.gender,
        phone_number: event.phone,
        SSC_result: parseFloat(event.ssc),
        HSC_result: parseFloat(event.hsc),
        image: res.data.data.display_url,
      };

      const updateItem = await axiosSequre.put(
        `/applications/${application._id}`,
        applicationInfo
      );

      if (updateItem.data.modifiedCount) {
        reset();
        navigate("/dashbord/myapplication");
        Swal.fire({
          title: "Good job!",
          text: "You application has been Updated!!",
          icon: "success",
        });
      }
    }
  };

  return (
    <div>
      <div className="container mx-auto ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-16 mt-10 p-16 bg-base-200"
        >
          <h1 className="text-3xl text-center font-semibold">
            Update Application Information
          </h1>
          {/* row 01********************* */}
          <div className="flex gap-6 my-6">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-semibold">
                  University name*
                </span>
              </div>
              <input
                {...register("universityname")}
                value={application.University_Name}
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
                value={application.Scholarship_category}
                type="text"
                placeholder="Scholarship category"
                className="input input-bordered w-full "
              />
            </label>
          </div>
          {/* row 02********************* */}
          <div className="flex gap-6 my-6">
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
                value={application.Subject_Category}
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
                {...register("degree")}
                defaultValue={application.Degree}
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
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text font-semibold">Phone*</span>
              </div>
              <input
                {...register("phone")}
                defaultValue={application.phone_number}
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
                {...register("gender")}
                defaultValue={application.gender}
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
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text font-semibold">SSC result*</span>
              </div>
              <input
                {...register("ssc")}
                defaultValue={application.SSC_result}
                type="text"
                placeholder="ssc result"
                className="input input-bordered w-full "
              />
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text font-semibold">HSC result*</span>
              </div>
              <input
                {...register("hsc")}
                defaultValue={application.HSC_result}
                type="text"
                placeholder="Phone number"
                className="input input-bordered w-full "
              />
            </label>
          </div>

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

export default Update;
