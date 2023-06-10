-- CreateTable
CREATE TABLE "Pokedex" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "Pokemon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "number" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "pokedexId" INTEGER NOT NULL,
    CONSTRAINT "Pokemon_pokedexId_fkey" FOREIGN KEY ("pokedexId") REFERENCES "Pokedex" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Pokedex_email_key" ON "Pokedex"("email");
