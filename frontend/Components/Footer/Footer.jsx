// import { FaCheckCircle } from "react-icons/fa";
// import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
// import { FaRegBuilding, FaHandsHelping, FaNewspaper, FaUsers, FaBriefcase } from "react-icons/fa";
// import AxiosRequest from "../AxiosRequest/AxiosRequest";
// import { useState, useEffect } from "react";

// const Footer2 = () => {
//   const [footerData, setFooterData] = useState({
//     legalSection: {
//       title: "Legal Standings & Certifications",
//       certifications: [
//         { name: "Pakistan Center For Philanthropy", icon: "FaCheckCircle", color: "text-yellow-400" }
//       ],
//       programs: "Our Programs are in line with UNSDGs",
//       organization: "Abm Pakistan",
//       taxNumber: "National Tax Number: 7547210-8"
//     },
//     aboutSection: {
//       title: "About",
//       links: [{ text: "Board", url: "#" }]
//     },
//     quickLinksSection: {
//       title: "Quick Links",
//       links: [
//         { text: "What We Do", url: "#", icon: "FaRegBuilding" },
//         { text: "Success Stories", url: "#", icon: "FaNewspaper" },
//         { text: "News & Publications", url: "#", icon: "FaUsers" },
//         { text: "Volunteer", url: "#", icon: "FaHandsHelping" },
//         { text: "Careers", url: "#", icon: "FaBriefcase" },
//         { text: "Contact Us", url: "#", icon: "FaUsers" }
//       ]
//     },
//     contactSection: {
//       title: "Contact (ABM)",
//       email: "contact.abm@domain.com",
//       phone: "+92 300 1234567",
//       address: "123 ABM Street, Karachi, Pakistan"
//     },
//     bottomSection: {
//       registration: "ABM Pakistan Pakistan is registered under the 1860 Societies Registration Act.",
//       copyright: "Copyright © 2025 Abm Pakistan. All rights reserved."
//     },
//     styling: {
//       backgroundColor: "bg-teal-900",
//       textColor: "text-white",
//       accentColor: "text-yellow-400"
//     }
//   });

//   useEffect(() => {
//     const fetchFooterData = async () => {
//       try {
//         const response = await AxiosRequest.get("/api/footer");
//         if (response.data) {
//           setFooterData(response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching footer data:", error);
//       }
//     };
//     fetchFooterData();
//   }, []);

//   const getIconComponent = (iconName) => {
//     const iconMap = {
//       FaCheckCircle: <FaCheckCircle />,
//       FaRegBuilding: <FaRegBuilding />,
//       FaNewspaper: <FaNewspaper />,
//       FaUsers: <FaUsers />,
//       FaHandsHelping: <FaHandsHelping />,
//       FaBriefcase: <FaBriefcase />
//     };
//     return iconMap[iconName] || <FaCheckCircle />;
//   };

//   const accentClass = footerData.styling?.accentColor || "text-yellow-400";
//   const textClass = footerData.styling?.textColor || "text-white";

//   return (
//     <footer className={`${footerData.styling?.backgroundColor} ${textClass} py-10 mt-auto`}>
//       <div className="container mx-auto px-6 grid md:grid-cols-3 gap-16 text-sm">
//         {/* Left Section */}
//         <div className="font-semibold">
//           <h3 className="font-bold">{footerData.legalSection?.title}</h3>
//           <div className="flex items-center space-x-3 my-2">
//             {footerData.legalSection?.certifications?.map((cert, index) => (
//               <span key={index} className={`${accentClass} text-4xl`}>
//                 {getIconComponent(cert.icon)}
//               </span>
//             ))}
//             <p className="text-xl">{footerData.legalSection?.certifications?.[0]?.name}</p>
//           </div>
//           <p className="mt-2">{footerData.legalSection?.programs}</p>
//           <div className="flex space-x-2 mt-2">
//             {footerData.legalSection?.certifications?.map((cert, index) => (
//               <span key={index} className={`${accentClass} text-3xl`}>
//                 {getIconComponent(cert.icon)}
//               </span>
//             ))}
//           </div>
//           <p className="mt-2 font-thin">{footerData.legalSection?.organization}</p>
//           <p className="mt-2 font-thin">{footerData.legalSection?.taxNumber}</p>
//         </div>

//         {/* Middle Section */}
//         <div className="grid grid-cols-2 gap-6">
//           <div>
//             <h3 className={`font-bold border-b-2 inline-block ${footerData.styling?.accentClass || 'border-yellow-400'}`}>
//               {footerData.aboutSection?.title || "About"}
//             </h3>

