
import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaForward, FaBackward } from 'react-icons/fa';
import song1 from '../assets/music/June time - Patrick Patrikios.mp3';
import song2 from '../assets/music/mixkit-beautiful-dream-493.mp3';

const playlist = [
    {
        title: 'June time',
        artist: 'Patrick Patrikios',
        src: song1,
    },
    {
        title: 'Beautiful Dream',
        artist: 'mixkit',
        src: song2,
    }
];

export default function MusicPlayer() {
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const audioRef = useRef(null);

    const currentSong = playlist[currentSongIndex];

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
            if (audioRef.current) {
                audioRef.current.play();
            }
        }, 5000); // Fade in and play after 5 seconds

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying, currentSongIndex]);

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const playNext = () => {
        setCurrentSongIndex((prevIndex) => (prevIndex + 1) % playlist.length);
        setIsPlaying(true);
    };

    const playPrev = () => {
        setCurrentSongIndex((prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length);
        setIsPlaying(true);
    };

    const updateProgress = () => {
        const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgress(progress);
    };

    return (
        <div className={`fixed top-57 right-20 w-70 h-auto rounded-lg shadow-lg shadow-pink-500/20 bg-gray-900/50 backdrop-blur-md text-white p-4 border border-pink-500/50 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <audio
                ref={audioRef}
                src={currentSong.src}
                onTimeUpdate={updateProgress}
                onEnded={playNext}
                autoPlay
            />
            <div>
                <h2 className="text-lg font-bold">{currentSong.title}</h2>
                <p className="text-gray-400 text-sm">{currentSong.artist}</p>
            </div>

            <div className="mt-4">
                <div className="w-full bg-gray-700/50 rounded-full h-1.5">
                    <div className="bg-white h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
            </div>

            <div className="flex justify-center items-center space-x-4 mt-4">
                <button onClick={playPrev} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                    <FaBackward className="text-lg" />
                </button>
                <button onClick={togglePlayPause} className="p-3 rounded-full hover:bg-white/10 transition-colors text-xl">
                    {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <button onClick={playNext} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                    <FaForward className="text-lg" />
                </button>
            </div>
        </div>
    );
}
