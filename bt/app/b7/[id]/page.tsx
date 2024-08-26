import React from "react";

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  const fetchData = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  try {
    const post = await fetchData(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
    return (
      <div>
        <h1 className="text-xl font-bold mb-5">Tiêu đề: {post.title}</h1>
        <p>Nội dung: {post.body}</p>
      </div>
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Có lỗi xảy ra";
    return (
      <div>
        <p>Đã xảy ra lỗi: {errorMessage}</p>
      </div>
    );
  }
}
