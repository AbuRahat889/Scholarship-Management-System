import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
// import "./styles.css";
import img1 from "../../../assets/image/img/1.jpg";
import img2 from "../../../assets/image/img/2.jpg";
import img3 from "../../../assets/image/img/3.jpg";
import img4 from "../../../assets/image/img/4.jpg";

const PopulerSub = () => {
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: "free",
    slides: {
      perView: 3,
      spacing: 15,
    },
  });
  return (
    <div className="container mx-auto flex justify-center items-center gap-10 px-10 mt-10">
      <div>
        <p className="bg-orange-100 p-2 mb-2 text-lg font-semibold text-red-500 border-l-4 border-red-500">
          Browse Categories
        </p>
        <h1 className="text-5xl font-bold">
          Popular <br /> Categories{" "}
        </h1>
      </div>
      <div ref={sliderRef} className="keen-slider flex-1">
        {/* slider 1 */}
        <div className="keen-slider__slide number-slide1">
          <div>
            <img className="w-full" src={img1} alt="" />
            <div className="p-5">
              <h1 className="text-lg font-semibold hover:text-blue-600">
                Robotics Engineer
              </h1>
              <p className="text-sm">10 items -- </p>
            </div>
          </div>
        </div>
        {/* slider 2 */}
        <div className="keen-slider__slide number-slide1">
          <div>
            <img className="w-full" src={img2} alt="" />
            <div className="p-5">
              <h1 className="text-lg font-semibold hover:text-blue-600">
                Softwaree Engineer
              </h1>
              <p className="text-sm">10 items -- </p>
            </div>
          </div>
        </div>
        {/* slider 3 */}
        <div className="keen-slider__slide number-slide1">
          <div>
            <img className="w-full" src={img3} alt="" />
            <div className="p-5">
              <h1 className="text-lg font-semibold hover:text-blue-600">
                Softwaree Engineer
              </h1>
              <p className="text-sm">10 items -- </p>
            </div>
          </div>
        </div>
        {/* slider 4 */}
        <div className="keen-slider__slide number-slide1">
          <div>
            <img className="w-full" src={img4} alt="" />
            <div className="p-5">
              <h1 className="text-lg font-semibold hover:text-blue-600">
                Electrical Engineer
              </h1>
              <p className="text-sm">10 items -- </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopulerSub;
