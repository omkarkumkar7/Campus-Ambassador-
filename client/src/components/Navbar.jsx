// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// /**
//  * HamburgerIcon component for the mobile menu toggle.
//  */
// const HamburgerIcon = () => (
//     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
//     </svg>
// );


// /**
//  * The main Navbar component.
//  */
// const Navbar = () => {
//     // State to manage the mobile menu's open/closed status
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const navigate = useNavigate();
//     // Navigation links data
//     const navLinks = [
//         { name: 'HOME', href: '#home' },
//         { name: 'ABOUT US', href: '#aboutus' },
//         { name: 'CA PROGRAM', href: '#caprogram' },
//         { name: 'PERKS', href: '#perks' },
//         { name: 'RESPONSIBILITY', href: '#responsibility' },
//         { name: 'TESTIMONIALS', href: '#testimonials' },
//         { name: 'TEAM', href: '#ourteam' },
//         { name: 'FAQ', href: '#faq' },
//     ];

//     const [activeSection, setActiveSection] = useState('home');

//     useEffect(() => {
//         const handleIntersect = (entries) => {
//             entries.forEach((entry) => {
//                 if (entry.isIntersecting) {
//                     setActiveSection(entry.target.id);
//                 }
//             });
//         };

//         const observer = new IntersectionObserver(handleIntersect, {
//             root: null,
//             rootMargin: '-50% 0px -50% 0px', // Trigger when element is in the middle of viewport
//             threshold: 0
//         });

//         navLinks.forEach((link) => {
//             const sectionId = link.href.substring(1);
//             const section = document.getElementById(sectionId);
//             if (section) {
//                 observer.observe(section);
//             }
//         });

//         return () => {
//             observer.disconnect();
//         };
//     }, []);

//     return (
//         <nav className="font-jaro fixed top-0 left-0 right-0 z-50">
//             {/* Horizontal navbar for xl2 screens (1220px) and up */}
//             <div className="hidden xl2:block bg-black text-white py-4 border-b border-gray-700 animate-slideDown"  >
//                 <div className="w-full flex items-center justify-between px-8">
//                     <div className="flex items-center space-x-8 text-xl text-gray-300">
//                         {navLinks.map((link) => (
//                             <a
//                                 key={link.name}
//                                 href={link.href}
//                                 className={`nav-link-hover hover:text-[#E83030] px-3 py-2 ${activeSection === link.href.substring(1) ? 'nav-link-active text-[#E83030]' : ''
//                                     }`}
//                                 style={{
//                                     fontWeight: 500,
//                                     animation: 'slideDown 0.5s ease-out forwards',
//                                     animationDelay: '200ms',
//                                     opacity: 0,
//                                     transform: 'translateY(-20px)'
//                                 }}
//                             >
//                                 {link.name}
//                             </a>
//                         ))}
//                     </div>
//                     {/* Desktop Login on the right */}
//                     <div className="flex-shrink-0">
//                         <button
//                             className="inline-block text-m font-medium bg-white text-black px-4 py-2 rounded-md shadow-sm hover:bg-[#CABC8E] transition-colors cursor-pointer"
//                             style={{
//                                 animation: 'slideDown 0.5s ease-out forwards',
//                                 animationDelay: `${navLinks.length * 100}ms`,
//                                 opacity: 0,
//                                 transform: 'translateY(-20px)'
//                             }}
//                             onClick={() => {
//                                 navigate("/signin")
//                             }}
//                         >
//                             Login / SignUp
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             <style>
//                 {`
//                 @keyframes slideDown {
//                     from {
//                         opacity: 0;
//                         transform: translateY(-20px);
//                     }
//                     to {
//                         opacity: 1;
//                         transform: translateY(0);
//                     }
//                 }
//                 `}
//             </style>
//             {/* Mobile/Tablet sidebar content (below 1220px breakpoint) */}
//             <div className="xl2:hidden">
//                 {/* Hamburger button */}
//                 <button
//                     id="menu-toggle"
//                     className={`fixed top-4 left-4 z-50 p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 bg-transparent text-white transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'
//                         }`}
//                     aria-label="Toggle menu"
//                     onClick={() => setIsMenuOpen(!isMenuOpen)}
//                 >
//                     <HamburgerIcon />
//                 </button>

