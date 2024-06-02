import { Link } from "react-router-dom";
import Card from "../../../Components/Card/Card";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAllScholarship from "../../../Hooks/useAllScholarship";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const TopScholarship = () => {
  const scholarship = useAllScholarship();

  const scholarshipLength = scholarship.slice(0, 6);
  console.log("all scholarship length : ", scholarshipLength.length);
  return (
    <div className="max-w-screen-2xl mx-auto bg-base-200 py-10 px-14">
      <SectionTitle
        subtitle={"Featured Courses"}
        titel={"Explore Featured Courses"}
      ></SectionTitle>
      <div className="grid grid-cols-3 gap-5 mt-10">
        {scholarshipLength.map((item) => (
          <Card key={item._id} item={item}></Card>
        ))}
      </div>

      <div className="text-center">
        <Link to={"/allScholarShip"}>
          <button className="btn btn-outline btn-info mt-5 ">View All</button>
        </Link>
      </div>
    </div>
  );
};

export default TopScholarship;
