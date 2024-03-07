/*
  Warnings:

  - You are about to drop the column `wishList` on the `WishlistItem` table. All the data in the column will be lost.
  - Added the required column `wishlist` to the `WishlistItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "WishlistItem" DROP CONSTRAINT "WishlistItem_wishList_fkey";

-- AlterTable
ALTER TABLE "WishlistItem" DROP COLUMN "wishList",
ADD COLUMN     "wishlist" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "WishlistItem" ADD CONSTRAINT "WishlistItem_wishlist_fkey" FOREIGN KEY ("wishlist") REFERENCES "Wishlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
