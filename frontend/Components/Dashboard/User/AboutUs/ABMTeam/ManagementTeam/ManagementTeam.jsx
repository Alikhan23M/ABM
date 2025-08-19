import React, { useEffect, useState } from "react";
import Partners from "../../../../../Home/Partners";
import Img from "../../../../../../assets/card1.jpg";
import toast, { Toaster } from "react-hot-toast";
import { Card, Typography, Spinner, Avatar } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { selectToken } from "../../../../../State/Reducers/tokenSlice";
import AxiosRequest from "../../../../../AxiosRequest/AxiosRequest";
const ManagementTeam = () => {
  const currentPath = window.location.pathname;
  const [members, setMembers] = useState([
    {
      _id: "1",
      name: "John Doe",
      designation: "CEO",
      expertise:
        "expert in business development, strategic planning, and marketing and the founder of the company to the core of the fully haertful thank and my english is sleeping while making this and i want tot erite more but...... thsi is n saj sjsa jsa csad jsa csa csa j expert in business development, strategic planning, and marketing and the founder of the company to the core of expert in business development, strategic planning, and marketing and the founder of the company to the core of",
      imageUrl: Img,
    },
    {
      _id: "2",
      name: "Jane Smith",
      designation: "CFO",
      expertise: "Financial Planning, Risk Management",
      imageUrl: Img,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const token = useSelector(selectToken) || localStorage.getItem("token");
  const [title, setTitle] = useState("Management Team");
  const [description, setDescription] = useState(null);
  const [theme, setTheme] = useState(null);

  const fetchTheme = async () => {
    try {
      const res = await AxiosRequest.get("/api/colors/management-team");
      if (res.status === 200) setTheme(res.data);
    } catch (error) {
      console.error("Error fetching theme:", error);
    }
  };

  const fetchInfo = async () => {
    const response = await AxiosRequest.get('/api/section-info/management-team');
    if (response.status === 200) {
      setTitle(response.data.title);
      setDescription(response.data.description);

    }
  }
  useEffect(() => {
    const fetchMembers = async () => {
      const teamType = 'Management';
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

  const cardTheme = theme?.config.cards?.[0];
  const buttonTheme = theme?.config.buttons?.[0];
  const textTheme = theme?.config.text;


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F6F1EE] font-poppins">
        <Spinner className="h-12 w-12 text-black" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center justify-start text-center min-h-screen  font-poppins "
        style={{
          backgroundColor: theme?.config.background.sectionBgColor || "#F5F6F5",
        }}
      >
        <Toaster />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full flex flex-col justify-start"
        >
          <div className="flex items-center justify-between px-7 gap-16"
          >
            <Typography
              variant="h3"
              className="mt-[4vh] mb-[4vh] "

              style={{ color: textTheme?.headingColor || "teal" }}

            >
              {title}
            </Typography>
            <div className="w-fit h-fit md:flex gap-1 hidden text-base text-gray-800 rounded-md">
              <a
                href="/"
                className="hover:underline"
                style={{
                  color:
                    currentPath === "/"
                      ? textTheme?.headingColor || "teal"
                      : textTheme?.paragraphColor || "teal",
                  textDecoration: currentPath === "/" ? "underline" : "none",
                }}
              >
                Home
              </a>{" "} /

              <a
                href="/management-team"
                className="hover:underline"
                style={{
                  color:
                    currentPath === "/management-team"
                      ? textTheme?.headingColor || "teal"
                      : textTheme?.paragraphColor || "teal",
                  textDecoration: currentPath === "/management-team" ? "underline" : "none",
                }}
              >
                Management
              </a>

            </div>
          </div>
          {/* Description if not null */}

          {description && (
            <div className="max-w-2xl mx-2 self-start  text-start px-4">
              <p className="text-lg text-start"
              style={{ color: textTheme?.paragraphColor || "gray" }}
              >{description}</p>
            </div>
          )}
        </motion.div>
        <div
        style={{
        backgroundColor: theme?.config.background.containerBgColor || "white",
      }}
        >
          <Typography
            variant="h4"
            className="text-black font-bold flex flex-col gap-2 items-center justify-center my-5"
          >
            <p className="text-center flex flex-col items-start"
            style={{ color: textTheme?.paragraphColor || "black" }}
            >Management</p>
            <div className="w-20 h-[3px]"
             style={{
            backgroundColor: textTheme?.highlightedTextColor || "gold",
          }}
            
            ></div>
          </Typography>

          <div className=" w-full grid  grid-cols-1 md:grid-cols-2 gap-6  p-3">
            {members.map((member, index) => (
              <motion.div
                key={member._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <Card className="p-3  shadow-lg border-[1px] rounded-lg bg-white flex flex-col md:flex-row items-center space-y-4 md:0 mb-4  md:h-[18rem]"
                  style={{
                backgroundColor: cardTheme?.bgColor || "white",
                border: `1px solid ${cardTheme?.borderColor || "teal"}`,
                
              }}
                
                >
                  <div className="md:ml-6 md:w-[25%]  flex-shrink-0 mx-2 h-56 md:h-48">
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
                      className=" font-semibold text-start"
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
        </div>
      </div>
      <Partners />
    </>
  );
};

export default ManagementTeam;
