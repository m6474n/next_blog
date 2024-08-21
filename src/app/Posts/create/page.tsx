
"use client";
import React, { useState, FormEvent } from 'react';

const PostForm: React.FC = () => {
  // State hooks to manage form input values
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  // Handle form submission
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
   
    try {
        fetch('../../api/create_post', {
            method: "POST",
            headers: {
                'Content-Type': 'applicaion/json'
            },
            body: JSON.stringify({title, content})
        })
    } catch (error) {
        console.log(error)
        
    }

    setTitle('');
    setContent('');
  };

  return (
    <main className='m-8'>
        <h1 className='text-4xl bold'>Add New Post </h1>
        <form onSubmit={handleSubmit} className='max-w-sm'>
 

 <div className="mb-5">
<label htmlFor="title" className="block mb-2 text-sm font-medium ">Title</label>
<input type="text" id="title" className="border text-black text-sm rounded-lg block w-full p-2.5 focus:outline-none " placeholder="Bonnie Green"  value={title}
     onChange={(e) => setTitle(e.target.value)}
     required/>

</div>

<label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
<textarea id="content" rows={4} className="block p-2.5 w-full text-sm text-black focus:outline-none rounded-lg border  " placeholder="Type Something..."  value={content}
     onChange={(e) => setContent(e.target.value)}
     required></textarea>


 <button type="submit" className='my-4 text-white bg-sky-500 hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-sky-600 dark:hover:bg-sky-700 focus:outline-none dark:focus:ring-sky-800'>Submit</button>
</form>
    </main>
  );
};

export default PostForm;
