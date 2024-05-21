import { TextField } from "@mui/material";
import React from "react";

const Placeorder = () => {
  const cartTotalCategoryes = ["Subtotal", "Delivey Fee", "Total"];
  return (
    <div className="flex gap-32  my-24 max-md:flex-wrap max-md:gap-20">
      <form action="" className="flex flex-col gap-5 w-1/2 max-md:w-full">
    <p className="text-2xl font-bold font-outfit mb-4 ">Delivery Information</p>

      <div className="flex gap-5">
        <TextField
          id="outlined-basic"
          label="First name"
          variant="outlined"
          className="w-full"
          required
        />
        <TextField
          id="outlined-basic"
          label="Lastname"
          variant="outlined"
          className="w-full"
          required
        />
      </div>
      <TextField
        id="outlined-basic"
        label="Emailaddress"
        variant="outlined"
        className="w-full"
        required
      />
      <TextField
        id="outlined-basic"
        label="Street"
        variant="outlined"
        className="w-full"
        required
      />
      <div className="flex gap-5">
        <TextField
          id="outlined-basic"
          label="city"
          variant="outlined"
          className="w-full"
          required
        />
        <TextField
          id="outlined-basic"
          label="State"
          variant="outlined"
          className="w-full"
          required
        />
      </div>
      <div className="flex gap-5">
        <TextField
          id="outlined-basic"
          label="Zip code"
          variant="outlined"
          className="w-full"
          required
        />
        <TextField
          id="outlined-basic"
          label="Country"
          variant="outlined"
          className="w-full"
          required
        />
      </div>
      <TextField
        id="outlined-basic"
        label="Phone"
        variant="outlined"
        className="w-full"
        required
      />
    </form>
    <div className="w-1/2 max-md:w-full">
    <p className="text-2xl font-bold font-outfit mb-4 ">Cart Totals</p>
          {cartTotalCategoryes.map((values, index) => (
            <>
              <div className="flex justify-between items-center text-black text-lg py-3">
                <p>{values}</p>
                <p>${values === "Delivey Fee" ? 2 : 0}</p>
              </div>
              <hr />
            </>
          ))}
          {/* <Button variant="outlined" sx={{Padding:'15px', marginTop:'20px', color:"orange", borderColor:"orange", ":hover"}}>PROCEED TO CHECKOUT</Button> */}
          <button onClick={()=>navigate('/order')} className="bg-orange-600 hover:bg-orange-700 text-white px-7 py-4 mt-9 rounded-md text-md duration-200">
          PROCEED TO CHECKOUT
            </button>
        </div>
    </div>
  );
};

export default Placeorder;
