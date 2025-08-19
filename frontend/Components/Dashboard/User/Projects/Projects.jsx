import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import AxiosRequest from "../../../AxiosRequest/AxiosRequest";
import { useSelector } from "react-redux";
import { selectToken } from "../../../State/Reducers/tokenSlice";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp, FaFlag, FaHourglass, FaMapMarkedAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Filters
  const [searchText, setSearchText] = useState("");
  const [filterArea, setFilterArea] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");

  const [title, setTitle] = useState("Projects");
  const [description, setDescription] = useState(null);
  const [theme, setTheme] = useState(null);

  const fetchTheme = async () => {
    try {
      const res = await AxiosRequest.get("/api/colors/projects");
      if (res.status === 200) setTheme(res.data);
    } catch (error) {
      console.error("Error fetching theme:", error);
    }
  };
  const fetchInfo = async () => {
    const response = await AxiosRequest.get('/api/section-info/projects');
    if (response.status === 200) {
      setTitle(response.data.title);
      setDescription(response.data.description);
    }
  };

  // Read more/less tracking per project
  const [expandedProjects, setExpandedProjects] = useState({});

  const token = useSelector(selectToken) || localStorage.getItem("token");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await AxiosRequest.get(`/api/project/getProject`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(res.data);
      } catch (err) {
        toast.error(err.response?.data?.message || "Error fetching projects");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [token]);

  useEffect(() => {
    fetchInfo();
    fetchTheme();
  }, []);

  // Dynamic filter options
  const uniqueAreas = [...new Set(projects.map((p) => p.area).filter(Boolean))];
  const uniqueStatuses = [
    ...new Set(projects.map((p) => p.projectStatus).filter(Boolean)),
  ];
  const allYears = [
    ...new Set(
      projects
        .flatMap((p) => p.duration?.split("-") || [])
        .filter(Boolean)
        .map((y) => y.trim())
    ),
  ];

  // Filtering logic
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchText.toLowerCase()) ||
      p.area?.toLowerCase().includes(searchText.toLowerCase());

    const matchesArea = filterArea ? p.area === filterArea : true;
    const matchesStatus = filterStatus ? p.projectStatus === filterStatus : true;

    const [projStart, projEnd] = (p.duration || "")
      .split("-")
      .map((y) => parseInt(y.trim()));
    const matchesDate =
      (!startYear || projEnd >= parseInt(startYear)) &&
      (!endYear || projStart <= parseInt(endYear));

    return matchesSearch && matchesArea && matchesStatus && matchesDate;
  });

  const toggleExpand = (id) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F6F1EE]">
        <div className="text-gray-800">Loading...</div>
      </div>
    );
  }

  const cardTheme = theme?.config.cards?.[0];
  const buttonTheme = theme?.config.buttons?.[0];
  const textTheme = theme?.config.text;

  return (
    <div className="min-h-screen font-poppins"
      style={{
        backgroundColor: theme?.config.background.sectionBgColor || "#F5F6F5",
      }}
    >
      <Toaster position="top-right" />

      <div className="flex flex-col">
        {/* Header */}
        <div className="flex flex-col md:flex-row w-full justify-between px-6 py-6 items-center gap-4">
          <h2 className="text-3xl font-bold "
            style={{ color: textTheme?.headingColor || "teal" }}
          >{title}</h2>
          <p className="text-sm" style={{ color: textTheme?.paragraphColor || "gray" }}>
            <span className="hover:underline cursor-pointer">Home</span> /{" "}
            <span className="hover:underline cursor-pointer">What we do</span> /{" "}
            <span className="hover:underline cursor-pointer">Projects</span>
          </p>
        </div>

        {/* Description if not null */}

        {description && (
          <div className="max-w-2xl mx-2  text-center px-4 mb-4">
            <p className="text-lg text-start"
              style={{ color: textTheme?.paragraphColor || "black" }}
            >{description}</p>
          </div>
        )}
      </div>

      {/* Filters Row */}
      <div className="px-4 py-3 flex flex-wrap gap-3 items-center justify-center"
        style={{
          backgroundColor: theme?.config.background.containerBgColor || "",
        }}
      >
        <input
          type="text"
          placeholder="Search by title or area"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="px-6 py-2 rounded-md"
          style={{
            backgroundColor: theme?.config.inputFields[0].bgColor || "white",

            color: theme?.config.inputFields[0].textColor || "black",
            borderColor: theme?.config.inputFields[0].borderColor || "black"

          }}
        />

        {uniqueAreas.length > 0 && (
          <select
            value={filterArea}
            onChange={(e) => setFilterArea(e.target.value)}
            className="border  px-6 py-2 rounded-md"
            style={{
              backgroundColor: theme?.config.inputFields[0].bgColor || "white",

              color: theme?.config.inputFields[0].textColor || "black",
              borderColor: theme?.config.inputFields[0].borderColor || "black"

            }}
          >
            <option value="">All Areas</option>
            {uniqueAreas.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        )}

        {uniqueStatuses.length > 0 && (
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border  px-6 py-2 rounded-md"
            style={{
              backgroundColor: theme?.config.inputFields[0].bgColor || "white",

              color: theme?.config.inputFields[0].textColor || "black",
              borderColor: theme?.config.inputFields[0].borderColor || "black"

            }}
          >
            <option value="">All Status</option>
            {uniqueStatuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        )}

        {allYears.length > 0 && (
          <>
            <select
              value={startYear}
              onChange={(e) => setStartYear(e.target.value)}
              className="border  px-8 py-2 rounded-md"
              style={{
                backgroundColor: theme?.config.inputFields[0].bgColor || "white",

                color: theme?.config.inputFields[0].textColor || "black",
                borderColor: theme?.config.inputFields[0].borderColor || "black"

              }}
            >
              <option value="">Start Year</option>
              {allYears.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>

            <select
              value={endYear}
              onChange={(e) => setEndYear(e.target.value)}
              className="border  px-8 py-2 rounded-md"
              style={{
                backgroundColor: theme?.config.inputFields[0].bgColor || "white",

                color: theme?.config.inputFields[0].textColor || "black",
                borderColor: theme?.config.inputFields[0].borderColor || "black"

              }}
            >
              <option value="">End Year</option>
              {allYears.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </>
        )}

        <button
          onClick={() => {
            setSearchText("");
            setFilterArea("");
            setFilterStatus("");
            setStartYear("");
            setEndYear("");
          }}
          className=" px-4 py-2 rounded-md "
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
          }}>

          Clear Filters
        </button>
      </div>

      {/* Projects List */}
      {filteredProjects.length === 0 ? (
        <div className="text-center  mt-10"
          style={{
            color: cardTheme?.descriptionColor || "black",
          }}
        >No projects found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 py-6"

        >
          {filteredProjects.map((p, idx) => {
            const isExpanded = expandedProjects[p._id] || false;
            return (
              <motion.div
                key={p._id}
                className=" rounded-lg shadow-lg overflow-hidden flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                style={{
                  backgroundColor: cardTheme?.bgColor || "white",
                  border: `1px solid ${cardTheme?.borderColor || "teal"}`,
                 
                }}
              >
                <img
                  src={p.images?.[0] || "/placeholder.jpg"}
                  alt={p.title}
                  className="cursor-pointer w-full h-60 object-cover"
                  onClick={() => navigate('/project-activity-pictures', { state: { projectId: p._id } })}
                />
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-xl font-bold mb-2"
                      style={{
                        color: cardTheme?.headingColor || "black",
                      }}
                    >{p.title}</h3>

                    {/* <div className="bg-yellow-700 h-[3px] w-20 mb-2"></div> */}
                    {p.area && (
                      <p className="text-md" style={{
                        color: cardTheme?.description || "#0F766E",
                      }}><FaMapMarkedAlt size={20} className="inline" style={{
                        color: cardTheme?.iconColor || "#FFA700",
                      }} /> {p.area}</p>
                    )}
                    {p.duration && (
                      <p className=" text-md"
                        style={{
                          color: cardTheme?.description || "#0F766E",
                        }}
                      ><FaHourglass size={20}  className="inline" style={{
                        color: cardTheme?.iconColor || "#FFA700",
                      }} /> {p.duration}</p>
                    )}
                    {p.projectStatus && (
                      <p className=" text-md" style={{
                        color: cardTheme?.description || "#0F766E",
                      }}><FaFlag size={20}  className="inline" style={{
                        color: cardTheme?.iconColor || "#FFA700",
                      }} /> {p.projectStatus}</p>
                    )}

                    {p.description && (
                      <p className="text-md mt-2" style={{
                        color: cardTheme?.description || "black",
                      }}>
                        {isExpanded
                          ? p.description
                          : `${p.description.slice(0, 100)}${p.description.length > 100 ? "..." : ""
                          }`}
                      </p>
                    )}
                  </div>

                  {p.description && p.description.length > 100 && (
                    <div className="flex justify-end mt-2">
                      <button
                        onClick={() => toggleExpand(p._id)}
                        className="flex items-center gap-1 text-sm  px-3 py-2 rounded-md"
                        style={{
                          backgroundColor: cardTheme?.button.bgColor || "#FFA700",
                          color: cardTheme?.button.textColor || "black",
                          borderColor:
                            buttonTheme?.buttonBorderColor || "transparent",
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
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Projects;
