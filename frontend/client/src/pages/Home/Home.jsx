import React, { useState } from "react";
import Banner from "../../Components/Banner/Banner";
import ExploreMenu from "../../Components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../Components/FoodDisplay/FoodDisplay";

const Home = () => {
  const [category, setCategory] = useState({name:"All"});
  return (
    <>
      <Banner />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
    </>
  );
};

export default Home;
