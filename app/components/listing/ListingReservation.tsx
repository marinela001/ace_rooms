'use client'
import {Range} from 'react-date-range'
import React from 'react'
import Calendar from '../inputs/Calendar'
import Button from '../Button'
interface ListingReservationProps{
price:number,
totalPrice:number,
onChange:(value:Range)=>void,
dateRange:Range,
onSubmit:()=>void,
disabled?:boolean,
disabledDates: Date[]

}
const ListingReservation:React.FC<ListingReservationProps> = ({
price,
dateRange,
totalPrice,
onChange,
onSubmit,
disabledDates,
disabled

}) => {
  return (
    <div className='bg-white rounded-xl overflow-hidden border-[1px] border-neutral-200 ml-9'>
      
      <div className='flex flex-row items-center gap-1 p-4'><div className="font-semibold text-xl">$ {price}</div>
      <div className='text-neutral-500'>night</div>
      </div>

      <Calendar 
      value={dateRange}
      disabledDates={disabledDates}
      onChange={(value)=>onChange(value.selection)}
      />
   
    <hr/>
    <div className='p-4'>
        <Button label='Reserve' onClick={onSubmit} disabled={disabled}/>
    </div>
    <div className="flex flex-row justify-between font-semibold p-3 text-xl ">
        <div>Total</div>
        <div>${totalPrice}</div>
      </div>
       </div>
    
  )
}

export default ListingReservation
