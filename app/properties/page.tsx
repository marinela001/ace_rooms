import React from 'react'
import PropertiesClient from './PropertiesClient'
import getListings from '../actions/getListings'
import getCurrentUser from '../actions/getCurrentUser'
import Heading from '../components/Heading'
import EmptyState from '../components/EmptyState'

const Properties = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser){
return(<EmptyState title='Unautorised' subtitle='Please logIn'/>)
    }
   const listings = await getListings({userId:currentUser?.id});

   if(listings.length===0){

    return(<EmptyState title='No properties found' subtitle='Looks like you have not listed a property for rent yet'/>)
   }
  return (
    <div className='m-8'>
      <Heading title='Your Properties' subtitle='Properties you have added for rent'/>
      <PropertiesClient listings={listings} currentUser={currentUser}/>
    </div>
  )
}

export default Properties