//                 {/* Login button for mobile - top right corner */}
//                 <button
//                     className="fixed top-4 right-4 10 text-xs sm:text-sm font-medium bg-white text-black px-3 py-2 sm:px-4 sm:py-2 cursor-pointer rounded-md shadow-sm hover:bg-[#CABC8E] transition-colors"
//                     onClick={() => {
//                         navigate("/signin")
//                     }}
//                 >
//                     Login / SignUp
//                 </button>


//                 {/* Sidebar container */}
//                 <div
//                     className={`${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
//                         } fixed top-0 left-0 h-full w-[220px] bg-black/40 backdrop-blur-md text-white transition-transform duration-300 ease-in-out z-40 shadow-lg pointer-events-auto`}
//                     style={{
//                         borderRight: '1px solid rgba(255, 255, 255, 0.1)', // optional subtle edge line
//                     }}
//                 >
//                     {/* Sidebar content */}
//                     <div className="flex flex-col h-full py-8 px-5">
//                         {/* Navigation Links */}
//                         <div className="flex flex-col space-y-3 text-lg text-gray-300">
//                             {navLinks.map((link, index) => (
//                                 <a
//                                     key={link.name}
//                                     href={link.href}
//                                     className={`hover:text-[#E83030] px-2 py-2 rounded-md transition-all
//             ${isMenuOpen
//                                             ? 'translate-x-0 opacity-100'
//                                             : '-translate-x-8 opacity-0'
//                                         } 
//             ${activeSection === link.href.substring(1) ? 'text-[#E83030] bg-white/10' : ''}`}
//                                     style={{
//                                         fontWeight: 500,
//                                         transition: 'opacity 300ms, transform 300ms',
//                                         transitionDelay: isMenuOpen ? `${index * 100}ms` : '0ms',
//                                     }}
//                                 >
//                                     {link.name}
//                                 </a>
//                             ))}
//                         </div>
//                     </div>
//                 </div>



//                 {/* Overlay for mobile - closes sidebar when clicking outside */}
//                 {isMenuOpen && (
//                     <div
//                         className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-30 transition-opacity duration-300"
//                         onClick={() => setIsMenuOpen(false)}
//                     ></div>
//                 )}

//             </div>
//         </nav>
//     );
// };

// export default Navbar
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

/**
 * HamburgerIcon component for the mobile menu toggle.
 */
const HamburgerIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
    </svg>
);


/**
 * The main Navbar component.
 */
