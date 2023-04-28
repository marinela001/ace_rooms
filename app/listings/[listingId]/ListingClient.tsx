'use client'

import { categories } from '@/app/Constants'
import ListingHead from '@/app/components/listing/ListingHead'
import ListingInfo from '@/app/components/listing/ListingInfo'
import { SafeListing, SafeUser } from '@/app/types'
import { Reservation } from '@prisma/client'
import React, { useMemo } from 'react'
interface ListingClientProps{
    reservations?:Reservation[]
    listing:SafeListing & {
        user:SafeUser
    },
    currentUser?:SafeUser | null
}
const ListingClient : React.FC<ListingClientProps>= ({
    listing,
    currentUser
}) => {

const category = useMemo(()=>{
   return categories.find((item)=>item.label === listing.category) 
},[listing.category])

  return (
    <div className="max-w-screen-lg 
    mx-auto">
    <div className='flex flex-col gap-6 mx-4'>
      <ListingHead
      title={listing.title}
      imageSrc={listing.imageSrc}
      locationValue={listing.locationValue}
      id={listing.id}
      currentUser={currentUser}
      />
    </div>
    <div className="mt-8 grid 
              grid-cols-1 
              md:grid-cols-2
              gap-3
              mx-3
               ">
    <ListingInfo
    user={listing.user}
    category={category}
    description={listing.description}
    roomCount={listing.roomCount}
    bathroomCount={listing.bathroomCount}
    locationValue={listing.locationValue}
    guestCount={listing.guestCount}

    /></div>
    </div>
  )
}

export default ListingClient
