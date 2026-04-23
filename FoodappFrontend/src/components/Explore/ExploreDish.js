import React from 'react'
import './ExploreDish.css'
import { menu_list } from '../../assets/assets'
const ExploreDish = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our Dishes</h1>
        <p className='explore-menu-text'>Choose menu from here</p>
        <div className='explore-menu-list'>
            {menu_list.map((item,index)=>{
                return(
                    <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-list-item'>
                        <img className={category===item.menu_name?"active":""}src={item.menu_image} alt=""/>
                        <p>{item.menu_name}</p>
                    </div>
                )

            })}
        </div>
      
    </div>
  )
}

export default ExploreDish;
