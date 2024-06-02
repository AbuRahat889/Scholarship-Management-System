import { Link } from "react-router-dom";
import img from "../../assets/image/page.jpg";
import useAllScholarship from "../../Hooks/useAllScholarship";
import Card from "../../Components/Card/Card";

const AllScholarship = () => {
  const scholarship = useAllScholarship();
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
            <h1 className="mb-5 text-5xl font-bold text-white">
              All Scholarship
            </h1>
            <div className="text-sm breadcrumbs text-white">
              <ul>
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>
                  <Link>All Scholarship</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl px-14 pt-10  mx-auto bg-base-200 flex justify-between">
        <h1 className="text-xl font-semibold">Showing 1-6 of {scholarship.length} results</h1>
        <div className="flex justify-center items-center gap-2">
          <select className="select select-bordered  w-72">
            <option disabled selected>
              Degree
            </option>
            <option>Masters</option>
            <option>Bachelor</option>
            <option>Diploma</option>
          </select>

          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Search" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
      </div>

      <div className="max-w-screen-2xl py-10 px-14 mx-auto bg-base-200 grid grid-cols-1 md:grid-cols-3 gap-5">
        {scholarship.map((item) => (
          <Card key={item._id} item={item}></Card>
        ))}
      </div>
    </div>
  );
};

export default AllScholarship;
