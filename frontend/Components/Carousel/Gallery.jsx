import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import AxiosRequest from "../AxiosRequest/AxiosRequest";
import { Link } from "react-router-dom";

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('Our Gallery');
  const [description, setDescription] = useState(null);
  const [link, setLink] = useState('/gallery');
  const [text, setText] = useState('See All Gallery');
  const [theme, setTheme] = useState(null);

  const fetchTheme = async () => {
    try {
      const res = await AxiosRequest.get("/api/colors/home-gallery");
      if (res.status === 200) setTheme(res.data);
    } catch (error) {
      console.error("Error fetching theme:", error);
    }
  };

  const fetchInfo = async () => {
    const response = await AxiosRequest.get('/api/section-info/home-gallery');
    if (response.status === 200) {
      setTitle(response.data.title);
      setDescription(response.data.description);
      setLink(response.data.buttonLink);
      setText(response.data.buttonText);
    }
  }


  useEffect(() => {
    const fetchPictures = async () => {
      try {
        const response = await AxiosRequest.get("https://abm-wbw0.onrender.com/api/pictures/pictures");
        console.log("*** Full API Response:", response.data);

        if (Array.isArray(response.data)) {
          const imageUrls = response.data.map(item => ({
            src: item.imageUrl,
            title: item.title || "Gallery Image"
          }));
          setPictures(imageUrls);
        } else {
          console.error("Unexpected API response format:", response.data);
          setPictures([]);
        }
      } catch (err) {
        console.error("Error fetching pictures:", err);
        setPictures([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPictures();
    fetchInfo();
    fetchTheme();
  }, []);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 1 >= Math.ceil(pictures.length / itemsPerView) ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [itemsPerView, pictures.length]);

  const cardTheme = theme?.config.cards?.[0];
  const buttonTheme = theme?.config.buttons?.[0];
  const textTheme = theme?.config.text;

  return (
    <div className="h-auto w-full p-4 flex flex-col items-center" style={{
        backgroundColor: theme?.config.background.sectionBgColor || "#F5F6F5",
      }}>
      {/* Section Title */}
      <div className="text-center">
        <h1 className=" text-3xl font-semibold" style={{ color: textTheme?.headingColor || "black" }}>{title}</h1>
        <div className="h-1 w-[90px] rounded-md mx-auto mt-3"  style={{
            backgroundColor: textTheme?.highlightedTextColor || "#FFA700",
          }}></div>
      </div>


      {/* Description if not null */}

      {description && (
        <div className="max-w-2xl mx-auto text-center mt-4 px-4">
          <p className="text-lg"  style={{ color: textTheme?.paragraphColor || "gray" }}>{description}</p>
        </div>
      )}


      {/* Slideshow Container */}
      <div className="relative w-full mx-auto overflow-hidden mt-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : pictures.length === 0 ? (
          <p className="text-center text-gray-500">No images available</p>
        ) : (
          <>
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {pictures.map((image, index) => (
                <div
                  key={index}
                  className="flex justify-center p-4 flex-shrink-0"
                  style={{ width: `calc(100% / ${itemsPerView})` }}
                >
                  <div className="w-[30rem] h-56 bg-white rounded-lg shadow-lg overflow-hidden">
                    <img src={image.src} alt={image.title} className="w-full h-full object-fill" />
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Dots */}
           <div className="flex justify-center mt-4">
            {Array.from({ length: Math.ceil(pictures.length / itemsPerView) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="mx-1 w-8 h-1 rounded-full transition-all duration-300"
                style={{
                  backgroundColor:
                    currentIndex === index
                      ? cardTheme?.specialLineColor || "#FACC15" // default yellow-500
                      : cardTheme?.descriptionColor || "#D1D5DB", // default gray-300
                  width: currentIndex === index ? "3rem" : "2rem", // keep dynamic width
                }}
              />
            ))}
          </div>
          </>
        )}
      </div>

      {/* See All Programs Button */}
      <div className="group text-lg mt-8">
        <a href={link}>
          <button className="group flex items-center gap-1  p-3 font-semibold rounded-md relative overflow-hidden" 
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
              <FaArrowRight />
            </span>
            <span className="ml-2 group-hover:pl-2 transition-all duration-300 ease-in-out">{text}</span>
          </button>
        </a>
      </div>
    </div>
  );
};

export default Slideshow;
