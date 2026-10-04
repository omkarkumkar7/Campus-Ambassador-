import React from 'react'

import whatisca from '../assets/whatisca.webp'
import { FEST_YEAR } from '../config/fest'

const WhatIsCA = () => {
    return (
        <section
            id="caprogram"
            className="relative min-h-screen flex items-center justify-center py-20 px-6 lg:px-20 overflow-hidden"
        >
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url(${whatisca})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Top Shadow Gradient */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0a0a0f] to-transparent z-0" />

            {/* Bottom Shadow Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent z-0" />

            {/* Content container */}
            <div className="relative z-10 max-w-4xl mx-auto text-center">
                {/* Heading */}
                <h2 className="font-jaro text-3xl sm:text-4xl lg:text-5xl font-bold text-[#CABC8E] mb-8 tracking-wide">
                    What is
                    <br />
                    <span className="text-white text-4xl sm:text-5xl lg:text-6xl">
                        CAMPUS AMBASSADOR PROGRAM ?
                    </span>
                </h2>

                {/* Description */}
                <p className="text-gray-300 text-lg sm:text-xl lg:text-2xl leading-relaxed font-light">
                    As part of the student campus ambassador program{' '}
                    <span className="text-[#CABC8E] font-medium">SPRING FEST {FEST_YEAR}</span>{' '}
                    offers students the chance to represent and promote the organization at their colleges and universities.
                    Their responsibilities comprise developing our presence and promoting{' '}
                    <span className="text-[#CABC8E] font-medium">SPRING FEST {FEST_YEAR}</span>{' '}
                    events among students and educators by serving as a link between their colleges and us.
                </p>

                {/* Decorative line */}
                <div className="mt-12 flex justify-center">
                    <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#CABC8E] to-transparent rounded-full" />
                </div>
            </div>
        </section>
    )
}

export default WhatIsCA
