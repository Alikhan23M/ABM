import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../State/Reducers/tokenSlice';
import { Spinner, Avatar, Typography } from '@material-tailwind/react';
import AxiosRequest from '../../../AxiosRequest/AxiosRequest';
import logo from '../../../../assets/ABM.png';

const AdminLandingPage = () => {
  const websiteName = "ABM";
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [user, setUser] = useState(null);
  const storedToken = localStorage.getItem('token');
  const token = useSelector(selectToken) || storedToken;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await AxiosRequest.get('/api/user/getUserById', config);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        toast.error(error.response.data.message);
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 font-poppins">
        <Spinner className="h-12 w-12 text-black" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 font-poppins px-4 md:px-8 lg:px-16">
      <h1 className="text-5xl font-bold text-white mb-[2vh] flex flex-col md:flex-row justify-center gap-[2vw] md:justify-center items-center">
        <Avatar src={logo} alt="Website Logo" size="lg" className="bg-white" />
        Welcome To {websiteName}
      </h1>
      <div className="text-3xl text-white mb-[2vh] flex flex-col md:flex-row justify-center gap-[2vw] items-center">
        <Typography variant="h4" className="flex items-center">
          <span className="animate-wave text-4xl mr-2">👋</span>Hey
        </Typography>
        <Typography variant="h4" className="flex items-center">
          <Avatar src={user?.picUrl || 'https://via.placeholder.com/150'} alt="User Avatar" size="lg" className="mr-2" /> {user.name}
        </Typography>
      </div>
      <p className="text-lg text-white max-w-2xl">
        {isMobile
          ? `Welcome to the admin dashboard of ${websiteName}. Here, you can manage all the aspects of your website including user management, content creation, and more. Use the hamburger menu to access different sections of the admin panel.`
          : `Welcome to the admin dashboard of ${websiteName}. Here, you can manage all the aspects of your website including user management, content creation, and more. Use the sidebar menu to access different sections of the admin panel.`
        }
      </p>
    </div>
  );
};

export default AdminLandingPage;
