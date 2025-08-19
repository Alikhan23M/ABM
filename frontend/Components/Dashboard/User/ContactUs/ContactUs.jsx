import React, { useEffect, useState } from 'react';
import { Card, Typography, Spinner } from '@material-tailwind/react';
import { FaAdjust, FaArrowRight } from 'react-icons/fa';
import AxiosRequest from '../../../AxiosRequest/AxiosRequest';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const ContactUs = () => {
  const currentPath = window.location.pathname;

  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  const [title, setTitle] = useState("Contact Us");
  const [description, setDescription] = useState(null);
  const [theme, setTheme] = useState(null);

  const fetchTheme = async () => {
    try {
      const res = await AxiosRequest.get("/api/colors/contact-us");
      if (res.status === 200) setTheme(res.data);
    } catch (error) {
      console.error("Error fetching theme:", error);
    }
  };
  const fetchInfo = async () => {
    const response = await AxiosRequest.get('/api/section-info/contact-us');
    if (response.status === 200) {
      setTitle(response.data.title);
      setDescription(response.data.description);
    }
  };

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await AxiosRequest.get('/api/contactus/');
        setContactInfo(response.data);
      } catch (error) {
        setError('Error fetching contact information');
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
    fetchInfo();
    fetchTheme();
  }, []);

  const handleEmailClick = () => {
    if (contactInfo?.email) {
      window.open(`mailto:${contactInfo.email}`);
    } else {
      toast.error('No email address available');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F6F1EE]">
        <Spinner className="h-12 w-12 text-black" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F6F1EE]">
        <Typography variant="h4" color="red">{error}</Typography>
      </div>
    );
  }


  const cardTheme = theme?.config.cards?.[0];
  const buttonTheme = theme?.config.buttons?.[0];
  const textTheme = theme?.config.text;
  return (
    <div className="flex flex-col items-center justify-start h-full  font-poppins"
      style={{
        backgroundColor: theme?.config.background.sectionBgColor || "#F5F6F5",
      }}

    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full text-center"
      >
        <Typography variant="h3" className="flex justify-between items-center font-bold text-start w-full lg:p-5 uppercase tracking-wide"
        style={{ color: textTheme?.headingColor || "teal" }}
        >
          {title}
          <div className="w-fit h-fit hidden md:flex gap-1 text-base rounded-md"
            style={{ color: textTheme?.highlightedTextColor || "gray" }}
          >
            <a
              href="/"
              className="hover:underline"
              style={{
                color:
                  currentPath === "/"
                    ? textTheme?.headingColor || "teal"
                    : textTheme?.paragraphColor || "gray",
                textDecoration: currentPath === "/" ? "underline" : "none",
              }}
            >
              Home
            </a>{" "} /

            <a
              href="/contact-us"
              className="hover:underline"
              style={{
                color:
                  currentPath === "/contact-us"
                    ? textTheme?.headingColor || "teal"
                    : textTheme?.paragraphColor || "teal",
                textDecoration: currentPath === "/contact-us" ? "underline" : "none",
              }}
            >
              Contact Us
            </a>
          </div>
        </Typography>
        {/* <div className="h-1 w-[4vw] bg-yellow-700 rounded-md mx-auto"></div> */}
        <Typography variant="body1" className="max-w-[70vw]  text-start px-6 mt-2 mb-4"
          style={{ color: textTheme?.paragraphColor || "gray" }}
        >
          {description}
        </Typography>
      </motion.div>

      <div className="grid gap-10 w-full p-3 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="w-full p-5 mb-3 rounded-md"
            style={{ backgroundColor: theme?.config.background.containerBgColor || "white" }}
          >
            <h1 className="md:text-4xl text-2xl font-bold"
              style={{ color: textTheme?.headingColor || "teal" }}
            >
              <span
                style={{ color: textTheme?.highlightedTextColor || "#FFA700" }}
              >CONTACT</span> INFORMATION
            </h1>

            <div className="flex flex-col md:flex-row items-center justify-around gap-3 my-8 space-y-8 md:space-y-0">
              {/* Address */}
              <ContactCard
                icon={<FaAdjust style={{
                  color: cardTheme?.iconColor || "teal",
                }} />}
                title="Address"

                content={contactInfo?.address || 'No address available'}
                theme={theme}



              />
              {/* Phone */}
              <ContactCard
                icon={<FaAdjust />}
                title="Contact"
                content={contactInfo?.phone || 'No contact number available'}
                 theme={theme}
              />
              {/* Email */}
              <ContactCard
                icon={<FaAdjust />}
                title="Email Us"
                 theme={theme}
                content={
                  <span
                    className="text-blue-600 cursor-pointer hover:underline"
                    onClick={handleEmailClick}
                  >
                    {contactInfo?.email || 'No email available'}
                  </span>
                }
              />
            </div>
          </div>



          {/* Contact Form */}
          <form className="w-full  p-4 rounded-md"
           style={{
                backgroundColor: theme?.config.cards[0].bgColor || "white",
                border: `1px solid ${theme?.config.cards[0].borderColor || "teal"}`,
                boxShadow: `0 2px 6px ${theme?.config.cards[0].borderColor || "rgba(0,0,0,0.1)"}`,
              }}
          >
            <h1 className="text-lg font-bold" 
             style={{
                    color: cardTheme?.headingColor || "black",
                  }}
            >Send us an Email</h1>
            <div className="h-1 w-16 rounded-md bg-yellow-700 mb-4"></div>

            <div>
              <p className="font-semibold" 
              style={{
                    color: cardTheme?.descriptionColor || "black",
                  }}
              >Name</p>


              <input type="text" className="mb-6 w-full border p-2 rounded-md" 
               style={{
            backgroundColor: theme?.config.inputFields[0].bgColor || "white",

            color: theme?.config.inputFields[0].textColor || "black",
            borderColor: theme?.config.inputFields[0].borderColor || "#FFA700"

          }}
              />

              <p className="font-semibold" 
              style={{
                    color: cardTheme?.descriptionColor || "black",
                  }}
              >Email</p>
              <input type="text" className="mb-6 w-full border p-2 rounded-md" 
               style={{
            backgroundColor: theme?.config.inputFields[0].bgColor || "white",

            color: theme?.config.inputFields[0].textColor || "black",
            borderColor: theme?.config.inputFields[0].borderColor || "#FFA700"

          }}
              />

              <p className="font-semibold" 
              style={{
                    color: cardTheme?.descriptionColor || "black",
                  }}
              >Message</p>
              <textarea className="w-full border p-2 rounded-md h-32"
                style={{
                  backgroundColor: theme?.config.inputFields[0].bgColor || "white",
                  color: theme?.config.inputFields[0].textColor || "black",
                  borderColor: theme?.config.inputFields[0].borderColor || "#FFA700"
                }}
              ></textarea>
            </div>

            <div className="flex justify-end mt-4">
              <button className="group flex items-center gap-1  p-2 font-semibold rounded-md  relative overflow-hidden"
              style={{
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
                        cardTheme?.button.bgColor || "#FFA700";
                      e.currentTarget.style.color =
                        cardTheme?.button.textColor || "black";
                    }}
              
              >
                <span className="absolute left-[-20px] opacity-0 group-hover:left-2 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                  <FaArrowRight />
                </span>
                <span className="ml-2 group-hover:pl-2 transition-all duration-300 ease-in-out">Submit</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

// Reusable Contact Card Component
const ContactCard = ({ icon, title, content,theme }) => (
  <div className="h-36 w-[17rem] md:w-1/3 flex flex-col items-center border-2 border-dotted  p-6 rounded-xl relative shadow-md"

    style={{
      backgroundColor: theme?.config.cards[0].bgColor || "white",
      border: `2px dotted ${theme?.config.cards[0].borderColor || "gold"}`,
    

    }}
  >
    {/* Icon Wrapper */}
    <div className="absolute -top-6 bg-white rounded-full px-2">
      <div className="border-2 border-dotted border-yellow-700 text-5xl p-2 rounded-full text-teal-700 shadow-md bg-white">
        {icon}
      </div>
    </div>

    {/* Content */}
    <h1 className="font-semibold text-lg mt-6 "
    style={{color: theme?.config.cards[0].headingColor || "#FFA700" }}
    
    >{title}</h1>
    <p className="text-sm text-center "
    
    style={{color: theme?.config.cards[0].descriptionColor || "black" }}
    >{content}</p>
  </div>
);

export default ContactUs;
