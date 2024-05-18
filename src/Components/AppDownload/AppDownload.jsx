import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets'

const AppDownload = () => {
  return (
    <>
    <div className='text-4xl font-extrabold font-outfit text-center leading-10'>
        For Better Experience Download <br />Tomato App
    </div>
    <div className='flex justify-center gap-3 py-4'>
        <img src={assets.play_store}alt='' className="transform hover:scale-105 transition duration-1000 cursor-pointer"/>
        <img src={assets.app_store} alt="" className="transform hover:scale-105 transition duration-1000 cursor-pointer"/>
    </div>
    </>
  )
}

export default AppDownload;