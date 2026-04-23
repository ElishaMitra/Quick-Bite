import { useEffect, useState } from 'react';
import './order.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [Orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      console.log("Fetched orders:", response.data); // Debugging

      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Server error");
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: event.target.value // Fixed event handling
      });

      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className='order-list'>
        {Orders.length > 0 ? Orders.map((order, index) => (
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt="Parcel" />
            <div>
              <p className='order-item-food'>
                {order.items?.map((item, index) => (
                  index === order.items.length - 1
                    ? `${item.name} X ${item.quantity}`
                    : `${item.name} X ${item.quantity}, `
                ))}
              </p>
              <p className='order-item-name'>
                {order.address?.firstName} {order.address?.lastName}
              </p>
              <div className='order-item-address'>
                <p>{order.address?.street}</p>
                <p>{`${order.address?.city}, ${order.address?.state}, ${order.address?.pincode}`}</p>
              </div>
              <p className='order-item-phone'>{order.address?.phone}</p>
            </div>
            <p> Items: {order.items?.length || 0}</p>
            <p>₹{order.amount}</p>
            <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        )) : <p>No orders available</p>}
      </div>
    </div>
  );
};

export default Orders;

// import { useEffect, useState } from 'react'
// import './order.css'
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { assets } from '../../assets/assets';
// const Orders = ({url}) => {
//   const [Orders,setOrders]=useState([]);
//   const fetchAllOrders=async()=>{

//     const response=await axios.get(url+"/api/order/list");
//     if(response.data.success){
//       setOrders(response.data.data);
//       console.log(response.data.data);
//     }
//     else{
//       toast.error("Error")

//     }

//   }
//   const statusHandler=async(event,orderId)=>{
//    // console.log(event,orderId);
//    const response=await axios.post(url+"/api/order/status",{
//     orderId,
//     status:event.value
//    })
//    if(response.data.success){
//     await fetchAllOrders();

//    }

//   }
//   useEffect(()=>{
//     fetchAllOrders();

//   },[])
//   return (
//     <div className='order add'>
//       <h3>Order Page</h3>
//       <div className='order-list'>
//         {Orders.map((order,index)=>(
//           <div key={index} className='order-item'>
//             <img src={assets.parcel_icon} alt="" />
//             <div>
//               <p className='order-item-food'>
//                 {order.items.map((item,index)=>{
//                   if(index===order.items.length-1){
//                     return item.name + " X " + item.quantity
//                   }
//                   else{
//                     return item.name + " X " + item.quantity + ","
//                   }

//                 })}

//               </p>
//               <p className='order-item-name'>
//                 {order.address.firstName+" "+order.address.lastName}

//               </p>
//               <div className='order-item-address'>
//                 <p>{order.address.street}</p>
//                 <p>{order.address.city+" , "+order.address.state+" , "+" , "+order.address.pincode}</p>

//               </div>
//               <p className='order-item-phone'>{order.address.phone}</p>
//               </div>
//               <p> Items:{order.items.length}</p>
//               <p>₹{order.amount}</p>
//               <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
//                 <option value="Food Processing">Food Processing</option>
//                 <option value="Out for delivery">Out for delivery</option>
//                 <option value="Delivered">Delivered</option>
//               </select>

 
//             </div>
//         ))}

//       </div>
      
//     </div>
//   )
// }

// export default Orders
