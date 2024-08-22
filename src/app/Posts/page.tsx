
"use server";
import Link from "next/link";
import prisma from "../../../lib/prisma";
import Post from "../components/Post";
async function getPosts() {
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
  // console.log(posts);
  
  return (
    <main className="flex min-h-screen flex-col items-start justify-start p-24">
    <div className="w-6/12 flex justify-between  items-center content-center"> 
    <h1 className="text-4xl mb-4 text-sky-500">Feed</h1>   
    <Link href={"/posts/create"} className="focus:outline-none text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-900 my-3">Add Post</Link></div>
    
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
