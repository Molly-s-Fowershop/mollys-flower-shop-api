/*
  Warnings:

  - The primary key for the `WishlistItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `WishlistItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WishlistItem" DROP CONSTRAINT "WishlistItem_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "WishlistItem_pkey" PRIMARY KEY ("wishlistId", "productId");