//             <ul className="mt-2 space-y-3 font-semibold">
//               {footerData.aboutSection?.links?.map((link, index) => (
//                 <li key={index}>
//                   <a
//                     href={link.url}
//                     className={`${textClass} hover:${accentClass} transition-colors`}
//                   >
//                     {link.text}
//                   </a>
//                 </li>
//               ))}

//             </ul>
//           </div>
//           <div>
//             <h3 className={`font-bold border-b-2 inline-block ${footerData.styling?.accentClass || 'border-yellow-400'}`}>
//               {footerData.quickLinksSection?.title}
//             </h3>
//             <ul className="mt-2 space-y-3 $">
//               {footerData.quickLinksSection?.links?.map((link, index) => (
//                 <a
//                   key={index}
//                   href={link.url}
//                   className={`flex items-center font-semibold ${textClass} hover:${accentClass} transition-colors`}
//                 >
//                   <span className="mr-2">{getIconComponent(link.icon)}</span>
//                   {link.text}
//                 </a>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="space-y-2 font-semibold text-start">
//           <h3 className={`font-bold border-b-2 inline-block ${footerData.styling?.accentClass || 'border-yellow-400'}`}>{footerData.contactSection?.title}</h3>
//           {/* <div className={`h-1 w-24 rounded-md ${footerData.styling?.accentClass || 'bg-yellow-400'}`}></div> */}

//           <a href={`mailto:${footerData.contactSection?.email}`} className={`block ${textClass} hover:${accentClass} transition-colors`}>
//             {footerData.contactSection?.email}
//           </a>
//           <a href={`tel:${footerData.contactSection?.phone}`} className={`block ${textClass} hover:${accentClass} transition-colors`}>
//             {footerData.contactSection?.phone}
//           </a>
//           <p className={`${textClass} hover:${accentClass} transition-colors`}>
//             {footerData.contactSection?.address}
//           </p>
//         </div>
//       </div>

//       {/* Bottom Section */}
//       <div className={`border-t mt-6 pt-4 text-center text-md flex items-center justify-around ${textClass}`}>
//         <div>
//           <p>{footerData.bottomSection?.registration}</p>
//         </div>
//         <p className="ml-16 text-start">{footerData.bottomSection?.copyright}</p>
//       </div>
//     </footer>
//   );
// };

// export default Footer2;




import { FaCheckCircle, FaRegBuilding, FaHandsHelping, FaNewspaper, FaUsers, FaBriefcase } from "react-icons/fa";
import AxiosRequest from "../AxiosRequest/AxiosRequest";
import { useState, useEffect } from "react";

