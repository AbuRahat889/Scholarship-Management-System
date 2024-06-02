import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/HomePage/Home/Home";
import SignIn from "../Pages/Sign in/SignIn";
import SignUp from "../Pages/SignUp/SignUp";
import AllScholarship from "../Pages/AllScholarship/AllScholarship";
import Details from "../Pages/Details/Details";

// AuthProvaider.jsx
export const router = createBrowserRouter([
    {
        path:'/',
        element:<App></App>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/allScholarShip',
                element:<AllScholarship></AllScholarship>
            },
            {
                path:'/details/:id',
                element:<Details></Details>,
                loader: ({params}) => fetch(`http://localhost:5000/scholarship/${params.id}`)
            },
            {
                path:'/signin',
                element:<SignIn></SignIn>
            }
            ,
            {
                path:'/signup',
                element:<SignUp></SignUp>
            }
        ]
    }
])