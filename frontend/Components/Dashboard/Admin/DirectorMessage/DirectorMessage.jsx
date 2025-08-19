import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Card, Input, Button, Typography, Select, Option } from '@material-tailwind/react';
import { motion } from 'framer-motion';
import '@fontsource/poppins';
import AxiosRequest from '../../../AxiosRequest/AxiosRequest';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../State/Reducers/tokenSlice';


const DirectorMessage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const storedToken = localStorage.getItem('token');
    const token = useSelector(selectToken) || storedToken;



    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = { title, description };


            const response = await AxiosRequest.patch('/api/director-message/update', body, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success(response.data.msg);
            setTitle('');

            setDescription('');

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

                        <Button
                            type="submit"
                           
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

export default DirectorMessage;
