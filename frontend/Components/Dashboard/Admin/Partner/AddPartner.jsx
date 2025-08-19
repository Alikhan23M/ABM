import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Card, Typography, Button, Input, Spinner } from '@material-tailwind/react';
import { motion } from 'framer-motion';
import AxiosRequest from '../../../AxiosRequest/AxiosRequest';
import CloudinaryUpload from '../../../../Utilities/Cloudinary';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../State/Reducers/tokenSlice';
import { FaTimes } from 'react-icons/fa';

const AddPartner = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const storedToken = localStorage.getItem('token');
  const token = useSelector(selectToken) || storedToken;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uploaded,setUploaded] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageUploadSuccess = (url) => {
    setImageUrl(url);
    setUploaded(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await AxiosRequest.post(
        '/api/partners/createPartner',
        { name, imageUrl, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Partner added successfully');
      setName('');
      setDescription('');
      setImageUrl('');
      setUploaded(false);
      setIsSubmitted(true);
    } catch (err) {
      toast.error(err.response ? err.response.data.message : 'Server error');
    } finally {
      setLoading(false);
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
        <Typography variant="h4" className="mb-6 text-black">Add Partner</Typography>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <Input
                label="Name"
                type="text"
                color="black"
                className="focus:!ring-0"
                name="name"
                value={name}
                onChange={handleNameChange}
                required
              />
            </div>
            <div className="mb-6">
              <Input
                label="Description"
                type="text"
                color="black"
                className="focus:!ring-0"
                name="description"
                value={description}
                onChange={handleDescriptionChange}
              />
            </div>
            <div className="mb-6">
              <div className="mt-2 border rounded-lg p-2 border-black">
                <CloudinaryUpload onUploadSuccess={handleImageUploadSuccess} folder="Partners" isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted}/>
              </div>
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
            <Button type="submit" 
            disabled={!uploaded}  // Disable submit button until image is uploaded and URL is set
            className="w-full bg-black shadow-none hover:shadow-md hover:shadow-gray-800">
              {loading ? <Spinner className="h-6 w-6 items-center text-center text-white" /> : 'Add Partner'}
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default AddPartner;
