import React, { useState, useEffect } from "react";
import { FaArrowRight, FaRegCalendarAlt } from "react-icons/fa";
import AxiosRequest from "../AxiosRequest/AxiosRequest";
import { Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";

const NewsSection = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('NEWS & PUBLICATIONS');
  const [description, setDescription] = useState(null);
  const [link, setLink] = useState('/news');
  const [text, setText] = useState('See All News');

  const [theme, setTheme] = useState(null);

  const fetchTheme = async () => {
    try {
      const res = await AxiosRequest.get("/api/colors/home-news-and-publicactions");
      if (res.status === 200) setTheme(res.data);
    } catch (error) {
      console.error("Error fetching theme:", error);
    }
  };

  const fetchInfo = async () => {
    const response = await AxiosRequest.get('/api/section-info/home-news-and-publicactions');
    if (response.status === 200) {
      setTitle(response.data.title);
      setDescription(response.data.description);
      setText(response.data.buttonText);
      setLink(response.data.buttonLink);
    }
  }
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await AxiosRequest.get("https://abm-wbw0.onrender.com/api/news/news");
        console.log("API Response:", response.data);

        if (Array.isArray(response.data)) {
          setNews(response.data);
        } else {
          setError("Unexpected API response format");
          setNews([]);
        }
      } catch (err) {
        console.error("Error fetching news articles:", err);
        setError("Error fetching news articles");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
    fetchInfo();
    fetchTheme();
  }, []);

  const cardTheme = theme?.config.cards?.[0];
  const buttonTheme = theme?.config.buttons?.[0];
  const textTheme = theme?.config.text;

  return (
    <div className="text-white py-10 px-5" style={{
      backgroundColor: theme?.config.background.sectionBgColor || "#0F766E",
    }}>
      <h2 className="text-center text-3xl font-bold mb-4" style={{ color: textTheme?.headingColor || "white" }}>{title}</h2>

      {/* Description if not null */}

      {description && (
        <div className="max-w-2xl mx-auto  text-center mt-4 mb-6 px-4">
          <p className="text-lg" style={{ color: textTheme?.paragraphColor || "white" }}>{description}</p>
        </div>
      )}

      {loading ? (
        <p className="text-center text-gray-300">Loading news...</p>
      ) : error ? (
        <p className="text-center text-red-400">{error}</p>
      ) : news.length === 0 ? (
        <p className="text-center text-gray-300">No news articles available</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {news.map((article) => (
            <div
              key={article.id}
              className="flex flex-col text-black rounded-lg shadow-lg overflow-hidden h-full"
              style={{ backgroundColor: cardTheme?.bgColor || "white",color:cardTheme?.descriptionColor || "gray" }}
            >
              {/* Fixed height for image */}
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-48 object-fill"
              />

              {/* Content area that grows and fills */}
              <div className="flex flex-col justify-between p-4 flex-grow">
                <div>
                  <h3 className="font-bold text-lg text-start"
                  style={{color: cardTheme?.headingColor || "gray"}}
                  >{article.title}</h3>
                </div>



                {/* Read More Button at bottom */}
                <div className="flex flex-col">
                  <Typography variant="body2" className="text-gray-800 flex items-center gap-2 py-2"
                  style={{color:cardTheme?.specialLineColor|| "gray"}}
                  >
                    <FaRegCalendarAlt style={{color:cardTheme?.iconColor || "#FFA700"}} />{" "}
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </Typography>
                  <Link to={`/news#${article._id}`} className="mt-4 self-start">
                    <button className="font-bold border-2  rounded-3xl py-[6px] px-4   hover:transition-all" style={{
                      backgroundColor: cardTheme?.button.bgColor || "#FFA700",
                      color: cardTheme?.button.textColor || "black",
                      borderColor:
                        buttonTheme?.buttonBorderColor || "white",
                    }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          cardTheme?.button.hoverBgColor || "#ffe760ff";
                        e.currentTarget.style.color =
                          cardTheme?.button.hoverTextColor || "black";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          cardTheme?.button.bgColor || "#ffe760ff";
                        e.currentTarget.style.color =
                          cardTheme?.button.textColor || "black";
                      }}
                    >
                      Read More
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-6">
        <Link to={link}>
          <button className="group flex items-center gap-1  p-3 font-semibold rounded-md  relative overflow-hidden" style={{
            backgroundColor: buttonTheme?.bgColor || "#FFA700",
            color: buttonTheme?.textColor || "black",
            borderColor:
              buttonTheme?.buttonBorderColor || "#0F766E",
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
            }}>
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

export default NewsSection;
