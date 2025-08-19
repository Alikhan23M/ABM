// import React, { useState, useEffect } from "react";
// import { FaArrowRight } from "react-icons/fa";
// import AxiosRequest from "../AxiosRequest/AxiosRequest"; // Ensure correct import

// const Partners = () => {
//   const [partners, setPartners] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [itemsPerView, setItemsPerView] = useState(4);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const updateItemsPerView = () => {
//       if (window.innerWidth < 640) {
//         setItemsPerView(1);
//       } else if (window.innerWidth < 1024) {
//         setItemsPerView(2);
//       } else {
//         setItemsPerView(4);
//       }
//     };

//     updateItemsPerView();
//     window.addEventListener("resize", updateItemsPerView);
//     return () => window.removeEventListener("resize", updateItemsPerView);
//   }, []);

//   useEffect(() => {
//     const fetchPartners = async () => {
//       try {
//         const response = await AxiosRequest.get("https://abm-wbw0.onrender.com/api/partners/getTeam");
//         console.log("API Response:", response.data);

//         if (Array.isArray(response.data)) {
//           setPartners(response.data);
//         } else {
//           setError("Unexpected API response format");
//         }
//       } catch (err) {
//         console.error("Error fetching partners:", err);
//         setError("Failed to load partner data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPartners();
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) =>
//         prevIndex + 1 >= Math.ceil(partners.length / itemsPerView) ? 0 : prevIndex + 1
//       );
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [itemsPerView, partners]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-100">
//         <p className="text-xl font-semibold text-gray-700">Loading partners...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-100">
//         <p className="text-xl font-semibold text-red-600">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-100 h-auto w-full p-4 flex flex-col items-center">
//       {/* Section Title */}
//       <div className="text-center">
//         <h1 className="text-black text-3xl font-semibold">Our Partners</h1>
//         <div className="bg-yellow-700 h-1 w-[90px] rounded-md mx-auto mt-3"></div>
//       </div>

//       {/* Slideshow Container */}
//       <div className="relative w-full overflow-hidden mt-6">
//         <div
//           className="flex transition-transform duration-700 ease-in-out"
//           style={{
//             transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
//           }}
//         >
//           {partners.map((partner, index) => (
//             <div
//               key={index}
//               className="flex justify-center p-4"
//               style={{ minWidth: `${100 / itemsPerView}%` }}
//             >
//               <div className="max-w-xs w-[18rem] h-[18rem] bg-white rounded-lg shadow-lg overflow-hidden">
//                 <img
//                   src={partner.imageUrl || "https://via.placeholder.com/300"}
//                   alt={partner.name}
//                   className="w-[18rem] h-[18rem] object-cover"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Navigation Dots */}
//         <div className="flex justify-center mt-2">
//           {Array.from({ length: Math.ceil(partners.length / itemsPerView) }).map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentIndex(index)}
//               className={`mx-1 w-8 h-1 rounded-full transition-all duration-300 ${
//                 currentIndex === index ? "bg-[#F4B81A] w-[3rem]" : "bg-gray-300"
//               }`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* See All Partners Button */}
//       <div className="group text-lg mt-8">
//         <button className="group flex items-center gap-1 text-black bg-yellow-700 p-3 font-semibold rounded-md hover:bg-yellow-500 relative overflow-hidden">
//           <span className="absolute left-[-20px] opacity-0 group-hover:left-2 group-hover:opacity-100 transition-all duration-300 ease-in-out">
//             <FaArrowRight />
//           </span>
//           <span className="ml-2 group-hover:pl-2 transition-all duration-300 ease-in-out">See All Partners</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Partners;



// Changed partner section swiper slider

import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import AxiosRequest from "../AxiosRequest/AxiosRequest"; // Ensure correct import
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";


