import React, { useEffect, useState } from "react";
import AxiosRequest from "../AxiosRequest/AxiosRequest";

const Newsletter = () => {
  const [theme, setTheme] = useState(null);
  const [title, setTitle] = useState('Our News Letter');
  const [description, setDescription] = useState("Sign up now to receive our newsletter.");
 

  const fetchTheme = async () => {
    try {
      const res = await AxiosRequest.get("/api/colors/home-news-letter");
      if (res.status === 200) setTheme(res.data);
    } catch (error) {
      console.error("Error fetching theme:", error);
    }
  };

   const fetchInfo = async () => {
    const response = await AxiosRequest.get('/api/section-info/home-news-letter');
    if (response.status === 200) {
      setTitle(response.data.title);
      setDescription(response.data.description);
      
    }
  }

  useEffect(() => {
    fetchTheme();
    fetchInfo();
  }, [])

  // const cardTheme = theme?.config.cards?.[0];
  const buttonTheme = theme?.config.buttons?.[0];
  const textTheme = theme?.config.text;
  const inputTheme = theme?.config.inputFields;
  return (
    <div className="py-10 text-center w-full" style={{
        backgroundColor: theme?.config.background.sectionBgColor || "#FFA700",
      }}>

      <h2 className="text-3xl font-bold" style={{ color: textTheme?.headingColor || "white" }}>{title}</h2>

      <div className="w-32 rounded-md h-1 mx-auto my-2"   style={{
            backgroundColor: textTheme?.highlightedTextColor || "white",
          }}></div>

      <p className="font-semibold mb-4" style={{ color: textTheme?.paragraphColor || "white" }}>{description}</p>

      <div className="flex justify-center items-center text-sm  mx-auto gap-3">
        <input
          type="email"
          placeholder="Email Address"
          className="px-4 py-1 w-[40vw] rounded-md focus:outline-none"
          style={{
            backgroundColor: inputTheme?.bgColor || "white",
            color:inputTheme?.textColor,
            borderColor:inputTheme?.borderColor
          }}
        />
        <button className="px-3 py-1 rounded-md  transition"
          style={{
                      backgroundColor: buttonTheme?.bgColor || "green",
                      color: buttonTheme?.textColor || "white",
                      borderColor:
                        buttonTheme?.buttonBorderColor || "#FFA700",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        buttonTheme?.hoverBgColor || "#59de00ff";
                      e.currentTarget.style.color =
                        buttonTheme?.hoverTextColor || "white";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        buttonTheme?.bgColor || "green";
                      e.currentTarget.style.color =
                        buttonTheme?.textColor || "white";
                    }}
        >
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default Newsletter;
