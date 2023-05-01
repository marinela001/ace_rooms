
import prisma from "../libs/prismadb"
import { SafeListing } from "../types"


export interface IListingsParams {
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
  }
  
export default async function getListings(params:IListingsParams)  {
try{



    const {
        userId,
        roomCount, 
        guestCount, 
        bathroomCount, 
        locationValue,
        startDate,
        endDate,
        category,
      } = params;
  
      let query: any = {};
      
    if (userId) {
        query.userId = userId;
      }

const listings = await prisma.listing.findMany({
    where:query,

    
    orderBy:{
        createdAt:'desc'
    }
})
const safeListing = listings.map((listing)=>({
   ...listing,
   createdAt:listing.createdAt.toISOString() 
}))
return safeListing

}
catch(error:any){
    throw new Error(error)


}
  
  
}