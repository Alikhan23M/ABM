import React, { useEffect, useState } from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaEnvelope, FaPhone, FaTwitter } from "react-icons/fa";
import "@fontsource/montserrat";
import AxiosRequest from '../../AxiosRequest/AxiosRequest';

function Upheader() {
  const [siteInfo, setSiteInfo] = useState({});
  const [contactInfo, setContactInfo] = useState([]);
  const [theme, setTheme] = useState(null);

  const fetchTheme = async () => {
    try {
      const res = await AxiosRequest.get("/api/colors/up-header");
      if (res.status === 200) setTheme(res.data);
    } catch (error) {
      console.error("Error fetching theme:", error);
    }
  };

  useEffect(() => {
    const infodata = async () => {
      try {
        const response = await AxiosRequest.get("/api/siteinfo");
        if (response.data) {
          setSiteInfo(response.data);
        }
      } catch (error) {
        console.error("Error fetching contact details:", error);
      }
    };
    infodata();
    fetchTheme();

    const contactData = async () => {
      try {
        const response = await AxiosRequest.get("/api/contactus");
        if (response.data) {
          setContactInfo(response.data);
        }
      } catch (error) {
        console.error("Error fetching contact details:", error);
      }
    };
  }, []);

  const cardTheme = theme?.config?.cards?.[0];
  const bgColor = cardTheme?.bgColor || "gold";
  const iconColor = cardTheme?.iconColor || "white";
  const iconHoverColor = cardTheme?.specialLineColor || "black";

  return (
    <div
      className="justify-between items-center w-full p-1 hidden md:flex"
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex justify-between items-center gap-4 p-2">
        <a href={siteInfo.facebookURL} target="_blank">
          <FaFacebook
            className="hover:cursor-pointer text-md"
            style={{ color: iconColor }}
            onMouseEnter={e => (e.currentTarget.style.color = iconHoverColor)}
            onMouseLeave={e => (e.currentTarget.style.color = iconColor)}
          />
        </a>
        <a href={siteInfo.instagramURL} target="_blank">
          <FaInstagram
            className="hover:cursor-pointer text-md"
            style={{ color: iconColor }}
            onMouseEnter={e => (e.currentTarget.style.color = iconHoverColor)}
            onMouseLeave={e => (e.currentTarget.style.color = iconColor)}
          />
        </a>
        <a href={siteInfo.twitterURL} target="_blank">
          <FaTwitter
            className="hover:cursor-pointer text-md"
            style={{ color: iconColor }}
            onMouseEnter={e => (e.currentTarget.style.color = iconHoverColor)}
            onMouseLeave={e => (e.currentTarget.style.color = iconColor)}
          />
        </a>
        <a href={siteInfo.linkedinURL} target="_blank">
          <FaLinkedin
            className="hover:cursor-pointer text-md"
            style={{ color: iconColor }}
            onMouseEnter={e => (e.currentTarget.style.color = iconHoverColor)}
            onMouseLeave={e => (e.currentTarget.style.color = iconColor)}
          />
        </a>
        <a href={siteInfo.youtubeURL} target="_blank">
          <FaYoutube
            className="hover:cursor-pointer text-md"
            style={{ color: iconColor }}
            onMouseEnter={e => (e.currentTarget.style.color = iconHoverColor)}
            onMouseLeave={e => (e.currentTarget.style.color = iconColor)}
          />
        </a>
        <a href={`mailto:${contactInfo.email}`}>
          <FaEnvelope
            className="hover:cursor-pointer text-md"
            style={{ color: iconColor }}
            onMouseEnter={e => (e.currentTarget.style.color = iconHoverColor)}
            onMouseLeave={e => (e.currentTarget.style.color = iconColor)}
          />
        </a>
        <a href={`tel:${contactInfo.phone}`} target="_blank">
          <FaPhone
            className="hover:cursor-pointer text-md"
            style={{ color: iconColor }}
            onMouseEnter={e => (e.currentTarget.style.color = iconHoverColor)}
            onMouseLeave={e => (e.currentTarget.style.color = iconColor)}
          />
        </a>
      </div>
      
{/* <div className=''>
         <a href="#" className='bg-teal-800 p-2 text-white border-[2px] border-white rounded-sm  md:text-sm font-semibold hover:bg-yellow-700 hover:border-teal-800 hover:text-teal-800 '>CLICK HERE TO CHECK OUT ABM Pakistan US WEBSITE </a>

      </div> */}
    </div>
  );
}

export default Upheader;
