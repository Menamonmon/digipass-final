-- AlterTable
ALTER TABLE "Pass" ADD COLUMN     "accepted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "reason" TEXT NOT NULL DEFAULT E'';
