// import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Reviews from "../../../Components/Reviews/Reviews";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
// import Reviews from "../../../Components/Reviews/Reviews";


const Testimonial = () => {

   
    return (
        <div>
            <SectionTitle 
            subtitle={'Student Reviews'}
            titel={'What Our Students Saying'}
            ></SectionTitle>
            <Reviews></Reviews>
           
        </div>
    );
};

export default Testimonial;