import prisma from '../libs/prismadb'

interface IParams{
authorId?:string,
listingId?:string,
userId?:string
}

export async function getReservations(params:IParams){
    try{
    const { listingId, userId, authorId } = params;
const query:any ={}
if(listingId){
  //to get all reservations made on a property
    query.listingId= listingId
}
if(authorId) {
  //to get all the reservations on a users property
    query.listing = { userId: authorId };
  }
//to get all reservations made by a user
if(userId){
    query.userId = userId
}
const reservations = await prisma.reservation.findMany({

    where:query,
    include:{
        listing:true
    },
    orderBy: {
        createdAt: 'desc'
      }

      
})

const safeReservations = reservations.map(
    (reservation) => ({
    ...reservation,
    createdAt: reservation.createdAt.toISOString(),
    startDate: reservation.startDate.toISOString(),
    endDate: reservation.endDate.toISOString(),
    listing: {
      ...reservation.listing,
      createdAt: reservation.listing.createdAt.toISOString(),
    },
  }));

  return safeReservations;}

  catch (error: any) {
    throw new Error(error);
  }


}