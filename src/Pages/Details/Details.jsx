import { GoDotFill } from "react-icons/go";
import { Link, useLoaderData } from "react-router-dom";
import Reviews from "../../Components/Reviews/Reviews";
import img from "../../assets/image/page.jpg";

const Details = () => {
  const loader = useLoaderData();

  const {
    Scholarship_Name,
    University_Name,
    University_image,
    University_Logo,
    University_Country,
    University_city,
    Subject_name,
    Scholarship_category,
    Degree,
    Tuition_fees,
    Application_Deadline,
    Scholarship_post_Date,
  } = loader || {};

  return (
    <div>
      <div
        className="hero h-80"
        style={{
          backgroundImage: `url(${img})`,
        }}
      >
        <div className="hero-overlay bg-opacity-30"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold text-white">Details</h1>
            <div className="text-sm breadcrumbs text-white">
              <ul>
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>
                  <Link to={"/allScholarShip"}>All Scholarship</Link>
                </li>
                <li>
                  <Link>Details</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto bg-base-300 p-10">
        <div className="card lg:card-side bg-base-100 shadow-xl">
          <figure>
            <img
              className="rounded-l-xl pl-4"
              src={University_image}
              alt="Album"
            />
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
                  {Subject_name}
                </h1>
                <h1>Scholarship :{Scholarship_category}</h1>
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
              <Link to={"/payment"}>
                <button className="btn btn-primary">Apply </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Reviews></Reviews>
    </div>
  );
};

export default Details;
