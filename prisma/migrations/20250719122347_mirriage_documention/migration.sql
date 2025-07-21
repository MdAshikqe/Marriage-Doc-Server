-- CreateTable
CREATE TABLE "marriage_documention" (
    "id" TEXT NOT NULL,
    "applicantName" TEXT NOT NULL,
    "applicantGender" "Gender" NOT NULL DEFAULT 'MALE',
    "applicantBirthDate" TEXT NOT NULL,
    "applicantFatherName" TEXT NOT NULL,
    "applicantMotherName" TEXT NOT NULL,
    "nationalIdNumber" TEXT NOT NULL,
    "spouseName" TEXT NOT NULL,
    "spouseGender" "Gender" NOT NULL DEFAULT 'FEMALE',
    "spouseBirthDate" TEXT NOT NULL,
    "spouseFatherName" TEXT NOT NULL,
    "spouseMotherName" TEXT NOT NULL,
    "spouseNationalIdNumber" TEXT NOT NULL,
    "marriageDate" TEXT NOT NULL,
    "marriagePlace" TEXT NOT NULL,
    "marriageType" "MarriageType" NOT NULL,
    "marriageRegistrarOffice" TEXT NOT NULL,
    "marriageCertificateNumber" TEXT NOT NULL,
    "certificateIssuedDate" TEXT NOT NULL,
    "certificateStatus" "CertificateStatus" NOT NULL DEFAULT 'ISSUED',
    "registrarName" TEXT NOT NULL,
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "marriage_documention_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "witnesses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "relation" TEXT,
    "contactInfo" TEXT,
    "marriageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "witnesses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "marriage_documention_nationalIdNumber_key" ON "marriage_documention"("nationalIdNumber");

-- CreateIndex
CREATE UNIQUE INDEX "marriage_documention_spouseNationalIdNumber_key" ON "marriage_documention"("spouseNationalIdNumber");

-- CreateIndex
CREATE UNIQUE INDEX "marriage_documention_marriageCertificateNumber_key" ON "marriage_documention"("marriageCertificateNumber");

-- AddForeignKey
ALTER TABLE "witnesses" ADD CONSTRAINT "witnesses_marriageId_fkey" FOREIGN KEY ("marriageId") REFERENCES "marriage_documention"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
