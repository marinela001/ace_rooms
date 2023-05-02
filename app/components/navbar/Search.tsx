
'use client'
import useCountries from '@/app/hooks/useCountries';
import useSearchModal from '@/app/hooks/useSearchModal';
import { differenceInDays } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import React, { useMemo } from 'react'
import { BiSearch } from 'react-icons/bi';
function Search() {

  const searchModal = useSearchModal()


  const params = useSearchParams();
  const { getByValue } = useCountries();

  const  locationValue = params?.get('locationValue'); 
  const  startDate = params?.get('startDate');
  const  endDate = params?.get('endDate');
  const  guestCount = params?.get('guestCount');

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }

    return 'Where to';
  }, [locationValue, getByValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }

    return 'When'
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }

    return 'How many guests';
  }, [guestCount]);

  return (
    <div className='border-[1px] w-full md:w-auto  py-1 ml-8 rounded-full shadow-sm hover:shadow-md transition cursor-pointer' onClick={()=>searchModal.onOpen()}>

        <div className='flex flex-row items-center justify-between '>


            <div className="px-6 text-sm font-semibold">

            {locationLabel}

                
            </div>
            
            <div className="hidden sm:block border-x-[1px] flex-1 text-center text-sm  px-6 font-semibold">{durationLabel}</div>
        
            <div className="hidden sm:block border-x-[1px]  text-center text-sm opacity-70 hover:opacity-90  px-3 font-semibold">{guestLabel}</div>
            <div 
            className=" p-2 bg-gray-950 rounded-full text-white mr-1"
               
          >
            <BiSearch size={18} />
            </div>
        </div>
    </div>
  )
}

export default Search
