import { ServerError } from "rusty-motors-shared";
import { SerializedBuffer } from "rusty-motors-shared";

export class PlayerModel extends SerializedBuffer {
	override serialize(): Buffer {
		throw new ServerError("Method not implemented.");
	}
	serializeSize(): number {
		throw new ServerError("Method not implemented.");
	}

	static schema = `CREATE TABLE Player (
    PlayerID             int NOT NULL,
    CustomerID           int NOT NULL,
    PlayerTypeID         int NOT NULL,
    StockClassicClass    char NOT NULL,
    StockMuscleClass     char NOT NULL,
    ModifiedClassicClass char NOT NULL,
    ModifiedMuscleClass  char NOT NULL,
    OutlawClass          char NOT NULL,
    DragClass            char NOT NULL,
    ChallengeScore       int NOT NULL,
    ChallengeRung        int NOT NULL,
    LastLoggedIn         datetime NOT NULL,
    TotalTimePlayed      datetime NOT NULL,
    TimesLoggedIn        smallint NOT NULL,
    NumUnreadMail        smallint NOT NULL,
    BankBalance          int NOT NULL,
    NumCarsOwned         smallint NOT NULL,
    IsLoggedIn           tinyint NOT NULL,
    DriverStyle          tinyint NOT NULL,
    LPCode               smallint NOT NULL,
    CarInfoSetting       int NOT NULL,
    CarNum1              varchar(2) NOT NULL,
    CarNum2              varchar(2) NOT NULL,
    CarNum3              varchar(2) NOT NULL,
    CarNum4              varchar(2) NOT NULL,
    CarNum5              varchar(2) NOT NULL,
    CarNum6              varchar(2) NOT NULL,
    LPText               varchar(8) NOT NULL,
    DLNumber             varchar(20) NOT NULL,
    Persona              varchar(30) NOT NULL,
    Address              varchar(128) NOT NULL,
    Residence            varchar(20) NOT NULL
);`;
}
