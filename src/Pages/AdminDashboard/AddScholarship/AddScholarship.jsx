import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSequre";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
import DatePicker from "react-datepicker";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const AddScholarship = () => {
  const { register, handleSubmit, reset } = useForm();
  const [startDate, setStartDate] = useState(new Date());
  const axiosSequre = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
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

    /**
     * Scholarship Name ,
        University_Name,

    University_image, *****
    University_image, *****

    University Country,
    University city,

    University World rank,
    Tuition fees,(optional),

    Subject category,( Agriculture,Engineering,Doctor),
    Scholarship category,  Full fund,Partial,Self-fund),
    Degree ( Diploma,Bachelor,masters)
    Application fees,

    Service charge,
    Application Deadline,

    Scholarship post Date,

    Posted User Email




Scholarship_Name
University_Name
University_image
University_Logo
University_Country
University_city
University_World_rank
Subject_category
Scholarship_category
Tuition_fees
Application_fees
Service_charge
Application_Deadline
Scholarship_post_Date

     */

    //update application information in database
    if (res.data.success) {
      const applicationInfo = {
        Subject_name: event.subject,
        Scholarship_post_Date: event.today_date,
        Scholarship_Name: event.Scholarship_Name,
        University_Name: event.University_Name,
        University_image: res.data.data.display_url,
        University_Logo: res.data.data.display_url,
        University_Country: event.country,
        University_city: event.University_city,
        University_World_rank: event.rank,
        Subject_category: event.category,
        Degree: event.degree,
        Scholarship_category: event.Scholarship_category,
        Tuition_fees: event.Tuition_fees,
        Application_fees: event.Application_fees,
        Service_charge: event.charge,
        Application_Deadline: event.dedline,
      };

      const AddScholarship = await axiosSequre.post(
        `/scholarship`,
        applicationInfo
      );

      if (AddScholarship.data.insertedId) {
        reset();
        navigate("/dashbord/myapplication");
        Swal.fire({
          title: "Good job!",
          text: "You Added a Scholarship Successfully!!",
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
            Add Scholarship
          </h1>
          {/* row 00********************* */}
          <div className="flex gap-6 my-6">
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text font-semibold">Subject Name*</span>
              </div>
              <input
                {...register("subject")}
                type="text"
                placeholder="Subject name"
                className="input input-bordered w-full "
              />
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text font-semibold">Today Date*</span>
              </div>
              <DatePicker
                {...register("today_date")}
                readOnly
                className="input input-bordered w-full "
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </label>
          </div>
          {/* row 01********************* */}
          <div className="flex gap-6 my-6">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-semibold">
                  Scholarship Name*
                </span>
              </div>
              <input
                {...register("Scholarship_Name")}
                type="text"
                placeholder="Scholarship Name"
                className="input input-bordered w-full "
              />
            </label>

            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text font-semibold">
                  University Name*
                </span>
              </div>
              <input
                {...register("University_Name")}
                type="text"
                placeholder="University Name"
                className="input input-bordered w-full "
              />
            </label>
          </div>

          {/* row 02********************* */}
          <div className="flex gap-6 my-6">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-semibold">
                  University Country*
                </span>
              </div>
              <input
                {...register("country")}
                type="text"
                placeholder="University Country"
                className="input input-bordered w-full "
              />
            </label>

            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text font-semibold">
                  University city*
                </span>
              </div>
              <input
                {...register("University_city")}
                type="text"
                placeholder=" University city"
                className="input input-bordered w-full "
              />
            </label>
          </div>

          {/* row 03********************* */}
          <div className="flex gap-6 my-6">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-semibold">
                  University World rank*
                </span>
              </div>
              <input
                {...register("rank")}
                type="number"
                placeholder="University World rank"
                className="input input-bordered w-full "
              />
            </label>

            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text font-semibold">Tuition fees*</span>
              </div>
              <input
                {...register("Tuition_fees")}
                type="number"
                placeholder="Tuition fees"
                className="input input-bordered w-full "
              />
            </label>
          </div>

          {/* row 04********************* */}
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

          {/* row 05********************* */}
          <div className="flex gap-6 my-6">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-semibold">
                  Scholarship category*
                </span>
              </div>
              <select
                {...register("Scholarship_category")}
                className="select select-bordered"
              >
                <option disabled value={"default"}>
                  Catagory
                </option>
                <option value="Full fund">Full fund</option>
                <option value="Partial">Partial</option>
                <option value="Self-fund">Self-fund</option>
              </select>
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text font-semibold">
                  Application fees*
                </span>
              </div>
              <input
                {...register("Application_fees")}
                type="number"
                placeholder="Application fees"
                className="input input-bordered w-full "
              />
            </label>
          </div>

          {/* row 06********************* */}
          <div className="flex gap-6 my-6">
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text font-semibold">
                  Service charge*
                </span>
              </div>
              <input
                {...register("charge")}
                type="number"
                placeholder="Service charge"
                className="input input-bordered w-full "
              />
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text font-semibold">
                  Application Deadline*
                </span>
              </div>
              <DatePicker
                {...register("dedline")}
                className="input input-bordered w-full "
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </label>
          </div>

          {/* row 07********************* */}
          <div className="flex gap-6 my-6">
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text font-semibold">
                  University image*
                </span>
              </div>
              <input
                {...register("image")}
                type="file"
                className="file-input file-input-bordered file-input-info w-full max-w-xs my-6"
              />
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text font-semibold">
                  University Logo*
                </span>
              </div>
              <input
                {...register("logo")}
                type="file"
                className="file-input file-input-bordered file-input-info w-full max-w-xs my-6"
              />
            </label>
          </div>

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

export default AddScholarship;
