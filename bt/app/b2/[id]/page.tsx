async function getPostData(postId: string) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    if (!response.ok) {
      throw new Error(` ${postId}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default async function PostDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const post = await getPostData(id);
    return (
      <div>
        <h1 className="text-2xl font-bold">Chi tiết Bài viết</h1>
        <article className="mt-4">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="text-base">{post.body}</p>
        </article>
      </div>
    );
  } catch (error) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-red-500">Lỗi khi tải dữ liệu</h1>
        <p>Vui lòng thử lại sau.</p>
      </div>
    );
  }
}
