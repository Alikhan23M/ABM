import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Card, Input, Button, Typography, Select, Option, Spinner } from '@material-tailwind/react';
import AxiosRequest from '../../../AxiosRequest/AxiosRequest';
import { motion } from 'framer-motion';
import '@fontsource/poppins'; // Ensure you have this font installed via npm/yarn
import CloudinaryUpload from '../../../../Utilities/Cloudinary';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../State/Reducers/tokenSlice';
import { useNavigate } from 'react-router-dom';
import { FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';


const AddUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [picUrl, setPicUrl] = useState('');
  const [role, setRole] = useState('');
  const [userRole, setUserRole] = useState('');
  const [loading, setLoading] = useState(true);
  const storedToken = localStorage.getItem('token');
  const token = useSelector(selectToken) || storedToken;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [uploaded, setUploaded] = useState(false);


  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await AxiosRequest.get('/api/user/getUserById', config);
        setUserRole(response.data.role);
        setLoading(false);
      } catch (error) {
        toast.error(error.response.data.message);
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [token]);

  const handleImageUploadSuccess = (url) => {
    setPicUrl(url);
    setUploaded(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AxiosRequest.post('/api/user/addUser', {
        name,
        email,
        password,
        picUrl,
        role,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      toast.success('User added successfully');
      setName('');
      setEmail('');
      setPassword('');
      setPicUrl('');
      setRole('');
      setUploaded(false);
      setIsSubmitted(true);
    } catch (err) {
      toast.error(err.response.data.msg || err.response.data.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 font-poppins">
        <Spinner className="h-12 w-12 text-black" />
      </div>
    );
  }

  const handleHome = () => {
    navigate('/home')
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  if (userRole !== 'admin') {
    return (
      <div className="flex text-center items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 font-poppins">
        <Card className="p-8 items-center shadow-lg rounded-lg bg-white">
          <Typography variant="h4" className="mb-6 text-black">Insufficient Privileges</Typography>
          <Typography variant="body1" className="text-gray-600 mb-4">
            You do not have the required permissions to access this page. Please contact the administrator if you believe this is an error.
          </Typography>
          <Button
            variant="filled"
            onClick={handleHome}
            className="max-w-md bg-black shadow-none hover:shadow-black hover:shadow-md"
          >
            Go To Home
          </Button>
        </Card>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center text-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 font-poppins">
      <Toaster />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-4 max-w-md w-screen"
      >
        <Card className="p-8 min-w-screen shadow-lg rounded-lg bg-white">
          <Typography variant="h4" className="mb-6 text-black">Add User</Typography>
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
                label="Email"
                type="email"
                color="black"
                className="focus:!ring-0"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6 relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                color="black"
                className="focus:!ring-0"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="absolute inset-y-0 right-3 flex items-center cursor-pointer" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash color='black' /> : <FaEye color='black' />}
              </div>
            </div>
            <div className="mb-6 border rounded-lg p-2 border-black">
              <CloudinaryUpload onUploadSuccess={handleImageUploadSuccess} folder="user_images" isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted} />
            </div>
            {picUrl && (
              <div className="relative inline-block">
                <img
                  src={picUrl}
                  alt="Uploaded Preview"
                  className="w-20 h-20 object-cover rounded border border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPicUrl('');
                    setUploaded(false);
                  }}
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                >
                  <FaTimes size={12} />
                </button>
              </div>
            )}
            <div className="mb-6">
              <Select
                label="Role"
                color="blue-gray"
                variant="outlined"
                className="focus:!ring-0"
                value={role}
                onChange={(value) => setRole(value)}
                required
              >
                <Option className="text-black" value="admin">Admin</Option>
                <Option className="text-black" value="editor">Editor</Option>
                <Option className="text-black" value="moderator">Moderator</Option>
                <Option className="text-black" value="user">User</Option>
              </Select>
            </div>
            <Button
              type="submit"
              disabled={!uploaded}  // Disable submit button until image is uploaded and URL is set
              className="w-full bg-black shadow-none hover:shadow-md hover:shadow-gray-800"
            >
              Add User
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default AddUser;

