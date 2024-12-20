import React, { useState, useEffect } from 'react';

const Fetch = () => {

    interface Post {
        id: number;
        name: string;
        longitude: number;
        latitude: number;
        altitude: number;
    }

    const [posts, setPosts] = useState<Post[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:3001/lists', { method: 'GET' })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                console.log(data);
                setPosts(data.lists);
            })
            .catch(error => {
                setError(error.message);
            });
    }, []);

    return (
        <div>
            {error ? (
                <div>Error: {error}</div>
            ) : (
                <ul>
                    {posts.map(post => (
                        <li key={post.id}>{post.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Fetch;
