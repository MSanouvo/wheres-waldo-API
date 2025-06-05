-- CreateTable
CREATE TABLE "Leaderboard" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL DEFAULT 'Player',
    "completion_time" INTEGER NOT NULL,

    CONSTRAINT "Leaderboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Map" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Map_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Targets" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "mapId" INTEGER NOT NULL,
    "x_min" INTEGER NOT NULL,
    "x_max" INTEGER NOT NULL,
    "y_min" INTEGER NOT NULL,
    "y_max" INTEGER NOT NULL,

    CONSTRAINT "Targets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Targets" ADD CONSTRAINT "Targets_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
