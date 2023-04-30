import React from 'react'
import PropertiesClient from './PropertiesClient'
import getListings from '../actions/getListings'
import getCurrentUser from '../actions/getCurrentUser'

const Properties = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser){

    }

    const listings = await getListings({});
  return (
    <div>
      <PropertiesClient/>
    </div>
  )
}

export default Properties
