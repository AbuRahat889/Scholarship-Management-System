import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Contex/AuthProvaider";
import './Navbar.css'



const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    // console.log(user);displayName
    const handleLogout = () => {
      logOut();
    };

  const navlink = (
    <div className="text-xl space-x-12">
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"/allScholarShip"}>All Scholarship</NavLink>
      <NavLink to={"/"}>Dashboard</NavLink>
      
    </div>
  );
  return (
    <div className="container mx-auto ">
      <div className="navbar align">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navlink}
            </ul>
          </div>
          <a className="poetsen btn btn-ghost text-3xl italic">EduScholarHub</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navlink}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <>
              <NavLink
                onClick={handleLogout}
                className="text-xl mr-8 p-4 border-x-2"
              >
                Sign out
              </NavLink>
              {user.photoURL ? (
                <div className="avatar online">
                  <button
                    className="w-16 rounded-full tooltip tooltip-left"
                    data-tip={user.displayName}
                  >
                    <img className="rounded-full" src={user.photoURL} />
                  </button>
                </div>
              ) : (
                <div className="avatar online">
                  <button
                    className="w-16 rounded-full tooltip tooltip-left"
                    data-tip={user.displayName}
                  >
                    <img
                      className="rounded-full"
                      src="https://i.ibb.co/QQtCMqv/avater.png"
                    />
                  </button>
                </div>
              )}
            </>
          ) : (
            <NavLink to={"/signin"} className="text-xl mr-8 p-4 border-x-2">
              Sign in
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
