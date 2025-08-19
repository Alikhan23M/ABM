import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Card, Input, Button, Typography, Checkbox } from '@material-tailwind/react';
import { motion } from 'framer-motion';
import '@fontsource/poppins';
import AxiosRequest from '../../../AxiosRequest/AxiosRequest';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../State/Reducers/tokenSlice';

const AddCareer = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [applyLink, setApplyLink] = useState('');
    const [location, setLocation] = useState('');
    const [isInternship, setIsInternship] = useState(false); // New state
    const storedToken = localStorage.getItem('token');
    const token = useSelector(selectToken) || storedToken;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = { title, description, applyLink, location, isInternship };

            const response = await AxiosRequest.post('/api/career/addNew', body, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success('Career added successfully!');
            // Reset form
            setTitle('');
            setDescription('');
            setApplyLink('');
            setLocation('');
            setIsInternship(false);
        } catch (err) {
            toast.error(err.response ? err.response.data.message : 'Server error');
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
                    <Typography variant="h4" className="mb-6 text-black">Add New Career</Typography>
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
                        <div className="mb-6">
                            <Input
                                label="Apply Link"
                                type="url"
                                color="black"
                                className="focus:!ring-0"
                                value={applyLink}
                                onChange={(e) => setApplyLink(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <Input
                                label="Location"
                                type="text"
                                color="black"
                                className="focus:!ring-0"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6 flex items-center gap-2">
                            <Checkbox
                                id="internship"
                                checked={isInternship}
                                onChange={(e) => setIsInternship(e.target.checked)}
                            />
                            <label htmlFor="internship" className="text-black">Is Internship?</label>
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-black shadow-none hover:shadow-md hover:shadow-gray-800"
                        >
                            Add Career
                        </Button>
                    </form>
                </Card>
            </motion.div>
        </div>
    );
};

export default AddCareer;
