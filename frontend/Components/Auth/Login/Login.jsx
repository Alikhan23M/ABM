import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosRequest from '../../AxiosRequest/AxiosRequest';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Button, Input, Typography, Card } from '@material-tailwind/react';
import { useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { setEmailAction } from '../../State/Reducers/emailSlice';
import { setTokenAction } from '../../State/Reducers/tokenSlice';
import { motion } from 'framer-motion';
import '@fontsource/poppins';
import { setRoleAction } from '../../State/Reducers/roleSlice';
import { setUserIdAction } from '../../State/Reducers/userIdSlice';

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        toast.promise(
            AxiosRequest.post('https://abm-wbw0.onrender.com/api/user/login', {
                email: formData.email,
                password: formData.password,
            }),
            {
                loading: 'Logging in...',
                success: (response) => {
                    dispatch(setEmailAction(formData.email));
                    dispatch(setTokenAction(response.data.token));
                    dispatch(setRoleAction(response.data.role));
                    dispatch(setUserIdAction(response.data.userId))
                    const role = response.data.role;
                    console.log('Role in Response', role);
                        if (role === 'admin' || role === 'moderator' || role === 'editor') {
                            navigate('/users');
                        }
                        else{
                            navigate('/home');
                        }
                

                    return 'Login Successful';
                },
                error: (error) => error.response.data.msg || 'Login Failed',
            }
        ).catch((error) => {
            console.error('Login error:', error);
        });
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
                    <Card className="flex flex-col max-w-lg w-full p-8 bg-white rounded-lg shadow-md">
                        <Typography variant="h2" className="text-2xl font-bold text-center mb-6">
                            Welcome to ABM
                        </Typography>
                        <div className="h-px bg-gray-300 mb-6"></div>
                        <Typography variant="body1" className="text-center text-gray-700 mb-6">
                            Please, provide login credentials to proceed and have access to all our services
                        </Typography>

                        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                            <div className="relative">
                                <Input
                                    size="lg"
                                    variant="outlined"
                                    className="focus:ring-0"
                                    label="Email"
                                    required
                                    name="email"
                                    color="black"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <div className="absolute inset-y-0 right-3 flex items-center cursor-pointer">
                                    <FontAwesomeIcon icon={faEnvelope} color="black" />
                                </div>
                            </div>
                            <div className="relative">
                                <Input
                                    size="lg"
                                    variant="outlined"
                                    className="focus:ring-0"
                                    color="black"
                                    required
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    label="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <div className="absolute inset-y-0 right-3 flex items-center cursor-pointer" onClick={togglePasswordVisibility}>
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} color="black" />
                                </div>
                            </div>
                            <div className="flex justify-end items-center">
                                <p className="text-sm text-blue-700 cursor-pointer" onClick={() => navigate('/forgot-password')}>
                                    Forgot your password?
                                </p>
                            </div>
                            <Button type="submit" className="bg-black text-white py-4 shadow-none rounded-lg hover:shadow-gray-500 hover:shadow-md">
                                Login
                            </Button>
                        </form>
                    </Card>
                </section>
            </motion.div>
        </div>
    );
};

export default Login;
