import React from 'react'
import getCurrentUser from '../actions/getCurrentUser'
import EmptyState from '../components/EmptyState';
import { getReservations } from '../actions/getReservations';
import TripsClient from './TripsClient';

const Trips = async () => {

    const currentUser = await getCurrentUser();
    if(!currentUser){

        return(<><EmptyState title='Unathorised' subtitle='Please Log In'/></>)
    }

    const reservations = await getReservations({
        
        userId:currentUser.id})

        if(reservations.length===0){
            return(<EmptyState title='No trips found' subtitle='You have no upcoming trips'/>)
        }


  return (
    <div>
      <TripsClient reservations={reservations} currentUser={currentUser}/>
    </div>
  )
}

export default Trips
