import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/HomePage/Home/Home";
import SignIn from "../Pages/Sign in/SignIn";
import SignUp from "../Pages/SignUp/SignUp";
import AllScholarship from "../Pages/AllScholarship/AllScholarship";
import Details from "../Pages/Details/Details";
import ErrorPage from "../Pages/Errorpage/ErrorPage";
import Dashbord from "../LayOut/Dashbord";
import ApplyScholarship from "../Pages/ApplyScholarship/ApplyScholarship";
import MyProfile from "../Pages/UserDashboard/UserProfile/MyProfile";
import App from "../LayOut/App";
import MyApplication from "../Pages/UserDashboard/MyApplication/MyApplication";

// AuthProvaider.jsx
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/allScholarShip",
        element: <AllScholarship></AllScholarship>,
      },
      {
        path: "/details/:id",
        element: <Details></Details>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/scholarship/${params.id}`),
      },
      {
        path: "/signin",
        element: <SignIn></SignIn>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
    ],
  },
  {
    path: "/dashbord",
    element: <Dashbord></Dashbord>,
    children: [
      {
        path: "/dashbord/userprofile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "/dashbord/myapplication",
        element: <MyApplication></MyApplication>,
      },
    ],
  },
]);
