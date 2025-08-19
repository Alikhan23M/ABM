// import React, { useEffect, useState } from 'react';
// import { Card, Typography, Spinner, Dialog, DialogHeader, DialogBody } from '@material-tailwind/react';
// import { motion } from 'framer-motion';
// import { FaTimes } from 'react-icons/fa';
// import AxiosRequest from '../../../AxiosRequest/AxiosRequest'; // Ensure correct import path

// const Archives = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [selectedBlog, setSelectedBlog] = useState(null);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const response = await AxiosRequest.get('https://abm-wbw0.onrender.com/api/blogs/');
//         setBlogs(response.data); // Assuming response.data contains an array of blogs
//       } catch (error) {
//         setError('Error fetching blogs');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlogs();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-[#F6F1EE]">
//         <Spinner className="h-12 w-12 text-black" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-[#F6F1EE]">
//         <Typography variant="h4" color="red">{error}</Typography>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col items-center justify-start min-h-screen bg-[#F6F1EE] font-poppins p-6">
//       <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//         <Typography variant="h2" className="text-black mb-6">Blog Archives</Typography>
//       </motion.div>


//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">
//   {blogs.map((blog, index) => (
//     <motion.div
//       key={blog._id}
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: index * 0.1, duration: 0.5 }}
//       className="h-full"
//     >
//       <Card className="h-full flex flex-col shadow-lg rounded-lg overflow-hidden bg-white">
//         <img
//           src={blog.thumbnailUrl}
//           alt={blog.title}
//           className="w-full h-48 object-cover"
//         />
//         <div className="p-4 flex flex-col flex-grow">
//           <Typography variant="h5" className="font-semibold text-teal-800 mb-2">
//             {blog.title}
//           </Typography>
//           <Typography variant="paragraph" className="text-black text-justify flex-grow">
//             {`${blog.description.substring(0, 150)}...`}
//           </Typography>
//           <div className="mt-4 flex justify-end">
//             <Typography
//               variant="small"
//               className="text-white p-1 px-4 py-2 bg-teal-800 rounded-md hover:bg-yellow-600 cursor-pointer"
//               onClick={() => setSelectedBlog(blog)}
//             >
//               Read more
//             </Typography>
//           </div>
//         </div>
//       </Card>
//     </motion.div>
//   ))}
// </div>




// <Dialog open={!!selectedBlog} handler={() => setSelectedBlog(null)} size="lg" className="relative">
//         {selectedBlog && (
//           <>
//             {/* Close Button */}
//             <button
//               onClick={() => setSelectedBlog(null)}
//               className="absolute top-3 right-3 text-gray-600 hover:text-red-600 transition duration-200"
//               aria-label="Close Dialog"
//             >
//               <FaTimes className="text-2xl" />
//             </button>

//             {/* Dialog Header */}
//             <DialogHeader className="text-xl font-semibold text-teal-800">
//               {selectedBlog.title}
//             </DialogHeader>

//             {/* Tender Image */}
//             {selectedBlog.thumbnailUrl && (
//               <img
//                 src={selectedBlog.thumbnailUrl}
//                 alt={selectedBlog.title}
//                 className="w-full h-60 object-fill rounded-lg mb-4 px-4"
//               />
//             )}

//             {/* Dialog Body */}
//             <DialogBody divider className="overflow-y-auto max-h-[30rem] px-4">
//               <Typography variant="body1" className="text-gray-800 leading-relaxed text-justify">
//                 {selectedBlog.description}
//               </Typography>
//             </DialogBody>
//           </>
//         )}
//       </Dialog>



//     </div>
//   );
// };

// export default Archives;




import React, { useEffect, useState } from 'react';
import { Card, Typography, Spinner, Dialog, DialogHeader, DialogBody } from '@material-tailwind/react';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import AxiosRequest from '../../../AxiosRequest/AxiosRequest'; // Ensure correct import path

