import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const frontend_url = "http://localhost:3000";

//  Placing user order from the frontend
const placeOrder = async (req, res) => {
  try {
    console.log("Received order request:", req.body);

    const newOrder = new orderModel({
      userId: req.body.userId, // Fixed `red.body.userId`
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address, // Fixed `adderss`
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Creating line items for Stripe
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    //Adding delivery charges
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: { name: "Delivery Charges" },
        unit_amount: 200, // 2 INR in paisa
      },
      quantity: 1,
    });

    // Creating Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//  Verifying the order after payment
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.error("Verification Error:", error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

//  Fetching user orders
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("User Orders Error:", error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

//  Listing orders for the admin panel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("List Orders Error:", error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

//  Updating order status
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.error("Update Status Error:", error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };

// import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js";
// //import Razorpay from "razorpay"
// import Stripe from "stripe";
// import dotenv from "dotenv";
// dotenv.config();

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// //placing user order from front end

// const placeOrder=async(req,res)=>{
// const frontend_url ="http://localhost:3000"

//     try{
//         const newOrder =new orderModel({
//             userId:red.body.userId,
//             items:req.body.items,
//             amount:req.body.amount,
//             adderss:req.body.address
//         })
//         await newOrder.save();
//         await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

//         const line_items =req.body.items.map((item)=>({
//             price_data:{
//                 currency:"inr",
//                 product_data:{
//                     name:item.name
//                 },
//                 unit_amount:item.price*100
//             },
//             quantity:item.quantity
//         }))
//         // line_items.push({
//         //     price_data:{
//         //         currency:"inr",
//         //         product_data:{
//         //             name:item.name
//         //         },
//         //         unit_amount:item.price*100},
//         //         quantity:item.quantity
//         // })
//         line_items.push({
//             price_data:{
//                 currency:"inr",
//                 product_data:{
//                     name: "Delivery Charges"
//                 },
//                 unit_amount:2*100
//             },
//             quantity:1
//         })
//         const session = await stripe.checkout.sessions.create({
//             line_items:line_items,
//             mode:'payment',
//             success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
//             cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
//         })
//         res.json({success:true,session_url:session.url})

//     }catch(error){
//         console.log(error);
//         res.json({success:false,message:"Error"})
        
//     }

// }
// const verifyOrder=async(req,res)=>{
//     const {orderId,success}=req.body;
//     try{
//         if(success=="true"){
//             await orderModel.findByIdAndUpdate(orderId,{payment:true});
//             res.json({success:true,message:"Paid"})
//         }
//         else{
//             await orderModel.findByIdAndDelete(orderId);
//             res.json({success:false,message:"Not Paid"})
//         }
//     }
//     catch(error){
//         console.log(error);
//         res.json({success:false,message:"Error"})

//     }

// }
// // user orders for frontend
// const userOrders= async(req,res)=>{

//     try{
//         const orders=await orderModel.find({userId:req.body.userId});
//         res.json({success:true,data:orders})

//     }
//     catch{
//         console.log(error);
//         res.json({success:false,message:"Error"})

//     }
// }
// // listing orders for admin panel

// const listOrders=async(req,res)=>{
//     try{
//         const orders=await orderModel.find({});
//         res.json({success:true,data:orders})

//     }
//     catch(error){
//         console.log(error);
//         res.json({success:false,message:"Error"})

//     }

// }
// // api for updating order status
// const updateStatus=async(req,res)=>{
//     try{

//         await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
//         res.json({success:true,message:"Status Updated"})

//     }
//     catch(error){
//         console.log(error);
//         res.json({success:false,message:"Error"})

//     }

// }
// export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus};