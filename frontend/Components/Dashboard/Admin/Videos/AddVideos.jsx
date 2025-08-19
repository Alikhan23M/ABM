import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Card, Input, Button, Typography, Select, Option } from '@material-tailwind/react';
import { motion } from 'framer-motion';
import AxiosRequest from '../../../AxiosRequest/AxiosRequest';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../State/Reducers/tokenSlice';
import VideoCloudinary from '../../../../Utilities/VideoCloudinary';

const AddVideos = () => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'custom',
    videoUrl: '',
    embedCode: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const storedToken = localStorage.getItem('token');
  const [uploaded, setUploaded] = useState(false);
  const token = useSelector(selectToken) || storedToken;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleVideoUploadSuccess = (url) => {
    setFormData(prev => ({ ...prev, videoUrl: url }));
    setUploaded(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosRequest.post('https://abm-wbw0.onrender.com/api/videos/addVideos', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Video added successfully!');
      setFormData({ title: '', type: 'custom', videoUrl: '', embedCode: '' });
      setUploaded(false);
      setIsSubmitted(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add video');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 font-poppins">
      <Toaster />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 max-w-md w-full"
      >
        <Card className="p-8 shadow-lg rounded-lg bg-white">
          <Typography variant="h4" className="mb-6 text-black">
            Add New Video
          </Typography>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <Input
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-6">
              <Select
                label="Video Type"
                value={formData.type}
                onChange={(val) => setFormData(prev => ({ ...prev, type: val }))}
              >
                <Option value="custom">Custom Upload</Option>
                <Option value="embed">Embed Link</Option>
              </Select>
            </div>

            {formData.type === 'custom' ? (
              <div className="mb-6 border rounded-lg p-2 border-black">
                <VideoCloudinary
                  onUploadSuccess={handleVideoUploadSuccess}
                  folder="Videos"
                  isSubmitted={isSubmitted}
                  setIsSubmitted={setIsSubmitted}
                />
              </div>
            ) : (
              <div className="mb-6">
                <Input
                  label="Embed Code or Link"
                  name="embedCode"
                  value={formData.embedCode}
                  onChange={handleChange}
                  required={formData.type === 'embed'}
                />
              </div>
            )}

            <Button
              type="submit"
              disabled={formData.type === 'custom' && !uploaded}
              className="w-full bg-black shadow-none hover:shadow-md hover:shadow-gray-800"
            >
              Add Video
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default AddVideos;
