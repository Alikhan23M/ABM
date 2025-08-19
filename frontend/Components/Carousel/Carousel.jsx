import React, { useEffect, useState } from 'react';
import { Carousel, Spinner, IconButton } from "@material-tailwind/react";
import AxiosRequest from '../AxiosRequest/AxiosRequest';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import image1 from '../../assets/carousel3.jpg';
import image2 from '../../assets/carousel4.jpeg';
import image3 from '../../assets/carousel6.jpg';
import image4 from '../../assets/carousel13.jpeg';
import image5 from '../../assets/carousel12.jpeg';
import image6 from '../../assets/carousel11.jpg';

const fallbackImages = [image1, image2, image3, image4, image5, image6];

const Carousels = () => {
  const [sliderImages, setSliderImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const response = await AxiosRequest.get('https://abm-wbw0.onrender.com/api/slider-images/');
        if (response.data && response.data.length > 0) {
          setSliderImages(response.data.map(img => img.imageUrl));
        } else {
          setSliderImages(fallbackImages);
        }
      } catch (error) {
        console.error('Error fetching slider images', error);
        setSliderImages(fallbackImages);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSliderImages();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F6F1EE] font-poppins">
        <Spinner className="h-12 w-12 text-black" />
      </div>
    );
  }

  return (
    <div className="w-full lg:h-screen h-3/4 p-0 m-0">
      <Carousel
        className=""
        autoplay
        loop
        prevArrow={({ handlePrev }) => (
          <IconButton
            variant="text"
            color="white"
            size="lg"
            onClick={handlePrev}
            className="!absolute left-4 top-1/2 -translate-y-1/2 z-50 border-[1px] border-white bg-teal-800 rounded-full hover:bg-yellow-700 hover:text-teal-800"
          >
            <FaChevronLeft />
          </IconButton>
        )}
        nextArrow={({ handleNext }) => (
          <IconButton
            variant="text"
            color="white"
            size="lg"
            onClick={handleNext}
            className="!absolute right-4 top-1/2 -translate-y-1/2 z-50 border-[1px] border-white bg-teal-800 rounded-full hover:bg-yellow-700 hover:text-teal-800"
          >
            <FaChevronRight />
          </IconButton>
        )}
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-md transition-all content-[''] ${
                  activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        {sliderImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`image ${index + 1}`}
            className="h-80 lg:h-full w-full object-cover"
          />
        ))}
      </Carousel>
    </div>
  );
};

export default Carousels;
