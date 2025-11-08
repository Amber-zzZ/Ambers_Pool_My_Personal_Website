import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BlogPaper() {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 5500); // Fade in after 5.5 seconds

        return () => clearTimeout(timer);
    }, []);

    const handleClick = () => {
        navigate('/posts');
    };

    return (
        <button
            onClick={handleClick}
            className={`fixed top-10 right-20 w-70 h-40 bg-gray-900/50 rounded-lg shadow-lg shadow-pink-500/20 transform transition-all duration-1000 ease-out z-30 hover:scale-105 border border-transparent hover:border-pink-500 text-gray-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        >
            <div className="p-4">
                <h3 className="text-lg font-bold mb-2 text-gray-100">My Blog website</h3>
                <p>Click to Enter</p>
            </div>
        </button>
    );
}