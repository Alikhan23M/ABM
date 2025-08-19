import React, { useState } from 'react';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import AxiosRequest from '../../../AxiosRequest/AxiosRequest';
import {toast,Toaster} from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../State/Reducers/tokenSlice';

const UpdateContactUs = () => {
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
const storedToken = localStorage.getItem('token');
const token = useSelector(selectToken)||storedToken;

  const handleUpdateContactUs = async (e) => {
    e.preventDefault();
    try {
      const response = await AxiosRequest.post('/api/contactus/update', { address, email, phone },{
        headers:{
            Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200 || response.status === 201) {
        toast.success('Contact information updated successfully');
      }
    } catch (error) {
      toast.error('Failed to update contact information');
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
          <Typography variant="h4" className="mb-6 text-black">
            Update Contact Information
          </Typography>
          <form onSubmit={handleUpdateContactUs}>
            <div className="mb-6">
              <Input
                label="Address"
                type="text"
                color="black"
                className="focus:!ring-0"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <Input
                label="Email"
                type="text"
                color="black"
                className="focus:!ring-0"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <Input
                label="Phone"
                type="tel"
                color="black"
                className="focus:!ring-0"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-black shadow-none hover:shadow-md hover:shadow-gray-800"
            >
              Update Contact Us
            </Button>
          </form>
        </Card>
        </motion.div>
        </div>
  );
};

export default UpdateContactUs;
