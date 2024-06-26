/*
  Warnings:

  - You are about to drop the column `fileDownLink` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `imagePath` on the `Product` table. All the data in the column will be lost.
  - Added the required column `fileDownloadLink` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileUrl` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "fileDownLink",
DROP COLUMN "imagePath",
ADD COLUMN     "fileDownloadLink" TEXT NOT NULL,
ADD COLUMN     "fileUrl" TEXT NOT NULL;
