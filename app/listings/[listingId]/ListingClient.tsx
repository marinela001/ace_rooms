'use client'

import { categories } from '@/app/Constants'
import ListingHead from '@/app/components/listing/ListingHead'
import ListingInfo from '@/app/components/listing/ListingInfo'
import ListingReservation from '@/app/components/listing/ListingReservation'
import useLoginModal from '@/app/hooks/useLoginModal'
import { SafeListing, SafeReservation, SafeUser } from '@/app/types'
import { Reservation } from '@prisma/client'
import axios from 'axios'
import { differenceInCalendarDays,eachDayOfInterval } from 'date-fns'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

const initialDateRange={
    startDate: new Date(),
    endDate: new Date(),
    key:'selection'
}
interface ListingClientProps{
    reservations?:SafeReservation[]
    listing:SafeListing & {
        user:SafeUser
    },
    currentUser?:SafeUser | null
}
const ListingClient : React.FC<ListingClientProps>= ({
    listing,
    reservations=[],
    currentUser
}) => {

    const router = useRouter()
    const loginModal = useLoginModal()
    const disabledDates =  useMemo(()=>{
 let dates:Date[] = [];
 reservations.forEach((reservation)=>{
    const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
    });
    dates=[...dates,...range]

    
 });
 return dates;
    },[reservations])

    const [isLoading,setIsLoading] =  useState(false)
    const [totalPrice,setTotalPrice] =  useState(listing.price)
    const [dateRange,setDateRange] =  useState(initialDateRange)
    const onCreateReservation = useCallback(()=>{
  if(!currentUser) return loginModal.onOpen();
  setIsLoading(true);

  axios.post('/api/reservations',{
    totalPrice,
    startDate:dateRange.startDate,
    endDate:dateRange.endDate,
    listingId:listing.id
  }).then(()=>{
    toast.success('Property reserved');
    setDateRange(initialDateRange);
    //redirect to trips
    router.refresh()
  }).catch(()=>{
    toast.error('something went wrong, property could not be reserved')
  }).finally(()=>setIsLoading(false))
    },[currentUser, dateRange.endDate, dateRange.startDate, listing.id, loginModal, router, totalPrice])
    
useEffect(()=>{
if(dateRange.startDate && dateRange.endDate){

    const dayCount = differenceInCalendarDays(dateRange.endDate,dateRange.startDate);
if(dayCount && listing.price){

    setTotalPrice(dayCount * listing.price);
}

else{setTotalPrice(listing.price)}

}

},[dateRange,listing.price])

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

    />
    
    <div className="order-first mb-10 md:order-last ">
<ListingReservation
price={listing.price}
totalPrice={totalPrice}
onChange={(value:any)=>{setDateRange(value)}}
dateRange={dateRange}
onSubmit={onCreateReservation}
disabled={isLoading}
disabledDates={disabledDates}
/>

    </div>
    </div>
    </div>
  )
}

export default ListingClient
