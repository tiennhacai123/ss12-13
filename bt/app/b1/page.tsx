import React from "react";
interface Post {
  id: number;
  title: string;
  body: string;
}
async function fetchData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  return data;
}

export default async function PostsPage() {
  const dataUser: Post[] = await fetchData();
  return (
    <>
      <h3>Danh sách bài viết</h3>
      {dataUser.map((item: any) => (
        <ul key={item.id}>
          <li>{item.title}</li>
          <li>{item.body.substring(0, 100)}...</li>
          <hr />
        </ul>
      ))}
    </>
  );
}
