import React, { useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import AxiosRequest from '../../../AxiosRequest/AxiosRequest';
import { FaCheckCircle, FaRegBuilding, FaNewspaper, FaUsers, FaHandsHelping, FaBriefcase } from 'react-icons/fa';

const iconComponents = {
  FaCheckCircle,
  FaRegBuilding,
  FaNewspaper,
  FaUsers,
  FaHandsHelping,
  FaBriefcase
};

const FooterManagement = () => {
  // Default footer structure with hexadecimal color values
  const defaultFooterData = {
    legalSection: {
      title: "Legal Standings & Certifications",
      certifications: [
        { name: "Pakistan Center For Philanthropy", icon: "FaCheckCircle", color: "#fbbf24" }
      ],
      programs: "Our Programs are in line with UNSDGs",
      organization: "Abm Pakistan",
      taxNumber: "National Tax Number: 7547210-8"
    },
    aboutSection: {
      title: "About",
      links: [
        { text: "Board", url: "#" },
        { text: "Board", url: "#" },
        { text: "Board", url: "#" },
        { text: "Board", url: "#" },
        { text: "Board", url: "#" }
      ]
    },
    quickLinksSection: {
      title: "Quick Links",
      links: [
        { text: "What We Do", url: "#", icon: "FaRegBuilding" },
        { text: "Success Stories", url: "#", icon: "FaNewspaper" },
        { text: "News & Publications", url: "#", icon: "FaUsers" },
        { text: "Volunteer", url: "#", icon: "FaHandsHelping" },
        { text: "Careers", url: "#", icon: "FaBriefcase" },
        { text: "Contact Us", url: "#", icon: "FaUsers" },
        { text: "Staff Portal", url: "#", icon: "FaUsers" }
      ]
    },
    contactSection: {
      title: "Contact (ABM)",
      email: "contact.abm@domain.com",
      phone: "+92 300 1234567",
      address: "123 ABM Street, Karachi, Pakistan"
    },
    bottomSection: {
      registration: "ABM Pakistan Pakistan is registered under the 1860 Societies Registration Act.",
      copyright: "Copyright © 2025 Abm Pakistan. All rights reserved."
    },
    styling: {
      backgroundColor: "#134e4a", // Replaced bg-teal-900 with hex code
      textColor: "#ffffff",      // Replaced text-white with hex code
      accentColor: "#fbbf24"     // Replaced text-yellow-400 with hex code
    }
  };

  const [footerData, setFooterData] = useState(defaultFooterData);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('legal');

  // Utility function to safely get nested properties with defaults
  const safeGet = (obj, path, defaultValue) => {
    try {
      return path.split('.').reduce((current, key) => current?.[key], obj) ?? defaultValue;
    } catch (error) {
      return defaultValue;
    }
  };

  const iconOptions = [
    { value: "FaCheckCircle", label: "Check Circle", icon: FaCheckCircle },
    { value: "FaRegBuilding", label: "Building", icon: FaRegBuilding },
    { value: "FaNewspaper", label: "Newspaper", icon: FaNewspaper },
    { value: "FaUsers", label: "Users", icon: FaUsers },
    { value: "FaHandsHelping", label: "Helping Hands", icon: FaHandsHelping },
    { value: "FaBriefcase", label: "Briefcase", icon: FaBriefcase }
  ];

  useEffect(() => {
    fetchFooterData();
  }, []);

  useEffect(() => {
    if (footerData) {
      const hasValidStructure =
        // footerData.legalSection?.certifications?.length > 0 &&
        footerData.aboutSection?.links?.length > 0 &&
        footerData.quickLinksSection?.links?.length > 0;

      if (!hasValidStructure) {
        setFooterData(defaultFooterData);
      }
    }
  }, [footerData]);

  const fetchFooterData = async () => {
    try {
      const response = await AxiosRequest.get('/api/footer');
      if (response.data) {
        const mergedData = {
          legalSection: {
            title: safeGet(response.data, 'legalSection.title', defaultFooterData.legalSection.title),
            certifications: safeGet(response.data, 'legalSection.certifications', defaultFooterData.legalSection.certifications),
            programs: safeGet(response.data, 'legalSection.programs', defaultFooterData.legalSection.programs),
            organization: safeGet(response.data, 'legalSection.organization', defaultFooterData.legalSection.organization),
            taxNumber: safeGet(response.data, 'legalSection.taxNumber', defaultFooterData.legalSection.taxNumber)
          },
          aboutSection: {
            title: safeGet(response.data, 'aboutSection.title', defaultFooterData.aboutSection.title),
            links: safeGet(response.data, 'aboutSection.links', defaultFooterData.aboutSection.links)
          },
          quickLinksSection: {
            title: safeGet(response.data, 'quickLinksSection.title', defaultFooterData.quickLinksSection.title),
            links: safeGet(response.data, 'quickLinksSection.links', defaultFooterData.quickLinksSection.links)
          },
          contactSection: {
            title: safeGet(response.data, 'contactSection.title', defaultFooterData.contactSection.title),
            email: safeGet(response.data, 'contactSection.email', defaultFooterData.contactSection.email),
            phone: safeGet(response.data, 'contactSection.phone', defaultFooterData.contactSection.phone),
            address: safeGet(response.data, 'contactSection.address', defaultFooterData.contactSection.address)
          },
          bottomSection: {
            registration: safeGet(response.data, 'bottomSection.registration', defaultFooterData.bottomSection.registration),
            copyright: safeGet(response.data, 'bottomSection.copyright', defaultFooterData.bottomSection.copyright)
          },
          styling: {
            backgroundColor: safeGet(response.data, 'styling.backgroundColor', defaultFooterData.styling.backgroundColor),
            textColor: safeGet(response.data, 'styling.textColor', defaultFooterData.styling.textColor),
            accentColor: safeGet(response.data, 'styling.accentColor', defaultFooterData.styling.accentColor)
          }
        };
        setFooterData(mergedData);
      }
    } catch (error) {
      console.error('Error fetching footer data:', error);
      setFooterData(defaultFooterData);
    }
  };

  const handleInputChange = (section, field, value, index = null) => {
    setFooterData(prev => {
      const newData = { ...prev };
      if (index !== null) {
        newData[section] = {
          ...newData[section],
          [field]: newData[section][field].map((item, i) =>
            i === index ? { ...item, ...value } : item
          )
        };
      } else {
        newData[section] = {
          ...newData[section],
          [field]: value
        };
      }
      return newData;
    });
  };

  const addCertification = () => {
    setFooterData(prev => ({
      ...prev,
      legalSection: {
        ...prev.legalSection,
        certifications: [...(prev.legalSection?.certifications || []), { name: "", icon: "FaCheckCircle", color: "#fbbf24" }]
      }
    }));
  };

  const removeCertification = (index) => {
    setFooterData(prev => ({
      ...prev,
      legalSection: {
        ...prev.legalSection,
        certifications: (prev.legalSection?.certifications || []).filter((_, i) => i !== index)
      }
    }));
  };

  const addAboutLink = () => {
    setFooterData(prev => ({
      ...prev,
      aboutSection: {
        ...prev.aboutSection,
        links: [...(prev.aboutSection?.links || []), { text: "", url: "#" }]
      }
    }));
  };

  const removeAboutLink = (index) => {
    setFooterData(prev => ({
      ...prev,
      aboutSection: {
        ...prev.aboutSection,
        links: (prev.aboutSection?.links || []).filter((_, i) => i !== index)
      }
    }));
  };

  const addQuickLink = () => {
    setFooterData(prev => ({
      ...prev,
      quickLinksSection: {
        ...prev.quickLinksSection,
        links: [...(prev.quickLinksSection?.links || []), { text: "", url: "#", icon: "FaRegBuilding" }]
      }
    }));
  };

  const removeQuickLink = (index) => {
    setFooterData(prev => ({
      ...prev,
      quickLinksSection: {
        ...prev.quickLinksSection,
        links: (prev.quickLinksSection?.links || []).filter((_, i) => i !== index)
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSend = {
        legalSection: {
          title: footerData.legalSection?.title || "",
          certifications: footerData.legalSection?.certifications || [],
          programs: footerData.legalSection?.programs || "",
          organization: footerData.legalSection?.organization || "",
          taxNumber: footerData.legalSection?.taxNumber || ""
        },
        aboutSection: {
          title: footerData.aboutSection?.title || "About",
          links: footerData.aboutSection?.links || []
        },
        quickLinksSection: {
          title: footerData.quickLinksSection?.title || "Quick Links",
          links: footerData.quickLinksSection?.links || []
        },
        contactSection: {
          title: footerData.contactSection?.title || "Contact (ABM)",
          email: footerData.contactSection?.email || "contact.abm@domain.com",
          phone: footerData.contactSection?.phone || "+92 300 1234567",
          address: footerData.contactSection?.address || "123 ABM Street, Karachi, Pakistan"
        },
        bottomSection: {
          registration: footerData.bottomSection?.registration || "ABM Pakistan Pakistan is registered under the 1860 Societies Registration Act.",
          copyright: footerData.bottomSection?.copyright || "Copyright © 2025 Abm Pakistan. All rights reserved."
        },
        styling: {
          backgroundColor: footerData.styling?.backgroundColor || "#134e4a",
          textColor: footerData.styling?.textColor || "#ffffff",
          accentColor: footerData.styling?.accentColor || "#fbbf24"
        }
      };

      await AxiosRequest.post('/api/footer/create', dataToSend);
      toast.success('Footer updated successfully!');
      fetchFooterData();
    } catch (error) {
      console.error('Error updating footer:', error);
      toast.error('Error updating footer');
    } finally {
      setLoading(false);
    }
  };

  const renderLegalSection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">Legal & Certifications Section</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
        <input
          type="text"
          value={footerData.legalSection.title}
          onChange={(e) => {
            setFooterData(prev => ({
              ...prev,
              legalSection: {
                ...prev.legalSection,
                title: e.target.value
              }
            }));
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Programs Text</label>
        <input
          type="text"
          value={footerData.legalSection.programs}
          onChange={(e) => {
            setFooterData(prev => ({
              ...prev,
              legalSection: {
                ...prev.legalSection,
                programs: e.target.value
              }
            }));
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Organization Name</label>
        <input
          type="text"
          value={footerData.legalSection.organization}
          onChange={(e) => {
            setFooterData(prev => ({
              ...prev,
              legalSection: {
                ...prev.legalSection,
                organization: e.target.value
              }
            }));
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tax Number</label>
        <input
          type="text"
          value={footerData.legalSection.taxNumber}
          onChange={(e) => {
            setFooterData(prev => ({
              ...prev,
              legalSection: {
                ...prev.legalSection,
                taxNumber: e.target.value
              }
            }));
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">Certifications</label>
          <button
            type="button"
            onClick={addCertification}
            className="px-3 py-1 bg-teal-600 text-white rounded-md hover:bg-teal-700 text-sm"
          >
            Add Certification
          </button>
        </div>
        
        {footerData.legalSection.certifications.map((cert, index) => {
          const Icon = iconComponents[cert.icon];
          return (
            <div key={index} className="flex gap-2 mb-2 items-center">
              <input
                type="text"
                value={cert.name}
                onChange={(e) => {
                  const currentCertifications = footerData.legalSection?.certifications || [];
                  const newCertifications = [...currentCertifications];
                  newCertifications[index] = { ...newCertifications[index], name: e.target.value };
                  setFooterData(prev => ({
                    ...prev,
                    legalSection: {
                      ...prev.legalSection,
                      certifications: newCertifications
                    }
                  }));
                }}
                placeholder="Certification name"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <select
                value={cert.icon}
                onChange={(e) => {
                  const currentCertifications = footerData.legalSection?.certifications || [];
                  const newCertifications = [...currentCertifications];
                  newCertifications[index] = { ...newCertifications[index], icon: e.target.value };
                  setFooterData(prev => ({
                    ...prev,
                    legalSection: {
                      ...prev.legalSection,
                      certifications: newCertifications
                    }
                  }));
                }}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {iconOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {/* Replaced select with color input */}
              <input
                type="color"
                value={cert.color}
                onChange={(e) => {
                  const currentCertifications = footerData.legalSection?.certifications || [];
                  const newCertifications = [...currentCertifications];
                  newCertifications[index] = { ...newCertifications[index], color: e.target.value };
                  setFooterData(prev => ({
                    ...prev,
                    legalSection: {
                      ...prev.legalSection,
                      certifications: newCertifications
                    }
                  }));
                }}
                className="w-10 h-10 border border-gray-300 rounded-md cursor-pointer"
              />
              <button
                type="button"
                onClick={() => removeCertification(index)}
                className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderAboutSection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">About Section</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
        <input
          type="text"
          value={footerData.aboutSection.title}
          onChange={(e) => {
            setFooterData(prev => ({
              ...prev,
              aboutSection: {
                ...prev.aboutSection,
                title: e.target.value
              }
            }));
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">About Links</label>
          <button
            type="button"
            onClick={addAboutLink}
            className="px-3 py-1 bg-teal-600 text-white rounded-md hover:bg-teal-700 text-sm"
          >
            Add Link
          </button>
        </div>
        
        {footerData.aboutSection.links.map((link, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={link.text}
              onChange={(e) => {
                const currentLinks = footerData.aboutSection?.links || [];
                const newLinks = [...currentLinks];
                newLinks[index] = { ...newLinks[index], text: e.target.value };
                setFooterData(prev => ({
                  ...prev,
                  aboutSection: {
                    ...prev.aboutSection,
                    links: newLinks
                  }
                }));
              }}
              placeholder="Link text"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="text"
              value={link.url}
              onChange={(e) => {
                const currentLinks = footerData.aboutSection?.links || [];
                const newLinks = [...currentLinks];
                newLinks[index] = { ...newLinks[index], url: e.target.value };
                setFooterData(prev => ({
                  ...prev,
                  aboutSection: {
                    ...prev.aboutSection,
                    links: newLinks
                  }
                }));
              }}
              placeholder="URL"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              type="button"
              onClick={() => removeAboutLink(index)}
              className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderQuickLinksSection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">Quick Links Section</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
        <input
          type="text"
          value={footerData.quickLinksSection.title}
          onChange={(e) => {
            setFooterData(prev => ({
              ...prev,
              quickLinksSection: {
                ...prev.quickLinksSection,
                title: e.target.value
              }
            }));
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">Quick Links</label>
          <button
            type="button"
            onClick={addQuickLink}
            className="px-3 py-1 bg-teal-600 text-white rounded-md hover:bg-teal-700 text-sm"
          >
            Add Link
          </button>
        </div>
        
        {footerData.quickLinksSection.links.map((link, index) => {
          const Icon = iconComponents[link.icon];
          return (
            <div key={index} className="flex gap-2 mb-2 items-center">
              <input
                type="text"
                value={link.text}
                onChange={(e) => {
                  const currentLinks = footerData.quickLinksSection?.links || [];
                  const newLinks = [...currentLinks];
                  newLinks[index] = { ...newLinks[index], text: e.target.value };
                  setFooterData(prev => ({
                    ...prev,
                    quickLinksSection: {
                      ...prev.quickLinksSection,
                      links: newLinks
                    }
                  }));
                }}
                placeholder="Link text"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <input
                type="text"
                value={link.url}
                onChange={(e) => {
                  const currentLinks = footerData.quickLinksSection?.links || [];
                  const newLinks = [...currentLinks];
                  newLinks[index] = { ...newLinks[index], url: e.target.value };
                  setFooterData(prev => ({
                    ...prev,
                    quickLinksSection: {
                      ...prev.quickLinksSection,
                      links: newLinks
                    }
                  }));
                }}
                placeholder="URL"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <select
                value={link.icon}
                onChange={(e) => {
                  const currentLinks = footerData.quickLinksSection?.links || [];
                  const newLinks = [...currentLinks];
                  newLinks[index] = { ...newLinks[index], icon: e.target.value };
                  setFooterData(prev => ({
                    ...prev,
                    quickLinksSection: {
                      ...prev.quickLinksSection,
                      links: newLinks
                    }
                  }));
                }}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {iconOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => removeQuickLink(index)}
                className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderContactSection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">Contact Section</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
        <input
          type="text"
          value={footerData.contactSection.title}
          onChange={(e) => {
            setFooterData(prev => ({
              ...prev,
              contactSection: {
                ...prev.contactSection,
                title: e.target.value
              }
            }));
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <input
          type="email"
          value={footerData.contactSection.email}
          onChange={(e) => {
            setFooterData(prev => ({
              ...prev,
              contactSection: {
                ...prev.contactSection,
                email: e.target.value
              }
            }));
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
        <input
          type="text"
          value={footerData.contactSection.phone}
          onChange={(e) => {
            setFooterData(prev => ({
              ...prev,
              contactSection: {
                ...prev.contactSection,
                phone: e.target.value
              }
            }));
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
        <textarea
          value={footerData.contactSection.address}
          onChange={(e) => {
            setFooterData(prev => ({
              ...prev,
              contactSection: {
                ...prev.contactSection,
                address: e.target.value
              }
            }));
          }}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>
    </div>
  );

  const renderBottomSection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">Bottom Section</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Registration Text</label>
        <textarea
          value={footerData.bottomSection.registration}
          onChange={(e) => {
            setFooterData(prev => ({
              ...prev,
              bottomSection: {
                ...prev.bottomSection,
                registration: e.target.value
              }
            }));
          }}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Copyright Text</label>
        <input
          type="text"
          value={footerData.bottomSection.copyright}
          onChange={(e) => {
            setFooterData(prev => ({
              ...prev,
              bottomSection: {
                ...prev.bottomSection,
                copyright: e.target.value
              }
            }));
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>
    </div>
  );

  const renderStylingSection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">Styling Options</h3>
      
      {/* Replaced select with color input for Background Color */}
      <div>
        <label htmlFor="backgroundColor" className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            id="backgroundColor"
            value={footerData.styling.backgroundColor}
            onChange={(e) => {
              setFooterData(prev => ({
                ...prev,
                styling: {
                  ...prev.styling,
                  backgroundColor: e.target.value
                }
              }));
            }}
            className="w-10 h-10 border border-gray-300 rounded-md cursor-pointer"
          />
          <span className="text-sm">{footerData.styling.backgroundColor}</span>
        </div>
      </div>

      {/* Replaced select with color input for Text Color */}
      <div>
        <label htmlFor="textColor" className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            id="textColor"
            value={footerData.styling.textColor}
            onChange={(e) => {
              setFooterData(prev => ({
                ...prev,
                styling: {
                  ...prev.styling,
                  textColor: e.target.value
                }
              }));
            }}
            className="w-10 h-10 border border-gray-300 rounded-md cursor-pointer"
          />
          <span className="text-sm">{footerData.styling.textColor}</span>
        </div>
      </div>

      {/* Replaced select with color input for Accent Color */}
      <div>
        <label htmlFor="accentColor" className="block text-sm font-medium text-gray-700 mb-2">Accent Color</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            id="accentColor"
            value={footerData.styling.accentColor}
            onChange={(e) => {
              setFooterData(prev => ({
                ...prev,
                styling: {
                  ...prev.styling,
                  accentColor: e.target.value
                }
              }));
            }}
            className="w-10 h-10 border border-gray-300 rounded-md cursor-pointer"
          />
          <span className="text-sm">{footerData.styling.accentColor}</span>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'legal':
        return renderLegalSection();
      case 'about':
        return renderAboutSection();
      case 'quickLinks':
        return renderQuickLinksSection();
      case 'contact':
        return renderContactSection();
      case 'bottom':
        return renderBottomSection();
      case 'styling':
        return renderStylingSection();
      default:
        return renderLegalSection();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Toaster/>
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Footer Management</h1>
            <p className="text-gray-600">Manage all footer content and styling from this panel</p>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'legal', label: 'Legal & Certifications' },
                { id: 'about', label: 'About Section' },
                { id: 'quickLinks', label: 'Quick Links' },
                { id: 'contact', label: 'Contact' },
                { id: 'bottom', label: 'Bottom Section' },
                { id: 'styling', label: 'Styling' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-teal-500 text-teal-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              {renderTabContent()}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-teal-600 text-white font-medium rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Updating...' : 'Update Footer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FooterManagement;