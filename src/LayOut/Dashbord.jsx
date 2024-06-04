import { FaBook, FaHome, FaList, FaUsers } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { SlCalender } from "react-icons/sl";
import { IoSchoolSharp, IoWallet } from "react-icons/io5";
import { TfiMenu } from "react-icons/tfi";

//   import "../LayOut/Dashbord.css";
import { MdOutlineCastForEducation } from "react-icons/md";
//   import UseAdmin from "../../Hooks/UseAdmin";

const Dashbord = () => {
  //TODO : get isadmin value form database
  // const [isAdmin] = UseAdmin();
  const isAdmin = false;

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="flex gap-10">
        <div className="w-64 min-h-screen bg-[#d1a054] p-6">
          {/* logo bistor boss */}
          <div className="cinzel mb-10">
            <a className=" text-xl font-black">Bistro Boss</a>
            <p className="tracking-widest font-bold ">RESTAURANT</p>
          </div>

          <ul>
            {isAdmin ? (
              <>
                <li className="flex gap-2 items-center text-2xl mb-6">
                  <FaHome></FaHome>
                  <NavLink to={"/dashbord/adminHome"}> Admin Profile</NavLink>
                </li>
                <li className="flex gap-2 items-center text-2xl mb-6">
                  <IoSchoolSharp />
                  <NavLink to={"/dashbord/addItems"}> Add Scholarship</NavLink>
                </li>
                <li className="flex gap-2 items-center text-2xl mb-6">
                  <FaList />
                  <NavLink to={"/dashbord/manageItems"}>
                    {" "}
                    Manage Scholarship
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="flex gap-2 items-center text-2xl mb-6"
                    to={"/dashbord/bookingManage"}
                  >
                    <FaBook></FaBook>Manage Applied Application
                  </NavLink>
                </li>
                <li className="flex gap-2 items-center text-2xl mb-6">
                  <FaUsers />
                  <NavLink to={"/dashbord/allusers"}>Manage Users</NavLink>
                </li>
                <li className="flex gap-2 items-center text-2xl mb-6">
                  <MdOutlineCastForEducation />
                  <NavLink to={"/dashbord/allusers"}>Manage Review</NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="flex gap-2 items-center text-2xl mb-6">
                  <FaHome></FaHome>
                  <NavLink to={"/dashbord/userprofile"}> My Profile</NavLink>
                </li>
                <li className="flex gap-2 items-center text-2xl mb-6">
                  <SlCalender />
                  <NavLink to={"/userHome"}> My Application</NavLink>
                </li>
                <li className="flex gap-2 items-center text-2xl mb-6">
                  <IoWallet />
                  <NavLink to={"/userHome"}>My reviews</NavLink>
                </li>
              </>
            )}

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
