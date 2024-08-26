export default async function Page() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      next: { revalidate: 60 },
    });
  
    if (!res.ok) {
      throw new Error("Failed");
    }
  
    const posts = await res.json();
  
    return (
      <div>
        <h1 className="text-[24px] font-[800]">ISR với Next.js</h1>
        <ul>
          {posts.map((post: any) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </div>
    );
  }
  