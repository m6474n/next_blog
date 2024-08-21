

import Link from "next/link";
import prisma from "../../../lib/prisma";
import Post from "../components/Post";
export async function getPosts() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true }
      }
    }
  });
  return posts;
}

export default async function AllPosts() {
  const posts = await getPosts();
  console.log(posts);
  
  return (
    <main className="flex min-h-screen flex-col items-start justify-start p-24">
      <Link href={"/Posts/create"}>Add Post</Link>
      <h1 className="text-4xl mb-4 text-sky-500">Feed</h1>
    
      {posts.map((post) => (
        <Post 
          key={post.id}
          id={post.id}
          title={post.title}
          content={post.content}
          authorName={post.author?.name} 
        />
      ))}

      
    </main>
  );
}
