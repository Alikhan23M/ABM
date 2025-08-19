import React, { useEffect, useState } from "react";
import {
 FaRocket,
  FaUsers,
  FaChartLine,
  FaDatabase,
  FaLink,
  FaCalendarAlt,
  FaTasks,
  FaNewspaper,
  FaBriefcase,
  FaCogs,
  FaSmile,
  FaCheck,
  FaCheckDouble,
  FaShieldAlt,
  FaStar,
  FaHandHolding,
  FaGrinHearts,
  FaHandsHelping,
  FaDonate,
  FaBullhorn,
  FaGlobe,
  FaHeart,

} from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { GiHeartWings } from "react-icons/gi";
import { MdVolunteerActivism } from "react-icons/md";
import AxiosRequest from "../../../AxiosRequest/AxiosRequest";

// Map icon names to actual components
const iconMap = {
   FaRocket,
  FaUsers,
  FaChartLine,
  FaDatabase,
  FaLink,
  FaCalendarAlt,
  FaTasks,
  FaNewspaper,
  FaBriefcase,
  FaCogs,
  FaSmile,
  FaCheck,
  FaCheckDouble,
  FaShieldAlt,
  FaStar,
  FaHandHolding,
  FaGrinHearts,
  FaHandsHelping,
  FaDonate,
  FaBullhorn,
  FaGlobe,
  FaHeart,
  IoPersonSharp,
  MdVolunteerActivism
};

// Test data (fallback)
const defaultHelpOptions = [
  {
    id: 1,
    title: "Join us For the Best Events for happiness",
    description:
      "Be a part of our joyful events that bring happiness to communities and make a difference.",
    buttonText: "Join Now",
    buttonLink: "#",
    icon: "FaRocket",
  },
  {
    id: 2,
    title: "Become a Volunteer",
    description:
      "Lend your time and skills to help those in need and create a meaningful impact.",
    buttonText: "Get Involved",
    buttonLink: "#",
    icon: "IoPersonSharp",
  },
  {
    id: 3,
    title: "Support Our Cause",
    description:
      "Your generous contributions help us continue our mission and change lives for the better.",
    buttonText: "Donate Now",
    buttonLink: "#",
    icon: "FaDonate",
  },
  {
    id: 4,
    title: "Spread Awareness",
    description:
      "Help us reach more people by sharing our cause and advocating for a better world.",
    buttonText: "Share Now",
    buttonLink: "#",
    icon: "FaBullhorn",
  },
];

function HowCanHelp() {
  const [helpOptions, setHelpOptions] = useState([]);
  const [title, setTitle] = useState("HOW YOU CAN HELP");
  const [description, setDescription] = useState(
    "There are so many ways you can help us in our mission"
  );
  const [theme, setTheme] = useState(null);

  const fetchTheme = async () => {
    try {
      const res = await AxiosRequest.get("/api/colors/how-you-can-help");
      if (res.status === 200) setTheme(res.data);
    } catch (error) {
      console.error("Error fetching theme:", error);
    }
  };

  const fetchInfo = async () => {
    try {
      const res = await AxiosRequest.get("/api/section-info/how-you-can-help");
      if (res.status === 200) {
        const data = res.data;
        setTitle(data.title || "HOW YOU CAN HELP");
        setDescription(
          data.description ||
            "There are so many ways you can help us in our mission"
        );
      }
    } catch (error) {
      console.error("Error fetching info:", error);
    }
  };

  useEffect(() => {
    AxiosRequest.get("/api/help-options/getHelpOptions")
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setHelpOptions(res.data);
        } else {
          setHelpOptions(defaultHelpOptions);
        }
      })
      .catch(() => {
        setHelpOptions(defaultHelpOptions);
      });

    fetchInfo();
    fetchTheme();
  }, []);

  const cardTheme = theme?.config.cards?.[0];
  const buttonTheme = theme?.config.buttons?.[0];
  const textTheme = theme?.config.text;
  

  return (
    <div
      className="h-auto p-4"
      style={{
        backgroundColor: theme?.config.background.sectionBgColor || "#0F766E",
      }}
    >
      {/* Heading Section */}
      <div className="flex flex-col items-center space-y-1 text-center">
        <p
          className="font-bold text-4xl"
          style={{ color: textTheme?.headingColor || "white" }}
        >
          {title}
        </p>
        <p
          className="font-semibold"
          style={{ color: textTheme?.paragraphColor || "white" }}
        >
          {description}
        </p>
        <div
          className="h-1 w-[7vw] rounded-md"
          style={{
            backgroundColor: textTheme?.highlightedTextColor || "#FFA700",
          }}
        ></div>
      </div>

      {/* Main Content Section */}
      <div className="w-[97%] mt-4 mx-auto flex flex-wrap gap-3 items-center justify-evenly">
        {helpOptions.map((item) => {
          const IconComponent = iconMap[item.icon] || IoPersonSharp;

          return (
            <div
              key={item._id || item.id}
              className="flex items-center justify-evenly p-4 w-full sm:w-[48%] rounded-md shadow-sm h-auto min-h-[10rem]"
              style={{
                backgroundColor: cardTheme?.bgColor || "#0F766E",
                border: `1px solid ${cardTheme?.borderColor || "#0bb5a7ff"}`,
                boxShadow: `0 2px 6px ${cardTheme?.borderColor || "rgba(0,0,0,0.1)"}`,
              }}
            >
              {/* Icon */}
              <div className="text-7xl sm:text-9xl">
                <IconComponent
                  style={{
                    color: cardTheme?.iconColor || "#FFA700",
                  }}
                />
              </div>

              {/* Text Content */}
              <div className="flex flex-col items-start justify-evenly space-y-2 w-[70%]">
                <h1
                  className="font-semibold text-lg text-start"
                  style={{
                    color: cardTheme?.headingColor || "white",
                  }}
                >
                  {item.title}
                </h1>

                <p
                  className="text-wrap text-start text-sm"
                  style={{
                    color: cardTheme?.descriptionColor || "white",
                  }}
                >
                  {item.description}
                </p>

                <a
                  href={item.buttonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button
                    className="border px-2 py-1 rounded-md transition-colors duration-300"
                    style={{
                      backgroundColor: cardTheme?.button.bgColor || "0F766E",
                      color: cardTheme?.button.textColor || "white",
                      borderColor:
                        buttonTheme?.buttonBorderColor || "white",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        cardTheme?.button.hoverBgColor || "white";
                      e.currentTarget.style.color =
                        cardTheme?.button.hoverTextColor || "#0F766E";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        cardTheme?.button.bgColor || "#0F766E";
                      e.currentTarget.style.color =
                        cardTheme?.button.textColor || "white";
                    }}
                  >
                    {item.buttonText}
                  </button>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HowCanHelp;

