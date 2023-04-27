
import prisma from "../libs/prismadb"
import { SafeListing } from "../types"

export default async function getListings()  {
try{
const listings = await prisma.listing.findMany({
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