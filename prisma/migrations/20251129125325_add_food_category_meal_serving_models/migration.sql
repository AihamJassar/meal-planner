/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Food" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "calories" DOUBLE PRECISION,
    "protein" DOUBLE PRECISION,
    "fat" DOUBLE PRECISION,
    "carbohydrates" DOUBLE PRECISION,
    "fiber" DOUBLE PRECISION,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeringUnit" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SeringUnit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodServingUnit" (
    "id" TEXT NOT NULL,
    "foodId" TEXT NOT NULL,
    "servingUnitId" TEXT NOT NULL,
    "grams" DOUBLE PRECISION,

    CONSTRAINT "FoodServingUnit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meal" (
    "id" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Meal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeadFood" (
    "id" TEXT NOT NULL,
    "foodId" TEXT NOT NULL,
    "mealId" TEXT NOT NULL,
    "servingUnitId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MeadFood_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FoodToMeal" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FoodToMeal_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Food_name_key" ON "Food"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SeringUnit_name_key" ON "SeringUnit"("name");

-- CreateIndex
CREATE INDEX "_FoodToMeal_B_index" ON "_FoodToMeal"("B");

-- AddForeignKey
ALTER TABLE "Food" ADD CONSTRAINT "Food_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodServingUnit" ADD CONSTRAINT "FoodServingUnit_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodServingUnit" ADD CONSTRAINT "FoodServingUnit_servingUnitId_fkey" FOREIGN KEY ("servingUnitId") REFERENCES "SeringUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeadFood" ADD CONSTRAINT "MeadFood_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeadFood" ADD CONSTRAINT "MeadFood_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeadFood" ADD CONSTRAINT "MeadFood_servingUnitId_fkey" FOREIGN KEY ("servingUnitId") REFERENCES "SeringUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FoodToMeal" ADD CONSTRAINT "_FoodToMeal_A_fkey" FOREIGN KEY ("A") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FoodToMeal" ADD CONSTRAINT "_FoodToMeal_B_fkey" FOREIGN KEY ("B") REFERENCES "Meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
