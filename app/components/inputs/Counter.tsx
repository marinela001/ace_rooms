import React, { useCallback } from 'react'
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
interface CounterProps{
    title:string,
    subtitle:string
    value:number,
    onChange:(value:number)=>void,
}
const Counter:React.FC<CounterProps> = ({
    title,
    subtitle,
    value,
    onChange
}) => {

    const onAdd = useCallback(()=>{
    onChange(value+1);
    },[value,onChange])

    const onReduce = useCallback(()=>{
       if(value==1) return

        return onChange(value-1);
            },[value,onChange])
  return (
    <div className='flex flex-row items-center justify-between '>
     <div className=" flex flex-col gap-1">
        <div className='font-semibold'>{title}</div>
        <div className='text-gray-600'>{subtitle}</div>
        
</div>
        <div className='flex flex-row gap-4 justify-center '>
            <div className=' flex items-center opacity-75 hover:opacity-100 text-gray-800' onClick={onReduce}><AiOutlineMinusCircle size={22}/></div>
            <div className='font-semibold text-lg'>
            {value}</div>

            <div className=' flex items-center  opacity-75 hover:opacity-100 text-gray-800' onClick={onAdd}><AiOutlinePlusCircle size={22}/></div>
            
            </div>
      
    </div>
  )
}

export default Counter
