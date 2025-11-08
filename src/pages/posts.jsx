import {React,useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import Surface from '../components/surface';
import Sky from '../components/sky';
import axios from 'axios';



export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function render() {
            try {
                const apiUrl = "http://localhost:3000/posts"
                const response = await axios.get(apiUrl)
                console.log(response.data)
                setPosts(response.data.map(f => f.replace('.md', '')))
            } catch (err) {
                console.log('Failed to get posts', err)
            } finally {
                setLoading(false);
            }
        }
        render()
    }, []) 
    return (
        <>
            <Surface />
            <Sky />
            <div className="absolute inset-0 flex justify-center items-center z-30">
                <div className="container mx-auto px-4 py-8 text-white max-w-3xl">
                    <h1 className="text-4xl font-bold mb-8 text-center">My Blogs</h1>
                    <div className="space-y-8">
                        {posts.map((post) => (
                            <div key={post} className="bg-white/10 p-6 rounded-lg shadow-lg backdrop-blur-md">
                                <Link to={`/posts/${post}`}>
                                    <h2 className="text-2xl font-bold mb-2">{post}</h2>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}