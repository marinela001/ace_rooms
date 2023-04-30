'use client';


import React, { useCallback, useState } from 'react'
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from './Avatar';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/userRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';
import useRentModal from '@/app/hooks/useRentModal';
import { useRouter } from 'next/navigation';


interface UserMenuProps{
  currentUser:SafeUser |null
}

const  UserMenu :React.FC<UserMenuProps> = ({
  currentUser
}) => {
  const router = useRouter()
  const [isOpen,setIsOpen] = useState(false)
  const registerModal =  useRegisterModal()
  const loginModal= useLoginModal()
  const rentModal = useRentModal()
  const toggleOpen = useCallback(()=>{
setIsOpen((value)=>!value);
  },[])



  const onRent = useCallback(()=>{
if(!currentUser) return loginModal.onOpen()
rentModal.onOpen()
  },[currentUser,loginModal,rentModal])
  
  return (
    <div className='relative '>
        <div className="flex flex-row  items-center gap-3 "  >

            <div  onClick={onRent} className="hidden md:block  rounded-full text-sm cursor-pointer p-3 transition bg-neutral-100 hover:bg-gray-200" >

                Add your space for rent
            </div>

            <div 

            onClick={()=>toggleOpen()}
        className="
          p-4
          md:py-1
          md:px-2
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
        >
            <AiOutlineMenu/>
            <Avatar src={currentUser?.image}/>
            </div>
        </div>

        {isOpen && (
  <div 
    className="
      absolute 
      rounded-xl 
      shadow-md
      w-[40vw]
      md:w-3/4 
      bg-white 
      overflow-hidden 
      right-0 
      top-12 
      text-sm
  
    "
  >
<div className="flex flex-col cursor-pointer">
   {currentUser? (
    <>
      <MenuItem onClick={()=>{router.push('/trips')} } label={'My trips'}/>
    <MenuItem onClick={()=>{router.push('/favourites')} } label={'My favourites'}/>
    <MenuItem onClick={()=>{router.push('/reservations')} } label={'My reservations'}/>
    <MenuItem onClick={()=>{router.push('/properties')} } label={'My properties'}/>
    <MenuItem onClick={()=>{rentModal.onOpen()} } label={'Rent your home'}/>
    <MenuItem onClick={()=>{signOut()} } label={'Log out'}/>


    
    </>



   ):(

<>
<MenuItem onClick={()=>{loginModal.onOpen()} } label={'LogIn'}/>
    <MenuItem onClick={()=>{registerModal.onOpen()} } label={'SignUp'}/>
</>

   )}


    
    </div>
    
  </div> )}
 </div>


  )
}

export default UserMenu
