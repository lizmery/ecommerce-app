-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "sessionId" TEXT
);
INSERT INTO "new_User" ("createdAt", "email", "id", "isAdmin", "name", "password", "sessionId", "updatedAt") SELECT "createdAt", "email", "id", "isAdmin", "name", "password", "sessionId", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_sessionId_key" ON "User"("sessionId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
