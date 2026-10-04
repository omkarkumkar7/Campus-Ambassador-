import React from "react";

import {
  FaFacebookSquare,
  FaEnvelope,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";

import manish from "../components/images/Manish.jpg";
import raj from "../components/images/Raj.jpg";
import prayag from "../components/images/prayag.jpg";
import devansh from "../components/images/Devansh.jpg";
import bgImage from "../components/images/PAT09155.jpg";

// The whole team sits under one department this year.
const ROLE = "Events and Public Relations";

// Blank channels are simply not rendered, so a member can be listed before all
// of their links exist. email/facebook are still pending for everyone.
const TEAM = [
  {
    name: "MANISH BISWAL",
    image: manish,
    whatsapp: "916372738482",
    email: "",
    instagram: "https://www.instagram.com/manishhhbiswal",
    linkedin: "https://www.linkedin.com/in/manish-biswal-b58995320/",
    facebook: "",
  },
  {
    name: "RAJ KADAM",
    image: raj,
    whatsapp: "917038469944",
    email: "",
    instagram: "https://www.instagram.com/rajkadam_77",
    linkedin: "https://www.linkedin.com/in/raj-kadam-b26975322/",
    facebook: "",
  },
  {
    name: "PRAYAG CHOUDHARY",
    image: prayag,
    whatsapp: "918003506629",
    email: "",
    instagram: "https://www.instagram.com/prayagchoudhary_",
    linkedin: "https://www.linkedin.com/in/prayag-choudhary-875362330/",
    facebook: "",
  },
  {
    name: "DEVANSH PALIWAL",
    image: devansh,
    whatsapp: "918830297574",
    email: "",
    instagram: "https://www.instagram.com/paliwal_dev.02",
    linkedin: "https://www.linkedin.com/in/devansh-paliwal/",
    facebook: "",
  },
];

const socialLinksFor = ({ whatsapp, email, instagram, linkedin, facebook }) =>
  [
    whatsapp && {
      label: "WhatsApp",
      href: `https://wa.me/${whatsapp}`,
      icon: <FaWhatsapp />,
      hover: "hover:text-green-400",
    },
    email && {
      label: "Email",
      href: `mailto:${email}`,
      icon: <FaEnvelope />,
      hover: "hover:text-yellow-300",
    },
    instagram && {
      label: "Instagram",
      href: instagram,
      icon: <FaInstagram />,
      hover: "hover:text-pink-500",
    },
    linkedin && {
      label: "LinkedIn",
      href: linkedin,
      icon: <FaLinkedin />,
      hover: "hover:text-blue-400",
    },
    facebook && {
      label: "Facebook",
      href: facebook,
      icon: <FaFacebookSquare />,
      hover: "hover:text-blue-500",
    },
  ].filter(Boolean);

const OurTeam = () => {
  return (
    <div
      className="min-h-screen text-white text-center bg-cover bg-center bg-fixed bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full pt-24">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-wide">
          OUR TEAM
        </h1>
      </div>

      <div className="flex justify-center items-start flex-wrap gap-12 mt-20 pb-20">
        {TEAM.map((member) => (
          <div
            key={member.name}
            className="bg-black/80 rounded-xl shadow-xl w-64 h-[350px] p-6 transition-transform duration-300 hover:scale-105 hover:shadow-blue-500/70"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-44 h-44 rounded-xl mx-auto object-cover shadow-lg transition-transform duration-300 hover:scale-110 hover:brightness-110"
            />
            <h2 className="text-2xl mt-3 font-semibold">{member.name}</h2>
            <p className="text-sm mt-1">{ROLE}</p>

            <div className="flex justify-center gap-4 mt-4 text-3xl">
              {socialLinksFor(member).map(({ label, href, icon, hover }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${member.name} on ${label}`}
                  className={hover}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurTeam;
