import React from 'react'
import Container from '../Container'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'
import { SafeUser } from '@/app/types'
import Categories from './Categories'

interface NavBarProps{
  currentUser:SafeUser|null
}

const  NavBar :React.FC<NavBarProps> = ({
  currentUser
}) => {

  return (
    <div className='fixed w-full  z-10 shadow-sm  bg-gray-100 mt-0'>

        
      <div className="border-b-[1px] ">

        <Container>

            <div className='flex flex-row items-center justify-between  md:gap-0 h-16'>
          
 <Logo/>
 <Search/>
 <UserMenu  currentUser={currentUser}  />
            </div>
        </Container>
       <Categories/>
      </div>
    </div>
  )
}

export default NavBar
