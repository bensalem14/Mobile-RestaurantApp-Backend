import express from "express";
import { PrismaClient } from "@prisma/client";
import FCM from "fcm-node";
const router = express.Router();
const prisma = new PrismaClient();

//_________________________________________________________________________________________

router.post("/add", async (req, res) => {
  try {
    //get any item of the orderitems
    console.log(req.body.orderitems);
    var ritem = await prisma.restaurants.findFirst({
      where: { Id: req.body.orderitems[0].itemId },
    });
    if (!ritem) console.log("ritem");
    //get the restaurant offering it
    var restaurant = await prisma.restaurants.findFirst({
      where: { Id: ritem.RestaurantId },
    });
    if (!restaurant) console.log("restaurant");

    const order = await prisma.orders.create({
      data: {
        DeliveryAdress: req.body.DeliveryAdress,
        DeliveryNotes: req.body.DeliveryNotes,
        State: req.body.State,
        XCord: parseInt(req.body.XCord),
        YCord: parseFloat(req.body.YCord),
        OrderTime: new Date(),
        DeliveryManPhone: restaurant.Phone,
        UserId: parseInt(req.body.UserId),
      },
    });
    if (!order) return res.status(409).json({ error: "Order Creation Failed" });
    else {
      //to store the orderitems created to use their id
      var orderitemcreated;
      //get the items refrenced by the order items
      var itemrefrenced;
      //the variable that will hold the order fee
      var totalFee = 0;
      //the variable hoplding the restaurant fee by kilometer
      var restaurantFees = restaurant.TransportFee;
      console.log("restorant fees" + restaurantFees);
      //api token 5b3ce3597851110001cf6248ebf8aa11a62943829da30bdd03c7ffa5

      totalFee += restaurantFees;
      console.log("total fees" + totalFee);
      // for each element of the orderitems insert in the order table
      for (let orderitem of req.body.orderitems) {
        orderitemcreated = await prisma.orderitems.create({
          data: {
            ItemId: parseInt(orderitem.ItemId),
            OrderId: order.Id,
            Note: orderitem.Note,
            Quantity: parseInt(orderitem.Quantity),
          },
        });
        //get the item refrenced to get it's unit price
        itemrefrenced = await prisma.items.findFirst({
          where: { Id: orderitemcreated.ItemId },
        });
        console.log("refrenced item");
        console.log(itemrefrenced);
        totalFee +=
          orderitemcreated.Quantity * parseFloat(itemrefrenced.UnitPrice);
      }
      //update the orders total fee
      await prisma.orders.update({
        where: { Id: order.Id }, // Specify the unique identifier of the row you want to update
        data: {
          TotalFees: totalFee, // Specify the updated value for the column
        },
      });
      return res.status(201).json(order.Id);
    }
  } catch (error) {
    console.error("Error during order creation:", error);
    return res.status(500).json({ error: "Internal server Orders error" });
  }
});

/*
router.post("/add", async (req, res) => {
    console.log(req.body.orderitems);
  const order = await prisma.orders.create({
    data: {
      DeliveryAdress: "02 Oued Smar,Alger",
      UserId: 1,
    },
  });
  console.log("order added");
  res.json(order.Id);
});*/
//__________________________________________________________________________________________

router.put("/modify/:orderId", async (req, res) => {
  try {
    // Use Prisma to update the user in the database
    const updatedOrder = await prisma.orders.update({
      where: {
        Id: parseInt(req.params.orderId),
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

    res.json({ message: "update successful", updatedOrder });
  } catch (error) {
    console.error("Error updating Order:", error);
    res.status(500).json({ error: "Internal server Order error" });
  }
});
//___________________________________________________________________________________________
router.patch("/changeState/:orderId", async (req, res) => {
  try {
    // Use Prisma to update the user in the database
    const updatedOrder = await prisma.orders.update({
      where: {
        Id: parseInt(req.params.orderId),
      },
      data: {
        State: req.body.State,
      },
    });
    let fcm = new FCM(process.env.SERVERKEY);
    let message = {
      to: "/topics/" + req.body.topic,
      notification: {
        title: req.body.title,
        body: req.body.State,
        click_action: "FCM_PLUGIN_ACTIVITY",
        icon: "fcm_push_icon",
      },
    };
    fcm.send(message, (err, response) => {
      if (err) {
        next(err);
      } else {
        res.json(response);
      }
    });
    res.json({ message: "state changed successfuly", updatedOrder });
  } catch (error) {
    console.error("Error state Order:", error);
    res.status(500).json({ error: "Internal server Order state error" });
  }
});
//__________________________________________________________________________________________

router.delete("/delete/:orderId", async (req, res) => {
  try {
    // Use Prisma to delete the user from the database
    const deletedorderitems = await prisma.orderitems.deleteMany({
      where: {
        OrderId: parseInt(req.params.orderId),
      },
    });
    const deletedOrder = await prisma.orders.delete({
      where: {
        Id: parseInt(req.params.orderId),
      },
    });

    res.json({ message: "delete successful", deletedOrder });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//__________________________________________________________________________________________

router.get("/get/:orderId", async (req, res) => {
  try {
    console.log(req.params);
    // Find the user based on the provided username
    const order = await prisma.orders.findFirst({
      where: {
        Id: parseInt(req.params.orderId),
      },
    });
    if (!order) {
      return res.status(404).json({ error: "Order Not Found" });
    } else return res.status(201).json({ message: "Order Found", order });
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
    const orders = await prisma.orders.findMany();
    if (!orders) {
      return res.status(404).json({ error: "Order Not Found" });
    } else return res.status(201).json({ message: "Order Found", orders });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//__________________________________________________________________________________________

export default router;
