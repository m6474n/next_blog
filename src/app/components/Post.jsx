import React from 'react';

function Post({ id, title, content, authorName }) {
  return (
    <div key={id} className="post border border-sky-500 p-4 my-2">
      <h2 className='text-xl'>{title}</h2>
      <p>{content}</p>
      <p><strong>Author:</strong> {authorName}</p>
    </div>
  );
}

export default Post;
