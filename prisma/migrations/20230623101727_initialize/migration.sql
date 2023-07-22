-- CreateTable
CREATE TABLE `foodreviews` (
    `UserId` INTEGER NOT NULL,
    `ItemId` INTEGER NOT NULL,
    `Rating` INTEGER NULL,
    `Review` TEXT NULL,

    INDEX `ItemId`(`ItemId`),
    PRIMARY KEY (`UserId`, `ItemId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `items` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NULL,
    `RestaurantId` VARCHAR(100) NULL,
    `UnitPrice` FLOAT NULL,
    `Picture` VARCHAR(500) NULL,
    `AvgRating` FLOAT NULL,
    `NbRating` INTEGER NULL,
    `NbReview` INTEGER NULL,
    `ingredients` TEXT NULL,

    INDEX `RestaurantId`(`RestaurantId`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orderitems` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `ItemId` INTEGER NULL,
    `OrderId` INTEGER NULL,
    `Quantity` INTEGER NULL,
    `Note` TEXT NULL,

    INDEX `ItemId`(`ItemId`),
    INDEX `OrderId`(`OrderId`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `DeliveryAdress` VARCHAR(255) NOT NULL,
    `DeliveryNotes` TEXT NULL,
    `State` VARCHAR(30) NULL DEFAULT 'Pending',
    `XCord` FLOAT NULL,
    `YCord` FLOAT NULL,
    `OrderTime` TIME(0) NULL,
    `DeliveryManPhone` VARCHAR(10) NULL,
    `TotalFees` FLOAT NULL,
    `UserId` INTEGER NULL,

    INDEX `FK_ForeignKeyName`(`UserId`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `restaurantreviews` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `RestaurantId` VARCHAR(100) NOT NULL,
    `UserId` INTEGER NOT NULL,
    `Review` TEXT NULL,
    `Rating` INTEGER NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `restaurants` (
    `Name` VARCHAR(100) NOT NULL,
    `Adress` VARCHAR(255) NOT NULL,
    `Logo` VARCHAR(500) NOT NULL,
    `XCord` FLOAT NULL,
    `YCord` FLOAT NULL,
    `Type` VARCHAR(255) NOT NULL,
    `AvgRating` FLOAT NULL,
    `NbReview` INTEGER NULL,
    `Phone` VARCHAR(10) NOT NULL,
    `Email` VARCHAR(255) NULL,
    `NbRating` INTEGER NULL,
    `TransportFee` FLOAT NULL,

    PRIMARY KEY (`Name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(20) NOT NULL,
    `Email` VARCHAR(255) NOT NULL,
    `Password` VARCHAR(255) NOT NULL,
    `Picture` VARCHAR(500) NULL,
    `FacebookId` VARCHAR(500) NULL,
    `InstagramId` VARCHAR(500) NULL,
    `Phone` VARCHAR(255) NULL,
    `XCord` FLOAT NULL,
    `YCord` FLOAT NULL,

    UNIQUE INDEX `Name`(`Name`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
