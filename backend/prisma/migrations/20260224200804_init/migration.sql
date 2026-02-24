/*
  Warnings:

  - Added the required column `genres` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `poster_path` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vote_average` to the `Media` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "genres" JSONB NOT NULL,
ADD COLUMN     "poster_path" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "vote_average" DOUBLE PRECISION NOT NULL;
