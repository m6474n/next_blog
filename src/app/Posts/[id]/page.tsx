
"use client";

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

async function fetchPost(id: string) {
  try {
    const response = await fetch(`/api/post/${id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
}




const Page = () => {
    const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);

function handleClick(){
  router.push(`/posts/${id}/update`)
}


  useEffect(() => {
    if (id) {
      fetchPost(id).then((data) => {
        setPost(data);
      });
    }
  }, [id]);

  return (
    <>
     

      {post ? (
       <div className='p-24'>
       <h1 className='text-4xl'>Title : {post.title}</h1>
       {/* <h4><strong>Published: </strong>{post.published}</h4> */}
      <pre> <p>Content : {post.content}</p></pre>
      <button onClick={()=>{router.back()}} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Back</button>
      <button onClick={handleClick} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Edit</button>
       </div>
       
    // <pre>{JSON.stringify(post, null, 2)}</pre>
      ) : (
        
        <p> <h1>Fetching post</h1>
            Loading...</p>
      )}

      
    </>
  );
};

export default Page;
