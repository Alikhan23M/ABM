// import React, { useEffect, useState } from 'react';
// import {
//   Card,
//   Typography,
//   Dialog,
//   DialogHeader,
//   DialogBody,
//   DialogFooter,
//   Spinner
// } from '@material-tailwind/react';
// import { motion, AnimatePresence } from 'framer-motion';
// import truncate from 'lodash/truncate';
// import AxiosRequest from '../../../../AxiosRequest/AxiosRequest';

// const VisionMission = () => {
//   const [vision, setVision] = useState(null);
//   const [mission, setMission] = useState(null);
//   const [news, setNews] = useState([]);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [selectedArticle, setSelectedArticle] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const articlesPerPage = 2;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const [visionRes, missionRes, newsRes] = await Promise.all([
//           AxiosRequest.get('https://abm-wbw0.onrender.com/api/about/getAbout/Vision'),
//           AxiosRequest.get('https://abm-wbw0.onrender.com/api/about/getAbout/Mission'),
//           AxiosRequest.get(`https://abm-wbw0.onrender.com/api/news/newsPagination?page=${currentPage}&perPage=${articlesPerPage}`)
//         ]);
//         setVision(visionRes.data.aboutUs);
//         setMission(missionRes.data.aboutUs);
//         setNews(newsRes.data.news);
//         setTotalPages(newsRes.data.totalPages);
//       } catch (err) {
//         setError('Failed to fetch data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : 1));
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [currentPage, totalPages]);

//   const handleReadMore = (article) => {
//     setSelectedArticle(article);
//   };

//   const handleCloseDialog = () => {
//     setSelectedArticle(null);
//   };

//   const RenderNews = () => (
//     news.map((article, index) => (
//       <motion.div
//         key={article._id}
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: index * 0.1 }}
//         className="w-full flex justify-center"
//       >
//         <Card className="p-4 sm:p-6 shadow-lg rounded-lg w-full max-w-xl">
//           <Typography variant="h5" className="mb-4 text-center text-xl font-bold text-teal-800">
//             {article.title}
//           </Typography>
//           <Typography className="mb-4 text-gray-900">
//             {truncate(article.content, { length: 100 })}
//           </Typography>
//           {article.content.length > 100 && (
//             <button
//               className="text-yellow-800 cursor-pointer block text-right font-medium"
//               onClick={() => handleReadMore(article)}
//             >
//               Read More
//             </button>
//           )}
//         </Card>
//       </motion.div>
//     ))
//   );

//   const renderSection = (title, content) => {
//     if (!content) return null;
//     const sentences = content.description.split('.').filter((s) => s.trim().length > 0);

//     return (
//       <motion.div
//         key={title}
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.5 }}
//         className="w-full flex justify-center"
//       >
//         <Card className="p-4 sm:p-6 shadow-lg rounded-lg w-full max-w-4xl">
//           <Typography
//             variant="h5"
//             color="blue-gray"
//             className="mb-4 text-center text-lg sm:text-xl font-bold text-teal-800"
//           >
//             {title}
//           </Typography>
//           <ul className="list-disc pl-5 space-y-2">
//             {sentences.map((sentence, index) => (
//               <li key={index} className="text-sm sm:text-lg text-gray-900">
//                 {sentence.trim()}.
//               </li>
//             ))}
//           </ul>
//         </Card>
//       </motion.div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-[#F6F1EE] overflow-x-hidden">
//         <Spinner className="h-12 w-12 text-black" />
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col justify-center items-center font-poppins min-h-screen bg-gray-100 px-4 py-6 overflow-x-hidden">
//       <Typography
//         variant="h2"
//         className="mb-6 sm:mb-12 text-start text-teal-800 text-2xl sm:text-3xl w-full max-w-6xl"
//       >
//         Vision & Mission
//       </Typography>

//       <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-16 w-full max-w-6xl">
//         {/* Left Column: News */}
//         <div className="md:col-span-4 space-y-8">
//           <AnimatePresence>{RenderNews()}</AnimatePresence>
//         </div>

//         {/* Right Column: Vision & Mission */}
//         <div className="md:col-span-8 space-y-8">
//           {renderSection('Vision', vision)}
//           {renderSection('Mission', mission)}
//         </div>
//       </div>

//       {/* News Dialog */}
//       <Dialog open={!!selectedArticle} handler={handleCloseDialog}>
//         {selectedArticle && (
//           <>
//             <DialogHeader>{selectedArticle.title}</DialogHeader>
//             <DialogBody>{selectedArticle.content}</DialogBody>
//             <DialogFooter>
//               <button onClick={handleCloseDialog} className="text-blue-600 font-medium">
//                 Close
//               </button>
//             </DialogFooter>
//           </>
//         )}
//       </Dialog>
//     </div>
//   );
// };

// export default VisionMission;
import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Spinner
} from "@material-tailwind/react";
import { motion, AnimatePresence } from "framer-motion";
import truncate from "lodash/truncate";
import AxiosRequest from "../../../../AxiosRequest/AxiosRequest";

