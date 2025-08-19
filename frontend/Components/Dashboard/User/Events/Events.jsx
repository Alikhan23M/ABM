import React, { useState, useEffect } from 'react';
import { Card, Typography, Spinner } from '@material-tailwind/react';
import { motion } from 'framer-motion';
import { FaMapMarker, FaFilter, FaChevronDown, FaChevronUp, FaWatchmanMonitoring, FaStopwatch } from 'react-icons/fa';
import AxiosRequest from '../../../AxiosRequest/AxiosRequest';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const [title, setTitle] = useState("Events");
  const [description, setDescription] = useState(null);
  const [theme, setTheme] = useState(null);

  // Track expanded descriptions
  const [expandedEvents, setExpandedEvents] = useState({});

  const navigate = useNavigate();

  // Fetch theme for events
  const fetchTheme = async () => {
    try {
      const res = await AxiosRequest.get("/api/colors/events");
      if (res.status === 200) setTheme(res.data);
    } catch (err) {
      console.error("Error fetching theme:", err);
    }
  };

  // Fetch section info
  const fetchInfo = async () => {
    try {
      const response = await AxiosRequest.get('/api/section-info/events');
      if (response.status === 200) {
        setTitle(response.data.title);
        setDescription(response.data.description);
      }
    } catch (err) {
      console.error("Error fetching info:", err);
    }
  };

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await AxiosRequest.get('/api/events/events');
        setEvents(response.data);
        setFilteredEvents(response.data);
        const cats = [...new Set(response.data.map(ev => ev.category?.title))];
        setCategories(cats);
      } catch (err) {
        toast.error("Error fetching events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
    fetchInfo();
    fetchTheme();
  }, []);

  // Apply filters automatically on desktop
  useEffect(() => {
    if (window.innerWidth >= 768) {
      let filtered = [...events];
      if (selectedCategory) filtered = filtered.filter(ev => ev.category?.title === selectedCategory);
      if (searchTitle) filtered = filtered.filter(ev => ev.title.toLowerCase().includes(searchTitle.toLowerCase()));
      if (startDate) filtered = filtered.filter(ev => new Date(ev.time) >= new Date(startDate));
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        filtered = filtered.filter(ev => new Date(ev.time) <= end);
      }
      setFilteredEvents(filtered);
    }
  }, [selectedCategory, searchTitle, startDate, endDate, events]);

  const applyFilters = () => {
    let filtered = [...events];
    if (selectedCategory) filtered = filtered.filter(ev => ev.category?.title === selectedCategory);
    if (searchTitle) filtered = filtered.filter(ev => ev.title.toLowerCase().includes(searchTitle.toLowerCase()));
    if (startDate) filtered = filtered.filter(ev => new Date(ev.time) >= new Date(startDate));
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      filtered = filtered.filter(ev => new Date(ev.time) <= end);
    }
    setFilteredEvents(filtered);
    if (window.innerWidth < 768) setShowFilters(false);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSearchTitle('');
    setStartDate('');
    setEndDate('');
    setFilteredEvents(events);
  };

  // Toggle expand for specific event
  const toggleExpand = (id) => {
    setExpandedEvents((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen font-poppins"
        style={{ backgroundColor: theme?.config.background.sectionBgColor || "#F6F1EE" }}
      >
        <Spinner className="h-12 w-12" style={{ color: theme?.config.text.headingColor || "black" }} />
      </div>
    );
  }

  const cardTheme = theme?.config.cards?.[0];
  const buttonTheme = theme?.config.buttons?.[0];
  const textTheme = theme?.config.text;

  return (
    <div className="flex flex-col items-center justify-start min-h-screen font-poppins p-6"
      style={{ backgroundColor: theme?.config.background.sectionBgColor || "#F6F1EE" }}
    >
      <Toaster position="top-right" />

      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full text-center flex flex-col items-center mb-6"
      >
        <Typography variant="h2" className="font-bold"
          style={{ color: textTheme?.headingColor || "black" }}
        >
          {title}
        </Typography>
        <div className="h-1 w-[4vw] rounded-md"
          style={{ backgroundColor: cardTheme?.specialLineColor || "#f59e0b" }}
        ></div>

        <Typography variant="body1" className="my-4"
          style={{ color: textTheme?.paragraphColor || "gray" }}
        >
          {description}
        </Typography>
      </motion.div>
      {/* Mobile Filter Button */}
      <div className="w-full flex justify-end mb-4 md:hidden">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 bg-yellow-700 text-white px-4 py-2 rounded-md hover:bg-yellow-800"
        >
          <FaFilter />
          Filter
        </button>
      </div>

      {/* Filters */}
      <div className={`px-4 py-2 flex flex-col md:flex-row gap-4 mb-6 w-full max-w-7xl items-center ${showFilters ? 'flex' : 'hidden'} md:flex`}
      style={{
          backgroundColor: theme?.config.background.containerBgColor || "",
        }}
      >
        {/* Search */}
        <div className="flex-1 flex flex-col">
          <label className="" style={{ color: textTheme?.paragraphColor || "black" }}>Search by title</label>
          <input
            type="text"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            placeholder="Search by title"
            className="w-full border  rounded-md px-3 py-2 focus:outline-none "
            style={{
            backgroundColor: theme?.config.inputFields[0].bgColor || "white",

            color: theme?.config.inputFields[0].textColor || "black",
            borderColor: theme?.config.inputFields[0].borderColor || "black"

          }}
          />
        </div>

        {/* Category */}
        <div className="flex-1 flex flex-col">
          <label className=" mb-1"
           style={{ color: textTheme?.paragraphColor || "black" }}
          >Filter by category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full border  rounded-md px-3 py-2 focus:outline-none"
            style={{
              backgroundColor: theme?.config.inputFields[0].bgColor || "white",

              color: theme?.config.inputFields[0].textColor || "black",
              borderColor: theme?.config.inputFields[0].borderColor || "black"

            }}
          >
            <option value="">All Categories</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Start Date */}
        <div className="flex-1 flex flex-col">
          <label className=" mb-1"
          
           style={{ color: textTheme?.paragraphColor || "black" }}
           >Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 "
            style={{
              backgroundColor: theme?.config.inputFields[0].bgColor || "white",
              color: theme?.config.inputFields[0].textColor || "black",
              borderColor: theme?.config.inputFields[0].borderColor || "black"
            }}
          />
        </div>

        {/* End Date */}
        <div className="flex-1 flex flex-col">
          <label className=" mb-1"
           style={{ color: textTheme?.paragraphColor || "black" }}
          >End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 "
            style={{
              backgroundColor: theme?.config.inputFields[0].bgColor || "white",
              color: theme?.config.inputFields[0].textColor || "black",
              borderColor: theme?.config.inputFields[0].borderColor || "black"
            }}
          />
        </div>

        {/* Apply Filters (mobile only) */}
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 mt-2 md:hidden"
          onClick={applyFilters}
        >
          Apply Filters
        </button>

        <button
          className=" px-4 py-2 rounded-md  mt-2 md:mt-6"
           style={{
            backgroundColor: buttonTheme?.bgColor || "#f64646ff",
            color: buttonTheme?.textColor || "white",
            borderColor:
              buttonTheme?.buttonBorderColor || "white",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor =
              buttonTheme?.hoverBgColor || "red";
            e.currentTarget.style.color =
              buttonTheme?.hoverTextColor || "white";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor =
              buttonTheme?.bgColor || "#f64646ff";
            e.currentTarget.style.color =
              buttonTheme?.textColor || "white";
          }}
          onClick={() => {
            clearFilters();
            if (window.innerWidth < 768) setShowFilters(false); // close mobile menu
          }}
        >
          Clear Filters
        </button>

      </div>
      {/* Event Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">
        {filteredEvents.map((event, index) => {
          const isExpanded = expandedEvents[event._id] || false;
          return (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
             <Card
  className="h-full shadow-xl rounded-lg flex flex-col"
  style={{
    backgroundColor: cardTheme?.bgColor || "white",
    border: `1px solid ${cardTheme?.borderColor || "#0F766E"}`,
  }}
>
  {/* Image */}
  <img
    src={event.images?.[0]}
    alt={event.title}
    className="w-full h-48 object-cover rounded-t-lg"
    onClick={() => navigate('/gallery', { state: { eventId: event._id } })}
  />

  {/* Content */}
  <div className="flex flex-col flex-grow p-4">
    {/* Top section (title + description) */}
    <div>
      <Typography
        variant="h5"
        className="font-semibold mb-2"
        style={{ color: cardTheme?.headingColor || "#0F766E" }}
      >
        {event.title}
      </Typography>

      {event.description && (
        <>
          <Typography
            variant="body1"
            className="mb-2 text-justify"
            style={{ color: cardTheme?.descriptionColor || "black" }}
          >
            {isExpanded
              ? event.description
              : `${event.description.slice(0, 100)}${
                  event.description.length > 100 ? "..." : ""
                }`}
          </Typography>

          {event.description.length > 100 && (
            <button
              onClick={() => toggleExpand(event._id)}
              className="flex items-center gap-1 text-sm px-3 py-1 rounded-md"
              style={{
                backgroundColor: cardTheme?.button.bgColor || "#FFA700",
                color: cardTheme?.button.textColor || "black",
                borderColor: buttonTheme?.buttonBorderColor || "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  cardTheme?.button.hoverBgColor || "#ffe760ff";
                e.currentTarget.style.color =
                  cardTheme?.button.hoverTextColor || "black";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  cardTheme?.button.bgColor || "#FFA700";
                e.currentTarget.style.color =
                  cardTheme?.button.textColor || "black";
              }}
            >
              {isExpanded ? (
                <>
                  Read Less <FaChevronUp size={12} />
                </>
              ) : (
                <>
                  Read More <FaChevronDown size={12} />
                </>
              )}
            </button>
          )}
        </>
      )}
    </div>

    {/* Bottom section (location + date) */}
    <div className="mt-auto">
      <Typography
        variant="body2"
        className="flex items-center mt-2"
        style={{ color: cardTheme?.descriptionColor || "black" }}
      >
        <FaMapMarker
          className="mr-1"
          style={{ color: cardTheme?.iconColor || "#0F766E" }}
        />{" "}
        {event.location}
      </Typography>
      <Typography
        variant="body2"
        className="flex items-center mt-2"
        style={{ color: cardTheme?.descriptionColor || "black" }}
      >
        <FaStopwatch className="mr-1"
          style={{ color: cardTheme?.iconColor || "#0F766E" }}/> {new Date(event.time).toLocaleString()}
      </Typography>
    </div>
  </div>
</Card>

            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Events;
