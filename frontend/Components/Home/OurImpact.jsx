import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaRocket,
  FaUsers,
  FaChartLine,
  FaDatabase,
  FaLink,
  FaCalendarAlt,
  FaTasks,
  FaNewspaper,
  FaBriefcase,
  FaCogs,
  FaSmile,
  FaCheck,
  FaCheckDouble,
  FaShieldAlt,
  FaStar,
  FaHandHolding,
  FaGrinHearts,
} from "react-icons/fa";
import AxiosRequest from "../AxiosRequest/AxiosRequest";

// Mapping of icon names (as stored in DB) to actual components
const iconOptions = {
  FaRocket: FaRocket,
  FaUsers: FaUsers,
  FaChartLine: FaChartLine,
  FaDatabase: FaDatabase,
  FaLink: FaLink,
  FaCalendarAlt: FaCalendarAlt,
  FaTasks: FaTasks,
  FaNewspaper: FaNewspaper,
  FaBriefcase: FaBriefcase,
  FaCogs: FaCogs,
  FaSmile: FaSmile,
  FaCheck: FaCheck,
  FaCheckDouble: FaCheckDouble,
  FaShieldAlt: FaShieldAlt,
  FaStar: FaStar,
  FaHandHolding: FaHandHolding,
  FaGrinHearts: FaGrinHearts,

};

// Animated counter
const Counter = ({ value }) => {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState(null);
  // Fetch Theme
  const fetchTheme = async () => {
    try {
      const res = await AxiosRequest.get("/api/colors/our-impact");
      if (res.status === 200) {
        const data = res.data;
        setTheme(data);
      }
    } catch (error) {
      console.error("Error fetching info:", error);
    }
  };

  useEffect(() => {
    fetchTheme();
  }, []);

  useEffect(() => {

    let start = 0;
    const end = value || 0;
    const duration = 2000;
    const incrementTime = 10;
    const steps = duration / incrementTime;
    const stepValue = end / steps;

    const timer = setInterval(() => {
      start += stepValue;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className={`text-4xl font-bold `}
      style={{ color: theme ? theme.config.cards[0].headingColor : 'black' }}
    >
      {count}+
    </motion.div>
  );
};

const StatsSection = () => {
  const [stats, setStats] = useState([]);
  const [title, setTitle] = useState("Our Impacts");
  const [description, setDescription] = useState();

  const [theme, setTheme] = useState(null);

  const fetchInfo = async () => {
    try {
      const res = await AxiosRequest.get("/api/section-info/our-impact");
      if (res.status === 200) {
        const data = res.data;
        setTitle(data.title || "Our Impacts");
        setDescription(data.description || null);
      }
    } catch (error) {
      console.error("Error fetching info:", error);
    }
  };


  // Fetch Theme
  const fetchTheme = async () => {
    try {
      const res = await AxiosRequest.get("/api/colors/our-impact");
      if (res.status === 200) {
        const data = res.data;
        setTheme(data);
      }
    } catch (error) {
      console.error("Error fetching info:", error);
    }
  };

  // Fetch stats from backend
  const fetchStats = async () => {
    try {
      const res = await AxiosRequest.get("/api/stats");
      setStats(res.data || []);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchInfo();
    fetchTheme();
  }, []);

  return (
    <div className="h-auto w-full rounded-lg pb-10"
    style={{backgroundColor:theme?.config.background.sectionBgColor || 'white'}}
    >
      {/* Heading */}
      <div className="space-y-2 text-center">
        <h1 style={{ color: theme ? theme.config.text.headingColor : 'teal', borderColor: theme ? theme.config.text.highlightedTextColor : '#FFA700' }} className=" font-bold text-4xl border-b-4 inline">{title}</h1>
        {/* <div className="w-[5vw] bg-yellow-700 h-1 rounded-sm mx-auto"></div> */}
      </div>

      {/* Description if not null */}

      {description && (
        <div className="max-w-2xl mx-auto text-center mt-4 px-4"
        style={{color:theme?.config.text.paragraphColor || 'black'}}
        >
          <p className="text-lg">{description}</p>
        </div>
      )}

      {/* Stats Grid */}
      <div className="flex flex-wrap items-center justify-around gap-6 mt-9 md:mt-[100px]">
        {stats.map((stat) => {
          const IconComponent = iconOptions[stat.icon] || FaDatabase; // fallback icon
          // Use computedValue for collection stats, targetValue for custom stats
          const displayValue = stat.computedValue ?? stat.targetValue ?? 0;

          return (
            <div
              key={stat._id}
              className="flex flex-col items-center space-y-3 text-center"
            >
              <a href={stat.redirectLink}>

                <IconComponent className={` text-4xl`} size={56} style={{ color: theme ? theme.config.cards[0].iconColor : '#FFA700' }} />
              </a>
              <Counter value={displayValue} />
              <p className={`text-sm`} style={{ color: theme ? theme.config.cards[0].descriptionColor : 'gray' }}>{stat.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatsSection;
