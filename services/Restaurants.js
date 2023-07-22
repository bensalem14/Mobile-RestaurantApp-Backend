import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/add", async (req, res) => {
  try {
    // Find the user based on the provided username
    const existRestaurant = await prisma.restaurants.findFirst({
      where: { Name: req.body.Name },
    });

    // Check if the user exists
    if (existRestaurant) {
      return res.status(409).json({ error: "Name Already Taken" });
    } else {
      const restautant = await prisma.restaurants.create({
        data: {
          Name: req.body.Name,
          Adress: req.body.Adress,
          Email: req.body.Email,
          Phone: req.body.Phone,
          XCord: parseFloat(req.body.XCord),
          YCord: parseFloat(req.body.YCord),
          TransportFee: parseFloat(req.body.TransportFee),
          Type: req.body.Type,
          Logo: req.body.Logo,
          AvgRating: 0,
          NbRating: 0,
          NbReview: 0,
        },
      });
      return res
        .status(201)
        .json({ message: "Restaurant created successfully" });
    }
  } catch (error) {
    console.error("Error during restaurant creation:", error);
    return res.status(500).json({ error: "Internal server Restaurants error" });
  }
});

//__________________________________________________________________________________________

router.put("/modify/:restaurantName", async (req, res) => {
  try {
    // Use Prisma to update the user in the database
    const updatedRestaurant = await prisma.restaurants.update({
      where: {
        Name: req.params.restaurantName,
      },
      data: {
        Name: req.body.Name,
        Adress: req.body.Adress,
        Email: req.body.Email,
        Phone: req.body.Phone,
        XCord: parseFloat(req.body.XCord),
        YCord: parseFloat(req.body.YCord),
        TransportFee: parseFloat(req.body.TransportFee),
        Type: req.body.Type,
        Logo: req.body.Logo,
        AvgRating: req.body.AvgRating,
        NbReview: req.body.NbReview,
      },
    });

    res.json({ message: "update successful", updatedRestaurant });
  } catch (error) {
    console.error("Error updating Restaurant:", error);
    res.status(500).json({ error: "Internal server Restaurant error" });
  }
});

//__________________________________________________________________________________________

router.delete("/delete/:restaurantName", async (req, res) => {
  try {
    // Use Prisma to delete the user from the database
    const deletedRestaurant = await prisma.restaurants.delete({
      where: {
        Name: req.params.restaurantName,
      },
    });

    res.json({ message: "delete successful", deletedRestaurant });
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//__________________________________________________________________________________________

router.get("/get/:restaurantName", async (req, res) => {
  try {
    console.log(req.params);
    // Find the user based on the provided username
    const restaurant = await prisma.restaurants.findFirst({
      where: {
        Name: req.params.restaurantName,
      },
    });
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant Not Found" });
    } else
      return res.status(201).json({ message: "Restaurant Found", restaurant });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//__________________________________________________________________________________________

router.get("/getAll", async (req, res) => {
  try {
    console.log(req.params);
    // Find the user based on the provided username
    const restaurants = await prisma.restaurants.findMany();
    if (!restaurants) {
      return res.status(404).json({ error: "Restaurant Not Found" });
    } else {
      console.log(restaurants);
      return res.status(201).json(restaurants);
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//__________________________________________________________________________________________

router.get("/images/restaurants/:imageName", (req, res) => {
  const { imageName } = req.params;

  // Set the static path to the 'images/restaurants' directory
  const imagePath = path.join(__dirname, "images", "Restaurants", imageName);

  // Send the image file as the response
  res.sendFile(imagePath);
});
export default router;
