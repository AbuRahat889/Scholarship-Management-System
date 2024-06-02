import { GoDotFill } from "react-icons/go";
import { useLoaderData } from "react-router-dom";

const Details = () => {
  const loader = useLoaderData();

  const {
    Scholarship_Name,
    University_Name,
    University_image,
    University_Logo,
    University_Country,
    University_city,
    University_World_rank,
    Subject_category,
    Subject_name,
    Scholarship_category,
    Degree,
    Tuition_fees,
    Service_charge,
    Application_fees,
    Application_Deadline,
    Scholarship_post_Date,
  } = loader || {};

  return (
    <div className="max-w-screen-2xl mx-auto bg-base-300 p-10">
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img className="rounded-l-xl pl-4" src={University_image} alt="Album" />
        </figure>
        <div className="card-body">
          <div className="flex items-center gap-2">
            <img
              className="size-12 rounded-lg p-1"
              src={University_Logo}
              alt=""
            />
            <p>{University_Name}</p>
          </div>
          <h2 className="card-title">{Scholarship_Name}</h2>

          <div className="divider "></div>

          <div className="space-y-4">
            <h1 className="flex items-center gap-1">
              {" "}
              <GoDotFill />
              {University_Country}, {University_city}
            </h1>

            <div className="flex justify-between">
              <h1 className="flex items-center gap-1 text-balance">
                {" "}
                <GoDotFill />
                {Degree} 
              </h1>
              <h1>Tuition fees : ${Tuition_fees}</h1>
            </div>

            <div className="flex justify-between">
              <h1 className="flex items-center gap-1">
                {" "}
                <GoDotFill />
                {Subject_category}
              </h1>
              <h1>Schlarship :{Scholarship_category}</h1>
            </div>

            <div className="flex justify-between">
              <h1 className="flex items-center gap-1">
                {" "}
                <GoDotFill />
                Post :{Scholarship_post_Date}
              </h1>
              <h1>Dedline : ${Application_Deadline}</h1>
            </div>
          </div>

          <div className="card-actions mt-4">
            <button className="btn btn-primary">Apply </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
