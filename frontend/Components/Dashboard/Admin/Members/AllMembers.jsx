import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Card, Typography, Button, Input, Spinner, Avatar, Select, Option, CardFooter } from '@material-tailwind/react';
import { motion } from 'framer-motion';
import AxiosRequest from '../../../AxiosRequest/AxiosRequest';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../State/Reducers/tokenSlice';
import CloudinaryUpload from '../../../../Utilities/Cloudinary';
import { FaTimes } from 'react-icons/fa'; // Import Close icon from Font Awesome

const AllMembers = () => {
  const [members, setMembers] = useState([]);
  const [editingMember, setEditingMember] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [viewingMember, setViewingMember] = useState(null);
  const [isViewingDialogOpen, setIsViewingDialogOpen] = useState(false);
  const storedToken = localStorage.getItem('token');
  const token = useSelector(selectToken) || storedToken;

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await AxiosRequest.get('/api/member/getTeam', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setMembers(response.data);
        setLoading(false);
      } catch (err) {
        toast.error(err.response ? err.response.data.message : 'Server error');
        setLoading(false);
      }
    };

    fetchMembers();
  }, [token]);

  const handleEditClick = (member) => {
    setEditingMember(member);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      await AxiosRequest.delete(`/api/member/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMembers(members.filter(member => member._id !== id));
      toast.success('Member deleted successfully');
    } catch (err) {
      toast.error(err.response ? err.response.data.message : 'Server error');
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingMember(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const { _id, name, designation, expertise, imageUrl,teamType } = editingMember;
      const response = await AxiosRequest.put(`/api/member/${_id}`, { name, designation, expertise, imageUrl,teamType }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMembers(members.map(member => (member._id === _id ? response.data : member)));
      handleDialogClose();
      toast.success('Member updated successfully');
    } catch (err) {
      toast.error(err.response ? err.response.data.message : 'Server error');
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingMember({ ...editingMember, [name]: value });
  };
  const handleSelectChange = (value) => {
    setEditingMember({ ...editingMember, teamType: value });
  };

  const handleImageUploadSuccess = (url) => {
    setEditingMember({ ...editingMember, imageUrl: url });
  };

  const handleViewClick = (member) => {
    setViewingMember(member);
    setIsViewingDialogOpen(true);
  };

  const handleViewingDialogClose = () => {
    setIsViewingDialogOpen(false);
    setViewingMember(null);
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
        className="p-6 max-w-4xl w-full"
      >
        <Typography variant="h2" className="mb-6 text-white">All Members</Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <motion.div
              key={member._id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-6 mb-6 shadow-lg rounded-lg bg-white flex flex-col ">
                {member.imageUrl && (
                  <Avatar src={member.imageUrl} alt={member.name} className="mb-4 w-20 h-20 object-cover rounded-full mx-auto" />
                )}
                <Typography variant="h5" className="mb-4 text-black text-base sm:text-lg md:text-xl lg:text-2xl">{member.name}</Typography>
                <Typography variant="body1" className="mb-4 text-black text-sm sm:text-base md:text-lg">
                
                    <span className="cursor-pointer text-blue-500" onClick={() => handleViewClick(member)}>
                      Read More
                    </span>

                </Typography>
                <CardFooter>
                <Typography variant="body1" className="mb-4 text-black text-base sm:text-lg md:text-lg lg:text-xl">Team<br/>{member.teamType}</Typography>
                </CardFooter>
                <Button className="mt-auto w-full bg-black shadow-none hover:shadow-md hover:shadow-gray-800" onClick={() => handleEditClick(member)}>
                  Edit
                </Button>
                <Button className="w-full bg-red-500 mt-2 shadow-none hover:shadow-md hover:shadow-gray-800" onClick={() => handleDeleteClick(member._id)}>
                  Delete
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {editingMember && (
          <div className={`fixed inset-0 z-50 grid place-items-center bg-black bg-opacity-60 transition-opacity duration-300 ${isDialogOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div className="relative mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md p-6">
              <div className="absolute top-0 right-0 p-2 cursor-pointer" onClick={handleDialogClose}>
                <FaTimes className="text-black text-xl" />
              </div>
              <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                Edit Member
              </h4>
              <form onSubmit={handleEditSubmit}>
                <div className="mb-6">
                  <Input
                    label="Name"
                    type="text"
                    color="black"
                    className="focus:!ring-0"
                    name="name"
                    value={editingMember.name}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="mb-6">
              <Select
                label="Team Type"
                value={editingMember.teamType}
                onChange={(value) => handleSelectChange(value)}
                color="blue-gray"
                className="focus:!ring-0"
              >
                <Option className="text-black" value="Management">Management</Option>
                <Option className="text-black" value="BRM">BRM</Option>
              </Select>
            </div>
                <div className="mb-6">
                  <Input
                    label="Designation"
                    type="text"
                    color="black"
                    className="focus:!ring-0"
                    name="designation"
                    value={editingMember.designation}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="mb-6">
                  <Input
                    label="Expertise"
                    type="text"
                    color="black"
                    className="focus:!ring-0"
                    name="expertise"
                    value={editingMember.expertise}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="mb-6">
                  <div className="mt-2 border rounded-lg p-2 border-black">
                    <CloudinaryUpload onUploadSuccess={handleImageUploadSuccess} folder="Members" />
                  </div>
                </div>
                {editingMember.imageUrl && (
                          <div className="relative inline-block">
                            <img
                              src={editingMember.imageUrl}
                              alt="Uploaded Preview"
                              className="w-20 h-20 object-cover rounded border border-gray-300"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setEditingMember({ ...editingMember, imageUrl: '' });
                                // setUploaded(false);
                              }}
                              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                            >
                              <FaTimes size={12} />
                            </button>
                          </div>
                        )}
                <Button type="submit" className="w-full bg-black shadow-none hover:shadow-md hover:shadow-gray-800">
                  Update Member
                </Button>
              </form>
            </div>
          </div>
        )}

        {viewingMember && (
          <div className={`fixed inset-0 z-50 grid place-items-center bg-black bg-opacity-60 transition-opacity duration-300 ${isViewingDialogOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div className="relative mx-auto flex w-full max-w-[30rem] max-h-[30rem] flex-col rounded-xl bg-white gap-4 bg-clip-border text-gray-700 overflow-y-auto shadow-md p-6">
              <div className="absolute top-0 right-0 p-2 cursor-pointer" onClick={handleViewingDialogClose}>
                <FaTimes className="text-black text-xl" />
              </div>
              {viewingMember.imageUrl && (
                <Avatar src={viewingMember.imageUrl} alt={viewingMember.name} className="mb-4 w-20 h-20 object-cover rounded-full mx-auto" />
              )}
              <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                {viewingMember.name}
              </h4>
              <Typography variant="body1" className="mb-4 text-black text-sm sm:text-base md:text-lg">
                <strong>Designation:</strong><br/> {viewingMember.designation}
              </Typography>
              <Typography variant="body1" className="mb-4 text-black text-sm sm:text-base md:text-lg">
                <strong>Expertise:</strong><br/> {viewingMember.expertise}
              </Typography>
              <Typography variant="body1" className="mb-4 text-black text-sm sm:text-base md:text-lg">
                <strong>Team:</strong><br/> {viewingMember.teamType}
              </Typography>

            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AllMembers;
