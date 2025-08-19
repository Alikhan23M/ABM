// import React, { useState,useEffect } from "react";
// import img from "../../../../../assets/card2.png";
// import { FaRegCalendarAlt } from "react-icons/fa";
// import { Card, Typography, Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
// import { motion } from "framer-motion";
// import AxiosRequest from "../../../../AxiosRequest/AxiosRequest";
// const News = () => {
//   const currentPath = window.location.pathname;
// const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [news, setNews] = useState([

//   ]);

//   const [selectedArticle, setSelectedArticle] = useState(null);
// useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const response = await AxiosRequest.get('https://abm-wbw0.onrender.com/api/news/news');
//         setNews(response.data);
//         console.log('API Response:', response.data);
//       } catch (err) {
//         setError('Error fetching news articles');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNews();
//   }, []);
//   const handleOpenDialog = (article) => {
//     setSelectedArticle(article);
//   };

//   const handleCloseDialog = () => {
//     setSelectedArticle(null);
//   };

//   const groupedNews = news.reduce((acc, article) => {
//     const date = new Date(article.publishedAt);
//     const key = `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`;

//     if (!acc[key]) {
//       acc[key] = [];
//     }
//     acc[key].push(article);
//     return acc;


//   }, {});

//   return (
//     <div className="flex flex-col items-center justify-start h-full bg-[#F6F1EE] font-poppins ">
//       <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full">
//         <Typography variant="h3" className="mb-4 text-teal-800 flex justify-between items-center font-bold text-start w-full lg:p-5 uppercase tracking-wide">
//                         News
//                         <div className="w-fit h-fit hidden md:flex gap-1 text-base text-gray-800 rounded-md">
//                             <a href="/" className={`hover:underline ${currentPath === '/' ? 'underline text-teal-800' : 'text-gray-600'}`}>
//                                 Home
//                             </a> {" "} / 
//                             <a href="/news" className={`hover:underline ${currentPath === '/news' ? 'underline text-teal-800' : 'text-gray-600'}`}>
//                                 News
//                             </a>
//                         </div>
//                     </Typography>
//       </motion.div>

//       {/* Timeline Container */}
//       <div className="relative p-8 h-full bg-white w-full mx-auto">
//         {/* Timeline Vertical Line */}
//         <div className="absolute hidden lg:flex left-1/2 transform -translate-x-1/2 w-[2px] bg-yellow-700 h-full"></div>

//         {Object.entries(groupedNews).map(([month, articles], index) => (
//           <div key={month} className="w-full flex flex-col items-center relative">
//             {/* Month Badge Centered on Timeline */}
//             <div className="absolute hidden lg:flex left-1/2 transform -translate-x-1/2 -top-4 w-[10%] text-center h-10  items-center justify-center bg-[#FCEABA] text-teal-800 font-semibold  rounded-md shadow-md text-lg">
//               {month}
//             </div>

//             {articles.map((article, idx) => (
//               <motion.div
//                 key={article._id}
//                 initial={{ opacity: 0, y: 50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.1 * idx, duration: 0.5 }}
//                 className={`w-full flex flex-col md:flex-row items-center justify-between mb-12 relative ${
//                   idx % 2 === 0 ? "md:flex-row-reverse" : ""
//                 }`}
//               >
//                 {/* Timeline Dot */}
//                <div className="absolute hidden lg:flex left-1/2 transform -translate-x-1/2 bg-yellow-700 h-4 w-4 rounded-full shadow-md"></div>

//                 {/* News Card */}
//                 <Card className="w-full border-yellow-800 border-dotted lg:w-[40%] shadow-lg rounded-lg bg-white border flex flex-col">
//                   {article.imageUrl && (
//                     <div className="overflow-hidden mb-4">
//                       <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-fill rounded-t-md" />
//                     </div>
//                   )}
//                   <Typography variant="h5" className="mb-2 text-teal-800 text-start font-bold px-6 py-2">
//                     {article.title}
//                   </Typography>
//                   <Typography variant="body2" className="mb-4 text-gray-800 flex items-center gap-2 px-6 py-2">
//                     <FaRegCalendarAlt className="text-yellow-700" /> {new Date(article.publishedAt).toLocaleDateString()}
//                   </Typography>
//                   <Typography variant="body1" className="text-black text-start font-semibold px-6 py-2">
//                     {`${article.content.substring(0, 150)}...`}
//                   </Typography>
//                   <div className="mt-4 flex justify-end p-4">

