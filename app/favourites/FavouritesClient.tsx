import React from 'react'
import { SafeListing, SafeUser } from '../types'
import ListingCard from '../components/listing/ListingCard'
import Container from '../components/Container'
import Heading from '../components/Heading'

interface FavouritesClientProps{
    listings:SafeListing[],
    currentUser:SafeUser|null
}
const FavouritesClient :React.FC<FavouritesClientProps>= ({
    listings,
    currentUser
}) => {
  return (
    <Container>
    <Heading title='Favourite properties' subtitle='A list of properties you would like to stay in the future'/>

    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-10'>
        {listings.map((listing)=>( <ListingCard user={currentUser} data={listing} key={listing.id}/>))}
   
    </div></Container>
  )
}

export default FavouritesClient
