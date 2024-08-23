
// "use client";
// import React, { useState, FormEvent } from 'react';
// import { useRouter } from 'next/navigation';
// const PostUpdateForm: React.FC = () => {
//   // State hooks to manage form input values
//   const [title, setTitle] = useState<string>('');
//   const [content, setContent] = useState<string>('');
//   const router = useRouter();
//   // Handle form submission
//   const handleSubmit =async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
"use client";


   
//     // try {
//     //   await  fetch('../../api/post/create_post', {
//     //         method: "POST",
//     //         headers: {
//     //             'Content-Type': 'applicaion/json'
//     //         },
//     //         body: JSON.stringify({title, content})
            
//     //     });
//     //     router.refresh();
        
//     //     router.push('/');
        

//     // } catch (error) {
//     //     console.log(error)
        
//     // }

//     setTitle('');
//     setContent('');
//   };

//   return (
//     <main className='m-8'>
//         <h1 className='text-4xl bold'>Add New Post </h1>
//         <form onSubmit={handleSubmit} className='max-w-sm'>
 

//  <div className="mb-5">
// <label htmlFor="title" className="block mb-2 text-sm font-medium ">Title</label>
// <input type="text" id="title" className="border text-black text-sm rounded-lg block w-full p-2.5 focus:outline-none " placeholder="Bonnie Green"  value={title}
//      onChange={(e) => setTitle(e.target.value)}
//      required/>

// </div>

// <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
// <textarea id="content" rows={4} className="block p-2.5 w-full text-sm text-black focus:outline-none rounded-lg border  " placeholder="Type Something..."  value={content}
//      onChange={(e) => setContent(e.target.value)}
//      required></textarea>


//  <button type="submit" className='my-4 text-white bg-sky-500 hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-sky-600 dark:hover:bg-sky-700 focus:outline-none dark:focus:ring-sky-800'>Submit</button>
// </form>
//     </main>
//   );
// };

// export default PostUpdateForm;
import { useParams, useRouter } from 'next/navigation'; // Adjust this import if you're using a different router library
import { FormEvent, useEffect, useState } from 'react';

// Function to fetch the post data
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

// UpdatePost Component
export default function UpdatePost() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>(); // Extract `id` from URL params
  const [post, setPost] = useState<{ title: string; content: string } | null>(null); // State to hold post data
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    if (id) {
      fetchPost(id).then((data) => {
        if (data) {
          setPost(data);
          setTitle(data.title);
          setContent(data.content);
        }
      });
    }
  }, [id]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await fetch(`/api/post/${id}`, { // Adjust the endpoint URL
        method: 'PUT', // Use PUT for updating an existing post
        headers: {
          'Content-Type': 'application/json', // Fix typo here
        },
        body: JSON.stringify({ title, content }),
      });

      // Navigate back to previous page
    //   router.back();

    router.push('/');
    router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  // Handle case when post data is not yet available
  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <main className='m-8'>
      <h1 className='text-4xl font-bold'>Update Post</h1>
      <form onSubmit={handleSubmit} className='max-w-sm'>
        <div className="mb-5">
          <label htmlFor="title" className="block mb-2 text-sm font-medium">Title</label>
          <input
            type="text"
            id="title"
            className="border text-black text-sm rounded-lg block w-full p-2.5 focus:outline-none"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900">Content</label>
        <textarea
          id="content"
          rows={4}
          className="block p-2.5 w-full text-sm text-black focus:outline-none rounded-lg border"
          placeholder="Type Something..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>

        <button
          type="submit"
          className='my-4 text-white bg-sky-500 hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5'
        >
          Submit
        </button>
      </form>
    </main>
  );
}
