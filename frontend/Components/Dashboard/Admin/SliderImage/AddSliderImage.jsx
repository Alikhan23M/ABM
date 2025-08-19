import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { motion } from 'framer-motion';
import CloudinaryUpload from '../../../../Utilities/Cloudinary';
import AxiosRequest from '../../../AxiosRequest/AxiosRequest';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../State/Reducers/tokenSlice';
import { FaTimes } from 'react-icons/fa';

const AddSliderImage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const storedToken = localStorage.getItem('token');
  const token = useSelector(selectToken) || storedToken;
  const [uploaded, setUploaded] = useState(false);


  const handleImageUploadSuccess = (url) => {
    setImageUrl(url);
    setUploaded(true);

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await AxiosRequest.post('/api/slider-images/addImage', { title, description, imageUrl }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      toast.success('Slider image added successfully');
      setTitle('');
      setDescription('');
      setImageUrl('');
      setUploaded(false);
      setIsSubmitted(true);
    } catch (error) {
      toast.error(error.response ? error.response.data.message : 'Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 font-poppins">
      <Toaster />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-4 max-w-md w-screen"
      >
        <Card className="p-8 min-w-screen items-center text-center justify-center shadow-lg rounded-lg bg-white">
          <Typography variant="h4" className="mb-6 text-black">Add Slider Image</Typography>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <Input
                label="Title"
                type="text"
                color="black"
                className="focus:!ring-0"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <Input
                label="Description"
                type="text"
                color="black"
                className="focus:!ring-0"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="mb-6 border rounded-lg p-2 border-black">
              <CloudinaryUpload onUploadSuccess={handleImageUploadSuccess} folder="SliderImages" isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted} />
            </div>
            {imageUrl && (
              <div className="relative inline-block">
                <img
                  src={imageUrl}
                  alt="Uploaded Preview"
                  className="w-20 h-20 object-cover rounded border border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImageUrl('');
                    setUploaded(false);
                  }}
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                >
                  <FaTimes size={12} />
                </button>
              </div>
            )}
            <Button
              type="submit"
              disabled={!uploaded}
              className="w-full bg-black shadow-none hover:shadow-md hover:shadow-gray-800"
            >
              {loading ? 'Adding...' : 'Add Slider Image'}
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default AddSliderImage;
