import React from 'react'
import { assets } from '../../assets/assets';
import { Box } from '@mui/material';

const Banner = () => {

  return (
    <>
    <section id="hero-section" class="py-16 mx-auto h-[74vh]" style={{background:`url(${assets.header_img}) no-repeat`,backgroundSize:"cover", objectFit:"cover", objectPosition:"center", backgroundRepeat:"no-repeat"}}>
        <div class="container mx-auto px-8 flex flex-col md:flex-row items-center">
        <div class="md:w-1/2 text-center md:text-left">
            <h1 class="text-4xl md:text-5xl font-bold text-primary mb-4">Order your <br/> favourite food here</h1>
            <p class="text-primary mb-8">Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
            <a href="#" class="inline-block bg-tomato text-white py-2 px-6 rounded-full text-lg hover:bg-red-600 transition">View Menu</a>
        </div>
        </div>
  </section>
    <Box
      height={200}
      width={200}
      my={4}
      display="flex"
      alignItems="center"
      gap={4}
      p={2}
      sx={{ border: '2px solid grey' }}
    >
      This Box uses MUI System props for quick customization.
    </Box>
    </>
  )
}

export default Banner;