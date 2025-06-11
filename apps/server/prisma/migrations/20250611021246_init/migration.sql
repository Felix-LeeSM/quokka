-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'VIEWER');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('REQUESTED', 'APPROVED', 'DENIED');

-- CreateEnum
CREATE TYPE "LeaveType" AS ENUM ('VACATION', 'SICK_LEAVE');

-- CreateEnum
CREATE TYPE "AssignmentStatus" AS ENUM ('CONFIRMED', 'STANDBY');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "groupName" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGroup" (
    "id" SERIAL NOT NULL,
    "role" "Role" NOT NULL,
    "userId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "UserGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CrewRank" (
    "id" SERIAL NOT NULL,
    "rankName" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "CrewRank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CrewMember" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "baseAirportId" INTEGER NOT NULL,
    "userId" INTEGER,
    "rankId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "CrewMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Airport" (
    "id" SERIAL NOT NULL,
    "iataCode" TEXT NOT NULL,
    "airportName" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "timezone" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Airport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AircraftType" (
    "id" SERIAL NOT NULL,
    "typeName" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "AircraftType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aircraft" (
    "id" SERIAL NOT NULL,
    "registrationNumber" TEXT NOT NULL,
    "aircraftTypeId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Aircraft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flight" (
    "id" SERIAL NOT NULL,
    "flightNumber" TEXT NOT NULL,
    "departAt" TIMESTAMPTZ(3) NOT NULL,
    "arriveAt" TIMESTAMPTZ(3) NOT NULL,
    "aircraftId" INTEGER NOT NULL,
    "arrivalAirportId" INTEGER NOT NULL,
    "departureAirportId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Flight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AircraftTypeCrewRequirement" (
    "id" SERIAL NOT NULL,
    "aircraftTypeId" INTEGER NOT NULL,
    "rankId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "AircraftTypeCrewRequirement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlightCrewRequirement" (
    "id" SERIAL NOT NULL,
    "flightId" INTEGER NOT NULL,
    "rankId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "FlightCrewRequirement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlightAssignment" (
    "id" SERIAL NOT NULL,
    "status" "AssignmentStatus" NOT NULL DEFAULT 'CONFIRMED',
    "crewMemberId" INTEGER NOT NULL,
    "flightId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "FlightAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DayOffRequest" (
    "id" SERIAL NOT NULL,
    "requestedDate" DATE NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'REQUESTED',
    "crewMemberId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "DayOffRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leave" (
    "id" SERIAL NOT NULL,
    "leaveType" "LeaveType" NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'REQUESTED',
    "notes" TEXT,
    "crewMemberId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Leave_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "CrewRank_rankName_key" ON "CrewRank"("rankName");

-- CreateIndex
CREATE UNIQUE INDEX "CrewMember_employeeId_key" ON "CrewMember"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "CrewMember_userId_key" ON "CrewMember"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Airport_iataCode_key" ON "Airport"("iataCode");

-- CreateIndex
CREATE UNIQUE INDEX "AircraftType_typeName_key" ON "AircraftType"("typeName");

-- CreateIndex
CREATE UNIQUE INDEX "Aircraft_registrationNumber_key" ON "Aircraft"("registrationNumber");

-- AddForeignKey
ALTER TABLE "UserGroup" ADD CONSTRAINT "UserGroup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGroup" ADD CONSTRAINT "UserGroup_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrewMember" ADD CONSTRAINT "CrewMember_baseAirportId_fkey" FOREIGN KEY ("baseAirportId") REFERENCES "Airport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrewMember" ADD CONSTRAINT "CrewMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrewMember" ADD CONSTRAINT "CrewMember_rankId_fkey" FOREIGN KEY ("rankId") REFERENCES "CrewRank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aircraft" ADD CONSTRAINT "Aircraft_aircraftTypeId_fkey" FOREIGN KEY ("aircraftTypeId") REFERENCES "AircraftType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aircraft" ADD CONSTRAINT "Aircraft_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_aircraftId_fkey" FOREIGN KEY ("aircraftId") REFERENCES "Aircraft"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_arrivalAirportId_fkey" FOREIGN KEY ("arrivalAirportId") REFERENCES "Airport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_departureAirportId_fkey" FOREIGN KEY ("departureAirportId") REFERENCES "Airport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AircraftTypeCrewRequirement" ADD CONSTRAINT "AircraftTypeCrewRequirement_aircraftTypeId_fkey" FOREIGN KEY ("aircraftTypeId") REFERENCES "AircraftType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AircraftTypeCrewRequirement" ADD CONSTRAINT "AircraftTypeCrewRequirement_rankId_fkey" FOREIGN KEY ("rankId") REFERENCES "CrewRank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlightCrewRequirement" ADD CONSTRAINT "FlightCrewRequirement_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "Flight"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlightCrewRequirement" ADD CONSTRAINT "FlightCrewRequirement_rankId_fkey" FOREIGN KEY ("rankId") REFERENCES "CrewRank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlightAssignment" ADD CONSTRAINT "FlightAssignment_crewMemberId_fkey" FOREIGN KEY ("crewMemberId") REFERENCES "CrewMember"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlightAssignment" ADD CONSTRAINT "FlightAssignment_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "Flight"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DayOffRequest" ADD CONSTRAINT "DayOffRequest_crewMemberId_fkey" FOREIGN KEY ("crewMemberId") REFERENCES "CrewMember"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leave" ADD CONSTRAINT "Leave_crewMemberId_fkey" FOREIGN KEY ("crewMemberId") REFERENCES "CrewMember"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
