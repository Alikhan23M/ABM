import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import AxiosRequest from "../AxiosRequest/AxiosRequest";
import { Link, useNavigate } from "react-router-dom";
import { use } from "react";
import { color } from "framer-motion";
const Slideshow = () => {
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('Our Events');
  const [description, setDescription] = useState(null);
  const [link, setLink] = useState('/events');
  const [text, setText] = useState('See All Events');

  const [theme, setTheme] = useState(null);

  const fetchTheme = async () => {
    try {
      const res = await AxiosRequest.get("/api/colors/home-events");
      if (res.status === 200) setTheme(res.data);
    } catch (error) {
      console.error("Error fetching theme:", error);
    }
  };

  const fetchInfo = async () => {
    const response = await AxiosRequest.get('/api/section-info/home-events');
    if (response.status === 200) {
      setTitle(response.data.title);
      setDescription(response.data.description);
      setText(response.data.buttonText);
      setLink(response.data.buttonLink);
    }
  }
  const navigate = useNavigate();
  // Fetch event data from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await AxiosRequest.get("/api/events/events");
        console.log("API Response:", response.data);

        if (Array.isArray(response.data)) {
          setEvents(response.data);
        } else {
          setError("Unexpected API response format");
          setEvents([]);
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Error fetching events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();

  }, []);

  // Dynamically update items per view based on screen size
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

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(events.length / itemsPerView));
    }, 4000);
    return () => clearInterval(interval);
  }, [events, itemsPerView]);

  useEffect(() => {
    fetchInfo();
    fetchTheme();
  }, [])

  const cardTheme = theme?.config.cards?.[0];
  const buttonTheme = theme?.config.buttons?.[0];
  const textTheme = theme?.config.text;
  return (
    <div className="w-full flex flex-col items-center" style={{
      backgroundColor: theme?.config.background.sectionBgColor || "white",
    }}>
      {/* Section Title */}
      <div className="text-center">
        <h1 className="text-3xl font-semibold mt-3" style={{ color: textTheme?.headingColor || "black" }}>{title}</h1>
        <div className="h-1 w-[150px] rounded-md mx-auto mt-3" style={{
          backgroundColor: textTheme?.highlightedTextColor || "#FFA700",
        }}></div>
      </div>

      {/* Description if not null */}

      {description && (
        <div className="max-w-2xl mx-auto text-center mt-4 px-4">
          <p className="text-lg" style={{ color: textTheme?.paragraphColor || "gray" }}>{description}</p>
        </div>
      )}

      {/* Show Loading or Error Message */}
      {loading ? (
        <p className="text-center" style={{ color: textTheme?.paragraphColor || "black" }}>Loading events...</p>
      ) : error ? (
        <p className="text-center " style={{ color: textTheme?.paragraphColor || "black" }}>{error}</p>
      ) : events.length === 0 ? (
        <p className="text-center " style={{ color: textTheme?.paragraphColor || "gray" }}>No events available</p>
      ) : (
        <>
          {/* Slideshow Container */}
          <div className="relative w-full mx-auto overflow-hidden mt-6">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {events.map((event, index) => (
                <div key={index} className="flex justify-center p-4" style={{ minWidth: `${100 / itemsPerView}%` }}>
                  <div className="relative w-full max-w-sm rounded-lg shadow-lg overflow-hidden group">
                    <img src={event.images[0]} alt={event.title} className="cursor-pointer w-full h-56 object-cover"
                      onClick={() => navigate('/gallery', { state: { eventId: event._id } })}
                    />

                    {/* Hover Effect on Title */}
                    <div className="absolute z-10 bottom-0 left-0 right-0 text-center flex items-center justify-center h-[4rem] transition-all duration-300 hover:h-[5rem]" style={{ backgroundColor: cardTheme?.bgColor || "#0F766E", color: cardTheme?.descriptionColor || 'gray' }}>
                      <h3 className="text-lg font-medium w-fit transition-transform duration-300 hover:scale-105 cursor-pointer"
                        onClick={() => navigate('/gallery', { state: { eventId: event._id } })}

                        style={{ color: cardTheme?.headingColor || 'white' }}
                      >
                        {event.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-4">
            {Array.from({ length: Math.ceil(events.length / itemsPerView) }).map((_, index) => (
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

      {/* See All Events Button */}
      <div className="my-6">
        <Link to={link}>
          <button className="group flex items-center gap-1  p-3 font-semibold rounded-md relative overflow-hidden"
            style={{
              backgroundColor: buttonTheme?.bgColor || "#FFA700",
              color: buttonTheme?.textColor || "black",
              borderColor:
                buttonTheme?.buttonBorderColor || "white",
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
            <span className="absolute left-[-20px] opacity-0 group-hover:left-2 group-hover:opacity-100 transition-all duration-300">
              <FaArrowRight style={{ color: buttonTheme?.textColor }} />
            </span>
            <span className="ml-2 group-hover:pl-2 transition-all duration-300">{text}</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Slideshow;
