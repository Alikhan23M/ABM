import React from "react";
import { FaCheckCircle } from "react-icons/fa"; // Example for certifications
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md"; // Contact icons
import { FaRegBuilding, FaHandsHelping, FaNewspaper, FaUsers, FaBriefcase } from "react-icons/fa"; // Quick links icons

const Footer = () => {
  return (
    <footer className="bg-teal-900 text-white py-10 ">
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-16 text-sm">
        {/* Left Section - Legal & Certifications */}
        <div className="font-semibold">
          <h3 className="font-bold">Legal Standings & Certifications</h3>
          <div className="flex items-center space-x-3 my-2">
            <FaCheckCircle className="text-yellow-400 text-4xl" />
            <FaCheckCircle className="text-yellow-400 text-4xl" />
            <p className="text-xl">Pakistan Center For Philantrophy</p>
          </div>
          <p className="mt-2">Our Programs are in line with UNSDGs</p>
          <div className="flex space-x-2 mt-2">
            <FaCheckCircle className="text-green-400 text-3xl" />
            <FaCheckCircle className="text-green-400 text-3xl" />
            <FaCheckCircle className="text-green-400 text-3xl" />
          </div>
          <p className="mt-2 font-thin">ABM Pakistan Pakistan</p>
          <p className="font-thin">National Tax Number: 7547210-8</p>
        </div>

        {/* Middle Section - About & Quick Links */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold border-b-2 text-xl border-yellow-500 inline-block">About</h3>
            <ul className="mt-2 space-y-3 font-semibold ">
              <li className="hover:text-yellow-700 cursor-pointer"><a href="#">Board</a></li>
              <li className="hover:text-yellow-700 cursor-pointer"><a href="#">Board</a></li>
              <li className="hover:text-yellow-700 cursor-pointer"><a href="#">Board</a></li>
              <li className="hover:text-yellow-700 cursor-pointer"><a href="#">Board</a></li>
              <li className="hover:text-yellow-700 cursor-pointer"><a href="#">Board</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold border-b-2 border-yellow-500 inline-block">Quick Links</h3>
            <ul className="mt-2 space-y-3 ">
              <a className="flex items-center hover:text-yellow-700 cursor-pointer font-semibold"><FaRegBuilding className="mr-2" /> What We Do</a>
              <a href="#" className="flex items-center hover:text-yellow-700 cursor-pointer font-semibold"><FaNewspaper className="mr-2" /> Success Stories</a>
              <a href="#" className="flex items-center hover:text-yellow-700 cursor-pointer font-semibold"><FaUsers className="mr-2" /> News & Publications</a>
              <a href="#" className="flex items-center hover:text-yellow-700 cursor-pointer font-semibold"><FaHandsHelping className="mr-2" /> Volunteer</a>
              <a href="#" className="flex items-center hover:text-yellow-700 cursor-pointer font-semibold"><FaBriefcase className="mr-2" /> Careers</a>
              <a href="#" className="flex items-center hover:text-yellow-700 cursor-pointer font-semibold"><FaUsers className="mr-2" /> Contact Us</a>
              <a href="#" className="flex items-center hover:text-yellow-700 cursor-pointer font-semibold"><FaUsers className="mr-2" /> Staff Portal</a>
            </ul>
          </div>
        </div>

        {/* Right Section - Contact */}
        <div className="space-y-2 font-semibold text-start"> 
          <h3 className="font-bold inline-block">Contact (Pakistan Office)</h3>
          <div className="bg-yellow-700 h-1 w-36 rounded-md"></div>
          <p className="hover:text-yellow-700"> info@shinehumanity.org</p>
          <p className="hover:text-yellow-700"> 0213-7455354</p>
          <p className="hover:text-yellow-700"> 19C, Lane -04, Shahbaz Commercial Area Phase VI, DHA, Karachi. Near PAUL Bakery & Cafe.
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-t-white mt-6 pt-4 text-center text-md flex items-center justify-around ">
        <div>
        <p>
          ABM Pakistan Pakistan is registered under the 1860 Societies Registration Act.
        </p>
        </div>
        <p>Designed & Developed by Digital Hyperlink (PVT) LTD.</p>
      </div>
      <p className="ml-16 text-start">Copyright © 2025 ABM Pakistan. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
