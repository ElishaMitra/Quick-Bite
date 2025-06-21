import React, { useState } from 'react'
import "./Home.css"
import Header from '../Header/Header'
import ExploreDish from '../Explore/ExploreDish'
import FoodDisplay from '../FoodDisplay/FoodDisplay'
const Home = () => {
  const [category,setCategory]= useState("All");
  return (
    <div>
      <Header/>
      <ExploreDish category={category} setCategory={setCategory}/>
      <FoodDisplay category={category} setCategory={setCategory}/>
    </div>
  )
}

export default Home
