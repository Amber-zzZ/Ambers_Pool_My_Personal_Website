import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import matter from 'gray-matter';
import { Buffer } from 'buffer';
window.Buffer = Buffer;
import Surface from '../components/surface';
import Sky from '../components/sky';

export default function PostDetail() {
    const [post, setPost] = useState({ data: {}, content: '' });
    const [loading, setLoading] = useState(true);
    const { filename } = useParams();

    useEffect(() => {
        async function fetchPost() {
            try {
                const apiUrl = `http://localhost:3000/posts/${filename}`;
                const response = await axios.get(apiUrl);
                const { data, content } = matter(response.data);
                setPost({ data, content });
            } catch (err) {
                console.log('Failed to get post', err);
            } finally {
                setLoading(false);
            }
        }
        fetchPost();
    }, [filename]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Surface />
            <Sky />
            <div className="absolute inset-0 flex justify-center items-center z-30">
                <div className="container mx-auto px-4 py-8 text-white max-w-3xl">
                    <h1 className="text-4xl font-bold mb-8 text-center">{post.data.title}</h1>
                    <p className="text-sm text-white/70 mb-4 text-center">{post.data.date}</p>
                    <div className="prose prose-invert max-w-none bg-white/10 p-6 rounded-lg shadow-lg backdrop-blur-md">
                        <ReactMarkdown>{post.content}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </>
    );
}