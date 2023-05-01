import { NextResponse } from "next/server";
import prisma from '../../libs/prismadb';
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {


    const user = await getCurrentUser()
    if(!user) return NextResponse.error()
    const body = await request.json();

    const {
title,
description,
price,
category,
location,
guestCount,
roomCount,
bathroomCount,
imageSrc
 } = body
  
  
   const listing = await prisma.listing.create({

    data:{
        title,
        description,
        price:parseInt(price),
        category,
        locationValue:location.value,
        guestCount,
        roomCount,
        bathroomCount,
        imageSrc,
        userId:user.id

    }
   })
  
    return NextResponse.json(listing)
  }

