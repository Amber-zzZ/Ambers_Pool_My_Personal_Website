import { useState, useEffect } from 'react';

export default function Title() {
    const [isTitleVisible, setIsTitleVisible] = useState(false);

    useEffect(() => {
        const fadeInTimer = setTimeout(() => {
            setIsTitleVisible(true);
        }, 500); // Fade in after 0.5 seconds

        const fadeOutTimer = setTimeout(() => {
            setIsTitleVisible(false);
        }, 3000); // Fade out after 3 seconds

        return () => {
            clearTimeout(fadeInTimer);
            clearTimeout(fadeOutTimer);
        };
    }, []);

    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white pointer-events-none">
            <h1 className={`text-5xl font-bold italic transition-opacity duration-1000 ease-in-out ${isTitleVisible ? 'opacity-100' : 'opacity-0'}`}>Amber Pool</h1>
        </div>
    );
}
