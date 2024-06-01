import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Contex/AuthProvaider";
import img from "../../assets/image/authentication/authentication1.png";
import SocailMedia from "../../Components/SocailMedia/SocailMedia";

const SignIn = () => {
  const { userSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  //sign in using email
  const handleSignIn = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email);

    //sign in using email
    userSignIn(email, password)
      .then((result) => {
        const loggedInUser = result.user;

        console.log(loggedInUser);
        navigate("/");
        Swal.fire({
          title: "Good job!",
          text: "Sign in Successfully!!",
          icon: "success",
        });
        //get token from jwt
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
    <div>
      <Helmet>
        <title>Car Doctor | Sign In </title>
      </Helmet>
      <div className="hero ">
        <div className="hero-content flex-col lg:flex-row gap-10">
          <div className="w-1/2 mr-20">
            <img src={img} alt="" />
          </div>

          <div className="border py-10 card shrink-0 w-1/2">
            <h1 className="text-3xl font-bold text-center py-4">Login now!</h1>

            <p className="mt-3 text-xl text-center text-gray-600 ">
              Welcome back!
            </p>
            <div className="px-8">
              <SocailMedia></SocailMedia>
            </div>

            <div className="flex items-center justify-between mt-6 px-8">
              <span className="w-1/5 border-b  lg:w-1/4"></span>

              <div className="text-xs text-center text-gray-500 uppercase  hover:underline">
                or login with email
              </div>

              <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
            </div>

            <form onSubmit={handleSignIn} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input className="btn btn-error" type="submit" value="Login" />
              </div>
            </form>

            <div className="text-center">
              <h1 className="mt-6">
                New here?{" "}
                <Link className="text-error font-bold" to={"/signup"}>
                  Sign Up
                </Link>{" "}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
