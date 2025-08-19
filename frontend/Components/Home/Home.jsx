import React from 'react';
import { motion } from 'framer-motion';
import { Button, Typography, Card, CardHeader, CardFooter, CardBody } from '@material-tailwind/react';
import UpperBodyCard from '../Card/UpperBodyCard/UpperBodyCard';
import Carousels from '../Carousel/Carousel';
import { useSelector } from 'react-redux';
import { selectToken } from '../State/Reducers/tokenSlice';
import backgroundImage from "../../assets/background.jpg";
import BodyCard from '../Card/BodyCard/BodyCard';
import LowerBodyCard from '../Card/LowerBodyCard/LowerBodyCard';
import OurImpact from './OurImpact';
import HowCanHelp from '../Card/BodyCard/How can help/HowCanHelp';
import OurPrograms from '../Carousel/OurPrograms'
import Gallery from '../Carousel/Gallery';
import NewsCards from './NewsCards'
import Partners from './Partners'
import Newsletter from './NewsLetter';
import Footer from './Footer';

const Home = () => {
    const token = useSelector(selectToken);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="min-h-screen flex flex-col justify-between relative"
        >
            {/* <div className="absolute inset-0 bg-[#F6F1EE] font-poppins z-0"></div> */}
            <div className="text-white relative z-10">
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="flex flex-col text-center items-center justify-center min-h-screen space-y-8  mb-[6vh] hide_webscrollbar"
                >
                    
                    <Carousels />
                    <OurImpact/>
                    {/* <UpperBodyCard /> */}
                    <BodyCard />
                    {/* <LowerBodyCard /> */}
                    <HowCanHelp/>
                    <OurPrograms/>
                    <Gallery/>
                    <NewsCards/>
                    <Partners/>
                    <Newsletter/>
                    {/* <Footer/> */}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Home;


// bg-[#2272FF]