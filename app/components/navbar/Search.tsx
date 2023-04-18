import React from 'react'
import { BiSearch } from 'react-icons/bi';
function Search() {
  return (
    <div className='border-[1px] w-full md:w-auto  py-1 ml-8 rounded-full shadow-sm hover:shadow-md transition cursor-pointer'>

        <div className='flex flex-row items-center justify-between '>


            <div className="px-6 text-sm font-semibold">

            Where

                
            </div>
            
            <div className="hidden sm:block border-x-[1px] flex-1 text-center text-sm  px-6 font-semibold">When</div>
        
            <div className="hidden sm:block border-x-[1px]  text-center text-sm opacity-70 hover:opacity-90  px-3 font-semibold">How many</div>
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
