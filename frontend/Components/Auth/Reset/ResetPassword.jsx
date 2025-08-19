import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AxiosRequest from '../../AxiosRequest/AxiosRequest';
import { toast, Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input, Button } from '@material-tailwind/react';

const ResetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');


    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'newPassword') setNewPassword(value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = location.pathname.split('/').pop();
            console.log('token: ' + token);
            await AxiosRequest.post(`https://abm-wbw0.onrender.com/api/user/resetPassword/${token}`, { password:newPassword });
            toast.success('Password reset successfully');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
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
                    <h2 className='text-2xl font-bold text-center mb-6'>Reset Password</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="relative">
                            <Input
                                className='focus:ring-0'
                                variant='outlined'
                                size='lg'
                                color='black'
                                type={showPassword ? "text" : "password"}
                                name="newPassword"
                                label="Enter new password"
                                value={newPassword}
                                onChange={handleChange}
                            />
                                <div className="absolute inset-y-0 right-3 flex items-center cursor-pointer" onClick={togglePasswordVisibility}>
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} color='black' />
                                </div>
                        </div>
                        <Button type="submit" className="bg-black text-white py-4 shadow-none rounded-lg hover:shadow-gray-500 hover:shadow-md">Reset Password</Button>
                    </form>
                </div>
            </section>
            </motion.div>
            </div>
    );
};

export default ResetPassword;