const Navbar = () => {
    // State to manage the mobile menu's open/closed status
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const navigate = useNavigate();
    const location = useLocation();
    const { token, logout } = useContext(AuthContext);

    // Navigation links data - ordered by appearance on page
    const navLinks = [
        { name: 'HOME', href: '#home' },
        { name: 'WHAT IS CA', href: '#caprogram' },
        { name: 'ABOUT US', href: '#aboutus' },
        { name: 'RESPONSIBILITY', href: '#responsibility' },
        { name: 'PERKS', href: '#perks' },
        { name: 'TESTIMONIALS', href: '#testimonials' },
        { name: 'FAQ', href: '#faq' },
        { name: 'OUR TEAM', href: '#ourteam' },
    ];

    // Login / SignUp before login, Logout after login
    const handleAuthClick = () => {
        setIsMenuOpen(false);
        if (token) {
            logout();
            navigate('/');
        } else {
            navigate('/signin');
        }
    };

    // Track active section based on scroll position using IntersectionObserver
    useEffect(() => {
        // Only run on home page (where sections exist)
        if (location.pathname !== '/') {
            return;
        }

        const handleIntersect = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, {
            root: null,
            rootMargin: '-50% 0px -50% 0px', // Trigger when element is in the middle of viewport
            threshold: 0
        });

        navLinks.forEach((link) => {
            const sectionId = link.href.substring(1);
            const section = document.getElementById(sectionId);
            if (section) {
                observer.observe(section);
            }
        });

        // Handle scroll to detect when at top of page (for home section)
        const handleScroll = () => {
            if (window.scrollY < 100) {
                setActiveSection('home');
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Set home as active on initial load if at top
        if (window.scrollY < 100) {
            setActiveSection('home');
        }

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, [location.pathname]);

    // Update active section from URL hash on route change
    useEffect(() => {
        if (location.hash) {
            setActiveSection(location.hash.substring(1));
        } else if (location.pathname === '/') {
            setActiveSection('home');
        }
    }, [location]);

    return (
        <nav className="font-display fixed top-0 left-0 right-0 z-50">
            {/* Horizontal navbar for lg screens and up */}
            <div className="hidden lg:block bg-black text-white border-b border-white/15">
                <div className="flex h-[55px] items-stretch px-4 xl:px-8">
                    {/* Section links */}
                    <div className="flex flex-1 items-stretch justify-center xl:gap-3">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href.substring(1);
                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className={`relative flex items-center px-2 xl:px-3 text-[13px] xl:text-[17px] tracking-wide whitespace-nowrap transition-colors hover:text-[#4f84ff] ${isActive
                                        ? 'text-[#3d7bff] after:absolute after:inset-x-2 xl:after:inset-x-3 after:-bottom-px after:h-[3px] after:bg-[#3d7bff]'
                                        : 'text-gray-200'
                                        }`}
                                    style={{
                                        animation: 'slideDown 0.5s ease-out forwards',
                                        animationDelay: '200ms',
                                        opacity: 0,
                                        transform: 'translateY(-20px)'
                                    }}
                                >
                                    {link.name}
                                </a>
                            );
                        })}
                    </div>

                    {/* Login / SignUp (Logout once signed in) - right side, after a divider */}
                    <div className="my-3 ml-2 xl:ml-4 flex shrink-0 items-center border-l border-white/30 pl-4 xl:pl-5">
                        <button
                            onClick={handleAuthClick}
                            className="flex items-center gap-2 text-sm xl:text-base text-gray-100 hover:text-[#4f84ff] transition-colors cursor-pointer"
                        >
                            <User className="h-5 w-5" strokeWidth={1.5} />
                            <span>{token ? 'Logout' : 'Login / SignUp'}</span>
                        </button>
                    </div>
                </div>
            </div>

            <style>
                {`
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                `}
            </style>

            {/* Mobile/Tablet sidebar content (below lg breakpoint) */}
            <div className="lg:hidden">
                {/* Hamburger button */}
                <button
                    id="menu-toggle"
                    className={`fixed top-4 left-4 z-50 p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 bg-black text-white transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'
                        }`}
                    aria-label="Toggle menu"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <HamburgerIcon />
                </button>


                {/* Sidebar container */}
                <div
                    className={`${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                        } fixed top-0 left-0 h-full w-[220px] bg-black/40 backdrop-blur-md text-white transition-transform duration-300 ease-in-out z-40 shadow-lg pointer-events-auto`}
                    style={{
                        borderRight: '1px solid rgba(255, 255, 255, 0.1)', // optional subtle edge line
                    }}
                >
                    {/* Sidebar content */}
                    <div className="flex flex-col h-full py-8 px-5">
                        {/* Navigation Links */}
                        <div className="flex flex-col space-y-3 text-lg text-gray-300">
                            {navLinks.map((link, index) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className={`hover:text-[#4f84ff] px-2 py-2 rounded-md transition-all
            ${isMenuOpen
                                            ? 'translate-x-0 opacity-100'
                                            : '-translate-x-8 opacity-0'
                                        } 
            ${activeSection === link.href.substring(1) ? 'text-[#3d7bff] bg-white/10' : ''}`}
                                    style={{
                                        fontWeight: 500,
                                        transition: 'opacity 300ms, transform 300ms',
                                        transitionDelay: isMenuOpen ? `${index * 100}ms` : '0ms',
                                    }}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>

                        {/* Login / Logout */}
                        <div className="mt-4 border-t border-white/15 pt-4">
                            <button
                                onClick={handleAuthClick}
                                className="flex w-full items-center gap-2 px-2 py-2 text-lg text-gray-300 hover:text-[#4f84ff] transition-colors cursor-pointer"
                            >
                                <User className="h-5 w-5" strokeWidth={1.5} />
                                <span>{token ? 'Logout' : 'Login / SignUp'}</span>
                            </button>
                        </div>
                    </div>
                </div>



                {/* Overlay for mobile - closes sidebar when clicking outside */}
                {isMenuOpen && (
                    <div
                        className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-30 transition-opacity duration-300"
                        onClick={() => setIsMenuOpen(false)}
                    ></div>
                )}

            </div>
        </nav>
    );
};

export default Navbar
