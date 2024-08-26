"use client";
import React, { useState, useEffect } from "react";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const fetchPostsData = async (): Promise<Post[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};

export default function PostListPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPostsData();
        setPosts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const data = await fetchPostsData();
      setPosts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Danh sách Bài viết với Refresh</h1>
      <button
        className="border border-black p-2 bg-blue-600 text-white"
        onClick={handleRefresh}
        disabled={loading}
      >
        {loading ? "Loading..." : "Refresh"}
      </button>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3 className="font-bold">{post.title}</h3>
            <p>{post.body.substring(0, 100)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
