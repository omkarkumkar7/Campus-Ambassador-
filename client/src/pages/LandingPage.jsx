import React from 'react'
import HomePage from './HomePage'
import AboutUs from './AboutUs'
import Testimonials from '../components/testimonials'
import FAQ from './FAQ'
import Responsibility from './Responsibility'
import Perks from './Perks'
import OurTeam from './OurTeam'

export const LandingPage = () => {
  return (
    <>
    <HomePage />
    <AboutUs />
    <Responsibility />
    <Perks />
    <Testimonials/>
    <FAQ />
    <div id="ourteam" className="scroll-mt-25">
       <OurTeam />
    </div>


    </>
  )
}