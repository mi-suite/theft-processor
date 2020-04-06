CREATE TABLE IF NOT EXISTS "crimes.theft" (
    "SN" INTEGER NOT NULL,
    "ID" INTEGER NOT NULL,
    "Case Number" CHARACTER VARYING,
    "Date" TIMESTAMP WITHOUT TIME ZONE,
    "Block" CHARACTER VARYING NOT NULL,
    "IUCR" CHARACTER VARYING NOT NULL,
    "Primary Type" CHARACTER VARYING NOT NULL,
    "Description" CHARACTER VARYING NOT NULL,
    "Location Description" CHARACTER VARYING,
    "Arrest" BOOLEAN NOT NULL,
    "Domestic" BOOLEAN NOT NULL,
    "Beat" INTEGER NOT NULL,
    "District" INTEGER,
    "Ward" INTEGER,
    "Community Area" INTEGER,
    "FBI Code" CHARACTER VARYING NOT NULL,
    "X Coordinate" INTEGER,
    "Y Coordinate" INTEGER,
    "Year" INTEGER NOT NULL,
    "Updated On" timestamp without time zone,
    "Latitude" FLOAT,
    "Longitude" FLOAT,
    "Location" CHARACTER VARYING
);
