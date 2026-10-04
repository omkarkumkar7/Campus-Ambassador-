import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import SF_logo from '../assets/SF-logo-removedbg-no-text.png'
import facebookIcon from '../assets/facebook.png'
import instagramIcon from '../assets/instagram.png'
import linkedinIcon from '../assets/linkedin.png'
import youtubeIcon from '../assets/youtube.png'
import xIcon from '../assets/x.png'
import lanternBg from '../assets/lantern-bg.webp'
import kgpLogo from '../assets/logo-kgp-trimmed.png'
import WhatIsCA from '../components/WhatIsCA'

const socialLinks = [
  { icon: facebookIcon, link: "https://www.facebook.com/springfest.iitkgp/", alt: "Facebook" },
  { icon: youtubeIcon, link: "https://www.youtube.com/@SpringFest.", alt: "YouTube" },
  { icon: instagramIcon, link: "https://www.instagram.com/iitkgp.springfest/", alt: "Instagram" },
  { icon: xIcon, link: "https://x.com/springfest_kgp", alt: "X" },
  { icon: linkedinIcon, link: "https://in.linkedin.com/company/spring-fest", alt: "LinkedIn" },
];

// Dark button with a blue outline + glow (shared by Login / SignUp, Your Tasks and Leaderboard)
const ctaClass =
  "cursor-pointer rounded-xl border-2 border-[#3b66ff] bg-[#03050f] px-8 py-3 lg:px-10 " +
  "font-sans text-xl lg:text-2xl font-medium text-[#4f84ff] " +
  "shadow-[0_0_18px_rgba(59,102,255,0.45)] transition-all duration-300 " +
  "hover:scale-105 hover:bg-[#081033] hover:text-[#7aa2ff] hover:shadow-[0_0_30px_rgba(59,102,255,0.8)] " +
  "active:scale-95";

const HomePage = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  return (

    <div id="home" className="overflow-x-hidden">
      <Navbar />

      {/* Main Section */}
      <div className="relative min-h-screen overflow-hidden bg-black">
        {/* Background: lantern lake, colour-graded to deep red */}
        <div
          className="absolute inset-0 bg-cover bg-[position:35%_top] md:bg-[position:center_top]"
          style={{ backgroundImage: `url(${lanternBg})`, filter: 'brightness(1.25) contrast(1.05)' }}
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgb(217, 102, 77)', mixBlendMode: 'multiply' }} />
        {/* Darkening: top edge (under the nav), centre scrim behind the heading, bottom edge */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 50% 48%, rgba(0,0,0,0.35), transparent 70%), ' +
              'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 80%, rgba(0,0,0,0.3) 100%)'
          }}
        />

        {/* Springfest logo - top left */}
        <a
          href="https://springfest.in"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-4 sm:left-8 lg:left-[5.5vw] top-[72px] z-20 flex flex-col items-center transition-transform hover:scale-105"
        >
          <img src={SF_logo} alt="Springfest" className="h-[60px] sm:h-[72px] lg:h-[92px] w-auto" />
          <span className="font-script -mt-1 -rotate-3 text-[26px] sm:text-3xl lg:text-4xl leading-none text-white drop-shadow-lg">
            Springfest
          </span>
        </a>

        {/* IIT KGP logo - top right */}
        <a
          href="https://www.iitkgp.ac.in"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-4 sm:right-8 lg:right-[5.5vw] top-[76px] z-20 transition-transform hover:scale-105"
        >
          <img src={kgpLogo} alt="IIT Kharagpur" className="h-[84px] sm:h-24 lg:h-[118px] w-auto drop-shadow-lg" />
        </a>

        {/* Heading + call to action */}
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-[200px] pb-24 sm:pt-[130px]">
          <div
            role="heading"
            aria-level={1}
            className="ca-reveal font-display text-center text-[clamp(2.4rem,4.6vw,5rem)] leading-tight tracking-[0.02em] text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.65)] sm:whitespace-nowrap"
            style={{ animation: 'caFadeUp 0.9s ease-out 0.2s both' }}
          >
            CAMPUS<br className="sm:hidden" /> AMBASSADOR
          </div>

          <div
            className="ca-reveal mt-12 lg:mt-16 flex flex-col items-center gap-4 sm:flex-row sm:gap-6"
            style={{ animation: 'caFadeUp 0.9s ease-out 0.5s both' }}
          >
            {token ? (
              <>
                <button className={ctaClass} onClick={() => navigate("/dashboard")}>
                  Your Tasks
                </button>
                <button className={ctaClass} onClick={() => navigate("/leaderboard")}>
                  Leaderboard
                </button>
              </>
            ) : (
              <button className={ctaClass} onClick={() => navigate("/signin")}>
                Login / SignUp
              </button>
            )}
          </div>
        </div>

        {/* Social icons - bottom centre */}
        <div className="absolute inset-x-0 bottom-8 lg:bottom-11 z-20 mx-auto flex w-[88vw] max-w-[340px] items-center justify-between sm:max-w-[460px] lg:w-[36vw] lg:max-w-none">
          {socialLinks.map(({ icon, link, alt }) => (
            <a
              key={alt}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform group"
            >
              <img
                src={icon}
                alt={alt}
                className="w-7 h-7 lg:w-8 lg:h-8 transition duration-200 group-hover:scale-110 group-hover:filter group-hover:brightness-0 group-hover:invert group-hover:sepia group-hover:hue-rotate-[330deg] group-hover:saturate-[7] group-hover:drop-shadow-[0_0_6px_#E83030]"
              />
            </a>
          ))}
        </div>

        <style>
          {`
           @keyframes caFadeUp {
             from {
               opacity: 0;
               transform: translateY(20px);
             }
             to {
               opacity: 1;
               transform: translateY(0);
             }
           }

           @media (prefers-reduced-motion: reduce) {
             .ca-reveal { animation: none !important; }
           }
         `}
        </style>
      </div>

      {/* What is CA Section */}
      <WhatIsCA />


    </div>
  )
}


export default HomePage
