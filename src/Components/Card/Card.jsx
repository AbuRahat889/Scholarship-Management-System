import { GoDotFill } from "react-icons/go";
import img from "../../assets/image/card-img/bd.webp";
import logo from "../../assets/image/card-img/Du.png";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Link } from "react-router-dom";

const Card = ({ item }) => {
  const {
    _id,
    University_Name,
    Scholarship_Name,
    University_image,
    University_Logo,
    University_Country,
    University_city,
    Application_fees,
    Degree,
    Application_Deadline,
    Subject_category,
  } = item;
  return (
    <div>
      <div className="card  shadow-xl bg-white">
        <figure className="px-3 pt-3">
          <img src={img} alt="University" className="rounded-t-xl" />
        </figure>

        <div className="card-body r ">
          <div className="flex items-center gap-2">
            <img className="size-12 rounded-lg p-1" src={logo} alt="" />
            <p>{University_Name}</p>
          </div>
          <h2 className="card-title">{Scholarship_Name}</h2>

          <div className="divider divider-warning"></div>

          <div className="flex justify-between">
            <h1 className="flex items-center gap-1">
              {" "}
              <GoDotFill />
              {University_Country}, {University_city}
            </h1>
          </div>

          <div className="flex justify-between">
            <h1 className="flex items-center gap-1">
              {" "}
              <GoDotFill />
              {Degree}
            </h1>
            <h1>Application : ${Application_fees}</h1>
          </div>

          <div className="flex justify-between mt-4 -mb-8">
            <h1>Deadline : {Application_Deadline}</h1>
            <div className="size-20">
              <Rating style={{ maxWidth: 180 }} value={3} readOnly />
            </div>
          </div>
          <div className="card-actions">
            <Link to={`/details/${_id}`}>
              <button className="btn btn-primary">Details</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
