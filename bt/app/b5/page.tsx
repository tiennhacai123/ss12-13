import React from "react";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default async function ErrorHandling() {
  let posts: Post[] | null = null;
  let error: string | null = null;

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/nonexistent-url");

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    posts = await response.json();
  } catch (err: unknown) {
    error = err instanceof Error ? err.message : "Unknown error occurred";
  }

  return (
    <div>
      <h1>Xử lý Lỗi với SSR</h1>
      {error ? (
        <div>
          <h3>Đã xảy ra lỗi</h3>
          <p>{error}</p>
        </div>
      ) : (
        <ul>
          {posts?.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
