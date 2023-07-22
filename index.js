import express from "express";
import { PrismaClient } from "@prisma/client";
import userRouter from "./services/Users.js";
import restaurantRouter from "./services/Restaurants.js";
import itemRouter from "./services/Items.js";
import orderRouter from "./services/Orders.js";
import restaurantReviewsRouter from "./services/RestaurantReviews.js";
import path from "path";
import FCM from "fcm-node";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/restaurants", restaurantRouter);
app.use("/items", itemRouter);
app.use("/orders", orderRouter);
app.use("/restaurantreviews", restaurantReviewsRouter);
// Start the server
const PORT = parseInt(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`running on PORT : ${PORT} at : localhost`);
});
