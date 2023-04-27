
'use client'
import React from 'react'
import { SafeUser } from '../types'
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFavorite from '../hooks/useFavourite';
interface HeartButtonProps{
    currentUser?: SafeUser|null
    listingId:string
}
const HeartButton:React.FC<HeartButtonProps> = ({
    currentUser,
    listingId
}) => {

  const {
    hasFavorited,
    toggleFavorite,
  } = useFavorite({listingId,currentUser})
  return (
    <div className='relative hover:opacity-80 transition cursor-pointer' onClick={toggleFavorite}>
      <AiOutlineHeart size={28} className='fill-white absolute -top-[2px] -right-[2px]'/>
      <AiFillHeart size={24} className={hasFavorited ? 'fill-rose-400':'fill-neutral-400'}/>
    </div>
  )
}

export default HeartButton