const Partners = () => {
  const [partners, setPartners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [title, setTitle] = useState('NEWS & PUBLICATIONS');
  const [description, setDescription] = useState(null);
  const [link, setLink] = useState('/partner-org');
  const [text, setText] = useState('See All Partners');

  const [theme, setTheme] = useState(null);

  const fetchTheme = async () => {
    try {
      const res = await AxiosRequest.get("/api/colors/home-our-partners");
      if (res.status === 200) setTheme(res.data);
    } catch (error) {
      console.error("Error fetching theme:", error);
    }
  };

  const fetchInfo = async () => {
    const response = await AxiosRequest.get('/api/section-info/home-our-partners');
    if (response.status === 200) {
      setTitle(response.data.title);
      setDescription(response.data.description);
      setText(response.data.buttonText);
      setLink(response.data.buttonLink);
    }
  }

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(4);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await AxiosRequest.get("/api/partners/getTeam");
        console.log("API Response:", response.data);

        if (Array.isArray(response.data)) {
          setPartners(response.data);
        } else {
          setError("Unexpected API response format");
        }
      } catch (err) {
        console.error("Error fetching partners:", err);
        setError("Failed to load partner data");
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
    fetchInfo();
    fetchTheme();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 1 >= Math.ceil(partners.length / itemsPerView) ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [itemsPerView, partners]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-700">Loading partners...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-red-600">{error}</p>
      </div>
    );
  }

  const cardTheme = theme?.config.cards?.[0];
  const buttonTheme = theme?.config.buttons?.[0];
  const textTheme = theme?.config.text;
  return (
    <div className="h-auto w-full p-4 flex flex-col items-center" style={{
      backgroundColor: theme?.config.background.sectionBgColor || "#F5F6F5",
    }}>
      {/* Section Title */}
      <div className="text-center">
        <h1 className="text-3xl font-semibold" style={{ color: textTheme?.headingColor || "black" }}>{title}</h1>
        <div className="h-1 w-[90px] rounded-md mx-auto mt-3"
          style={{ backgroucndColor: textTheme?.highlightedTextColor || "#FFA700" }}
        ></div>
      </div>

      {/* Description if not null */}

      {description && (
        <div className="max-w-2xl mx-auto text-center mt-4 mb-6 px-4">
          <p className="text-lg" style={{ color: textTheme?.paragraphColor || "gray" }}>{description}</p>
        </div>

      )}
      {error && (
        <div className="max-w-2xl mx-auto text-center mt-4 mb-6 px-4">
          <p className="text-lg" style={{ color: textTheme?.paragraphColor || "gray" }}>{error}</p>
        </div>

      )}

   


      {/* Swiper Carousel */}
      <Swiper
        speed={1200}
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={20}
        loop={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true, el: ".custom-pagination" }}
        grabCursor={true}
        freeMode={true}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        className="w-[95vw] max-w-7xl px-6 mt-6"
      >
        {partners.map((partner, index) => (
          <SwiperSlide key={index}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ease: "easeInOut", duration: 0.6 }}
            >
              <div className="bg-white shadow-lg rounded-lg flex flex-col items-center justify-center h-48 w-full p-4 text-center">
                {partner.imageUrl ? (
                  <img
                    src={partner.imageUrl}
                    alt={partner.name}
                    className="max-h-24 w-auto object-contain"
                  />
                ) : (
                  <p className="text-gray-400">No image</p>
                )}

                {/* Partner Name */}
                <h3 className="mt-2 text-lg font-semibold text-gray-900 text-wrap break-words">{partner.name}</h3>

                {/* Partner Description */}
                <p className="text-sm text-gray-600 ">{partner.description || ""}</p>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>


      {/* Custom Pagination */}
      <div className="custom-pagination-container mt-4">
        <div className="custom-pagination"></div>
      </div>


      {/* See All Partners Button */}
      <div className="group text-lg mt-8">
        <Link to={link}>
          <button className="group flex items-center gap-1 p-3 font-semibold rounded-md  relative overflow-hidden"
            style={{
              backgroundColor: buttonTheme?.bgColor || "#FFA700",
              color: buttonTheme?.textColor || "black",
              borderColor:
                buttonTheme?.buttonBorderColor || "#F5F6F5",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                buttonTheme?.hoverBgColor || "#ffe760ff";
              e.currentTarget.style.color =
                buttonTheme?.hoverTextColor || "black";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                buttonTheme?.bgColor || "#FFA700";
              e.currentTarget.style.color =
                buttonTheme?.textColor || "black";
            }}
          >
            <span className="absolute left-[-20px] opacity-0 group-hover:left-2 group-hover:opacity-100 transition-all duration-300 ease-in-out">
              <FaArrowRight style={{ color: buttonTheme?.textColor }} />
            </span>
            <span className="ml-2 group-hover:pl-2 transition-all duration-300 ease-in-out">{text}</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Partners;











