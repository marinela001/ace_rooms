import useCountries from '@/app/hooks/useCountries'
import { SafeUser } from '@/app/types'
import { latLng } from 'leaflet'
import React from 'react'
import { IconType } from 'react-icons'
import Avatar from '../navbar/Avatar'
import ListingCategory from './ListingCategory'
import dynamic from 'next/dynamic'
interface ListingInfoProps{
user:SafeUser,
description:string,
guestCount:number,
roomCount:number,
bathroomCount:number,
category:{
    icon:IconType,
    label:string,
    description:string
} | undefined,
locationValue:string
}
const ListingInfo:React.FC<ListingInfoProps> = ({
    user,
    description,
    guestCount,
    bathroomCount,
    roomCount,
    category,
    locationValue
}) => {

   const {getByValue} = useCountries();

   const coordinates = getByValue(locationValue)?.latlng;

   //import map dinamically to rerender when location changes because it is not suported in React
const Map = dynamic(()=>import('../Map'),{
    //server side rendering
    ssr:false
    
    })

  return (
    <div className='flex flex-col gap-8'>
      <div className="text-xl font-semibold flex flex-row items-center gap-4">

      <div className="">Hosted by {user.name}</div>  
      <Avatar src={user.image}/>
      </div>
      <div className="font-light flex flex-row items-center gap-4 text-neutral-500">
<div className="">
    {guestCount} guests
</div>
<div className="">
    {roomCount} rooms
</div><div className="">
    {bathroomCount} bathrooms
</div>
</div>
<hr/>

{category && (

    <ListingCategory
    icon={category.icon}
    label={category.label}
    description={category.description}
    
    />
)}
<hr/>
<div className="font-light text-lg text-neutral-500">{description}</div>
<hr />
<Map center={coordinates}/>
    </div>
  )
}

export default ListingInfo