const Footer2 = () => {
  const [footerData, setFooterData] = useState({
    legalSection: {
      title: "Legal Standings & Certifications",
      certifications: [{ name: "Pakistan Center For Philanthropy", icon: "FaCheckCircle", color: "#FBBF24" }],
      programs: "Our Programs are in line with UNSDGs",
      organization: "Abm Pakistan",
      taxNumber: "National Tax Number: 7547210-8"
    },
    aboutSection: { title: "About", links: [{ text: "Board", url: "#" }] },
    quickLinksSection: {
      title: "Quick Links",
      links: [
        { text: "What We Do", url: "#", icon: "FaRegBuilding" },
        { text: "Success Stories", url: "#", icon: "FaNewspaper" },
        { text: "News & Publications", url: "#", icon: "FaUsers" },
        { text: "Volunteer", url: "#", icon: "FaHandsHelping" },
        { text: "Careers", url: "#", icon: "FaBriefcase" },
        { text: "Contact Us", url: "#", icon: "FaUsers" }
      ]
    },
    contactSection: { title: "Contact (ABM)", email: "contact.abm@domain.com", phone: "+92 300 1234567", address: "123 ABM Street, Karachi, Pakistan" },
    bottomSection: { registration: "ABM Pakistan Pakistan is registered under the 1860 Societies Registration Act.", copyright: "Copyright © 2025 Abm Pakistan. All rights reserved." },
    styling: { backgroundColor: "#064E3B", textColor: "#FFFFFF", accentColor: "#FBBF24" } // use hex codes
  });

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await AxiosRequest.get("/api/footer");
        if (response.data) setFooterData(response.data);
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };
    fetchFooterData();
  }, []);

  const getIconComponent = (iconName, color) => {
    const iconMap = {
      FaCheckCircle: <FaCheckCircle className="" style={{ color }} />,
      FaRegBuilding: <FaRegBuilding style={{ color }} />,
      FaNewspaper: <FaNewspaper style={{ color }} />,
      FaUsers: <FaUsers style={{ color }} />,
      FaHandsHelping: <FaHandsHelping style={{ color }} />,
      FaBriefcase: <FaBriefcase style={{ color }} />
    };
    return iconMap[iconName] || <FaCheckCircle style={{ color }} />;
  };

  const { backgroundColor, textColor, accentColor } = footerData.styling;

  return (
    <footer style={{ backgroundColor, color: textColor, padding: "2.5rem 0", marginTop: "auto" }}>
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-16 text-sm">
        {/* Left Section */}
        <div style={{ fontWeight: 600 }}>
          <h3 style={{ fontWeight: 700 }}>{footerData.legalSection?.title}</h3>
          <div className="flex flex-col items-start space-y-3 my-2">
            {footerData.legalSection?.certifications?.map((cert, idx) => (
              <div key={idx} className="flex items-start  gap-2">
                <span key={idx} style={{ color: accentColor, fontSize: "1.5rem" }}>
                  {getIconComponent(cert.icon, accentColor)}
                </span>
                <p className="inline" style={{ fontSize: "1.25rem" }}>{footerData.legalSection?.certifications?.[idx]?.name}</p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: "0.5rem" }}>{footerData.legalSection?.programs}</p>
          <p style={{ marginTop: "0.5rem", fontWeight: 300 }}>{footerData.legalSection?.organization}</p>
          <p style={{ marginTop: "0.5rem", fontWeight: 300 }}>{footerData.legalSection?.taxNumber}</p>
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 style={{ fontWeight: 700, borderBottom: `2px solid ${accentColor}`, display: "inline-block" }}>
              {footerData.aboutSection?.title || "About"}
            </h3>
            <ul style={{ marginTop: "0.5rem", fontWeight: 600 }}>
              {footerData.aboutSection?.links?.map((link, idx) => (
                <li key={idx}>
                  <a href={link.url} style={{ color: textColor }} onMouseEnter={e => e.currentTarget.style.color = accentColor} onMouseLeave={e => e.currentTarget.style.color = textColor}>
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 style={{ fontWeight: 700, borderBottom: `2px solid ${accentColor}`, display: "inline-block" }}>
              {footerData.quickLinksSection?.title}
            </h3>
            <ul style={{ marginTop: "0.5rem" }}>
              {footerData.quickLinksSection?.links?.map((link, idx) => (
                <a key={idx} href={link.url} style={{ display: "flex", alignItems: "center", fontWeight: 600, color: textColor }} onMouseEnter={e => e.currentTarget.style.color = accentColor} onMouseLeave={e => e.currentTarget.style.color = textColor}>
                  <span style={{ marginRight: "0.5rem" }}>{getIconComponent(link.icon, accentColor)}</span>
                  {link.text}
                </a>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div style={{ fontWeight: 600, textAlign: "start" }}>
          <h3 style={{ fontWeight: 700, borderBottom: `2px solid ${accentColor}`, display: "inline-block" }}>
            {footerData.contactSection?.title}
          </h3>
          <a href={`mailto:${footerData.contactSection?.email}`} style={{ display: "block", color: textColor, marginTop: "0.25rem" }}
            onMouseEnter={e => e.currentTarget.style.color = accentColor} onMouseLeave={e => e.currentTarget.style.color = textColor}>
            {footerData.contactSection?.email}
          </a>
          <a href={`tel:${footerData.contactSection?.phone}`} style={{ display: "block", color: textColor, marginTop: "0.25rem" }}
            onMouseEnter={e => e.currentTarget.style.color = accentColor} onMouseLeave={e => e.currentTarget.style.color = textColor}>
            {footerData.contactSection?.phone}
          </a>
          <p style={{ color: textColor, marginTop: "0.25rem" }}
            onMouseEnter={e => e.currentTarget.style.color = accentColor} onMouseLeave={e => e.currentTarget.style.color = textColor}>
            {footerData.contactSection?.address}
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div style={{ borderTop: `1px solid ${accentColor}`, marginTop: "1.5rem", paddingTop: "1rem", textAlign: "center", display: "flex", justifyContent: "space-around", color: textColor }}>
        <div>
          <p>{footerData.bottomSection?.registration}</p>
        </div>
        <p style={{ marginLeft: "4rem", textAlign: "start" }}>{footerData.bottomSection?.copyright}</p>
      </div>
    </footer>
  );
};

export default Footer2;
