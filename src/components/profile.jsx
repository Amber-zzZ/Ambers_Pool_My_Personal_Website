import { useEffect, useState } from 'react';
import AmberAvatar from '../assets/Amber.jpg';

export default function Profile() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 5000); // Fade in after 5 seconds

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`
            w-[400px]
            p-8
            rounded-2xl
            backdrop-blur-md
            bg-gray-900/50
            border
            border-pink-500/50
            shadow-lg shadow-pink-500/10
            transition-all
            duration-1000
            ease-out
            z-[100]
            ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        `}>
            <div className="space-y-6">
    
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-pink-500/50">
                            <img
                                src={AmberAvatar}
                                alt="Amber"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-100">Amber</h2>
                            <p className="text-sm text-gray-400">Learning...</p>
                        </div>
                    </div>
                </div>

               
                <div className="border-t border-pink-500/20"></div>

               
                <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 text-cyan-400">
                        
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <p className="text-gray-300">Somewhere on Earth</p>
                    </div>

                    <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 text-cyan-400">
                            {/* The cloak */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <p className="text-gray-300">Since 2025</p>
                    </div>

                    <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 text-cyan-400">
                            {/* The tag */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path fillRule="evenodd" d="M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39.92 3.31 0l4.318-4.319a2.25 2.25 0 000-3.183L11.12 5.55A3 3 0 009 4.672V2.25H5.25zM5.25 6a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5h-1.5z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <p className="text-gray-300">An ordinary collage student</p>
                    </div>
                </div>

                {/* Social media link */}
                <div className="flex justify-center space-x-4 pt-4">
                    <button 
                            onClick={() => window.open('https://x.com/alypse_apoc', '_blank')}
                    className="p-2 rounded-full hover:bg-cyan-500/20 transition-colors duration-200">
                        <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                        </svg>
                    </button>
                    <button 
                            onClick={() => window.open('https://github.com/Amber-zzZ')}
                    className="p-2 rounded-full hover:bg-cyan-500/20 transition-colors duration-200">
                        <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                        </svg>
                    </button>
                    </div>
                </div>
        </div>
    );
}
