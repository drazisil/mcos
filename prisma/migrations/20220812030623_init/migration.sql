-- CreateTable
CREATE TABLE "Lobby" (
    "lobyID" INTEGER NOT NULL,
    "raceTypeID" INTEGER NOT NULL,
    "turfID" INTEGER NOT NULL,
    "riffName" CHAR(32) NOT NULL,
    "eTerfName" CHAR(265) NOT NULL,
    "clientArt" CHAR(11) NOT NULL,
    "elementID" INTEGER NOT NULL,
    "terfLength" INTEGER NOT NULL,
    "startSlice" INTEGER NOT NULL,
    "endSlice" INTEGER NOT NULL,
    "dragStageLeft" INTEGER NOT NULL,
    "dragStageRight" INTEGER NOT NULL,
    "dragStagingSlice" INTEGER NOT NULL,
    "gridSpreadFactor" REAL NOT NULL,
    "linear" SMALLINT NOT NULL,
    "numPlayersMin" SMALLINT NOT NULL,
    "numPlayersMax" SMALLINT NOT NULL,
    "numPlayersDefault" SMALLINT NOT NULL,
    "bnumPlayersEnable" SMALLINT NOT NULL,
    "numLapsMin" SMALLINT NOT NULL,
    "numLapsMax" SMALLINT NOT NULL,
    "numLapsDefault" SMALLINT NOT NULL,
    "bnumLapsEnabled" SMALLINT NOT NULL,
    "numRoundsMin" SMALLINT NOT NULL,
    "numRoundsMax" SMALLINT NOT NULL,
    "numRoundsDefault" SMALLINT NOT NULL,
    "bnumRoundsEnabled" SMALLINT NOT NULL,
    "bWeatherDefault" SMALLINT NOT NULL,
    "bWeatherEnabled" SMALLINT NOT NULL,
    "bNightDefault" SMALLINT NOT NULL,
    "bNightEnabled" SMALLINT NOT NULL,
    "bBackwardDefault" SMALLINT NOT NULL,
    "bBackwardEnabled" SMALLINT NOT NULL,
    "bTrafficDefault" SMALLINT NOT NULL,
    "bTrafficEnabled" SMALLINT NOT NULL,
    "bDamageDefault" SMALLINT NOT NULL,
    "bDamageEnabled" SMALLINT NOT NULL,
    "bAIDefault" SMALLINT NOT NULL,
    "bAIEnabled" SMALLINT NOT NULL,
    "topDog" CHAR(13) NOT NULL,
    "terfOwner" CHAR(33) NOT NULL,
    "qualifingTime" INTEGER NOT NULL,
    "clubNumPlayers" INTEGER NOT NULL,
    "clubNumLaps" INTEGER NOT NULL,
    "clubNumRounds" INTEGER NOT NULL,
    "bClubNight" SMALLINT NOT NULL,
    "bClubWeather" SMALLINT NOT NULL,
    "bClubBackwards" SMALLINT NOT NULL,
    "topSeedsMP" INTEGER NOT NULL,
    "lobbyDifficulty" INTEGER NOT NULL,
    "ttPointForQualify" INTEGER NOT NULL,
    "ttCashForQualify" INTEGER NOT NULL,
    "ttPointBonusFasterIncs" INTEGER NOT NULL,
    "ttCashBonusFasterIncs" INTEGER NOT NULL,
    "ttTimeIncrements" INTEGER NOT NULL,
    "victoryPoints1" INTEGER NOT NULL,
    "victoryCash1" INTEGER NOT NULL,
    "victoryPoints2" INTEGER NOT NULL,
    "victoryCash2" INTEGER NOT NULL,
    "victoryPoints3" INTEGER NOT NULL,
    "victoryCash3" INTEGER NOT NULL,
    "minLevel" SMALLINT NOT NULL,
    "minResetSlice" INTEGER NOT NULL,
    "maxResetSlice" INTEGER NOT NULL,
    "bnewbieFlag" SMALLINT NOT NULL,
    "bdriverHelmetFlag" SMALLINT NOT NULL,
    "clubNumPlayersMax" SMALLINT NOT NULL,
    "clubNumPlayersMin" SMALLINT NOT NULL,
    "clubNumPlayersDefault" SMALLINT NOT NULL,
    "numClubsMax" SMALLINT NOT NULL,
    "numClubsMin" SMALLINT NOT NULL,
    "racePointsFactor" REAL NOT NULL,
    "bodyClassMax" SMALLINT NOT NULL,
    "powerClassMax" SMALLINT NOT NULL,
    "clubLogoID" INTEGER NOT NULL,
    "teamtWeather" SMALLINT NOT NULL,
    "teamtNight" SMALLINT NOT NULL,
    "teamtBackwards" SMALLINT NOT NULL,
    "teamtNumLaps" SMALLINT NOT NULL,
    "raceCashFactor" REAL NOT NULL,

    CONSTRAINT "pk_lobbby" PRIMARY KEY ("lobyID")
);

-- CreateTable
CREATE TABLE "Session" (
    "customerId" INTEGER NOT NULL,
    "sessionKey" TEXT NOT NULL,
    "sKey" TEXT NOT NULL,
    "contextId" TEXT NOT NULL,
    "connectionId" TEXT NOT NULL,

    CONSTRAINT "pk_session" PRIMARY KEY ("customerId")
);