//                     <Typography
//                       variant="body2"
//                       className="text-white cursor-pointer bg-teal-800 py-2 px-4 rounded-md hover:bg-teal-600"
//                       onClick={() => handleOpenDialog(article)}
//                     >
//                       Read more
//                     </Typography>

//                   </div>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         ))}
//       </div>

//       {/* News Modal Dialog */}
//       {/* <Dialog open={!!selectedArticle} size="lg" handler={handleCloseDialog}>
//         {selectedArticle && (
//           <>
//             <DialogHeader>{selectedArticle.title}</DialogHeader>
//             <DialogBody divider className="overflow-y-auto max-h-96">
//               {selectedArticle.imageUrl && (
//                 <img src={selectedArticle.imageUrl} alt={selectedArticle.title} className="w-full h-48 object-cover rounded-t-lg mb-4" />
//               )}
//               <Typography variant="body2" className="mb-4 text-gray-500">
//                 {new Date(selectedArticle.publishedAt).toLocaleDateString()}
//               </Typography>
//               <Typography variant="body1" className="text-black text-justify">{selectedArticle.content}</Typography>
//             </DialogBody>
//           </>
//         )}
//       </Dialog> */}
//     </div>
//   );
// };

// export default News;


import React, { useState, useEffect } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Card, Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";
import AxiosRequest from "../../../../AxiosRequest/AxiosRequest";
import { useLocation } from "react-router-dom";

