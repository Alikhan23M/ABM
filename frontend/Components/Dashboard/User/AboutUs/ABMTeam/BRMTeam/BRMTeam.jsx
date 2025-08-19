import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Card, Typography, Spinner } from '@material-tailwind/react';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../../../State/Reducers/tokenSlice';
import { motion } from 'framer-motion';
import AxiosRequest from '../../../../../AxiosRequest/AxiosRequest';
import Partners from '../../../../../Home/Partners';
import { use } from 'react';
const BRMTeam = () => {
  const [members, setMembers] = useState([
    {
      _id: '1',
      name: 'Alice Johnson',
      designation: 'BRM Manager',
      expertise: 'Risk Management, Compliance',
    },
    {
      _id: '2',
      name: 'David Smith',
      designation: 'Senior BRM Analyst',
      expertise: 'Business Relationship Strategy, Client Engagement',
    },
    {
      _id: '3',
      name: 'Emma Brown',
      designation: 'BRM Consultant',
      expertise: 'Financial Analysis, Risk Assessment',
    },
    {
      _id: '4',
      name: 'Michael Lee',
      designation: 'BRM Lead',
      expertise: 'Corporate Strategy, Market Analysis',
    },
  ]);
  const [loading, setLoading] = useState(false);
  const token = useSelector(selectToken) || localStorage.getItem('token');

  const [title, setTitle] = useState("BRM Team");
  const [description, setDescription] = useState(null);
  const [theme, setTheme] = useState(null);

  const fetchTheme = async () => {
    try {
      const res = await AxiosRequest.get("/api/colors/brm-team");
      if (res.status === 200) setTheme(res.data);
    } catch (error) {
      console.error("Error fetching theme:", error);
    }
  };

  const fetchInfo = async () => {
    const response = await AxiosRequest.get('/api/section-info/brm-team');
    if (response.status === 200) {
      setTitle(response.data.title);
      setDescription(response.data.description);

    }
  }

  useEffect(() => {
    const fetchMembers = async () => {
      const teamType = 'BRM';
      try {
        const response = await AxiosRequest.get(`https://abm-wbw0.onrender.com/api/member/getTeam/${teamType}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setMembers(response.data);
        setLoading(false);
      } catch (err) {
        toast.error(err.response ? err.response.data.message : 'Server error');
        setLoading(false);
      }
    };

    fetchMembers();
  }, [token]);

  useEffect(() => {
    fetchInfo();
    fetchTheme();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F6F1EE] font-poppins">
        <Spinner className="h-12 w-12 text-black" />
      </div>
    );
  }

 const cardTheme = theme?.config.cards?.[0];
  const buttonTheme = theme?.config.buttons?.[0];
  const textTheme = theme?.config.text;

  return (
    <div className="flex flex-col items-center font-poppins" 
     style={{
        backgroundColor: theme?.config.background.sectionBgColor || "#F5F6F5",
      }}
    >
      <Toaster position="top-right" />
      <Typography variant="h2" className="mt-8 text-center"  style={{ color: textTheme?.headingColor || "black" }}> {title}</Typography>
      {/* Description if not null */}

      {description && (
        <div className="max-w-2xl mx-auto text-center my-6 px-4"
        style={{ color: textTheme?.paragraphColor || "gray" }}
        >
          <p className="text-lg">{description}</p>
        </div>
      )}

      {/* This was by default row like structutre for showing BRM Team */}

      {/* <div className="p-4 w-full overflow-x-auto">
        <Card className="p-4 mb-4 md:w-full w-[120vw] md:max-w-screen-2xl max-w-screen-4xl mx-auto shadow-lg rounded-lg bg-white">
          <table className="w-full">
            <thead className="w-full">
              <tr className="text-black border-b border-gray-200 ">
                <th className="p-2 text-center">S.NO</th>
                <th className="p-2 text-center">Name</th>
                <th className="p-2 text-center">Expertise</th>
                <th className="p-2 text-center">Designation</th>
              </tr>
            </thead>
            <tbody className=''>
              {members.map((member, index) => (
                <motion.tr key={member._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="p-2 text-center font-semibold">{index + 1}</td>
                  <td className="p-2 text-center text-yellow-900">{member.name}</td>
                  <td className="p-2 text-center">{member.expertise}</td>
                  <td className="p-2 text-center">{member.designation}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div> */}

      {/* This is now showing BRM Team in card like structure as just like BRM Team management section */}
      <div className=" w-full grid  grid-cols-1 md:grid-cols-2 gap-6  p-3">
        {members.map((member, index) => (
          <motion.div
            key={member._id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
          >
            <Card className="p-3  shadow-lg border-[1px]  rounded-lg  flex flex-col md:flex-row items-center space-y-4 md:0 mb-4  md:h-[18rem] md:space-x-4"
             style={{
                backgroundColor: cardTheme?.bgColor || "white",
                border: `1px solid ${cardTheme?.borderColor || "teal"}`,
                
              }}
            
            >
              <div className="md:ml-6 md:w-[25%] flex-shrink-0 mx-2 h-56 md:h-48">
                {member.imageUrl && (
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-full md:h-48 object-cover  md:mx-0 rounded-md "
                  />
                )}
              </div>

              <div
                className="w-full md:w-2/3 h-auto md:h-full overflow-visible md:overflow-hidden md:overflow-y-auto 
       p-1 md:scrollbar-thin md:scrollbar-thumb-gray-500 md:scrollbar-track-gray-200 
       md:scrollbar md:scrollbar-w-2 md:scrollbar-thumb-rounded-full md:scrollbar-track-rounded-full"
              >
                <Typography
                  variant="h5"
                  className="font-bold text-start"
                   style={{
                    color: cardTheme?.headingColor || "#FFA700",
                  }}
                >
                  {member.name}
                </Typography>
                <Typography
                  variant="body1"
                  className="text-teal font-semibold text-start"
                   style={{
                    color: cardTheme?.specialLineColor || "teal",
                  }}
                >
                  {member.designation}
                </Typography>
                <Typography className=" text-start font-serif font-md"
                
                 style={{
                    color: cardTheme?.descriptionColor || "black",
                  }}
                >
                  {member.expertise}
                </Typography>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>


      <Partners />
    </div>
  );
};

export default BRMTeam;
