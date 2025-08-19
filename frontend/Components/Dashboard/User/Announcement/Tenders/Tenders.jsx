// import React, { useEffect, useState } from 'react';
// import img from '../../../../../assets/card2.png'
// import { Card, Typography, Spinner, Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';
// import AxiosRequest from '../../../../AxiosRequest/AxiosRequest';
// import { motion } from 'framer-motion';
// import toast, { Toaster } from 'react-hot-toast';
// import { useSelector } from 'react-redux';
// import { selectToken } from '../../../../State/Reducers/tokenSlice';
// import { FaTimes } from 'react-icons/fa';

// const Tenders = () => {
//   const [tenders, setTenders] = useState([
//     { _id: '1', title: 'Tender 1', description: 'This is a sample description for Tender 1.', imageUrl: img },
//     { _id: '2', title: 'Tender 2', description: 'This is a sample description for Tender 2.', imageUrl: img },
//     { _id: '3', title: 'Tender 3', description: 'This is a sample description for Tender 3.', imageUrl: img },
//   ]);
//   const [loading, setLoading] = useState(false); // Initially set to false since we have dummy data
//   const [error, setError] = useState('');
//   const [selectedTender, setSelectedTender] = useState(null);
//   const [viewDialogOpen, setViewDialogOpen] = useState(false);
//   const storedToken = localStorage.getItem('token');
//   const token = useSelector(selectToken) || storedToken;

//   useEffect(() => {
//     const fetchTenders = async () => {
//       try {
//         const response = await AxiosRequest.get('https://abm-wbw0.onrender.com/api/tender/', {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         setTenders(response.data);
//       } catch (err) {
//         setError('Error fetching tenders');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTenders();
//   }, []);

//   const handleOpenViewDialog = (tender) => {
//     setSelectedTender(tender);
//     setViewDialogOpen(true);
//   };

//   const handleCloseViewDialog = () => {
//     setSelectedTender(null);
//     setViewDialogOpen(false);
//   };

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
//     <div className="flex flex-col items-center justify-start text-center min-h-screen bg-[#F6F1EE] font-poppins p-6">
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="w-full"
//       >
//         <Typography variant="h2" className="mt-4 mb-6 text-black">Tenders</Typography>
//       </motion.div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full">
//         {tenders.map((tender, index) => (
//           <motion.div
//             key={tender._id}
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 * index, duration: 0.5 }}
//             className='h-full'
//           >
//             <Card className="h-full flex flex-col justify-between mb-6 shadow-lg rounded-lg bg-white">
//               {tender.imageUrl && (
//                 <img src={tender.imageUrl} alt={tender.title} className="w-full h-48 object-fill rounded-t-lg mb-4" />
//               )}
//               <Typography variant="h5" className="mb-2 text-teal-800">{tender.title}</Typography>
//               <Typography variant="body1" className="text-black text-justify mb-4 px-4">
//                 {`${tender.description.substring(0, 100)}...`}
//               </Typography>
//               <div className="mt-4 flex justify-end p-4">
//                 <Typography
//                   variant="body2"
//                   className="bg-teal-800 p-1 rounded-md text-white hover:bg-teal-600 cursor-pointer"
//                   onClick={() => handleOpenViewDialog(tender)}
//                 >
//                   Read more
//                 </Typography>
//               </div>
//             </Card>
//           </motion.div>
//         ))}
//       </div>


//        {/* View Dialog */}


//       {/* View Tender Dialog */} 
//       <Dialog open={viewDialogOpen} handler={handleCloseViewDialog} size="lg" className="relative">
//         {selectedTender && (
//           <>
//             {/* Close Button */}
//             <button
//               onClick={handleCloseViewDialog}
//               className="absolute top-3 right-3 text-gray-600 hover:text-red-600 transition duration-200 border-none"
//               aria-label="Close Dialog"
//             >
//               <FaTimes className="text-2xl" />
//             </button>

//             {/* Dialog Header */}
//             <DialogHeader className="text-xl font-semibold text-teal-800">
//               {selectedTender.title}
//             </DialogHeader>

//             {/* Tender Image */}
//             {selectedTender.imageUrl && (
//               <img
//                 src={selectedTender.imageUrl}
//                 alt={selectedTender.title}
//                 className="w-full h-60 object-fill rounded-lg mb-4 px-4"
//               />
//             )}

//             {/* Dialog Body */}
//             <DialogBody divider className="overflow-y-auto max-h-[30rem] px-4">
//               <Typography variant="body1" className="text-gray-800 leading-relaxed text-justify">
//                 {selectedTender.description}
//               </Typography>
//             </DialogBody>
//           </>
//         )}
//       </Dialog>

//     </div>
//   );
// };

// export default Tenders;






