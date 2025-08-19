import React, { useState } from 'react';
import AxiosRequest from '../../AxiosRequest/AxiosRequest';
import { toast, Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import {Input,Button} from "@material-tailwind/react"

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(!email){
                toast.warning('Please Provide A Registered Email Address')
                return;
            }
            const promise = AxiosRequest.post('https://abm-wbw0.onrender.com/api/user/forgotPassword', { email });
            toast.promise(
                promise,
                {
                    pending: 'Sending Verification Code...',
                    success: 'Verification code sent successfully',
                    error: 'Failed to send verification code'
                }
            );
            await promise;
        } catch (error) {
                toast.error(error.response.data.msg);
        }
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 font-poppins">
        <Toaster />
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-8 max-w-4xl w-full p-8"
        >
                <section className="flex justify-center items-center">
                <div className="flex flex-col max-w-lg w-full p-8 bg-white rounded-lg shadow-md">
                        <h2 className='text-2xl font-bold text-center mb-6'>Forgot Password</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="relative">
                                <Input 
                                    className='focus:ring-0' 
                                    variant='outlined' 
                                    size='lg' 
                                    color='black'
                                    type="email" 
                                    label="Enter your email" 
                                    value={email} 
                                    onChange={handleChange} 
                                />
                            </div>
                            <Button type="submit" className="bg-black text-white py-4 shadow-none rounded-lg hover:shadow-gray-500 hover:shadow-md">Submit</Button>
                        </form>
                    </div>
                </section>
                </motion.div>
                </div>
    );
};

export default ForgotPassword;
