import React, { useEffect, useState } from 'react';
import { Typography, Spinner } from '@material-tailwind/react';
import { motion } from 'framer-motion';
import aboutUsImage from '../../../../assets/carousel5.jpg';
import { useParams } from 'react-router-dom';
import AxiosRequest from '../../../AxiosRequest/AxiosRequest';

const AboutUs = () => {
  const currentPath = window.location.pathname;
  const { category } = useParams(); // optional if you want dynamic categories

  const [aboutUs, setAboutUs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [title, setTitle] = useState("HOW YOU CAN HELP");
  const [description, setDescription] = useState(
    "There are so many ways you can help us in our mission"
  );
  const [theme, setTheme] = useState(null);

  const fetchTheme = async () => {
    try {
      const res = await AxiosRequest.get("/api/colors/about-us");
      if (res.status === 200) setTheme(res.data);
    } catch (error) {
      console.error("Error fetching theme:", error);
    }
  };

  const fetchInfo = async () => {
    try {
      const res = await AxiosRequest.get("/api/section-info/about-us");
      if (res.status === 200) {
        const data = res.data;
        setTitle(data.title || "About Us");
        setDescription(
          data.description ||
          ""
        );
      }
    } catch (error) {
      console.error("Error fetching info:", error);
    }
  };

  useEffect(() => {
    const fetchAboutUs = async () => {
      try {
        const response = await AxiosRequest.get(`/api/about/getAbout/About`);
        // console.log(response.data);
        setAboutUs(response.data.aboutUs);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch About Us data.');
      } finally {
        setLoading(false);
      }
    };

    fetchAboutUs();
  }, [category]);

  useEffect(() => {
    fetchInfo();
    fetchTheme();
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center bg-white font-poppins items-center min-h-screen">
        <Spinner className="h-12 w-12 text-black" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Typography variant="h4" color="red">{error}</Typography>
      </div>
    );
  }


  const cardTheme = theme?.config.cards?.[0];
  const buttonTheme = theme?.config.buttons?.[0];
  const textTheme = theme?.config.text;

  return (
    <div className="flex flex-col justify-center items-center font-poppins h-fit py-8 "

      style={{
        backgroundColor: theme?.config.background.sectionBgColor || "#F6F1EE",
      }}

    >
      <Typography
        variant="h3"
        className="mb-4 flex justify-between items-center font-bold text-start w-full lg:p-5 uppercase tracking-wide"
        style={{ color: textTheme?.headingColor || "teal" }}
      >
        {title}
        <div className="w-fit h-fit hidden md:flex gap-1 text-base rounded-md"
        style={{ color: textTheme?.paragraphColor || "gray" }}
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
              href="/news"
              className="hover:underline"
              style={{
                color:
                  currentPath === "/about-us"
                    ? textTheme?.headingColor || "teal"
                    : textTheme?.paragraphColor || "teal",
                textDecoration: currentPath === "/about-us" ? "underline" : "none",
              }}
            >
              About Us
            </a>
        </div>
      </Typography>

      <Typography variant="body1" className="w-full px-4 mb-4 text-start"
        style={{ color: textTheme?.paragraphColor || "black" }}
      >
        {description}
      </Typography>

      <div className="flex flex-col md:flex-row items-center w-full gap-10 rounded-lg p-8"
       style={{
                backgroundColor: cardTheme?.bgColor || "white",
              }}
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2 space-y-4"
        >
          <Typography
            variant="h3"
            className="font-bold text-start uppercase tracking-wide"
             style={{
                    color: cardTheme?.headingColor || "teal",
                  }}
          >
            {aboutUs?.title || 'Who Are We'}
            <div className="w-20 h-1 rounded-md"
             style={{
                    backgroundColor: cardTheme?.specialLineColor || "gold",
                  }}
            ></div>
          </Typography>

          <Typography className="text-lg text-justify leading-relaxed whitespace-pre-line"
           style={{
                    color: cardTheme?.descriptionColor || "black",
                  }}
          >
            {aboutUs?.description || 'No information available.'}
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <img
            src={aboutUs?.imgUrl || aboutUsImage}
            alt={aboutUs?.title || 'About Us Image'}
            className="w-full max-w-lg rounded-lg shadow-lg"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
