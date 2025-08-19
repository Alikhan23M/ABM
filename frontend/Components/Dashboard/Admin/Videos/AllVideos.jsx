import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Card,
  Typography,
  Button,
  Input,
  Spinner,
} from "@material-tailwind/react";
import { motion } from "framer-motion";
import AxiosRequest from "../../../AxiosRequest/AxiosRequest";
import { useSelector } from "react-redux";
import { selectToken } from "../../../State/Reducers/tokenSlice";
import VideoCloudinary from "../../../../Utilities/VideoCloudinary";
import ReactPlayer from "react-player";

const AllVideos = () => {
  const [videos, setVideos] = useState([]);
  const [editingVideo, setEditingVideo] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [playingIndex, setPlayingIndex] = useState(null);

  const storedToken = localStorage.getItem("token");
  const token = useSelector(selectToken) || storedToken;

  useEffect(() => {
    fetchVideos();
  }, [token]);

  const fetchVideos = async () => {
    try {
      const response = await AxiosRequest.get("/api/videos/videos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVideos(response.data);
      setLoading(false);
    } catch (err) {
      toast.error(err.response ? err.response.data.message : "Server error");
      setLoading(false);
    }
  };

  const handleEditClick = (video) => {
    setEditingVideo(video);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      await AxiosRequest.delete(`/api/videos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVideos(videos.filter((v) => v._id !== id));
      toast.success("Video deleted successfully");
    } catch (err) {
      toast.error(err.response ? err.response.data.message : "Server error");
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingVideo(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const { _id, title, type, videoUrl, embedCode } = editingVideo;
      const payload =
        type === "custom"
          ? { title, type, videoUrl }
          : { title, type, embedCode };

      const response = await AxiosRequest.put(`/api/videos/${_id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setVideos(videos.map((v) => (v._id === _id ? response.data : v)));
      handleDialogClose();
      toast.success("Video updated successfully");
    } catch (err) {
      toast.error(err.response ? err.response.data.message : "Server error");
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingVideo({ ...editingVideo, [name]: value });
  };

  const handleVideoUploadSuccess = (url) => {
    setEditingVideo({ ...editingVideo, videoUrl: url });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 font-poppins">
        <Spinner className="h-12 w-12 text-black" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 font-poppins px-4 md:px-8 lg:px-16">
      <Toaster />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 max-w-6xl w-full"
      >
        <Typography variant="h2" className="mb-6 text-white">
          All Videos
        </Typography>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => {
            const videoUrl =
              video.type === "custom"
                ? video.videoUrl
                : video.type === "embed"
                ? video.embedCode
                : null;

            return (
              <motion.div
                key={video._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <Card className="mb-6 shadow-lg rounded-lg bg-white flex flex-col overflow-hidden h-full">
                  {/* Fixed video container */}
                  <div className="w-full h-[200px] bg-black flex items-center justify-center overflow-hidden">
                    {playingIndex === index ? (
                      video.type === "custom" ? (
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
                      <div
                        className="w-full h-full cursor-pointer"
                        onClick={() => setPlayingIndex(index)}
                      >
                        {video.type === "custom" ? (
                          <video
                            src={videoUrl}
                            className="w-full h-full object-cover"
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

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-grow">
                    <Typography
                      variant="h5"
                      className="text-teal-800 font-semibold text-lg lg:text-xl"
                    >
                      {video.title}
                    </Typography>

                    <Button
                      className="mt-4 bg-black"
                      onClick={() => handleEditClick(video)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="mt-2 bg-red-500"
                      onClick={() => handleDeleteClick(video._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Edit Modal */}
        {editingVideo && (
          <div
            className={`fixed inset-0 z-[999] grid h-screen w-screen place-items-center overflow-y-auto bg-black bg-opacity-60 transition-opacity duration-300 ${
              isDialogOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="relative mx-auto flex w-full max-w-[28rem] flex-col rounded-xl bg-white text-gray-700 shadow-md p-6">
              <h4 className="text-2xl font-semibold mb-4">Edit Video</h4>
              <form onSubmit={handleEditSubmit} >
                {/* Title */}
                <div className="mb-4">
                  <Input
                    label="Title"
                    type="text"
                    name="title"
                    value={editingVideo.title}
                    onChange={handleEditChange}
                    required
                  />
                </div>

                {/* Video Type */}
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium">
                    Video Type
                  </label>
                  <select
                    name="type"
                    value={editingVideo.type}
                    onChange={handleEditChange}
                    className="border border-gray-300 rounded p-2 w-full"
                  >
                    <option value="custom">Custom Upload (Cloudinary)</option>
                    <option value="embed">YouTube Embed URL</option>
                  </select>
                </div>

                {/* Custom Upload */}
                {editingVideo.type === "custom" && (
                  <>
                    {editingVideo.videoUrl && (
                      <video
                        src={editingVideo.videoUrl}
                        className="mb-4 w-full rounded-lg"
                        controls
                      />
                    )}
                    <div className="mt-2 border rounded-lg p-2 border-black">
                      <VideoCloudinary
                        onUploadSuccess={handleVideoUploadSuccess}
                        folder="Videos"
                      />
                    </div>
                  </>
                )}

                {/* Embed URL */}
                {editingVideo.type === "embed" && (
                  <>
                    <Input
                      label="YouTube URL"
                      name="embedCode"
                      value={editingVideo.embedCode || ""}
                      onChange={handleEditChange}
                      required
                    />
                    {editingVideo.embedCode && ReactPlayer.canPlay(editingVideo.embedCode) && (
                      <div className="mt-4">
                        <ReactPlayer
                          url={editingVideo.embedCode}
                          controls
                          width="100%"
                        />
                      </div>
                    )}
                  </>
                )}

                <Button type="submit" className="mt-4 w-full bg-black">
                  Update Video
                </Button>
              </form>
              <Button
                className="mt-4 bg-red-500 w-full"
                onClick={handleDialogClose}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AllVideos;
