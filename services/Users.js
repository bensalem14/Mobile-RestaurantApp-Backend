import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/login", async (req, res) => {
  console.log("username :" + req.body.Name);
  console.log("password :" + req.body.Password);
  try {
    // Find the user based on the provided username
    const user = await prisma.users.findFirst({
      where: { Name: req.body.Name },
    });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    console.log(user);
    if (user.Password == req.body.Password) return res.status(200).json(user);
    else return res.status(401).json({ error: "Invalid Password" });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
//__________________________________________________________________________________________

router.post("/signUp", async (req, res) => {
  try {
    // Find the user based on the provided username
    console.log("hello sign up ");
    const existuser = await prisma.users.findFirst({
      where: { Name: req.body.Name },
    });

    // Check if the user exists
    if (existuser) {
      return res.status(409).json({ error: "Name Already Taken" });
    } else {
      const user = await prisma.users.create({
        data: {
          Name: req.body.Name,
          Email: req.body.Email,
          Password: req.body.Password,
          Phone: req.body.Phone,
        },
      });
      console.log("successful");
      return res.status(201).json(user);
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//__________________________________________________________________________________________

router.get("/get/:userName", async (req, res) => {
  try {
    console.log(req.params);
    // Find the user based on the provided username
    const user = await prisma.users.findFirst({
      where: {
        Name: req.params.userName,
      },
    });
    if (!user) {
      return res.status(404).json({ error: "User Not Found" });
    } else return res.status(201).json({ message: "User Found", user });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
//__________________________________________________________________________________________

// Handle PATCH request to update a user
router.put("/modify/:userName", async (req, res) => {
  try {
    // Use Prisma to update the user in the database
    const updatedUser = await prisma.users.update({
      where: {
        Name: req.params.userName,
      },
      data: {
        Name: req.body.Name,
        Email: req.body.Email,
        Password: req.body.Password,
        Phone: req.body.Phone,
      },
    });
    console.log(updatedUser);
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Assuming you have already imported the necessary modules and set up your Express app

//__________________________________________________________________________________________

// Handle DELETE request to delete a user
router.delete("/delete/:userName", async (req, res) => {
  try {
    // Use Prisma to delete the user from the database
    const deletedUser = await prisma.users.delete({
      where: {
        Name: req.params.userName,
      },
    });

    res.json({ message: "delete successful", deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
