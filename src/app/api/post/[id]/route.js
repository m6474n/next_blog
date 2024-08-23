import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { title } from "process";
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

export async function PUT(request, { params }) {
    const { id } = params;
    const { title, content } = await request.json(); // Extract data from request body

    console.log(`PUT Request -------------- ${id}`);

    try {
        // Update the post using Prisma
        const post = await prisma.post.update({
            where: { id },
            data: { title, content },
        });

        return NextResponse.json(post);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Post update failed' }, { status: 500 });
    }
}