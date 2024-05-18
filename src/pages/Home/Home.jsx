import React, { useState } from "react";
import Header from "../../Components/Banner/Header";
import ExploreMenu from "../../Components/ExploreMenu/ExploreMenu";
// import MenuItems from '../../Components/ExploreMenu/MenuItems'
import FoodDisplay from "../../Components/FoodDisplay/FoodDisplay";

const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      {/* <MenuItems category={category}/> */}
      <FoodDisplay category={category} />
    </>
  );
};

export default Home;
