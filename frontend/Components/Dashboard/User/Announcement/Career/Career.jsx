import React, { useEffect, useState, useRef } from 'react';
import { Card, Typography, Spinner, Button } from '@material-tailwind/react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import AxiosRequest from '../../../../AxiosRequest/AxiosRequest';

const MAX_DESCRIPTION_LENGTH = 100; // Characters before "Read More" appears

const Career = () => {
  const [careers, setCareers] = useState([]);
  const [filteredCareers, setFilteredCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCard, setExpandedCard] = useState(null);
  const [filter, setFilter] = useState('vacancy'); // 'vacancy' or 'internship'
  const [cardHeights, setCardHeights] = useState({});
  const [maxHeight, setMaxHeight] = useState(0);
  const cardRefs = useRef({});

  const [title, setTitle] = useState("Career Opportunities");
  const [description, setDescription] = useState(
    "Explore exciting career and internship opportunities with us..."
  );

  const [theme, setTheme] = useState(null);

  // Fetch section info
  const fetchInfo = async () => {
    const response = await AxiosRequest.get('/api/section-info/career');
    if (response.status === 200) {
      setTitle(response.data.title);
      setDescription(response.data.description);
    }
  };

  // Fetch theme
  const fetchTheme = async () => {
    try {
      const res = await AxiosRequest.get("/api/colors/career");
      if (res.status === 200) setTheme(res.data);
    } catch (error) {
      console.error("Error fetching theme:", error);
    }
  };

  // Fetch careers
  const fetchCareers = async () => {
    setLoading(true);
    try {
      const response = await AxiosRequest.get('/api/career');
      setCareers(response.data || []);
      applyFilter(response.data || [], filter);
    } catch (error) {
      console.error('Error fetching careers:', error);
      toast.error('Failed to load career data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCareers();
    fetchInfo();
    fetchTheme();
  }, []);

  useEffect(() => {
    const heights = Object.values(cardHeights);
    if (heights.length > 0) {
      setMaxHeight(Math.max(...heights));
    }
  }, [cardHeights, expandedCard]);

  const applyFilter = (careerList, type) => {
    if (type === 'vacancy') {
      setFilteredCareers(careerList.filter(c => !c.isInternship));
    } else {
      setFilteredCareers(careerList.filter(c => c.isInternship));
    }
  };

  const handleFilterChange = (type) => {
    setFilter(type);
    applyFilter(careers, type);
  };

  const toggleExpandCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const setCardHeight = (id, height) => {
    setCardHeights(prev => ({ ...prev, [id]: height }));
  };

  if (loading) {
    return (
      <div
        className="flex justify-center items-center min-h-screen"
        style={{ backgroundColor: theme?.config?.background?.sectionBgColor || "#F5F6F5" }}
      >
        <Spinner className="h-12 w-12 text-black" />
      </div>
    );
  }

  // Theme mappings
  const cardTheme = theme?.config.cards?.[0];
  const buttonTheme = theme?.config.buttons?.[0];
  const textTheme = theme?.config.text;

  return (
    <div
      className="flex flex-col items-center justify-start text-center min-h-screen font-poppins p-6"
      style={{ backgroundColor: theme?.config.background.sectionBgColor || "#F5F6F5" }}
    >
      <Toaster />
      <div className="w-full max-w-5xl">
        <Typography
          variant="h2"
          className="mt-4 mb-4 text-start"
          style={{ color: textTheme?.headingColor || "teal" }}
        >
          {title}
        </Typography>
        <p
          className="mb-6 text-left"
          style={{ color: textTheme?.paragraphColor || "gray" }}
        >
          {description}
        </p>

        {/* Filter Buttons */}
        <div className="flex gap-4 mb-6">
          {["vacancy", "internship"].map((type) => (
            <Button
              key={type}
              className="px-4 py-2 shadow-none"
              style={{
                backgroundColor:
                  filter === type
                    ? textTheme?.headingColor || "#0F766E"
                    : buttonTheme?.bgColor || "#FFA700",
                color:
                  filter === type
                    ? buttonTheme?. theme?.config.background.sectionBgColor || "white"
                    : buttonTheme?.textColor || "white",
                borderColor: buttonTheme?.buttonBorderColor || "#F5F6F5",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  buttonTheme?.hoverBgColor || "#FFA700";
                e.currentTarget.style.color =
                  buttonTheme?.hoverTextColor || "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  filter === type
                    ? textTheme?.headingColor || "#0F766E"
                    : buttonTheme?.bgColor || "#FFA700";
                e.currentTarget.style.color =
                  filter === type
                    ? theme?.config.background.sectionBgColor || "white"
                    : buttonTheme?.textColor || "white";
              }}
              onClick={() => handleFilterChange(type)}
            >
              {type === "vacancy" ? "Vacancies" : "Internships"}
            </Button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredCareers.map((career, index) => {
            const isExpanded = expandedCard === career._id;
            const showReadMore = career.description.length > MAX_DESCRIPTION_LENGTH;

            return (
              <motion.div
                key={career._id}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <motion.div
                  layout
                  className="p-6 shadow-lg rounded-lg flex flex-col justify-between"
                  style={{
                    minHeight: maxHeight,
                    backgroundColor: cardTheme?.bgColor || "white",
                    border: `1px solid ${cardTheme?.borderColor || "#ccc"}`,
                    boxShadow: `0 2px 6px ${cardTheme?.borderColor || "rgba(0,0,0,0.1)"}`,
                  }}
                  ref={(el) => {
                    if (el) setCardHeight(career._id, el.getBoundingClientRect().height);
                  }}
                >
                  <div className="flex flex-col justify-between flex-grow">
                    <Typography
                      variant="h5"
                      className="mb-2 text-center"
                      style={{ color: cardTheme?.headingColor || "black" }}
                    >
                      {career.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      className="text-justify mb-4"
                      style={{ color: cardTheme?.descriptionColor || "black" }}
                    >
                      {isExpanded
                        ? career.description
                        : career.description.substring(0, MAX_DESCRIPTION_LENGTH)}
                      {showReadMore && !isExpanded && "..."}
                    </Typography>
                    <div className="flex flex-col justify-between items-start mb-2">
                      <Typography
                        variant="body2"
                        className="text-sm"
                        style={{ color: cardTheme?.descriptionColor || "black" }}
                      >
                        Location: {career.location}
                      </Typography>
                      <Typography
                        variant="body2"
                        className="text-sm"
                        style={{ color: cardTheme?.descriptionColor || "black" }}
                      >
                        Posted: {new Date(career.createdAt).toLocaleDateString()}
                      </Typography>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    {showReadMore && (
                      <Button
                        size="sm"
                        className="shadow-none"
                        style={{
                          backgroundColor: buttonTheme?.bgColor || "#FFA700",
                          color: buttonTheme?.textColor || "black",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            buttonTheme?.hoverBgColor || "#ffe760ff";
                          e.currentTarget.style.color =
                            buttonTheme?.hoverTextColor || "black";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor =
                            buttonTheme?.bgColor || "#FFA700";
                          e.currentTarget.style.color =
                            buttonTheme?.textColor || "black";
                        }}
                        onClick={() => toggleExpandCard(career._id)}
                      >
                        {isExpanded ? "Show Less" : "Read More"}
                      </Button>
                    )}
                    <Button
                      size="sm"
                      className="shadow-none"
                      style={{
                        backgroundColor: cardTheme?.button?.bgColor || "black",
                        color: cardTheme?.button?.textColor || "white",
                        borderColor: buttonTheme?.buttonBorderColor || "white",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          cardTheme?.button?.hoverBgColor || "#FFA700";
                        e.currentTarget.style.color =
                          cardTheme?.button?.hoverTextColor || "black";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          cardTheme?.button?.bgColor || "black";
                        e.currentTarget.style.color =
                          cardTheme?.button?.textColor || "white";
                      }}
                      onClick={() => window.open(career.applyLink, "_blank")}
                    >
                      Apply
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Career;
