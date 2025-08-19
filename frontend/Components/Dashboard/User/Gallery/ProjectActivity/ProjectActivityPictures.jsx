import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Typography, Spinner, Card } from '@material-tailwind/react';
import { motion } from 'framer-motion';
import AxiosRequest from '../../../../AxiosRequest/AxiosRequest';

const ProjectActivityPictures = () => {
  const { state } = useLocation();
  const projectId = state?.projectId;

  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("Projects");
  const [description, setDescription] = useState(null);

  const [theme,setTheme] = useState(null)
  const fetchTheme = async () => {
    try {
      const res = await AxiosRequest.get("/api/colors/project-activity-pictures");
      if (res.status === 200) setTheme(res.data);
    } catch (error) {
      console.error("Error fetching theme:", error);
    }
  };

  const fetchInfo = async () => {
    const response = await AxiosRequest.get('/api/section-info/project-activity-pictures');
    if (response.status === 200) {
      setTitle(response.data.title);
      setDescription(response.data.description);
    }
  };

  useEffect(() => {
    const fetchPictures = async () => {
      try {
        if (projectId) {
          // Fetch only the selected project
          const response = await AxiosRequest.get(`/api/project/${projectId}`);
          const project = response.data;
          setTitle(`${project.title} - Activity Pictures`);
          setPictures(
            project.images.map((imgUrl, index) => ({
              _id: `${project._id}-${index}`,
              title: project.title,
              imageUrl: imgUrl,
            }))
          );
        } else {
          // Fetch all projects
          const response = await AxiosRequest.get(`/api/project/getProject`);
          const allImages = [];
          response.data.forEach(project => {
            project.images.forEach((imgUrl, index) => {
              allImages.push({
                _id: `${project._id}-${index}`,
                title: project.title,
                imageUrl: imgUrl,
              });
            });
          });
          setPictures(allImages);
        }
        setLoading(false);
      } catch (err) {
        toast.error(err.response ? err.response.data.message : 'Server error');
        setLoading(false);
      }
    };

    fetchPictures();
  }, [projectId]);

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
    <div className="flex flex-col items-center text-center min-h-screen  font-poppins px-4 md:px-8 lg:px-16 pb-4"
      style={{
        backgroundColor: theme?.config.background.sectionBgColor || "#F5F6F5",
      }}
    >
      <Toaster />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full flex flex-col items-center mb-[4vh]"
      >
        <Typography variant="h2" className="mt-[4vh]"
         style={{ color: textTheme?.headingColor || "teal" }}
        >
          {title}
        </Typography>

        <div className="h-1 w-[15vw] rounded-md"  style={{
          backgroundColor: textTheme?.highlightedTextColor || "gold",
        }}></div>

        <Typography variant="body1" className="mt-2"
         style={{ color: textTheme?.paragraphColor || "black" }}
        >
          {description}
        </Typography>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
        {pictures.map((picture, index) => (
          <motion.div
            key={picture._id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * index, duration: 0.5 }}
          >
            <Card className="p-4  rounded-lg flex flex-col items-center"
            style={{
                backgroundColor: cardTheme?.bgColor || "white",
                border: `1px solid ${cardTheme?.borderColor || "teal"}`,
                boxShadow: `0 2px 6px ${cardTheme?.borderColor || "rgba(0,0,0,0.1)"}`,
              }}
            >
              <Typography
                variant="h5"
                className="text-teal-800 font-semibold text-lg mb-4 text-center"
                style={{
                    color: cardTheme?.headingColor || "black",
                  }}
              >
                {picture.title}
              </Typography>
              <img
                src={picture.imageUrl}
                alt={picture.title}
                className="w-full h-56 object-cover rounded-md border"
              />
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectActivityPictures;
