
'use client'
import React from 'react'
import { SafeUser } from '../types'
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
interface HeartButtonProps{
    currentUser?: SafeUser|null
    id:string
}
const HeartButton:React.FC<HeartButtonProps> = ({
    currentUser,
    id
}) => {

    const isfavourised= true;
    const toggleFavourite=()=>{}
  return (
    <div className='relative hover:opacity-80 transition cursor-pointer' onClick={toggleFavourite}>
      <AiOutlineHeart size={28} className='fill-white absolute -top-[2px] -right-[2px]'/>
      <AiFillHeart size={24} className={isfavourised ? 'fill-rose-400':'fill-neutral-400'}/>
    </div>
  )
}

export default HeartButton
