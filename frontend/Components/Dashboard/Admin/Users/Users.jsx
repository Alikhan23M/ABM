import React, { useEffect, useState } from 'react';
import { Card, Typography, Avatar, Spinner, Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input } from '@material-tailwind/react';
import toast, { Toaster } from 'react-hot-toast';
import AxiosRequest from '../../../AxiosRequest/AxiosRequest';
import { motion } from 'framer-motion';
import '@fontsource/poppins';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../State/Reducers/tokenSlice';
import { FaTimes,FaEye,FaEyeSlash } from 'react-icons/fa';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const storedToken = localStorage.getItem('token');
  const token = useSelector(selectToken) || storedToken;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await AxiosRequest.get('/api/user/getAllUsers', config);
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        toast.error(err.response.data.msg || err.response.data.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
};

const toggleNewPasswordVisibility = () => {
  setShowNewPassword(!showNewPassword);
};


  const handleDelete = async (userId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await AxiosRequest.delete(`/api/user/${userId}`, config);
      setUsers(users.filter(user => user._id !== userId));
      toast.success('User deleted successfully');
    } catch (err) {
      toast.error(err.response.data.msg || err.response.data.message);
    }
  };

  const handleUpdatePassword = (userId) => {
    setSelectedUserId(userId);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedUserId(null);
    setCurrentPassword('');
    setNewPassword('');
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await AxiosRequest.put('/api/user/updatePassword', {
        userId: selectedUserId,
        currentPassword,
        newPassword
      }, config);
      toast.success('Password updated successfully');
      handleDialogClose();
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

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 py-10 font-poppins">
      <Toaster/>
      <div className="container mx-auto px-4">
        <Typography variant="h3" className="text-white mb-8 text-center">
          All Users
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {users.map(user => (
            <motion.div 
              key={user._id} 
              initial={{ opacity: 0, y: 50 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }}
            >
              <Card className="p-6 flex flex-col gap-1 items-center text-center bg-white shadow-lg rounded-lg">
                <Avatar src={user.picUrl} alt={user.name} size="lg" />
                <Typography variant="h5" className="text-black">{user.name}</Typography>
                <Typography variant="subtitle1" className="text-gray-600">{user.email}</Typography>
                <Typography variant="subtitle2" className="text-gray-500">{user.role}</Typography>
                <Typography
    variant="subtitle2"
    className={`text-gray-500 ${user?.status === 'Online' ? 'text-green-500' : 'text-red-500'}`}
>
    {user?.status || 'Unknown'}
</Typography>
                <Button className="w-full bg-red-500 mt-2 shadow-none hover:shadow-md hover:shadow-gray-800" onClick={() => handleDelete(user._id)}>
                  Delete
                </Button>
                <Button className="w-full bg-black mt-2 shadow-none hover:shadow-md hover:shadow-gray-800" onClick={() => handleUpdatePassword(user._id)}>
                  Update Password
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

        <Toaster/>
        <div
            className={`fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 transition-opacity duration-300 ${
              dialogOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
        <div className="relative mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md p-6">
      <div className="absolute top-0 right-0 p-2 cursor-pointer" onClick={handleDialogClose}>
                <FaTimes className="text-black text-xl" />
              </div>
              <div className='flex flex-col items-center justify-center text-center'>
        <DialogHeader>Update Password</DialogHeader>
        <DialogBody>
          <div className="relative mb-6">
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
                {showCurrentPassword ? <FaEyeSlash color='black'/> : <FaEye color='black'/>} 
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
                {showNewPassword ? <FaEyeSlash color='black'/> : <FaEye color='black'/>} 
             </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="filled" className="w-full bg-black shadow-none hover:shadow-md hover:shadow-gray-800" onClick={handlePasswordSubmit}>
            Update
          </Button>
        </DialogFooter>
        </div>
        </div>
        </div>
    </div>
  );
};

export default Users;

