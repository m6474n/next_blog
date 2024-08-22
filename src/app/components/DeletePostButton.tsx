"use client";
import React from 'react'
import { useRouter } from 'next/navigation';

const DeletePostButton = ({postId}:{postId: any}) => {

    const router = useRouter();

async function handleClick() {
    try{
        await fetch('../api/post/'+postId,{
            method: 'DELETE'
        });
        router.refresh()
;    }
catch(e){console.log(e)}    
}



  return (
<button onClick={handleClick} type="button" className="focus:outline-none text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-900 my-3">Delete Post</button>

)
}

export default DeletePostButton

