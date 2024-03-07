/*
  Warnings:

  - You are about to drop the column `wishlist` on the `WishlistItem` table. All the data in the column will be lost.
  - Added the required column `wishlistId` to the `WishlistItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "WishlistItem" DROP CONSTRAINT "WishlistItem_wishlist_fkey";

-- AlterTable
ALTER TABLE "WishlistItem" DROP COLUMN "wishlist",
ADD COLUMN     "wishlistId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "WishlistItem" ADD CONSTRAINT "WishlistItem_wishlistId_fkey" FOREIGN KEY ("wishlistId") REFERENCES "Wishlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
