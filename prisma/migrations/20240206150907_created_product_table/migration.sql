-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "parentProductId" TEXT,
    "name" TEXT NOT NULL,
    "description" JSONB,
    "price" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "images" TEXT[],
    "attributes" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "parentProductId_idx" ON "Product"("parentProductId");

-- CreateIndex
CREATE INDEX "PetTag_qrCodeId_idx" ON "PetTag" USING HASH ("qrCodeId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_parentProductId_fkey" FOREIGN KEY ("parentProductId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
