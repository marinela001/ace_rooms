
'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import Heading from './Heading'
import Button from './Button'


interface EmptyStateProps{
    title?:string,
    subtitle?:string,
    showReset?:boolean
}
const EmptyState:React.FC<EmptyStateProps> = ({
    title='No exact matches',
    subtitle='Try changing or removing some filters',
    showReset
}) => {

    const router = useRouter()
  return (
    <div className='flex flex-col justify-center items-center h-[60h] mt-32 '>
<Heading title={title} subtitle={subtitle} center/>

{showReset &&
<div className='w-28 mt-6'>

<Button onClick={()=>router.push('/')} label='Reset filters' outline />

</div>}
    </div>
  )
}

export default EmptyState
