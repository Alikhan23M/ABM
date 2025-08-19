import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import image1 from '../../../assets/card1.jpg';
import image2 from '../../../assets/card2.png';
import image3 from '../../../assets/card3.jpg';
import { Link } from 'react-router-dom';
import AxiosRequest from '../../AxiosRequest/AxiosRequest';
// import { Link, Navigate } from 'react-router-dom';

const BodyCard = () => {
  // Example data for cards
  // const cardsData = [
  //   {
  //     id: 1,
  //     img: image1,
  //     title: "Message from Executive Director",
  //     content: "On Behalf of Vet Cohort and ABM Community, I warmly welcome you to our website....",
  //     link: "/message-from-executive-director"
  //   },
  //   {
  //     id: 2,
  //     img: image2,
  //     title: "Vision and Mission",
  //     content: "Safe and secure handling of hazardous biological material in Pakistan....",
  //     link: "/vision-&-mission" // Example link for card 2
  //   },
  //   {
  //     id: 3,
  //     img: image3,
  //     title: "ABM Team",
  //     content: "Our team is our strength, having young, qualified and experienced veterinarians & microbiologists, who are continuously contributing to the institutionalization of BRM best practices in the research & diagnostic laboratories....",
  //     link: "/abm-team" // Example link for card 3
  //   }
  // ];

  const [cardsData, setCardsData] = useState([]);
  const [title, setTitle] = useState(null);
const [theme, setTheme] = useState(null);

  const fetchTheme = async () => {
    try {
      const res = await AxiosRequest.get("/api/colors/body-cards");
      if (res.status === 200) setTheme(res.data);
    } catch (error) {
      console.error("Error fetching theme:", error);
    }
  };
  const fetchInfo = async () => {
    try {
      const response = await AxiosRequest.get('/api/section-info/body-cards');
      if (response.status === 200) {
        setTitle(response.data.title);
        setDescription(response.data.description);
      }
      else {
        console.log('Error fetech data', response);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const [description, setDescription] = useState(null);

  useEffect(() => {

    const fetchCards = async () => {
      try {
        const response = await AxiosRequest.get('/api/bodycards');
        setCardsData(response.data);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards();
    fetchInfo();
    fetchTheme();
  }, []);


  const cardTheme = theme?.config.cards?.[0];
  const buttonTheme = theme?.config.buttons?.[0];
  const textTheme = theme?.config.text;

  return (
    <div className="flex flex-col justify-center items-center w-full p-6 sm:p-8"
    style={{
        backgroundColor: theme?.config.background.sectionBgColor || "",
      }}
    >
      {/* Heading */}
      {title&&(<div className="space-y-2 text-center self-center">
        <h1 className="font-bold text-4xl border-b-4" style={{ color: textTheme?.headingColor || "black",borderColor:textTheme?.highlightedTextColor }}>{title}</h1>
        {/* <div className="w-[5vw] bg-yellow-700 h-1 rounded-sm mx-auto"></div> */}
      </div>)}

      {/* Description if not null */}

      {description && (
        <div className="max-w-2xl mx-auto text-center mt-4 px-4">
          <p className="text-lg"  style={{ color: textTheme?.paragraphColor || "black" }}>{description}</p>
        </div>
      )}
       <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4">
      {cardsData.map((card) => (
        <div
          key={card._id}
          className="flex flex-col justify-between  shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden max-w-[24rem] mx-auto h-full"
          style={{
                backgroundColor: cardTheme?.bgColor || "white",
                border: `1px solid ${cardTheme?.borderColor || "teal"}`,
                
              }}
        >
          <img
            src={card.image}
            alt={card.title}
            className="object-fill w-full h-80"
          />

          <div className="flex flex-col justify-between flex-grow p-4">
            <div>
              <h2 className="text-xl font-semibold mb-2 min-h-[3rem]"  style={{
                    color: cardTheme?.headingColor || "#0F766E",
                  }}>
                {card.title}
              </h2>
              <p className="text-base mb-4 min-h-[6rem]" style={{
                    color: cardTheme?.descriptionColor || "black",
                  }}>
                {card.description}
              </p>
            </div>

            <div className="flex justify-center">
              <a href={card.url}>
                <button className=" px-4 py-2 rounded-md transition-colors duration-200" 
                 style={{
                      backgroundColor: cardTheme?.button.bgColor || "#FFA700",
                      color: cardTheme?.button.textColor || "black",
                      borderColor:
                        buttonTheme?.buttonBorderColor || "transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        cardTheme?.button.hoverBgColor || "#ffe760ff";
                      e.currentTarget.style.color =
                        cardTheme?.button.hoverTextColor || "black";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        cardTheme?.button.bgColor || "#FFA700";
                      e.currentTarget.style.color =
                        cardTheme?.button.textColor || "black";
                    }}
                  >
                
                  Read More
                </button>
              </a>
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}

export default BodyCard;
