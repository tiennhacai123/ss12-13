import React from "react";

export const metadata = {
  title: "Dữ liệu từ Nhiều API (SSR)",
};

export default async function Page() {
  try {
    const [usersRes, postsRes] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/users"),
      fetch("https://jsonplaceholder.typicode.com/posts"),
    ]);

    if (!usersRes.ok || !postsRes.ok) {
      throw new Error("Failed to fetch data from one or more APIs");
    }

    const [users, posts] = await Promise.all([
      usersRes.json(),
      postsRes.json(),
    ]);

    return (
      <div>
        <h1 className="text-[24px] font-[800]">Dữ liệu từ Nhiều API (SSR)</h1>
        <div className="flex gap-[10px]">
          <section className="mb-[10px]">
            <h2 className="text-[20px] font-[700]">Danh sách Người dùng:</h2>
            <ul>
              {users.map((user: any, index: number) => (
                <li className="border-b-[1px] border-black" key={user.id}>
                  <p className="text-[16px] font-[600]">
                    Người dùng {index + 1}: {user.name}
                  </p>
                  <p>Email: {user.email}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-[20px] font-[700]">Danh sách Bài viết:</h2>
            <ul>
              {posts.map((post: any, index: number) => (
                <li className="border-b-[1px] border-black" key={post.id}>
                  <p className="text-[16px] font-[600]">
                    Bài viết {index + 1}: {post.title}
                  </p>
                  <p>{post.body}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    );
  } catch (error: any) {
    return (
      <div>
        <h1 className="text-[24px] font-[800]">Dữ liệu từ Nhiều API (SSR)</h1>
        <p>Đã xảy ra lỗi: {error.message}</p>
      </div>
    );
  }
}
