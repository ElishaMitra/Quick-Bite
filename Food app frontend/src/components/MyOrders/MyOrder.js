import React, { useContext, useEffect, useState } from "react";
import './MyOrder.css';
import { StoreContext } from "../StoreContext/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";

const MyOrder = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchOrders = async () => {
        if (!token) return;

        setLoading(true);
        setError("");

        try {
            const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
            setData(response.data.data);
        } catch (err) {
            setError("Failed to fetch orders. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [token]);

    return (
        <div className="my-orders">
            <h2>My Orders</h2>
            {loading && <p>Loading orders...</p>}
            {error && <p className="error">{error}</p>}
            <div className="container">
                {data.map((order) => (
                    <div key={order._id} className="my-orders-order">
                        <img src={assets.parcel_icon} alt="Parcel Icon" />
                        <p>{order.items.map(item => `${item.name} X ${item.quantity}`).join(", ")}</p>
                        <p>₹{order.amount}.00</p>
                        <p>Items: {order.items.length}</p>
                        <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                        <button onClick={fetchOrders}>Track Order</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrder;

// import React, { useContext, useEffect, useState } from "react";
// import './MyOrder.css'
// import { StoreContext } from "../StoreContext/StoreContext";
// import axios from "axios";
// import { assets } from "../../assets/assets";

// const MyOrder=()=>{


//     const {url,token}=useContext(StoreContext);
//     const [data,setData]=useState([]);

//     const fetchOrders=async()=>{
//         const response=await axios.post(url+"/api/order/userorders",{},{headers:{token}});
//         setData(response.data.data);
//         //console.log(response.data.data);
//     }

//     useEffect(()=>{
//         if(token){
//             fetchOrders();
//         }

//     },[token])


//     return(
//         <div className="my-orders">
//             <h2>My Orders</h2>
//             <div className="container">
//                 {data.map((order,index)=>{
//                     return(
//                         <div key={index} className="my-orders-order">
//                             <img src={assets.parcel_icon} alt="" />
//                             <p>{order.items.map((item,index)=>{
//                                 if(index===order.items.length-1){
//                                     return item.name+" X "+ item.quantity
//                                 }
//                                 else{
//                                     return item.name+" X "+ item.quantity+","

//                                 }
//                             })}</p>
//                             <p>₹{order.amount}.00</p>
//                             <p>Items:{order.items.length}</p>
//                             <p><span>&#x25cf;</span><b>{order.status}</b></p>
//                             <button onClick={fetchOrders}>Track Order</button>
//                         </div>
//                     )

//                 })}
//             </div>

//         </div>
//     )
// }

// export default MyOrder