import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Card, Typography, Button, Input, Spinner, Select, Option } from '@material-tailwind/react';
import { motion } from 'framer-motion';
import AxiosRequest from '../../../AxiosRequest/AxiosRequest';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../State/Reducers/tokenSlice';
import CloudinaryUpload from '../../../../Utilities/Cloudinary';
import { FaTimes } from 'react-icons/fa';

const AddMember = () => {
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [expertise, setExpertise] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [teamType, setTeamType] = useState(''); // Default teamType
  const storedToken = localStorage.getItem('token');
  const token = useSelector(selectToken) || storedToken;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uploaded,setUploaded] = useState(false);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await AxiosRequest.post('/api/member/createMember', { name, designation, expertise, imageUrl, teamType }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Member added successfully');
      setName('');
      setDesignation('');
      setExpertise('');
      setImageUrl('');
      setTeamType('');
      setUploaded(false);
      setIsSubmitted(true);
    } catch (err) {
      toast.error(err.response ? err.response.data.message : 'Server error');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUploadSuccess = (url) => {
    setImageUrl(url);
    setUploaded(true);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 font-poppins px-4 md:px-8 lg:px-16">
      <Toaster />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 max-w-md w-full bg-white rounded-lg shadow-lg"
      >
        <Card className="bg-white flex flex-col">
        <Typography variant="h4" className="mb-6 text-black">Add New Member</Typography>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <Input
                label="Name"
                type="text"
                color="black"
                className="focus:!ring-0"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <Input
                label="Designation"
                type="text"
                color="black"
                className="focus:!ring-0"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <Input
                label="Expertise"
                type="text"
                color="black"
                className="focus:!ring-0"
                value={expertise}
                onChange={(e) => setExpertise(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <Select
                label="Team Type"
                value={teamType}
                onChange={(value) => setTeamType(value)}
                color="blue-gray"
                className="focus:!ring-0"
              >
                <Option className="text-black" value="Management">Management</Option>
                <Option className="text-black" value="BRM">BRM</Option>
              </Select>
            </div>
            <div className="mb-6 border rounded-lg p-2 border-black">
              <CloudinaryUpload onUploadSuccess={handleImageUploadSuccess} folder="Members" isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted}/>
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
            disabled={!uploaded}
            className="w-full bg-black shadow-none hover:shadow-md hover:shadow-gray-800">
              {loading ? <Spinner className="h-5 w-5" /> : 'Add Member'}
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default AddMember;