const News = () => {
  const currentPath = window.location.pathname;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [news, setNews] = useState([]);
  const [expandedArticleId, setExpandedArticleId] = useState(null);

  const [title, setTitle] = useState("News");
  const [description, setDescription] = useState(null);

  const [theme, setTheme] = useState(null)
  const fetchTheme = async () => {
    try {
      const res = await AxiosRequest.get("/api/colors/news");
      if (res.status === 200) setTheme(res.data);
    } catch (error) {
      console.error("Error fetching theme:", error);
    }
  };

  const fetchInfo = async () => {
    const response = await AxiosRequest.get('/api/section-info/news');
    if (response.status === 200) {
      setTitle(response.data.title);
      setDescription(response.data.description);
    }
  };
  // Use location hook for scrolling to exact blog when clicked from the home page
  const location = useLocation();

  // Function to toggle the expanded state of an article
  const toggleExpand = (id) => {
    // 
    setExpandedArticleId((prev) => (prev === id ? null : id));
  };

  // Fetch news articles from the API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await AxiosRequest.get("https://abm-wbw0.onrender.com/api/news/news");
        setNews(response.data);
        console.log("API Response:", response.data);
      } catch (err) {
        setError("Error fetching news articles");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
    fetchInfo();
    fetchTheme();
  }, []);


  // Scroll to the specific article when the component mounts or when the hash changes
  useEffect(() => {
    if (!loading && news.length > 0) {
      const hash = location.hash;
      if (hash) {
        // extract the element id from the hash
        const element = document.getElementById(hash.replace("#", ""));
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
  }, [loading, news, location.hash]);

  const groupedNews = news.reduce((acc, article) => {
    const date = new Date(article.publishedAt);
    const key = `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`;

    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(article);
    return acc;
  }, {});

  const cardTheme = theme?.config.cards?.[0];
  const buttonTheme = theme?.config.buttons?.[0];
  const textTheme = theme?.config.text;


  return (
    <div className="flex flex-col items-center justify-start h-full  font-poppins w-full"
      style={{
        backgroundColor: theme?.config.background.sectionBgColor || "#F6F1EE",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <Typography
          variant="h3"
          className="flex justify-between items-center font-bold text-start w-full lg:p-5 uppercase tracking-wide"
          style={{ color: textTheme?.headingColor || "teal" }}
        >
          {title}
          <div className="w-fit h-fit hidden md:flex gap-1 text-base  rounded-md"
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
                  currentPath === "/news"
                    ? textTheme?.headingColor || "teal"
                    : textTheme?.paragraphColor || "teal",
                textDecoration: currentPath === "/news" ? "underline" : "none",
              }}
            >
              News
            </a>
          </div>
        </Typography>
        <Typography variant="body1" className="px-4  mb-4"
          style={{ color: textTheme?.paragraphColor || "black" }}
        >
          {description}
        </Typography>
      </motion.div>

      {/* Timeline Container */}
      <div className="relative px-0 sm:px-4 h-full bg-white w-full mx-auto">
        {/* Timeline Vertical Line */}
        <div className="absolute hidden lg:flex left-1/2 transform -translate-x-1/2 w-[2px]  h-full" style={{backgroundColor:textTheme?.highlightedTextColor || "#FFA700"}}></div>

        {Object.entries(groupedNews).map(([month, articles], index) => (
          <div key={month} className="w-full flex flex-col items-center relative">
            {/* Month Badge */}
            <div className="absolute hidden lg:flex left-1/2 transform -translate-x-1/2 -top-4 w-[10%] text-center h-10 items-center justify-center  font-semibold rounded-md shadow-md text-lg"
            style={{ color:  buttonTheme?.textColor || "black",
              backgroundColor:buttonTheme?.bgColor || "#FFA700" 
             }}
            >
              {month}
            </div>

            {articles.map((article, idx) => (
              <motion.div
                id={article._id}
                key={article._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx, duration: 0.5 }}
                className={`w-full flex flex-col md:flex-row items-center justify-between mb-12 relative px-4 sm:px-0  ${idx % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
              >
                {/* Timeline Dot */}
                <div className="absolute hidden lg:flex left-1/2 transform -translate-x-1/2  h-4 w-4 rounded-full shadow-md"
                  style={{ 
              backgroundColor:textTheme?.highlightedTextColor || "#FFA700" 
             }}
                ></div>

                {/* News Card */}
                <Card className="w-full    lg:w-[40%] shadow-lg rounded-lg  border flex flex-col"
                  style={{
                    backgroundColor: cardTheme?.bgColor || "white",
                    border: `1px dotted ${cardTheme?.borderColor || "#FFA700"}`,

                  }}
                >
                  {article.imageUrl && (
                    <div className="overflow-hidden mb-4">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-56 object-fill rounded-t-md sm:h-64 transition-all duration-300 hover:scale-105"
                      />
                    </div>
                  )}
                  <Typography variant="h5" className="mb-2 text-start font-bold px-6 py-2"
                    style={{
                      color: cardTheme?.headingColor || "teal",
                    }}
                  >
                    {article.title}
                  </Typography>
                  <Typography variant="body2" className="mb-4  flex items-center gap-2 px-6 py-2"
                    style={{
                      color: cardTheme?.specialLineColor || "#0F766E",
                    }}
                  >
                    <FaRegCalendarAlt style={{
                      color: cardTheme?.iconColor || "#FFA700",
                    }} />{" "}
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </Typography>

                  {expandedArticleId === article._id ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Typography variant="body1" className="text-start font-normal px-6 py-2"
                        style={{
                          color: cardTheme?.descriptionColor || "black",
                        }}
                      >
                        {article.content}
                      </Typography>
                    </motion.div>
                  ) : (
                    <Typography variant="body1" className="text-start font-semibold px-6 py-2"
                      style={{
                        color: cardTheme?.descriptionColor || "black",
                      }}
                    >
                      {`${article.content.substring(0, 150)}...`}
                    </Typography>
                  )}


                  <div className="mt-4 flex justify-end p-4">
                    <Typography
                      variant="body2"
                      className=" cursor-pointer  py-2 px-4 rounded-md "
                      onClick={() => toggleExpand(article._id)}
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
                      {expandedArticleId === article._id ? "Show less" : "Read more"}
                    </Typography>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;



