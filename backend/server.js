import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import Stripe from 'stripe';
import cors from 'cors'
import qs from 'qs';
const stripe = new Stripe('sk_test_51O2WXALLS9FttwFMwfSbslVUwJGOzzB4iOt7HA4RE9LDsgRtcuULIicEd24msaH96i9WMH8aSHVzXIb3mFKki4XE00pjy7mfpA');
import Order from "./models/orderModel.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === "developement") {
  app.use(morgan("dev"));
}
app.use(cors())

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);
app.post('/api/create-checkout-session', async (req, res) => {
 const products = req.body.products.orderItems
 const orderId = req.body.products._id
  const listItem=products.map((product)=>({
       price_data:{
        currency:"USD",
        product_data:{
          name:product.name
        },
        unit_amount:product.price * 100
      },
      quantity:product.qty
  }))

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types:['card'],
      line_items: listItem,
      mode: 'payment',
      success_url: `http://localhost:3000/order/${orderId}`,
      cancel_url: "http://localhost:3000/",
    });
    const created = session.created
    const customerEmail=session.customer_email
    const status = session.status
   
    console.log(session.id)
    res.json({id:session.id,created:created,customerEmail:customerEmail,status:status})
  } catch (error) {
    console.log(error)
  }
 
});

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is Runn....");
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
