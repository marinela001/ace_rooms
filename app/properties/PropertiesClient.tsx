
'use client'
import React, { useCallback, useState } from 'react'
import { SafeListing, SafeUser } from '../types'
import ListingCard from '../components/listing/ListingCard'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { error } from 'console'
import { useRouter } from 'next/navigation'
interface PropertiesClientProps{
  listings:SafeListing[],
  currentUser:SafeUser|null
}
const PropertiesClient:React.FC<PropertiesClientProps> = ({
  listings,
  currentUser
}) => {

const [deletingId,setDeletingId]=useState('');
const router = useRouter();
const onDelete = useCallback((id:string)=>{
setDeletingId(id);
axios.delete(`/api/listing/${id}`).then(()=>{

  toast.success('Property deleted')
  router.refresh()
}).catch(()=>{
  toast.error('Something went wrong')
}).finally(()=>{

  setDeletingId('')
})


},[router])


  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-10'>
      {listings.map((listing)=>(
        <ListingCard user={currentUser} data={listing} key={listing.id} actionLabel='Delete your property' actionId={listing.id}  onAction={onDelete}
        disabled={deletingId === listing.id}/>
      ))}
    </div>
  )
}

export default PropertiesClient
