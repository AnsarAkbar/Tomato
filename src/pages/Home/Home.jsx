import React, { useState } from 'react'
import Header from '../../Components/Banner/Header'
import ExploreMenu from '../../Components/ExploreMenu/ExploreMenu'
import MenuItems from '../../Components/ExploreMenu/MenuItems'

const Home = () => {
  const [category,setCategory]=useState("All")
  return (
    <>
        <Header />
        <ExploreMenu  setCategory={setCategory}/>
        <MenuItems category={category}/>
    </>
  )
}

export default Home