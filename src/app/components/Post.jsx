'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import DeletePostButton from './DeletePostButton';

function Post({ id, title, content, authorName }) {
  const router = useRouter();
  function handleClick(){
  router.push(`/posts/${id}`)
  }
  
  return (
    <div key={id} className="post border border-slate-800 p-4 my-2 rounded-2xl" >
      <h2 className='text-xl cursor-pointer' onClick={handleClick} >{title}</h2>
      <p>{content}</p>
      <p><strong>Author:</strong> {authorName}</p>
      {/* <DeletePostButton postId={id}/> */}
      <DeletePostButton postId={id}/>

    </div>
  );
}

export default Post;
