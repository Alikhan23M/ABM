import React, { useEffect, useState } from 'react';
import { Card, Typography, Spinner } from '@material-tailwind/react';
import { motion } from 'framer-motion';
import AxiosRequest from '../../AxiosRequest/AxiosRequest';

const MessageFromExecDir = () => {
  const [title, setTitle] = useState('Message from Executive director');
  const [description, setDescription] = useState('No Message available');
  const [theme, setTheme] = useState(null);
const fetchTheme = async()=>{
  try {
    const response = await AxiosRequest.get('/api/colors/message-from-executive-director');
    if (response.data && response.status === 200) {
      setTheme(response.data);
    }
  } catch (error) {
    console.log(error);
  }
}
  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await AxiosRequest.get('/api/director-message');
        if (response.data !== null && response.status === 200) {
          setTitle(response.data.title);
          setDescription(response.data.description);
        }
      } catch (error) {
        console.log(error);
      }
    
    };

    getMessage();
  }, [])


  return (
    <div className="flex flex-col justify-start items-center  font-poppins min-h-screen p-6"
    style={{backgroundColor:theme?.config.background.sectionBgColor || "#F5F6F5"}}
    >
      <Typography variant="h2" color="white" className="mb-[8vh] mt-[4vh] text-center"
      
      style={{color:theme?.config.text.headingColor || "#0F766E"}}
      >
        {title}
      </Typography>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <Card className="w-full p-8 shadow-lg rounded-lg"
        style={{backgroundColor:theme?.config.background.containerBgColor || "#ffffff"}}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
          </motion.div>
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="list-disc pl-2 text-justify space-y-2"
          >
            <Typography className="text-lg"
            style={{color:theme?.config.text.paragraphColor || "#000000"}}
            >
              {description}
            </Typography>
          </motion.ul>
        </Card>
      </motion.div>
    </div>
  );
};

export default MessageFromExecDir;
