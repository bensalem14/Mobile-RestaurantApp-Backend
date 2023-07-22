import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/add", async (req, res) => {
  try {
    // Find the user based on the provided username

    const item = await prisma.items.create({
      data: {
        name: req.body.name,
        RestaurantId: req.body.RestaurantId,
        Picture: req.body.Picture,
        ingredients: req.body.ingredients,
        UnitPrice: parseFloat(req.body.UnitPrice),
        AvgRating: 0,
        NbReview: 0,
        NbRating: 0,
      },
    });
    return res.status(201).json({ message: "Item created successfully" });
  } catch (error) {
    console.error("Error during item creation:", error);
    return res.status(500).json({ error: "Internal server Items error" });
  }
});

//__________________________________________________________________________________________

router.put("/modify/:itemId", async (req, res) => {
  try {
    // Use Prisma to update the user in the database
    const updatedItem = await prisma.items.update({
      where: {
        Id: parseInt(req.params.itemId),
      },
      data: {
        name: req.body.name,
        RestaurantId: req.body.RestaurantId,
        Picture: req.body.Picture,
        ingredients: req.body.ingredients,
        UnitPrice: parseFloat(req.body.UnitPrice),
        AvgRating: 0,
        NbReview: 0,
        NbRating: 0,
      },
    });

    res.json({ message: "update successful", updatedItem });
  } catch (error) {
    console.error("Error updating Item:", error);
    res.status(500).json({ error: "Internal server Item error" });
  }
});

//__________________________________________________________________________________________

router.delete("/delete/:itemId", async (req, res) => {
  try {
    // Use Prisma to delete the user from the database
    const deletedItem = await prisma.items.delete({
      where: {
        Id: parseInt(req.params.itemId),
      },
    });

    res.json({ message: "delete successful", deletedItem });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//__________________________________________________________________________________________

router.get("/get/:itemId", async (req, res) => {
  try {
    console.log(req.params);
    // Find the user based on the provided username
    const item = await prisma.items.findFirst({
      where: {
        Id: parseInt(req.params.itemId),
      },
    });
    if (!item) {
      return res.status(404).json({ error: "Item Not Found" });
    } else return res.status(201).json({ message: "Item Found", item });
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
    const items = await prisma.items.findMany();
    if (!items) {
      return res.status(404).json({ error: "Item Not Found" });
    } else return res.status(201).json({ message: "Item Found", items });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
//___________________________________________________________________________________________

router.get("/getAll/:restaurantName", async (req, res) => {
  try {
    console.log(req.params);
    // Find the user based on the provided username
    const items = await prisma.items.findMany({
      where: {
        RestaurantId: req.params.restaurantName,
      },
    });
    if (!items) {
      return res.status(404).json({ error: "Item Not Found" });
    } else return res.status(201).json(items);
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//__________________________________________________________________________________________

router.get("/images/Items/:imageName", (req, res) => {
  const { imageName } = req.params;

  // Set the static path to the 'images/items' directory
  const imagePath = path.join(__dirname, "images", "Items", imageName);

  // Send the image file as the response
  res.sendFile(imagePath);
});

export default router;
