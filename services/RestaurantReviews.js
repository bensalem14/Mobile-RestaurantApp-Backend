import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/add", async (req, res) => {
  console.log("Attempt to add review");
  try {
    const rating = req.body.Rating || 0;

    const review = req.body.Review || "";
    var existUserReview = await prisma.restaurantreviews.findMany({
      where: {
        UserId: {
          equals: parseInt(req.body.UserId),
        },
        RestaurantId: {
          equals: req.body.RestaurantId,
        },
      },
    });
    if (existUserReview && existUserReview.length > 0) {
      const answer = existUserReview[0];
      // Find the user based on the provided username
      // Check if the user exists

      await prisma.restaurantreviews.update({
        where: {
          Id: answer.Id,
        },
        data: {
          Review: review,
          Rating: parseInt(rating),
        },
      });
      console.log("modified");
      return res.status(201).json({ message: "Review Modified" });
    } else {
      const restautant = await prisma.restaurantreviews.create({
        data: {
          UserId: parseInt(req.body.UserId),
          RestaurantId: req.body.RestaurantId,
          Review: review,
          Rating: parseInt(rating),
        },
      });
      const rest = await prisma.restaurants.findFirst({
        where: {
          Name: req.body.RestaurantId,
        },
      });
      console.log("restaurant : ", rest);
      await prisma.restaurants.update({
        where: {
          Name: req.body.RestaurantId,
        },
        data: {
          NbReview: {
            increment: review == "" ? 0 : 1,
          },
          NbRating: {
            increment: rating == 0 ? 0 : 1,
          },
          AvgRating:
            (rest.AvgRating * rest.NbRating + parseInt(rating)) /
            (1 + rest.NbRating),
        },
      });
      console.log("added");
      return res
        .status(201)
        .json({ message: "Restaurantreview added successfully" });
    }
  } catch (error) {
    console.error("Error during restaurantreview creation:", error);
    return res
      .status(500)
      .json({ error: "Internal server Restaurantereviews error" });
  }
});
export default router;
