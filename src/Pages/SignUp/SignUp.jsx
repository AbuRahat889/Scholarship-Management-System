import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import img from "../../assets/image/authentication/authentication2.png";
import { AuthContext } from "../../Contex/AuthProvaider";
import SocailMedia from "../../Components/SocailMedia/SocailMedia";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const SignUp = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const from = location.state?.from?.pathname || "/";

  //sign up email and password
  const handleSignUp = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.photoURL.value;

    //password validation
    const hasUpperCase = /[A-Z]/;
    const hasLowerCase = /[a-z]/;
    const hasNumber = /[0-9]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (password.length < 6 || password.length > 13) {
      return setError("Password must be between 6 and 13 characters.");
    }
    if (!hasUpperCase.test(password)) {
      return setError("Password must contain at least one uppercase letter.");
    }
    if (!hasLowerCase.test(password)) {
      return setError("Password must contain at least one lowercase letter.");
    }
    if (!hasNumber.test(password)) {
      return setError("Password must contain at least one number.");
    }
    if (!hasSpecialChar.test(password)) {
      return setError("Password must contain at least one special character.");
    }

    //sign up
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUserProfile(name, image)
        .then((res) => {
          console.log(res);
          //store user info in database
          const userInfo = {
            name,
            email,
            image,
          };
          axiosPublic.post(`/users`, userInfo).then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                title: "Good job!",
                text: "You signUp Successfully!",
                icon: "success",
              });
              navigate("/");
            }
          });
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error,
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      });
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)]">
      <Helmet>
        <title>EduScholarHub || Sign In</title>
      </Helmet>
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg  lg:max-w-4xl ">
        <div
          className="hidden bg-cover bg-center lg:block lg:w-1/2"
          style={{
            backgroundImage: `url(${img})`,
          }}
        ></div>

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto">
            <img className="w-auto h-7 sm:h-8" src="" alt="" />
          </div>

          <p className="mt-3 text-xl text-center text-gray-600 ">
            Welcome back!
          </p>
          <SocailMedia></SocailMedia>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b  lg:w-1/4"></span>

            <div className="text-xs text-center text-gray-500 uppercase  hover:underline">
              or login with email
            </div>

            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          </div>

          <form onSubmit={handleSignUp}>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 "
                htmlFor="LoggingEmailAddress"
              >
                Your Name
              </label>
              <input
                id="LoggingName"
                autoComplete="name"
                name="name"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
              />
            </div>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 "
                htmlFor="LoggingEmailAddress"
              >
                Email Address
              </label>
              <input
                id="LoggingEmailAddress"
                autoComplete="email"
                name="email"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
              />
            </div>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 "
                htmlFor="LoggingEmailAddress"
              >
                Image Link
              </label>
              <input
                id="photoURL"
                name="photoURL"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
              />
            </div>

            <div className="mt-4">
              <div className="flex justify-between">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 "
                  htmlFor="loggingPassword"
                >
                  Password
                </label>
              </div>

              <input
                id="loggingPassword"
                autoComplete="current-password"
                name="password"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
              />
              <h1 className="text-error">{error}</h1>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
              >
                Sign Up
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b  md:w-1/4"></span>

            <Link
              to="/signin"
              className="text-xs text-error font-bold uppercase  hover:underline"
            >
              or sign in
            </Link>

            <span className="w-1/5 border-b  md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
