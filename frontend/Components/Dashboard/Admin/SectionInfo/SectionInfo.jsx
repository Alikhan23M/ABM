import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Card, Input, Button, Typography, Dialog, DialogHeader, DialogBody, DialogFooter, IconButton } from '@material-tailwind/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../State/Reducers/tokenSlice'; // Adjust this path as needed
import AxiosRequest from '../../../AxiosRequest/AxiosRequest';

// Base URL for API requests
const API_BASE_URL = '/api/section-info';

// Main component for the admin dashboard
const SectionInfo = () => {
    // State to hold the list of all sections
    const [sections, setSections] = useState([]);
    // State to manage the dialog's open/close status
    const [open, setOpen] = useState(false);
    // State for the data of the section being edited
    const [editData, setEditData] = useState({
        title: '',
        description: '',
        buttonText: '',
        buttonLink: '',
        position: ''
    });
    const [loading, setLoading] = useState(false);
    
    // Get the auth token from Redux or local storage
    const storedToken = localStorage.getItem('token');
    const token = useSelector(selectToken) || storedToken;

    // Fetch all section information from the API
    const fetchSections = async () => {
        setLoading(true);
        try {
            const response = await AxiosRequest.get(API_BASE_URL);
            // Defensive check: ensure the response is an array before setting the state
            if (Array.isArray(response.data)) {
                setSections(response.data);
            } else {
                console.error('API response for sections was not an array:', response.data);
                toast.error('Received unexpected data format from the server.');
                setSections([]); // Set to an empty array to prevent crashes
            }
        } catch (error) {
            toast.error('Error fetching sections: ' + (error.response?.data?.message || error.message));
            setSections([]); // Ensure sections is an array even on error
        } finally {
            setLoading(false);
        }
    };

    // Load sections on initial component render
    useEffect(() => {
        fetchSections();
    }, []);

    // Open the edit dialog and populate it with selected section's data
    const handleOpen = async (position) => {
        setLoading(true);
        try {
            const response = await AxiosRequest.get(`${API_BASE_URL}/${position}`);
            setEditData(response.data);
            setOpen(true);
        } catch (error) {
            toast.error('Error fetching section data: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    // Close the edit dialog
    const handleClose = () => {
        setOpen(false);
        setEditData({ title: '', description: '', buttonText: '', buttonLink: '', position: '' });
    };

    // Handle form input changes in the dialog
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData(prevData => ({ ...prevData, [name]: value }));
    };

    // Handle the update submission
    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await AxiosRequest.put(`${API_BASE_URL}/${editData.position}`, editData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            // Find the updated section and replace it in the state
            setSections(prevSections => prevSections.map(section => 
                section.position === editData.position ? response.data : section
            ));

            toast.success('Section updated successfully!');
            handleClose(); // Close the dialog on success
        } catch (error) {
            toast.error('Error updating section: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 font-poppins p-4">
            <Toaster />
            <motion.div 
                initial={{ opacity: 0, y: 50 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }} 
                className="p-6 max-w-4xl w-full"
            >
                <Card className="p-8 shadow-lg rounded-lg bg-white">
                    <Typography variant="h4" className="mb-6 text-black text-center">Manage Sections</Typography>
                    
                    {loading && <div className="text-center py-4 text-gray-600">Loading...</div>}

                    {!loading && sections.length > 0 && (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[700px] table-auto">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Title</th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Position</th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Description</th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sections.map((section, index) => (
                                        <tr key={section.position} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                                            <td className="border-b border-gray-200 px-4 py-2 text-sm text-gray-800 font-medium">{section.title}</td>
                                            <td className="border-b border-gray-200 px-4 py-2 text-sm text-gray-600">{section.position}</td>
                                            <td className="border-b border-gray-200 px-4 py-2 text-sm text-gray-600 truncate max-w-xs">{section.description || 'N/A'}</td>
                                            <td className="border-b border-gray-200 px-4 py-2 text-sm text-gray-600">
                                                <IconButton 
                                                    onClick={() => handleOpen(section.position)}
                                                    variant="text"
                                                    color="blue"
                                                    size="sm"
                                                >
                                                    <FaEdit className="h-4 w-4" />
                                                </IconButton>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Card>
            </motion.div>

            {/* Edit Dialog */}
            <AnimatePresence>
                {open && (
                    <Dialog open={open} handler={handleClose} animate={{ mount: { scale: 1, y: 0 }, unmount: { scale: 0.9, y: -100 } }}>
                        <DialogHeader>
                            <Typography variant="h5">Edit Section: {editData.title}</Typography>
                            <IconButton variant="text" color="blue-gray" onClick={handleClose}>
                                <FaTimes />
                            </IconButton>
                        </DialogHeader>
                        <form onSubmit={handleUpdate}>
                            <DialogBody divider className="flex flex-col gap-4">
                                <Input 
                                    label="Title" 
                                    name="title" 
                                    value={editData.title} 
                                    onChange={handleInputChange} 
                                    
                                />
                                <Input 
                                    label="Description" 
                                    name="description" 
                                    value={editData.description} 
                                    onChange={handleInputChange} 
                                />
                                <Input 
                                    label="Button Text" 
                                    name="buttonText" 
                                    value={editData.buttonText} 
                                    onChange={handleInputChange} 
                                />
                                <Input 
                                    label="Button Link" 
                                    name="buttonLink" 
                                    value={editData.buttonLink} 
                                    onChange={handleInputChange} 
                                />
                            </DialogBody>
                            <DialogFooter>
                                <Button
                                    variant="text"
                                    color="red"
                                    onClick={handleClose}
                                    className="mr-1"
                                >
                                    <span>Cancel</span>
                                </Button>
                                <Button variant="gradient" color="green" type="submit" disabled={loading}>
                                    <span>{loading ? 'Updating...' : 'Save Changes'}</span>
                                </Button>
                            </DialogFooter>
                        </form>
                    </Dialog>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SectionInfo;
