import React, { useState, useEffect, useRef } from "react";
import { Gallery2, Gallery3, Homeherobanner1 } from "../constants/Data";

function Herobanner() {
  const sections = ["design and planning", "construction", "courses"];
  const [selectedSection, setSelectedSection] = useState("design and planning");
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const intervalRef = useRef(null);

 



  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const startProgress = () => {
    intervalRef.current = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          switchSection();
          return 0;
        }
        return prevProgress + 1;
      });
    }, 50);
  };

  const stopProgress = () => {
    clearInterval(intervalRef.current);
  };

  const switchSection = () => {
    setSelectedSection((prevSection) => {
      const nextIndex = (sections.indexOf(prevSection) + 1) % sections.length;
      return sections[nextIndex];
    });
  };

  useEffect(() => {
    stopProgress();
    setProgress(0);
    startProgress();

    return () => stopProgress();
  }, [selectedSection]);

  const handleSectionClick = (section) => {
    setSelectedSection(section);
    setProgress(0);
  };

  const getBackgroundImage = () => {
    switch (selectedSection) {
      case "design and planning":
        return Homeherobanner1;
      case "construction":
        return Gallery3;
      case "courses":
        return Gallery2;
      default:
        return Homeherobanner1;
    }
  };


  return (
    <>
<div
  style={{
    backgroundImage: `url(${getBackgroundImage()})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
  }}
  className="transition-bg flex flex-col justify-end md:gap-[188px] gap-[52px] md:h-[550px] h-[550px] w-full font-Manrope text-black"
>
  {/* Your content goes here */}
</div>


      
    </>
  );
}

export default Herobanner;