const Archives = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [expandedBlogId, setExpandedBlogId] = useState(null);



  const [title, setTitle] = useState("Archives");
  const [description, setDescription] = useState(null);

  const [theme, setTheme] = useState(null);

  const fetchTheme = async () => {
    try {
      const res = await AxiosRequest.get("/api/colors/archives");
      if (res.status === 200) setTheme(res.data);
    } catch (error) {
      console.error("Error fetching theme:", error);
    }
  };

  const fetchInfo = async () => {
    const response = await AxiosRequest.get('/api/section-info/archives');
    if (response.status === 200) {
      setTitle(response.data.title);
      setDescription(response.data.description);
    }
  };

  // Function to toggle the expanded state of an article
  const toggleExpand = (id) => {
    // 
    setExpandedBlogId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await AxiosRequest.get('https://abm-wbw0.onrender.com/api/blogs/');
        setBlogs(response.data); // Assuming response.data contains an array of blogs
      } catch (error) {
        setError('Error fetching blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
    fetchInfo();
    fetchTheme();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen"
        style={{
          backgroundColor: theme?.config.background.sectionBgColor || "#F6F1EE",
        }}
      >
        <Spinner className="h-12 w-12 text-black" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F6F1EE]"
      >
        <Typography variant="h4" color="red">{error}</Typography>
      </div>
    );
  }
  const cardTheme = theme?.config.cards?.[0];
  const buttonTheme = theme?.config.buttons?.[0];
  const textTheme = theme?.config.text;
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-[#F6F1EE] font-poppins p-6"

      style={{
        backgroundColor: theme?.config.background.sectionBgColor || "#F6F1EE",
      }}>


      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className='mb-6 flex flex-col items-center'>
        
        <Typography variant="h2"
        style={{ color: textTheme?.headingColor || "teal" }}
        >{title}</Typography>
        <div className="h-1 w-[7vw] bg-yellow-700 rounded-md"></div>

        <Typography variant="body1" className="max-w-[70vw]  text-start px-6 mt-2 mb-4"
         style={{ color: textTheme?.paragraphColor || "gray" }}
        >
          {description}
        </Typography>
      </motion.div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">

        {blogs.map((blog, index) => (
          <motion.div
            key={blog._id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="h-full"
          // layout
          >
            <Card className="h-full flex flex-col shadow-lg rounded-lg overflow-hidden "
            style={{
                backgroundColor: cardTheme?.bgColor || "white",
                border: `1px solid ${cardTheme?.borderColor || "teal"}`,
              
              }}
            >
              <img
                src={blog.thumbnailUrl}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col flex-grow justify-between h-full">
                <Typography variant="h5" className="min-h-[8px] font-semibold mb-2 p-4 h-full"
                 style={{
                    color: cardTheme?.headingColor || "black",
                  }}
                >
                  {blog.title}
                </Typography>
                {
                  expandedBlogId === blog._id ? (
                    <motion.div
                      initial={{ height: '30%', opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4 }}

                    >

                      <Typography variant="paragraph" className=" text-justify flex-grow"
                       style={{
                    color: cardTheme?.descriptionColor || "black",
                  }}
                      >
                        {blog.description}
                      </Typography>
                    </motion.div>
                  ) : (
                    <Typography variant="paragraph" className="text-justify flex-grow"
                     style={{
                    color: cardTheme?.descriptionColor || "black",
                  }}
                    >
                      {`${blog.description.substring(0, 150)}...`}
                    </Typography>

                  )
                }
                <div className="mt-4 flex justify-end">
                  <Typography
                    variant="small"
                    className=" p-1 px-4 py-2  rounded-md  cursor-pointer"
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

                    onClick={() => toggleExpand(blog._id)}
                  >
                    {expandedBlogId === blog._id ? 'Show Less' : 'Read more'}
                  </Typography>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>





    </div>
  );
};

export default Archives;




