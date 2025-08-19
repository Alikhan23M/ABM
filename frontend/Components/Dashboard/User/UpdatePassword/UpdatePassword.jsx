import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Card, Input, Button, Typography, Spinner } from '@material-tailwind/react';
import AxiosRequest from '../../../AxiosRequest/AxiosRequest';
import { motion } from 'framer-motion';
import '@fontsource/poppins'; // Ensure you have this font installed via npm/yarn
import { useSelector } from 'react-redux';
import { selectToken } from '../../../State/Reducers/tokenSlice';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const storedToken = localStorage.getItem('token');
  const token = useSelector(selectToken) || storedToken;
  const navigate = useNavigate();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('New Password and Confirm Password do not match');
      return;
    }
    setLoading(true);
    try {
      await AxiosRequest.put(
        '/api/user/updatePasswordSelf',
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Password updated successfully');
      navigate('/home');
    } catch (err) {
      toast.error(err.response.data.msg || err.response.data.message);
      setLoading(false);
    }
  };

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex flex-col text-center items-center justify-start min-h-screen bg-[#F6F1EE] font-poppins p-6">
      <Toaster />
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }} 
        className="p-4 max-w-md w-screen"
      >
        <Card className="p-8 min-w-screen mt-[2vh] shadow-lg rounded-lg bg-white">
          <Typography variant="h4" className="mb-6 text-black">Update Password</Typography>
          <form onSubmit={handleSubmit}>
            <div className="mb-6 relative">
              <Input
                label="Current Password"
                type={showCurrentPassword ? 'text' : 'password'}
                color="black"
                className="focus:!ring-0"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <div className="absolute inset-y-0 right-3 flex items-center cursor-pointer" onClick={toggleCurrentPasswordVisibility}>
                {showCurrentPassword ? <FaEyeSlash color="black" /> : <FaEye color="black" />}
              </div>
            </div>
            <div className="mb-6 relative">
              <Input
                label="New Password"
                type={showNewPassword ? 'text' : 'password'}
                color="black"
                className="focus:!ring-0"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <div className="absolute inset-y-0 right-3 flex items-center cursor-pointer" onClick={toggleNewPasswordVisibility}>
                {showNewPassword ? <FaEyeSlash color="black" /> : <FaEye color="black" />}
              </div>
            </div>
            <div className="mb-6 relative">
              <Input
                label="Confirm New Password"
                type={showConfirmPassword ? 'text' : 'password'}
                color="black"
                className="focus:!ring-0"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <div className="absolute inset-y-0 right-3 flex items-center cursor-pointer" onClick={toggleConfirmPasswordVisibility}>
                {showConfirmPassword ? <FaEyeSlash color="black" /> : <FaEye color="black" />}
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-black shadow-none hover:shadow-md hover:shadow-gray-800"
              disabled={loading}
            >
              Update Password
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default UpdatePassword;
