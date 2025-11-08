import React, { useState, useEffect } from 'react';

export default function Projects() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 5800); // Fade in after 5.8 seconds, slightly after others

        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className={`fixed left-[480px] top-[calc(100vh/20)] w-[400px] h-[60vh] bg-gray-900/50 rounded-lg shadow-lg shadow-cyan-500/20 transform transition-all duration-1000 ease-out z-30 border border-transparent text-gray-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        >
            <div className="p-4 h-full flex flex-col">
                <h3 className="text-lg font-bold mb-4 text-gray-100">My Projects</h3>
                <div className="flex-grow flex items-center justify-center text-gray-400 text-center">
                    <p>No projects yet. Working on it...</p>
                </div>
            </div>
        </div>
    );
}
