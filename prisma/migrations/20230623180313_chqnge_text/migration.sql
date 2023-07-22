-- DropIndex
DROP INDEX `RestaurantReviews_ibfk_1` ON `restaurantreviews`;

-- DropIndex
DROP INDEX `RestaurantReviews_ibfk_2` ON `restaurantreviews`;

-- AddForeignKey
ALTER TABLE `foodreviews` ADD CONSTRAINT `FoodReviews_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users`(`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `foodreviews` ADD CONSTRAINT `FoodReviews_ibfk_2` FOREIGN KEY (`ItemId`) REFERENCES `items`(`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `items` ADD CONSTRAINT `Items_ibfk_1` FOREIGN KEY (`RestaurantId`) REFERENCES `restaurants`(`Name`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `orderitems` ADD CONSTRAINT `OrderItems_ibfk_1` FOREIGN KEY (`ItemId`) REFERENCES `items`(`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `orderitems` ADD CONSTRAINT `OrderItems_ibfk_2` FOREIGN KEY (`OrderId`) REFERENCES `orders`(`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `FK_ForeignKeyName` FOREIGN KEY (`UserId`) REFERENCES `users`(`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `restaurantreviews` ADD CONSTRAINT `RestaurantReviews_ibfk_1` FOREIGN KEY (`RestaurantId`) REFERENCES `restaurants`(`Name`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `restaurantreviews` ADD CONSTRAINT `RestaurantReviews_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `users`(`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