const VisionMission = () => {
  const [vision, setVision] = useState(null);
  const [mission, setMission] = useState(null);
  const [news, setNews] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedArticleId, setExpandedArticleId] = useState(null);
  const [title, setTitle] = useState("Vision & Mission");
  const [description,setDescription] = useState(null);
 const [theme, setTheme] = useState(null);

  const fetchTheme = async () => {
    try {
      const res = await AxiosRequest.get("/api/colors/vission-and-mission");
      if (res.status === 200) setTheme(res.data);
    } catch (error) {
      console.error("Error fetching theme:", error);
    }
  };
  const fetchInfo = async () => {
      const response = await AxiosRequest.get('/api/section-info/vission-and-mission');
      if (response.status === 200) {
        setTitle(response.data.title);
        setDescription(response.data.description);
        
      }
    }

  const articlesPerPage = 2;

  const toggleExpand = (id) => {
    setExpandedArticleId((CurrId) => (CurrId === id ? null : id));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [visionRes, missionRes, newsRes] = await Promise.all([
          AxiosRequest.get("/api/about/getAbout/Vision"),
          AxiosRequest.get("/api/about/getAbout/Mission"),
          AxiosRequest.get(
            `/api/news/newsPagination?page=${currentPage}&perPage=${articlesPerPage}`
          )
        ]);
        setVision(visionRes.data.aboutUs);
        setMission(missionRes.data.aboutUs);
        setNews(newsRes.data.news);
        setTotalPages(newsRes.data.totalPages);
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    fetchInfo();
    fetchTheme();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prevPage) =>
        prevPage < totalPages ? prevPage + 1 : 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [totalPages]);

  const RenderNews = () =>
    news.map((article, index) => (
      <motion.div
        key={article._id}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="w-full flex justify-center"
      >
        <Card className="shadow-lg rounded-lg w-full max-w-xl overflow-hidden"
         style={{
                backgroundColor: cardTheme?.bgColor || "white",
                border: `1px solid ${cardTheme?.borderColor || "teal"}`,
                boxShadow: `0 2px 6px ${cardTheme?.borderColor || "rgba(0,0,0,0.1)"}`,
              
              }}
        >
          {/* News Text Container */}
          <div className="p-4 sm:p-6">
            <Typography
              variant="h5"
              className="mb-4 text-center text-xl font-bold"
               style={{
                    color: cardTheme?.headingColor || "#0F766E",
                  }}
            >
              {article.title}
            </Typography>
            {expandedArticleId === article._id ? (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Typography className="mb-4" style={{
                    color: cardTheme?.descriptionColor || "black",
                  }}>
                  {article.content}
                </Typography>
              </motion.div>
            ) : (
              <Typography className="mb-4" style={{
                    color: cardTheme?.descriptionColor || "black",
                  }}>
                {truncate(article.content, { length: 100 })}
              </Typography>
            )}
            {article.content.length > 100 && (
              <button
                className=" cursor-pointer block text-right font-medium px-4 py-2 rounded-lg"
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
                    onClick={() => toggleExpand(article._id)}
              >
                {expandedArticleId === article._id
                  ? "Show less"
                  : "Read more"}
              </button>
            )}
          </div>
        </Card>
      </motion.div>
    ));

  const renderSection = (title, content) => {
    if (!content) return null;
    const sentences = content.description
      .split(".")
      .filter((s) => s.trim().length > 0);

    return (
      <motion.div
        key={title}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="w-full flex justify-center"
      >
        <Card className="shadow-lg rounded-lg w-full max-w-4xl overflow-hidden"
        style={{
                backgroundColor: cardTheme?.bgColor || "white",
                border: `1px solid ${cardTheme?.borderColor || "teal"}`,
                
              }}
        >
          {/* Image (touching card edges) */}
          {content.imgUrl && (
            <img
              src={content.imgUrl}
              alt={title}
              className="w-full h-64 object-fit"
            />
          )}
          {/* Text Container */}
          <div className="p-6 sm:p-8">
            <Typography
              variant="h5"
              color="blue-gray"
              className="mb-4 text-center text-lg sm:text-xl font-bold"
              style={{
                    color: cardTheme?.headingColor || "#0F766E",
                  }}
            >
              {content.title || title}
            </Typography>
            <ul className="list-disc space-y-2">
              {sentences.map((sentence, index) => (
                <li
                  key={index}
                  className="text-sm sm:text-lg "
                  style={{
                    color: cardTheme?.descriptionColor || "black",
                  }}
                >
                  {sentence.trim()}.
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F6F1EE] overflow-x-hidden">
        <Spinner className="h-12 w-12 text-black" />
      </div>
    );
  }
    const cardTheme = theme?.config.cards?.[0];
  const buttonTheme = theme?.config.buttons?.[0];
  const textTheme = theme?.config.text;

  return (
    <div className="flex flex-col justify-center items-center font-poppins min-h-screen  px-4 py-6 overflow-x-hidden"
    style={{
        backgroundColor: theme?.config.background.sectionBgColor || "#F5F6F5",
      }}
    >
      <Typography
        variant="h2"
        className="mb-6 sm:mb-12 text-start text-2xl sm:text-3xl w-full max-w-6xl"
        style={{ color: textTheme?.headingColor || "#0f766e" }}
      >
        {title}
      </Typography>

       {/* Description if not null */}

      {description && (
        <div className="max-w-2xl mx-auto text-center mt-4 mb-6 px-4">
          <p className="text-lg" style={{ color: textTheme?.paragraphColor || "gray" }}>{description}</p>
        </div>
      )}

     <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-16 w-full max-w-6xl">
  {/* News Section */}
  <div className="md:col-span-4 space-y-8 order-2 md:order-1">
    <AnimatePresence>{RenderNews()}</AnimatePresence>
  </div>

  {/* Vision & Mission Section */}
  <div className="md:col-span-8 space-y-8 order-1 md:order-2">
    {renderSection("Vision", vision)}
    {renderSection("Mission", mission)}
  </div>
</div>

    </div>
  );
};

export default VisionMission;
