import { NextResponse } from "next/server";



export async function POST(request) {
    const res = await request.json();
    console.log(res);

    const {title, content} = res;
    console.log(res);
    const result = await prisma.post.create({
        data : {
         published:true,   title,content,author: {create: {
                name: "developer"
            
            },
        
        }
        }
    })
    return NextResponse.json({data:result})
    
}