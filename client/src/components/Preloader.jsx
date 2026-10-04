import { useState, useEffect } from 'react';
import preloaderVideo from '../assets/ilu_4.mp4';

const Preloader = ({ onComplete }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);

    const minDisplayTime = 2500; // 2.5 seconds minimum

    useEffect(() => {
        const startTime = Date.now();

        // Animate the loading bar progress
        const progressInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min((elapsed / minDisplayTime) * 100, 100);
            setLoadProgress(progress);

            if (progress >= 100) {
                clearInterval(progressInterval);
            }
        }, 16); // ~60fps update

        const handleLoad = () => {
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, minDisplayTime - elapsedTime);

            setTimeout(() => {
                setLoadProgress(100);
                setIsFadingOut(true);
                // Wait for fade animation to complete
                setTimeout(() => {
                    setIsVisible(false);
                    if (onComplete) onComplete();
                }, 500);
            }, remainingTime);
        };

        // Listen for window load event
        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
            return () => {
                window.removeEventListener('load', handleLoad);
                clearInterval(progressInterval);
            };
        }

        return () => clearInterval(progressInterval);
    }, [onComplete]);

    if (!isVisible) return null;

    return (
        <div
            className={`preloader ${isFadingOut ? 'fade-out' : ''}`}
            style={{
                position: 'fixed',
                inset: 0,
                margin: 0,
                padding: 0,
                width: '100%',
                height: '100%',
                minHeight: '100vh',
                minWidth: '100vw',
                backgroundColor: '#000000',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
                opacity: isFadingOut ? 0 : 1,
                transition: 'opacity 0.5s ease-out',
                overflow: 'hidden',
            }}
        >
            <video
                autoPlay
                muted
                loop
                playsInline
                style={{
                    maxWidth: 'clamp(280px, 80vw, 700px)',
                    maxHeight: 'clamp(280px, 60vh, 700px)',
                    width: '90vw',
                    height: 'auto',
                    objectFit: 'contain',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                }}
            >
                <source src={preloaderVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* White Loading Bar */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 'clamp(40px, 10vh, 100px)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 'clamp(200px, 60vw, 350px)',
                    height: 'clamp(3px, 0.5vh, 5px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    zIndex: 10000,
                }}
            >
                <div
                    style={{
                        width: `${loadProgress}%`,
                        height: '100%',
                        backgroundColor: '#ffffff',
                        borderRadius: '2px',
                        transition: 'width 0.05s linear',
                        boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                    }}
                />
            </div>
        </div>
    );
};

export default Preloader;
