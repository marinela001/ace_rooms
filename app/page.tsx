import React from 'react'
import NavBar from './components/navbar/NavBar'
import Modal from './components/modals/Modal'
import RegisterModal from './components/modals/RegisterModal'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './components/modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'
import RentModal from './components/modals/RentModal'

const page = async() => {


  const currentUser = await getCurrentUser()
  return (
    <div>
<ToasterProvider/>
<RentModal/>
<LoginModal/>
      <RegisterModal/>
      <NavBar currentUser={currentUser}/>
    </div>
  )
}

export default page
