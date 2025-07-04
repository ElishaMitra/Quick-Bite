import React,{useContext} from 'react'
import {StoreContext} from '../StoreContext/StoreContext'
import "./Cart.css"
import { useNavigate } from 'react-router-dom';
const Cart = () => {
  const {cartItems,food_list,removeFromCart,getTotalCartAmount,url}=useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className='cart-items'>
        <div className='cart-items-title'>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br/>
        <hr/>
        {food_list.map((item,index)=>{
          if(cartItems[item._id]>0){
            return(
              <div>
              <div className='cart-items-title cart-items-item'>
                <img src={url+"/images/"+item.image} alt=""/>
                <p>{item.name}</p>
                <p>₹{item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>₹{item.price*cartItems[item._id]}</p>
                <p onClick={()=>removeFromCart(item._id)} className="cross">X</p>
              </div>  
              <hr/>
              </div>
            )
          }
        })}
      </div>
      <div className='cart-bottoms'>
        <div className='cart-total'>
          <h2>Cart Total</h2>
          <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p> ₹{getTotalCartAmount()}</p>
            </div>
            <hr/>
            <div className='cart-total-details'>
              <p>Delivery Fee</p>
              <p> ₹{20}</p>
            </div>
            <hr/>
            <div className='cart-total-details'>
              <b>Total</b>
              <b> ₹{getTotalCartAmount()+20}</b>
            </div>
            
          </div>
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECK</button>
        </div>
        <div className='cart-promocode'>
          <div>
            <p>Use promo code here</p>
            <div className='cart-promocode-input'>
              <input type='text' placeholder='promocode'/>
              <button>Submit</button>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Cart
