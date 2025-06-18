-- CreateTable
CREATE TABLE "Icons" (
    "id" SERIAL NOT NULL,
    "targetId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Icons_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Icons" ADD CONSTRAINT "Icons_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Targets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
