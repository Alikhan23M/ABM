import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Card, Typography, Spinner } from '@material-tailwind/react';
import { motion } from 'framer-motion';
import AxiosRequest from '../../../../AxiosRequest/AxiosRequest';
import ReactPlayer from 'react-player';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playingIndex, setPlayingIndex] = useState(null); // track which card is playing

  const [title, setTitle] = useState("Videos");
  const [description, setDescription] = useState(null);

  const [theme,setTheme] = useState(null)
  const fetchTheme = async () => {
    try {
      const res = await AxiosRequest.get("/api/colors/videos");
      if (res.status === 200) setTheme(res.data);
    } catch (error) {
      console.error("Error fetching theme:", error);
    }
  };

  const fetchInfo = async () => {
    const response = await AxiosRequest.get('/api/section-info/videos');
    if (response.status === 200) {
      setTitle(response.data.title);
      setDescription(response.data.description);
    }
  };
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await AxiosRequest.get('/api/videos/videos');
        setVideos(response.data);
        setLoading(false);
      } catch (err) {
        toast.error(err.response ? err.response.data.message : 'Server error');
        setLoading(false);
      }
    };
    fetchVideos();
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
    <div className="flex flex-col items-center justify-start text-center min-h-screen  font-poppins px-4 md:px-8 lg:px-16"
      style={{
        backgroundColor: theme?.config.background.sectionBgColor || "#F6F1EE",
      }}
    >
      <Toaster />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <Typography variant="h2" className="mt-[4vh]"
        style={{ color: textTheme?.headingColor || "teal" }}
        >
          {title}
        </Typography>
        <Typography variant="body1" className="mt-2 mb-[4vh]"
        style={{
          backgroundColor: textTheme?.highlightedTextColor || "gold",
        }}
        >
          {description}
        </Typography>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {videos.map((video, index) => {
          const videoUrl =
            video.type === 'custom'
              ? video.videoUrl // Cloudinary URL
              : video.type === 'upload'
              ? video.videoUrl
              : video.type === 'embed'
              ? video.embedCode
              : null;

          return (
            <motion.div
              key={video._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <Card className="mb-6 shadow-lg rounded-lg flex flex-col overflow-hidden h-full"
               style={{
                backgroundColor: cardTheme?.bgColor || "white",
                border: `1px solid ${cardTheme?.borderColor || "teal"}`,
                boxShadow: `0 2px 6px ${cardTheme?.borderColor || "rgba(0,0,0,0.1)"}`,
              }}
              >
                
                {/* Fixed video container for equal size */}
                <div className="w-full h-[200px] bg-black flex items-center justify-center overflow-hidden">
                  {playingIndex === index ? (
                    // When playing, keep same size
                    video.type === 'custom' ? (
                      <video
                        src={videoUrl}
                        className="w-full h-full object-cover"
                        controls
                        autoPlay
                      />
                    ) : (
                      <ReactPlayer
                        url={videoUrl}
                        playing
                        controls
                        width="100%"
                        height="100%"
                      />
                    )
                  ) : (
                    // Thumbnail preview (same size for all)
                    <div
                      className="w-full h-full cursor-pointer"
                      onClick={() => setPlayingIndex(index)}
                    >
                      {video.type === 'custom' ? (
                        <video
                          src={videoUrl}
                          className="w-full h-full object-fit"
                          muted
                        />
                      ) : (
                        <ReactPlayer
                          url={videoUrl}
                          width="100%"
                          height="100%"
                          light
                          playIcon={
                            <button className="bg-white text-black rounded-full px-3 py-1 font-bold shadow">
                              ▶
                            </button>
                          }
                        />
                      )}
                    </div>
                  )}
                </div>

                {/* Title always aligned */}
                <div className="p-4 flex flex-col flex-grow">
                  <Typography
                    variant="h5"
                    className="font-semibold text-lg lg:text-xl"
                    style={{
                    color: cardTheme?.headingColor || "black",
                  }}
                  >
                    {video.title}
                  </Typography>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Videos;
