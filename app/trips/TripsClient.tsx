
'use client'
import React, { useCallback, useState } from 'react'
import { SafeReservation, SafeUser } from '../types'
import Container from '../components/Container'
import Heading from '../components/Heading'
import ListingCard from '../components/listing/ListingCard'
import { useRouter } from 'next/navigation'
import { set } from 'date-fns'
import axios from 'axios'
import { toast } from 'react-hot-toast'
interface TripsClientProps{
    reservations:SafeReservation[],
    currentUser:SafeUser | null,
}
const TripsClient:React.FC<TripsClientProps> = ({
    reservations,
    currentUser
}) => {
const router = useRouter();
const [deletingId, setDeletingId]= useState('');

const onCancel = useCallback((id:string)=>{
setDeletingId(id);

axios.delete(`/api/reservations/${id}`).then(()=>{

    toast.success('Reservation Canceled');
    router.refresh()
}).catch((error)=>{
    if(error?.response?.data?.error){
toast.error(error?.response?.data?.error)}
else{toast.error('Something went wrong')}
}) .finally(() => {
    setDeletingId('');
  })


},[router])

  return (<Container>
<Heading title='Trips' subtitle='Where have you been and where will you be going'/>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-9 mt-11'>
     {reservations.map((reservation:any)=>(
        <ListingCard key={reservation.id} data={reservation.listing} user={currentUser} disabled={deletingId === reservation.id} actionLabel='Cancel Reservation' onAction={onCancel} actionId={reservation.id}/>
     ))}
    </div>
  </Container>
  
  )
}

export default TripsClient
