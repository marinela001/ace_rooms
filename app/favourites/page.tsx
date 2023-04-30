import React from 'react'
import getCurrentUser from '../actions/getCurrentUser'
import EmptyState from '../components/EmptyState';
import getFavoriteListings from '../actions/getFavouriteListings';
import FavouritesClient from './FavouritesClient';

const page = async() => {

    const currentUser = await getCurrentUser();
    if(!currentUser){
        return(
            <EmptyState title='You are not loged in'/>
        )
    }

    const favorites = await getFavoriteListings();
    if(favorites.length===0){
        return(<EmptyState title='No favourite properties found' subtitle='You have not added any property to you favourites list'/>)
    }
  return (
    <div>
      <FavouritesClient listings={favorites} currentUser={currentUser}/>
    </div>
  )
}

export default page
