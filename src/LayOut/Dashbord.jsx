import { FaBook, FaHome, FaList, FaUsers } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { SlCalender } from "react-icons/sl";
import { IoSchoolSharp } from "react-icons/io5";
import { TfiMenu } from "react-icons/tfi";
import { MdOutlineCastForEducation } from "react-icons/md";
import { VscPreview } from "react-icons/vsc";
import useModerator from "../Hooks/useModerator";
import UseAdmin from "../Hooks/UseAdmin";

const Dashbord = () => {
  //  get isadmin value form database
  const [isAdmin] = UseAdmin();
  const [isModerator] = useModerator();


  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="flex gap-6">
        <div className="w-64 min-h-screen bg-[#bbe8eb] p-6">
          <div className="cinzel mb-10">
            <a className=" text-xl font-black">EduScholarHub</a>
          </div>

          <ul>
            {isAdmin && (
              <>
                <li className="flex gap-2 items-center text-2xl mb-6">
                  <FaHome></FaHome>
                  <NavLink to={"/dashbord/adminprofile"}>Admin Profile</NavLink>
                </li>
                <li className="flex gap-2 items-center text-2xl mb-6">
                  <IoSchoolSharp />
                  <NavLink to={"/dashbord/addscholarship"}>
                    {" "}
                    Add Scholarship
                  </NavLink>
                </li>
                <li className="flex gap-2 items-center text-2xl mb-6">
                  <FaList />
                  <NavLink to={"/dashbord/managescholarship"}>
                    {" "}
                    Manage Scholarship
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="flex gap-2 items-center text-2xl mb-6"
                    to={"/dashbord/allAppliedScholarship"}
                  >
                    <FaBook></FaBook>Manage Applied Application
                  </NavLink>
                </li>
                <li className="flex gap-2 items-center text-2xl mb-6">
                  <FaUsers />
                  <NavLink to={"/dashbord/manageusers"}>Manage Users</NavLink>
                </li>
                <li className="flex gap-2 items-center text-2xl mb-6">
                  <MdOutlineCastForEducation />
                  <NavLink to={"/dashbord/managereview"}>Manage Review</NavLink>
                </li>
              </>
            )}
            {/* *********Moderator Menu ************ */}
            {isModerator && (
              <>
                <li className="flex gap-2 items-center text-2xl mb-6">
                  <FaHome></FaHome>
                  <NavLink to={"/dashbord/oderatorProfile"}>
                    Moderator Profile
                  </NavLink>
                </li>
                <li className="flex gap-2 items-center text-2xl mb-6">
                  <IoSchoolSharp />
                  <NavLink to={"/dashbord/addscholarship"}>
                    {" "}
                    Add Scholarship
                  </NavLink>
                </li>
                <li className="flex gap-2 items-center text-2xl mb-6">
                  <FaList />
                  <NavLink to={"/dashbord/managescholarship"}>
                    {" "}
                    Manage Scholarship
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="flex gap-2 items-center text-2xl mb-6"
                    to={"/dashbord/allAppliedScholarship"}
                  >
                    <FaBook></FaBook>All Applied Application
                  </NavLink>
                </li>
                <li className="flex gap-2 items-center text-2xl mb-6">
                  <MdOutlineCastForEducation />
                  <NavLink to={"/dashbord/managereview"}>All Reviews</NavLink>
                </li>
              </>
            )}
            {/* ********************* */}
            {!isAdmin && !isModerator && (
              <>
                <li className="flex gap-2 items-center text-2xl mb-6">
                  <FaHome></FaHome>
                  <NavLink to={"/dashbord/userprofile"}> My Profile</NavLink>
                </li>
                <li className="flex gap-2 items-center text-2xl mb-6">
                  <SlCalender />
                  <NavLink to={"/dashbord/myapplication"}>
                    {" "}
                    My Application
                  </NavLink>
                </li>
                <li className="flex gap-2 items-center text-2xl mb-6">
                  <VscPreview />
                  <NavLink to={"/dashbord/myreviews"}>My reviews</NavLink>
                </li>
              </>
            )}
            {/* ************************ */}
            <div className="divider bg-white h-1"></div>
            <li className="flex gap-2 items-center text-2xl my-6">
              <FaHome></FaHome>
              <NavLink to={"/"}> Home</NavLink>
            </li>
            <li className="flex gap-2 items-center text-2xl my-6">
              <TfiMenu />
              <NavLink to={"/allScholarShip"}> All Scholarship</NavLink>
            </li>
          </ul>
        </div>

        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashbord;
