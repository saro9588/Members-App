-- CreateIndex
CREATE INDEX `Account_userId_idx` ON `Account`(`userId`);

-- CreateIndex
CREATE INDEX `Note_authorId_idx` ON `Note`(`authorId`);

-- CreateIndex
CREATE INDEX `Session_userId_idx` ON `Session`(`userId`);
