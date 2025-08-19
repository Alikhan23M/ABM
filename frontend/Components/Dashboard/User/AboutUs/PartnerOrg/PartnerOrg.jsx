// import React, { useEffect, useState } from 'react';
// import { Card, Typography, Spinner, Avatar } from '@material-tailwind/react';
// import { motion } from 'framer-motion';
// import AxiosRequest from '../../../../AxiosRequest/AxiosRequest';

// const PartnerOrg = () => {
//   const [partners, setPartners] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchPartners = async () => {
//       try {
//         const response = await AxiosRequest.get('/api/partners/getTeam');
//         setPartners(response.data);
//       } catch (err) {
//         setError('Failed to fetch data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPartners();
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
//     <div className="flex flex-col justify-start items-start text-center min-h-screen bg-[#F6F1EE] font-poppins p-6">
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="w-full"
//       >
//         <Typography variant="h2" className="mb-6 self-center text-black">
//           Partner Organizations
//         </Typography>
//       </motion.div>
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.2 }}
//         className="w-full"
//       >
//                     <Card className="p-6 items-center justify-center text-center gap-4 shadow-lg rounded-lg">
//         <Typography variant="h5" color="black" className="mb-6 text-start">
//           ABM believes in long-lasting and productive partnership in the field of biorisk management, one health, and zoonoses.
//         </Typography>
//         </Card>
//       </motion.div>
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.4 }}
//         className="w-full"
//       >
//         <Card className="p-6 items-center justify-center text-center gap-4 shadow-lg rounded-lg">
//         <Typography variant="h5" color="black" className="mb-6 text-start">
//           ABM has currently collaboration with the following partners
//         </Typography>
//         </Card>
//       </motion.div>
//       {/* Cards for displaying partner details */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
//         {partners.map((partner, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 * index, duration: 0.5 }}
//           >
//             <Card className="p-6 items-center justify-center text-center gap-4 shadow-lg rounded-lg">
//               {partner.imageUrl ? (
//                 <Avatar
//                   src={partner.imageUrl}
//                   alt={partner.name}
//                   className="w-24 h-24 object-cover rounded-full mx-auto md:mx-0"
//                 />
//               ) : (
//                 <Typography variant="body1" color="blue-gray" className="mb-2">
//                   No image available
//                 </Typography>
//               )}
//               <Typography variant="subtitle2" color="blue-gray" className="mb-2">
//                 {partner.name}
//               </Typography>
//             </Card>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PartnerOrg;

import React, { useState, useEffect } from 'react';
import AxiosRequest from './../../../../AxiosRequest/AxiosRequest';
import Img from '../../../../../assets/card3.jpg';
import { Card, Typography, Spinner, Avatar } from '@material-tailwind/react';
import { motion } from 'framer-motion';

const PartnerOrg = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("Our Partners");
  const [description, setDescription] = useState('ABM believes in long-lasting and productive partnerships in the field of biorisk management, one health, and zoonoses.');
  const [theme, setTheme] = useState(null);

  const fetchTheme = async () => {
    try {
      const res = await AxiosRequest.get("/api/colors/partner-org");
      if (res.status === 200) setTheme(res.data);
    } catch (error) {
      console.error("Error fetching theme:", error);
    }
  };

  const fetchInfo = async () => {
    const response = await AxiosRequest.get('/api/section-info/partner-org');
    if (response.status === 200) {
      setTitle(response.data.title);
      setDescription(response.data.description);

    }
  }

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await AxiosRequest.get('https://abm-wbw0.onrender.com/api/partners/getTeam');
        console.log('API Response:', response.data);

        if (Array.isArray(response.data)) {
          setPartners(response.data);
        } else {
          setError('Unexpected API response format');
          setPartners([]);
        }
      } catch (err) {
        console.error('Error fetching partners:', err);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
    fetchInfo();
    fetchTheme();
  }, []);

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
    <div className="flex flex-col justify-start items-start text-center min-h-screen  font-poppins p-6"
      style={{
        backgroundColor: theme?.config.background.sectionBgColor || "#F5F6F5",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full mb-6"

      >
        <Typography variant="h2" className="self-center"
          style={{ color: textTheme?.headingColor || "#0f766e" }}
        >
          {title}
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full mb-6"
      >
        <Card className="p-6 items-center justify-center text-center shadow-lg rounded-lg"
          style={{
            backgroundColor: theme?.config.background.containerBgColor || "white",
          }}
        >
          <Typography color="black" className="text-lg mb-6 text-start"
            style={{ color: textTheme?.paragraphColor || "black" }}

          >
            {description}
          </Typography>
        </Card>
      </motion.div>

      {/* Cards for displaying partner details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
        {partners.map((partner, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            className="w-full flex justify-center"

          >
            <Card className="p-6 items-center justify-center text-center shadow-lg rounded-lg w-full max-w-sm"
              style={{
                backgroundColor: cardTheme?.bgColor || "white",
                border: `1px solid ${cardTheme?.borderColor || "teal"}`,
                boxShadow: `0 2px 6px ${cardTheme?.borderColor || "rgba(0,0,0,0.1)"}`,
              }}
            >
              {partner.imageUrl ? (
                <Avatar
                  src={partner.imageUrl}
                  alt={partner.name}
                  className="w-36 h-36 bg-black"
                />
              ) : (
                <Avatar
                  src={Img}
                  alt="Placeholder"
                  className="w-36 h-36 bg-black"
                />
              )}

              <Typography variant="subtitle2" color="blue-gray" className="mb-2 mt-2  font-semibold"
                style={{
                  color: cardTheme?.headingColor || "#0f766e",
                }}
              >
                {partner.name}
              </Typography>
              <Typography variant="body2" color="blue-gray"
                style={{
                  color: cardTheme?.descriptionColor || "gray",
                }}
              >
                {partner.description}
              </Typography>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PartnerOrg;

