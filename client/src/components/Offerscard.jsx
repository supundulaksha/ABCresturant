import React from "react";
import { BiFontSize } from "react-icons/bi";
import img1 from "../assets/Images/Delivery.png";
import img2 from "../assets/Images/fast.png";
import img3 from "../assets/Images/payment.png";
import img4 from "../assets/Images/Quality.png";
import img5 from "../assets/Images/Serve.png";
import img6 from "../assets/Images/Smooth.png";

const Service = () => {
  return (
    <section className="pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
                Our Services
              </h2>
              <p className="text-lg sm:text-l md:text-xl text-gray-700 mb-6 md:mb-8">
              Crafting Memorable Moments Through Our Range of Services
              </p>
            </div>
          </div>
        </div>

        <div className="text-black mx-4 flex flex-wrap">
  <ServiceCard
    title={<span className="text-black">24/7 Delivery Service</span>}
    details="Enjoy fresh meals delivered anytime, day or night."
    image={img1} 
  />

  <ServiceCard
    title={<span className="text-black">Crafting Quality Food Excellence</span>}
    details="Fresh, flavorful dishes made with passion and precision."
    image={img2}
  />

  <ServiceCard
    title={<span className="text-black">Simplify Your Payments</span>}
    details="Effortless payment solutions for seamless transactions."
    image={img3}
  />

  <ServiceCard
    title={<span className="text-black">Freshly Crafted Delicacies</span>}
    details="Expertly prepared with the finest, freshest ingredients."
    image={img4}
  />

  <ServiceCard
    title={<span className="text-black">Exceptional Customer Service</span>}
    details="Delivering prompt, friendly, and effective support every time."
    image={img5}
  />

  <ServiceCard
    title={<span className="text-black">Fast Food Excellence</span>}
    details="Delicious, freshly made, and promptly delivered to your door."
    image={img6}
  />
</div>

      </div>
    </section>
  );
};

export default Service;

const ServiceCard = ({ icon, title, details, image }) => { // Accept image as a prop
  return (
    <div className="w-full px-4 md:w-1/2 lg:w-1/3">
      <div className="mb-9 rounded-[20px] bg-white p-10 shadow-2 hover:shadow-lg dark:bg-dark-2 md:px-7 xl:px-10">
        <div className="">
          {icon}
        </div>
        <img src={image} alt={title} className="mb-4 rounded-lg" /> {/* Display the image */}
        <h4 className="mb-[14px] text-2xl font-semibold text-dark dark:text-white">
          {title}
        </h4>
        <p className="text-body-color dark:text-dark-6">{details}</p>
      </div>
    </div>
  );
};
