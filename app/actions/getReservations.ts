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
    query.listingId= listingId
}
if(authorId) {
    query.authorId = authorId;}

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