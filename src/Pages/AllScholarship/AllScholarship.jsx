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
                  <Link to={'/'}>Home</Link>
                </li>
                <li>
                  <Link>All Scholarship</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl py-10 px-14 mx-auto bg-base-200 grid grid-cols-1 md:grid-cols-3 gap-5">
        {
            scholarship.map(item=><Card key={item._id} item={item}></Card>)
        }
      </div>
    </div>
  );
};

export default AllScholarship;
