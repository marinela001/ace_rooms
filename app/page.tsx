import React from 'react'
import Container from './components/Container'
import EmptyState from './components/EmptyState';
import getListings from './actions/getListings';
import getCurrentUser from './actions/getCurrentUser';
import { Listing } from '@prisma/client';
import ListingCard from './components/listing/ListingCard';
import { SafeListing } from './types';


const page = async() => {
 const currentUser = await getCurrentUser()
  const listing = await getListings()
  if(listing.length === 0){
    return (<EmptyState showReset/>)
  }

  return (
    <div className='mt-20'>
<Container>
<div className='grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>

  {listing.map((list:SafeListing)=>(<ListingCard key={list.id} user={currentUser} data={list}/>))}
</div>

</Container>
    </div>
  )
}

export default page
