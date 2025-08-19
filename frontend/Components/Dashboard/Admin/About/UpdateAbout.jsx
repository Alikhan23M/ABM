import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Card, Input, Button, Typography, Select, Option } from '@material-tailwind/react';
import { motion } from 'framer-motion';
import '@fontsource/poppins';
import CloudinaryUpload from '../../../../Utilities/Cloudinary';
import AxiosRequest from '../../../AxiosRequest/AxiosRequest';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../State/Reducers/tokenSlice';
import { FaTimes } from 'react-icons/fa';

const UpdateAbout = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [category, setCategory] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const storedToken = localStorage.getItem('token');
  const token = useSelector(selectToken) || storedToken;
  const [uploaded,setUploaded] = useState(false);


  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e);
  };

  const handleImageUploadSuccess = (url) => {
    setImgUrl(url);
    setUploaded(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { title, description, category };
      if (imgUrl) {
        body.imgUrl = imgUrl;
      }

      const response = await AxiosRequest.patch('/api/about/updateAbout', body, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      toast.success(response.data.msg);
      setTitle('');
      setCategory('');
      setDescription('');
      setImgUrl('');
      setUploaded(false);
      setIsSubmitted(true);
    } catch (err) {
      toast.error(err.response ? err.response.data.msg : 'Server error');
    }
  };

  return (
    <div className="flex items-center justify-center text-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 font-poppins">
      <Toaster />
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }} 
        className="p-6 max-w-md w-full"
      >
        <Card className="p-8 shadow-lg rounded-lg bg-white">
          <Typography variant="h4" className="mb-6 text-black">Update About Us</Typography>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <Input
                label="Title"
                type="text"
                color="black"
                className="focus:!ring-0"
                value={title}
                onChange={handleTitleChange}
                required
              />
            </div>
            <div className="mb-6">
              <Select
                label="Category"
                color="black"
                className="focus:!ring-0"
                value={category}
                onChange={handleCategoryChange}
                required
              >
                <Option value="About">About</Option>
                <Option value="Vision">Vision</Option>
                <Option value="Mission">Mission</Option>
              </Select>
            </div>
            <div className="mb-6">
              <Input
                label="Description"
                type="text"
                color="black"
                className="focus:!ring-0"
                value={description}
                onChange={handleDescriptionChange}
                required
              />
            </div>
            <div className="mb-6 border rounded-lg p-2 border-black">
              <CloudinaryUpload onUploadSuccess={handleImageUploadSuccess} folder='AboutUS' isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted} />
            </div>
            {imgUrl && (
    <div className="mt-3 relative inline-block">
      <img 
        src={imgUrl} 
        alt="Uploaded Preview" 
        className="w-20 h-20 object-cover rounded border border-gray-300"
      />
      <button
        type="button"
        onClick={() => {
          setImgUrl('');
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
              disabled={!uploaded}  // Disable submit button until image is uploaded and URL is set
              className="w-full bg-black shadow-none hover:shadow-md hover:shadow-gray-800"
            >
              Update
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default UpdateAbout;
