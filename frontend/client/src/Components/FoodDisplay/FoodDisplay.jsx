import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'

import Card from './Card';
import useFetch from '../../Hooks/useFetch';

const FoodDisplay = ({ category }) => {
  const { setFoodList,searchValue } = useContext(StoreContext)

  // const searchQ
  // const { data, loading, error } = useFetch({
  //   url: `http://localhost:8082/api/client/products`,
  //   method: "GET",
  // });
  const filter={searchValue}
  const { data, loading, error,fetchData } = useFetch();
  // console.log('data----->', data)
  useEffect(() => {
    fetchData({
      url: `http://localhost:8082/api/client/products?filter=${filter}`,
      method: "GET",
    });
  }
  , [searchValue]);

  setFoodList(data)
  const foodList = data;
  // console.log("food_list----->", data)
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No food found</div>;
  if (data.length === 0) return <div>No food found</div>;



  return (
    <>
      <h3 className="text-2xl font-bold font-outfit py-10 max-md:text-center">Top dishes near you</h3>
      <div className="flex justify-between mb-12 flex-wrap">
        {foodList.map((product, index) =>
          category.name === "All" || category.name === product.category ?
            (<Card key={index} productList={data} product={product} />)
            : null
        )}
      </div>
    </>
  );
};

export default FoodDisplay;