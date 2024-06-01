import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/HomePage/Home/Home";
import SignIn from "../Pages/Sign in/SignIn";
import SignUp from "../Pages/SignUp/SignUp";

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