import React, { useEffect, useState } from 'react';
import img from '../../../../../assets/card2.png'
import { Card, Typography, Spinner, Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';
import AxiosRequest from '../../../../AxiosRequest/AxiosRequest';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../../State/Reducers/tokenSlice';
import { FaTimes } from 'react-icons/fa';

const Tenders = () => {
  const [tenders, setTenders] = useState([
    { _id: '1', title: 'Tender 1', description: 'This is a sample description for Tender 1.', imageUrl: img },
    { _id: '2', title: 'Tender 2', description: 'This is a sample description for Tender 2.', imageUrl: img },
    { _id: '3', title: 'Tender 3', description: 'This is a sample description for Tender 3.', imageUrl: img },
  ]);
  const [loading, setLoading] = useState(false); // Initially set to false since we have dummy data
  const [error, setError] = useState('');
  const [selectedTender, setSelectedTender] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const storedToken = localStorage.getItem('token');
  const token = useSelector(selectToken) || storedToken;
  const [expandedTenderId, setexpandedTenderId] = useState(null);


  const [title, setTitle] = useState("Tenders");
  const [description, setDescription] = useState(null);

  const fetchInfo = async () => {
    const response = await AxiosRequest.get('/api/section-info/tenders');
    if (response.status === 200) {
      setTitle(response.data.title);
      setDescription(response.data.description);
    }
  };

  const [theme, setTheme] = useState(null);

  const fetchTheme = async () => {
    try {
      const res = await AxiosRequest.get("/api/colors/tenders");
      if (res.status === 200) setTheme(res.data);
    } catch (error) {
      console.error("Error fetching theme:", error);
    }
  };


  const toggleExpand = (id) => {
    setexpandedTenderId((currId) => (currId === id ? null : id));
  };

  useEffect(() => {
    const fetchTenders = async () => {
      try {
        const response = await AxiosRequest.get('https://abm-wbw0.onrender.com/api/tender/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTenders(response.data);
      } catch (err) {
        setError('Error fetching tenders');
      } finally {
        setLoading(false);
      }
    };

    fetchTenders();
    fetchInfo();
    fetchTheme();
  }, []);

  const handleOpenViewDialog = (tender) => {
    setSelectedTender(tender);
    setViewDialogOpen(true);
  };

  const handleCloseViewDialog = () => {
    setSelectedTender(null);
    setViewDialogOpen(false);
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
    <div className="flex flex-col items-center justify-start text-center min-h-screen  font-poppins p-6"
     style={{ backgroundColor: theme?.config.background.sectionBgColor || "#F5F6F5" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full mb-6 flex flex-col items-center"
      >
        <Typography variant="h2" className="mt-4 "
         style={{ color: textTheme?.headingColor || "teal" }}
        >{title}</Typography>
        <div className="h-1 w-[5vw] bg-yellow-700 rounded-md"></div>

        <Typography variant="body1" className="max-w-[70vw] text-center mt-2"
        style={{ color: textTheme?.paragraphColor || "gray" }}
        >
          {description}
        </Typography>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full">
        {tenders.map((tender, index) => (
          <motion.div
            key={tender._id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            className='h-full'
          >
            <Card className="h-full flex flex-col justify-start mb-6 shadow-lg rounded-lg "
             style={{
                backgroundColor: cardTheme?.bgColor || "white",
                border: `1px solid ${cardTheme?.borderColor || "teal"}`,
                
              }}
            >
              {tender.imageUrl && (
                <img src={tender.imageUrl} alt={tender.title} className="w-full h-48 object-fill rounded-t-lg mb-4" />
              )}

              <div className='flex flex-col justify-between h-full'>
                <Typography variant="h5" className="px-4 text-start pt-4 h-full"
                style={{
                    color: cardTheme?.headingColor || "teal",
                  }}
                >{tender.title}</Typography>

                {expandedTenderId === tender._id ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}

                  >
                    <Typography variant="body1" className="text-justify mb-4 px-4"
                     style={{
                    color: cardTheme?.descriptionColor || "black",
                  }}
                    >
                      {`${tender.description}`}
                    </Typography>
                  </motion.div>

                )
                  : (
                    <Typography variant="body1" className="text-justify mb-4 px-4"
                     style={{
                    color: cardTheme?.descriptionColor || "black",
                  }}
                    >
                      {`${tender.description.substring(0, 100)}...`}
                    </Typography>
                  )}
                <div className="mt-4 flex justify-end p-4">
                  <Typography
                    variant="body2"
                    className="px-4 py-2 rounded-md  cursor-pointer"
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
                    onClick={() => toggleExpand(tender._id)}
                  >
                    {expandedTenderId === tender._id ? "Show less" : "Read more"}
                  </Typography>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>


      {/* View Dialog */}


      {/* View Tender Dialog */}
      <Dialog open={viewDialogOpen} handler={handleCloseViewDialog} size="lg" className="relative">
        {selectedTender && (
          <>
            {/* Close Button */}
            <button
              onClick={handleCloseViewDialog}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-600 transition duration-200 border-none"
              aria-label="Close Dialog"
            >
              <FaTimes className="text-2xl" />
            </button>

            {/* Dialog Header */}
            <DialogHeader className="text-xl font-semibold text-teal-800">
              {selectedTender.title}
            </DialogHeader>

            {/* Tender Image */}
            {selectedTender.imageUrl && (
              <img
                src={selectedTender.imageUrl}
                alt={selectedTender.title}
                className="w-full h-60 object-fill rounded-lg mb-4 px-4"
              />
            )}

            {/* Dialog Body */}
            <DialogBody divider className="overflow-y-auto max-h-[30rem] px-4">
              <Typography variant="body1" className="text-gray-800 leading-relaxed text-justify">
                {selectedTender.description}
              </Typography>
            </DialogBody>
          </>
        )}
      </Dialog>

    </div>
  );
};

export default Tenders;

