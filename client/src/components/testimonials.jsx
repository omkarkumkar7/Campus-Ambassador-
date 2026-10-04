import React, { useEffect, useState } from "react";
import Utkarsh from "./images/Utkarsh Kala.png";
import Aditya from "./images/Aditya Saurav.png";
import Raghav from "./images/Raghav Dogra.png";
import Siddhant from "./images/Siddhant Sharma.png";
import Ayushi from "./images/Ayushi Baijal.png"

function Testimonials() {

    const [currentIndex, setcurrentIndex] = useState(0);
    const [animate, setAnimate] = useState(true);

    // loading card info -------------------------------------------------------------------------------------------------------------------
    const cards = [
        {
            id: 1,
            title: "",
            description: "Where the normal Fests remain sparkling and vibrant, I found Spring Fest to be balanced where at one end you‟ll find the Sparks the other side keeps showering the Beauty of the existence of certain aspects of Generations",
            author: "Utkarsh Kala",
            role: "",
            image: Utkarsh,
        },
        {
            id: 2,
            title: "",
            description: "I worked as a campus ambassador of my college at Spring Fest 2026, IIT kharagpur. I really enjoyed working with the people of this organisation. I had lot of fun tasks to do and really liked doing them all. I would like to thank spring fest for giving me this opportunity.",
            author: "Aditya Saurav",
            role: "",
            image: Aditya,
        },
        {
            id: 3,
            title: "",
            description: "Spring fest 2026 was an amazing experience for me. It was wonderful to be a part of something this big. The diversity of events made the fest, a lot more fun and engaging making it a memorable experience. Hope to be a part of Spring Fest.",
            author: "Raghav Dogra",
            role: "",
            image: Raghav,
        },
        {
            id: 4,
            title: "",
            description: "Spring Fest was a memorable experience for me. Working for such a huge fest was a really great experience. All the events held by Spring Fest were great and amazing.It was amazing to be there. I wish to be in SPRING FEST again.",
            author: "Siddhant Sharma",
            role: "",
            image: Siddhant,
        },
        {
            id: 5,
            title: "",
            description: "I just wanted to share a quick note and let you know that SF team did a really good job. I‟m glad I decided to participate in Spring Fest with you guys. It's really great how beautifully your team conducted the entire event online.",
            author: "Ayushi Baijal",
            role: "",
            image: Ayushi,
        }
    ]
    //end-----------------------------------------------------------------------------------------------------------------------------------
    // Create an interval that runs forever every 2 seconds
    useEffect(() => {
        if (animate) {
            const interval = setInterval(() => {
                nextSlide();
            }, 2000);
            return () => clearInterval(interval);
        }

    }, [animate]);

    const handleMouseEnter = () => {
        setAnimate(false);
    };

    const handleMouseLeave = () => {
        setAnimate(true);
    };
    //end-------------------------------------
    //get next slide -----------------------------------------------
    const nextSlide = () => {
        setcurrentIndex((prev) => (prev + 1) % cards.length);
    };
    //get previous slide-----------------------------------------
    const prevSlide = () => {
        setcurrentIndex((prev) => ((prev - 1) + cards.length) % cards.length);
    };
    //nevigation throgh dots----------------------------------------------
    const goToSlide = (index) => {
        setcurrentIndex(index)
    };

    return (
        <div id="testimonials">
            {/*Main Container */}
            <div className="bg-gradient-to-b from-black to-gray-900 flex flex-col h-full w-full justify-center items-center py-16 px-4">
                <h1 className="text-5xl md:text-6xl font-bold text-center mb-16 text-white">Testimonials</h1>
                {/*main content */}
                <div className="relative w-full max-w-6xl h-130 flex items-center justify-center">
                    {/*slider */}
                    <div className="relative h-full w-full overflow-y-hidden overflow-x-hidden flex items-center justify-center">
                        {/*loading cards */}
                        {cards.map((card, index) => {
                            // card specific functions-----------------------------------------------------------------------------

                            //calculateing position of unrendered cards------------
                            let position = index - currentIndex;
                            if (position > 2) {
                                position -= cards.length;
                            }
                            if (position < -2) {
                                position += cards.length;
                            }
                            //done-------------------------------------------------

                            //styleing for each card-------------------------------
                            let getCardStyle = () => {
                                let baseStyle = "absolute h-150 w-90 sm:h-120 sm:w-130 bg-black/10 backdrop-blur-md rounded-2xl p-8 transition all duration-500 ease-in-out border-x border-b border-white/20"
                                //index depended styling---------------
                                if (position == 0) {
                                    return (`${baseStyle} opacity-100 translate-x-0 scale:60 sm:scale-100 z-30`);
                                }
                                else if (position == 1) {
                                    return (`${baseStyle} opacity-0 translate-x-80 scale:50 sm:scale-85 z-20 md:opacity-60`);
                                }
                                else if (position == 2) {
                                    return (`${baseStyle} opacity-0 translate-x-96 scale: 45 sm:scale-75 z-10 md:opacity-30`);
                                }
                                else if (position == -1) {
                                    return (`${baseStyle} opacity-0 -translate-x-80 scale:50 sm:scale-85 z-20 md:opacity-60`);
                                }
                                else if (position == -2) {
                                    return (`${baseStyle} opacity-0 -translate-x-96 scale:45 sm:scale-75 z-10 md:opacity-30`);
                                }
                                else {
                                    return (`${baseStyle} opacity-0 scale-75 z-0 `);
                                }
                            }
                            //end--------------------------------------------------
                            //end--------------------------------------------------------------------------------------------------
                            return (//return card--------------------
                                <div key={card.id} className={getCardStyle()} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                    <div className="flex flex-col h-full justify-between text-white">
                                        <div>
                                            <div className="h-35 w-35 sm:h-50 sm:w-50 translate-x-20 sm:translate-x-35 border-none rounded-full translate-y-5 sm:-translate-y-13">
                                                <img src={card.image}
                                                    alt={card.author}
                                                    className="h-full w-full object-cover rounded-full" />
                                            </div>
                                            <h1 className="pt-15 sm:pt-0 text-2xl font-bold mb-4 text-purple-300 relative">{card.title}</h1>
                                            <p className="font-sans leading-relaxed mb-0 text-gray-200 absolute top-6/12 w-10/12">{card.description}</p>
                                        </div>
                                        <div className="border-t border-white/20 pt-4">
                                            <p className="font-semibold font-sans text-lg">{card.author}</p>
                                            <p className="text-sm text-purple-300">{card.role}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {/*navigation button */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-4/12 z-40 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full backdrop-blur-md transition-all duration-300 border border-white/30"
                        aria-label="Previous testimonial"
                    >
                        <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-4/12 z-40 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full backdrop-blur-md transition-all duration-300 border border-white/30"
                        aria-label="Next testimonial"
                    >
                        <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
                {/*card indication dots */}
                <div className="flex gap-3 mt-12">
                    {cards.map((card, index) => (
                        <button
                            key={card.id}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                                ? 'bg-purple-400 w-8'
                                : 'bg-white/30 hover:bg-white/50'
                                }`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Testimonials;