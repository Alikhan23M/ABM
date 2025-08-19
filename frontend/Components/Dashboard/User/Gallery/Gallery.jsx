import React, { useState, useEffect } from 'react';
import AxiosRequest from '../../../AxiosRequest/AxiosRequest';
import { Card, Typography, Spinner } from '@material-tailwind/react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const Gallery = () => {
  const [events, setEvents] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTitle, setSearchTitle] = useState('');

  const [title, setTitle] = useState("Gallery");
  const [description, setDescription] = useState(null);
  const [theme, setTheme] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const eventIdFromState = location.state?.eventId || null;

  // Fetch theme
  const fetchTheme = async () => {
    try {
      const res = await AxiosRequest.get("/api/colors/gallery");
      if (res.status === 200) setTheme(res.data);
    } catch (error) {
      console.error("Error fetching theme:", error);
    }
  };

  // Fetch info (title/description)
  const fetchInfo = async () => {
    try {
      const response = await AxiosRequest.get('/api/section-info/gallery');
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

        const cats = [...new Set(response.data.map(e => e.category?.title))];
        setCategories(cats);

        // Default: show all images OR event-specific if redirected
        if (eventIdFromState) {
          const event = response.data.find(ev => ev._id === eventIdFromState);
          setFilteredImages(
            event?.images.map(img => ({
              img,
              title: event.title,
              category: event.category?.title,
              eventId: event._id,
            })) || []
          );
        } else {
          const allImages = response.data.flatMap(ev =>
            ev.images.map(img => ({
              img,
              title: ev.title,
              category: ev.category?.title,
              eventId: ev._id,
            }))
          );
          setFilteredImages(allImages);
        }
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [eventIdFromState]);

  // Filtering logic
  useEffect(() => {
    let imgs = events.flatMap(ev =>
      ev.images.map(img => ({
        img,
        title: ev.title,
        category: ev.category?.title,
        eventId: ev._id,
      }))
    );

    // Only lock to single event if no filters are applied
    if (eventIdFromState && !selectedCategory && !searchTitle) {
      const event = events.find(ev => ev._id === eventIdFromState);
      imgs = event?.images.map(img => ({
        img,
        title: event.title,
        category: event.category?.title,
        eventId: event._id,
      })) || [];
    }

    if (selectedCategory) {
      imgs = imgs.filter(i => i.category === selectedCategory);
    }

    if (searchTitle) {
      imgs = imgs.filter(i =>
        i.title.toLowerCase().includes(searchTitle.toLowerCase())
      );
    }

    setFilteredImages(imgs);
  }, [selectedCategory, searchTitle, events, eventIdFromState]);

  useEffect(() => {
    fetchInfo();
    fetchTheme();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F6F1EE] font-poppins">
        <Spinner className="h-12 w-12 text-black" />
      </div>
    );
  }

  const cardTheme = theme?.config.cards?.[0];
  const textTheme = theme?.config.text;

  return (
    <div
      className="flex flex-col items-center justify-start min-h-screen font-poppins p-6"
      style={{
        backgroundColor: theme?.config.background.sectionBgColor || "#F5F6F5",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full text-center flex flex-col items-center mb-6"
      >
        <Typography
          variant="h2"
          style={{ color: textTheme?.headingColor || "black" }}
        >
          {eventIdFromState && !selectedCategory && !searchTitle
            ? `${events.find(ev => ev._id === eventIdFromState)?.title || 'Event'} Gallery`
            : title}
        </Typography>

        <div
          className="h-1 w-[4vw] rounded-md"
          style={{
            backgroundColor: textTheme?.highlightedTextColor || "gold",
          }}
        ></div>

        <Typography
          variant="body1"
          className="text-gray-600 my-4"
          style={{ color: textTheme?.paragraphColor || "black" }}
        >
          {description}
        </Typography>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 w-full max-w-6xl items-center">
        {/* Search by title */}
        <div className="flex-1 flex flex-col">
          <label
            className="mb-1"
            style={{ color: textTheme?.paragraphColor || "black" }}
          >
            Search by title
          </label>

          <input
            type="text"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            placeholder="Search by title"
            className="w-full border rounded-md px-3 py-2 focus:outline-none"
            style={{
              backgroundColor: theme?.config.inputFields[0].bgColor || "white",
              color: theme?.config.inputFields[0].textColor || "black",
              borderColor: theme?.config.inputFields[0].borderColor || "black",
              outlineColor: textTheme?.highlightedTextColor || "yellow",
            }}
          />
        </div>

        {/* Category select */}
        <div className="flex-1 flex flex-col">
          <label
            className="mb-1"
            style={{ color: textTheme?.paragraphColor || "black" }}
          >
            Filter by category
          </label>

<select
  value={selectedCategory}
  onChange={(e) => {
    const value = e.target.value;
    setSelectedCategory(value);

    // If "All Categories" selected → remove event lock
    if (value === "") {
      navigate("/gallery", { replace: true }); // clears eventIdFromState
    }
  }}
  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 "
  style={{
    backgroundColor: theme?.config.inputFields[0].bgColor || "white",
    color: theme?.config.inputFields[0].textColor || "black",
    borderColor: theme?.config.inputFields[0].borderColor || "black",
    outlineColor: textTheme?.highlightedTextColor || "yellow",
  }}
>
  <option value="">All Categories</option>
  {categories.map((cat, idx) => (
    <option key={idx} value={cat}>{cat}</option>
  ))}
</select>

        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {filteredImages.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="cursor-pointer"
            onClick={() => navigate('/gallery', { state: { eventId: item.eventId } })}
          >
            <Card
              className="rounded-lg overflow-hidden"
              style={{
                backgroundColor: cardTheme?.bgColor || "white",
                border: `1px solid ${cardTheme?.borderColor || "teal"}`,
                boxShadow: `0 2px 6px ${cardTheme?.borderColor || "rgba(0,0,0,0.1)"}`,
              }}
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-2">
                <Typography
                  variant="body1"
                  className="text-sm font-semibold text-center"
                  style={{
                    color: cardTheme?.headingColor || "black",
                  }}
                >
                  {item.title}
                </Typography>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
