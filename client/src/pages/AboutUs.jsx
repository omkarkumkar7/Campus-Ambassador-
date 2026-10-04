import React, { useEffect, useState } from 'react';
import './AboutUs.css'; // You might want to clear this file if you move fully to Tailwind
import aboutUsBackground from '../assets/about-us-copy.webp';
import { FEST_YEAR, FEST_EDITION_LABEL } from '../config/fest';

// --- Helper Functions ---
const formatFinalNumber = (numId, value) => {
    const num = parseInt(value, 10);
    if (numId === 'stat-hits') {
        return `${(num / 100000).toFixed(0)} Lakh+`;
    } else if (numId === 'stat-colleges' || numId === 'stat-footfalls') {
        return `${num.toLocaleString('en-IN')}+`;
    }
    return num.toLocaleString('en-IN');
};

function AboutUs() {
    const [statHits, setStatHits] = useState('0');
    const [statColleges, setStatColleges] = useState('0');
    const [statFootfalls, setStatFootfalls] = useState('0');

    const statSetters = {
        'stat-hits': setStatHits,
        'stat-colleges': setStatColleges,
        'stat-footfalls': setStatFootfalls
    };

    useEffect(() => {
        const animateCount = (targetId, targetValue, setter) => {
            const targetNum = parseInt(targetValue, 10);
            const duration = 2500;
            const startTime = performance.now();

            function step(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease-out expo function for smoother landing
                const easeProgres = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

                const current = Math.floor(easeProgres * targetNum);

                let displayValue;
                if (targetId === 'stat-hits') {
                    displayValue = `${(current / 100000).toFixed(1)} Lakh`;
                } else {
                    displayValue = current.toLocaleString('en-IN');
                }

                setter(displayValue);

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    setter(formatFinalNumber(targetId, targetNum.toString()));
                }
            }
            requestAnimationFrame(step);
        };

        const observerOptions = { root: null, rootMargin: '0px', threshold: 0.3 };
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    const target = entry.target.getAttribute('data-target');
                    const setter = statSetters[id];

                    if (setter) {
                        animateCount(id, target, setter);
                        observer.unobserve(entry.target);
                    }
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animated-number').forEach(stat => observer.observe(stat));

        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="aboutus"
            className="relative min-h-screen flex items-center justify-center overflow-hidden py-24"
        >
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src={aboutUsBackground}
                    alt="Background"
                    className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/80 to-black/70 mix-blend-multiply" />
                <div className="absolute inset-0 bg-black/40" /> {/* Extra darkness for text pop */}
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center">

                {/* Heading Section */}
                <div className="mb-14 max-w-4xl mx-auto">
                    <h2 className="text-orange-500 font-bold tracking-widest text-lg md:text-xl uppercase mb-4 animate-pulse">
                        Since 1960
                    </h2>
                    <h1 className="font-jaro text-6xl md:text-8xl lg:text-9xl text-white mb-8 leading-none drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]">
                        SPRING FEST
                    </h1>
                    <div className="w-32 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto rounded-full mb-8" />

                    <p className="text-gray-200 text-lg md:text-xl leading-relaxed font-light backdrop-blur-sm bg-black/20 p-6 rounded-2xl border border-white/5">
                        <span className="font-semibold text-white">IIT Kharagpur</span> hosts one of the largest Social and Cultural Fests in India.
                        Embodying the true spirit of youth, Spring Fest provides a platform
                        for young talent from all over India to showcase their varied talents.
                        As we enter into the <span className="text-orange-400 font-bold">{FEST_EDITION_LABEL}</span>, all we are looking forward to is to
                        leave behind a legacy of exquisite experiences. With the <span className="text-blue-400 font-semibold">Campus Ambassador Program</span>, you get a chance to be an extended part of the
                        Organizing team of Spring Fest {FEST_YEAR}.
                    </p>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                    {/* Stat Card 1 */}
                    <div className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(234,179,8,0.2)]">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-gray-900 rounded-full border-2 border-yellow-500 flex items-center justify-center shadow-lg shadow-yellow-500/30">
                            <span className="text-2xl">⚡</span>
                        </div>
                        <p className="font-jaro text-5xl md:text-6xl text-white mt-4 animated-number" id="stat-hits" data-target="3000000">
                            {statHits}
                        </p>
                        <p className="text-yellow-400 font-bold tracking-[0.2em] mt-2 text-sm md:text-base uppercase">
                            Website Hits
                        </p>
                    </div>

                    {/* Stat Card 2 */}
                    <div className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(59,130,246,0.2)]">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-gray-900 rounded-full border-2 border-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                            <span className="text-2xl">🏛️</span>
                        </div>
                        <p className="font-jaro text-5xl md:text-6xl text-white mt-4 animated-number" id="stat-colleges" data-target="1300">
                            {statColleges}
                        </p>
                        <p className="text-blue-400 font-bold tracking-[0.2em] mt-2 text-sm md:text-base uppercase">
                            Colleges
                        </p>
                    </div>

                    {/* Stat Card 3 */}
                    <div className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(239,68,68,0.2)]">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-gray-900 rounded-full border-2 border-red-500 flex items-center justify-center shadow-lg shadow-red-500/30">
                            <span className="text-2xl">👣</span>
                        </div>
                        <p className="font-jaro text-5xl md:text-6xl text-white mt-4 animated-number" id="stat-footfalls" data-target="80000">
                            {statFootfalls}
                        </p>
                        <p className="text-red-400 font-bold tracking-[0.2em] mt-2 text-sm md:text-base uppercase">
                            Footfall
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default AboutUs;