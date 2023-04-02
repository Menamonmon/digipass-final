-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "password" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "pictureUrl" TEXT;
