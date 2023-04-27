'use client'

import useCountries from '@/app/hooks/useCountries'
import { SafeListing, SafeUser } from '@/app/types'
import { Listing, Reservation } from '@prisma/client'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import React, { useCallback, useMemo } from 'react'
import Image from 'next/image'
import HeartButton from '../HeartButton'
import Button from '../Button'
interface ListingCardProps{
    data:SafeListing,
    reservation?:Reservation,
    onAction?:(id:string)=>void,
    disabled?:boolean,
    actionLabel?:string,
    actionId?:string,
    user?:SafeUser|null
}
const ListingCard:React.FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionId='',
    actionLabel,
    user
}) => {

    const router = useRouter()

    const {getByValue} = useCountries();
    const location = getByValue(data.locationValue)
    const handleCancel = useCallback((e:React.MouseEvent<HTMLButtonElement>)=>{
    e.stopPropagation()
      if(disabled) {return}

      onAction?.(actionId);

    },[onAction,disabled,actionId])

    const price = useMemo(()=>{
        if(reservation) return reservation.totalPrice

        return data.price
        
    },[reservation,data])


    const reservationDate = useMemo(()=>{

        if(!reservation) return null

        const startDate = new Date(reservation.startDate)
        const endDate = new Date(reservation.endDate)

        return `${format(startDate,'PP')} - ${format(endDate,'PP')}`

    },[reservation])
  return (
    <div className='col-span-1 cursor-pointer group ' onClick={()=>router.push(`/listings/${data.id}`)}>
        <div className='flex flex-col gap-2 '>
            <div className='rounded-xl overflow-hidden relative w-full aspect-square'>

<Image alt='listing' src={data.imageSrc} className='object-cover  hover:scale-110 transition' fill/>
<div className='absolute top-3 right-3'>
    <HeartButton currentUser={user} listingId={data.id}/>
</div>
            </div>

            <div className='font-semibold text-lg '>{location?.region},{location?.label}</div>
            <div className='font-light text-neutral-500'>{reservation? reservationDate : data.category}</div>
<div className='flex flex-row gap-1 items-center'>
<div className="font-semibold">
            $ {price}
          </div>
          {!reservation && (
            <div className="font-light">night</div>
          )}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel} 
            onClick={handleCancel}
          />
        )}

        </div>
      
    </div>
  )
}

export default ListingCard
