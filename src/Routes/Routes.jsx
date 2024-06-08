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
import Update from "./../Pages/UserDashboard/Update/Update";
import AddReviews from "../Pages/UserDashboard/Reviews/AddReviews";
import MyReviews from "../Pages/UserDashboard/MyReviews.jsx/MyReviews";
import EditReview from "../Pages/UserDashboard/MyReviews.jsx/EditReview";
import PrivateRoute from "./PrivateRoute";
import ManageUsers from "../Pages/AdminDashboard/ManageUsers/ManageUsers";
import AddScholarship from "../Pages/AdminDashboard/AddScholarship/AddScholarship";
import ManageReview from "../Pages/AdminDashboard/ManageReview/ManageReview";
import ManageScholarships from "../Pages/AdminDashboard/ManageScholarships/ManageScholarships";
import EditScholarship from "../Components/ManageScholarships/EditScholarship";
import AppliedScholarship from "../Pages/AdminDashboard/AppliedScholarship/AppliedScholarship";
import AdminProfile from "../Pages/AdminDashboard/AdminProfile/AdminProfile";
import AdminRouts from "./AdminRouts";
import ModeratorProfile from "../Pages/ModeratorDashboard/ModeratorProfile/ModeratorProfile";
import Feedbacks from "../Pages/AdminDashboard/Feedback/Feedbacks";

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
        element: (
          <PrivateRoute>
            <Details></Details>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/scholarship/${params.id}`),
      },
      {
        path: "/applyscholarship",
        element: <ApplyScholarship></ApplyScholarship>,
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
    element: (
      <PrivateRoute>
        <Dashbord></Dashbord>
      </PrivateRoute>
    ),
    children: [
      //user dashboard
      {
        path: "/dashbord/userprofile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "/dashbord/myapplication",
        element: <MyApplication></MyApplication>,
      },
      {
        path: "/dashbord/update/:id",
        element: <Update></Update>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/applications/${params.id}`),
      },
      {
        path: "/dashbord/review/:id",
        element: <AddReviews></AddReviews>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/applications/${params.id}`),
      },
      {
        path: "/dashbord/myreviews",
        element: <MyReviews></MyReviews>,
      },
      {
        path: "/dashbord/editreview/:id",
        element: <EditReview></EditReview>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/reviews/${params.id}`),
      },

      //admin dashboard
      {
        path: "/dashbord/adminprofile",
        element: <AdminProfile></AdminProfile>,
      },
      {
        path: "/dashbord/manageusers",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "/dashbord/addscholarship",
        element: <AddScholarship></AddScholarship>,
      },
      {
        path: "/dashbord/managereview",
        element: <ManageReview></ManageReview>,
      },
      {
        path: "/dashbord/feedback/:id",
        element: <Feedbacks></Feedbacks>
      },
      {
        path: "/dashbord/managescholarship",
        element: <ManageScholarships></ManageScholarships>,
      },
      {
        path: "/dashbord/editscholarship/:id",
        element: <EditScholarship></EditScholarship>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/scholarship/${params.id}`),
      },
      {
        path: "/dashbord/allAppliedScholarship",
        element: (
          <AdminRouts>
            <AppliedScholarship></AppliedScholarship>
          </AdminRouts>
        ),
      },
      //Moderator Routes
      {
        path:'/dashbord/oderatorProfile',
        element:<ModeratorProfile></ModeratorProfile>
      }
    ],
  },
]);
