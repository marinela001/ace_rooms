import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '../../../libs/prismadb'
interface IParams{
    reservationId:string
}
export async function DELETE(request:Request,{params}:{params:IParams}){
   
    const currentUser = await getCurrentUser();
    if(!currentUser) return NextResponse.error();
const {reservationId} = params
    if(!reservationId || typeof reservationId!=='string'){
        throw new Error('Invalid Id');
    }

    const reservation = await prisma.reservation.deleteMany({
        where:{
            id:reservationId,
        //to make sure that the only ones who can cancel a reservation is the owner of th property
        //or the user who made the reservation on that property
        OR:[
            {userId: currentUser.id},
            {listing :{userId:currentUser.id}}
        ]}
    })


    return NextResponse.json(reservation);

}