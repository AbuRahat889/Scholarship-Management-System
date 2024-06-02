import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Lottie from "lottie-react";
// var Carousel = require('react-responsive-carousel').Carousel;
import img from "../../../assets/image/img/banar1.png";
import img1 from "../../../assets/image/img/bannar.png";
import img2 from "../../../assets/image/img/banner-img.png";
import img3 from "../../../assets/image/img/banner3.png";


import ball from "../../../assets/animation/ball.json";
import star from "../../../assets/animation/star.json";
import bg from "../../../assets/animation/bg-ball.json";

const Banner = () => {
  return (
    <Carousel className="container max-w-screen-2xl mx-auto">
      <div>
        <div className="hero min-h-screen bg-[#bbe8eb] ">
          <div className="hero-content flex-col lg:flex-row-reverse relative">
            <Lottie animationData={star} className="size-24 absolute top-32 left-9006 "></Lottie>

            <img src={img2} className=" rounded-lg -mb-5" />
            <Lottie animationData={bg} className="absolute top-0 -right-16 -z-10 "></Lottie>
            <div className="text-left relative">
                <Lottie animationData={ball} className="size-16  absolute -top-14 left-20"></Lottie>
              <h1 className="text-6xl font-bold">
                Master The Skills Drive Your Career.
              </h1>
              <p className="py-6">
                Through a combination of lectures, readings, and discussions,
                students will gain a solid foundation in educational psychology.
              </p>
              <button className="btn btn-primary">View All Course</button>
            </div>
          </div>
        </div>
        
      </div>
      <div>
        <img src={img} />
      </div>
      
      <div>
        <img src={img1} />
      </div>
      <div>
        <img src={img1} />
      </div>
     
      
    </Carousel>
  );
};

export default Banner;
