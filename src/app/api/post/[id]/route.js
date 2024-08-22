import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
export async function DELETE(request,{ params}) {
    const id  = params.id;
    console.log ("Delete -------------- ${id}");
    const post = await prisma.post.delete({
        where: {id: id}
    });
  
    return  NextResponse.json(request)

    
}

export async function GET(request,{ params}) {
    const id  = params.id;
    console.log ("Get Request -------------- ${id}");
    const post = await prisma.post.findUnique({
        where: {id: id}
    });
  
    return  NextResponse.json(post)

    
}

